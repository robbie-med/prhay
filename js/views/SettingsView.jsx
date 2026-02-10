window.Prhay = window.Prhay || {};

(() => {
    const icon = window.Prhay.icon;
    const Moon = icon(lucide.Moon);
    const Globe = icon(lucide.Globe);
    const Bell = icon(lucide.Bell);
    const Download = icon(lucide.Download);
    const Upload = icon(lucide.Upload);
    const NavBar = window.Prhay.NavBar;

    window.Prhay.SettingsView = ({ t, settings, setSettings, prayers, stats, setPrayers, setStats, setView }) => {
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
