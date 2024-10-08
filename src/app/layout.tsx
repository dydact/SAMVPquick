"use client"

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from "../components/ui/button"
import { MessageSquare, LogOut, User, Settings } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { AuthUser } from 'aws-amplify/auth';
import Chat from '../components/Chat';
import SignInModal from '../components/SignInModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  background-color: var(--primary);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(45deg, #6d28d9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-decoration: none;
`;

const PoweredBy = styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  margin-top: 0.2rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled.a`
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
  padding: 5rem 0 2rem; // Increased top padding to account for fixed header
`;

const Avatar = styled.div<{ size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-dark);
  color: white;
  font-weight: bold;
  border-radius: 50%;
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  font-size: ${({ size }) => (size || 40) / 2}px;
`;

const AvatarButton = styled(Button)`
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
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
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, onSignInClick, onSignUpClick }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, signOut } = useAuth();

  const isSignedIn = !!user;

  const initials = user ? user.username.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  const getUserEmail = (user: AuthUser | null): string => {
    if (user && typeof user === 'object' && 'attributes' in user && typeof user.attributes === 'object' && user.attributes !== null && 'email' in user.attributes) {
      return user.attributes.email as string;
    }
    return 'Not signed in';
  };

  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <LayoutWrapper>
          <Header>
            <Container>
              <HeaderContent>
                <LogoSection>
                  <SiteTitle to={isSignedIn ? "/dashboard" : "/signup"}>
                    SiteAware
                  </SiteTitle>
                  <PoweredBy>powered by dydact</PoweredBy>
                </LogoSection>
                <Nav>
                  {navItems.map((item) => (
                    <NavLink key={item} href={`/${item.toLowerCase().replace(' ', '-')}`}>
                      {item}
                    </NavLink>
                  ))}
                  {isSignedIn ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <AvatarButton variant="ghost">
                          <Avatar size={32}>{initials}</Avatar>
                        </AvatarButton>
                      </PopoverTrigger>
                      <PopoverContent>
                        <ProfileDropdown>
                          <ProfileHeader>
                            <Avatar size={40}>{initials}</Avatar>
                            <ProfileInfo>
                              <ProfileName>{user ? user.username : 'Guest'}</ProfileName>
                              <ProfileEmail>{getUserEmail(user)}</ProfileEmail>
                            </ProfileInfo>
                          </ProfileHeader>
                          <ProfileMenu>
                            <ProfileMenuItem>
                              <ProfileMenuButton variant="ghost">
                                <User size={16} className="mr-2" />
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
                    </Popover>
                  ) : (
                    <>
                      <Button onClick={onSignInClick}>Sign In</Button>
                      <Button onClick={onSignUpClick} variant="outline">Sign Up</Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(!isChatOpen)}>
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Nav>
              </HeaderContent>
            </Container>
          </Header>

          <Main>{children}</Main>

          <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;