
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Bell,
  Search,
  User as UserIcon,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../App';

export const DashboardLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Accueil', path: '/dashboard' },
    { icon: BookOpen, label: 'Mes Cours', path: '/dashboard/courses' },
    { icon: Users, label: 'Mentorat', path: '/dashboard/mentorship' },
    { icon: Award, label: 'Certification', path: '/dashboard/certification' },
    { icon: TrendingUp, label: 'Performance', path: '/dashboard/performance' },
    { icon: CreditCard, label: 'Paiements', path: '/dashboard/billing' },
    { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar Mobile Overlay */}
      {!isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(true)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              S
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
              Skill Up
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                <ChevronRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
              </NavLink>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => navigate('/register')}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold dark:text-white truncate">Tableau de Bord</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-transparent focus-within:border-primary transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold dark:text-white">Allinda Mbida</p>
                <p className="text-xs text-slate-500">Étudiante</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 overflow-hidden ring-2 ring-primary/20">
                <img src="https://picsum.photos/seed/allinda/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />

          {/* Footer Page */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-slate-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Skill Up Connect</h3>
                <p className="text-sm max-w-md">
                  Une plateforme dédiée à l'autonomisation de la jeunesse africaine à travers le développement des compétences, le mentorat et l'accès au financement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
                <p className="text-sm">support@skillup.cm</p>
                <p className="text-sm">+237 600 00 00 00</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Liens</h4>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-slate-200 dark:border-slate-800 text-xs">
              <p>© 2024 Skill Up Connect. Tous droits réservés.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                {/* Icons placeholder for social media */}
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-all">FB</span>
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-all">IN</span>
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-all">TW</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
