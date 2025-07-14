import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister }) => {
  const handleLinkedInRegister = () => {
    console.log('LinkedIn registration clicked');
    onSocialRegister('linkedin');
  };

  const handleGitHubRegister = () => {
    console.log('GitHub registration clicked');
    onSocialRegister('github');
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Quick registration with your professional accounts
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleLinkedInRegister}
          className="w-full"
          iconName="Linkedin"
          iconPosition="left"
        >
          Continue with LinkedIn
        </Button>
        
        <Button
          variant="outline"
          onClick={handleGitHubRegister}
          className="w-full"
          iconName="Github"
          iconPosition="left"
        >
          Continue with GitHub
        </Button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or register manually</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;