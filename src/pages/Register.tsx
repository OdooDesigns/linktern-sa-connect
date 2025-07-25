import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, UserPlus, Users, Building } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<'student' | 'employer' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (selectedRole: 'student' | 'employer') => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, password, role!);
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to Linktern. Please complete your profile.",
        });
        navigate(`/${role}/profile`);
      } else {
        toast({
          title: "Registration failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/10 to-accent/20 p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Join Linktern</CardTitle>
              <CardDescription>
                Choose your role to get started with the perfect experience
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card 
                  className="cursor-pointer hover:shadow-medium transition-all hover:scale-105 border-2 hover:border-primary group"
                  onClick={() => handleRoleSelect('student')}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">I'm a Student</h3>
                    <p className="text-muted-foreground mb-4">
                      Looking for internship opportunities to kickstart my career
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Browse thousands of internships</li>
                      <li>• Apply with one click</li>
                      <li>• Track application status</li>
                      <li>• Connect with top companies</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-medium transition-all hover:scale-105 border-2 hover:border-primary group"
                  onClick={() => handleRoleSelect('employer')}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">I'm an Employer</h3>
                    <p className="text-muted-foreground mb-4">
                      Seeking talented interns to join our organization
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Post unlimited job listings</li>
                      <li>• Browse qualified candidates</li>
                      <li>• Manage applications easily</li>
                      <li>• Build your employer brand</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/10 to-accent/20 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-strong">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                {role === 'student' ? (
                  <Users className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Building className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create {role === 'student' ? 'Student' : 'Employer'} Account
            </CardTitle>
            <CardDescription>
              Enter your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('role')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}