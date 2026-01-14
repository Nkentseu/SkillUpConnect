
import { User, Course, Opportunity, Certification, PlanType } from './types';

const DB_KEY = 'skillup_pro_v6_storage';

interface Database {
  users: Record<string, User>;
  currentUserEmail: string | null;
  courses: Course[];
  opportunities: Opportunity[];
  certifications: Certification[];
  applications: { userId: string, targetId: string, type: 'OPPORTUNITY' | 'CERTIFICATION', data: any }[];
  pendingPayments: Record<string, { email: string, planId: string, timestamp: number }>;
}

const initialCourses: Course[] = [
  { 
    id: 'c1', 
    title: 'Marketing Digital : Dominer le Marché Local', 
    author: 'Serge Ntamack', 
    isPremium: false,
    content: '# Stratégie Social Media au Cameroun\n\nLe digital au Cameroun, c\'est d\'abord Facebook et WhatsApp.\n\n## Les piliers de la réussite :\n- Création de contenu viral sur Facebook Ads\n- Utilisation de WhatsApp Business pour la clôture des ventes', 
    videoUrl: 'https://www.youtube.com/embed/5U7UvCq-k3U',
    category: 'Marketing', 
    createdAt: Date.now() 
  }
];

const getDB = (): Database => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    const fresh: Database = { 
      users: {}, 
      currentUserEmail: null, 
      courses: initialCourses, 
      opportunities: [
        { id: 'opp-1', title: 'Bourse MINJEC - Économie Numérique', description: 'Soutien aux startups tech de 15 à 35 ans pour l\'éclosion technologique du Cameroun.', deadline: '20 Jan 2026', type: 'Grant', url: '#' }
      ],
      certifications: [],
      applications: [],
      pendingPayments: {}
    };
    localStorage.setItem(DB_KEY, JSON.stringify(fresh));
    return fresh;
  }
  return JSON.parse(data);
};

const saveDB = (db: Database) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const db = {
  getUsers: () => getDB().users,
  saveUser: (user: User) => {
    const d = getDB();
    d.users[user.email] = { ...user, createdAt: user.createdAt || Date.now() };
    d.currentUserEmail = user.email;
    saveDB(d);
  },
  getCurrentUser: (): User | null => {
    const d = getDB();
    if (!d.currentUserEmail) return null;
    return d.users[d.currentUserEmail];
  },
  logout: () => {
    const d = getDB();
    d.currentUserEmail = null;
    saveDB(d);
  },
  addCourse: (course: Course) => {
    const d = getDB();
    d.courses.push(course);
    saveDB(d);
  },
  getCourses: () => getDB().courses,
  getOpportunities: () => getDB().opportunities,
  getCertifications: () => getDB().certifications,
  apply: (userId: string, targetId: string, type: 'OPPORTUNITY' | 'CERTIFICATION', formData: any) => {
    const d = getDB();
    d.applications.push({ userId, targetId, type, data: formData });
    saveDB(d);
  },
  getApplications: (userId: string) => {
    return getDB().applications.filter(a => a.userId === userId);
  },
  registerPendingPayment: (email: string, planId: string) => {
    const d = getDB();
    const payId = Math.random().toString(36).substr(2, 9);
    d.pendingPayments[payId] = { email, planId, timestamp: Date.now() };
    saveDB(d);
    return payId;
  },
  checkPaymentStatus: (payId: string) => {
    const d = getDB();
    const p = d.pendingPayments[payId];
    return p ? (Date.now() - p.timestamp > 5000) : false;
  },
  updatePlan: (email: string, planName: string, planType: PlanType, durationDays: number) => {
    const d = getDB();
    const user = d.users[email];
    if (user) {
      user.hasPaid = true;
      user.planType = planType;
      user.selectedPlan = planName;
      user.subscriptionExpiry = Date.now() + (durationDays * 24 * 60 * 60 * 1000);
      d.users[email] = user;
      saveDB(d);
      return user;
    }
    return null;
  }
};
