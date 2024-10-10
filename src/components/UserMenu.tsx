import React from 'react';
import styled from 'styled-components';
import { User, Clock, Edit, Settings, LogOut } from 'lucide-react';
import { Button } from "./ui/elements/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/elements/popover";

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

const UserOrg = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
`;

const UserSubscription = styled.p`
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

interface UserMenuProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    organizationName: string;
    organizationRole: string;
    subscriptionTier?: string;
  };
  handleSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, handleSignOut }) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar size={40}>{initials}</Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gray-800 border-gray-700">
        <div className="p-4">
          <UserInfo>
            <Avatar size={60}>{initials}</Avatar>
            <div>
              <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <UserOrg>{user.organizationName} - {user.organizationRole}</UserOrg>
              {user.subscriptionTier && <UserSubscription>Tier: {user.subscriptionTier}</UserSubscription>}
            </div>
          </UserInfo>
          <MenuButton variant="ghost">
            <User className="mr-2 h-4 w-4" />
            View Profile
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;