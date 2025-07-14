import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigationDrawer = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('main');
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Jobs', 
      path: '/job-search', 
      icon: 'Briefcase',
      description: 'Find your next opportunity'
    },
    { 
      label: 'Network', 
      path: '/network', 
      icon: 'Users',
      description: 'Connect with professionals'
    },
    { 
      label: 'Profile', 
      path: '/profile', 
      icon: 'User',
      description: 'Manage your profile'
    },
    { 
      label: 'Companies', 
      path: '/companies', 
      icon: 'Building2',
      description: 'Explore companies'
    },
  ];

  const quickActions = [
    { label: 'Search Jobs', icon: 'Search', action: () => console.log('Search jobs') },
    { label: 'Messages', icon: 'MessageCircle', action: () => console.log('Messages'), badge: 3 },
    { label: 'Saved Jobs', icon: 'Bookmark', action: () => console.log('Saved jobs') },
    { label: 'Applications', icon: 'FileText', action: () => console.log('Applications'), badge: 2 },
  ];

  const accountItems = [
    { label: 'Account Settings', path: '/register', icon: 'UserPlus' },
    { label: 'Privacy Settings', path: '/privacy', icon: 'Shield' },
    { label: 'Notifications', path: '/notifications', icon: 'Bell' },
    { label: 'Help & Support', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Close drawer when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleActionClick = (action) => {
    action();
    onClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-80 bg-card border-r border-border shadow-elevated z-50 md:hidden transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">TechNet</h2>
                <p className="text-xs text-muted-foreground">Professional Network</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* User Profile Summary */}
          <div className="p-6 border-b border-border bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">John Doe</h3>
                <p className="text-xs text-muted-foreground">Senior React Developer</p>
                <p className="text-xs text-muted-foreground">San Francisco, CA</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection(activeSection === 'profile' ? 'main' : 'profile')}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === 'main' && (
              <>
                {/* Quick Actions */}
                <div className="p-6 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionClick(action.action)}
                        className="relative flex flex-col items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
                      >
                        <Icon name={action.icon} size={20} className="text-primary mb-2" />
                        <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
                        {action.badge && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                            {action.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="p-6 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                          isActivePath(item.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item.icon} size={20} />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className={`text-xs ${
                            isActivePath(item.path) ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={16} />
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Account Section */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Account</h3>
                  <nav className="space-y-2">
                    {accountItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleLinkClick}
                        className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name={item.icon} size={18} />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </>
            )}

            {activeSection === 'profile' && (
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveSection('main')}
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </Button>
                  <h3 className="text-sm font-semibold text-foreground">Profile Options</h3>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/profile"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={18} />
                    <span className="text-sm">View Profile</span>
                  </Link>
                  <Link
                    to="/profile/edit"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Edit" size={18} />
                    <span className="text-sm">Edit Profile</span>
                  </Link>
                  <Link
                    to="/profile/portfolio"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Briefcase" size={18} />
                    <span className="text-sm">Portfolio</span>
                  </Link>
                  <Link
                    to="/profile/skills"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 p-3 rounded-lg text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Award" size={18} />
                    <span className="text-sm">Skills & Endorsements</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-error hover:bg-error/10 transition-smooth"
            >
              <Icon name="LogOut" size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigationDrawer;