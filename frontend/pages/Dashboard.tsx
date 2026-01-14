
import React from 'react';
import { useApp } from '../App';
import { Play, Rocket, Target, Award, ArrowUpRight, Clock, ChevronRight, Crown, ShieldCheck, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user, setActiveTab } = useApp();

  const readinessData = [
    { name: 'Stratégie', score: 85 },
    { name: 'Finance', score: 40 },
    { name: 'Marketing', score: 75 },
    { name: 'Légal', score: 60 },
  ];

  const getRemainingDays = () => {
    if (!user?.subscriptionExpiry) return 0;
    const diff = user.subscriptionExpiry - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = getRemainingDays();

  return (
    <div className="space-y-10 pb-20 animate-fade-up">
      {/* Premium Engine Display */}
      {!user?.hasPaid ? (
        <div className="bg-brand-secondary/10 border-2 border-brand-secondary/20 p-8 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
           <div className="flex items-center gap-6 text-center lg:text-left">
              <div className="w-20 h-20 bg-brand-secondary text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-secondary/40"><Crown size={40}/></div>
              <div>
                 <h4 className="text-2xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">Accès Starter Limité</h4>
                 <p className="text-base font-medium text-brand-dark/60 dark:text-gray-400 mt-1 max-w-md">Les cours PRO et le Mentorat IA ne sont pas encore débloqués sur votre compte.</p>
              </div>
           </div>
           <button onClick={() => setActiveTab('billing')} className="px-12 py-5 bg-brand-dark text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-brand-primary transition-all flex items-center gap-3">
              Activer Premium <Zap size={18} fill="currentColor"/>
           </button>
        </div>
      ) : (
        <div className="bg-brand-success/5 border-2 border-brand-success/20 p-8 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-brand-success/10 to-transparent pointer-events-none"></div>
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-brand-success text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-success/30"><ShieldCheck size={40}/></div>
              <div>
                 <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">Membre {user.selectedPlan}</h4>
                    <span className="px-3 py-1 bg-brand-success/10 text-brand-success text-[10px] font-black rounded-full uppercase tracking-widest">Actif</span>
                 </div>
                 <p className="text-base font-medium text-brand-dark/60 dark:text-gray-400 mt-1">Valide jusqu'au <span className="text-brand-dark dark:text-white font-bold">{new Date(user.subscriptionExpiry!).toLocaleDateString('fr-FR')}</span></p>
              </div>
           </div>
           <div className="flex flex-col items-center lg:items-end gap-2">
              <div className="bg-white dark:bg-white/5 px-8 py-3 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5">
                <span className="text-3xl font-black text-brand-success">{daysLeft}</span>
                <span className="text-xs font-black text-gray-400 uppercase ml-2 tracking-widest">jours restants</span>
              </div>
              {daysLeft < 5 && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">Renouvellement proche</p>}
           </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="bg-brand-dark rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl shadow-brand-dark/40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(0,82,204,0.3),transparent)] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
               <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> Live Académie
            </div>
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest opacity-60">Saison 2026 • Cameroun</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-10 leading-[1] tracking-tighter uppercase">
            Maîtrisez les codes du <span className="text-brand-secondary">succès</span> digital.
          </h1>
          <div className="flex flex-wrap gap-8">
            <button onClick={() => setActiveTab('courses')} className="px-12 py-6 bg-white text-brand-dark rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center gap-4 hover:bg-brand-secondary hover:text-white transition-all shadow-2xl hover:scale-105">
              <Play size={24} fill="currentColor" /> Reprendre
            </button>
            <button onClick={() => setActiveTab('mentorship')} className="px-12 py-6 bg-white/5 border-2 border-white/10 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all">
              Mentor IA
            </button>
          </div>
        </div>
      </section>

      {/* Grid Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Cours Disponibles', value: user?.hasPaid ? '142+' : '08', icon: Play, color: 'text-brand-primary' },
          { label: 'Certificats Reçus', value: '00', icon: Award, color: 'text-brand-success' },
          { label: 'Minutes d\'Étude', value: '0', icon: Clock, color: 'text-brand-secondary' },
          { label: 'Score Readiness', value: '12%', icon: Target, color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-brand-dark p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 bg-brand-surface dark:bg-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon size={32} />
            </div>
            <p className="text-5xl font-black text-brand-dark dark:text-white mb-2 tracking-tighter">{stat.value}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
