
import React, { useState } from 'react';
import { 
  Rocket, BookOpen, Users, Award, TrendingUp, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles,
  ChevronRight, Mail, Phone, Instagram, Facebook, Twitter, Check
} from 'lucide-react';

interface LandingProps {
  onStart: (mode: 'login' | 'signup') => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'pricing' | 'about'>('home');

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'about', label: 'À Propos' },
  ];

  const renderHome = () => (
    <div className="animate-slide-up">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full mb-10 animate-fade-in">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cameroun Emergence 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
            L'excellence est une <br/><span className="text-brand-primary">compétence</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            Rejoignez la plateforme d'élite qui transforme le potentiel de la jeunesse camerounaise en leaders du digital pour 2026.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => onStart('signup')}
              className="px-12 py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-brand-primary/30 hover:scale-105 hover:bg-brand-dark transition-all flex items-center gap-4 group"
            >
              Lancer ma carrière <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
            </button>
            <button 
              onClick={() => setActivePage('services')}
              className="px-12 py-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-brand-dark dark:text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-50 transition-all"
            >
              Découvrir nos modules
            </button>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Membres Actifs", value: "15k+" },
            { label: "Certifiés État", value: "3.2k" },
            { label: "Bourses Disponibles", value: "125" },
            { label: "Taux d'Emploi", value: "92%" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-12 bg-white dark:bg-brand-dark rounded-[3.5rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all">
              <p className="text-5xl font-black text-brand-primary mb-2 tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="animate-slide-up pt-40 px-6 pb-20">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">Écosystème de Succès 2026</h2>
        <p className="text-gray-500 font-medium text-xl max-w-2xl mx-auto">
          SkillUp Connect n'est pas qu'une plateforme, c'est votre partenaire de croissance au Cameroun.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            icon: Rocket, title: "Academy 237", color: "bg-brand-primary",
            desc: "Cours intensifs sur le digital, l'e-commerce local et le management de projet adaptés aux enjeux de 2026."
          },
          { 
            icon: Users, title: "Mentorat IA", color: "bg-brand-secondary",
            desc: "Une intelligence artificielle experte du marché CEMAC pour vous conseiller 24/7 sur vos stratégies."
          },
          { 
            icon: Award, title: "Certifs MINEFOP", color: "bg-brand-success",
            desc: "Vos compétences sont validées officiellement par le Ministère de l'Emploi pour une crédibilité immédiate."
          }
        ].map((s, i) => (
          <div key={i} className="group p-16 bg-white dark:bg-brand-dark rounded-[4rem] border border-gray-100 dark:border-white/5 hover:shadow-3xl transition-all relative overflow-hidden">
            <div className={`w-24 h-24 ${s.color} text-white rounded-[2.5rem] flex items-center justify-center mb-12 shadow-xl group-hover:rotate-12 transition-transform`}>
              <s.icon size={44} />
            </div>
            <h3 className="text-3xl font-black mb-8 tracking-tighter uppercase">{s.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">{s.desc}</p>
            <button onClick={() => onStart('signup')} className="text-brand-primary font-black uppercase text-xs tracking-widest flex items-center gap-3 group-hover:underline">
              En savoir plus <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="animate-slide-up pt-40 px-6 pb-20">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">Investissez en Vous</h2>
        <p className="text-gray-500 font-medium text-xl">Choisissez le plan qui propulsera votre vision pour l'année 2026.</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { name: "Starter Free", price: "0", features: ["Cours de base illimités", "Dashboard Personnel", "Opportunités publiques"] },
          { name: "Premium Elite", price: "5,000", features: ["Tous les cours PRO", "Mentorat IA 24/7", "Certifications d'État"], highlighted: true },
          { name: "Business Pro", price: "45,000", features: ["Accès Équipe (5 pers.)", "Soutien Bourse PRIORITAIRE", "Analytics Stratégiques"] },
        ].map((p, i) => (
          <div key={i} className={`p-16 rounded-[4.5rem] border-2 flex flex-col transition-all duration-500 ${p.highlighted ? 'border-brand-primary bg-white dark:bg-brand-dark shadow-3xl scale-105 z-10' : 'border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-transparent'}`}>
            <h3 className="text-3xl font-black mb-8 uppercase">{p.name}</h3>
            <div className="flex items-baseline gap-3 mb-12">
              <span className="text-6xl font-black">{p.price}</span>
              <span className="text-gray-400 font-bold uppercase text-sm tracking-widest">FCFA</span>
            </div>
            <ul className="space-y-8 mb-16 flex-1">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-4 text-sm font-bold text-gray-500">
                  <Check size={22} className="text-brand-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => onStart('signup')} className={`w-full py-7 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${p.highlighted ? 'bg-brand-primary text-white shadow-2xl hover:bg-brand-dark' : 'bg-brand-dark text-white hover:bg-brand-primary'}`}>
              Sélectionner
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="animate-slide-up pt-40 px-6 pb-20">
      <div className="max-w-5xl mx-auto bg-brand-dark rounded-[5rem] p-20 text-white text-center relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <h2 className="text-6xl font-black tracking-tighter mb-10 relative z-10 uppercase">Notre Vision 2026</h2>
        <p className="text-2xl text-blue-100 font-medium leading-relaxed opacity-90 mb-16 relative z-10 px-12">
          En 2026, SkillUp Connect devient le pilier de l'émergence numérique au Cameroun. Nous formons la prochaine vague d'entrepreneurs prêts à relever les défis mondiaux depuis Yaoundé, Douala et au-delà.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
           <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-left">
              <h4 className="font-black text-brand-secondary text-2xl mb-4 uppercase">Impact National</h4>
              <p className="text-sm font-bold opacity-70 leading-relaxed uppercase tracking-widest">Aligné sur le plan de développement Cameroun 2035.</p>
           </div>
           <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-left">
              <h4 className="font-black text-brand-primary text-2xl mb-4 uppercase">Accompagnement</h4>
              <p className="text-sm font-bold opacity-70 leading-relaxed uppercase tracking-widest">Zéro barrière à l'entrée pour les talents motivés.</p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-dark transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-brand-dark/80 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-10 h-28 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActivePage('home')}>
            <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:rotate-12 transition-transform">S</div>
            <span className="font-extrabold text-3xl tracking-tighter uppercase dark:text-white">SkillUp</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => setActivePage(link.id as any)}
                className={`text-xs font-black uppercase tracking-[0.25em] transition-all hover:text-brand-primary relative ${activePage === link.id ? 'text-brand-primary' : 'text-gray-400'}`}
              >
                {link.label}
                {activePage === link.id && <span className="absolute -bottom-3 left-0 w-full h-1 bg-brand-primary rounded-full animate-fade-in"></span>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button onClick={() => onStart('login')} className="hidden sm:block text-xs font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors">Connexion</button>
            <button onClick={() => onStart('signup')} className="px-10 py-5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Rejoindre</button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {activePage === 'home' && renderHome()}
        {activePage === 'services' && renderServices()}
        {activePage === 'pricing' && renderPricing()}
        {activePage === 'about' && renderAbout()}
      </main>

      {/* Footer refined for better height and aesthetics */}
      <footer className="bg-gray-50 dark:bg-brand-dark border-t border-gray-100 dark:border-white/5 py-12 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">S</div>
              <span className="font-black text-3xl tracking-tighter uppercase dark:text-white">SkillUp Connect</span>
            </div>
            <p className="text-gray-400 font-medium text-sm max-w-sm leading-relaxed">
              La passerelle numérique pour l'excellence et l'employabilité de la jeunesse camerounaise. Bâtissons 2026 ensemble.
            </p>
            <div className="flex gap-4">
               {[Instagram, Facebook, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Navigation</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => { setActivePage(link.id as any); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-left font-bold text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors text-sm">{link.label}</button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</h4>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-bold text-sm"><Mail size={18} className="text-brand-primary"/> raissadjedo94@gmail.com</p>
              <p className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-bold text-sm"><Phone size={18} className="text-brand-primary"/> +237 6 55 99 38 76</p>
              <div>
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Yaoundé, Cameroun</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">© 2026 SkillUp Connect. Propulsé par l'innovation.</p>
          <div className="flex gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">
            <a href="#" className="hover:text-brand-primary">Confidentialité</a>
            <a href="#" className="hover:text-brand-primary">Mentions Légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
