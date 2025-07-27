import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, role: 'student' | 'employer') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication logic
    try {
      // Demo credentials for testing
      if (email === 'student@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email,
          role: 'student',
          profile: {
            firstName: 'Ahmad',
            lastName: 'Al-Rashid',
            university: 'King Saud University',
            major: 'Computer Science',
            graduationYear: 2025,
            skills: ['JavaScript', 'React', 'Python'],
            location: 'Riyadh, Saudi Arabia',
            phone: '+966501234567',
            bio: 'Passionate computer science student seeking opportunities in software development.'
          }
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      } else if (email === 'employer@example.com' && password === 'password') {
        const mockUser: User = {
          id: '2',
          email,
          role: 'employer',
          profile: {
            companyName: 'TechCorp Saudi',
            industry: 'Technology',
            companySize: '100-500',
            location: 'Riyadh, Saudi Arabia',
            website: 'https://techcorp.sa',
            description: 'Leading technology company specializing in digital transformation.',
            contactPerson: 'HR Manager',
            phone: '+966112345678'
          }
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, role: 'student' | 'employer'): Promise<boolean> => {
    // Mock registration logic
    try {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        profile: role === 'student' 
          ? {
              firstName: '',
              lastName: '',
              university: '',
              major: '',
              graduationYear: new Date().getFullYear() + 1,
              skills: [],
              location: '',
              phone: '',
              bio: ''
            }
          : {
              companyName: '',
              industry: '',
              companySize: '',
              location: '',
              description: '',
              contactPerson: '',
              phone: '',
              website: ''
            }
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}