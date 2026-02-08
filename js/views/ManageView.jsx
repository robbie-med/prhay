window.Prhay = window.Prhay || {};

(() => {
    const { useState } = React;
    const { Plus, X, Trash2 } = lucide;
    const NavBar = window.Prhay.NavBar;

    window.Prhay.ManageView = ({ t, prayers, addPrayer, deletePrayer, setView }) => {
        const [isAdding, setIsAdding] = useState(false);
        const [newText, setNewText] = useState('');
        const [newCat, setNewCat] = useState('Personal');
        const [newFreq, setNewFreq] = useState('daily');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!newText.trim()) return;
            addPrayer({ text: newText, category: newCat, frequency: newFreq });
            setNewText('');
            setIsAdding(false);
        };

        return (
            <div className="min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 p-4">
                <header className="flex justify-between items-center mb-6 pt-4">
                    <h2 className="text-2xl font-bold">{t.manage_list}</h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        {isAdding ? <X size={24} /> : <Plus size={24} />}
                    </button>
                </header>

                {isAdding && (
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl mb-6 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-4 duration-300">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">{t.title_placeholder}</label>
                                <textarea
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg resize-none"
                                    rows="3"
                                    autoFocus
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t.category}</label>
                                    <select
                                        value={newCat}
                                        onChange={(e) => setNewCat(e.target.value)}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none"
                                    >
                                        {Object.keys(t.categories).map(k => (
                                            <option key={k} value={k}>{t.categories[k]}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t.frequency}</label>
                                    <select
                                        value={newFreq}
                                        onChange={(e) => setNewFreq(e.target.value)}
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none"
                                    >
                                        <option value="daily">{t.daily}</option>
                                        <option value="weekly">{t.weekly}</option>
                                        <option value="monthly">{t.monthly}</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
                                {t.save}
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-3">
                    {prayers.length === 0 && (
                        <div className="text-center py-10 text-slate-400">
                            <p>{t.no_prayers}</p>
                        </div>
                    )}
                    {prayers.map(p => (
                        <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex justify-between items-start group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                                        {t.categories[p.category] || p.category}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                                        {p.frequency}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-lg leading-tight">{p.text}</h3>
                            </div>
                            <button
                                onClick={() => deletePrayer(p.id)}
                                className="text-slate-300 hover:text-red-500 p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
                <NavBar view="manage" setView={setView} />
            </div>
        );
    };
})();
