import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-sky-600 dark:bg-gradient-to-r dark:from-orange-500 dark:to-amber-500 text-white shadow-md shadow-sky-600/20 dark:shadow-orange-500/30'
                : 'bg-slate-800 dark:bg-stone-800 text-slate-300 hover:bg-slate-700 dark:hover:bg-stone-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;