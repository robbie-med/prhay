window.Prhay = window.Prhay || {};

(() => {
    const { useState, useEffect } = React;
    const {
        TRANSLATIONS, sendNtfyNotification, buildSessionQueue,
        HomeView, SessionView, CompleteView,
        ManageView, StatsView, SettingsView
    } = window.Prhay;

    const App = () => {
        // -- State --
        const [view, setView] = useState('home');
        const [prayers, setPrayers] = useState([]);
        const [sessionQueue, setSessionQueue] = useState([]);
        const [currentCardIndex, setCurrentCardIndex] = useState(0);
        const [stats, setStats] = useState({ streak: 0, lastDate: null, history: {} });
        const [settings, setSettings] = useState({
            darkMode: true,
            lang: 'en',
            dailyGoal: 5,
            ntfyTopic: ''
        });

        // -- Load / Save Logic --
        useEffect(() => {
            const loadedPrayers = localStorage.getItem('prhay_prayers');
            const loadedStats = localStorage.getItem('prhay_stats');
            const loadedSettings = localStorage.getItem('prhay_settings');

            if (loadedPrayers) setPrayers(JSON.parse(loadedPrayers));
            if (loadedStats) setStats(JSON.parse(loadedStats));
            if (loadedSettings) setSettings(JSON.parse(loadedSettings));

            // ntfy notifications are sent on-demand (no init needed)
        }, []);

        useEffect(() => {
            localStorage.setItem('prhay_prayers', JSON.stringify(prayers));
        }, [prayers]);

        useEffect(() => {
            localStorage.setItem('prhay_stats', JSON.stringify(stats));
        }, [stats]);

        useEffect(() => {
            localStorage.setItem('prhay_settings', JSON.stringify(settings));
            if (settings.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, [settings]);

        const t = TRANSLATIONS[settings.lang];

        // -- Logic: Start Session --
        const startSession = (filter) => {
            const queue = buildSessionQueue(prayers, settings.dailyGoal, { category: filter || 'all' });
            if (queue.length === 0) return;
            setSessionQueue(queue);
            setCurrentCardIndex(0);
            setView('session');
        };

        // -- Logic: Mark Prayed --
        const handlePrayed = (id) => {
            const now = new Date().getTime();
            const todayStr = new Date().toISOString().split('T')[0];

            const updatedPrayers = prayers.map(p =>
                p.id === id ? { ...p, lastPrayed: now, count: (p.count || 0) + 1 } : p
            );
            setPrayers(updatedPrayers);

            const newHistory = { ...stats.history, [todayStr]: (stats.history[todayStr] || 0) + 1 };

            let newStreak = stats.streak;
            if (stats.lastDate !== todayStr) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (stats.lastDate === yesterdayStr) {
                    newStreak++;
                } else if (stats.lastDate !== todayStr) {
                    newStreak = 1;
                }
            }

            setStats({ ...stats, streak: newStreak, lastDate: todayStr, history: newHistory });
            nextCard();
        };

        const nextCard = () => {
            if (currentCardIndex < sessionQueue.length - 1) {
                setCurrentCardIndex(prev => prev + 1);
            } else {
                setView('complete');
                // Schedule a reminder for tomorrow via ntfy
                if (settings.ntfyTopic) {
                    sendNtfyNotification(
                        settings.ntfyTopic,
                        t.app_name,
                        t.session_complete_sub,
                        { tags: 'pray', delay: '24h' }
                    );
                }
            }
        };

        // -- CRUD --
        const addPrayer = (prayer) => {
            const newPrayer = {
                id: Date.now(),
                text: prayer.text,
                category: prayer.category,
                frequency: prayer.frequency,
                weekDays: prayer.weekDays || [],
                monthDays: prayer.monthDays || [],
                lastPrayed: 0,
                createdAt: Date.now()
            };
            setPrayers([newPrayer, ...prayers]);
        };

        const deletePrayer = (id) => {
            if (confirm(t.delete_confirm)) {
                setPrayers(prayers.filter(p => p.id !== id));
            }
        };

        // -- View Routing --
        if (view === 'home') {
            return <HomeView t={t} stats={stats} settings={settings} prayers={prayers} startSession={startSession} setView={setView} />;
        }
        if (view === 'session') {
            return <SessionView t={t} sessionQueue={sessionQueue} currentCardIndex={currentCardIndex} handlePrayed={handlePrayed} nextCard={nextCard} setView={setView} />;
        }
        if (view === 'complete') {
            return <CompleteView t={t} setView={setView} />;
        }
        if (view === 'manage') {
            return <ManageView t={t} prayers={prayers} addPrayer={addPrayer} deletePrayer={deletePrayer} setView={setView} />;
        }
        if (view === 'stats') {
            return <StatsView t={t} stats={stats} prayers={prayers} setView={setView} />;
        }
        if (view === 'settings') {
            return <SettingsView t={t} settings={settings} setSettings={setSettings} prayers={prayers} stats={stats} setPrayers={setPrayers} setStats={setStats} setView={setView} />;
        }

        return null;
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
})();
