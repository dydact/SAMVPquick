import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { Button } from "./button";
import { MessageSquare } from 'lucide-react';
import UserMenu from './UserMenu';

const HeaderWrapper = styled.header`
  background-color: var(--header-bg);
  padding: 1rem;
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

interface HeaderProps {
  isSignedIn: boolean;
  onAuthClick: () => void;
  onChatClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, onAuthClick, onChatClick }) => {
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

export default Header;