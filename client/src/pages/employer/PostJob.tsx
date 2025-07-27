import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
  Save,
  Eye,
  Send,
  Plus,
  X,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Upload,
  Sparkles,
  Building
} from 'lucide-react';

// Form validation schema
const jobPostSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  description: z.string().min(50, 'Job description must be at least 50 characters'),
  type: z.string().min(1, 'Please select an internship type'),
  location: z.string().min(1, 'Please specify a location'),
  duration: z.string().min(1, 'Please select duration'),
  deadline: z.string().min(1, 'Please set an application deadline'),
  weeklyHours: z.string().min(1, 'Please specify weekly hours'),
  salary: z.string().optional(),
  requirements: z.string().min(20, 'Please add job requirements (at least 20 characters)'),
});

type JobPostForm = z.infer<typeof jobPostSchema>;

// Predefined skill suggestions
const skillSuggestions = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
  'Data Analysis', 'Machine Learning', 'SQL', 'HTML/CSS', 'Git',
  'Project Management', 'Marketing', 'Content Writing', 'SEO',
  'Social Media', 'Graphic Design', 'UI/UX Design', 'Adobe Creative Suite',
  'Excel', 'PowerPoint', 'Research', 'Communication', 'Leadership'
];

export default function PostJob() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [isFirstPost, setIsFirstPost] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<JobPostForm>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: '',
      description: '',
      type: '',
      location: '',
      duration: '',
      deadline: '',
      weeklyHours: '',
      salary: '',
      requirements: '',
    },
  });

  const { watch, getValues } = form;
  const watchedFields = watch();

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const formData = getValues();
      if (Object.values(formData).some(value => value && value.length > 0)) {
        localStorage.setItem('job-post-draft', JSON.stringify({
          ...formData,
          skills: selectedSkills,
          lastSaved: new Date().toISOString()
        }));
        setLastSaved(new Date());
        toast({
          title: "Draft saved",
          description: "Your progress has been automatically saved.",
          duration: 2000,
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [watchedFields, selectedSkills, getValues]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('job-post-draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        form.reset(draftData);
        setSelectedSkills(draftData.skills || []);
        setLastSaved(new Date(draftData.lastSaved));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [form]);

  const steps = [
    { id: 'basic', title: 'Basic Info', icon: FileText },
    { id: 'details', title: 'Job Details', icon: Briefcase },
    { id: 'requirements', title: 'Requirements', icon: Users },
    { id: 'review', title: 'Review & Publish', icon: CheckCircle2 }
  ];

  const handleAddSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim()) {
      handleAddSkill(customSkill.trim());
      setCustomSkill('');
    }
  };

  const onSubmit = (data: JobPostForm) => {
    if (isFirstPost) {
      setConfirmDialogOpen(true);
    } else {
      handleFinalSubmit(data);
    }
  };

  const handleFinalSubmit = (data: JobPostForm) => {
    // Simulate job posting
    console.log('Job posted:', { ...data, skills: selectedSkills });
    
    // Clear draft
    localStorage.removeItem('job-post-draft');
    
    toast({
      title: "Job Posted Successfully! 🎉",
      description: "Your internship listing is now live and visible to students.",
      duration: 5000,
    });

    navigate('/employer/dashboard');
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleSaveDraft = () => {
    const formData = getValues();
    localStorage.setItem('job-post-draft', JSON.stringify({
      ...formData,
      skills: selectedSkills,
      lastSaved: new Date().toISOString()
    }));
    setLastSaved(new Date());
    toast({
      title: "Draft Saved",
      description: "Your job post has been saved as a draft.",
    });
  };

  const isStepValid = (step: number) => {
    const values = getValues();
    switch (step) {
      case 0:
        return values.title && values.description && values.type;
      case 1:
        return values.location && values.duration && values.deadline && values.weeklyHours;
      case 2:
        return values.requirements && selectedSkills.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/employer/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1" />
            {lastSaved && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Save className="w-4 h-4" />
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Post New Internship</h1>
              <p className="text-muted-foreground mt-2">
                Create an engaging job posting to attract top talent
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = isStepValid(index) && index < currentStep;
              const isAccessible = index <= currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isAccessible && setCurrentStep(index)}
                    disabled={!isAccessible}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-success border-success text-success-foreground'
                        : isActive
                        ? 'bg-primary border-primary text-primary-foreground'
                        : isAccessible
                        ? 'border-muted-foreground/30 text-muted-foreground hover:border-primary'
                        : 'border-muted-foreground/20 text-muted-foreground/50 cursor-not-allowed'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${
                      isCompleted ? 'bg-success' : 'bg-muted-foreground/20'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className="text-sm text-center" style={{ width: '120px' }}>
                <span className={index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <Tabs value={currentStep.toString()} className="w-full">
                  {/* Step 0: Basic Info */}
                  <TabsContent value="0" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Basic Job Information
                      </h3>
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Software Engineering Intern"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Description *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe the role, responsibilities, and what the intern will learn..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Internship Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select internship type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="full-time">Full-time</SelectItem>
                                  <SelectItem value="part-time">Part-time</SelectItem>
                                  <SelectItem value="remote">Remote</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Step 1: Job Details */}
                  <TabsContent value="1" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Job Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Riyadh, Saudi Arabia"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1-month">1 Month</SelectItem>
                                  <SelectItem value="2-months">2 Months</SelectItem>
                                  <SelectItem value="3-months">3 Months</SelectItem>
                                  <SelectItem value="6-months">6 Months</SelectItem>
                                  <SelectItem value="1-year">1 Year</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="deadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Application Deadline *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="weeklyHours"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weekly Hours *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select weekly hours" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="10-15">10-15 hours</SelectItem>
                                  <SelectItem value="16-20">16-20 hours</SelectItem>
                                  <SelectItem value="21-30">21-30 hours</SelectItem>
                                  <SelectItem value="31-40">31-40 hours</SelectItem>
                                  <SelectItem value="40+">40+ hours</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="salary"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Salary/Compensation (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 3000 SAR/month or Unpaid"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Step 2: Requirements */}
                  <TabsContent value="2" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Requirements & Skills
                      </h3>
                      
                      <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel>Job Requirements *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List the qualifications, education level, and experience requirements..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel className="text-base font-medium">Required Skills *</FormLabel>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add skills that are essential for this position
                        </p>
                        
                        {/* Selected Skills */}
                        {selectedSkills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="py-1 px-3">
                                {skill}
                                <X 
                                  className="w-3 h-3 ml-2 cursor-pointer" 
                                  onClick={() => handleRemoveSkill(skill)}
                                />
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Custom Skill Input */}
                        <div className="flex space-x-2 mb-4">
                          <Input
                            placeholder="Add a custom skill..."
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                          />
                          <Button type="button" onClick={handleAddCustomSkill}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Skill Suggestions */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Suggested Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skillSuggestions
                              .filter(skill => !selectedSkills.includes(skill))
                              .slice(0, 15)
                              .map((skill) => (
                                <Button
                                  key={skill}
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddSkill(skill)}
                                  className="text-xs"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  {skill}
                                </Button>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Step 3: Review */}
                  <TabsContent value="3" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Review & Publish
                      </h3>
                      
                      {/* Job Preview Summary */}
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Building className="w-5 h-5 mr-2" />
                            {watch('title') || 'Job Title'}
                          </CardTitle>
                          <CardDescription>
                            {watch('type')} • {watch('location')} • {watch('duration')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm">{watch('description')}</p>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                Deadline: {watch('deadline')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                {watch('weeklyHours')} hours/week
                              </div>
                              {watch('salary') && (
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                                  {watch('salary')}
                                </div>
                              )}
                            </div>

                            {selectedSkills.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Required Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {selectedSkills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Validation Checklist */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Pre-publish Checklist
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { label: 'Job title is clear and descriptive', valid: watch('title')?.length >= 5 },
                              { label: 'Job description is detailed', valid: watch('description')?.length >= 50 },
                              { label: 'Location is specified', valid: !!watch('location') },
                              { label: 'Application deadline is set', valid: !!watch('deadline') },
                              { label: 'At least one skill is required', valid: selectedSkills.length > 0 },
                              { label: 'Requirements are clearly defined', valid: watch('requirements')?.length >= 20 },
                            ].map((item, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                {item.valid ? (
                                  <CheckCircle2 className="w-4 h-4 text-success" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-destructive" />
                                )}
                                <span className={`text-sm ${item.valid ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {item.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              <div className="space-x-3">
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={!form.formState.isValid || selectedSkills.length === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Job
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>

        {/* Preview Dialog */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Job Preview</DialogTitle>
              <DialogDescription>
                This is how your job posting will appear to students
              </DialogDescription>
            </DialogHeader>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-6 h-6 mr-3" />
                  {watch('title') || 'Job Title'}
                </CardTitle>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {watch('location') || 'Location'}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {watch('duration') || 'Duration'}
                  </span>
                  <Badge variant="secondary">{watch('type') || 'Type'}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Job Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {watch('description') || 'Job description will appear here...'}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {watch('requirements') || 'Job requirements will appear here...'}
                  </p>
                </div>

                {selectedSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    Apply by: {watch('deadline') || 'Not set'}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    {watch('weeklyHours') || 'Hours'} per week
                  </div>
                  {watch('salary') && (
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                      {watch('salary')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog for First Post */}
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Job Posting</DialogTitle>
              <DialogDescription>
                This appears to be your first job posting. Once published, it will be visible to all students on the platform. Are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setConfirmDialogOpen(false);
                setIsFirstPost(false);
                handleFinalSubmit(getValues());
              }}>
                Yes, Publish Job
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}