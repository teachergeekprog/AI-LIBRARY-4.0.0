import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-slate-800 dark:border-amber-900 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} AI Services Library. All rights reserved.</p>
        <p className="text-sm mt-1">A curated collection of amazing AI tools.</p>
      </div>
    </footer>
  );
};

export default Footer;