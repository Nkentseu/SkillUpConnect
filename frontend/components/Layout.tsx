
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  LayoutDashboard, Users, Award, TrendingUp, CreditCard, Bell, 
  LogOut, Menu, X, User as UserIcon, BookOpen, Sun, Moon, Languages, Sparkles 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, setUser, theme, setTheme, activeTab, setActiveTab, lang, setLang, t } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), id: 'home' },
    { icon: BookOpen, label: t('myCourses'), id: 'courses' },
    { icon: Users, label: t('mentorship'), id: 'mentorship' },
    { icon: Award, label: t('certification'), id: 'certifications' },
    { icon: TrendingUp, label: t('funding'), id: 'opportunities' },
    { icon: CreditCard, label: t('billing'), id: 'billing' },
  ];

  const Logo = () => (
    <div className="flex items-center gap-2">
      <img 
        src="/images/logo.png" 
        alt="SkillUp Connect" 
        className="h-10 w-auto" 
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      />
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-brand-surface dark:bg-brand-dark">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 w-72 h-full bg-white dark:bg-brand-dark border-r border-gray-100 dark:border-white/5
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="h-24 px-8 flex items-center">
            <Logo />
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100 dark:border-white/5">
            <button 
              onClick={() => setUser(null)} 
              className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-8 flex items-center justify-between bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 dark:border-white/5">
          <button className="md:hidden p-2 rounded-xl bg-gray-50" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          
          <h2 className="hidden md:block font-bold text-brand-dark dark:text-white text-lg">
            {lang === 'en' ? 'Welcome,' : 'Bonjour,'} {user?.fullName.split(' ')[0]}
          </h2>

          <div className="flex items-center gap-3">
            <button 
               onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
               className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-white/5"
            >
               <Languages size={14} className="text-brand-primary" />
               {lang.toUpperCase()}
            </button>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 dark:border-white/5">
              {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
            </button>
            <div className="w-px h-8 bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center border border-gray-100">
                <UserIcon size={20} className="text-brand-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto animate-fade-up">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
