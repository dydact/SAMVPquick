import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const PersonnelTabContainer = styled.div`
  padding: 1rem;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 0.5rem;
`;

const PersonnelTab: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.organizationRole === 'ADMIN';

  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const users = [
    { id: '1', name: 'John Doe', role: 'Employee' },
    { id: '2', name: 'Jane Smith', role: 'Manager' },
    { id: '3', name: 'Bob Johnson', role: 'Employee' },
  ];

  return (
    <PersonnelTabContainer>
      <h2>Personnel</h2>
      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            {isAdmin ? (
              <Link to={`/profile/${user.id}`}>{user.name} - {user.role}</Link>
            ) : (
              <span>{user.name} - {user.role}</span>
            )}
          </UserItem>
        ))}
      </UserList>
    </PersonnelTabContainer>
  );
};

export default PersonnelTab;