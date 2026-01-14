
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Play, CheckCircle } from 'lucide-react';

export const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const courses = [
    { id: '1', title: 'Fondamentaux du Business', progress: 65, instructor: 'M. Ngando', image: 'https://picsum.photos/seed/c1/400/250' },
    { id: '2', title: 'Marketing Digital pour PME', progress: 10, instructor: 'Mme. Biya', image: 'https://picsum.photos/seed/c2/400/250' },
    { id: '3', title: 'Gestion de Projet Agile', progress: 0, instructor: 'Ing. Tchakounté', image: 'https://picsum.photos/seed/c3/400/250' },
    { id: '4', title: 'Art de la Vente & Négociation', progress: 100, instructor: 'M. Essono', image: 'https://picsum.photos/seed/c4/400/250' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Mes Formations</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium">Tous</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">En cours</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id} 
            onClick={() => navigate(`/dashboard/courses/${course.id}`)}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
              {course.progress === 100 && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <CheckCircle size={14} /> Terminé
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{course.instructor}</p>
              <h3 className="font-bold text-lg mb-4 dark:text-white line-clamp-1">{course.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">{course.progress}% complété</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
