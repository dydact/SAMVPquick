// src/app/layout.tsx
"use client"

import React, { useState } from 'react';
import { Button } from "../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft, MessageSquare } from 'lucide-react'
import '../styles/layout.css';
import Chat from '../components/Chat';
import UserMenu from '../components/UserMenu';

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
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(!isChatOpen)} className="chat-button">
              <MessageSquare className="icon" />
            </Button>
            {isSignedIn ? ( 
              <UserMenu user={user} handleSignOut={handleSignOut} />
            ) : (
              <Button onClick={() => setShowAuthPopup(true)} className="sign-in-button">Sign In</Button> 
            )}
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

      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Layout;