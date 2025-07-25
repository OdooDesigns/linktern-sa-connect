import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, role: 'student' | 'employer') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    role: 'student',
    profile: {
      firstName: 'Ahmad',
      lastName: 'Al-Rashid',
      university: 'King Saud University',
      major: 'Computer Science',
      graduationYear: 2025,
      phone: '+966501234567',
      location: 'Riyadh, Saudi Arabia',
      skills: ['JavaScript', 'React', 'Python', 'Data Analysis'],
      bio: 'Passionate computer science student seeking internship opportunities in tech companies.',
    }
  },
  {
    id: '2',
    email: 'employer@example.com',
    role: 'employer',
    profile: {
      companyName: 'TechCorp Saudi',
      industry: 'Technology',
      companySize: '100-500',
      website: 'https://techcorp.sa',
      description: 'Leading technology company in Saudi Arabia focusing on digital transformation.',
      location: 'Riyadh, Saudi Arabia',
      contactPerson: 'Sarah Al-Mahmoud',
      phone: '+966112345678',
    }
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('linktern_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo login logic
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('linktern_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, role: 'student' | 'employer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo registration logic
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      profile: role === 'student' ? {
        firstName: '',
        lastName: '',
        university: '',
        major: '',
        graduationYear: new Date().getFullYear() + 1,
        phone: '',
        location: '',
        skills: [],
        bio: '',
      } : {
        companyName: '',
        industry: '',
        companySize: '',
        website: '',
        description: '',
        location: '',
        contactPerson: '',
        phone: '',
      }
    };
    
    setUser(newUser);
    localStorage.setItem('linktern_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('linktern_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}