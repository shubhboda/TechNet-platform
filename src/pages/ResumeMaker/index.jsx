import React, { useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Section = ({ title, children, action }) => (
  <div className="bg-card border border-border rounded-xl p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const ResumeMaker = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Senior Frontend Engineer',
    email: 'john.doe@technet.com',
    phone: '+1 555-123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced frontend engineer crafting performant, accessible web apps with React.',
  });

  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Tailwind CSS']);
  const [experience, setExperience] = useState([
    { id: 1, role: 'Senior React Developer', company: 'TechCorp Inc.', period: '2021 — Present', bullets: ['Led migration to React 18', 'Improved Core Web Vitals by 30%'] },
    { id: 2, role: 'Frontend Engineer', company: 'StartupXYZ', period: '2018 — 2021', bullets: ['Built design system', 'Shipped features weekly'] },
  ]);
  const [education, setEducation] = useState([
    { id: 1, school: 'State University', degree: 'B.Sc. Computer Science', period: '2014 — 2018' },
  ]);

  const addSkill = (skill) => {
    if (!skill.trim()) return;
    setSkills((prev) => Array.from(new Set([...prev, skill.trim()])));
  };

  const [newSkill, setNewSkill] = useState('');

  const preview = useMemo(() => ({ profile, skills, experience, education }), [profile, skills, experience, education]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(preview, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  window.__resume_preview = preview; // For quick debugging/export in console

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="container-app py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resume Maker</h1>
            <p className="text-muted-foreground">Fill the form and see a live preview of your resume.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={downloadJson}>
              <Icon name="Download" size={16} className="mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6">
            <Section title="Profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                <Input label="Title" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                <Input label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                <Input label="Location" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">Summary</label>
                <textarea
                  rows={4}
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Section>

            <Section title="Skills" action={(
              <div className="flex items-center space-x-2">
                <Input placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
                <Button onClick={() => { addSkill(newSkill); setNewSkill(''); }}><Icon name="Plus" size={14} /></Button>
              </div>
            )}>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border">
                    {s}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Experience">
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-muted/40 rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                      </div>
                      <Button variant="ghost" size="sm"><Icon name="Edit3" size={14} /></Button>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Education">
              <div className="space-y-3">
                {education.map((ed) => (
                  <div key={ed.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{ed.school}</p>
                      <p className="text-sm text-muted-foreground">{ed.degree} • {ed.period}</p>
                    </div>
                    <Button variant="ghost" size="sm"><Icon name="Edit3" size={14} /></Button>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Preview</h3>
                <Button size="sm"><Icon name="Download" size={14} className="mr-2" />Download PDF</Button>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                  <p className="text-sm text-muted-foreground">{profile.title} • {profile.location}</p>
                  <p className="text-sm text-muted-foreground">{profile.email} • {profile.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{profile.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((s) => (
                      <span key={s} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Experience</h4>
                  <div className="mt-2 space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <p className="text-sm font-medium text-foreground">{exp.role} — {exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.period}</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Education</h4>
                  <div className="mt-2 space-y-2">
                    {education.map((ed) => (
                      <div key={ed.id}>
                        <p className="text-sm font-medium text-foreground">{ed.school}</p>
                        <p className="text-xs text-muted-foreground">{ed.degree} • {ed.period}</p>
                      </div>
                    ))}
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

export default ResumeMaker;


