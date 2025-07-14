import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const ProfessionalInfoStep = ({ formData, onFormChange, onNext, onBack, errors }) => {
  const experienceLevels = [
    { value: '', label: 'Select experience level' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
    { value: 'executive', label: 'Executive/C-Level' }
  ];

  const programmingLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' }
  ];

  const jobRoles = [
    { value: '', label: 'Select your current role' },
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'mobile-developer', label: 'Mobile Developer' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'machine-learning-engineer', label: 'ML Engineer' },
    { value: 'software-architect', label: 'Software Architect' },
    { value: 'engineering-manager', label: 'Engineering Manager' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'qa-engineer', label: 'QA Engineer' },
    { value: 'security-engineer', label: 'Security Engineer' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' }
  ];

  const isFormValid = () => {
    return formData.currentRole && 
           formData.company && 
           formData.experienceLevel &&
           formData.primaryLanguages && 
           formData.primaryLanguages.length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Professional Information
        </h2>
        <p className="text-muted-foreground">
          Help us understand your professional background
        </p>
      </div>

      <div className="space-y-4">
        <Select
          label="Current Role"
          options={jobRoles}
          value={formData.currentRole}
          onChange={(value) => onFormChange('currentRole', value)}
          error={errors.currentRole}
          searchable
          required
          className="mb-4"
        />

        <Input
          label="Company"
          type="text"
          placeholder="Enter your current company"
          value={formData.company}
          onChange={(e) => onFormChange('company', e.target.value)}
          error={errors.company}
          description="If you're a student or between jobs, enter 'Student' or 'Looking for opportunities'"
          required
        />

        <Select
          label="Experience Level"
          options={experienceLevels}
          value={formData.experienceLevel}
          onChange={(value) => onFormChange('experienceLevel', value)}
          error={errors.experienceLevel}
          required
          className="mb-4"
        />

        <Select
          label="Primary Programming Languages"
          description="Select the languages you work with most frequently"
          options={programmingLanguages}
          value={formData.primaryLanguages || []}
          onChange={(value) => onFormChange('primaryLanguages', value)}
          error={errors.primaryLanguages}
          multiple
          searchable
          clearable
          required
          className="mb-4"
        />

        <Input
          label="Location (Optional)"
          type="text"
          placeholder="City, State/Country or Remote"
          value={formData.location}
          onChange={(e) => onFormChange('location', e.target.value)}
          description="This helps connect you with local opportunities and professionals"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          className="flex-1"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Terms
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalInfoStep;