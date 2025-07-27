export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'remote' | 'on-site' | 'hybrid';
  duration: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  posted: Date;
  deadline: Date;
  employerId: string;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  university: string;
  major: string;
  graduationYear: number;
  phone?: string;
  location?: string;
  skills: string[];
  bio?: string;
  profileImage?: string;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  companySize: string;
  website?: string;
  description?: string;
  location?: string;
  contactPerson?: string;
  phone?: string;
  logo?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'employer';
  profile?: StudentProfile | EmployerProfile;
}