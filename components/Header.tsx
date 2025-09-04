import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import HeartIcon from './icons/HeartIcon';
import SearchBar from './SearchBar';

interface HeaderProps {
    theme: 'classic' | 'autumn';
    toggleTheme: () => void;
    onSupportClick: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onSupportClick, searchTerm, onSearchChange }) => {
  return (
    <header className="bg-slate-900/60 dark:bg-stone-950/60 backdrop-blur-xl sticky top-0 z-40 w-full border-b border-slate-800 dark:border-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white truncate">
              <span className="text-sky-400 dark:text-orange-400">AI</span> Services Library
            </h1>
          </div>

          <div className="px-4 flex-grow flex justify-center">
            <div className="w-full max-w-md">
              <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0 flex items-center justify-end gap-4">
            <button
              onClick={onSupportClick}
              className="p-2 rounded-full text-sky-400 dark:text-orange-400 hover:bg-slate-800 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-stone-950 transition-all"
              aria-label="Support the author"
            >
              <HeartIcon className="w-6 h-6" />
            </button>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;