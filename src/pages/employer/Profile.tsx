import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, MapPin, Phone, Mail, Building, Globe, Users } from 'lucide-react';
import type { EmployerProfile } from '@/types';

export default function EmployerProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<EmployerProfile>(user?.profile as EmployerProfile || {
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    description: '',
    location: '',
    contactPerson: '',
    phone: '',
  });

  const handleSave = () => {
    // TODO: Save profile changes
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Company Profile</h1>
            <p className="text-muted-foreground">Manage your company information</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.logo} />
                <AvatarFallback className="text-lg">
                  {profile.companyName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {profile.companyName || 'Company Name'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {profile.industry} • {profile.companySize} employees
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {profile.website}
                    </div>
                  )}
                </div>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Logo
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={profile.companyName}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={profile.industry}
                  onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  id="companySize"
                  value={profile.companySize}
                  onChange={(e) => setProfile({ ...profile, companySize: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., 50-100, 100-500"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://company.com"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={profile.contactPerson}
                  onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Description */}
        <Card>
          <CardHeader>
            <CardTitle>Company Description</CardTitle>
            <CardDescription>Tell candidates about your company and culture</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your company, mission, and what makes it a great place to work..."
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              disabled={!isEditing}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}