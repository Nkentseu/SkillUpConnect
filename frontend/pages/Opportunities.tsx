
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { db } from '../db';
import { Calendar, ExternalLink, DollarSign, Briefcase, CheckCircle, X, FileText, Send } from 'lucide-react';

const Opportunities: React.FC = () => {
  const { user } = useApp();
  const [opportunities, setOpportunities] = useState(db.getOpportunities());
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<any | null>(null);
  const [formData, setFormData] = useState({ fullName: '', motivation: '', phone: '', CV: '' });

  useEffect(() => {
    if (user) {
      const apps = db.getApplications(user.email);
      setAppliedIds(apps.filter(a => a.type === 'OPPORTUNITY').map(a => a.targetId));
      setFormData({ ...formData, fullName: user.fullName });
    }
  }, [user]);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && selectedOpp) {
      db.apply(user.email, selectedOpp.id, 'OPPORTUNITY', formData);
      setAppliedIds([...appliedIds, selectedOpp.id]);
      setSelectedOpp(null);
      setFormData({ fullName: user.fullName, motivation: '', phone: '', CV: '' });
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="bg-brand-primary/5 p-12 rounded-[3rem] border border-brand-primary/10">
        <h2 className="text-4xl font-black text-brand-dark dark:text-white mb-2">Bourses & Financements</h2>
        <p className="text-gray-600 font-medium text-lg max-w-2xl">Trouvez les ressources financières nécessaires pour propulser votre startup ou vos études au Cameroun.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {opportunities.map(opp => {
          const hasApplied = appliedIds.includes(opp.id);
          return (
            <div key={opp.id} className="bg-white dark:bg-brand-dark p-10 rounded-[2.5rem] border border-gray-100 flex gap-8 hover:shadow-2xl transition-all group">
              <div className={`w-20 h-20 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center ${
                opp.type === 'Funding' ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-primary/10 text-brand-primary'
              }`}>
                {opp.type === 'Funding' ? <DollarSign size={40}/> : <Briefcase size={40}/>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-brand-dark dark:text-white group-hover:text-brand-primary transition-colors">{opp.title}</h3>
                </div>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed line-clamp-3">{opp.description}</p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-2 text-sm font-black text-brand-secondary uppercase tracking-widest">
                    <Calendar size={16} /> Jusqu'au {opp.deadline}
                  </div>
                  <button onClick={() => !hasApplied && setSelectedOpp(opp)} disabled={hasApplied} className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    hasApplied ? 'bg-brand-success text-white' : 'bg-brand-dark text-white hover:bg-brand-primary'
                  }`}>
                    {hasApplied ? <><CheckCircle size={14} className="inline mr-2"/> Déposé</> : 'Postuler'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOpp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-xl">
           <div className="bg-white dark:bg-brand-dark w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                 <h3 className="text-xl font-black">Candidature : {selectedOpp.title}</h3>
                 <button onClick={() => setSelectedOpp(null)}><X size={28}/></button>
              </div>
              <form onSubmit={handleSubmitApplication} className="p-10 space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Motivation (Min. 100 mots)</label>
                    <textarea required className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 font-medium min-h-[150px]" value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} placeholder="Pourquoi méritez-vous ce financement ?" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input required className="px-6 py-4 rounded-2xl border-2 border-gray-100 font-bold" placeholder="Téléphone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input className="px-6 py-4 rounded-2xl border-2 border-gray-100 font-bold" placeholder="Lien CV / Projet" value={formData.CV} onChange={e => setFormData({...formData, CV: e.target.value})} />
                 </div>
                 <button type="submit" className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                    <Send size={20}/> Envoyer le dossier
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
