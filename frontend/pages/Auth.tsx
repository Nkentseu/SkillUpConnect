
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { db } from '../db';
import { UserType, PlanType } from '../types';
import { Globe, ShieldCheck, Sun, Moon, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { setUser, authMode, setAuthMode } = useApp();
  const [isLogin, setIsLogin] = useState(authMode === 'login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', userType: 'STUDENT' as UserType,
  });

  useEffect(() => {
    setIsLogin(authMode === 'login');
  }, [authMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const users = db.getUsers();
      
      if (isLogin) {
        const existingUser = users[formData.email];
        if (existingUser && existingUser.password === formData.password) {
          db.saveUser(existingUser);
          setUser(existingUser);
        } else {
          setError('Identifiants invalides. Veuillez vérifier votre email ou mot de passe.');
          setLoading(false);
        }
      } else {
        if (users[formData.email]) {
          setError('Cette adresse email est déjà associée à un compte SkillUp.');
          setLoading(false);
          return;
        }
        
        const newUser = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          hasPaid: false,
          planType: 'FREE' as PlanType,
          selectedPlan: 'Starter Free',
          createdAt: Date.now()
        };
        
        db.saveUser(newUser);
        setUser(newUser);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-brand-surface dark:bg-brand-dark">
      <div className="hidden lg:flex w-1/2 bg-brand-dark p-24 flex-col justify-between relative overflow-hidden text-white border-r border-white/5">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,82,204,0.15),transparent)]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-20">
            <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-brand-primary/40">S</div>
            <span className="font-extrabold text-2xl tracking-tighter text-white">SkillUp Connect</span>
          </div>
          <h1 className="text-7xl font-black leading-[1.05] mb-8 tracking-tighter">
            Propulsez votre <span className="text-brand-primary">carrière</span> vers le sommet en 2026.
          </h1>
        </div>
        <div className="relative z-10 flex gap-8">
           <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl font-black">15k+</p>
              <p className="text-[10px] font-black uppercase opacity-60">Membres</p>
           </div>
           <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-2xl font-black">98%</p>
              <p className="text-[10px] font-black uppercase opacity-60">Réussite</p>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-brand-dark">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-brand-dark dark:text-white mb-4 tracking-tighter uppercase">
              {isLogin ? 'Bon retour' : 'Rejoindre l\'élite'}
            </h2>
            <p className="text-gray-500 font-medium">
              {isLogin ? 'Accédez à vos ressources exclusives 2026.' : 'Créez votre profil académique en 30 secondes.'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-red-50 text-red-600 rounded-3xl flex items-center gap-4 text-sm font-bold animate-fade-up">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <input required type="text" className="w-full px-8 py-5 rounded-[2rem] border-2 border-gray-100 outline-none font-bold bg-white dark:bg-brand-dark dark:border-white/10 dark:text-white" placeholder="Nom Complet"
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            )}
            <input required type="email" className="w-full px-8 py-5 rounded-[2rem] border-2 border-gray-100 outline-none font-bold bg-white dark:bg-brand-dark dark:border-white/10 dark:text-white" placeholder="Email"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required type="password" minLength={6} className="w-full px-8 py-5 rounded-[2rem] border-2 border-gray-100 outline-none font-bold bg-white dark:bg-brand-dark dark:border-white/10 dark:text-white" placeholder="Mot de passe"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            
            {!isLogin && (
              <select className="w-full px-8 py-5 rounded-[2rem] border-2 border-gray-100 font-bold bg-white dark:bg-brand-dark dark:border-white/10 dark:text-white"
                value={formData.userType} onChange={e => setFormData({...formData, userType: e.target.value as UserType})}>
                <option value="STUDENT">Étudiant</option>
                <option value="ENTREPRENEUR">Entrepreneur</option>
                <option value="PROFESSIONAL">Professionnel</option>
              </select>
            )}

            <button type="submit" disabled={loading} className="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-brand-dark transition-all flex items-center justify-center gap-3 shadow-xl">
              {loading ? <Loader2 className="animate-spin" size={24}/> : (isLogin ? 'Connexion' : 'S\'inscrire')}
            </button>
          </form>

          <button onClick={() => { setIsLogin(!isLogin); setAuthMode(isLogin ? 'signup' : 'login'); }} className="w-full mt-8 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-brand-primary">
            {isLogin ? "Nouveau ? Créer un compte" : "Déjà membre ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
