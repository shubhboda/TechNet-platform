import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import ResumePreview from '../components/ResumePreview';

const ResumeMaker = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Experienced software developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and emerging technologies. Proven track record of leading development teams and delivering high-quality products.',
    experience: [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: 'Lead frontend development for enterprise applications. Mentored junior developers and implemented best practices. Improved application performance by 40%.'
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        description: 'Built and maintained multiple web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver features on time.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California',
        graduationYear: '2020',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      { id: 1, name: 'React', level: 'expert' },
      { id: 2, name: 'JavaScript', level: 'expert' },
      { id: 3, name: 'Node.js', level: 'advanced' },
      { id: 4, name: 'Python', level: 'intermediate' },
      { id: 5, name: 'AWS', level: 'intermediate' },
      { id: 6, name: 'Docker', level: 'intermediate' }
    ],
    projects: [],
    certifications: []
  });

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
      description: 'Clean and professional design'
    },
    {
      id: 'creative',
      name: 'Creative',
      preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=500&fit=crop',
      description: 'Stand out with unique styling'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      description: 'Simple and elegant layout'
    },
    {
      id: 'professional',
      name: 'Professional',
      preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop',
      description: 'Traditional corporate style'
    }
  ];

  const steps = [
    { id: 1, title: 'Choose Template', icon: 'Layout' },
    { id: 2, title: 'Personal Info', icon: 'User' },
    { id: 3, title: 'Experience', icon: 'Briefcase' },
    { id: 4, title: 'Education', icon: 'GraduationCap' },
    { id: 5, title: 'Skills', icon: 'Code' },
    { id: 6, title: 'Projects', icon: 'Folder' },
    { id: 7, title: 'Preview & Download', icon: 'Download' }
  ];

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'intermediate' }]
    }));
  };

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Template</h3>
              <p className="text-muted-foreground mb-6">Select a template that matches your style and industry</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-primary shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-lg">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm opacity-90">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <p className="text-muted-foreground mb-6">Tell us about yourself</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Professional Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="A brief summary of your professional background and career objectives..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Work Experience</h3>
                <p className="text-muted-foreground">Add your professional experience</p>
              </div>
              <Button onClick={addExperience} className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="bg-muted/30 rounded-lg p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">Experience #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Senior Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={exp.current}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="rounded border-border"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-sm text-foreground">
                        I currently work here
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Education</h3>
              <p className="text-muted-foreground mb-6">Add your educational background</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Institution</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="University of California"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Graduation Year</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GPA (Optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
                <p className="text-muted-foreground">Add your technical and soft skills</p>
              </div>
              <Button onClick={addSkill} className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Skill
              </Button>
            </div>
            <div className="space-y-4">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., React, JavaScript, Project Management"
                    />
                  </div>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">💡 Skill Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'Python', 'Node.js', 'AWS', 'Docker', 'Git', 'Agile', 'Leadership', 'Communication'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      addSkill();
                      // Add the suggested skill to the latest added skill
                      setTimeout(() => {
                        const newSkill = resumeData.skills[resumeData.skills.length - 1];
                        if (newSkill) {
                          updateSkill(newSkill.id, 'name', skill);
                        }
                      }, 100);
                    }}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Projects</h3>
              <p className="text-muted-foreground mb-6">Showcase your projects and achievements</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="E-commerce Platform"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Technologies Used</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Project Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe the project, your role, and key achievements..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project URL (Optional)</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Preview & Download</h3>
              <p className="text-muted-foreground mb-6">Review your resume and download it</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-4">Resume Preview</h4>
                <div className="aspect-[3/4] bg-white rounded-lg border border-border overflow-hidden shadow-sm">
                  <ResumePreview data={resumeData} template={selectedTemplate} />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-4">Download Options</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="Download" size={16} className="mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Share Resume
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Save" size={16} className="mr-2" />
                      Save Template
                    </Button>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-4">Resume Tips</h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span>Keep it concise - aim for 1-2 pages</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span>Use action verbs to describe achievements</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span>Quantify your accomplishments with numbers</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span>Tailor your resume for each job application</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="container-app py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Resume Maker</h1>
              <p className="text-muted-foreground mt-1">Create a professional resume in minutes</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="outline">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button>
                <Icon name="Save" size={16} className="mr-2" />
                Save Progress
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    activeStep >= step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-muted border-border text-muted-foreground'
                  }`}
                >
                  {activeStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-200 ${
                      activeStep > step.id ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-sm font-medium transition-colors ${
                  activeStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={activeStep === 1}
            className="px-6 py-3"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Step {activeStep} of {steps.length}
            </span>
            {activeStep < steps.length ? (
              <Button onClick={nextStep} className="px-6 py-3 bg-primary hover:bg-primary/90">
                Next
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            ) : (
              <Button className="px-6 py-3 bg-success hover:bg-success/90">
                <Icon name="Download" size={16} className="mr-2" />
                Download Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;
