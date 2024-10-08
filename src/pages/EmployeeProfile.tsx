import React from 'react';
import Profile from './Profile';
import styled from 'styled-components';

const EmployeeProfileContainer = styled.div`
  // Add any employee-specific styling here
`;

const EmployeeProfile: React.FC = () => {
  return (
    <EmployeeProfileContainer>
      <h1>Employee Profile</h1>
      <Profile />
      {/* Add any employee-specific content here */}
    </EmployeeProfileContainer>
  );
};

export default EmployeeProfile;