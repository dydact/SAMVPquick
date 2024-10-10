import React from 'react';
import styled from 'styled-components';
import PersonnelTab from '../components/PersonnelTab';

const PersonnelContainer = styled.div`
  padding: 2rem;
`;

const Personnel: React.FC = () => {
  return (
    <PersonnelContainer>
      <h1>Personnel Management</h1>
      <PersonnelTab />
    </PersonnelContainer>
  );
};

export default Personnel;