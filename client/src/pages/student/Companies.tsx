import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Building2, 
  MapPin, 
  Star, 
  Heart,
  Users,
  Briefcase,
  ExternalLink,
  Filter
} from 'lucide-react';

// Mock companies data
const mockCompanies = [
  {
    id: '1',
    name: 'TechCorp Saudi',
    logo: '/placeholder.svg',
    industry: 'Technology',
    location: 'Riyadh, Saudi Arabia',
    description: 'Leading technology company specializing in digital transformation and AI solutions.',
    rating: 4.7,
    reviewCount: 127,
    openPositions: 5,
    isWatchlisted: false
  },
  {
    id: '2',
    name: 'Saudi Data Solutions',
    logo: '/placeholder.svg',
    industry: 'Data Analytics',
    location: 'Jeddah, Saudi Arabia',
    description: 'Innovative data analytics company providing business intelligence solutions.',
    rating: 4.5,
    reviewCount: 89,
    openPositions: 3,
    isWatchlisted: true
  },
  {
    id: '3',
    name: 'Innovation Labs',
    logo: '/placeholder.svg',
    industry: 'Software Development',
    location: 'Dammam, Saudi Arabia',
    description: 'Creative software development company focused on mobile and web applications.',
    rating: 4.8,
    reviewCount: 156,
    openPositions: 7,
    isWatchlisted: false
  },
  {
    id: '4',
    name: 'AI Solutions KSA',
    logo: '/placeholder.svg',
    industry: 'Artificial Intelligence',
    location: 'Riyadh, Saudi Arabia',
    description: 'Cutting-edge AI company developing machine learning solutions for various industries.',
    rating: 4.6,
    reviewCount: 94,
    openPositions: 4,
    isWatchlisted: false
  },
  {
    id: '5',
    name: 'Creative Hub',
    logo: '/placeholder.svg',
    industry: 'Design & Marketing',
    location: 'Jeddah, Saudi Arabia',
    description: 'Full-service creative agency specializing in branding, design, and digital marketing.',
    rating: 4.4,
    reviewCount: 72,
    openPositions: 2,
    isWatchlisted: true
  },
  {
    id: '6',
    name: 'Green Energy Co',
    logo: '/placeholder.svg',
    industry: 'Renewable Energy',
    location: 'Riyadh, Saudi Arabia',
    description: 'Sustainable energy company focused on solar and wind power solutions.',
    rating: 4.9,
    reviewCount: 201,
    openPositions: 6,
    isWatchlisted: false
  }
];

export default function StudentCompanies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(mockCompanies);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWatchlist = (companyId: string) => {
    setCompanies(companies.map(company =>
      company.id === companyId
        ? { ...company, isWatchlisted: !company.isWatchlisted }
        : company
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Explore Companies
              </h1>
              <p className="text-muted-foreground">
                Discover companies offering internship opportunities
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search companies, industries, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWatchlist(company.id)}
                    className="p-2"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        company.isWatchlisted 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{company.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{company.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({company.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="gap-1">
                    <Briefcase className="w-3 h-3" />
                    {company.openPositions} positions
                  </Badge>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link to={`/company/${company.id}`}>
                      View Company
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or check back later for new companies.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </div>
      </div>
    </div>
  );
}