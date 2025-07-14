import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  const quickFilters = [
    { id: 'remote', label: 'Remote', icon: 'Wifi', count: 1247 },
    { id: 'full-time', label: 'Full-time', icon: 'Clock', count: 2156 },
    { id: 'senior', label: 'Senior Level', icon: 'TrendingUp', count: 789 },
    { id: 'startup', label: 'Startup', icon: 'Zap', count: 456 },
    { id: 'high-salary', label: '$100k+', icon: 'DollarSign', count: 567 },
    { id: 'visa', label: 'Visa Sponsor', icon: 'Globe', count: 234 }
  ];

  const salaryRanges = [
    { id: 'entry', label: '$40k - $70k', min: 40, max: 70 },
    { id: 'mid', label: '$70k - $100k', min: 70, max: 100 },
    { id: 'senior', label: '$100k - $150k', min: 100, max: 150 },
    { id: 'lead', label: '$150k+', min: 150, max: null }
  ];

  const experienceLevels = [
    { id: 'entry', label: 'Entry (0-2 years)', icon: 'User' },
    { id: 'mid', label: 'Mid (3-5 years)', icon: 'Users' },
    { id: 'senior', label: 'Senior (6+ years)', icon: 'Crown' },
    { id: 'lead', label: 'Lead/Principal', icon: 'Star' }
  ];

  const handleQuickFilter = (filterId) => {
    const newFilters = { ...selectedFilters };
    
    if (newFilters.quick?.includes(filterId)) {
      newFilters.quick = newFilters.quick.filter(id => id !== filterId);
    } else {
      newFilters.quick = [...(newFilters.quick || []), filterId];
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSalaryFilter = (range) => {
    const newFilters = { 
      ...selectedFilters, 
      salary: selectedFilters.salary?.id === range.id ? null : range 
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleExperienceFilter = (level) => {
    const newFilters = { 
      ...selectedFilters, 
      experience: selectedFilters.experience?.id === level.id ? null : level 
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.quick?.length) count += selectedFilters.quick.length;
    if (selectedFilters.salary) count += 1;
    if (selectedFilters.experience) count += 1;
    return count;
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Quick Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Quick Filters</h3>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all ({activeCount})
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => {
              const isActive = selectedFilters.quick?.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => handleQuickFilter(filter.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  <Icon name={filter.icon} size={14} />
                  <span>{filter.label}</span>
                  <span className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    ({filter.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Salary Range Filters */}
        <div className="space-y-3 mt-6">
          <h3 className="text-sm font-semibold text-foreground">Salary Range</h3>
          <div className="flex flex-wrap gap-2">
            {salaryRanges.map((range) => {
              const isActive = selectedFilters.salary?.id === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => handleSalaryFilter(range)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Level Filters */}
        <div className="space-y-3 mt-6">
          <h3 className="text-sm font-semibold text-foreground">Experience Level</h3>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map((level) => {
              const isActive = selectedFilters.experience?.id === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => handleExperienceFilter(level)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive
                      ? 'bg-warning text-warning-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  <Icon name={level.icon} size={14} />
                  <span>{level.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeCount > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-primary" />
                <span className="text-sm text-foreground">
                  {activeCount} filter{activeCount > 1 ? 's' : ''} applied
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Search" size={14} />
                <span>Showing filtered results</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;