import RevenueChart from '../components/RevenueChart';
import React from 'react';
import styled from 'styled-components';

const AnalyticsContainer = styled.div`
  padding: 2rem;
`;

interface AnalyticsProps {
  isSignedIn: boolean;
  handleSignOut: () => Promise<void>;
  // Remove this line: setShowAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Analytics: React.FC<AnalyticsProps> = ({ isSignedIn, handleSignOut }) => {
  return (
    <AnalyticsContainer>
      <h1>Analytics</h1>
      <p>View your team's performance and productivity metrics here.</p>
      {isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={() => setShowAuthPopup(true)}>Sign In</button>
      )}
      <RevenueChart />
      {/* Add more analytics components here */}
    </AnalyticsContainer>
  );
};

export default Analytics;

// Developer Note:
// This file contains the Analytics page component.
// It now receives and passes the required props to the Layout component.
// The RevenueChart component is included, and placeholders for additional analytics components are provided.
// Consider adding more specific analytics components based on business requirements.
