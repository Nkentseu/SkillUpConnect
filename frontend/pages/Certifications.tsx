
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { db } from '../db';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, X, User as UserIcon, BookOpen } from 'lucide-react';

const Certifications: React.FC = () => {
  const { user } = useApp();
  const [certs, setCerts] = useState(db.getCertifications());
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [formData, setFormData] = useState({ center: 'Yaoundé - Centre', date: 'Session Mars 2026' });

  useEffect(() => {
    if (user) {
      const apps = db.getApplications(user.email);
      setRegisteredIds(apps.filter(a => a.type === 'CERTIFICATION').map(a => a.targetId));
    }
  }, [user]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && selectedCert) {
      db.apply(user.email, selectedCert.id, 'CERTIFICATION', formData);
      setRegisteredIds([...registeredIds, selectedCert.id]);
      setSelectedCert(null);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="bg-brand-dark p-12 rounded-[3rem] text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Certifications d'État 2026</h2>
          <p className="text-blue-100 font-medium text-lg max-w-2xl opacity-80">Obtenez un diplôme reconnu par le MINEFOP pour valoriser vos compétences sur le marché de l'emploi en 2026.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {certs.map(cert => {
          const isRegistered = registeredIds.includes(cert.id);
          return (
            <div key={cert.id} className="bg-white dark:bg-brand-dark p-12 rounded-[3rem] border border-gray-100 dark:border-white/5 flex flex-col group hover:-translate-y-2 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-1 bg-brand-secondary/10 text-brand-secondary text-[10px] font-black uppercase rounded-full tracking-widest">{cert.level}</span>
                <ShieldCheck size={28} className="text-brand-success" />
              </div>
              <h3 className="text-3xl font-black text-brand-dark dark:text-white mb-6 leading-tight uppercase tracking-tighter">{cert.title}</h3>
              <div className="space-y-4 mb-10 flex-1">
                {cert.requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                    <CheckCircle2 size={18} className="text-brand-primary" /> {req}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => !isRegistered && setSelectedCert(cert)} 
                disabled={isRegistered}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                  isRegistered ? 'bg-brand-success text-white' : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                }`}
              >
                {isRegistered ? 'Dossier en Examen' : 'Lancer l\'inscription'} <ArrowRight size={20} />
              </button>
            </div>
          );
        })}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-xl">
           <div className="bg-white dark:bg-brand-dark w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-fade-up border border-white/10">
              <div className="p-10 border-b border-gray-50 dark:border-white/5 flex justify-between items-center">
                 <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white">Inscription Session 2026</h3>
                 <button onClick={() => setSelectedCert(null)} className="dark:text-white"><X size={32}/></button>
              </div>
              <form onSubmit={handleRegister} className="p-10 space-y-8">
                 <div className="p-6 bg-brand-surface dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
                    <UserIcon className="text-brand-primary" />
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidat 2026</p>
                       <p className="font-bold dark:text-white">{user?.fullName}</p>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Centre d'Examen Préféré</label>
                    <select className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/5 font-bold bg-white dark:bg-brand-dark dark:text-white" value={formData.center} onChange={e => setFormData({...formData, center: e.target.value})}>
                       <option>Yaoundé - Centre</option>
                       <option>Douala - Littoral</option>
                       <option>Bafoussam - Ouest</option>
                       <option>Garoua - Nord</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-4">Session</label>
                    <select className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 dark:border-white/5 font-bold bg-white dark:bg-brand-dark dark:text-white" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}>
                       <option>Mars 2026</option>
                       <option>Juin 2026</option>
                       <option>Octobre 2026</option>
                    </select>
                 </div>
                 <button type="submit" className="w-full py-6 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                    <BookOpen size={20}/> Valider l'inscription
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
