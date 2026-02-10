window.Prhay = window.Prhay || {};

/**
 * Session queue builder with smart rotation.
 *
 * "Today" mode (category === 'all'):
 *   - All daily-frequency prayers are always included
 *   - For each list, picks N random items (per settings.lists[].count)
 *   - Rotation ensures no repeats until every item in a list has been prayed
 *   - Day-seeded shuffle keeps the queue stable within a single day
 *
 * List mode (category === 'Family', etc.):
 *   Returns all prayers in that list, sorted oldest-prayed first.
 */

// Deterministic shuffle using a day-based seed
function dayHash(dateStr) {
    var hash = 0;
    for (var i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) || 1;
}

function seededShuffle(arr, seed) {
    var result = arr.slice();
    for (var i = result.length - 1; i > 0; i--) {
        seed = (seed * 16807) % 2147483647;
        var j = seed % (i + 1);
        var temp = result[i];
        result[i] = result[j];
        result[j] = temp;
    }
    return result;
}

function getRotation() {
    try { return JSON.parse(localStorage.getItem('prhay_rotation') || '{}'); }
    catch (e) { return {}; }
}

function saveRotation(rot) {
    localStorage.setItem('prhay_rotation', JSON.stringify(rot));
}

function getTodayCache() {
    try { return JSON.parse(localStorage.getItem('prhay_today_cache') || '{}'); }
    catch (e) { return {}; }
}

function saveTodayCache(cache) {
    localStorage.setItem('prhay_today_cache', JSON.stringify(cache));
}

function buildTodayQueue(prayers, settings) {
    var todayStr = new Date().toISOString().split('T')[0];
    var lists = settings.lists || [];

    // Check cache — if today's queue was already generated, reuse it
    var cache = getTodayCache();
    if (cache.date === todayStr && cache.ids && cache.ids.length > 0) {
        var cached = cache.ids.map(function(id) {
            return prayers.find(function(p) { return p.id === id; });
        }).filter(Boolean);
        if (cached.length > 0) return cached;
    }

    var rotation = getRotation();
    var seed = dayHash(todayStr);
    var queue = [];
    var usedIds = {};

    // 1. Always include all daily prayers
    prayers.forEach(function(p) {
        if (p.frequency === 'daily') {
            queue.push(p);
            usedIds[p.id] = true;
        }
    });

    // 2. For each list, pick count random items (non-daily only, rotation-aware)
    lists.forEach(function(list) {
        if (!list.count || list.count <= 0) return;

        var pool = prayers.filter(function(p) {
            return p.category === list.name && p.frequency !== 'daily' && !usedIds[p.id];
        });
        if (pool.length === 0) return;

        var shown = rotation[list.name] || [];

        // Filter to unshown items
        var unshown = pool.filter(function(p) {
            return shown.indexOf(p.id) === -1;
        });

        // If not enough unshown, start a new cycle
        if (unshown.length < list.count) {
            rotation[list.name] = [];
            unshown = pool;
        }

        // Day-seeded shuffle for stable daily picks
        var shuffled = seededShuffle(unshown, seed + list.name.length);
        var picked = shuffled.slice(0, Math.min(list.count, shuffled.length));

        picked.forEach(function(p) {
            queue.push(p);
            usedIds[p.id] = true;
        });
    });

    saveRotation(rotation);

    // Cache today's queue
    saveTodayCache({
        date: todayStr,
        ids: queue.map(function(p) { return p.id; })
    });

    return queue;
}

window.Prhay.buildSessionQueue = function(prayers, settings, options) {
    var opts = options || {};
    var category = opts.category || 'all';

    if (category !== 'all') {
        return prayers
            .filter(function(p) { return p.category === category; })
            .sort(function(a, b) { return a.lastPrayed - b.lastPrayed; });
    }

    return buildTodayQueue(prayers, settings);
};

// Called when a prayer is marked as prayed — updates rotation tracking
window.Prhay.markPrayedInRotation = function(prayerId, category) {
    var rotation = getRotation();
    if (!rotation[category]) rotation[category] = [];
    if (rotation[category].indexOf(prayerId) === -1) {
        rotation[category].push(prayerId);
    }
    saveRotation(rotation);
};

// Invalidate today's cache (call when settings.lists change)
window.Prhay.resetTodayCache = function() {
    localStorage.removeItem('prhay_today_cache');
};
