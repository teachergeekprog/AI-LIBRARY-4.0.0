import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 dark:bg-gradient-to-br dark:from-stone-900 dark:to-neutral-900 border border-slate-700 dark:border-stone-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <header className="flex justify-between items-center p-4 border-b border-slate-700 dark:border-stone-700">
          <h3 className="text-xl font-bold text-sky-500 dark:text-orange-400">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto text-slate-300">
          {children}
        </main>
        <footer className="p-4 border-t border-slate-700 dark:border-stone-700 mt-auto">
          <div className="modal-actions flex justify-end">
            <button
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors dark:bg-orange-500 dark:hover:bg-orange-600"
              onClick={onClose}
            >
              Закрити
            </button>
          </div>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;