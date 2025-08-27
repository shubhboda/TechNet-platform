import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const Profile = () => {
  const [editingAbout, setEditingAbout] = useState(false);
  const [about, setAbout] = useState('Passionate frontend engineer with a focus on delightful UX and performance.');

  const [experience, setExperience] = useState([
    { id: 1, role: 'Senior React Developer', company: 'TechCorp Inc.', period: '2021 — Present' },
    { id: 2, role: 'Frontend Engineer', company: 'StartupXYZ', period: '2018 — 2021' },
  ]);

  const [skills, setSkills] = useState(['React', 'TypeScript', 'Tailwind', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills((prev) => Array.from(new Set([...prev, newSkill.trim()])));
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="container-app py-6">
        {/* Header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="User" size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                <p className="text-muted-foreground">Senior Frontend Engineer</p>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center space-x-1"><Icon name="MapPin" size={12} /><span>Remote</span></span>
                  <span className="flex items-center space-x-1"><Icon name="Briefcase" size={12} /><span>Open to work</span></span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm"><Icon name="Share2" size={14} className="mr-2" />Share</Button>
              <Button size="sm"><Icon name="Edit3" size={14} className="mr-2" />Edit Profile</Button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">About</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditingAbout(!editingAbout)}>
                  <Icon name={editingAbout ? 'X' : 'Edit3'} size={14} className="mr-2" />
                  {editingAbout ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              {editingAbout ? (
                <div className="space-y-3">
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <Button size="sm" onClick={() => setEditingAbout(false)}>
                      <Icon name="Save" size={14} className="mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingAbout(false)}>Discard</Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">{about}</p>
              )}
            </div>

            {/* Experience */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">Experience</h2>
                <Button variant="ghost" size="sm"><Icon name="Plus" size={14} className="mr-2" />Add</Button>
              </div>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{exp.role}</p>
                      <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="xs"><Icon name="Edit3" size={12} className="mr-1" />Edit</Button>
                      <Button variant="ghost" size="xs"><Icon name="Trash2" size={12} className="mr-1" />Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Skills</h2>
              <div className="flex items-center space-x-2 mb-3">
                <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill" />
                <Button size="sm" onClick={addSkill}><Icon name="Plus" size={14} /></Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border">
                    {skill}
                    <button className="ml-2 text-muted-foreground hover:text-destructive" onClick={() => removeSkill(skill)}>
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2"><Icon name="Mail" size={14} /><span>john.doe@technet.com</span></div>
                <div className="flex items-center space-x-2"><Icon name="Globe" size={14} /><span>johndoe.dev</span></div>
                <div className="flex items-center space-x-2"><Icon name="MapPin" size={14} /><span>San Francisco, CA</span></div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Button variant="outline" size="sm"><Icon name="Download" size={14} className="mr-2" />Download CV</Button>
                <Button size="sm"><Icon name="Send" size={14} className="mr-2" />Message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


