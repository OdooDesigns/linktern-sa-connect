import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Briefcase, 
  Users, 
  Building, 
  Star, 
  ArrowRight,
  CheckCircle,
  Search,
  UserCheck,
  Zap
} from 'lucide-react';
import heroImage from '@/assets/hero-image.svg';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'AI-powered recommendations based on your skills and preferences'
    },
    {
      icon: UserCheck,
      title: 'Verified Companies',
      description: 'Connect with trusted employers across Saudi Arabia'
    },
    {
      icon: Zap,
      title: 'Quick Applications',
      description: 'Apply to multiple internships with one-click applications'
    }
  ];

  const stats = [
    { number: '1,000+', label: 'Active Internships' },
    { number: '500+', label: 'Partner Companies' },
    { number: '10,000+', label: 'Student Members' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-primary-light/20 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Bridge Your
                  <span className="text-primary block">Career Dreams</span>
                  with Reality
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Saudi Arabia's premier internship marketplace connecting ambitious students 
                  with innovative companies. Start your professional journey today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" className="group" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">Free to join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">Verified companies</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl transform rotate-3"></div>
              <img 
                src={heroImage} 
                alt="Students and professionals collaborating" 
                className="relative rounded-2xl shadow-strong w-full h-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Linktern?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've built the most comprehensive platform to connect Saudi talent with opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 lg:p-12 shadow-medium">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Try Our Demo
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore Linktern with our interactive demo. No signup required!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Student Demo</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse internships, apply to positions, and manage your profile
                </p>
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                  Email: student@example.com<br/>
                  Password: password
                </div>
              </Card>

              <Card className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Employer Demo</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Post jobs, browse talent, and manage your company profile
                </p>
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                  Email: employer@example.com<br/>
                  Password: password
                </div>
              </Card>
            </div>

            <Button size="lg" variant="gradient" asChild>
              <Link to="/login">
                Try Demo Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of students and companies already using Linktern
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/register">Join as Student</Link>
            </Button>
            <Button size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/register">Join as Employer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}