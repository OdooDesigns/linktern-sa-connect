import { useState } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  UserPlus, 
  ExternalLink, 
  MapPin, 
  Star, 
  Building2, 
  Calendar, 
  Clock, 
  DollarSign,
  Flag,
  Users,
  Briefcase,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  ArrowLeft
} from 'lucide-react';

// Mock company data
const mockCompany = {
  id: '1',
  name: 'TechCorp Saudi',
  logo: '/placeholder.svg',
  email: 'hr@techcorp.sa',
  industry: 'Technology',
  location: 'Riyadh, Saudi Arabia',
  description: 'TechCorp Saudi is a leading technology company in the Kingdom of Saudi Arabia, specializing in digital transformation, cloud computing, and artificial intelligence solutions. We are committed to empowering the next generation of Saudi talent through innovative internship programs and career development opportunities. Our mission is to drive technological advancement across the region while fostering a culture of innovation and excellence.',
  website: 'https://techcorp.sa',
  socialMedia: {
    linkedin: 'https://linkedin.com/company/techcorp-saudi',
    twitter: 'https://twitter.com/techcorpsa',
    instagram: 'https://instagram.com/techcorpsa'
  },
  metrics: {
    internshipsOffered: 45,
    internsHired: 38,
    averageRating: 4.7,
    reviewCount: 127
  },
  openPositions: [
    {
      id: '1',
      title: 'Frontend Development Intern',
      location: 'Riyadh',
      type: 'hybrid',
      duration: '3 months',
      isPaid: true,
      description: 'Work on modern web applications using React and TypeScript'
    },
    {
      id: '2',
      title: 'Data Science Intern',
      location: 'Remote',
      type: 'remote',
      duration: '4 months',
      isPaid: true,
      description: 'Analyze large datasets and build machine learning models'
    },
    {
      id: '3',
      title: 'UI/UX Design Intern',
      location: 'Riyadh',
      type: 'on-site',
      duration: '3 months',
      isPaid: false,
      description: 'Create user-centered designs for mobile and web applications'
    },
    {
      id: '4',
      title: 'Cybersecurity Intern',
      location: 'Jeddah',
      type: 'hybrid',
      duration: '6 months',
      isPaid: true,
      description: 'Learn about network security and threat detection'
    }
  ]
};

export default function CompanyDetails() {
  const { id } = useParams();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const company = mockCompany; // In real app, fetch by id

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'remote':
        return <Globe className="h-4 w-4" />;
      case 'on-site':
        return <Building2 className="h-4 w-4" />;
      case 'hybrid':
        return <Clock className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'remote':
        return 'secondary';
      case 'on-site':
        return 'outline';
      case 'hybrid':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/student/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback className="text-2xl bg-primary/10">
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{company.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{company.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={isWatchlisted ? "default" : "outline"}
                    onClick={() => setIsWatchlisted(!isWatchlisted)}
                    className="gap-2"
                  >
                    <Heart className={`h-4 w-4 ${isWatchlisted ? 'fill-current' : ''}`} />
                    {isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}
                  </Button>
                  
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    {isFollowing ? 'Following' : 'Follow Company'}
                  </Button>

                  <Button variant="outline" className="gap-2" asChild>
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About the Company</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description}
                </p>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Open Internship Positions ({company.openPositions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.openPositions.map((position, index) => (
                  <div key={position.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-foreground">{position.title}</h3>
                        <p className="text-sm text-muted-foreground">{position.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={getTypeBadgeVariant(position.type)} className="gap-1">
                            {getTypeIcon(position.type)}
                            {position.type}
                          </Badge>
                          
                          <Badge variant="outline" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            {position.location}
                          </Badge>
                          
                          <Badge variant="outline" className="gap-1">
                            <Calendar className="h-3 w-3" />
                            {position.duration}
                          </Badge>
                          
                          <Badge 
                            variant={position.isPaid ? "default" : "secondary"}
                            className="gap-1"
                          >
                            <DollarSign className="h-3 w-3" />
                            {position.isPaid ? 'Paid' : 'Unpaid'}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Company Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Internships Offered</span>
                  <span className="font-semibold">{company.metrics.internshipsOffered}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Interns Hired</span>
                  <span className="font-semibold">{company.metrics.internsHired}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{company.metrics.averageRating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-semibold">{company.metrics.reviewCount}</span>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Add Review
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Connect with Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {company.socialMedia.linkedin && (
                  <a 
                    href={company.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">LinkedIn</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                  </a>
                )}
                
                {company.socialMedia.twitter && (
                  <a 
                    href={company.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span className="text-sm">Twitter</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                  </a>
                )}
                
                {company.socialMedia.instagram && (
                  <a 
                    href={company.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="text-sm">Instagram</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  View All Reviews
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Briefcase className="h-4 w-4" />
                  View All Positions
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Company Website Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}