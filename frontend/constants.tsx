
import { Translation } from './types';

export const TRANSLATIONS: Translation = {
  welcome: { en: 'Welcome', fr: 'Bienvenue' },
  slogan: { en: 'Where Youth Potential Meets Opportunity', fr: 'Où le potentiel des jeunes rencontre l\'opportunité' },
  createAccount: { en: 'Create Account', fr: 'Créer un compte' },
  fullName: { en: 'Full Name', fr: 'Nom Complet' },
  email: { en: 'Email Address / Phone', fr: 'Adresse Email / Téléphone' },
  password: { en: 'Password', fr: 'Mot de passe' },
  confirmPassword: { en: 'Confirm Password', fr: 'Confirmer le mot de passe' },
  userType: { en: 'User Type', fr: 'Type d\'utilisateur' },
  acceptTerms: { en: 'I accept Terms & Conditions', fr: 'J\'accepte les conditions générales' },
  paymentTitle: { en: 'Fee Payment & Subscription', fr: 'Paiement des frais et abonnement' },
  payNow: { en: 'Pay Now', fr: 'Payer maintenant' },
  dashboard: { en: 'Dashboard', fr: 'Tableau de bord' },
  myCourses: { en: 'My Courses', fr: 'Mes cours' },
  trainingModules: { en: 'Training Modules', fr: 'Modules de formation' },
  mentorship: { en: 'Mentorship', fr: 'Mentorat' },
  certification: { en: 'Certification', fr: 'Certification' },
  funding: { en: 'Funding', fr: 'Financement' },
  logout: { en: 'Logout', fr: 'Déconnexion' },
  active: { en: 'Active', fr: 'Actif' },
  completed: { en: 'Completed', fr: 'Terminé' },
  businessReadiness: { en: 'Business Readiness', fr: 'Préparation aux affaires' }
};

export const COURSES = [
  { id: 1, title: 'Entrepreneurship 101', progress: 65, status: 'Active' },
  { id: 2, title: 'Financial Management', progress: 10, status: 'Active' },
  { id: 3, title: 'Digital Marketing', progress: 0, status: 'Active' }
];
