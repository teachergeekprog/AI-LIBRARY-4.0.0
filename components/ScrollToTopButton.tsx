import React from 'react';
import ArrowUpIcon from './icons/ArrowUpIcon';

interface ScrollToTopButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-sky-600 dark:bg-orange-600 text-white shadow-lg dark:shadow-black/40 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-sky-700 dark:hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-sky-500/50 dark:focus:ring-orange-500/50 ${
          isVisible ? 'opacity-100 translate-y-0 animate-pulse-themed' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
      <style>{`
        @keyframes pulse-light {
          0% {
            box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(2, 132, 199, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(2, 132, 199, 0);
          }
        }
        
        @keyframes pulse-dark {
          0% {
            box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(234, 88, 12, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(234, 88, 12, 0);
          }
        }
        
        .animate-pulse-themed {
          animation: pulse-light 2s infinite;
        }
        
        .dark .animate-pulse-themed {
          animation-name: pulse-dark;
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
