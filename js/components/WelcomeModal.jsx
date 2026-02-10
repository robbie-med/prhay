window.Prhay = window.Prhay || {};

(() => {
    const icon = window.Prhay.icon;
    const Heart = icon(lucide.Heart);

    window.Prhay.WelcomeModal = ({ t, onDismiss }) => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center border border-stone-200 dark:border-stone-800">
                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                        <Heart size={28} className="text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent">
                        {t.welcome_title}
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6">
                        {t.welcome_body}
                    </p>
                    <button
                        onClick={onDismiss}
                        className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-amber-600/20 active:scale-95 transition-all"
                    >
                        {t.welcome_dismiss}
                    </button>
                </div>
            </div>
        );
    };
})();
