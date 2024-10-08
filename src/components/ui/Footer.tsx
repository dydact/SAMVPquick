import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #2a2a2a; // Darker background
  color: #ffffff; // White text
  padding: 1rem 0;
  font-size: 0.9rem;
  margin-top: auto; // This will push the footer to the bottom
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
  color: #ffffff; // White text for links
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthButton = styled.button`
  background: none;
  border: none;
  color: #bb86fc; // Light purple for buttons
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
  color: #bbbbbb; // Light gray for powered by text
  margin-left: 0.5rem;
`;

const DydactLink = styled.a`
  color: #bb86fc; // Light purple for Dydact link
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

export default Footer;