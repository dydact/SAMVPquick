import React from 'react';
import styled from 'styled-components';

const BodyContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <BodyContainer>{children}</BodyContainer>;
};

export default Body;