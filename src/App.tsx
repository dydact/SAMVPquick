import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RootLayout from './app/layout';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <RootLayout>
            {/* Your routes or other components */}
          </RootLayout>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
