
import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Added CheckCircle to lucide-react imports
import { Wallet, ShieldCheck, ArrowRight, Lock, Info, Building, CheckCircle } from 'lucide-react';

export const Funding: React.FC = () => {
  const isEligible = false; // Basé sur le Business Readiness Score

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black dark:text-white">Accès au Financement</h2>
          <p className="text-slate-500">Transformez vos compétences en capital grâce à notre système basé sur les résultats.</p>
        </div>
      </div>

      {/* Eligibility Status */}
      <div className={`p-8 rounded-4xl border-2 flex flex-col md:flex-row items-center gap-8 ${isEligible ? 'bg-green-50 border-green-200 dark:bg-green-950/10' : 'bg-slate-50 border-slate-200 dark:bg-slate-900/50'}`}>
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 ${isEligible ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
          {isEligible ? <ShieldCheck size={40} /> : <Lock size={40} />}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold dark:text-white mb-2">Statut d'éligibilité : {isEligible ? 'Éligible' : 'En attente'}</h3>
          <p className="text-slate-500 text-sm max-w-2xl">
            Votre Business Readiness Score est de 85%. Vous devez atteindre <span className="font-bold text-primary">90%</span> pour débloquer les demandes de micro-financement automatique.
          </p>
        </div>
        {!isEligible && (
          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
            Boostez mon score
          </button>
        )}
      </div>

      {/* Funding Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          { title: 'Startup Seed Fund', amount: '500k - 2M FCFA', requirements: 'Score > 90% + Certificat', icon: Wallet, color: 'bg-primary' },
          { title: 'Expansion Loan', amount: '2M - 10M FCFA', requirements: '6 mois d\'activité + Mentor', icon: Building, color: 'bg-secondary' },
          { title: 'Partnership Grant', amount: 'Variable', requirements: 'Innovation Sociale (ONG)', icon: Info, color: 'bg-purple-600' }
        ].map((fund, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 soft-shadow flex flex-col h-full"
          >
            <div className={`${fund.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
              <fund.icon size={28} />
            </div>
            <h4 className="text-xl font-bold dark:text-white mb-2">{fund.title}</h4>
            <p className="text-2xl font-black text-primary mb-6">{fund.amount}</p>
            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                {/* Fixed: CheckCircle is now imported */}
                <CheckCircle size={14} className="text-green-500" /> {fund.requirements}
              </div>
            </div>
            <button disabled={!isEligible} className="w-full py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
              Voir les détails
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
