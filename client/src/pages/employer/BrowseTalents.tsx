import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Eye, 
  Bookmark,
  BookmarkCheck,
  MapPin, 
  GraduationCap, 
  Calendar,
  User,
  Clock,
  Star,
  ChevronDown,
  Grid,
  List,
  X
} from 'lucide-react';

// Mock student data
const mockStudents = [
  {
    id: '1',
    firstName: 'Ahmad',
    lastName: 'Al-Rashid',
    avatar: '👨‍💻',
    university: 'King Saud University',
    major: 'Computer Science',
    graduationYear: 2025,
    location: 'Riyadh, Saudi Arabia',
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    bio: 'Passionate computer science student seeking internship opportunities in tech companies.',
    gpa: 3.8,
    internshipAvailability: 'Summer 2024',
    availability: 'Available',
    rating: 4.5,
    projectsCount: 12,
    isBookmarked: false
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Al-Mahmoud',
    avatar: '👩‍💼',
    university: 'Princess Nourah University',
    major: 'Business Administration',
    graduationYear: 2024,
    location: 'Jeddah, Saudi Arabia',
    skills: ['Marketing', 'Strategic Planning', 'Data Analysis', 'Leadership'],
    bio: 'Business student with focus on marketing and strategic planning, seeking growth opportunities.',
    gpa: 3.9,
    internshipAvailability: 'Available Now',
    availability: 'Available',
    rating: 4.7,
    projectsCount: 8,
    isBookmarked: true
  },
  {
    id: '3',
    firstName: 'Mohammed',
    lastName: 'Al-Faisal',
    avatar: '👨‍🔬',
    university: 'KFUPM',
    major: 'Computer Engineering',
    graduationYear: 2025,
    location: 'Dhahran, Saudi Arabia',
    skills: ['Hardware Design', 'Embedded Systems', 'C++', 'FPGA'],
    bio: 'Computer engineering student with expertise in embedded systems and hardware design.',
    gpa: 3.7,
    internshipAvailability: 'Summer 2024',
    availability: 'Available',
    rating: 4.3,
    projectsCount: 15,
    isBookmarked: false
  },
  {
    id: '4',
    firstName: 'Nora',
    lastName: 'Al-Zahra',
    avatar: '👩‍🎨',
    university: 'Effat University',
    major: 'Graphic Design',
    graduationYear: 2024,
    location: 'Jeddah, Saudi Arabia',
    skills: ['Adobe Creative Suite', 'UI/UX Design', 'Brand Identity', 'Typography'],
    bio: 'Creative design student passionate about user experience and visual communication.',
    gpa: 3.6,
    internshipAvailability: 'Available Now',
    availability: 'Available',
    rating: 4.6,
    projectsCount: 20,
    isBookmarked: false
  },
  {
    id: '5',
    firstName: 'Khalid',
    lastName: 'Al-Otaibi',
    avatar: '👨‍⚕️',
    university: 'King Abdulaziz University',
    major: 'Biomedical Engineering',
    graduationYear: 2026,
    location: 'Jeddah, Saudi Arabia',
    skills: ['Medical Devices', 'Signal Processing', 'MATLAB', 'Research'],
    bio: 'Biomedical engineering student interested in medical device development and healthcare innovation.',
    gpa: 3.8,
    internshipAvailability: 'Summer 2024',
    availability: 'Available',
    rating: 4.4,
    projectsCount: 10,
    isBookmarked: true
  },
  {
    id: '6',
    firstName: 'Fatima',
    lastName: 'Al-Rashid',
    avatar: '👩‍💻',
    university: 'Imam Abdulrahman University',
    major: 'Data Science',
    graduationYear: 2025,
    location: 'Dammam, Saudi Arabia',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Tableau'],
    bio: 'Data science student with strong analytical skills and passion for extracting insights from data.',
    gpa: 3.9,
    internshipAvailability: 'Available Now',
    availability: 'Available',
    rating: 4.8,
    projectsCount: 18,
    isBookmarked: false
  }
];

const majors = [
  'Computer Science', 'Business Administration', 'Computer Engineering', 
  'Graphic Design', 'Biomedical Engineering', 'Data Science', 'Marketing',
  'Finance', 'Mechanical Engineering', 'Civil Engineering'
];

const universities = [
  'King Saud University', 'Princess Nourah University', 'KFUPM', 
  'Effat University', 'King Abdulaziz University', 'Imam Abdulrahman University',
  'King Fahd University', 'Umm Al-Qura University'
];

const locations = [
  'Riyadh, Saudi Arabia', 'Jeddah, Saudi Arabia', 'Dhahran, Saudi Arabia',
  'Dammam, Saudi Arabia', 'Mecca, Saudi Arabia', 'Medina, Saudi Arabia'
];

const skills = [
  'JavaScript', 'React', 'Python', 'Machine Learning', 'Marketing',
  'Strategic Planning', 'Data Analysis', 'Leadership', 'Hardware Design',
  'Embedded Systems', 'C++', 'FPGA', 'Adobe Creative Suite', 'UI/UX Design'
];

export default function BrowseTalents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedGradYear, setSelectedGradYear] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const filtered = mockStudents.filter(student => 
        student.firstName.toLowerCase().includes(query.toLowerCase()) ||
        student.lastName.toLowerCase().includes(query.toLowerCase()) ||
        student.major.toLowerCase().includes(query.toLowerCase()) ||
        student.university.toLowerCase().includes(query.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredStudents(filtered);
      setIsLoading(false);
    }, 500);
  };

  // Handle filters
  const applyFilters = () => {
    let filtered = [...mockStudents];

    if (selectedMajor) {
      filtered = filtered.filter(student => student.major === selectedMajor);
    }
    if (selectedUniversity) {
      filtered = filtered.filter(student => student.university === selectedUniversity);
    }
    if (selectedGradYear) {
      filtered = filtered.filter(student => student.graduationYear.toString() === selectedGradYear);
    }
    if (selectedLocation) {
      filtered = filtered.filter(student => student.location === selectedLocation);
    }
    if (selectedAvailability) {
      filtered = filtered.filter(student => student.internshipAvailability === selectedAvailability);
    }
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(student => 
        selectedSkills.some(skill => student.skills.includes(skill))
      );
    }

    // Apply search if exists
    if (searchQuery) {
      filtered = filtered.filter(student => 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.firstName.localeCompare(b.firstName);
        case 'gpa':
          return b.gpa - a.gpa;
        case 'graduation':
          return a.graduationYear - b.graduationYear;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredStudents(filtered);
  };

  // Handle bookmark toggle
  const toggleBookmark = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, isBookmarked: !student.isBookmarked }
        : student
    ));
    setFilteredStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, isBookmarked: !student.isBookmarked }
        : student
    ));
  };

  // Handle skill selection
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMajor('');
    setSelectedUniversity('');
    setSelectedGradYear('');
    setSelectedLocation('');
    setSelectedAvailability('');
    setSelectedSkills([]);
    setFilteredStudents(mockStudents);
  };

  // Apply filters whenever filter values change
  React.useEffect(() => {
    applyFilters();
  }, [selectedMajor, selectedUniversity, selectedGradYear, selectedLocation, selectedAvailability, selectedSkills, sortBy, searchQuery]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Talents 🎯</h1>
          <p className="text-muted-foreground">
            Discover talented students for your internship opportunities
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, major, university, or skills..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="gpa">GPA</SelectItem>
                  <SelectItem value="graduation">Graduation Year</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Major Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Major</label>
                  <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Majors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Majors</SelectItem>
                      {majors.map(major => (
                        <SelectItem key={major} value={major}>{major}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* University Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">University</label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Universities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Universities</SelectItem>
                      {universities.map(university => (
                        <SelectItem key={university} value={university}>{university}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Graduation Year Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Graduation Year</label>
                  <Select value={selectedGradYear} onValueChange={setSelectedGradYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Years</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Internship Availability</label>
                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="All Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Availability</SelectItem>
                    <SelectItem value="Available Now">Available Now</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skills Filter */}
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No students found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more students.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{student.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {student.firstName} {student.lastName}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              {student.major}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(student.id)}
                        >
                          {student.isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      {/* University & Location */}
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {student.university}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {student.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          Graduating {student.graduationYear}
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {student.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {student.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{student.rating}</span>
                          </div>
                          <div className="text-muted-foreground">
                            GPA: {student.gpa}
                          </div>
                        </div>
                        <Badge 
                          variant={student.availability === 'Available' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {student.internshipAvailability}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{student.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg truncate">
                            {student.firstName} {student.lastName}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(student.id)}
                          >
                            {student.isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-primary" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span>{student.major}</span>
                          <span>•</span>
                          <span>{student.university}</span>
                          <span>•</span>
                          <span>Class of {student.graduationYear}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {student.skills.slice(0, 4).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span>{student.rating}</span>
                            </div>
                            <Badge 
                              variant={student.availability === 'Available' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {student.internshipAvailability}
                            </Badge>
                            <Button size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}