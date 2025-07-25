export interface User {
  id: string;
  email: string;
  role: 'student' | 'employer';
  profile: StudentProfile | EmployerProfile;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  university: string;
  major: string;
  graduationYear: number;
  phone: string;
  location: string;
  skills: string[];
  bio: string;
  resume?: string;
  profileImage?: string;
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  description: string;
  location: string;
  contactPerson: string;
  phone: string;
  logo?: string;
}

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

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  appliedAt: Date;
  coverLetter: string;
  resumeUrl: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  description: string;
  size: string;
  location: string;
  website: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  rating: number;
  reviewCount: number;
  openPositions: number;
}