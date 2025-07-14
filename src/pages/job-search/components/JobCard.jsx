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

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              src={job.company.logo} 
              alt={`${job.company.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{job.company.name}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{getTimeAgo(job.postedDate)}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className="flex-shrink-0"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={18} 
            className={isBookmarked ? "text-primary" : "text-muted-foreground"}
          />
        </Button>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        {/* Salary and Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                {formatSalary(job.salary.min, job.salary.max)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Briefcase" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">{job.type}</span>
            </div>
          </div>
          {job.isRemote && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
              Remote
            </span>
          )}
        </div>

        {/* Experience Level */}
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={16} className="text-warning" />
          <span className="text-sm text-muted-foreground">{job.experienceLevel}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuickView(job)}
          className="flex-1"
        >
          <Icon name="Eye" size={16} className="mr-2" />
          Quick View
        </Button>
        <Button
          size="sm"
          onClick={() => onApply(job)}
          className="flex-1"
        >
          <Icon name="Send" size={16} className="mr-2" />
          Apply Now
        </Button>
      </div>

      {/* Match Score */}
      {job.matchScore && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Match Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
              <span className="text-xs font-medium text-primary">{job.matchScore}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;