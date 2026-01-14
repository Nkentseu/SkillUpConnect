
import React from 'react';
import { motion } from 'framer-motion';
// Fixed: Added Info to lucide-react imports
import { Award, Download, ShieldCheck, ExternalLink, FileText, Info } from 'lucide-react';

export const Certification: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-12 pb-12"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
          <Award className="text-primary" size={48} />
        </div>
        <h2 className="text-4xl font-black dark:text-white tracking-tight">Vos Certifications</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Nos certificats sont reconnus par l'État et facilitent l'enregistrement de votre entreprise ainsi que vos demandes de crédit bancaire.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Certificate Card */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 soft-shadow overflow-hidden group">
          <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <ShieldCheck className="text-green-400" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">Certificat Professionnel</p>
                <h4 className="text-lg font-bold">Entrepreneuriat & Gestion d'Entreprise</h4>
              </div>
            </div>
            <span className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
              Validé
            </span>
          </div>
          
          <div className="p-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/3 aspect-[3/4] bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
              <FileText className="text-slate-300 mb-2" size={48} />
              <p className="text-xs text-slate-400 font-bold uppercase">Aperçu</p>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Délivré le</p>
                  <p className="font-bold dark:text-white">12 Octobre 2024</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">ID Certificat</p>
                  <p className="font-mono font-bold text-primary">SUC-2024-X892</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Niveau</p>
                  <p className="font-bold dark:text-white">Avancé</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Statut</p>
                  <p className="font-bold text-green-500">Vérifié par l'État</p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:bg-primary-dark transition-all">
                  <Download size={20} /> Télécharger (PDF)
                </button>
                <button className="px-6 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <ExternalLink size={20} className="text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-4xl border border-amber-200 dark:border-amber-900/30 flex items-start gap-6">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-amber-500 shrink-0 shadow-sm">
          {/* Fixed: Info is now imported */}
          <Info size={24} />
        </div>
        <div>
          <h5 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Utiliser votre certificat</h5>
          <p className="text-sm text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
            Ce certificat peut être utilisé comme preuve de compétence auprès des banques partenaires de SkillUp Connect pour obtenir des crédits sans garantie classique.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
