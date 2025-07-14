import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ email }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendCount(prev => prev + 1);
      console.log('Verification email resent to:', email);
    }, 2000);
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Account Created Successfully!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Welcome to TechNet! We've sent a verification email to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-foreground mb-1">Check Your Email</h3>
            <p className="text-sm text-muted-foreground">
              Click the verification link in your email to activate your account and start networking with tech professionals.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-foreground mb-1">Secure Account</h3>
            <p className="text-sm text-muted-foreground">
              Email verification helps keep your account secure and ensures you receive important notifications.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or
        </p>
        
        <Button
          variant="outline"
          onClick={handleResendEmail}
          disabled={isResending || resendCount >= 3}
          loading={isResending}
          iconName="RefreshCw"
          iconPosition="left"
        >
          {resendCount >= 3 ? 'Maximum attempts reached' : 'Resend verification email'}
        </Button>

        {resendCount > 0 && resendCount < 3 && (
          <p className="text-sm text-success">
            Verification email sent! ({resendCount}/3 attempts)
          </p>
        )}

        {resendCount >= 3 && (
          <p className="text-sm text-warning">
            Please contact support if you continue having issues
          </p>
        )}
      </div>

      <div className="pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">
          Ready to explore? You can start browsing while we verify your email.
        </p>
        <Link to="/job-search">
          <Button className="w-full sm:w-auto">
            <Icon name="Search" size={16} className="mr-2" />
            Explore Job Opportunities
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;