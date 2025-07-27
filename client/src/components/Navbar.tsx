import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  Search,
  Building,
  User,
  LogOut,
  Settings,
  Briefcase,
  Users
} from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const getInitials = () => {
    if (!user) return '';
    if (user.role === 'student') {
      const profile = user.profile as any;
      return `${profile?.firstName?.[0] || ''}${profile?.lastName?.[0] || ''}`;
    } else {
      const profile = user.profile as any;
      return profile?.companyName?.[0] || 'C';
    }
  };

  const getDisplayName = () => {
    if (!user) return '';
    if (user.role === 'student') {
      const profile = user.profile as any;
      return `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Student';
    } else {
      const profile = user.profile as any;
      return profile?.companyName || 'Company';
    }
  };

  const StudentNavLinks = () => (
    <>
      <Link href="/student/dashboard">
        <Button
          variant={isActive('/student/dashboard') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </Link>
      <Link href="/browse-jobs">
        <Button
          variant={isActive('/browse-jobs') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse Jobs
        </Button>
      </Link>
      <Link href="/student/companies">
        <Button
          variant={isActive('/student/companies') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Building className="w-4 h-4 mr-2" />
          Companies
        </Button>
      </Link>
    </>
  );

  const EmployerNavLinks = () => (
    <>
      <Link href="/employer/dashboard">
        <Button
          variant={isActive('/employer/dashboard') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </Link>
      <Link href="/employer/browse-talents">
        <Button
          variant={isActive('/employer/browse-talents') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Users className="w-4 h-4 mr-2" />
          Browse Talents
        </Button>
      </Link>
    </>
  );

  const PublicNavLinks = () => (
    <>
      <Link href="/">
        <Button
          variant={isActive('/') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </Link>
      <Link href="/browse-jobs">
        <Button
          variant={isActive('/browse-jobs') ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse Jobs
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Linktern</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              user.role === 'student' ? <StudentNavLinks /> : <EmployerNavLinks />
            ) : (
              <PublicNavLinks />
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={getDisplayName()} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role}/profile`}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t pt-4 pb-3 space-y-1">
            {user ? (
              <>
                {user.role === 'student' ? <StudentNavLinks /> : <EmployerNavLinks />}
                <div className="pt-4 border-t">
                  <div className="flex items-center px-4 pb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={getDisplayName()} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-base font-medium">{getDisplayName()}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link href={`/${user.role}/profile`}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <PublicNavLinks />
                <div className="pt-4 border-t space-y-1">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}