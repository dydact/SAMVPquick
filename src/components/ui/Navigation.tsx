import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0.5rem 0;
`;

const NavLink = styled(Link)`
  color: var(--siteaware-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;
  padding: 0.5rem 1rem;

  &:hover {
    color: var(--accent);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface NavigationProps {
  isSignedIn: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isSignedIn }) => {
  return (
    <NavList>
      <NavItem>
        <NavLink to="/">Home</NavLink>
      </NavItem>
      {isSignedIn ? (
        <>
          <NavItem>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/analytics">Analytics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/scheduling">Scheduling</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/chat">Chat</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/task-assignment">Task Assignment</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/todos">Todo List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/client-profile">Client Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/employee-profile">Employee Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/clients">Clients</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/billing">Billing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/time-tracking">Time Tracking</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/payroll">Payroll</NavLink>
          </NavItem>
        </>
      ) : (
        <NavItem>
          <NavLink to="/signup">Sign Up</NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink to="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/legal">Legal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/privacy">Privacy</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/contact">Contact</NavLink>
      </NavItem>
    </NavList>
  );
};

export default Navigation;