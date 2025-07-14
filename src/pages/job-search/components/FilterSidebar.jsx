import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const jobTypes = [
    { id: 'full-time', label: 'Full-time', count: 1247 },
    { id: 'part-time', label: 'Part-time', count: 89 },
    { id: 'contract', label: 'Contract', count: 456 },
    { id: 'freelance', label: 'Freelance', count: 234 },
    { id: 'internship', label: 'Internship', count: 67 }
  ];

  const experienceLevels = [
    { id: 'entry', label: 'Entry Level (0-2 years)', count: 234 },
    { id: 'mid', label: 'Mid Level (3-5 years)', count: 567 },
    { id: 'senior', label: 'Senior Level (6+ years)', count: 789 },
    { id: 'lead', label: 'Lead/Principal (8+ years)', count: 123 }
  ];

  const companySizes = [
    { id: 'startup', label: 'Startup (1-50)', count: 345 },
    { id: 'small', label: 'Small (51-200)', count: 456 },
    { id: 'medium', label: 'Medium (201-1000)', count: 234 },
    { id: 'large', label: 'Large (1000+)', count: 567 }
  ];

  const technologies = [
    { id: 'react', label: 'React', count: 892 },
    { id: 'javascript', label: 'JavaScript', count: 1234 },
    { id: 'typescript', label: 'TypeScript', count: 678 },
    { id: 'nodejs', label: 'Node.js', count: 567 },
    { id: 'python', label: 'Python', count: 789 },
    { id: 'java', label: 'Java', count: 456 },
    { id: 'aws', label: 'AWS', count: 345 },
    { id: 'docker', label: 'Docker', count: 234 }
  ];

  const benefits = [
    { id: 'health', label: 'Health Insurance', count: 1456 },
    { id: 'dental', label: 'Dental Insurance', count: 1234 },
    { id: 'vision', label: 'Vision Insurance', count: 1123 },
    { id: '401k', label: '401(k) Matching', count: 987 },
    { id: 'pto', label: 'Unlimited PTO', count: 567 },
    { id: 'remote', label: 'Remote Work', count: 789 },
    { id: 'equity', label: 'Equity/Stock Options', count: 456 }
  ];

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    if (!newFilters[category]) newFilters[category] = [];
    
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    
    setLocalFilters(newFilters);
  };

  const handleSalaryChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const FilterSection = ({ title, items, category, icon }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name={icon} size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <Checkbox
              label={item.label}
              checked={localFilters[category]?.includes(item.id) || false}
              onChange={(e) => handleFilterChange(category, item.id, e.target.checked)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground ml-2">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
        bg-card border-r lg:border-r-0 lg:border border-border
        transform transition-transform duration-300 ease-out z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Salary Range */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Salary Range</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min (k)"
                  value={localFilters.salary?.min || ''}
                  onChange={(e) => handleSalaryChange('min', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max (k)"
                  value={localFilters.salary?.max || ''}
                  onChange={(e) => handleSalaryChange('max', e.target.value)}
                />
              </div>
            </div>

            {/* Job Type */}
            <FilterSection
              title="Job Type"
              items={jobTypes}
              category="jobType"
              icon="Briefcase"
            />

            {/* Experience Level */}
            <FilterSection
              title="Experience Level"
              items={experienceLevels}
              category="experience"
              icon="TrendingUp"
            />

            {/* Company Size */}
            <FilterSection
              title="Company Size"
              items={companySizes}
              category="companySize"
              icon="Building2"
            />

            {/* Technologies */}
            <FilterSection
              title="Technologies"
              items={technologies}
              category="technologies"
              icon="Code"
            />

            {/* Benefits */}
            <FilterSection
              title="Benefits"
              items={benefits}
              category="benefits"
              icon="Heart"
            />

            {/* Remote Work */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Wifi" size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Work Arrangement</h3>
              </div>
              <div className="space-y-2">
                <Checkbox
                  label="Remote Only"
                  checked={localFilters.remote?.includes('remote-only') || false}
                  onChange={(e) => handleFilterChange('remote', 'remote-only', e.target.checked)}
                />
                <Checkbox
                  label="Hybrid"
                  checked={localFilters.remote?.includes('hybrid') || false}
                  onChange={(e) => handleFilterChange('remote', 'hybrid', e.target.checked)}
                />
                <Checkbox
                  label="On-site"
                  checked={localFilters.remote?.includes('on-site') || false}
                  onChange={(e) => handleFilterChange('remote', 'on-site', e.target.checked)}
                />
              </div>
            </div>

            {/* Visa Sponsorship */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Visa Sponsorship</h3>
              </div>
              <Checkbox
                label="Visa sponsorship available"
                checked={localFilters.visaSponsorship || false}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, visaSponsorship: e.target.checked }))}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={applyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;