"use client"

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from "../components/ui/button"
import { MessageSquare, LogOut, Settings, User as UserIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, GradientAvatar } from '../components/Avatar';
import Footer from '../components/Footer';

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
`;

// Styled components for layout
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  padding: 5rem 0 4rem; // Increased bottom padding to account for footer
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

const navItems = ['Dashboard', 'Clients', 'Billing', 'Time Tracking', 'Payroll', 'Analytics', 'Chat', 'Scheduling'];

export interface RootLayoutProps {
  children: React.ReactNode;
  onAuthClick: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, onAuthClick }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const isSignedIn = !!user;

  const getUserEmail = (user: any): string => {
    if (user && user.attributes && user.attributes.email) {
      return user.attributes.email;
    }
    return 'Not signed in';
  };

  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <Header>
          <Container>
            <HeaderContent>
              <LogoSection>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <AvatarButton variant="ghost" onClick={isSignedIn ? undefined : onAuthClick}>
                      {isSignedIn ? (
                        <GradientAvatar name={user?.username || ''} email={getUserEmail(user)} size={40} />
                      ) : (
                        <Avatar>
                          <UserIcon size={24} />
                        </Avatar>
                      )}
                    </AvatarButton>
                  </PopoverTrigger>
                  {isSignedIn && (
                    <PopoverContent>
                      <ProfileDropdown>
                        <ProfileHeader>
                          <GradientAvatar name={user?.username || ''} email={getUserEmail(user)} size={40} />
                          <ProfileInfo>
                            <ProfileName>{user?.username}</ProfileName>
                            <ProfileEmail>{getUserEmail(user)}</ProfileEmail>
                          </ProfileInfo>
                        </ProfileHeader>
                        <ProfileMenu>
                          <ProfileMenuItem>
                            <ProfileMenuButton 
                              variant="ghost" 
                              onClick={() => navigate(user?.userType === 'client' ? '/client-profile' : '/employee-profile')}
                            >
                              <UserIcon size={16} className="mr-2" />
                              Profile
                            </ProfileMenuButton>
                          </ProfileMenuItem>
                          <ProfileMenuItem>
                            <ProfileMenuButton variant="ghost">
                              <Settings size={16} className="mr-2" />
                              Settings
                            </ProfileMenuButton>
                          </ProfileMenuItem>
                          <ProfileMenuItem>
                            <ProfileMenuButton variant="ghost" className="text-red-400" onClick={signOut}>
                              <LogOut size={16} className="mr-2" />
                              Log Out
                            </ProfileMenuButton>
                          </ProfileMenuItem>
                        </ProfileMenu>
                      </ProfileDropdown>
                    </PopoverContent>
                  )}
                </Popover>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(!isChatOpen)}>
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Nav>
            </HeaderContent>
          </Container>
        </Header>

        <Main>{children}</Main>

        <Footer 
          isSignedIn={isSignedIn}
          onSignIn={onAuthClick}
          onSignUp={onAuthClick}
        />
      </LayoutWrapper>
    </>
  );
};

export default RootLayout;