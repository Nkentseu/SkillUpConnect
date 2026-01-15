
import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Rocket, BookOpen, Users, Award, TrendingUp, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles,
  ChevronRight, Mail, Phone, Instagram, Facebook, Twitter, Check, Languages,
  MapPin, Clock, Send, Heart, Target, Lightbulb
} from 'lucide-react';

interface LandingProps {
  onStart: (mode: 'login' | 'signup') => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { t, lang, setLang } = useApp();
  const [activePage, setActivePage] = useState<'home' | 'services' | 'pricing' | 'about' | 'contact'>('home');

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'services', label: t('services') },
    { id: 'pricing', label: t('pricing') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') },
  ];

  const Logo = ({ className = "h-12 w-auto" }: { className?: string }) => {
    return (
      <img 
        src="/images/logo.png" 
        alt="SkillUp Connect" 
        className={className} 
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      />
    );
  };

  const renderHome = () => (
    <div className="animate-slide-up">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full mb-10 animate-fade-in">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('heroTag')}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
            {t('heroTitle1')} <br/><span className="text-brand-secondary">{t('heroTitle2')}</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            {t('heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => onStart('signup')}
              className="px-12 py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-brand-primary/30 hover:scale-105 hover:bg-brand-dark transition-all flex items-center gap-4 group"
            >
              {t('heroBtnPrimary')} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
            </button>
            <button 
              onClick={() => setActivePage('services')}
              className="px-12 py-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-brand-dark dark:text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-50 transition-all"
            >
              {t('heroBtnSecondary')}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('statMembers'), value: "15k+" },
            { label: t('statCerts'), value: "3.2k" },
            { label: t('statGrants'), value: "125" },
            { label: t('statJobRate'), value: "92%" },
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
        <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">{t('servicesTitle')}</h2>
        <p className="text-gray-500 font-medium text-xl max-w-2xl mx-auto">
          {t('servicesDesc')}
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            icon: Rocket, title: t('serviceAcademyTitle'), color: "bg-brand-primary",
            desc: t('serviceAcademyDesc')
          },
          { 
            icon: Users, title: t('serviceMentorshipTitle'), color: "bg-brand-secondary",
            desc: t('serviceMentorshipDesc')
          },
          { 
            icon: Award, title: t('serviceCertTitle'), color: "bg-brand-success",
            desc: t('serviceCertDesc')
          }
        ].map((s, i) => (
          <div key={i} className="group p-16 bg-white dark:bg-brand-dark rounded-[4rem] border border-gray-100 dark:border-white/5 hover:shadow-3xl transition-all relative overflow-hidden">
            <div className={`w-24 h-24 ${s.color} text-white rounded-[2.5rem] flex items-center justify-center mb-12 shadow-xl group-hover:rotate-12 transition-transform`}>
              <s.icon size={44} />
            </div>
            <h3 className="text-3xl font-black mb-8 tracking-tighter uppercase">{s.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">{s.desc}</p>
            <button onClick={() => onStart('signup')} className="text-brand-primary font-black uppercase text-xs tracking-widest flex items-center gap-3 group-hover:underline">
              {t('learnMore')} <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="animate-slide-up pt-40 px-6 pb-20">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">{t('pricingTitle')}</h2>
        <p className="text-gray-500 font-medium text-xl">{t('pricingDesc')}</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { name: t('planStarter'), price: "0", features: t('priceFree').split(', '), highlighted: false },
          { name: t('planElite'), price: "5,000", features: t('priceElite').split(', '), highlighted: true },
          { name: t('planBusiness'), price: "45,000", features: t('priceBusiness').split(', '), highlighted: false },
        ].map((p, i) => (
          <div key={i} className={`p-16 rounded-[4.5rem] border-2 flex flex-col transition-all duration-500 ${p.highlighted ? 'border-brand-primary bg-white dark:bg-brand-dark shadow-3xl scale-105 z-10' : 'border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-transparent'}`}>
            <h3 className="text-3xl font-black mb-8 uppercase">{p.name}</h3>
            <div className="flex items-baseline gap-3 mb-12">
              <span className="text-6xl font-black">{p.price}</span>
              <span className="text-gray-400 font-bold uppercase text-sm tracking-widest">FCFA</span>
            </div>
            <ul className="space-y-8 mb-16 flex-1">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-4 text-sm font-bold text-gray-500 text-left">
                  <Check size={22} className="text-brand-success shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => onStart('signup')} className={`w-full py-7 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${p.highlighted ? 'bg-brand-primary text-white shadow-2xl hover:bg-brand-dark' : 'bg-brand-dark text-white hover:bg-brand-primary'}`}>
              {t('selectPlan')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="animate-slide-up pt-40 pb-20">
      <section className="px-6 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black tracking-tighter mb-6 uppercase">{t('aboutTitle')}</h2>
          <p className="text-gray-500 font-medium text-xl">{t('aboutSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                <Target size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{t('aboutMissionTitle')}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{t('aboutMissionText')}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-brand-secondary/10 text-brand-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Lightbulb size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{t('aboutVisionTitle')}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{t('aboutVisionText')}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Team working" 
              className="relative rounded-[4rem] shadow-3xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-surface/30 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Award, title: t('aboutValue1'), desc: t('aboutValue1Desc') },
            { icon: Zap, title: t('aboutValue2'), desc: t('aboutValue2Desc') },
            { icon: Heart, title: t('aboutValue3'), desc: t('aboutValue3Desc') }
          ].map((v, i) => (
            <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm text-center">
              <div className="w-20 h-20 bg-gray-50 text-brand-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
                <v.icon size={36} />
              </div>
              <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">{v.title}</h4>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderContact = () => (
    <div className="animate-slide-up pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase">{t('contactTitle')}</h2>
          <p className="text-gray-500 font-medium text-xl mb-16 leading-relaxed">
            {t('contactSubtitle')}
          </p>
          
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">{t('contactInfoLocation')}</h4>
                <p className="text-lg font-bold text-brand-dark">Ndokoti, China Mall Ndokoti, Douala</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-brand-secondary/10 text-brand-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">WhatsApp / Tel</h4>
                <p className="text-lg font-bold text-brand-dark">+237 6 55 99 38 76</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-brand-success/10 text-brand-success rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">{t('contactInfoHours')}</h4>
                <p className="text-lg font-bold text-brand-dark">{t('contactHoursDetail')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-brand-dark p-12 md:p-16 rounded-[4rem] border border-gray-100 dark:border-white/5 shadow-3xl">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">{t('contactFormName')}</label>
                <input required className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/10 outline-none focus:border-brand-primary bg-gray-50/50 dark:bg-transparent font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">{t('contactFormEmail')}</label>
                <input required type="email" className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/10 outline-none focus:border-brand-primary bg-gray-50/50 dark:bg-transparent font-bold" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">{t('contactFormSubject')}</label>
              <input required className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/10 outline-none focus:border-brand-primary bg-gray-50/50 dark:bg-transparent font-bold" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">{t('contactFormMessage')}</label>
              <textarea rows={5} required className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/10 outline-none focus:border-brand-primary bg-gray-50/50 dark:bg-transparent font-medium resize-none" />
            </div>
            <button className="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 shadow-2xl shadow-brand-primary/30 hover:bg-brand-dark transition-all">
              {t('contactFormBtn')} <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-dark transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/80 dark:bg-brand-dark/80 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-10 h-28 flex items-center justify-between">
          <div className="cursor-pointer group flex items-center" onClick={() => setActivePage('home')}>
            <Logo className="h-16 w-auto" />
          </div>
          
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => { setActivePage(link.id as any); window.scrollTo({top:0, behavior:'smooth'}); }}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-brand-primary relative ${activePage === link.id ? 'text-brand-primary' : 'text-gray-400'}`}
              >
                {link.label}
                {activePage === link.id && <span className="absolute -bottom-3 left-0 w-full h-1 bg-brand-primary rounded-full animate-fade-in"></span>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button 
               onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
               className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-white/10 hover:border-brand-primary transition-all"
            >
               <Languages size={16} className="text-brand-primary" />
               {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button onClick={() => onStart('login')} className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors">{t('login')}</button>
            <button onClick={() => onStart('signup')} className="px-10 py-5 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">{t('signup')}</button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {activePage === 'home' && renderHome()}
        {activePage === 'services' && renderServices()}
        {activePage === 'pricing' && renderPricing()}
        {activePage === 'about' && renderAbout()}
        {activePage === 'contact' && renderContact()}
      </main>

      {/* COMPACT FOOTER */}
      <footer className="bg-gray-50 dark:bg-brand-dark border-t border-gray-100 dark:border-white/5 py-8 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Logo className="h-12 w-auto" />
            <p className="text-gray-400 font-medium text-xs max-w-sm leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex gap-3">
               {[Instagram, Facebook, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-8 h-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                   <Icon size={14} />
                 </a>
               ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{t('services')}</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => { setActivePage(link.id as any); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-left font-bold text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors text-xs">{link.label}</button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{t('contact')}</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold text-xs"><Mail size={14} className="text-brand-primary"/> raissadjedo94@gmail.com</p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold text-xs"><Phone size={14} className="text-brand-primary"/> +237 6 55 99 38 76</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Douala, Cameroon</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-6 mt-6 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">© 2026 SkillUp Connect. Powered by Innovation.</p>
          <div className="flex gap-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">
            <a href="#" className="hover:text-brand-primary">{t('footerPrivacy')}</a>
            <a href="#" className="hover:text-brand-primary">{t('footerLegal')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
