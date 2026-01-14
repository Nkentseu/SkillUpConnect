
import { User } from '../types';

const USERS_DB_KEY = 'skill_up_users_db';
const SESSION_KEY = 'skill_up_current_session';

export const authService = {
  // Get all registered users from "NoSQL" localStorage
  getUsersDB: (): any[] => {
    const db = localStorage.getItem(USERS_DB_KEY);
    return db ? JSON.parse(db) : [];
  },

  // Register a new user
  register: (userData: any): User | string => {
    const db = authService.getUsersDB();
    if (db.find(u => u.email === userData.email)) {
      return "Email already exists";
    }
    const newUser = { ...userData, hasPaid: false, progress: 0, enrollmentDate: new Date().toISOString() };
    db.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    authService.setSession(newUser);
    return newUser;
  },

  // Login existing user
  login: (email: string, pass: string): User | string => {
    const db = authService.getUsersDB();
    const user = db.find(u => u.email === email && u.password === pass);
    if (!user) return "Invalid email or password";
    authService.setSession(user);
    return user;
  },

  setSession: (user: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }
};
