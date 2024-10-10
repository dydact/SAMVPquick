import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/ui/elements/button';
import RevenueChart from '../components/RevenueChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/elements/tabs";

const AnalyticsContainer = styled.div`
  padding: 2rem;
`;

const VideoStreamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const VideoStream = styled.div`
  background-color: #f0f0f0;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AnalyticsProps {
  isSignedIn: boolean;
  handleSignOut: () => Promise<void>;
}

const Analytics: React.FC<AnalyticsProps> = ({ isSignedIn, handleSignOut }) => {
  const [activeTab, setActiveTab] = useState("video-analysis");

  return (
    <AnalyticsContainer>
      <h1>Analytics</h1>
      <p>View your team's performance and productivity metrics here.</p>
      {isSignedIn && (
        <Button onClick={handleSignOut}>Sign Out</Button>
      )}
      <RevenueChart />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="video-analysis">Video Analysis</TabsTrigger>
          <TabsTrigger value="activity-recognition">Activity Recognition</TabsTrigger>
          <TabsTrigger value="anomaly-detection">Anomaly Detection</TabsTrigger>
        </TabsList>
        <TabsContent value="video-analysis">
          <h2>Video Analysis</h2>
          <VideoStreamsContainer>
            {[1, 2, 3, 4].map((streamId) => (
              <VideoStream key={streamId}>
                Video Stream {streamId}
              </VideoStream>
            ))}
          </VideoStreamsContainer>
        </TabsContent>
        <TabsContent value="activity-recognition">
          <h2>Activity Recognition</h2>
          <p>Activity recognition content will be implemented here.</p>
        </TabsContent>
        <TabsContent value="anomaly-detection">
          <h2>Anomaly Detection</h2>
          <p>Anomaly detection content will be implemented here.</p>
        </TabsContent>
      </Tabs>
    </AnalyticsContainer>
  );
};

export default Analytics;

// Developer Note:
// This file contains the Analytics page component with an added Video Analysis section.
// The Video Analysis section includes a tabbed interface for Video Analysis, Activity Recognition, and Anomaly Detection.
// Placeholder content is used for the video streams and other tabs.
// Remember to replace placeholders with actual components and data when available.
