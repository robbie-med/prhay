window.Prhay = window.Prhay || {};

(() => {
    const NavBar = window.Prhay.NavBar;
    const getListLabel = window.Prhay.getListLabel;

    window.Prhay.StatsView = ({ t, stats, settings, prayers, setView }) => {
        const lists = (settings.lists || []).map(l => l.name);

        // Generate heatmap data for last 28 days
        const days = [];
        const today = new Date();
        for (let i = 27; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            days.push({
                date: dateStr,
                count: stats.history[dateStr] || 0
            });
        }

        // Breakdown by list (dynamic)
        const catCounts = prayers.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});

        // Merge dynamic lists with any categories found in prayers
        const allCats = [...new Set([...lists, ...Object.keys(catCounts)])];

        return (
            <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 p-6">
                <h2 className="text-2xl font-bold mb-6 pt-4">{t.stats}</h2>

                {/* Heatmap */}
                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 mb-6">
                    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4">{t.activity}</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {days.map(d => (
                            <div key={d.date} className="flex flex-col items-center">
                                <div
                                    className={`w-full aspect-square rounded-md ${
                                        d.count === 0 ? 'bg-stone-100 dark:bg-stone-800' :
                                        d.count < 3 ? 'bg-amber-300 dark:bg-amber-800' :
                                        d.count < 6 ? 'bg-amber-500 dark:bg-amber-600' :
                                        'bg-amber-700 dark:bg-amber-400'
                                    }`}
                                    title={`${d.date}: ${d.count}`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
                    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4">{t.focus_areas}</h3>
                    <div className="space-y-3">
                        {allCats.map(cat => {
                            const count = catCounts[cat] || 0;
                            const total = prayers.length || 1;
                            const pct = (count / total) * 100;
                            return (
                                <div key={cat}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{getListLabel(cat, t)}</span>
                                        <span className="text-stone-500">{count}</span>
                                    </div>
                                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2">
                                        <div
                                            className="bg-stone-800 dark:bg-stone-200 h-2 rounded-full"
                                            style={{ width: `${pct}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <NavBar view="stats" setView={setView} />
            </div>
        );
    };
})();
