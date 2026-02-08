window.Prhay = window.Prhay || {};

(() => {
    const { useState } = React;
    const icon = window.Prhay.icon;
    const Plus = icon(lucide.Plus);
    const X = icon(lucide.X);
    const Trash2 = icon(lucide.Trash2);
    const NavBar = window.Prhay.NavBar;

    window.Prhay.ManageView = ({ t, prayers, addPrayer, deletePrayer, setView }) => {
        const [isAdding, setIsAdding] = useState(false);
        const [newText, setNewText] = useState('');
        const [newCat, setNewCat] = useState('Personal');
        const [newFreq, setNewFreq] = useState('daily');
        const [newWeekDays, setNewWeekDays] = useState([]);
        const [newMonthDays, setNewMonthDays] = useState([]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!newText.trim()) return;
            addPrayer({
                text: newText,
                category: newCat,
                frequency: newFreq,
                weekDays: newFreq === 'weekly' ? newWeekDays : [],
                monthDays: newFreq === 'monthly' ? newMonthDays : []
            });
            setNewText('');
            setNewWeekDays([]);
            setNewMonthDays([]);
            setIsAdding(false);
        };

        const toggleWeekDay = (day) => {
            setNewWeekDays(prev =>
                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
        };

        const toggleMonthDay = (day) => {
            setNewMonthDays(prev =>
                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
        };

        // Format schedule badge text for a prayer
        const scheduleLabel = (p) => {
            if (p.frequency === 'weekly' && p.weekDays && p.weekDays.length > 0) {
                return p.weekDays
                    .slice().sort((a, b) => a - b)
                    .map(d => t.days_short[d])
                    .join(', ');
            }
            if (p.frequency === 'monthly' && p.monthDays && p.monthDays.length > 0) {
                return p.monthDays
                    .slice().sort((a, b) => a - b)
                    .join(', ');
            }
            return null;
        };

        return (
            <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 p-4">
                <header className="flex justify-between items-center mb-6 pt-4">
                    <h2 className="text-2xl font-bold">{t.manage_list}</h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-amber-600 text-white p-2 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
                    >
                        {isAdding ? <X size={24} /> : <Plus size={24} />}
                    </button>
                </header>

                {isAdding && (
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-xl mb-6 border border-stone-100 dark:border-stone-800 animate-in slide-in-from-top-4 duration-300">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">{t.title_placeholder}</label>
                                <textarea
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-lg resize-none"
                                    rows="3"
                                    autoFocus
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-stone-500 mb-1">{t.category}</label>
                                    <select
                                        value={newCat}
                                        onChange={(e) => setNewCat(e.target.value)}
                                        className="w-full p-3 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none"
                                    >
                                        {Object.keys(t.categories).map(k => (
                                            <option key={k} value={k}>{t.categories[k]}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-stone-500 mb-1">{t.frequency}</label>
                                    <select
                                        value={newFreq}
                                        onChange={(e) => setNewFreq(e.target.value)}
                                        className="w-full p-3 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none"
                                    >
                                        <option value="daily">{t.daily}</option>
                                        <option value="weekly">{t.weekly}</option>
                                        <option value="monthly">{t.monthly}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Weekly day picker */}
                            {newFreq === 'weekly' && (
                                <div>
                                    <label className="block text-sm font-medium text-stone-500 mb-2">{t.select_days}</label>
                                    <div className="flex gap-1.5 justify-between">
                                        {t.days_short.map((label, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => toggleWeekDay(i)}
                                                className={`w-10 h-10 rounded-full text-xs font-bold transition-colors ${
                                                    newWeekDays.includes(i)
                                                        ? 'bg-amber-600 text-white'
                                                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Monthly day picker */}
                            {newFreq === 'monthly' && (
                                <div>
                                    <label className="block text-sm font-medium text-stone-500 mb-2">{t.select_days}</label>
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => toggleMonthDay(day)}
                                                className={`h-9 rounded-lg text-xs font-bold transition-colors ${
                                                    newMonthDays.includes(day)
                                                        ? 'bg-amber-600 text-white'
                                                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700">
                                {t.save}
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-3">
                    {prayers.length === 0 && (
                        <div className="text-center py-10 text-stone-400">
                            <p>{t.no_prayers}</p>
                        </div>
                    )}
                    {prayers.map(p => {
                        const days = scheduleLabel(p);
                        return (
                            <div key={p.id} className="bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 flex justify-between items-start group">
                                <div>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 rounded-md">
                                            {t.categories[p.category] || p.category}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md">
                                            {p.frequency}
                                        </span>
                                        {days && (
                                            <span className="text-[10px] font-medium px-2 py-0.5 bg-stone-50 dark:bg-stone-800 text-stone-400 rounded-md">
                                                {days}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-lg leading-tight">{p.text}</h3>
                                </div>
                                <button
                                    onClick={() => deletePrayer(p.id)}
                                    className="text-stone-300 hover:text-red-500 p-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <NavBar view="manage" setView={setView} />
            </div>
        );
    };
})();
