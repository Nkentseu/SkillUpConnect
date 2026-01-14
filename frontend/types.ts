
export type UserType = 'STUDENT' | 'ENTREPRENEUR' | 'PROFESSIONAL';
export type PlanType = 'FREE' | 'PREMIUM' | 'BUSINESS';

export interface User {
  fullName: string;
  email: string;
  password?: string;
  userType: UserType;
  hasPaid: boolean;
  selectedPlan?: string;
  planType: PlanType;
  subscriptionExpiry?: number; // Timestamp
  createdAt: number;
}

export interface Course {
  id: string;
  title: string;
  author: string;
  content: string;
  videoUrl?: string;
  category: string;
  isPremium: boolean;
  createdAt: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: 'Funding' | 'Job' | 'Grant';
  url: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  level: string;
  requirements: string[];
}

export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface Translation {
  [key: string]: {
    en: string;
    fr: string;
  };
}
