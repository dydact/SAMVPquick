import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Home, Calendar, MessageSquare, Clipboard } from 'lucide-react';

const SidebarContainer = styled.nav`
  width: 250px; // Adjust as needed
  background-color: #f0f0f0;
  padding-top: 60px; // Match the Header height
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
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

export default Sidebar;