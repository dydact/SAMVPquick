import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from "./button";
import { MessageSquare, Home, Calendar, Clipboard, User, Clock, Edit, Settings, LogOut, ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Header from './Header';
import Navigation from './Navigation';

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
    --danger: #dc3545;
    --success: #28a745;
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
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: var(--header-bg);
  padding-top: 2rem;
`;

const MainContentWrapper = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Footer styles
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

const PoweredBy = styled.span`
  font-size: 0.8rem;
  color: #bbbbbb;
  margin-left: 0.5rem;
`;

const DydactLink = styled.a`
  color: #bb86fc;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

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
        <Header
          isSignedIn={isSignedIn}
          onAuthClick={handleAuthClick}
          onChatClick={handleChatClick}
        />
        <ContentWrapper>
          <SidebarWrapper>
            <Navigation isSignedIn={isSignedIn} />
          </SidebarWrapper>
          <MainContentWrapper>
            {children}
          </MainContentWrapper>
        </ContentWrapper>
        <FooterContainer>
          <FooterContent>
            <FooterSection>
              {!isSignedIn && (
                <>
                  Welcome to SiteAware! 
                  <AuthButton onClick={handleAuthClick}>Sign In</AuthButton>
                  or
                  <AuthButton onClick={handleAuthClick}>Sign Up</AuthButton>
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
      </FrameContainer>
    </>
  );
};

export default AppFrame;