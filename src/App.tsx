import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './app/layout';
import ErrorBoundary from './components/ErrorBoundary';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // Assuming you have a Dashboard component
import Analytics from './pages/Analytics';
import FinanceManagement from './pages/FinanceManagement';
import TaskAssignment from './components/TaskAssignment';
import UserProfile from './components/UserProfile';
import Calendar from './components/Calendar';
import TaskR from './components/TaskR';
import ClientManagement from './pages/ClientManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import Personnel from './pages/Personnel';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <RootLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics isSignedIn={false} handleSignOut={async () => {}} />} />
                <Route path="/finance" element={<FinanceManagement isSignedIn={false} handleSignOut={async () => {}} />} />
                <Route path="/task-assignment" element={<TaskAssignment onAssignmentComplete={() => {}} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/calendar" element={<Calendar tasks={[]} onTaskUpdate={() => {
                  console.log('Task updated');
                }} />} />
                <Route path="/taskr" element={<TaskR />} />
                <Route path="/clients" element={<ClientManagement />} />
                <Route path="/employees" element={<EmployeeManagement />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/personnel" element={<Personnel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                {/* Add more routes as needed */}
              </Routes>
            </RootLayout>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
