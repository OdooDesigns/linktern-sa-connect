import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Upload, FileText, Clock, ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { StudentProfile } from '@/types';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  university: z.string().min(1, 'University is required'),
  major: z.string().min(1, 'Major is required'),
  graduationYear: z.number().min(2024, 'Graduation year must be 2024 or later'),
  cv: z.any().refine((file) => file?.length > 0, 'CV upload is required'),
  coverLetter: z.string().optional(),
  additionalDocuments: z.any().optional(),
  availability: z.string().optional(),
  preferredWorkType: z.enum(['remote', 'on-site', 'hybrid']).optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// Mock job data
const mockJob = {
  id: '1',
  title: 'Software Development Intern',
  company: 'TechCorp Saudi',
  location: 'Riyadh, Saudi Arabia',
  type: 'hybrid',
  duration: '3 months',
  description: 'Join our development team and work on cutting-edge projects...',
  requirements: ['React', 'TypeScript', 'Node.js'],
  skills: ['JavaScript', 'React', 'TypeScript', 'Git'],
};

export default function StudentApplicationPage() {
  const { jobId } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const studentProfile = user?.role === 'student' ? user.profile as StudentProfile : null;

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: studentProfile?.firstName || '',
      lastName: studentProfile?.lastName || '',
      email: user?.email || '',
      phone: studentProfile?.phone || '',
      university: studentProfile?.university || '',
      major: studentProfile?.major || '',
      graduationYear: studentProfile?.graduationYear || new Date().getFullYear() + 1,
      coverLetter: '',
      availability: '',
    },
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem(`application-draft-${jobId}`, JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form, jobId]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(`application-draft-${jobId}`);
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      Object.keys(draftData).forEach((key) => {
        if (draftData[key]) {
          form.setValue(key as keyof ApplicationFormData, draftData[key]);
        }
      });
      toast({
        title: 'Draft loaded',
        description: 'Your previous application draft has been restored.',
      });
    }

    // Simulate checking if user already applied
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setHasApplied(appliedJobs.includes(jobId));
  }, [jobId, form, toast]);

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful submission
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    appliedJobs.push(jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    localStorage.removeItem(`application-draft-${jobId}`);
    
    setApplicationSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: 'Application submitted successfully!',
      description: 'We will review your application and get back to you soon.',
    });
  };

  const steps = [
    { id: 1, title: 'Personal Information', description: 'Basic details about you' },
    { id: 2, title: 'Documents', description: 'Upload your CV and other documents' },
    { id: 3, title: 'Additional Information', description: 'Cover letter and preferences' },
    { id: 4, title: 'Review & Submit', description: 'Review your application before submitting' },
  ];

  if (hasApplied && !applicationSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle>Already Applied</CardTitle>
            <CardDescription>
              You have already submitted an application for this position.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setLocation('/student/dashboard')}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (applicationSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle>Application Submitted Successfully!</CardTitle>
            <CardDescription>
              Thank you for applying to {mockJob.title} at {mockJob.company}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                A confirmation email has been sent to {user?.email}
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <h3 className="font-semibold">What happens next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your application will be reviewed by our team</li>
                <li>• We'll contact you within 5-7 business days</li>
                <li>• You can track your application status in your dashboard</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Suggested next steps:</h3>
              <div className="grid gap-2">
                <Button variant="outline" onClick={() => setLocation('/student/dashboard')}>
                  View Application Status
                </Button>
                <Button variant="outline" onClick={() => setLocation('/browse-jobs')}>
                  Browse More Jobs
                </Button>
                <Button variant="outline" onClick={() => setLocation('/student/profile')}>
                  Update Your Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/browse-jobs')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{mockJob.title}</CardTitle>
              <CardDescription>
                {mockJob.company} • {mockJob.location} • {mockJob.type} • {mockJob.duration}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Application Status Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="university"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>University</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Graduation Year</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Documents */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CV/Resume *</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => field.onChange(e.target.files)}
                                className="max-w-xs mx-auto"
                              />
                              <p className="text-sm text-muted-foreground mt-2">
                                PDF, DOC, or DOCX files only
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalDocuments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Documents (Optional)</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                              <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <Input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.jpg,.png"
                                onChange={(e) => field.onChange(e.target.files)}
                                className="max-w-xs mx-auto"
                              />
                              <p className="text-sm text-muted-foreground mt-2">
                                Portfolio, certificates, or other relevant documents
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A well-written cover letter can help your application stand out
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="When are you available to start? Any scheduling constraints?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredWorkType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Work Type (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="on-site">On-site</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <Alert>
                      <Eye className="h-4 w-4" />
                      <AlertDescription>
                        Please review your application before submitting. Once submitted, you cannot make changes.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Name: {form.getValues('firstName')} {form.getValues('lastName')}</div>
                          <div>Email: {form.getValues('email')}</div>
                          <div>Phone: {form.getValues('phone')}</div>
                          <div>University: {form.getValues('university')}</div>
                          <div>Major: {form.getValues('major')}</div>
                          <div>Graduation: {form.getValues('graduationYear')}</div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-2">Documents</h3>
                        <div className="text-sm">
                          <div>CV: {form.getValues('cv')?.[0]?.name || 'Not uploaded'}</div>
                          {form.getValues('additionalDocuments')?.[0] && (
                            <div>Additional Documents: {form.getValues('additionalDocuments').length} file(s)</div>
                          )}
                        </div>
                      </div>

                      {(form.getValues('coverLetter') || form.getValues('availability') || form.getValues('preferredWorkType')) && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="font-semibold mb-2">Additional Information</h3>
                            <div className="text-sm space-y-1">
                              {form.getValues('coverLetter') && (
                                <div>Cover Letter: Provided</div>
                              )}
                              {form.getValues('availability') && (
                                <div>Availability: {form.getValues('availability')}</div>
                              )}
                              {form.getValues('preferredWorkType') && (
                                <div>Preferred Work Type: {form.getValues('preferredWorkType')}</div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <Dialog open={showPreview} onOpenChange={setShowPreview}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Application Preview</DialogTitle>
                          <DialogDescription>
                            This is how your application will appear to the employer
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Applicant Information</h4>
                            <p>{form.getValues('firstName')} {form.getValues('lastName')}</p>
                            <p>{form.getValues('email')} • {form.getValues('phone')}</p>
                            <p>{form.getValues('university')} • {form.getValues('major')}</p>
                            <p>Graduating: {form.getValues('graduationYear')}</p>
                          </div>
                          {form.getValues('coverLetter') && (
                            <div>
                              <h4 className="font-semibold">Cover Letter</h4>
                              <p className="text-sm whitespace-pre-wrap">{form.getValues('coverLetter')}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Auto-save indicator */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          <Clock className="w-4 h-4 inline mr-1" />
          Your progress is automatically saved
        </div>
      </div>
    </div>
  );
}