
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, TrendingUp, Calendar, Zap, Target, Star } from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
      {/* Hero Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark p-8 md:p-14 rounded-4xl text-white shadow-2xl shadow-primary/30"
      >
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Where Youth Potential Meets Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight">
            Prête à lancer ton projet, Allinda ? 🚀
          </h2>
          <p className="text-primary-light text-lg mb-8 max-w-xl opacity-90 leading-relaxed">
            Votre préparation au business est en excellente voie. Vous avez déjà complété 65% de votre cursus de formation entrepreneuriale.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
              Continuer la leçon
            </button>
            <button className="bg-primary-dark/40 border border-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Mon Plan d'Affaires
            </button>
          </div>
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Readiness Score Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 soft-shadow flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4">
            <Target className="text-primary/20" size={40} />
          </div>
          <h3 className="text-slate-500 font-semibold mb-6">Business Readiness Score</h3>
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * 85) / 100} className="text-primary" strokeLinecap="round" />
            </svg>
            <span className="absolute text-4xl font-black text-slate-900 dark:text-white">85%</span>
          </div>
          <p className="text-sm text-slate-500 px-4">
            Dépassez 90% pour débloquer l'accès prioritaire au <span className="text-secondary font-bold">Startup Fund</span>.
          </p>
        </motion.div>

        {/* Dashboard Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {[
            { label: 'Cours Terminés', value: '12', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' },
            { label: 'Heures Apprises', value: '45.8h', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20' },
            { label: 'Tâches Mentor', value: '03', icon: Star, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
            { label: 'Progression Totale', value: '65%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 soft-shadow group transition-all"
            >
              <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black dark:text-white mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Market Awareness Section (Real Data from Plan) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.section variants={itemVariants} className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 soft-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold dark:text-white flex items-center gap-3">
              <TrendingUp className="text-secondary" /> Context National
            </h3>
            <span className="text-xs font-bold text-slate-400">INS 2024</span>
          </div>
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20">
              <p className="text-sm text-red-700 dark:text-red-400 font-medium mb-1">Taux d'échec des PME</p>
              <p className="text-2xl font-black text-red-600">30% <span className="text-xs font-normal">échouent en 2 ans</span></p>
            </div>
            <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/20">
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-1">Informalité des entrepreneurs</p>
              <p className="text-2xl font-black text-amber-600">+60% <span className="text-xs font-normal">opèrent dans l'informel</span></p>
            </div>
            <p className="text-xs text-slate-500 italic">
              "SkillUp Connect vise à transformer ces statistiques en équipant les jeunes de compétences formelles reconnues par l'État."
            </p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="bg-slate-900 dark:bg-slate-800/40 p-8 rounded-4xl text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
             <div>
                <h3 className="text-xl font-bold mb-4">Prochaine Session Live</h3>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl mb-6">
                  <div className="text-center bg-white text-slate-900 px-3 py-2 rounded-xl">
                    <p className="text-xs font-bold uppercase">Oct</p>
                    <p className="text-xl font-black">24</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Review de Business Model</p>
                    <p className="text-xs text-white/60">Avec M. Ngando • 16:00 GMT+1</p>
                  </div>
                </div>
             </div>
             <button className="w-full bg-secondary hover:bg-secondary-dark text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-secondary/20">
               Réserver ma place
             </button>
          </div>
          <PlayCircle className="absolute right-[-20px] bottom-[-20px] text-white/5" size={250} />
        </motion.section>
      </div>
    </motion.div>
  );
};
