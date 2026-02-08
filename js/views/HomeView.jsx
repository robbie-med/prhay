window.Prhay = window.Prhay || {};

(() => {
    const icon = window.Prhay.icon;
    const RotateCcw = icon(lucide.RotateCcw);
    const ChevronRight = icon(lucide.ChevronRight);
    const NavBar = window.Prhay.NavBar;

    window.Prhay.HomeView = ({ t, stats, settings, prayers, startSession, setView }) => (
        <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
                    {t.app_name}
                </h1>
                <p className="text-stone-500 dark:text-stone-400">{t.privacy_note}</p>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800 mb-8">
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
                        <span className="font-semibold">{settings.dailyGoal}</span>
                    </div>
                    <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                </div>
            </div>

            <button
                onClick={startSession}
                disabled={prayers.length === 0}
                className="w-full max-w-md py-4 bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all text-white rounded-2xl font-bold text-lg shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {prayers.length > 0 ? t.start_session : t.no_prayers} <ChevronRight size={20} />
            </button>

            <NavBar view="home" setView={setView} />
        </div>
    );
})();
