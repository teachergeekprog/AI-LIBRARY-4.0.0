import React from 'react';
import type { Service } from '../types';
import LinkIcon from './icons/LinkIcon';
import HelpIcon from './icons/HelpIcon';
import StarIcon from './icons/StarIcon';

interface ServiceCardProps {
  service: Service;
  onHelpClick: (serviceName: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onHelpClick, isFavorite, onToggleFavorite }) => {
  const showHelpButton = service.name === 'Suno' || service.name === 'ChatGPT' || service.name === 'Nano Banana';
  
  return (
    <div className="h-full bg-slate-800/50 dark:bg-gradient-to-br dark:from-stone-900 dark:to-neutral-900 border border-slate-700 dark:border-amber-900/50 rounded-xl shadow-lg dark:shadow-black/20 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-orange-400/20 hover:-translate-y-2 hover:border-sky-700 dark:hover:border-orange-800">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-sky-400 dark:text-orange-400 mb-2 pr-2 flex-1">{service.name}</h3>
            <button 
                onClick={() => onToggleFavorite(service.id)}
                className="text-slate-500 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors duration-200"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <StarIcon filled={isFavorite} className="w-6 h-6" />
            </button>
        </div>
        <p className="text-slate-300 text-base mb-6">{service.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.categories.map(category => (
            <span key={category} className="bg-slate-700 dark:bg-stone-800 text-sky-300 dark:text-orange-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/20 dark:bg-stone-900/50 p-4 border-t border-slate-700 dark:border-amber-900/50 flex justify-between items-center">
        <a 
          href={service.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group inline-flex items-center text-sm font-medium text-slate-300 hover:text-sky-400 dark:hover:text-orange-400 transition-colors"
        >
          <LinkIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Visit Service
        </a>
        {showHelpButton && (
          <button 
            onClick={() => onHelpClick(service.name)}
            className="group inline-flex items-center text-sm font-medium text-slate-300 hover:text-sky-400 dark:hover:text-orange-400 transition-colors"
          >
            <HelpIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Help
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;