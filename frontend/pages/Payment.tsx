
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { db } from '../db';
import { PlanType } from '../types';
import { 
  Check, ShieldCheck, Smartphone, CreditCard, Globe, 
  Loader2, CheckCircle, Smartphone as Phone, Clock, 
  Users as UsersIcon, ChevronRight, AlertCircle, Zap
} from 'lucide-react';

const Payment: React.FC = () => {
  const { user, setUser, setActiveTab } = useApp();
  const [method, setMethod] = useState<'OM' | 'MOMO' | 'VISA' | 'PAYPAL'>('OM');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [countdown, setCountdown] = useState(45);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isDetected, setIsDetected] = useState(false);

  const plans = [
    { 
      id: 'free', 
      name: 'Starter Free', 
      price: '0', 
      type: 'FREE' as PlanType,
      duration: 9999,
      features: ['Cours de base illimités', 'Dashboard interactif', 'Opportunités publiques'],
      tag: 'Toujours gratuit',
      color: 'bg-gray-100'
    },
    { 
      id: 'premium', 
      name: 'Premium Elite', 
      price: '5,000', 
      type: 'PREMIUM' as PlanType,
      duration: 30, // 1 month
      features: ['Cours PRO débloqués', 'Mentorat IA 24/7', 'Certifications MINEFOP'],
      tag: 'Individuel - 30 Jours',
      color: 'bg-brand-primary'
    },
    { 
      id: 'business', 
      name: 'Business Pro', 
      price: '45,000', 
      type: 'BUSINESS' as PlanType,
      duration: 365, // 1 year
      features: ['Accès équipe (5 pers.)', 'Soutien prioritaire 1 an', 'Dashboard Analytics', 'Accompagnement Bourse'],
      tag: 'Équipe - 1 An',
      color: 'bg-brand-secondary'
    }
  ];

  const handleSelectPlan = (plan: any) => {
    if (plan.type === 'FREE') return;
    setSelectedPlan(plan);
    setStep(2);
  };

  const handlePay = () => {
    if (!user) return;
    setLoading(true);
    const id = db.registerPendingPayment(user.email, selectedPlan.id);
    setPaymentId(id);
    setStep(3);
  };

  useEffect(() => {
    let timer: number;
    let poll: number;

    if (step === 3 && paymentId && !isDetected) {
      // Countdown timer
      timer = window.setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
      
      // Real-feel Polling for detection
      poll = window.setInterval(() => {
        const status = db.checkPaymentStatus(paymentId);
        if (status) {
          setIsDetected(true);
          validatePayment();
        }
      }, 2000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(poll);
    };
  }, [step, paymentId, isDetected]);

  const validatePayment = () => {
    if (user && selectedPlan) {
      const updatedUser = db.updatePlan(user.email, selectedPlan.name, selectedPlan.type, selectedPlan.duration);
      if (updatedUser) {
        setUser(updatedUser);
        setLoading(false);
      }
    }
  };

  const methods = [
    { id: 'OM', name: 'Orange Money', icon: Phone, color: 'bg-[#FF6600]' },
    { id: 'MOMO', name: 'MTN MoMo', icon: Phone, color: 'bg-[#FFCC00]' },
    { id: 'VISA', name: 'Visa / Mastercard', icon: CreditCard, color: 'bg-[#1A1F71]' },
    { id: 'PAYPAL', name: 'PayPal', icon: Globe, color: 'bg-[#003087]' }
  ];

  if (step === 1) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-up">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-brand-dark dark:text-white mb-4 tracking-tighter">Votre futur commence ici</h2>
          <p className="text-gray-500 font-medium text-lg">Choisissez le plan qui correspond à votre ambition actuelle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div key={p.id} className={`bg-white dark:bg-white/5 p-12 rounded-[3.5rem] border-2 flex flex-col transition-all relative overflow-hidden group ${
              user?.planType === p.type ? 'border-brand-success shadow-2xl ring-8 ring-brand-success/5' : 'border-gray-50 dark:border-white/5 hover:border-brand-primary/20 hover:shadow-xl'
            }`}>
              {p.type === 'BUSINESS' && (
                <div className="absolute top-8 -right-12 bg-brand-secondary text-white px-12 py-1 rotate-45 text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Populaire
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-8">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  p.type === 'FREE' ? 'bg-gray-100 text-gray-400' : 
                  p.type === 'PREMIUM' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-secondary/10 text-brand-secondary'
                }`}>
                  {p.tag}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{p.price}</span>
                  <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">FCFA</span>
                </div>
                <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-tighter">
                  {p.type === 'BUSINESS' ? 'Facturé annuellement' : 'Facturé par mois'}
                </p>
              </div>

              <h3 className="text-2xl font-black mb-8 text-brand-dark dark:text-white">{p.name}</h3>

              <ul className="space-y-5 mb-12 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
                    <CheckCircle size={18} className="text-brand-success shrink-0 mt-0.5" /> <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                disabled={p.type === 'FREE' || user?.planType === p.type}
                onClick={() => handleSelectPlan(p)}
                className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 ${
                  user?.planType === p.type 
                    ? 'bg-brand-success text-white' 
                    : p.type === 'FREE' ? 'bg-gray-50 text-gray-300' : 'bg-brand-dark text-white shadow-2xl group-hover:bg-brand-primary'
                }`}
              >
                {user?.planType === p.type ? 'Plan Actuel' : 'Souscrire'} <ChevronRight size={16}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto py-16 px-10 bg-white dark:bg-brand-dark rounded-[4rem] shadow-3xl border border-gray-100 text-center animate-fade-up">
        {isDetected ? (
          <div className="space-y-8">
            <div className="w-28 h-28 bg-brand-success/10 text-brand-success rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle size={64} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Paiement Détecté !</h2>
            <p className="text-gray-500 font-medium px-6 text-lg">
              Votre accès <span className="text-brand-primary font-bold">{selectedPlan.name}</span> est désormais actif sur tous vos appareils.
            </p>
            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Durée d'accès</p>
              <p className="text-xl font-bold">{selectedPlan.duration === 365 ? '1 AN' : '30 JOURS'}</p>
            </div>
            <button onClick={() => setActiveTab('home')} className="w-full py-5 bg-brand-dark text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl hover:bg-brand-primary transition-all">Accéder à mes cours</button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="p-12 bg-brand-primary/5 rounded-[3.5rem] border-2 border-dashed border-brand-primary/30 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                  <div className="h-full bg-brand-primary transition-all duration-1000" style={{ width: `${(countdown / 45) * 100}%` }}></div>
               </div>
               <Loader2 className="animate-spin text-brand-primary mx-auto mb-8" size={64} />
               <h2 className="text-3xl font-black text-brand-dark tracking-tighter">En attente de validation</h2>
               <p className="text-base text-gray-500 mt-4 leading-relaxed font-medium">
                 Un message Push de confirmation a été envoyé sur votre téléphone.<br/>
                 Saisissez votre code secret pour valider le débit de <span className="font-bold text-brand-primary">{selectedPlan.price} FCFA</span>.
               </p>
               <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="bg-white dark:bg-brand-dark px-8 py-4 rounded-2xl shadow-xl border border-gray-100">
                    <span className="text-5xl font-mono font-black text-brand-primary">00:{countdown < 10 ? `0${countdown}` : countdown}</span>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-2 text-xs font-black text-brand-success uppercase tracking-widest animate-pulse">
                 <ShieldCheck size={18}/> Système d'écoute actif: Détection automatique...
              </div>
              <button onClick={() => setIsDetected(true)} className="text-sm font-black text-brand-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Paiement déjà validé ? Cliquez pour forcer la détection
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="bg-white dark:bg-brand-dark p-12 rounded-[4rem] border border-gray-100 shadow-3xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black tracking-tighter">Checkout Sécurisé</h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-2xl">
            <Zap size={16} fill="currentColor"/>
            <span className="text-xs font-black uppercase tracking-widest">{selectedPlan.name}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-5 mb-12">
          {methods.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id as any)} className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all group ${
              method === m.id ? 'border-brand-primary bg-brand-primary/5 shadow-inner' : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-gray-200'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${m.color}`}><m.icon size={28} /></div>
              <span className="font-black text-xs uppercase tracking-tighter text-left leading-tight">{m.name}</span>
            </button>
          ))}
        </div>

        <div className="space-y-8 mb-12">
          <div className="relative group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-4">Numéro de téléphone / Compte marchand</label>
            <input className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 outline-none focus:border-brand-primary font-black text-2xl tracking-[0.2em] bg-gray-50/50 group-hover:bg-white transition-all" placeholder="6xx xxx xxx" />
          </div>
          
          <div className="p-10 bg-brand-dark rounded-[2.5rem] text-white flex justify-between items-center shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
               <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2 opacity-60">Total de la transaction</p>
               <p className="text-4xl font-black">{selectedPlan.price} <span className="text-sm">FCFA</span></p>
            </div>
            <ShieldCheck size={48} className="text-brand-success opacity-80" />
          </div>
        </div>

        <button onClick={handlePay} className="w-full py-7 bg-brand-primary text-white rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-brand-primary/30 hover:bg-brand-dark transition-all flex items-center justify-center gap-4 group">
          Initier le Push USSD <Phone size={24} className="group-hover:rotate-12 transition-transform"/>
        </button>
        
        <p className="text-center mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertCircle size={14}/> Simulation de réseau en environnement de développement
        </p>
      </div>
    </div>
  );
};

export default Payment;
