
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { db } from '../db';
import { 
  Plus, Play, BookOpen, X, ArrowLeft, Video, 
  FileText, CheckCircle, Lock, Crown, Zap, 
  AlertCircle, ShieldCheck 
} from 'lucide-react';
import { Course } from '../types';

const Courses: React.FC = () => {
  const { user, setActiveTab } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({ title: '', content: '', videoUrl: '', category: 'General', isPremium: false });

  useEffect(() => {
    setCourses(db.getCourses());
  }, []);

  const handleOpenCourse = (course: Course) => {
    if (course.isPremium && !user?.hasPaid) {
      return; // Interface logic handles showing the lock/paywall
    }
    setSelectedCourse(course);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = {
      id: Math.random().toString(36).substr(2, 9),
      ...newCourse,
      author: user?.fullName || 'Expert SkillUp',
      createdAt: Date.now()
    };
    db.addCourse(course);
    setCourses(db.getCourses());
    setShowModal(false);
    setNewCourse({ title: '', content: '', videoUrl: '', category: 'General', isPremium: false });
  };

  if (selectedCourse) {
    return (
      <div className="animate-fade-up max-w-6xl mx-auto space-y-10 pb-24">
        <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-3 text-gray-400 font-black hover:text-brand-primary transition-all uppercase text-[10px] tracking-[0.2em] mb-4">
          <ArrowLeft size={18}/> Retour à la bibliothèque
        </button>
        
        <div className="bg-white dark:bg-brand-dark rounded-[4rem] overflow-hidden shadow-3xl border border-gray-100 dark:border-white/5">
          <div className="p-16 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-start gap-8">
             <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-5 py-2 bg-brand-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20">{selectedCourse.category}</span>
                  {selectedCourse.isPremium && (
                    <span className="flex items-center gap-2 px-5 py-2 bg-brand-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-secondary/20 animate-pulse">
                      <Crown size={14}/> Premium Elite
                    </span>
                  )}
                </div>
                <h1 className="text-5xl font-black text-brand-dark dark:text-white leading-[1.1] tracking-tighter mb-4">{selectedCourse.title}</h1>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-brand-primary">S</div>
                   <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Instructeur : {selectedCourse.author}</p>
                </div>
             </div>
             <div className="w-24 h-24 bg-brand-success/10 text-brand-success rounded-[2rem] flex items-center justify-center shadow-inner"><ShieldCheck size={48}/></div>
          </div>

          <div className="grid grid-cols-1 gap-16 p-16">
             {selectedCourse.videoUrl && (
               <div className="rounded-[4rem] overflow-hidden shadow-3xl aspect-video bg-black ring-[16px] ring-gray-50/80 dark:ring-white/5 relative group">
                 <iframe width="100%" height="100%" src={selectedCourse.videoUrl} title={selectedCourse.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
               </div>
             )}
             
             <div className="markdown-content max-w-4xl mx-auto py-12">
               <div className="flex items-center gap-5 mb-16 pb-8 border-b-2 border-dashed border-gray-100 dark:border-white/10">
                  <div className="w-16 h-16 bg-brand-primary rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-brand-primary/30"><FileText size={32} /></div>
                  <div>
                    <span className="text-3xl font-black uppercase tracking-tighter">Support Pédagogique Intégral</span>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Lecture recommandée après la vidéo</p>
                  </div>
               </div>
               
               <article className="prose prose-xl dark:prose-invert max-w-none">
                 {selectedCourse.content.split('\n').map((line, i) => {
                   if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black mb-8">{line.replace('# ', '')}</h1>;
                   if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black mt-12 mb-6">{line.replace('## ', '')}</h2>;
                   if (line.startsWith('- ')) return <li key={i} className="mb-2 list-none border-l-4 border-brand-primary pl-6 font-bold">{line.replace('- ', '')}</li>;
                   return <p key={i} className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400 text-lg font-medium">{line}</p>;
                 })}
               </article>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Header section with Stats or Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-brand-dark p-12 rounded-[4rem] border border-gray-100 dark:border-white/5 gap-8 shadow-sm">
        <div className="text-center lg:text-left">
          <h2 className="text-5xl font-black text-brand-dark dark:text-white mb-3 tracking-tighter">SkillUp Academy</h2>
          <p className="text-gray-500 font-medium text-lg max-w-md">Formez-vous aux standards internationaux avec des experts de terrain.</p>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setShowModal(true)} className="flex items-center gap-3 px-12 py-6 bg-brand-primary text-white rounded-[2.5rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-brand-primary/40 hover:scale-105 transition-transform">
             <Plus size={24} /> Partager un Cours
           </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {courses.map(course => {
          const isLocked = course.isPremium && !user?.hasPaid;
          return (
            <div key={course.id} onClick={() => handleOpenCourse(course)} className={`bg-white dark:bg-brand-dark rounded-[4rem] border-2 border-gray-100 dark:border-white/5 overflow-hidden flex flex-col group cursor-pointer transition-all hover:-translate-y-3 ${isLocked ? 'grayscale opacity-80' : 'hover:shadow-3xl hover:border-brand-primary/30'}`}>
              <div className="h-60 bg-brand-surface dark:bg-white/5 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,82,204,0.1),transparent)]"></div>
                 {isLocked ? (
                   <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md z-20 flex items-center justify-center flex-col text-white px-8 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <Lock size={32} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Contenu Premium Uniquement</span>
                      <p className="text-xs font-bold opacity-70">Débloquez l'accès avec un plan Elite ou Business</p>
                   </div>
                 ) : (
                   <div className="group-hover:scale-125 transition-transform duration-700 opacity-20">
                    <Video size={100} className="text-brand-primary" />
                   </div>
                 )}
                 <div className="absolute top-8 left-8 flex gap-3 z-10">
                    <div className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-2xl text-[10px] font-black uppercase shadow-xl border border-gray-100 tracking-widest">{course.category}</div>
                    {course.isPremium && <div className="px-4 py-1.5 bg-brand-secondary text-white rounded-2xl text-[10px] font-black uppercase shadow-xl tracking-widest"><Zap size={10} className="inline mr-1" fill="currentColor"/> PRO</div>}
                 </div>
              </div>
              
              <div className="p-12 flex-1 flex flex-col">
                <h3 className="text-2xl font-black mb-8 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">{course.title}</h3>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10 pb-8 border-b border-gray-100 dark:border-white/5">
                   <span className="flex items-center gap-2"><Video size={18} className="text-brand-primary opacity-60"/> Vidéo HD</span>
                   <span className="flex items-center gap-2"><FileText size={18} className="text-brand-primary opacity-60"/> Support PDF</span>
                </div>
                
                <div className="mt-auto flex justify-between items-center">
                   {isLocked ? (
                     <button onClick={(e) => { e.stopPropagation(); setActiveTab('billing'); }} className="w-full py-5 bg-brand-secondary text-white rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-secondary/30 hover:scale-95 transition-all">
                        Obtenir un accès Elite
                     </button>
                   ) : (
                     <>
                        <span className="text-brand-primary font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                           Lancer le module <Zap size={14} fill="currentColor"/>
                        </span>
                        <div className="w-12 h-12 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                          <Play size={20} fill="currentColor" />
                        </div>
                     </>
                   )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-brand-dark/95 backdrop-blur-[20px]">
           <div className="bg-white dark:bg-brand-dark w-full max-w-3xl rounded-[4rem] shadow-3xl overflow-hidden animate-fade-up border border-white/5">
              <div className="p-12 border-b border-gray-50 dark:border-white/5 flex justify-between items-center">
                 <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Publier sur l'Academy</h3>
                    <p className="text-sm text-gray-400 font-bold mt-1">Partagez votre expertise avec la communauté.</p>
                 </div>
                 <button onClick={() => setShowModal(false)} className="p-4 hover:bg-gray-100 dark:hover:bg-white/5 rounded-3xl transition-all"><X size={32}/></button>
              </div>
              
              <form onSubmit={handleCreate} className="p-16 space-y-10">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Titre de la formation</label>
                    <input required className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-white/10 outline-none font-bold text-xl focus:border-brand-primary bg-gray-50/50 dark:bg-transparent" placeholder="Ex: Finance d'Entreprise..." value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Secteur d'activité</label>
                      <select className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-white/10 font-bold bg-gray-50/50 dark:bg-transparent cursor-pointer appearance-none" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})}>
                        <option value="Marketing">Digital Marketing</option>
                        <option value="Business">Management & Business</option>
                        <option value="Tech">Technologie & Dev</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Niveau de protection</label>
                      <select className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-white/10 font-bold bg-gray-50/50 dark:bg-transparent cursor-pointer appearance-none" value={newCourse.isPremium ? 'true' : 'false'} onChange={e => setNewCourse({...newCourse, isPremium: e.target.value === 'true'})}>
                        <option value="false">Accès Public (Gratuit)</option>
                        <option value="true">Premium Elite Uniquement</option>
                      </select>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">URL YouTube Embed</label>
                    <input className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-white/10 font-bold focus:border-brand-primary bg-gray-50/50 dark:bg-transparent" placeholder="https://youtube.com/embed/..." value={newCourse.videoUrl} onChange={e => setNewCourse({...newCourse, videoUrl: e.target.value})} />
                 </div>
                 
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Syllabus Textuel (Markdown supporté)</label>
                    <textarea rows={6} className="w-full px-10 py-6 rounded-[2.5rem] border-2 border-gray-100 dark:border-white/10 font-medium resize-none focus:border-brand-primary bg-gray-50/50 dark:bg-transparent" placeholder="Décrivez le contenu détaillé ici..." value={newCourse.content} onChange={e => setNewCourse({...newCourse, content: e.target.value})} />
                 </div>
                 
                 <button type="submit" className="w-full py-7 bg-brand-primary text-white rounded-[3rem] font-black uppercase tracking-widest shadow-3xl shadow-brand-primary/30 hover:bg-brand-dark transition-all flex items-center justify-center gap-4">
                    Soumettre le programme <Zap size={24} fill="currentColor"/>
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
