import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './app/layout';
import ErrorBoundary from './components/ErrorBoundary';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // Assuming you have a Dashboard component
import Analytics from './pages/Analytics';
import TaskAssignment from './components/TaskAssignment';
import UserProfile from './components/UserProfile';
import Calendar from './components/Calendar';
import TaskR from './components/TaskR';

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
                <Route path="/task-assignment" element={<TaskAssignment onAssignmentComplete={() => {}} />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/calendar" element={<Calendar tasks={[]} />} />
                <Route path="/taskr" element={<TaskR />} />
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
