
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Language, Theme, User } from './types.ts';
import { translations } from './translations.ts';
import { db } from './db.ts';
import Auth from './pages/Auth.tsx';
import Landing from './pages/Landing.tsx';
import Payment from './pages/Payment.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Mentorship from './pages/Mentorship.tsx';
import Courses from './pages/Courses.tsx';
import Opportunities from './pages/Opportunities.tsx';
import Certifications from './pages/Certifications.tsx';
import Layout from './components/Layout.tsx';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [lang, setLang] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const currentUser = db.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setShowAuth(false);
    }
  }, []);

  const t = (key: string) => translations[key]?.[lang] || key;

  const handleSetUser = (u: User | null) => {
    if (u) {
      db.saveUser(u);
      setUser(u);
      setShowAuth(false);
    } else {
      db.logout();
      setUser(null);
      setShowAuth(false);
    }
  };

  const handleStart = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (activeTab === 'billing' && !user?.hasPaid) return <Payment />;
    
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'mentorship': return <Mentorship />;
      case 'courses': return <Courses />;
      case 'opportunities': return <Opportunities />;
      case 'certifications': return <Certifications />;
      case 'billing': return <Payment />;
      default: return <Dashboard />;
    }
  };

  if (!user) {
    if (showAuth) {
      return (
        <AppContext.Provider value={{ 
          user, setUser: handleSetUser, lang, setLang, theme, setTheme, t, activeTab, setActiveTab, authMode, setAuthMode
        }}>
          <div className="relative animate-fade-in">
             <button 
               onClick={() => setShowAuth(false)}
               className="fixed top-10 left-10 z-[120] px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-brand-dark transition-all border border-white/10"
             >
               ← Retour
             </button>
             <Auth />
          </div>
        </AppContext.Provider>
      );
    }
    return <Landing onStart={handleStart} />;
  }

  return (
    <AppContext.Provider value={{ 
      user, setUser: handleSetUser, lang, setLang, theme, setTheme, t, activeTab, setActiveTab, authMode, setAuthMode
    }}>
      <div className="min-h-screen bg-white dark:bg-brand-dark animate-fade-in">
        <Layout>{renderContent()}</Layout>
      </div>
    </AppContext.Provider>
  );
};

export default App;
