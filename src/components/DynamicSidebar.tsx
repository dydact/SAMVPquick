import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const { SubMenu } = Menu;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f0f0f0;
`;

const DynamicSidebar: React.FC = () => {
  const { user } = useAuth();

  const renderClientItems = () => (
    <SubMenu key="clients" title="Clients">
      <Menu.Item key="videoAnalysis">Video Analysis</Menu.Item>
      <Menu.Item key="activityRecognition">Activity Recognition</Menu.Item>
      <Menu.Item key="anomalyDetection">Anomaly Detection</Menu.Item>
      <Menu.Item key="patientMonitoring">Patient Monitoring</Menu.Item>
      <Menu.Item key="treatmentPlans">Treatment Plans</Menu.Item>
    </SubMenu>
  );

  const renderAnalyticsItems = () => (
    <SubMenu key="analytics" title="Analytics">
      <Menu.Item key="videoAnalysis">Video Analysis</Menu.Item>
      <Menu.Item key="activityRecognition">Activity Recognition</Menu.Item>
      <Menu.Item key="dataAnalytics">Data Analytics</Menu.Item>
      <Menu.Item key="alertsNotifications">Alerts & Notifications</Menu.Item>
    </SubMenu>
  );

  return (
    <SidebarContainer>
      <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        {renderClientItems()}
        {renderAnalyticsItems()}
        <Menu.Item key="taskr">
          <Link to="/taskr">TaskR</Link>
        </Menu.Item>
        <Menu.Item key="payrollBillingTimeTracking">
          <Link to="/payroll-billing-time-tracking">Payroll/Billing/Time Tracking</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </SidebarContainer>
  );
};

export default DynamicSidebar;