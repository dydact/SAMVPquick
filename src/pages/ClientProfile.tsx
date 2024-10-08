import React from 'react';
import Profile from './Profile';
import styled from 'styled-components';

const ClientProfileContainer = styled.div`
  // Add any client-specific styling here
`;

const ClientProfile: React.FC = () => {
  return (
    <ClientProfileContainer>
      <h1>Client Profile</h1>
      <Profile />
      {/* Add any client-specific content here */}
    </ClientProfileContainer>
  );
};

export default ClientProfile;