import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <p>Welcome to your SiteAware dashboard. Here you'll find an overview of your site's performance and key metrics.</p>
      {/* Add dashboard widgets and components here */}
    </DashboardContainer>
  );
};

export default Dashboard;