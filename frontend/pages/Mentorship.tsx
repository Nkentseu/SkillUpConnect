
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { getMentorshipAdvice } from '../geminiService';
import { Send, Bot, Loader2, Lock, Sparkles, User as UserIcon } from 'lucide-react';

const Mentorship: React.FC = () => {
  const { user, lang, t, setActiveTab } = useApp();
  const [messages, setMessages] = useState<{role: 'user' | 'mentor', text: string}[]>([
    { role: 'mentor', text: lang === 'fr' 
      ? `Bonjour ${user?.fullName}, je suis votre expert SkillUp. Quel défi professionnel relevez-vous aujourd'hui ?` 
      : `Hello ${user?.fullName}, I am your SkillUp expert. What business challenge are you facing today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!user?.hasPaid || !input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await getMentorshipAdvice(userText, user, lang);
      setMessages(prev => [...prev, { role: 'mentor', text: response || '...' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'mentor', text: "Le service rencontre une forte demande. Réessayez dans un instant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-brand-dark rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm relative">
      {!user?.hasPaid && (
        <div className="absolute inset-0 z-20 bg-white/60 dark:bg-brand-dark/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
            <Lock size={32} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-dark dark:text-white mb-3">Expérience Mentorship Premium</h2>
          <p className="text-gray-500 font-medium max-w-sm mb-8 leading-relaxed">
            Échangez sans limite avec notre IA experte entraînée sur les marchés locaux du Cameroun et de la CEMAC.
          </p>
          <button 
            onClick={() => setActiveTab('billing')}
            className="px-10 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-xl shadow-brand-primary/30 hover:scale-105 transition-transform"
          >
            Débloquer maintenant
          </button>
        </div>
      )}

      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-brand-dark sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="font-extrabold text-brand-dark dark:text-white">Expert Strategist IA</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En ligne</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-surface rounded-full text-brand-primary text-[10px] font-bold uppercase">
          <Sparkles size={14} /> Intelligence Avancée
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-brand-surface/30 dark:bg-transparent">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-brand-secondary text-white' : 'bg-brand-primary text-white'}`}>
                {m.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-5 rounded-2xl text-sm leading-relaxed font-medium shadow-sm ${
                m.role === 'user' 
                  ? 'bg-brand-dark text-white rounded-tr-none' 
                  : 'bg-white dark:bg-white/5 text-brand-dark dark:text-white rounded-tl-none border border-gray-100 dark:border-white/5'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-brand-primary">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">L'expert analyse votre demande...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            disabled={!user?.hasPaid || isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre question ici..."
            className="w-full pl-6 pr-16 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-transparent outline-none focus:border-brand-primary transition-all font-medium text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || !user?.hasPaid}
            className="absolute right-3 top-3 bottom-3 w-12 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:bg-brand-dark transition-all disabled:opacity-30 disabled:hover:bg-brand-primary"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Appuyez sur Entrée pour envoyer
        </p>
      </div>
    </div>
  );
};

export default Mentorship;
