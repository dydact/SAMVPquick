"use client"

import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Button } from "../components/ui/elements/button"
import { MessageSquare, LogOut, Settings, User as UserIcon, ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/elements/popover"
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar, GradientAvatar } from '../components/ui/UserIcon/Avatar';
import Footer from '../components/ui/elements/Footer';
import AuthModal from '../components/auth/AuthModal';
import UserMenu from '../components/UserMenu';

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6200ea; // Deeper purple
    --primary-dark: #3700b3;
    --background: #f5f5f5; // Light gray background
    --background-light: #ffffff;
    --text: #333333;
    --text-muted: #666666;
    --border: #e0e0e0;
    --accent: #bb86fc; // Light purple accent
    --header-bg: #1a1a1a; // Dark steel color for header
    --siteaware-text: #e0e0e0; // Bright gray for SiteAware text
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    color: var(--text);
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .chat-card {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 300px;
    height: 400px;
    background-color: var(--background-light);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .chat-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border);
  }

  .chat-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .chat-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      color: var(--text);
    }
  }

  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .chat-input {
    border: none;
    border-top: 1px solid var(--border);
    background-color: var(--background);
    color: var(--text);
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    &::placeholder {
      color: var(--text-muted);
    }
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      align-items: flex-start;
    }

    nav {
      margin-top: 1rem;
      flex-wrap: wrap;
    }
  }
`;

// Styled components for layout
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Header = styled.header`
  background-color: var(--header-bg);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SiteTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--siteaware-text);
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
  margin: 0;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
`;

const PoweredBy = styled.span`
  font-size: 0.6rem;
  font-weight: bold;
  color: var(--text-muted);
  margin-top: 0.1rem;
`;

const DydactLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(RouterNavLink)`
  color: var(--background-light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  &:hover, &.active {
    color: var(--accent);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Main = styled.main`
  flex-grow: 1;
  padding: 2rem;
  margin-left: 250px; // This should match the sidebar width
  overflow-y: auto;
`;

const AvatarButton = styled(Button)`
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
`;

const ProfileDropdown = styled.div`
  background-color: var(--background-light);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 200px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const ProfileInfo = styled.div`
  margin-left: 1rem;
`;

const ProfileName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const ProfileEmail = styled.p`
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
`;

const ProfileMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProfileMenuItem = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileMenuButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Tabs = styled.div`
  margin-bottom: 2rem;
`;

const TabsList = styled.div`
  background-color: var(--background-light);
  border-radius: 0.5rem;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.active && css`
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text);
  `}
`;

const Sidebar = styled.div`
  background-color: var(--background-light);
  width: 250px; // This will be adjusted dynamically
  padding: 1rem 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: fixed;
  top: 64px; // Adjust this value to match your header height
  left: 0;
  bottom: 0;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50px;
    background: linear-gradient(to left, var(--background), transparent);
    pointer-events: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border);

  &:hover, &.active {
    background-color: var(--accent);
    color: var(--background-light);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const navItems = ['Dashboard', 'Clients', 'Billing', 'Time Tracking', 'Payroll', 'Analytics', 'Chat', 'Scheduling'];

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { isSignedIn, user, signIn, signUp, signOut } = useAuth();

  const handleAuthClick = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleAuth = async (username: string, password: string, isSignUp: boolean) => {
    try {
      if (isSignUp) {
        await signUp(username, password);
      } else {
        await signIn(username, password);
      }
      setShowAuthModal(false);
    } catch (error) {
      console.error(`Error ${isSignUp ? 'signing up' : 'signing in'}:`, error);
    }
  };

  const siteAwareComponents = [
    'Video Analysis',
    'Activity Recognition',
    'Anomaly Detection',
    'Patient Monitoring',
    'Treatment Plans',
    'Data Analytics',
    'Alerts & Notifications',
    'Privacy & Security'
  ];

  const logoRef = React.useRef<HTMLDivElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const adjustSidebarWidth = () => {
      if (logoRef.current && sidebarRef.current) {
        const logoWidth = logoRef.current.offsetWidth;
        sidebarRef.current.style.width = `${logoWidth}px`;
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.style.marginLeft = `${logoWidth}px`;
        }
      }
    };

    adjustSidebarWidth();
    window.addEventListener('resize', adjustSidebarWidth);

    return () => {
      window.removeEventListener('resize', adjustSidebarWidth);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <Header>
          <Container>
            <HeaderContent>
              <LogoSection ref={logoRef}>
                <SiteTitle to={isSignedIn ? "/dashboard" : "/signup"}>
                  SiteAware
                </SiteTitle>
                <PoweredBy>
                  powered by <DydactLink href="https://dydact.io" target="_blank" rel="noopener noreferrer">dydact LLMs</DydactLink>
                </PoweredBy>
              </LogoSection>
              <Nav>
                {navItems.map((item) => (
                  <NavLink key={item} to={`/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                  </NavLink>
                ))}
                <AvatarButton variant="ghost" onClick={isSignedIn ? undefined : handleAuthClick}>
                  {isSignedIn && user ? (
                    <UserMenu user={user} handleSignOut={signOut} />
                  ) : (
                    <Avatar>
                      <UserIcon size={24} />
                    </Avatar>
                  )}
                </AvatarButton>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Nav>
            </HeaderContent>
          </Container>
        </Header>

        <ContentWrapper>
          <Sidebar ref={sidebarRef}>
            <SidebarContent>
              {siteAwareComponents.map((component) => (
                <SidebarItem key={component} to={`/${component.toLowerCase().replace(' ', '-')}`}>
                  {component}
                </SidebarItem>
              ))}
            </SidebarContent>
          </Sidebar>

          <Main>
            <Container>
              {children}
            </Container>
          </Main>
        </ContentWrapper>

        <Footer 
          isSignedIn={isSignedIn}
          onSignIn={handleAuthClick}
          onSignUp={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
        />
      </LayoutWrapper>
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
          onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        />
      )}

      {/* Add Chat Card */}
      <div className="chat-card">
        <div className="chat-content">
          <div className="chat-header">
            <h3 className="chat-title">Chat</h3>
            <button className="chat-close">&times;</button>
          </div>
          <div className="chat-messages">
            {/* Chat messages will go here */}
          </div>
          <input type="text" className="chat-input" placeholder="Type a message..." />
        </div>
      </div>
    </>
  );
};

export default RootLayout;