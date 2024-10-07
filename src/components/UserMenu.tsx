import React from 'react';
import { Button } from "../components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { User, Clock, Edit, Settings, LogOut } from 'lucide-react'
import Avatar from './Avatar';

interface UserType {
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

interface UserMenuProps {
  user: UserType;
  handleSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, handleSignOut }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="avatar-button">
          <Avatar name={user.name} size={32} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover">
        <div className="popover-content">
          <div className="user-info">
            <Avatar name={user.name} size={60} />
            <div>
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <div className="popover-buttons">
            <Button variant="ghost" className="popover-button">
              <User className="icon" />
              View Profile
            </Button>
            <Button variant="ghost" className="popover-button">
              <Clock className="icon" />
              View Timesheets
            </Button>
            <Button variant="ghost" className="popover-button">
              <Edit className="icon" />
              Modify Entered Times
            </Button>
            <Button variant="ghost" className="popover-button">
              <Settings className="icon" />
              User Settings
            </Button>
            <Button variant="ghost" className="popover-button logout" onClick={handleSignOut}> 
              <LogOut className="icon" />
              Log Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;