import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
    salary: ''
  });

  const mockSuggestions = [
    { text: 'React Developer', type: 'job', icon: 'Code' },
    { text: 'Frontend Engineer', type: 'job', icon: 'Monitor' },
    { text: 'Full Stack Developer', type: 'job', icon: 'Layers' },
    { text: 'JavaScript Developer', type: 'job', icon: 'Code' },
    { text: 'Node.js Developer', type: 'job', icon: 'Server' },
    { text: 'Python Developer', type: 'job', icon: 'Code' },
    { text: 'DevOps Engineer', type: 'job', icon: 'Settings' },
    { text: 'Data Scientist', type: 'job', icon: 'BarChart3' }
  ];

  const experienceLevels = [
    { value: '', label: 'Any Experience' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6+ years)' },
    { value: 'lead', label: 'Lead/Principal (8+ years)' }
  ];

  const jobTypes = [
    { value: '', label: 'All Job Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const popularSearches = [
    { text: 'Remote', icon: 'Globe', count: '2.3k' },
    { text: 'Senior', icon: 'TrendingUp', count: '1.8k' },
    { text: 'React', icon: 'Code', count: '4.1k' },
    { text: 'Full-time', icon: 'Briefcase', count: '15.2k' },
    { text: 'Startup', icon: 'Zap', count: '3.7k' }
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    console.log('Searching for:', query, 'with filters:', filters);
    setShowSuggestions(false);
    // Implement search logic here
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      experience: '',
      jobType: '',
      salary: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="bg-gradient-to-r from-card via-card to-muted/30 border-b border-border shadow-soft">
      <div className="container-app py-6">
        {/* Enhanced Main Search Bar */}
        <div className="relative">
          <div className="flex items-center space-x-4">
            {/* Enhanced Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  placeholder="Search for jobs, companies, or skills..."
                  className="w-full pl-12 pr-4 py-4 text-base bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
              
              {/* Enhanced Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-elevated z-50 overflow-hidden">
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wide">
                      Popular Searches
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-3 py-3 text-left text-sm text-foreground hover:bg-muted transition-colors rounded-lg flex items-center space-x-3"
                      >
                        <Icon name={suggestion.icon} size={16} className="text-muted-foreground flex-shrink-0" />
                        <span className="flex-1">{suggestion.text}</span>
                        <Icon name="ArrowRight" size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Search Button */}
            <Button 
              onClick={() => handleSearch()}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
            >
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>

            {/* Enhanced Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="relative px-6 py-4 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 rounded-xl"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Advanced Filters Panel */}
        {isAdvancedOpen && (
          <div className="mt-6 p-6 bg-muted/50 rounded-xl border border-border backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Enhanced Location Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Location</label>
                <div className="relative">
                  <Icon 
                    name="MapPin" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="City, state, or remote"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Enhanced Experience Level */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Experience Level</label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full px-3 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced Job Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Job Type</label>
                <select
                  value={filters.jobType}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="w-full px-3 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enhanced Salary Range */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Salary Range</label>
                <div className="relative">
                  <Icon 
                    name="DollarSign" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    value={filters.salary}
                    onChange={(e) => handleFilterChange('salary', e.target.value)}
                    placeholder="e.g., 80k-120k"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  disabled={activeFiltersCount === 0}
                  className="hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors"
                >
                  <Icon name="X" size={14} className="mr-2" />
                  Clear Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  {activeFiltersCount > 0 ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied` : 'No filters applied'}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => handleSearch()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Icon name="Search" size={14} className="mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Popular Searches */}
        <div className="flex items-center space-x-4 mt-6">
          <span className="text-sm font-medium text-muted-foreground">Popular:</span>
          <div className="flex items-center space-x-2">
            {popularSearches.map((search) => (
              <button
                key={search.text}
                onClick={() => {
                  setSearchQuery(search.text);
                  handleSearch(search.text);
                }}
                className="group flex items-center space-x-2 px-4 py-2 text-sm bg-muted/50 text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-transparent hover:border-primary/20"
              >
                <Icon name={search.icon} size={14} />
                <span>{search.text}</span>
                <span className="text-xs opacity-60 group-hover:opacity-100">{search.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchHeader;