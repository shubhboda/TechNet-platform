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
  isLoading 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'date', label: 'Most Recent', icon: 'Clock' },
    { value: 'salary-high', label: 'Highest Salary', icon: 'TrendingUp' },
    { value: 'salary-low', label: 'Lowest Salary', icon: 'TrendingDown' },
    { value: 'company', label: 'Company Name', icon: 'Building2' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Enhanced Results Summary */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {totalJobs.toLocaleString()} Jobs Found
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing results for your search criteria
              </p>
            </div>
          </div>
          
          {/* Enhanced Stats */}
          <div className="hidden md:flex items-center space-x-4 pl-4 border-l border-border">
            <div className="text-center">
              <div className="text-sm font-semibold text-success">92%</div>
              <div className="text-xs text-muted-foreground">Match Rate</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-primary">24</div>
              <div className="text-xs text-muted-foreground">New Today</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-warning">156</div>
              <div className="text-xs text-muted-foreground">Remote Jobs</div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex items-center space-x-3">
          {/* Enhanced Sort Dropdown */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-primary/50 cursor-pointer"
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>

          {/* Enhanced View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3 py-1.5"
            >
              <Icon name="List" size={16} />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3 py-1.5"
            >
              <Icon name="Grid" size={16} />
            </Button>
          </div>

          {/* Enhanced Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="hover:bg-primary/5 hover:border-primary/50 hover:text-primary transition-all duration-200"
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} 
            />
            Refresh
          </Button>

          {/* Enhanced Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-success/5 hover:border-success/50 hover:text-success transition-all duration-200"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Stats */}
      <div className="md:hidden mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="text-lg font-bold text-success">92%</div>
            <div className="text-xs text-muted-foreground">Match Rate</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-lg font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">New Today</div>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="text-lg font-bold text-warning">156</div>
            <div className="text-xs text-muted-foreground">Remote Jobs</div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Quick Actions:</span>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Bookmark" size={14} className="mr-1" />
              Save Search
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Bell" size={14} className="mr-1" />
              Job Alerts
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Share2" size={14} className="mr-1" />
              Share
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListHeader;