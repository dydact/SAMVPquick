import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User as UserIcon, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/elements/button';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--background-light);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: var(--text);
  text-decoration: none;
  &:hover {
    background-color: var(--background);
  }
`;

const UserAvatarDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, isSignedIn } = useAuth();

  return (
    <DropdownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button variant="ghost" size="icon" onClick={() => setShowAuthModal(true)}>
        <UserIcon size={20} />
      </Button>
      <DropdownMenu isOpen={isOpen}>
        {isSignedIn ? (
          <>
            <DropdownItem to="/profile">
              <UserIcon size={16} style={{ marginRight: '0.5rem' }} />
              Profile
            </DropdownItem>
            <DropdownItem to="/settings">
              <Settings size={16} style={{ marginRight: '0.5rem' }} />
              Settings
            </DropdownItem>
            <DropdownItem as="button" onClick={signOut}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Sign Out
            </DropdownItem>
          </>
        ) : (
          <DropdownItem to="/signin">
            <UserIcon size={16} style={{ marginRight: '0.5rem' }} />
            Sign In
          </DropdownItem>
        )}
      </DropdownMenu>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </DropdownContainer>
  );
};

export default UserAvatarDropdown;