import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter';
import { 
  Plus, 
  FileText, 
  Users, 
  Eye, 
  Clock, 
  CheckCircle, 
  Building,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  Briefcase
} from 'lucide-react';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const profile = user?.profile as any;

  // Mock data for dashboard
  const activeJobs = [
    {
      id: '1',
      title: 'Software Engineering Intern',
      department: 'Engineering',
      posted: '2024-01-15',
      applications: 24,
      views: 156,
      status: 'active',
      deadline: '2024-02-15'
    },
    {
      id: '2',
      title: 'Marketing Intern',
      department: 'Marketing',
      posted: '2024-01-10',
      applications: 18,
      views: 98,
      status: 'active',
      deadline: '2024-02-10'
    },
    {
      id: '3',
      title: 'Data Analyst Intern',
      department: 'Analytics',
      posted: '2024-01-08',
      applications: 31,
      views: 203,
      status: 'filled',
      deadline: '2024-02-08'
    }
  ];

  const recentApplications = [
    {
      id: '1',
      jobTitle: 'Software Engineering Intern',
      applicantName: 'Ahmad Al-Rashid',
      university: 'King Saud University',
      major: 'Computer Science',
      appliedDate: '2024-01-18',
      status: 'pending',
      avatar: '👨‍💻'
    },
    {
      id: '2',
      jobTitle: 'Marketing Intern',
      applicantName: 'Sarah Al-Mahmoud',
      university: 'Princess Nourah University',
      major: 'Business Administration',
      appliedDate: '2024-01-17',
      status: 'pending',
      avatar: '👩‍💼'
    },
    {
      id: '3',
      jobTitle: 'Data Analyst Intern',
      applicantName: 'Mohammed Al-Faisal',
      university: 'KFUPM',
      major: 'Computer Engineering',
      appliedDate: '2024-01-16',
      status: 'reviewed',
      avatar: '👨‍🔬'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'filled':
        return 'bg-primary text-primary-foreground';
      case 'expired':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed':
        return 'bg-primary text-primary-foreground';
      case 'accepted':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {profile?.companyName || 'Employer'}! 🏢
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your job postings and review talented candidates
              </p>
            </div>
            <Button asChild>
              <Link to="/employer/post-job">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">73</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">457</p>
                  <p className="text-sm text-muted-foreground">Job Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Job Postings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Active Job Postings</span>
                </CardTitle>
                <CardDescription>
                  Manage your current job listings and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Users className="w-3 h-3 mr-1" />
                              {job.applications} applications
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Eye className="w-3 h-3 mr-1" />
                              {job.views} views
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              Deadline: {job.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(job.status)}>
                          <span className="capitalize">{job.status}</span>
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/employer/jobs">Manage All Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Recent Applications</span>
                </CardTitle>
                <CardDescription>
                  Latest candidates who applied to your jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="p-3 border border-border rounded-lg hover:bg-card-hover transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{application.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{application.applicantName}</h4>
                          <p className="text-xs text-muted-foreground">{application.university}</p>
                          <p className="text-xs text-muted-foreground">{application.major}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge className={getApplicationStatusColor(application.status)} >
                              <span className="text-xs capitalize">{application.status}</span>
                            </Badge>
                            <span className="text-xs text-muted-foreground">{application.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/employer/applications">View All Applications</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to manage your hiring process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/employer/post-job">
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Job
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/employer/browse-talents">
                      <Users className="w-4 h-4 mr-2" />
                      Browse Talents
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/employer/company-profile">
                      <Building className="w-4 h-4 mr-2" />
                      Update Company Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Company Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">4.8</div>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= 5 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}