import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import SearchHeader from '../../components/ui/SearchHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JobCard from './components/JobCard';
import FilterSidebar from './components/FilterSidebar';
import JobQuickView from './components/JobQuickView';
import SearchFilters from './components/SearchFilters';
import JobListHeader from './components/JobListHeader';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: {
        name: "TechCorp Inc.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
        size: "500+",
        founded: "2015",
        industry: "Technology",
        funding: "Series B",
        description: "TechCorp is a leading technology company focused on innovation and excellence."
      },
      location: "San Francisco, CA",
      salary: { min: 120, max: 160 },
      type: "Full-time",
      isRemote: true,
      experienceLevel: "Senior Level (6+ years)",
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      description: `We are seeking a talented Senior React Developer to join our dynamic team. You will be responsible for building scalable web applications using modern React ecosystem and best practices.`,
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      matchScore: 92
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: {
        name: "StartupXYZ",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
        size: "50-100",
        founded: "2020",
        industry: "FinTech",
        funding: "Series A"
      },
      location: "New York, NY",
      salary: { min: 100, max: 140 },
      type: "Full-time",
      isRemote: false,
      experienceLevel: "Mid Level (3-5 years)",
      skills: ["JavaScript", "Python", "React", "Django", "PostgreSQL"],
      description: `Join our fast-growing fintech startup as a Full Stack Engineer. You'll work on cutting-edge financial products that impact millions of users.`,
      postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      matchScore: 85
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: {
        name: "Design Studio",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
        size: "10-50",
        founded: "2018",
        industry: "Design",
        funding: "Bootstrapped"
      },
      location: "Remote",
      salary: { min: 80, max: 110 },
      type: "Full-time",
      isRemote: true,
      experienceLevel: "Mid Level (3-5 years)",
      skills: ["React", "CSS", "JavaScript", "Figma", "Tailwind"],
      description: `We're looking for a creative Frontend Developer to bring beautiful designs to life with clean, efficient code.`,
      postedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      matchScore: 78
    },
    {
      id: 4,
      title: "React Native Developer",
      company: {
        name: "MobileFirst",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
        size: "200-500",
        founded: "2016",
        industry: "Mobile",
        funding: "Series C"
      },
      location: "Austin, TX",
      salary: { min: 95, max: 130 },
      type: "Full-time",
      isRemote: true,
      experienceLevel: "Senior Level (6+ years)",
      skills: ["React Native", "JavaScript", "iOS", "Android", "Firebase"],
      description: `Build amazing mobile experiences with React Native. Join our team of mobile experts creating the next generation of apps.`,
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      matchScore: 88
    },
    {
      id: 5,
      title: "Junior Web Developer",
      company: {
        name: "WebAgency Pro",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
        size: "20-50",
        founded: "2019",
        industry: "Agency",
        funding: "Bootstrapped"
      },
      location: "Chicago, IL",
      salary: { min: 55, max: 75 },
      type: "Full-time",
      isRemote: false,
      experienceLevel: "Entry Level (0-2 years)",
      skills: ["HTML", "CSS", "JavaScript", "React", "WordPress"],
      description: `Perfect opportunity for a junior developer to grow their skills in a supportive agency environment.`,
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      matchScore: 65
    },
    {
      id: 6,
      title: "Lead Frontend Architect",
      company: {
        name: "Enterprise Solutions",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
        size: "1000+",
        founded: "2010",
        industry: "Enterprise",
        funding: "Public"
      },
      location: "Seattle, WA",
      salary: { min: 150, max: 200 },
      type: "Full-time",
      isRemote: true,
      experienceLevel: "Lead/Principal (8+ years)",
      skills: ["React", "TypeScript", "Microservices", "Kubernetes", "Leadership"],
      description: `Lead our frontend architecture team in building scalable enterprise solutions used by Fortune 500 companies.`,
      postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
      matchScore: 95
    }
  ];

  useEffect(() => {
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, jobs]);

  const applyFiltersAndSort = () => {
    let filtered = [...jobs];

    // Apply filters
    if (filters.quick?.length) {
      filtered = filtered.filter(job => {
        return filters.quick.some(filter => {
          switch (filter) {
            case 'remote':
              return job.isRemote;
            case 'full-time':
              return job.type === 'Full-time';
            case 'senior':
              return job.experienceLevel.includes('Senior') || job.experienceLevel.includes('Lead');
            case 'startup':
              return parseInt(job.company.size.split('-')[0]) < 200;
            case 'high-salary':
              return job.salary.min >= 100;
            case 'visa':
              return Math.random() > 0.7; // Mock visa sponsorship
            default:
              return true;
          }
        });
      });
    }

    if (filters.salary) {
      filtered = filtered.filter(job => {
        if (filters.salary.max) {
          return job.salary.min >= filters.salary.min && job.salary.max <= filters.salary.max;
        } else {
          return job.salary.min >= filters.salary.min;
        }
      });
    }

    if (filters.experience) {
      filtered = filtered.filter(job => {
        return job.experienceLevel.toLowerCase().includes(filters.experience.id);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'salary-high':
          return (b.salary.max || b.salary.min) - (a.salary.max || a.salary.min);
        case 'salary-low':
          return (a.salary.min || a.salary.max) - (b.salary.min || b.salary.max);
        case 'company':
          return a.company.name.localeCompare(b.company.name);
        case 'relevance':
        default:
          return (b.matchScore || 0) - (a.matchScore || 0);
      }
    });

    setFilteredJobs(filtered);
  };

  const handleSaveJob = (jobId, isSaved) => {
    const newSavedJobs = new Set(savedJobs);
    if (isSaved) {
      newSavedJobs.add(jobId);
    } else {
      newSavedJobs.delete(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApplyJob = (job) => {
    console.log('Applying to job:', job.title, 'at', job.company.name);
    // Implement application logic
  };

  const handleQuickView = (job) => {
    setSelectedJob(job);
    setIsQuickViewOpen(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate new jobs
      console.log('Refreshed job listings');
    }, 1000);
  };

  const totalPages = Math.ceil(filteredJobs.length / 20);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * 20, currentPage * 20);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchHeader />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={() => setFilters({})}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Filters */}
            <SearchFilters
              onFilterChange={setFilters}
              activeFilters={filters}
            />

            {/* Job List Header */}
            <JobListHeader
              totalJobs={filteredJobs.length}
              currentPage={currentPage}
              totalPages={totalPages}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onRefresh={handleRefresh}
              isLoading={isLoading}
            />

            {/* Job Listings */}
            <div className="p-6">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more opportunities.
                  </p>
                  <Button onClick={() => setFilters({})}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' ?'grid-cols-1 xl:grid-cols-2' :'grid-cols-1'
                  }`}>
                    {paginatedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onSave={handleSaveJob}
                        onApply={handleApplyJob}
                        onQuickView={handleQuickView}
                        isSaved={savedJobs.has(job.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <Icon name="ChevronLeft" size={16} className="mr-2" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="text-muted-foreground">...</span>
                            <Button
                              variant={currentPage === totalPages ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <Icon name="ChevronRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({})}
      />

      {/* Mobile Filter Button */}
      <Button
        className="fixed bottom-6 right-6 lg:hidden z-40 shadow-elevated"
        onClick={() => setIsFilterSidebarOpen(true)}
      >
        <Icon name="Filter" size={16} className="mr-2" />
        Filters
        {Object.keys(filters).length > 0 && (
          <span className="ml-2 px-2 py-1 bg-primary-foreground text-primary text-xs rounded-full">
            {Object.keys(filters).length}
          </span>
        )}
      </Button>

      {/* Job Quick View Modal */}
      <JobQuickView
        job={selectedJob}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onApply={handleApplyJob}
        onSave={handleSaveJob}
        isSaved={selectedJob ? savedJobs.has(selectedJob.id) : false}
      />

      {/* Job Alert Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={16} />
            <span className="text-sm font-medium">Get notified of new jobs</span>
          </div>
          <Button variant="secondary" size="sm">
            Create Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;