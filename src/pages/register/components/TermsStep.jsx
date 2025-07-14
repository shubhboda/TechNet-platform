import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsStep = ({ formData, onFormChange, onSubmit, onBack, errors, isLoading }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const isFormValid = () => {
    return formData.agreeToTerms && formData.agreeToPrivacy;
  };

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Terms of Service</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTermsModal(false)}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="prose prose-sm text-foreground space-y-4">
            <p>
              Welcome to TechNet. By creating an account, you agree to the following terms and conditions:
            </p>
            <h4 className="font-semibold">1. Account Responsibility</h4>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <h4 className="font-semibold">2. Professional Conduct</h4>
            <p>
              TechNet is a professional networking platform. All interactions must be respectful, professional, and comply with our community guidelines.
            </p>
            <h4 className="font-semibold">3. Content Guidelines</h4>
            <p>
              You may not post content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable.
            </p>
            <h4 className="font-semibold">4. Intellectual Property</h4>
            <p>
              You retain ownership of content you post, but grant TechNet a license to use, display, and distribute your content on the platform.
            </p>
            <h4 className="font-semibold">5. Service Availability</h4>
            <p>
              We strive to maintain service availability but cannot guarantee uninterrupted access to the platform.
            </p>
          </div>
        </div>
        <div className="p-6 border-t border-border">
          <Button onClick={() => setShowTermsModal(false)} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Privacy Policy</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPrivacyModal(false)}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="prose prose-sm text-foreground space-y-4">
            <p>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <h4 className="font-semibold">Information We Collect</h4>
            <p>
              We collect information you provide directly, such as your profile information, resume, and communications on the platform.
            </p>
            <h4 className="font-semibold">How We Use Your Information</h4>
            <p>
              We use your information to provide our services, connect you with opportunities, and improve your experience on TechNet.
            </p>
            <h4 className="font-semibold">Information Sharing</h4>
            <p>
              We do not sell your personal information. We may share information with employers when you apply for jobs or with your consent.
            </p>
            <h4 className="font-semibold">Data Security</h4>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <h4 className="font-semibold">Your Rights</h4>
            <p>
              You have the right to access, update, or delete your personal information. Contact us for assistance with these requests.
            </p>
          </div>
        </div>
        <div className="p-6 border-t border-border">
          <Button onClick={() => setShowPrivacyModal(false)} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Almost Done!
        </h2>
        <p className="text-muted-foreground">
          Please review and accept our terms to complete your registration
        </p>
      </div>

      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <div className="space-y-4">
          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Terms of Service
                </button>
              </span>
            }
            checked={formData.agreeToTerms || false}
            onChange={(e) => onFormChange('agreeToTerms', e.target.checked)}
            error={errors.agreeToTerms}
            required
          />

          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </button>
              </span>
            }
            checked={formData.agreeToPrivacy || false}
            onChange={(e) => onFormChange('agreeToPrivacy', e.target.checked)}
            error={errors.agreeToPrivacy}
            required
          />

          <Checkbox
            label="I would like to receive updates about new features and opportunities (optional)"
            checked={formData.marketingEmails || false}
            onChange={(e) => onFormChange('marketingEmails', e.target.checked)}
            description="You can change this preference anytime in your account settings"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto"
          iconName="ArrowLeft"
          iconPosition="left"
          disabled={isLoading}
        >
          Back
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={!isFormValid() || isLoading}
          loading={isLoading}
          className="flex-1"
          iconName="UserPlus"
          iconPosition="right"
        >
          Create Account
        </Button>
      </div>

      {showTermsModal && <TermsModal />}
      {showPrivacyModal && <PrivacyModal />}
    </div>
  );
};

export default TermsStep;