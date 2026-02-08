window.Prhay = window.Prhay || {};

/**
 * Builds a session queue using a Leitner-inspired algorithm.
 * 1. Filter by due date based on frequency
 * 2. Sort by lastPrayed (oldest first)
 * 3. Take top N (dailyGoal), backfilling if not enough are due
 */
window.Prhay.buildSessionQueue = (prayers, dailyGoal) => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    const sorted = [...prayers].sort((a, b) => a.lastPrayed - b.lastPrayed);

    const due = sorted.filter(p => {
        if (!p.lastPrayed) return true;
        const daysSince = (now.getTime() - p.lastPrayed) / oneDay;
        if (p.frequency === 'daily') return daysSince >= 0.5;
        if (p.frequency === 'weekly') return daysSince >= 6.5;
        if (p.frequency === 'monthly') return daysSince >= 29;
        return true;
    });

    let queue = due.slice(0, dailyGoal);
    if (queue.length < dailyGoal && sorted.length > queue.length) {
        const remaining = sorted.filter(p => !queue.includes(p));
        queue = [...queue, ...remaining.slice(0, dailyGoal - queue.length)];
    }

    return queue;
};
