import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockPeople = [
  { id: 1, name: 'Sarah Johnson', title: 'Senior Frontend Engineer', location: 'Remote', mutual: 12 },
  { id: 2, name: 'John Smith', title: 'Full Stack Developer', location: 'New York, USA', mutual: 5 },
  { id: 3, name: 'Priya Patel', title: 'UI/UX Designer', location: 'Bengaluru, India', mutual: 8 },
  { id: 4, name: 'David Lee', title: 'DevOps Engineer', location: 'Toronto, Canada', mutual: 3 },
];

const Network = () => {
  const [connections, setConnections] = useState([]);
  const [requests, setRequests] = useState([]);

  const sendRequest = (person) => {
    if (!requests.includes(person.id)) {
      setRequests([...requests, person.id]);
    }
  };

  const cancelRequest = (person) => {
    setRequests(requests.filter((id) => id !== person.id));
  };

  const connectNow = (person) => {
    if (!connections.includes(person.id)) {
      setConnections([...connections, person.id]);
      setRequests(requests.filter((id) => id !== person.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <div className="container-app py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Your Network</h1>
          <p className="text-muted-foreground">Discover professionals and expand your connections.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockPeople.map((person) => {
            const isRequested = requests.includes(person.id);
            const isConnected = connections.includes(person.id);
            return (
              <div key={person.id} className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name="User" size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.title}</p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center space-x-1"><Icon name="MapPin" size={12} /><span>{person.location}</span></span>
                        <span className="flex items-center space-x-1"><Icon name="Users" size={12} /><span>{person.mutual} mutual</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isConnected && !isRequested && (
                      <Button size="sm" onClick={() => sendRequest(person)}>
                        <Icon name="UserPlus" size={14} className="mr-2" />
                        Connect
                      </Button>
                    )}
                    {isRequested && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => cancelRequest(person)}>
                          <Icon name="X" size={14} className="mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => connectNow(person)}>
                          <Icon name="Check" size={14} className="mr-2" />
                          Accept
                        </Button>
                      </>
                    )}
                    {isConnected && (
                      <Button variant="secondary" size="sm">
                        <Icon name="MessageSquare" size={14} className="mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Network;


