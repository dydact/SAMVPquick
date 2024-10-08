import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: var(--background-light);
  color: var(--text-muted);
  padding: 0.5rem 0;
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
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
  color: var(--text-muted);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
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
  margin-left: 0.25rem; // Reduced margin
  font-size: 0.7rem; // Reduced font size
`;

const DydactLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

interface FooterProps {
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
}

const Footer: React.FC<FooterProps> = ({ isSignedIn, onSignIn, onSignUp }) => {
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
          <Copyright>© 2023-2024 SiteAware</Copyright>
          <PoweredBy>
            powered by <DydactLink href="https://dydact.io" target="_blank" rel="noopener noreferrer">dydact LLMs</DydactLink>
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

export default Footer;