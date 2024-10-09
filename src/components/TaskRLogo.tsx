import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.span`
  font-style: italic;
`;

const TaskPart = styled.span`
  color: #e0e0e0; // Bright gray color
  font-weight: normal;
`;

const RPart = styled.span`
  color: red;
  font-weight: bold;
  text-transform: uppercase;
`;

const TaskRLogo: React.FC = () => (
  <LogoContainer>
    <TaskPart>t.ask.</TaskPart>
    <RPart>R!</RPart>
  </LogoContainer>
);

export default TaskRLogo;