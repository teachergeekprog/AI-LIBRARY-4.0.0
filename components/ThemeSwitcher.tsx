import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface ThemeSwitcherProps {
  theme: 'classic' | 'autumn';
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full ring-2 ring-sky-500 dark:ring-orange-500 text-sky-400 dark:text-orange-400 hover:bg-slate-800 dark:hover:bg-stone-800 focus:outline-none focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-orange-500 focus:ring-offset-slate-900 dark:focus:ring-offset-stone-950 transition-all"
      aria-label="Toggle style"
    >
      {theme === 'classic' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeSwitcher;