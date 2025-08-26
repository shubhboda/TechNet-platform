import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Applications',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: 'Saved Jobs',
      value: '156',
      change: '+23',
      changeType: 'positive',
      icon: 'Bookmark',
      color: 'warning'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      change: '+18%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'accent'
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      status: 'applied',
      date: '2 hours ago',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$100k - $140k',
      status: 'interview',
      date: '1 day ago',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Design Studio',
      location: 'Remote',
      salary: '$80k - $110k',
      status: 'saved',
      date: '3 days ago',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior React Developer',
      date: 'Tomorrow, 2:00 PM',
      type: 'Video Call',
      interviewer: 'Sarah Johnson',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Engineer',
      date: 'Friday, 10:00 AM',
      type: 'On-site',
      interviewer: 'Mike Chen',
      logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'text-primary';
      case 'interview': return 'text-success';
      case 'saved': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return 'Send';
      case 'interview': return 'Calendar';
      case 'saved': return 'Bookmark';
      default: return 'Clock';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="container-app py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your job search</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Icon name="Settings" size={16} className="mr-2" />
                Settings
              </Button>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon 
                      name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                      className={stat.changeType === 'positive' ? 'text-success' : 'text-error'} 
                    />
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} className={`text-${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Applications</h2>
                <Link to="/job-search" className="text-primary hover:text-primary/80 text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground">{job.location}</span>
                        <span className="text-xs text-muted-foreground">{job.salary}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        <Icon name={getStatusIcon(job.status)} size={12} />
                        <span className="capitalize">{job.status}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{job.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Upcoming Interviews</h2>
                <Button variant="ghost" size="sm">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img src={interview.logo} alt={interview.company} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{interview.position}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Icon name="Clock" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{interview.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon name="Video" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{interview.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-primary/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Interviewer: {interview.interviewer}</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Icon name="Calendar" size={12} className="mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/job-search">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Search" size={16} className="mr-3" />
                    Search Jobs
                  </Button>
                </Link>
                <Link to="/resume-maker">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="FileText" size={16} className="mr-3" />
                    Create Resume
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Bell" size={16} className="mr-3" />
                  Job Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Users" size={16} className="mr-3" />
                  Network
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Skills & Recommendations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Skills & Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Code" size={20} className="text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">React</h3>
                    <p className="text-sm text-muted-foreground">High demand skill</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-success">+15%</div>
                  <div className="text-xs text-muted-foreground">demand increase</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Database" size={20} className="text-accent" />
                  <div>
                    <h3 className="font-medium text-foreground">Node.js</h3>
                    <p className="text-sm text-muted-foreground">Growing market</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-success">+8%</div>
                  <div className="text-xs text-muted-foreground">demand increase</div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Market Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-lg border border-success/20">
                <div className="flex items-center space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <div>
                    <h3 className="font-medium text-foreground">Frontend Market</h3>
                    <p className="text-sm text-muted-foreground">Strong growth in React and Vue.js positions</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-warning" />
                  <div>
                    <h3 className="font-medium text-foreground">Remote Opportunities</h3>
                    <p className="text-sm text-muted-foreground">45% increase in remote job postings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
