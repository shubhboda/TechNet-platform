import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Jobs', path: '/job-search', icon: 'Briefcase' },
    { label: 'Network', path: '/network', icon: 'Users' },
    { label: 'Profile', path: '/profile', icon: 'User' },
    { label: 'Companies', path: '/companies', icon: 'Building2' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    setIsNotificationOpen(false);
  };

  const mockNotifications = [
    { id: 1, type: 'job', title: 'New job match', message: 'Senior React Developer at TechCorp', time: '2 min ago', unread: true, icon: 'Briefcase' },
    { id: 2, type: 'connection', title: 'Connection request', message: 'John Smith wants to connect', time: '1 hour ago', unread: true, icon: 'UserPlus' },
    { id: 3, type: 'message', title: 'New message', message: 'Sarah Johnson sent you a message', time: '3 hours ago', unread: false, icon: 'MessageSquare' },
    { id: 4, type: 'application', title: 'Application viewed', message: 'Your application was viewed by Google', time: '5 hours ago', unread: false, icon: 'Eye' },
  ];

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-elevated' 
        : 'bg-card border-b border-border shadow-soft'
    }`}>
      <div className="flex h-16 items-center justify-between container-app">
        {/* Enhanced Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">TechNet</span>
            <span className="text-xs text-muted-foreground -mt-1">Find Your Dream Job</span>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'text-primary bg-primary/10 shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-sm'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Enhanced Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Enhanced Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="hover:bg-muted hover:shadow-sm transition-all duration-200"
          >
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} />
          </Button>

          {/* Enhanced Search - Desktop Only */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" 
              />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 group-hover:bg-background"
              />
            </div>
          </div>

          {/* Enhanced Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleNotifications}
              className="relative hover:bg-muted hover:shadow-sm transition-all duration-200"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-bold shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Enhanced Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-xl shadow-elevated z-50 overflow-hidden">
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-all duration-200 ${
                        notification.unread ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.unread ? 'bg-primary' : 'bg-transparent'}`} />
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            notification.unread ? 'bg-primary/10' : 'bg-muted'
                          }`}>
                            <Icon name={notification.icon} size={16} className={notification.unread ? 'text-primary' : 'text-muted-foreground'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notification.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border bg-muted/20">
                  <Button variant="ghost" size="sm" className="w-full hover:bg-primary/10 hover:text-primary">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-muted hover:shadow-sm transition-all duration-200 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-sm">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium">John Doe</span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* Enhanced Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-xl shadow-elevated z-50 overflow-hidden">
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                  <p className="text-sm font-semibold text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@technet.com</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">Premium Member</span>
                  </div>
                </div>
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-all duration-200"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-all duration-200"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-all duration-200"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Icon name="UserPlus" size={16} />
                    <span>Account</span>
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  <button
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-all duration-200 w-full text-left"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      console.log('Logout clicked');
                    }}
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden hover:bg-muted hover:shadow-sm transition-all duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in">
          {/* Enhanced Mobile Search */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Enhanced Mobile Navigation Items */}
          <nav className="py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10 border-r-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(isProfileDropdownOpen || isNotificationOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;