import React from 'react';
import { useState, useEffect } from 'react';
import type { Service } from './types';
import { defaultServices, CATEGORIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import CategoryFilter from './components/CategoryFilter';
import Modal from './components/Modal';
import LoadingSpinner from './components/icons/LoadingSpinner';
import FallingLeaves from './components/FallingLeaves';
import SupportModal from './components/SupportModal';
import ScrollToTopButton from './components/ScrollToTopButton';

type Theme = 'classic' | 'autumn';

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSunoHelpVisible, setSunoHelpVisible] = useState(false);
  const [isChatGptHelpVisible, setChatGptHelpVisible] = useState(false);
  const [isNanoBananaHelpVisible, setNanoBananaHelpVisible] = useState(false);
  const [isSupportModalVisible, setSupportModalVisible] = useState(false);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const storedFavorites = localStorage.getItem('ai_services_favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'classic' || storedTheme === 'autumn') {
        return storedTheme;
      }
    }
    return 'classic'; // Default theme
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'classic' ? 'autumn' : 'classic'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'autumn') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('ai_services_favorites', JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favoriteIds]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = defaultServices.filter(s => s.active !== false);

      if (selectedCategory === 'Favorites') {
          filtered = filtered.filter(service => favoriteIds.includes(service.id));
      } else if (selectedCategory !== 'All') {
        filtered = filtered.filter(service => service.categories.includes(selectedCategory));
      }

      if (searchTerm.trim() !== '') {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(service =>
          service.name.toLowerCase().includes(lowercasedTerm) ||
          service.description.toLowerCase().includes(lowercasedTerm)
        );
      }

      setServices(filtered);
      setIsLoading(false);
    }, 300); // Simulate loading

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, favoriteIds]);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleHelpClick = (serviceName: string) => {
    if (serviceName === 'Suno') {
      setSunoHelpVisible(true);
    } else if (serviceName === 'ChatGPT') {
      setChatGptHelpVisible(true);
    } else if (serviceName === 'Nano Banana') {
      setNanoBananaHelpVisible(true);
    }
  };

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {theme === 'autumn' && <FallingLeaves />}
      <div className="min-h-screen flex flex-col font-sans text-slate-200 bg-transparent relative z-10">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onSupportClick={() => setSupportModalVisible(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white dark:text-amber-50 sm:text-4xl">Explore AI Services</h2>
              <p className="mt-4 text-lg text-slate-400">Find the best AI tools for your creative and professional projects.</p>
            </div>

            <div className="sticky md:static top-16 bg-slate-900/60 dark:bg-stone-950/60 backdrop-blur-xl z-30 py-4 border-y border-slate-800 dark:border-amber-900 md:border-none md:py-0 md:bg-transparent dark:md:bg-transparent md:backdrop-blur-none">
                <CategoryFilter categories={CATEGORIES} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>
            
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full py-16">
                  <LoadingSpinner className="w-12 h-12 text-sky-400 dark:text-orange-400" />
                </div>
              ) : services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {services.map(service => (
                        <ServiceCard 
                          key={service.id} 
                          service={service} 
                          onHelpClick={handleHelpClick}
                          isFavorite={favoriteIds.includes(service.id)}
                          onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
              ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-slate-400">No services found. Try adjusting your search or filter.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
        
        {/* Suno Help Modal */}
        <Modal isVisible={isSunoHelpVisible} onClose={() => setSunoHelpVisible(false)} title="Suno: Поради та гайд">
          <div className="space-y-4 text-sm">
              <h4 className="font-bold text-sky-500 dark:text-orange-400 text-lg">🪙 Поради для крутої генерації</h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Спробуйте заспівати текст</strong> — якщо важко, вийде реп незалежно від жанру.</li>
                <li><strong>Робіть куплети та приспів різного розміру</strong> — так Suno легше зробить гарний перехід.</li>
                <li><strong>Наголоси — через велику літеру</strong>, наприклад «трЕба» або «требЯ».</li>
                <li><strong>Додавайте бек-вокал у (лапках)</strong> — це працює!</li>
                <li><strong>Коригуйте жанр:</strong> <em>Slow, Fast, Aggressive</em>, або <em>With Female/Male vocals</em>.</li>
                <li><strong>Розмічайте пісню:</strong> [Verse], [Chorus], [Bridge], [Guitar Solo], [Piano Solo].</li>
              </ul>

              <div className="tip bg-slate-800/50 dark:bg-stone-800/50 p-3 rounded-lg border border-slate-700 dark:border-stone-700">
                <div className="guide-title font-bold text-slate-200">📌 1️⃣ База:</div>
                <p>Suno V3 генерує пісні до 2 хвилин. Краще: закинути весь текст, потім натиснути «Continue from this song» і видаляти згенероване. Потім «Get Whole song» збере все в одну композицію.</p>
              </div>

               <div className="tip bg-slate-800/50 dark:bg-stone-800/50 p-3 rounded-lg border border-slate-700 dark:border-stone-700">
                <div className="guide-title font-bold text-slate-200">📌 2️⃣ Метатеги:</div>
                <p>Обов’язково використовуйте:</p>
                <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                  <li>[Intro]</li>
                  <li>[Verse 1], [Verse 2]</li>
                  <li>[Pre-chorus]</li>
                  <li>[Chorus]</li>
                  <li>[Bridge]</li>
                  <li>[Guitar Solo], [Piano Solo]</li>
                  <li>[Outro], [Fade out], [End] — без цього пісня може не закінчитися</li>
                </ul>
              </div>

              <div className="tip bg-slate-800/50 dark:bg-stone-800/50 p-3 rounded-lg border border-slate-700 dark:border-stone-700">
                <div className="guide-title font-bold text-slate-200">📌 5️⃣ Бек-вокал та мелізми:</div>
                <p>Текст у <em>(лапках)</em> — це бек-вокал. Для витягнення: пишіть (а-а-а-о-о-о).</p>
              </div>
          </div>
        </Modal>

        {/* ChatGPT Help Modal */}
        <Modal isVisible={isChatGptHelpVisible} onClose={() => setChatGptHelpVisible(false)} title="ChatGPT: Поради для промптингу">
          <div className="space-y-4 text-sm">
              <h4 className="font-bold text-sky-500 dark:text-orange-400 text-lg">🎯 Ефективні промпти</h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Будьте конкретні:</strong> замість "напиши текст" — "напиши рекламний пост для Instagram про новий смартфон, 100 слів, стиль: молодіжний, з емодзі".</li>
                <li><strong>Вкажіть роль:</strong> "Ти — досвідчений маркетолог. Склади план контенту на тиждень для бренду кави".</li>
                <li><strong>Використовуйте метафори:</strong> "Поясни, як працює блокчейн, якщо б я був 5-річною дитиною".</li>
                <li><strong>Розбивайте на кроки:</strong> "1. Запропонуй 5 ідей для назви. 2. Обери найкращу. 3. Напиши опис".</li>
              </ul>

              <div className="tip bg-slate-800/50 dark:bg-stone-800/50 p-3 rounded-lg border border-slate-700 dark:border-stone-700">
                <div className="guide-title font-bold text-slate-200">📌 1️⃣ Системні промпти:</div>
                <p>Починайте з: "Ти — професійний копірайтер. Пиши в стилі [опис стилю]. Зберігай тон: [тон]."</p>
              </div>
              
              <div className="tip bg-slate-800/50 dark:bg-stone-800/50 p-3 rounded-lg border border-slate-700 dark:border-stone-700">
                <div className="guide-title font-bold text-slate-200">📌 5️⃣ Найкращі ресурси:</div>
                <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                  <li><a href="https://flowgpt.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline dark:text-orange-400">FlowGPT</a> — найбільша спільнота промптів.</li>
                  <li><a href="https://www.awesomegptprompts.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline dark:text-orange-400">Awesome GPT Prompts</a> — 150+ готових шаблонів.</li>
                  <li><a href="https://writesonic.com/blog/chatgpt-prompts/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline dark:text-orange-400">Writesonic</a> — 215+ промптів для маркетингу.</li>
                  <li><a href="https://www.aiforwork.co/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline dark:text-orange-400">AIforwork</a> — 2000+ промптів для професіоналів.</li>
                </ul>
              </div>
          </div>
        </Modal>

        {/* Nano Banana Help Modal */}
        <Modal isVisible={isNanoBananaHelpVisible} onClose={() => setNanoBananaHelpVisible(false)} title="Nano Banana: Можливості та гайд">
          <div className="space-y-4 text-sm">
              <h4 className="font-bold text-sky-500 dark:text-orange-400 text-lg">Що вміє Nano Banana</h4>
              <ol className="list-decimal list-inside space-y-3 pl-2">
                <li>
                  <strong>Генерація зображень по тексту</strong>
                  <p className="pl-4 mt-1 text-slate-400">Модель створює фотореалістичні зображення з коректною композицією, освітленням та фоном. Головна перевага — стабільність: персонаж залишається впізнаваним у різних сценах.</p>
                  <div className="pl-4 mt-2 bg-slate-800/50 dark:bg-stone-800/50 p-2 rounded border border-slate-700 dark:border-stone-700">
                    <code className="text-xs text-slate-300">Prompt: "A character in cyberpunk armor standing in neon-lit Tokyo street at night"</code>
                  </div>
                </li>
                <li>
                  <strong>Локальне редагування за описом</strong>
                  <p className="pl-4 mt-1 text-slate-400">Модель може замінити фон, адаптувати колірну температуру, зберігши при цьому обличчя, позу та деталі персонажа.</p>
                  <div className="pl-4 mt-2 bg-slate-800/50 dark:bg-stone-800/50 p-2 rounded border border-slate-700 dark:border-stone-700">
                    <code className="text-xs text-slate-300">Prompt: "Same image, but replace the background with a desert and make the lighting warm"</code>
                  </div>
                </li>
                <li>
                  <strong>Підтримка стилістики і перетворень</strong>
                  <p className="pl-4 mt-1 text-slate-400">Розуміє складні команди для зміни стилю всього зображення.</p>
                  <div className="pl-4 mt-2 bg-slate-800/50 dark:bg-stone-800/50 p-2 rounded border border-slate-700 dark:border-stone-700">
                    <code className="block text-xs text-slate-300">"Convert the entire scene into watercolor style"</code>
                    <code className="block text-xs text-slate-300">"Make it look like an 80s anime frame"</code>
                  </div>
                </li>
              </ol>

              <h4 className="font-bold text-sky-500 dark:text-orange-400 text-lg pt-2">Відмінності від інших рішень</h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Підтримка мультимодальності:</strong> Доступна вже у preview-версії.</li>
                <li><strong>Швидкість:</strong> До 30 разів швидше за попередні моделі Google (затримка).</li>
                <li><strong>Пам'ять і консистенція:</strong> Стабільні обличчя, пози, освітлення від сцени до сцени.</li>
                <li><strong>Легкість API-інтеграції:</strong> Інтегрується через стандартний Gemini SDK.</li>
              </ul>
          </div>
        </Modal>

        {/* Support Modal */}
        <SupportModal isVisible={isSupportModalVisible} onClose={() => setSupportModalVisible(false)} />

        <ScrollToTopButton isVisible={isScrollButtonVisible} onClick={scrollToTop} />
      </div>
    </>
  );
};

export default App;