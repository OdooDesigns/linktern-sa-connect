import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  Building, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Star,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const profile = user?.profile as any;

  // Mock data for dashboard
  const recentApplications = [
    {
      id: '1',
      jobTitle: 'Software Engineering Intern',
      company: 'TechCorp Saudi',
      appliedDate: '2024-01-15',
      status: 'pending',
      location: 'Riyadh'
    },
    {
      id: '2',
      jobTitle: 'Data Analyst Intern',
      company: 'Saudi Data Solutions',
      appliedDate: '2024-01-12',
      status: 'accepted',
      location: 'Jeddah'
    },
    {
      id: '3',
      jobTitle: 'UI/UX Design Intern',
      company: 'Creative Hub',
      appliedDate: '2024-01-10',
      status: 'rejected',
      location: 'Dammam'
    }
  ];

  const recommendedJobs = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'Innovation Labs',
      location: 'Riyadh',
      type: 'Remote',
      skills: ['React', 'JavaScript'],
      posted: '2 days ago',
      logo: '🚀'
    },
    {
      id: '2',
      title: 'Machine Learning Intern',
      company: 'AI Solutions KSA',
      location: 'Jeddah',
      type: 'On-site',
      skills: ['Python', 'TensorFlow'],
      posted: '1 week ago',
      logo: '🤖'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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
                Welcome back, {profile?.firstName || 'Student'}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Track your applications and discover new opportunities
              </p>
            </div>
            <Button asChild>
              <Link to="/student/browse">
                <Search className="w-4 h-4 mr-2" />
                Browse Jobs
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
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
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
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Profile Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Recent Applications</span>
                </CardTitle>
                <CardDescription>
                  Track the status of your recent job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{application.jobTitle}</h4>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3 mr-1" />
                              {application.location}
                            </span>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {application.appliedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
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
                    <Link to="/student/applications">View All Applications</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complete Your Profile</CardTitle>
                <CardDescription>
                  Boost your chances by completing your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile Progress</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/student/profile">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Recommended for You</span>
                </CardTitle>
                <CardDescription>
                  Jobs matching your profile and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border border-border rounded-lg hover:bg-card-hover transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{job.logo}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{job.title}</h4>
                          <p className="text-xs text-muted-foreground">{job.company}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {job.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{job.posted}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/student/browse">View All Jobs</Link>
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