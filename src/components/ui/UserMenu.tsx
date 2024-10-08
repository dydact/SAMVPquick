import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Avatar, GradientAvatar } from '../Avatar';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';

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

interface UserMenuProps {
  isSignedIn: boolean;
  onAuthClick: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isSignedIn, onAuthClick }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const getUserEmail = (user: any): string => {
    return user?.attributes?.email || 'Not signed in';
  };

  return (
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
  );
};

export default UserMenu;