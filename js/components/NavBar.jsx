window.Prhay = window.Prhay || {};

(() => {
    const { Home, List, BarChart2, Settings } = lucide;

    window.Prhay.NavBar = ({ view, setView }) => (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex justify-around items-center z-50">
            <button onClick={() => setView('home')} className={`p-2 rounded-xl ${view === 'home' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' : 'text-slate-400'}`}>
                <Home size={24} />
            </button>
            <button onClick={() => setView('manage')} className={`p-2 rounded-xl ${view === 'manage' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' : 'text-slate-400'}`}>
                <List size={24} />
            </button>
            <button onClick={() => setView('stats')} className={`p-2 rounded-xl ${view === 'stats' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' : 'text-slate-400'}`}>
                <BarChart2 size={24} />
            </button>
            <button onClick={() => setView('settings')} className={`p-2 rounded-xl ${view === 'settings' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' : 'text-slate-400'}`}>
                <Settings size={24} />
            </button>
        </nav>
    );
})();
