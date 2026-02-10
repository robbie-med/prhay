window.Prhay = window.Prhay || {};

(() => {
    const { useState } = React;
    const icon = window.Prhay.icon;
    const Moon = icon(lucide.Moon);
    const Globe = icon(lucide.Globe);
    const Bell = icon(lucide.Bell);
    const Download = icon(lucide.Download);
    const Upload = icon(lucide.Upload);
    const Plus = icon(lucide.Plus);
    const Minus = icon(lucide.Minus);
    const X = icon(lucide.X);
    const List = icon(lucide.List);
    const NavBar = window.Prhay.NavBar;
    const getListLabel = window.Prhay.getListLabel;

    window.Prhay.SettingsView = ({ t, settings, setSettings, prayers, stats, setPrayers, setStats, setView }) => {
        const [newListName, setNewListName] = useState('');

        const exportData = () => {
            const dataStr = JSON.stringify({ prayers, stats, settings });
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `prhay_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        };

        const importData = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.prayers) setPrayers(data.prayers);
                    if (data.stats) setStats(data.stats);
                    if (data.settings) setSettings(data.settings);
                    alert("Import successful!");
                } catch (err) {
                    alert("Invalid file format.");
                }
            };
            reader.readAsText(file);
        };

        const lists = settings.lists || [];

        const updateListCount = (index, delta) => {
            const updated = lists.map((l, i) =>
                i === index ? { ...l, count: Math.max(0, l.count + delta) } : l
            );
            setSettings({ ...settings, lists: updated });
        };

        const removeList = (index) => {
            if (!confirm(t.delete_list_confirm)) return;
            setSettings({ ...settings, lists: lists.filter((_, i) => i !== index) });
        };

        const addList = () => {
            const name = newListName.trim();
            if (!name) return;
            if (lists.some(l => l.name.toLowerCase() === name.toLowerCase())) return;
            setSettings({ ...settings, lists: [...lists, { name, count: 1 }] });
            setNewListName('');
        };

        return (
            <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 p-6">
                <h2 className="text-2xl font-bold mb-6 pt-4">{t.settings}</h2>

                <div className="space-y-6">
                    {/* Appearance Section */}
                    <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
                        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 rounded-lg"><Moon size={20}/></div>
                                <span className="font-medium">{t.dark_mode}</span>
                            </div>
                            <button
                                onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-amber-600' : 'bg-stone-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${settings.darkMode ? 'translate-x-6' : ''}`}></div>
                            </button>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-lg"><Globe size={20}/></div>
                                <span className="font-medium">{t.language}</span>
                            </div>
                            <select
                                value={settings.lang}
                                onChange={(e) => setSettings({...settings, lang: e.target.value})}
                                className="bg-stone-100 dark:bg-stone-800 rounded-lg p-2 text-sm outline-none"
                            >
                                <option value="en">English</option>
                                <option value="ko">{'\ud55c\uad6d\uc5b4'}</option>
                            </select>
                        </div>
                    </section>

                    {/* Prayer Lists Section */}
                    <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
                        <div className="p-4 border-b border-stone-100 dark:border-stone-800">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 rounded-lg"><List size={20}/></div>
                                <span className="font-medium">{t.lists_section}</span>
                            </div>
                            <p className="text-xs text-stone-400 ml-11">{t.lists_description}</p>
                        </div>

                        <div className="divide-y divide-stone-100 dark:divide-stone-800">
                            {lists.map((list, i) => {
                                const itemCount = prayers.filter(p => p.category === list.name).length;
                                return (
                                    <div key={list.name} className="p-4 flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{getListLabel(list.name, t)}</p>
                                            <p className="text-xs text-stone-400">{itemCount} items</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateListCount(i, -1)}
                                                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{list.count}</span>
                                            <button
                                                onClick={() => updateListCount(i, 1)}
                                                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700"
                                            >
                                                <Plus size={14} />
                                            </button>
                                            <span className="text-xs text-stone-400 w-8">{t.per_day}</span>
                                            <button
                                                onClick={() => removeList(i)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-stone-100 dark:border-stone-800 flex gap-2">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addList()}
                                placeholder={t.new_list_placeholder}
                                className="flex-1 p-2 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none text-sm"
                            />
                            <button
                                onClick={addList}
                                disabled={!newListName.trim()}
                                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.add_list}
                            </button>
                        </div>
                    </section>

                    {/* Notifications Section (ntfy) */}
                    <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg"><Bell size={20}/></div>
                                <span className="font-medium">{t.notifications}</span>
                            </div>
                            <p className="text-xs text-stone-400">{t.ntfy_description}</p>
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">{t.ntfy_topic}</label>
                                <input
                                    type="url"
                                    value={settings.ntfyTopic || ''}
                                    onChange={(e) => setSettings({...settings, ntfyTopic: e.target.value})}
                                    placeholder={t.ntfy_placeholder}
                                    className="w-full p-3 bg-stone-50 dark:bg-stone-800 rounded-xl outline-none text-sm"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    if (settings.ntfyTopic) {
                                        window.Prhay.sendNtfyNotification(
                                            settings.ntfyTopic,
                                            t.app_name,
                                            t.ntfy_test_body,
                                            { tags: 'pray' }
                                        );
                                    }
                                }}
                                disabled={!settings.ntfyTopic}
                                className="w-full p-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.ntfy_test}
                            </button>
                        </div>
                    </section>

                    {/* Data Section */}
                    <section className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden p-4 space-y-4">
                        <button onClick={exportData} className="w-full flex items-center justify-center gap-2 p-3 bg-stone-100 dark:bg-stone-800 rounded-xl font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                            <Download size={18} /> {t.export}
                        </button>
                        <label className="w-full flex items-center justify-center gap-2 p-3 bg-stone-100 dark:bg-stone-800 rounded-xl font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer">
                            <Upload size={18} /> {t.import}
                            <input type="file" onChange={importData} accept=".json" className="hidden" />
                        </label>
                    </section>
                </div>

                <div className="mt-8 mb-4 text-center">
                    <p className="text-xs text-stone-400 dark:text-stone-600">
                        FOSS by robbiemed 2026 | <a href="https://robbiemed.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-600">robbiemed.org</a> | SDG
                    </p>
                </div>

                <NavBar view="settings" setView={setView} />
            </div>
        );
    };
})();
