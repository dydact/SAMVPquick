import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  background-color: var(--primary);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome to SiteAware</Title>
        <Subtitle>Get started with our powerful site management tools</Subtitle>
        <Button onClick={handleGetStarted}>Get Started Now</Button>
      </WelcomeSection>
      {/* Add more dashboard content here */}
    </DashboardContainer>
  );
};

export default Dashboard;