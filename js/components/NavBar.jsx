window.Prhay = window.Prhay || {};

(() => {
    const icon = window.Prhay.icon;
    const Home = icon(lucide.Home);
    const List = icon(lucide.List);
    const BarChart2 = icon(lucide.BarChart2);
    const Settings = icon(lucide.Settings);

    window.Prhay.NavBar = ({ view, setView }) => (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 p-4 flex justify-around items-center z-50">
            <button onClick={() => setView('home')} className={`p-2 rounded-xl ${view === 'home' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800' : 'text-stone-400'}`}>
                <Home size={24} />
            </button>
            <button onClick={() => setView('manage')} className={`p-2 rounded-xl ${view === 'manage' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800' : 'text-stone-400'}`}>
                <List size={24} />
            </button>
            <button onClick={() => setView('stats')} className={`p-2 rounded-xl ${view === 'stats' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800' : 'text-stone-400'}`}>
                <BarChart2 size={24} />
            </button>
            <button onClick={() => setView('settings')} className={`p-2 rounded-xl ${view === 'settings' ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800' : 'text-stone-400'}`}>
                <Settings size={24} />
            </button>
        </nav>
    );
})();
