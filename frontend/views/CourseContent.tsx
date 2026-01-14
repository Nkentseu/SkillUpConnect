
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Lock, CheckCircle, FileText, Download } from 'lucide-react';

export const CourseContent: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(0);

  const lessons = [
    { title: "Introduction à l'entrepreneuriat local", duration: "12:30", type: 'video', completed: true },
    { title: "Étude de marché et personas", duration: "18:45", type: 'video', completed: true },
    { title: "Modèle économique (Business Model Canvas)", duration: "25:10", type: 'video', completed: false },
    { title: "Guide pratique : Structure juridique au Cameroun", duration: "PDF", type: 'document', completed: false },
    { title: "Quiz de validation : Phase 1", duration: "15:00", type: 'quiz', completed: false },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-full animate-in slide-in-from-bottom duration-500">
      {/* Video Player & Main View */}
      <div className="flex-1 space-y-6">
        <button 
          onClick={() => navigate('/dashboard/courses')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm mb-4"
        >
          <ChevronLeft size={16} /> Retour aux cours
        </button>

        <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
          <img src="https://picsum.photos/seed/video/1200/800" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/90 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-xl">
              <Play size={40} className="ml-2" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="text-white font-bold text-lg">{lessons[activeLesson].title}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold dark:text-white mb-2">Fondamentaux du Business en Afrique</h2>
              <p className="text-slate-500 text-sm">Par M. Ngando • Mis à jour le 12 Fév 2024</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all flex items-center gap-2">
              <CheckCircle size={20} /> Marquer comme terminé
            </button>
          </div>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Dans cette leçon, nous explorons comment identifier une opportunité d'affaires réelle dans votre communauté. Nous aborderons les points suivants :
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Observation des besoins non satisfaits</li>
              <li>Analyse de la concurrence locale</li>
              <li>Différenciation par la valeur ajoutée</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Sidebar (Lesson List) */}
      <div className="w-full xl:w-96 space-y-6 h-full flex flex-col">
        <h3 className="text-xl font-bold dark:text-white px-4">Contenu du cours</h3>
        <div className="flex-1 overflow-y-auto space-y-3 px-2">
          {lessons.map((lesson, i) => (
            <div 
              key={i}
              onClick={() => setActiveLesson(i)}
              className={`
                p-4 rounded-2xl cursor-pointer transition-all border flex items-center gap-4
                ${activeLesson === i 
                  ? 'bg-primary/5 border-primary shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}
              `}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                ${lesson.completed ? 'bg-green-50 dark:bg-green-950/30 text-green-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}
              `}>
                {lesson.completed ? <CheckCircle size={20} /> : (lesson.type === 'video' ? <Play size={20} /> : <FileText size={20} />)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${activeLesson === i ? 'text-primary' : 'dark:text-white'}`}>{lesson.title}</p>
                <p className="text-xs text-slate-400">{lesson.duration}</p>
              </div>
              {lesson.type === 'document' && <Download size={16} className="text-slate-300 hover:text-primary" />}
            </div>
          ))}
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl m-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Besoin d'aide ?</p>
          <button className="w-full py-3 bg-white dark:bg-slate-700 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">Contacter le support</button>
        </div>
      </div>
    </div>
  );
};
