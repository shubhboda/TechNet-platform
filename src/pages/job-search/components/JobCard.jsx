import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onSave, onApply, onQuickView, isSaved = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleSave = () => {
    setIsBookmarked(!isBookmarked);
    onSave(job.id, !isBookmarked);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${min}k - $${max}k`;
    if (min) return `$${min}k+`;
    return `Up to $${max}k`;
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 relative overflow-hidden">
      {/* Urgency Indicator */}
      {job.urgency && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-accent/20" />
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-14 h-14 bg-muted rounded-xl overflow-hidden flex-shrink-0 border border-border">
            <Image 
              src={job.company.logo} 
              alt={`${job.company.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              {job.urgency && (
                <Icon 
                  name={getUrgencyIcon(job.urgency)} 
                  size={16} 
                  className={`${getUrgencyColor(job.urgency)} flex-shrink-0`} 
                />
              )}
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <p className="text-sm font-medium text-foreground">{job.company.name}</p>
              {job.company.rating && (
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">
                    {job.company.rating} ({job.company.reviews})
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{getTimeAgo(job.postedDate)}</span>
              </div>
              {job.applications && (
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{job.applications} applied</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className="flex-shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={18} 
            className={isBookmarked ? "text-primary fill-current" : "text-muted-foreground"}
          />
        </Button>
      </div>

      {/* Job Details */}
      <div className="space-y-4 mb-6">
        {/* Salary and Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
              <Icon name="DollarSign" size={16} className="text-success" />
              <span className="text-sm font-semibold text-success">
                {formatSalary(job.salary.min, job.salary.max)}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <Icon name="Briefcase" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">{job.type}</span>
            </div>
          </div>
          {job.isRemote && (
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
              <Icon name="Globe" size={12} className="inline mr-1" />
              Remote
            </span>
          )}
        </div>

        {/* Experience Level */}
        <div className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-lg">
          <Icon name="TrendingUp" size={16} className="text-warning" />
          <span className="text-sm text-muted-foreground">{job.experienceLevel}</span>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Required Skills</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors cursor-pointer"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Description Preview */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</p>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickView(job)}
          className="flex-1 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-colors"
        >
          <Icon name="Eye" size={16} className="mr-2" />
          Quick View
        </Button>
        <Button
          size="sm"
          onClick={() => onApply(job)}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Icon name="Send" size={16} className="mr-2" />
          Apply Now
        </Button>
      </div>

      {/* Match Score */}
      {job.matchScore && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={14} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Match Score</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <span className="text-sm font-bold text-primary">{job.matchScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Company Info Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>{job.company.size} employees</span>
            <span>{job.company.industry}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Building2" size={12} />
            <span>{job.company.funding}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;