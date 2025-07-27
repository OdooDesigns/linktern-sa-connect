import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Clock, 
  Building, 
  Filter, 
  Grid, 
  List,
  Heart,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { Job } from '@/types';

// Demo jobs data
const demoJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'TechCorp Saudi',
    companyLogo: '',
    location: 'Riyadh, Saudi Arabia',
    type: 'hybrid',
    duration: '3 months',
    description: 'Join our engineering team to work on cutting-edge web applications using React and Node.js.',
    requirements: ['Computer Science or related field', 'React/JavaScript experience', 'Problem-solving skills'],
    skills: ['React', 'JavaScript', 'Node.js', 'Git'],
    salary: { min: 3000, max: 5000, currency: 'SAR' },
    posted: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    employerId: '1'
  },
  {
    id: '2',
    title: 'Marketing Intern',
    company: 'Digital Solutions',
    companyLogo: '',
    location: 'Jeddah, Saudi Arabia',
    type: 'on-site',
    duration: '6 months',
    description: 'Help develop and execute marketing campaigns for our digital products.',
    requirements: ['Marketing or Business major', 'Creative thinking', 'Communication skills'],
    skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
    posted: new Date('2024-01-20'),
    deadline: new Date('2024-03-01'),
    employerId: '2'
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    companyLogo: '',
    location: 'Remote',
    type: 'remote',
    duration: '4 months',
    description: 'Work with our data science team to analyze large datasets and build predictive models.',
    requirements: ['Statistics or Data Science background', 'Python experience', 'Machine learning basics'],
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    salary: { min: 4000, max: 6000, currency: 'SAR' },
    posted: new Date('2024-01-25'),
    deadline: new Date('2024-02-25'),
    employerId: '3'
  },
  {
    id: '4',
    title: 'UI/UX Design Intern',
    company: 'Creative Agency',
    companyLogo: '',
    location: 'Dammam, Saudi Arabia',
    type: 'hybrid',
    duration: '3 months',
    description: 'Design user interfaces and experiences for mobile and web applications.',
    requirements: ['Design portfolio', 'Figma/Adobe experience', 'User-centered design thinking'],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    posted: new Date('2024-01-30'),
    deadline: new Date('2024-03-15'),
    employerId: '4'
  }
];

export default function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return demoJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || job.type === typeFilter;
      const matchesDuration = !durationFilter || job.duration.includes(durationFilter);

      return matchesSearch && matchesLocation && matchesType && matchesDuration;
    });
  }, [searchTerm, locationFilter, typeFilter, durationFilter]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatSalary = (salary: Job['salary']) => {
    if (!salary) return null;
    return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} ${salary.currency}/month`;
  };

  const JobCard = ({ job, isGridView }: { job: Job; isGridView: boolean }) => (
    <Card className={`hover:shadow-lg transition-all cursor-pointer ${isGridView ? '' : 'flex'}`}>
      <CardHeader className={isGridView ? '' : 'flex-1'}>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
          >
            <Heart 
              className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-primary text-primary' : ''}`} 
            />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.duration}
          </div>
          <Badge variant="outline" className="capitalize">
            {job.type}
          </Badge>
        </div>

        {job.salary && (
          <div className="text-sm font-medium text-primary">
            {formatSalary(job.salary)}
          </div>
        )}

        <p className={`text-sm text-muted-foreground ${isGridView ? 'truncate' : 'truncate'}`}>
          {job.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, isGridView ? 4 : 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > (isGridView ? 4 : 3) && (
            <Badge variant="secondary" className="text-xs">
              +{job.skills.length - (isGridView ? 4 : 3)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      {isGridView && (
        <CardContent className="pt-0">
          <Button className="w-full">
            View Details
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Browse Internships</h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing internship opportunities in Saudi Arabia
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search internships, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      <SelectItem value="riyadh">Riyadh</SelectItem>
                      <SelectItem value="jeddah">Jeddah</SelectItem>
                      <SelectItem value="dammam">Dammam</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Work Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Durations</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex-1"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex-1"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            {filteredJobs.length} internship{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Jobs Grid/List */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} isGridView={viewMode === 'grid'} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No internships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}