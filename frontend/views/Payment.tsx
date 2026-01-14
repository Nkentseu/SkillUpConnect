
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, Wallet, Check, ChevronLeft, CreditCard as CardIcon } from 'lucide-react';

export const Payment: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'mtn' | 'orange' | 'bank' | 'cash'>('mtn');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      onComplete();
      navigate('/dashboard');
    }, 2000);
  };

  const methods = [
    { id: 'mtn', name: 'MTN Mobile Money', icon: Smartphone, color: 'bg-yellow-400', textColor: 'text-black' },
    { id: 'orange', name: 'Orange Money', icon: Smartphone, color: 'bg-orange-500', textColor: 'text-white' },
    { id: 'bank', name: 'Virement Bancaire', icon: Building, color: 'bg-blue-600', textColor: 'text-white' },
    { id: 'cash', name: 'Cash (Physique)', icon: Wallet, color: 'bg-green-600', textColor: 'text-white' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Résumé commande */}
        <div className="md:col-span-2 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <button 
              onClick={() => navigate('/register')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
            >
              <ChevronLeft size={16} /> Retour
            </button>
            <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-slate-800">
                <div>
                  <p className="font-semibold">Pack Entrepreneur Pro</p>
                  <p className="text-xs text-slate-400">Accès illimité aux modules</p>
                </div>
                <p className="font-bold">25,000 FCFA</p>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-800">
                <div>
                  <p className="font-semibold">Frais d'inscription</p>
                  <p className="text-xs text-slate-400">Une seule fois</p>
                </div>
                <p className="font-bold">5,000 FCFA</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400">Total à payer</span>
              <span className="text-2xl font-bold">30,000 FCFA</span>
            </div>
            <p className="text-xs text-slate-500 italic">Taxes incluses. Paiement sécurisé.</p>
          </div>
        </div>

        {/* Formulaire de paiement */}
        <div className="md:col-span-3 p-8 md:p-12">
          <h3 className="text-xl font-bold mb-6 dark:text-white">Choisir le mode de paiement</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all
                  ${method === m.id 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}
                `}
              >
                {method === m.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className={`${m.color} ${m.textColor} p-3 rounded-xl mb-3 shadow-md`}>
                  <m.icon size={24} />
                </div>
                <span className="text-sm font-semibold dark:text-slate-200">{m.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-slate-200">
                {method === 'bank' ? 'Numéro de compte' : 'Numéro de téléphone'}
              </label>
              <input 
                type="text" 
                placeholder={method === 'bank' ? 'XXXX XXXX XXXX XXXX' : '6XX XXX XXX'}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm">
              <CardIcon size={18} />
              <span>Vos données bancaires sont cryptées et protégées.</span>
            </div>

            <button 
              onClick={handlePay}
              disabled={loading}
              className={`
                w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3
                ${loading ? 'opacity-70 cursor-wait' : 'hover:bg-primary-dark active:scale-95'}
              `}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  Payer Maintenant
                  <Check size={20} />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
