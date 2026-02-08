window.Prhay = window.Prhay || {};

(() => {
    const { X } = lucide;

    window.Prhay.SessionView = ({ t, sessionQueue, currentCardIndex, handlePrayed, nextCard, setView }) => {
        const currentCard = sessionQueue[currentCardIndex];
        if (!currentCard) return null;

        const progress = ((currentCardIndex) / sessionQueue.length) * 100;

        return (
            <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-black">
                {/* Header */}
                <div className="p-4 flex justify-between items-center">
                    <button onClick={() => setView('home')} className="p-2 text-slate-500 hover:bg-white/10 rounded-full">
                        <X size={24} />
                    </button>
                    <div className="w-32 bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{currentCardIndex + 1}/{sessionQueue.length}</span>
                </div>

                {/* Card Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                    <div className="w-full max-w-md aspect-[3/4] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col p-8 relative overflow-hidden transition-all duration-300">
                        {/* Decorative Category Tag */}
                        <div className="absolute top-0 right-0 p-6">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest rounded-full">
                                {t.categories[currentCard.category] || currentCard.category}
                            </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center text-center">
                            <h2 className="text-2xl md:text-3xl font-bold leading-relaxed break-words">
                                {currentCard.text}
                            </h2>
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400 text-center uppercase tracking-wider">
                                {t.last_prayed} {currentCard.lastPrayed ? new Date(currentCard.lastPrayed).toLocaleDateString() : 'Never'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-8 pb-12 flex gap-4 max-w-md mx-auto w-full">
                    <button
                        onClick={nextCard}
                        className="flex-1 py-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        {t.skip}
                    </button>
                    <button
                        onClick={() => handlePrayed(currentCard.id)}
                        className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
                    >
                        {t.prayed}
                    </button>
                </div>
            </div>
        );
    };
})();
