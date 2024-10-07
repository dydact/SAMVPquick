// src/app/layout.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { ArrowLeft, MessageSquare, LogOut, User, Settings, Clock, Edit, X } from 'lucide-react'
import '../styles/layout.css';

const navItems = ['Dashboard', 'Clients', 'Billing', 'Time Tracking', 'Payroll', 'Analytics', 'Chat', 'Scheduling'];

interface UserType {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  isSignedIn: boolean; 
  handleSignOut: () => void;
  setShowAuthPopup: (show: boolean) => void; 
}

const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 40 }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
      {initials}
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false, isSignedIn, handleSignOut, setShowAuthPopup }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Dummy user data
  const user: UserType = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "2022-01-15"
  };

  return (
    <div className="layout">
      <header>
        <div className="container header-content">
          <div className="logo-section">
            {showBackButton && (
              <a href="/dashboard" className="back-button">
                <ArrowLeft className="icon" />
              </a>
            )}
            <h1 className="site-title">SiteAware</h1>
          </div>
          <nav>
            {isSignedIn && navItems.map((item) => ( 
              <a key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="nav-link">
                {item}
              </a>
            ))}
            {isSignedIn ? ( 
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="avatar-button">
                    <Avatar name={user.name} size={32} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="popover">
                  <div className="popover-content">
                    <div className="user-info">
                      <Avatar name={user.name} size={60} />
                      <div>
                        <h3 className="user-name">{user.name}</h3>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="popover-buttons">
                      <Button variant="ghost" className="popover-button">
                        <User className="icon" />
                        View Profile
                      </Button>
                      <Button variant="ghost" className="popover-button">
                        <Clock className="icon" />
                        View Timesheets
                      </Button>
                      <Button variant="ghost" className="popover-button">
                        <Edit className="icon" />
                        Modify Entered Times
                      </Button>
                      <Button variant="ghost" className="popover-button">
                        <Settings className="icon" />
                        User Settings
                      </Button>
                      <Button variant="ghost" className="popover-button logout" onClick={handleSignOut}> 
                        <LogOut className="icon" />
                        Log Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button onClick={() => setShowAuthPopup(true)} className="sign-in-button">Sign In</Button> 
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(!isChatOpen)} className="chat-button">
              <MessageSquare className="icon" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container">
        {isSignedIn && ( 
          <Tabs defaultValue="dashboard" className="tabs">
            <TabsList className="tabs-list">
              {navItems.map((item) => (
                <TabsTrigger 
                  key={item} 
                  value={item.toLowerCase()} 
                  className="tab"
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {children}
      </main>

      {isChatOpen && (
        <Card className="chat-card">
          <CardContent className="chat-content">
            <div className="chat-header">
              <h3 className="chat-title">Worker Chat</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="chat-close">
                <X className="icon" />
              </Button>
            </div>
            <div className="chat-messages">
              {/* Chat messages would go here */}
            </div>
            <Input
              type="text"
              placeholder="Type a message..."
              className="chat-input"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Layout;