window.Prhay = window.Prhay || {};

(() => {
    const { Check } = lucide;

    window.Prhay.CompleteView = ({ t, setView }) => (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6 animate-bounce">
                <Check size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-2">{t.session_complete}</h2>
            <p className="text-slate-500 mb-8">{t.session_complete_sub}</p>
            <button
                onClick={() => setView('home')}
                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
                {t.back_home}
            </button>
        </div>
    );
})();
