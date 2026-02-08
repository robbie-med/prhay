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
            <div className="min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 p-6">
                <h2 className="text-2xl font-bold mb-6 pt-4">{t.settings}</h2>

                <div className="space-y-6">
                    {/* Visual Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Moon size={20}/></div>
                                <span className="font-medium">{t.dark_mode}</span>
                            </div>
                            <button
                                onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${settings.darkMode ? 'translate-x-6' : ''}`}></div>
                            </button>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg"><Globe size={20}/></div>
                                <span className="font-medium">{t.language}</span>
                            </div>
                            <select
                                value={settings.lang}
                                onChange={(e) => setSettings({...settings, lang: e.target.value})}
                                className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-sm outline-none"
                            >
                                <option value="en">English</option>
                                <option value="ko">{'\ud55c\uad6d\uc5b4'}</option>
                            </select>
                        </div>
                    </section>

                    {/* Notifications Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg"><Bell size={20}/></div>
                                <span className="font-medium">{t.notifications}</span>
                            </div>
                            <button
                                onClick={() => {
                                    if(window.OneSignalDeferred) window.OneSignalDeferred.push(os => os.showSlidedownPrompt());
                                }}
                                className="text-sm font-bold text-blue-600 hover:underline"
                            >
                                {t.enable_notify}
                            </button>
                        </div>
                    </section>

                    {/* Data Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden p-4 space-y-4">
                        <button onClick={exportData} className="w-full flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <Download size={18} /> {t.export}
                        </button>
                        <label className="w-full flex items-center justify-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                            <Upload size={18} /> {t.import}
                            <input type="file" onChange={importData} accept=".json" className="hidden" />
                        </label>
                    </section>
                </div>

                <NavBar view="settings" setView={setView} />
            </div>
        );
    };
})();
