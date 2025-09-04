import React, { useState } from 'react';
import CloseIcon from './icons/CloseIcon';

interface SupportModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isVisible, onClose }) => {
  const [amount, setAmount] = useState<number | string>(100);
  const presetAmounts = [50, 100, 200, 500];

  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAmountClick = (value: number) => {
    setAmount(value);
    const customInput = document.getElementById('customAmount') as HTMLInputElement;
    if (customInput) customInput.value = '';
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-900 dark:bg-gradient-to-br dark:from-stone-900 dark:to-neutral-900 border border-slate-700 dark:border-stone-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-fade-in-up">
        <header className="flex justify-between items-center p-4 border-b border-slate-700 dark:border-stone-700">
          <h3 className="text-xl font-bold text-sky-500 dark:text-orange-400">Підтримати автора</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 overflow-y-auto text-slate-300">
          <div className="space-y-6">
            <p className="text-center">Ваша підтримка допомагає розвивати цей проект!</p>
            
            <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Оберіть суму (₴)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {presetAmounts.map(preset => (
                        <button 
                            key={preset}
                            onClick={() => handleAmountClick(preset)}
                            className={`px-4 py-3 rounded-md text-center font-semibold transition-all duration-200 border-2 ${amount === preset 
                                ? 'bg-sky-600 border-sky-500 text-white dark:bg-orange-600 dark:border-orange-500' 
                                : 'bg-slate-800 border-slate-700 hover:border-sky-600 dark:bg-stone-800 dark:border-stone-700 dark:hover:border-orange-600'}`}
                        >
                            {preset} ₴
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="customAmount" className="block text-sm font-medium text-slate-400 mb-2">Або введіть свою суму</label>
                <input
                    id="customAmount"
                    type="number"
                    placeholder="Інша сума"
                    onChange={handleCustomAmountChange}
                    onFocus={() => setAmount('')}
                    className="w-full bg-slate-800 border-slate-700 rounded-md py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-orange-500 dark:bg-stone-800 dark:border-stone-700 transition-colors"
                />
            </div>

            <div className="space-y-3 pt-4">
               <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white text-black font-semibold transition-opacity hover:opacity-90">
                    GooglePay
               </button>
               <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-black text-white font-semibold transition-opacity hover:opacity-90">
                    ApplePay
               </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center pt-2">
              *Це демонстраційне вікно. Реальні платежі не обробляються.
            </p>

          </div>
        </main>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        /* Hide number input spinners */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default SupportModal;