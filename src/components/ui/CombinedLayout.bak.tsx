import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from "./button";
import { MessageSquare, Home, Calendar, Clipboard, User, Clock, Edit, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6200ea;
    --primary-dark: #3700b3;
    --background: #f5f5f5;
    --background-light: #ffffff;
    --text: #333333;
    --text-muted: #666666;
    --border: #e0e0e0;
    --accent: #bb86fc;
    --header-bg: #1a1a1a;
    --siteaware-text: #e0e0e0;
    --background-dark: #121212;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    color: var(--text);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow: hidden; // Prevent scrolling on the body
  }
`;

const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const HeaderWrapper = styled.header`
  background-color: var(--header-bg);
  padding: 1rem;
  z-index: 10;
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

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: var(--background-dark);
  overflow-y: auto;
`;

const MainContentWrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

const FooterContainer = styled.footer`
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 1rem 0;
  font-size: 0.9rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FooterLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthButton = styled.button`
  background: none;
  border: none;
  color: #bb86fc;
  cursor: pointer;
  font-weight: bold;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.span`
  font-weight: bold;
`;

const SidebarContainer = styled.nav`
  width: 250px;
  background-color: var(--background-dark);
  color: var(--text);
  padding: 2rem 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background-light);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const Avatar = styled.div<{ size?: number }>`
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${props => (props.size || 40) / 2.5}px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const UserName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
`;

const MenuButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  color: var(--text);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.logout {
    color: var(--danger);
    &:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }
  }
`;

const FooterWrapper = styled.footer`
  background-color: var(--footer-bg);
  padding: 1rem;
  z-index: 10;
`;

// Header Component
const Header: React.FC<{ isSignedIn: boolean; onAuthClick: () => void; onChatClick: () => void }> = ({ isSignedIn, onAuthClick, onChatClick }) => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoSection>
          <SiteTitle to={isSignedIn ? "/dashboard" : "/"}>
            SiteAware
          </SiteTitle>
          <PoweredBy>
            powered by <DydactLink href="https://dydact.io" target="_blank" rel="noopener noreferrer">dydact LLMs</DydactLink>
          </PoweredBy>
        </LogoSection>
        <Nav>
          <UserMenu isSignedIn={isSignedIn} onAuthClick={onAuthClick} />
          <Button variant="ghost" size="icon" onClick={onChatClick}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};

// Sidebar Component
const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>TaskMaster</Logo>
      <NavList>
        <NavItem>
          <NavLink to="/">
            <Home size={18} />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/scheduling">
            <Calendar size={18} />
            Scheduling
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/chat">
            <MessageSquare size={18} />
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/task-assignment">
            <Clipboard size={18} />
            Task Assignment
          </NavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

// Footer Component
const Footer: React.FC<{ isSignedIn: boolean; onSignIn: () => void; onSignUp: () => void }> = ({ isSignedIn, onSignIn, onSignUp }) => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          {!isSignedIn && (
            <>
              Welcome to SiteAware! 
              <AuthButton onClick={onSignIn}>Sign In</AuthButton>
              or
              <AuthButton onClick={onSignUp}>Sign Up</AuthButton>
            </>
          )}
        </FooterSection>
        <FooterSection>
          <Copyright>&copy; 2023-2024 SiteAware</Copyright>
          <PoweredBy>
            Powered by <DydactLink href="https://dydact.io" target="_blank" rel="noopener noreferrer">dydact LLMs</DydactLink>
          </PoweredBy>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/legal">Legal</FooterLink>
          <FooterLink to="/privacy">Privacy</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

// UserMenu Component
const UserMenu: React.FC<{ isSignedIn: boolean; onAuthClick: () => void }> = ({ isSignedIn, onAuthClick }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const getUserEmail = (user: any): string => {
    return user?.attributes?.email || 'Not signed in';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar size={40} onClick={isSignedIn ? undefined : onAuthClick}>
          {isSignedIn ? user?.username?.charAt(0).toUpperCase() : <User size={24} />}
        </Avatar>
      </PopoverTrigger>
      {isSignedIn && (
        <PopoverContent>
          <UserInfo>
            <Avatar size={60}>{user?.username?.charAt(0).toUpperCase()}</Avatar>
            <div>
              <UserName>{user?.username}</UserName>
              <UserEmail>{getUserEmail(user)}</UserEmail>
            </div>
          </UserInfo>
          <MenuButton variant="ghost" onClick={() => navigate(user?.userType === 'client' ? '/client-profile' : '/employee-profile')}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </MenuButton>
          <MenuButton variant="ghost">
            <Clock className="mr-2 h-4 w-4" />
            View Timesheets
          </MenuButton>
          <MenuButton variant="ghost">
            <Edit className="mr-2 h-4 w-4" />
            Modify Entered Times
          </MenuButton>
          <MenuButton variant="ghost">
            <Settings className="mr-2 h-4 w-4" />
            User Settings
          </MenuButton>
          <MenuButton variant="ghost" className="logout" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </MenuButton>
        </PopoverContent>
      )}
    </Popover>
  );
};

// Main AppFrame Component
interface AppFrameProps {
  children: React.ReactNode;
}

const AppFrame: React.FC<AppFrameProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isSignedIn = !!user;

  const handleAuthClick = () => {
    navigate('/signin');
  };

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <GlobalStyle />
      <FrameContainer>
        <HeaderWrapper>
          <Header
            isSignedIn={isSignedIn}
            onAuthClick={handleAuthClick}
            onChatClick={handleChatClick}
          />
        </HeaderWrapper>
        <ContentWrapper>
          {isSignedIn && (
            <SidebarWrapper>
              <Sidebar />
            </SidebarWrapper>
          )}
          <MainContentWrapper>
            {children}
          </MainContentWrapper>
        </ContentWrapper>
        <FooterWrapper>
          <Footer
            isSignedIn={isSignedIn}
            onSignIn={() => navigate('/signin')}
            onSignUp={() => navigate('/signup')}
          />
        </FooterWrapper>
      </FrameContainer>
    </>
  );
};

export default AppFrame;