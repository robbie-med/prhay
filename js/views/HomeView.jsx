window.Prhay = window.Prhay || {};

(() => {
    const { useState, useMemo } = React;
    const icon = window.Prhay.icon;
    const RotateCcw = icon(lucide.RotateCcw);
    const ChevronRight = icon(lucide.ChevronRight);
    const NavBar = window.Prhay.NavBar;
    const buildSessionQueue = window.Prhay.buildSessionQueue;
    const getWeeklyVerse = window.Prhay.getWeeklyVerse;

    window.Prhay.HomeView = ({ t, lang, stats, settings, prayers, startSession, setView }) => {
        const [selectedFilter, setSelectedFilter] = useState('all');

        const filters = [
            { key: 'all', label: t.todays_rotation },
            ...Object.keys(t.categories).map(k => ({ key: k, label: t.categories[k] }))
        ];

        const previewCount = useMemo(() =>
            buildSessionQueue(prayers, settings.dailyGoal, { category: selectedFilter }).length,
            [prayers, settings.dailyGoal, selectedFilter]
        );

        const verse = useMemo(() => getWeeklyVerse(lang), [lang]);

        return (
            <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
                        {t.app_name}
                    </h1>
                    {verse && (
                        <div className="max-w-xs mx-auto">
                            <p className="text-stone-400 dark:text-stone-500 text-sm leading-relaxed italic" style={{ fontFamily: "'Crimson Text', serif" }}>
                                {"\u201C"}{verse.text}{"\u201D"}
                            </p>
                            <p className="text-stone-400 dark:text-stone-600 text-xs mt-1 font-medium" style={{ fontFamily: "'Crimson Text', serif" }}>
                                {"\u2014 "}{verse.ref}
                            </p>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider">{t.streak}</p>
                            <p className="text-3xl font-bold text-stone-800 dark:text-white">{stats.streak} <span className="text-lg font-normal text-stone-400">days</span></p>
                        </div>
                        <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <RotateCcw size={24} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-stone-600 dark:text-stone-300">{t.cards_today}</span>
                            <span className="font-semibold">{previewCount}</span>
                        </div>
                        <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2">
                            <div className="bg-amber-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Session filter pills */}
                <div className="w-full max-w-md mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setSelectedFilter(f.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                selectedFilter === f.key
                                    ? 'bg-amber-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => startSession(selectedFilter)}
                    disabled={previewCount === 0}
                    className="w-full max-w-md py-4 bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all text-white rounded-2xl font-bold text-lg shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {previewCount > 0
                        ? <>{t.start_session} ({previewCount}) <ChevronRight size={20} /></>
                        : t.no_cards_for_filter
                    }
                </button>

                <NavBar view="home" setView={setView} />
            </div>
        );
    };
})();
