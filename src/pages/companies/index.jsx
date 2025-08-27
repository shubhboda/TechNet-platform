import React, { useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockCompanies = [
  { id: 1, name: 'TechCorp Inc.', industry: 'Technology', employees: '500+', rating: 4.2 },
  { id: 2, name: 'StartupXYZ', industry: 'FinTech', employees: '50-100', rating: 4.5 },
  { id: 3, name: 'Design Studio', industry: 'Design', employees: '10-50', rating: 4.8 },
  { id: 4, name: 'MobileFirst', industry: 'Mobile', employees: '200-500', rating: 4.1 },
];

const Companies = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('rating');
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = mockCompanies.filter((c) => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q));
    switch (sort) {
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
      default:
        list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [query, sort]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="container-app py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Companies</h1>
            <p className="text-muted-foreground">Explore companies and discover opportunities.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies..."
                className="w-64 pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="rating">Top rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center space-x-1"><Icon name="Briefcase" size={14} /><span>{c.industry}</span></span>
                    <span className="flex items-center space-x-1"><Icon name="Users" size={14} /><span>{c.employees} employees</span></span>
                    <span className="flex items-center space-x-1"><Icon name="Star" size={14} className="text-warning fill-current" /><span>{c.rating}</span></span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toggleFavorite(c.id)} className="hover:bg-primary/10 hover:text-primary">
                  <Icon name={favorites.includes(c.id) ? 'Heart' : 'Heart'} size={18} className={favorites.includes(c.id) ? 'text-primary fill-current' : 'text-muted-foreground'} />
                </Button>
              </div>

              <div className="mt-4 flex items-center space-x-2">
                <Button size="sm"><Icon name="Search" size={14} className="mr-2" />View jobs</Button>
                <Button variant="outline" size="sm"><Icon name="Link" size={14} className="mr-2" />Visit site</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;


