import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const ClientsContainer = styled.div`
  padding: 2rem;
`;

const Clients: React.FC = () => {
  const { user } = useAuth();

  return (
    <ClientsContainer>
      <h1>Clients</h1>
      {user && (
        <p>Welcome, {user.firstName} {user.lastName}</p>
      )}
      <p>Manage your client information and interactions here.</p>
      {user?.organizationRole === 'ADMIN' && (
        <p>As an admin, you have full access to all client information.</p>
      )}
      {/* Add client list, search, and management features here */}
    </ClientsContainer>
  );
};

export default Clients;