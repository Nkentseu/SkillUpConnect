
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserType } from '../types';
import { User, Mail, Lock, ChevronRight, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

export const Register: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: UserType.STUDENT,
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
    navigate('/payment');
  };

  const userTypeIcons = {
    [UserType.STUDENT]: GraduationCap,
    [UserType.ENTREPRENEUR]: Lightbulb,
    [UserType.PROFESSIONAL]: Briefcase,
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      <div className="hidden lg:flex lg:w-[45%] bg-slate-900 p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-current">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-primary/40">S</div>
            <span className="text-2xl font-extrabold tracking-tight">Skill Up <span className="text-primary">Connect</span></span>
          </div>
          <h1 className="text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
            Réveillez votre <span className="text-primary">potentiel</span> d'entrepreneur.
          </h1>
          <p className="text-slate-400 text-xl max-w-md leading-relaxed">
            Seulement 30% des entreprises d'Afrique subsaharienne survivent après 2 ans. SkillUp Connect change la donne.
          </p>
        </div>

        <div className="relative z-10 p-8 bg-white/5 border border-white/10 rounded-4xl backdrop-blur-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4 italic">Notre Slogan</p>
          <p className="text-3xl font-black tracking-tight">WHERE YOUTH POTENTIAL MEETS OPPORTUNITY</p>
        </div>
      </div>

      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-24 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-xl space-y-10"
        >
          <div>
            <h2 className="text-4xl font-black dark:text-white mb-4">Créer un compte</h2>
            <p className="text-slate-500 text-lg">Rejoignez l'écosystème qui forme, certifie et finance les jeunes talents.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nom Complet</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input required type="text" placeholder="Allinda Mbida" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Professionnel</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input required type="email" placeholder="allinda@exemple.cm" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Qui êtes-vous ?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(UserType).map((type) => {
                  const Icon = userTypeIcons[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, userType: type})}
                      className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${formData.userType === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}
                    >
                      <Icon size={24} />
                      <span className="text-xs font-bold text-center leading-tight">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                <input required type="password" placeholder="••••••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:text-white" />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 dark:bg-primary text-white font-black py-5 rounded-3xl shadow-2xl hover:bg-black dark:hover:bg-primary-dark hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
              Commencer l'aventure
              <ChevronRight size={24} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
