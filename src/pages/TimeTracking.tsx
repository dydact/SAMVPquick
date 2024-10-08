import React from 'react';
import styled from 'styled-components';

const TimeTrackingContainer = styled.div`
  padding: 2rem;
`;

const TimeTracking: React.FC = () => {
  return (
    <TimeTrackingContainer>
      <h1>Time Tracking</h1>
      <p>Track time spent on projects and tasks.</p>
      {/* Add time tracking features, timers, and reports here */}
    </TimeTrackingContainer>
  );
};

export default TimeTracking;