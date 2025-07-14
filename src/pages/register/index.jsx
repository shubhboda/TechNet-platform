import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import SocialRegistration from './components/SocialRegistration';
import BasicInfoStep from './components/BasicInfoStep';
import ProfessionalInfoStep from './components/ProfessionalInfoStep';
import TermsStep from './components/TermsStep';
import SuccessMessage from './components/SuccessMessage';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    currentRole: '',
    company: '',
    experienceLevel: '',
    primaryLanguages: [],
    location: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingEmails: false
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 3;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (step === 2) {
      if (!formData.currentRole) {
        newErrors.currentRole = 'Please select your current role';
      }
      if (!formData.company.trim()) {
        newErrors.company = 'Company is required';
      }
      if (!formData.experienceLevel) {
        newErrors.experienceLevel = 'Please select your experience level';
      }
      if (!formData.primaryLanguages || formData.primaryLanguages.length === 0) {
        newErrors.primaryLanguages = 'Please select at least one programming language';
      }
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service';
      }
      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Simulate social registration
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Pre-populate form data based on social provider
      if (provider === 'linkedin') {
        setFormData(prev => ({
          ...prev,
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          currentRole: 'frontend-developer',
          company: 'Tech Solutions Inc.',
          experienceLevel: 'mid'
        }));
        setCurrentStep(2);
      } else if (provider === 'github') {
        setFormData(prev => ({
          ...prev,
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          primaryLanguages: ['javascript', 'python', 'typescript']
        }));
        setCurrentStep(2);
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', formData);
      setIsRegistrationComplete(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistrationComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SuccessMessage email={formData.email} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">TechNet</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/login">
                <button className="text-sm font-medium text-primary hover:underline">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border border-border shadow-soft p-8">
            {!isRegistrationComplete && currentStep <= totalSteps && (
              <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            )}

            {currentStep === 1 && (
              <>
                <SocialRegistration onSocialRegister={handleSocialRegister} />
                <BasicInfoStep
                  formData={formData}
                  onFormChange={handleFormChange}
                  onNext={handleNext}
                  errors={errors}
                />
              </>
            )}

            {currentStep === 2 && (
              <ProfessionalInfoStep
                formData={formData}
                onFormChange={handleFormChange}
                onNext={handleNext}
                onBack={handleBack}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <TermsStep
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                onBack={handleBack}
                errors={errors}
                isLoading={isLoading}
              />
            )}

            {errors.submit && (
              <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md">
                <p className="text-sm text-error">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <span className="text-foreground">Creating your account...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;