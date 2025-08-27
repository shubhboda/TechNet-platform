import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const Row = ({ label, children, description }) => (
  <div className="py-4 border-b border-border">
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-48">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'system',
    emailNotifications: true,
    jobAlerts: true,
    weeklySummary: false,
    fullName: 'John Doe',
    email: 'john.doe@technet.com',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('technet_settings');
      if (saved) setSettings(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('technet_settings', JSON.stringify(settings));
  }, [settings]);

  const applyTheme = (mode) => {
    if (mode === 'dark') document.documentElement.classList.add('dark');
    else if (mode === 'light') document.documentElement.classList.remove('dark');
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  };

  useEffect(() => { applyTheme(settings.theme); }, [settings.theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="container-app py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and notifications.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
            <div className="mt-2">
              <Row label="Theme" description="Choose how the interface looks">
                <div className="flex items-center gap-2">
                  {['system','light','dark'].map((mode) => (
                    <Button
                      key={mode}
                      variant={settings.theme === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSettings({ ...settings, theme: mode })}
                    >
                      {mode[0].toUpperCase()+mode.slice(1)}
                    </Button>
                  ))}
                </div>
              </Row>

              <Row label="Email notifications" description="Receive updates by email">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.emailNotifications} onChange={(e)=>setSettings({ ...settings, emailNotifications: e.target.checked })} />
                  Enable
                </label>
              </Row>

              <Row label="Job alerts" description="Alerts for new matching jobs">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.jobAlerts} onChange={(e)=>setSettings({ ...settings, jobAlerts: e.target.checked })} />
                  Enable
                </label>
              </Row>

              <Row label="Weekly summary" description="Weekly email with stats and tips">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={settings.weeklySummary} onChange={(e)=>setSettings({ ...settings, weeklySummary: e.target.checked })} />
                  Enable
                </label>
              </Row>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground">Account</h2>
            <div className="mt-4 space-y-3">
              <Input label="Full name" value={settings.fullName} onChange={(e)=>setSettings({ ...settings, fullName: e.target.value })} />
              <Input label="Email" value={settings.email} onChange={(e)=>setSettings({ ...settings, email: e.target.value })} />
              <div className="flex items-center gap-2">
                <Button><Icon name="Save" size={14} className="mr-2" />Save changes</Button>
                <Button variant="outline"><Icon name="Key" size={14} className="mr-2" />Change password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;


