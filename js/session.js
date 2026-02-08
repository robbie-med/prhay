window.Prhay = window.Prhay || {};

/**
 * Builds a session queue.
 *
 * Mode 1 — "Today's rotation" (category === 'all'):
 *   Leitner-inspired algorithm respecting frequency, weekDays, monthDays.
 *   Capped at dailyGoal, backfills with oldest-prayed if not enough due.
 *
 * Mode 2 — Category filter (category === 'Family', etc.):
 *   Returns all prayers in that category, sorted oldest-prayed first.
 */
window.Prhay.buildSessionQueue = (prayers, dailyGoal, options) => {
    var opts = options || {};
    var category = opts.category || 'all';

    // Category mode: return all in that category
    if (category !== 'all') {
        return prayers
            .filter(function(p) { return p.category === category; })
            .sort(function(a, b) { return a.lastPrayed - b.lastPrayed; });
    }

    // Today's rotation mode
    var now = new Date();
    var dayOfWeek = now.getDay();   // 0=Sun … 6=Sat
    var dayOfMonth = now.getDate(); // 1–31
    var oneDay = 24 * 60 * 60 * 1000;

    var sorted = prayers.slice().sort(function(a, b) { return a.lastPrayed - b.lastPrayed; });

    var due = sorted.filter(function(p) {
        if (!p.lastPrayed) return true;

        if (p.frequency === 'daily') {
            return (now.getTime() - p.lastPrayed) / oneDay >= 0.5;
        }

        if (p.frequency === 'weekly') {
            if (p.weekDays && p.weekDays.length > 0) {
                return p.weekDays.indexOf(dayOfWeek) !== -1;
            }
            return (now.getTime() - p.lastPrayed) / oneDay >= 6.5;
        }

        if (p.frequency === 'monthly') {
            if (p.monthDays && p.monthDays.length > 0) {
                return p.monthDays.indexOf(dayOfMonth) !== -1;
            }
            return (now.getTime() - p.lastPrayed) / oneDay >= 29;
        }

        return true;
    });

    var queue = due.slice(0, dailyGoal);
    if (queue.length < dailyGoal && sorted.length > queue.length) {
        var remaining = sorted.filter(function(p) { return queue.indexOf(p) === -1; });
        queue = queue.concat(remaining.slice(0, dailyGoal - queue.length));
    }

    return queue;
};
