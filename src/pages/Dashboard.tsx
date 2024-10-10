import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/elements/card";

const DashboardContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Dashboard: React.FC = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  useEffect(() => {
    // Placeholder for task count fetch
    const fetchTaskCount = async () => {
      // Simulating API call
      setTimeout(() => setTaskCount(15), 1000);
    };

    // Placeholder for active projects fetch
    const fetchActiveProjects = async () => {
      // Simulating API call
      setTimeout(() => setActiveProjects(5), 1000);
    };

    // Placeholder for total hours fetch
    const fetchTotalHours = async () => {
      // Simulating API call
      setTimeout(() => setTotalHours(120), 1000);
    };

    // Placeholder for recent activity fetch
    const fetchRecentActivity = async () => {
      // Simulating API call
      setTimeout(() => setRecentActivity([
        "Task 'Update client database' completed",
        "New project 'Website Redesign' started",
        "John Doe logged 8 hours on 'Mobile App Development'",
      ]), 1000);
    };

    fetchTaskCount();
    fetchActiveProjects();
    fetchTotalHours();
    fetchRecentActivity();
  }, []);

  return (
    <DashboardContainer>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{taskCount} tasks pending</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{activeProjects} projects in progress</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{totalHours} hours logged this week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;