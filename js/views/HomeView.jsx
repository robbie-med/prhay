window.Prhay = window.Prhay || {};

(() => {
    const { useState, useMemo } = React;
    const icon = window.Prhay.icon;
    const ChevronRight = icon(lucide.ChevronRight);
    const NavBar = window.Prhay.NavBar;
    const buildSessionQueue = window.Prhay.buildSessionQueue;
    const getWeeklyVerse = window.Prhay.getWeeklyVerse;
    const getListLabel = window.Prhay.getListLabel;

    window.Prhay.HomeView = ({ t, lang, stats, settings, prayers, startSession, setView }) => {
        const [selectedFilter, setSelectedFilter] = useState('all');

        const lists = settings.lists || [];
        const filters = [
            { key: 'all', label: t.todays_rotation },
            ...lists.map(l => ({ key: l.name, label: getListLabel(l.name, t) }))
        ];

        const previewCount = useMemo(() =>
            buildSessionQueue(prayers, settings, { category: selectedFilter }).length,
            [prayers, settings, selectedFilter]
        );

        const verse = useMemo(() => getWeeklyVerse(lang), [lang]);

        // Pick a random prayer to display as a gentle prompt (changes per mount)
        const [promptPrayer] = useState(() => {
            const todayQueue = buildSessionQueue(prayers, settings, { category: 'all' });
            if (todayQueue.length === 0) return null;
            return todayQueue[Math.floor(Math.random() * todayQueue.length)];
        });

        return (
            <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6">
                <div className="mb-6 text-center">
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

                {/* Prayer prompt — replaces streak */}
                {promptPrayer && (
                    <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-xl border border-stone-100 dark:border-stone-800 mb-6">
                        <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2 font-medium">{t.pray_for_prompt}</p>
                        <h3 className="text-xl font-bold leading-snug text-stone-800 dark:text-white">{promptPrayer.text}</h3>
                        {promptPrayer.notes && (
                            <p className="mt-2 text-sm text-stone-400 dark:text-stone-500 italic leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
                                {promptPrayer.notes}
                            </p>
                        )}
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 rounded-md">
                                {getListLabel(promptPrayer.category, t)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Fallback when no prayers yet */}
                {!promptPrayer && (
                    <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800 mb-6 text-center">
                        <p className="text-stone-400 dark:text-stone-500">{t.no_prayers}</p>
                    </div>
                )}

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
