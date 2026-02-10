window.Prhay = window.Prhay || {};

(() => {
    const { useState } = React;
    const icon = window.Prhay.icon;
    const Plus = icon(lucide.Plus);
    const X = icon(lucide.X);
    const Trash2 = icon(lucide.Trash2);
    const Pencil = icon(lucide.Pencil);
    const Check = icon(lucide.Check);
    const NavBar = window.Prhay.NavBar;

    window.Prhay.ManageView = ({ t, prayers, addPrayer, updatePrayer, deletePrayer, setView }) => {
        const [isAdding, setIsAdding] = useState(false);
        const [newText, setNewText] = useState('');
        const [newNotes, setNewNotes] = useState('');
        const [newCat, setNewCat] = useState('Personal');
        const [newFreq, setNewFreq] = useState('daily');
        const [newWeekDays, setNewWeekDays] = useState([]);
        const [newMonthDays, setNewMonthDays] = useState([]);

        // Edit state
        const [editingId, setEditingId] = useState(null);
        const [editText, setEditText] = useState('');
        const [editNotes, setEditNotes] = useState('');
        const [editCat, setEditCat] = useState('Personal');
        const [editFreq, setEditFreq] = useState('daily');
        const [editWeekDays, setEditWeekDays] = useState([]);
        const [editMonthDays, setEditMonthDays] = useState([]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!newText.trim()) return;
            addPrayer({
                text: newText,
                notes: newNotes,
                category: newCat,
                frequency: newFreq,
                weekDays: newFreq === 'weekly' ? newWeekDays : [],
                monthDays: newFreq === 'monthly' ? newMonthDays : []
            });
            setNewText('');
            setNewNotes('');
            setNewWeekDays([]);
            setNewMonthDays([]);
            setIsAdding(false);
        };

        const startEdit = (p) => {
            setEditingId(p.id);
            setEditText(p.text);
            setEditNotes(p.notes || '');
            setEditCat(p.category);
            setEditFreq(p.frequency);
            setEditWeekDays(p.weekDays || []);
            setEditMonthDays(p.monthDays || []);
        };

        const saveEdit = () => {
            if (!editText.trim()) return;
            updatePrayer(editingId, {
                text: editText,
                notes: editNotes,
                category: editCat,
                frequency: editFreq,
                weekDays: editFreq === 'weekly' ? editWeekDays : [],
                monthDays: editFreq === 'monthly' ? editMonthDays : []
            });
            setEditingId(null);
        };

        const toggleWeekDay = (day, isEdit) => {
            const setter = isEdit ? setEditWeekDays : setNewWeekDays;
            setter(prev =>
                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
        };

        const toggleMonthDay = (day, isEdit) => {
            const setter = isEdit ? setEditMonthDays : setNewMonthDays;
            setter(prev =>
                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
            );
        };

        const scheduleLabel = (p) => {
            if (p.frequency === 'weekly' && p.weekDays && p.weekDays.length > 0) {
                return p.weekDays.slice().sort((a, b) => a - b).map(d => t.days_short[d]).join(', ');
            }
            if (p.frequency === 'monthly' && p.monthDays && p.monthDays.length > 0) {
                return p.monthDays.slice().sort((a, b) => a - b).join(', ');
            }
            return null;
        };

        // Shared day picker rendering
        const renderDayPicker = (freq, weekDays, monthDays, isEdit) => (
            <>
                {freq === 'weekly' && (
                    <div>
                        <label className="block text-sm font-medium text-stone-500 mb-2">{t.select_days}</label>
                        <div className="flex gap-1.5 justify-between">
                            {t.days_short.map((label, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => toggleWeekDay(i, isEdit)}
                                    className={`w-10 h-10 rounded-full text-xs font-bold transition-colors ${
                                        weekDays.includes(i)
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
                {freq === 'monthly' && (
                    <div>
                        <label className="block text-sm font-medium text-stone-500 mb-2">{t.select_days}</label>
                        <div className="grid grid-cols-7 gap-1.5">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleMonthDay(day, isEdit)}
                                    className={`h-9 rounded-lg text-xs font-bold transition-colors ${
                                        monthDays.includes(day)
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
            </>
        );

        return (
            <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 p-4">
                <header className="flex justify-between items-center mb-6 pt-4">
                    <h2 className="text-2xl font-bold">{t.manage_list}</h2>
                    <button
                        onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
                        className="bg-amber-600 text-white p-2 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
                    >
                        {isAdding ? <X size={24} /> : <Plus size={24} />}
                    </button>
                </header>

                {/* Add form */}
                {isAdding && (
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-xl mb-6 border border-stone-100 dark:border-stone-800">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">{t.title_placeholder}</label>
                                <textarea
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-lg resize-none"
                                    rows="2"
                                    autoFocus
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">{t.notes_placeholder}</label>
                                <textarea
                                    value={newNotes}
                                    onChange={(e) => setNewNotes(e.target.value)}
                                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm resize-none"
                                    rows="2"
                                    placeholder={t.notes_placeholder}
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

                            {renderDayPicker(newFreq, newWeekDays, newMonthDays, false)}

                            <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700">
                                {t.save}
                            </button>
                        </div>
                    </form>
                )}

                {/* Prayer list */}
                <div className="space-y-3">
                    {prayers.length === 0 && (
                        <div className="text-center py-10 text-stone-400">
                            <p>{t.no_prayers}</p>
                        </div>
                    )}
                    {prayers.map(p => {
                        const days = scheduleLabel(p);
                        const isEditing = editingId === p.id;

                        if (isEditing) {
                            return (
                                <div key={p.id} className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-lg border-2 border-amber-500/50">
                                    <div className="space-y-3">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full p-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-lg resize-none"
                                            rows="2"
                                            autoFocus
                                        />
                                        <textarea
                                            value={editNotes}
                                            onChange={(e) => setEditNotes(e.target.value)}
                                            className="w-full p-3 bg-stone-50 dark:bg-stone-800 border-none rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm resize-none"
                                            rows="2"
                                            placeholder={t.notes_placeholder}
                                        />
                                        <div className="flex gap-3">
                                            <select
                                                value={editCat}
                                                onChange={(e) => setEditCat(e.target.value)}
                                                className="flex-1 p-2 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none text-sm"
                                            >
                                                {Object.keys(t.categories).map(k => (
                                                    <option key={k} value={k}>{t.categories[k]}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={editFreq}
                                                onChange={(e) => setEditFreq(e.target.value)}
                                                className="flex-1 p-2 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none text-sm"
                                            >
                                                <option value="daily">{t.daily}</option>
                                                <option value="weekly">{t.weekly}</option>
                                                <option value="monthly">{t.monthly}</option>
                                            </select>
                                        </div>

                                        {renderDayPicker(editFreq, editWeekDays, editMonthDays, true)}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="flex-1 py-2 text-stone-500 bg-stone-100 dark:bg-stone-800 rounded-xl font-medium text-sm"
                                            >
                                                {t.cancel}
                                            </button>
                                            <button
                                                onClick={saveEdit}
                                                className="flex-1 py-2 bg-amber-600 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-1"
                                            >
                                                <Check size={16} /> {t.update}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={p.id} className="bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-200 dark:border-stone-800 flex justify-between items-start group">
                                <div className="flex-1 min-w-0" onClick={() => startEdit(p)} style={{ cursor: 'pointer' }}>
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
                                    {p.notes && (
                                        <p className="text-sm text-stone-400 dark:text-stone-500 mt-1 leading-snug">{p.notes}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 ml-2 shrink-0">
                                    <button
                                        onClick={() => startEdit(p)}
                                        className="text-stone-300 hover:text-amber-600 p-1.5"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => deletePrayer(p.id)}
                                        className="text-stone-300 hover:text-red-500 p-1.5"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <NavBar view="manage" setView={setView} />
            </div>
        );
    };
})();
