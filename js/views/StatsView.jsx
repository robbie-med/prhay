window.Prhay = window.Prhay || {};

(() => {
    const NavBar = window.Prhay.NavBar;

    window.Prhay.StatsView = ({ t, stats, prayers, setView }) => {
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

        // Breakdown by category
        const catCounts = prayers.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});

        return (
            <div className="min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 p-6">
                <h2 className="text-2xl font-bold mb-6 pt-4">{t.stats}</h2>

                {/* Heatmap */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Activity (Last 28 Days)</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {days.map(d => (
                            <div key={d.date} className="flex flex-col items-center">
                                <div
                                    className={`w-full aspect-square rounded-md ${
                                        d.count === 0 ? 'bg-slate-100 dark:bg-slate-800' :
                                        d.count < 3 ? 'bg-blue-300 dark:bg-blue-800' :
                                        d.count < 6 ? 'bg-blue-500 dark:bg-blue-600' :
                                        'bg-blue-700 dark:bg-blue-400'
                                    }`}
                                    title={`${d.date}: ${d.count}`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Focus Areas</h3>
                    <div className="space-y-3">
                        {Object.keys(t.categories).map(cat => {
                            const count = catCounts[cat] || 0;
                            const total = prayers.length || 1;
                            const pct = (count / total) * 100;
                            return (
                                <div key={cat}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{t.categories[cat]}</span>
                                        <span className="text-slate-500">{count}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                        <div
                                            className="bg-slate-800 dark:bg-slate-200 h-2 rounded-full"
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
