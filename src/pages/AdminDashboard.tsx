import React from 'react';
import styled from 'styled-components';

const AdminDashboardContainer = styled.div`
  padding: 2rem;
`;

const AdminDashboard: React.FC = () => {
  return (
    <AdminDashboardContainer>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Manage your organization here.</p>
      {/* Add admin-specific features and analytics here */}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;