import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobListHeader = ({ 
  totalJobs, 
  currentPage, 
  totalPages, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onRefresh,
  isLoading = false 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'date', label: 'Most Recent', icon: 'Clock' },
    { value: 'salary-high', label: 'Salary: High to Low', icon: 'TrendingUp' },
    { value: 'salary-low', label: 'Salary: Low to High', icon: 'TrendingDown' },
    { value: 'company', label: 'Company A-Z', icon: 'Building2' }
  ];

  const viewModes = [
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' }
  ];

  const formatJobCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toLocaleString();
  };

  const getCurrentRange = () => {
    const start = (currentPage - 1) * 20 + 1;
    const end = Math.min(currentPage * 20, totalJobs);
    return { start, end };
  };

  const { start, end } = getCurrentRange();

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Results Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Briefcase" size={20} className="text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {formatJobCount(totalJobs)} Jobs Found
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing {start}-{end} of {totalJobs.toLocaleString()} results
                </p>
              </div>
            </div>
            
            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex-shrink-0"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={isLoading ? "animate-spin" : ""} 
              />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-background border border-border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-1">
              {viewModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onViewModeChange(mode.value)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-smooth ${
                    viewMode === mode.value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={mode.label}
                >
                  <Icon name={mode.icon} size={16} />
                  <span className="hidden sm:inline">{mode.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Job Alerts */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
            >
              <Icon name="Bell" size={16} className="mr-2" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              Top locations: San Francisco, New York, Remote
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-muted-foreground">
              Avg salary: $95k - $140k
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Clock" size={14} className="text-primary" />
            <span className="text-muted-foreground">
              {Math.floor(Math.random() * 50) + 20} new jobs today
            </span>
          </div>
        </div>

        {/* Pagination Info for Mobile */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border lg:hidden">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListHeader;