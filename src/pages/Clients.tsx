import React from 'react';
import styled from 'styled-components';

const ClientsContainer = styled.div`
  padding: 2rem;
`;

const Clients: React.FC = () => {
  return (
    <ClientsContainer>
      <h1>Clients</h1>
      <p>Manage your client information and interactions here.</p>
      {/* Add client list, search, and management features here */}
    </ClientsContainer>
  );
};

export default Clients;