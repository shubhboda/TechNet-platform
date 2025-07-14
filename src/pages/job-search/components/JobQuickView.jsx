import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobQuickView = ({ job, isOpen, onClose, onApply, onSave, isSaved = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  if (!isOpen || !job) return null;

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'company', label: 'Company', icon: 'Building2' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckCircle' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card rounded-lg shadow-elevated z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src={job.company.logo} 
                alt={`${job.company.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-foreground mb-2">{job.title}</h2>
              <p className="text-base text-muted-foreground mb-3">{job.company.name}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{getTimeAgo(job.postedDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={16} className="text-success" />
                  <span className="font-medium text-foreground">
                    {formatSalary(job.salary.min, job.salary.max)}
                  </span>
                </div>
                {job.isRemote && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    Remote
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
            >
              <Icon 
                name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                size={20} 
                className={isBookmarked ? "text-primary" : "text-muted-foreground"}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>{job.description}</p>
                  <p className="mt-4">
                    We are looking for a talented {job.title} to join our growing team. 
                    You will be responsible for developing and maintaining high-quality web applications 
                    using modern technologies and best practices.
                  </p>
                </div>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Responsibilities</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Develop and maintain scalable web applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Collaborate with cross-functional teams to deliver high-quality products</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Write clean, maintainable, and well-documented code</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Participate in code reviews and technical discussions</span>
                  </li>
                </ul>
              </div>

              {/* Skills & Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Benefits & Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Health, Dental & Vision Insurance',
                    '401(k) with Company Matching',
                    'Unlimited PTO',
                    'Remote Work Options',
                    'Professional Development Budget',
                    'Stock Options'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              {/* Company Overview */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">About {job.company.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {job.company.description || `${job.company.name} is a leading technology company focused on innovation and excellence. We're building the future of technology with a team of passionate professionals.`}
                </p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{job.company.size || '500+'}</div>
                  <div className="text-sm text-muted-foreground">Employees</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{job.company.founded || '2015'}</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{job.company.industry || 'Technology'}</div>
                  <div className="text-sm text-muted-foreground">Industry</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{job.company.funding || 'Series B'}</div>
                  <div className="text-sm text-muted-foreground">Stage</div>
                </div>
              </div>

              {/* Company Culture */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Company Culture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: 'Users', title: 'Collaborative', desc: 'We work together to achieve great things' },
                    { icon: 'Zap', title: 'Innovative', desc: 'Always pushing the boundaries of technology' },
                    { icon: 'Heart', title: 'Inclusive', desc: 'Diverse and welcoming environment' },
                    { icon: 'TrendingUp', title: 'Growth-focused', desc: 'Continuous learning and development' }
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name={value.icon} size={20} className="text-primary mt-1" />
                      <div>
                        <h4 className="font-medium text-foreground">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-6">
              {/* Required Qualifications */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Required Qualifications</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Bachelor's degree in Computer Science or related field</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>3+ years of experience with React and JavaScript</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Strong understanding of modern web development practices</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Experience with version control systems (Git)</span>
                  </li>
                </ul>
              </div>

              {/* Preferred Qualifications */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Preferred Qualifications</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="Plus" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Experience with TypeScript and Node.js</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Plus" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Knowledge of cloud platforms (AWS, Azure, GCP)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Plus" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Experience with testing frameworks (Jest, Cypress)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Plus" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Previous startup or fast-paced environment experience</span>
                  </li>
                </ul>
              </div>

              {/* Application Process */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Application Process</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Application Review', desc: 'We review your application and portfolio' },
                    { step: 2, title: 'Phone Screening', desc: '30-minute call with our recruiting team' },
                    { step: 3, title: 'Technical Interview', desc: 'Technical discussion and coding exercise' },
                    { step: 4, title: 'Team Interview', desc: 'Meet with potential team members' },
                    { step: 5, title: 'Final Decision', desc: 'Reference checks and offer discussion' }
                  ].map((process, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {process.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{process.title}</h4>
                        <p className="text-sm text-muted-foreground">{process.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {Math.floor(Math.random() * 50) + 10} applicants
              </span>
            </div>
            {job.matchScore && (
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">
                  {job.matchScore}% match
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} className="mr-2" />
              {isBookmarked ? 'Saved' : 'Save Job'}
            </Button>
            <Button
              onClick={() => onApply(job)}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobQuickView;