
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

const skillData = [
  { subject: 'Finance', A: 120, fullMark: 150 },
  { subject: 'Marketing', A: 98, fullMark: 150 },
  { subject: 'Tech', A: 86, fullMark: 150 },
  { subject: 'Management', A: 99, fullMark: 150 },
  { subject: 'Com', A: 85, fullMark: 150 },
];

const progressData = [
  { name: 'Sem 1', score: 40 },
  { name: 'Sem 2', score: 55 },
  { name: 'Sem 3', score: 70 },
  { name: 'Sem 4', score: 65 },
  { name: 'Sem 5', score: 85 },
  { name: 'Sem 6', score: 90 },
];

export const Performance: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Suivi de Performance</h2>
          <p className="text-slate-500">Analysez votre progression et vos compétences acquises.</p>
        </div>
        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/20 transition-all">Télécharger le rapport (PDF)</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart: Skills */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-8 dark:text-white">Roue des Compétences</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar
                  name="Moi"
                  dataKey="A"
                  stroke="#0284c7"
                  fill="#0284c7"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Progress */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg mb-8 dark:text-white">Progression Mensuelle</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feedbacks */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-lg mb-6 dark:text-white">Commentaires du Mentor</h3>
        <div className="space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <img src={`https://picsum.photos/seed/mentor${i}/100`} className="w-12 h-12 rounded-full border-2 border-primary" />
              <div>
                <p className="font-bold text-sm dark:text-white">Dr. Amadou Mvondo</p>
                <p className="text-xs text-slate-500 mb-2">Mentor Senior • Il y a 3 jours</p>
                <p className="text-sm dark:text-slate-300">"Excellent travail sur le module de finance. Allinda, tu devrais te concentrer un peu plus sur l'aspect marketing pour equilibrer tes forces."</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
