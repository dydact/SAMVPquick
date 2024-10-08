// app.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import outputs from "../amplify_outputs.json";
import AppFrame from "./components/ui/AppFrame"; // Update this import
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';

// Import all pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Scheduling from './pages/Scheduling';
import Chat from './pages/Chat';
import SignUpPage from './pages/SignUpPage';
import About from './pages/About';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import ClientProfile from './pages/ClientProfile';
import EmployeeProfile from './pages/EmployeeProfile';
import Clients from './pages/Clients';
import Billing from './pages/Billing';
import TimeTracking from './pages/TimeTracking';
import Payroll from './pages/Payroll';
import TodoList from "./components/TodoList";
import TaskAssignment from './components/TaskAssignment';
import PlanDetails from './components/PlanDetails';

Amplify.configure(outputs);
const client = generateClient();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await client.graphql({ query: 'query GetUser { getUser { id } }' });
      setIsSignedIn(true);
    } catch {
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAuth(username: string, password: string, isSignUp: boolean) {
    try {
      console.log(`${isSignUp ? 'Sign up' : 'Sign in'} attempted with:`, username, password);
      await checkAuthState();
      setShowAuthModal(false);
    } catch (error) {
      console.error(`Error ${isSignUp ? 'signing up' : 'signing in'}:`, error);
    }
  }

  const handleAuthClick = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <AppFrame> {/* Use AppFrame instead of RootLayout */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="/analytics" element={isSignedIn ? <Analytics isSignedIn={isSignedIn} handleSignOut={checkAuthState} /> : <Navigate to="/" replace />} />
            <Route path="/scheduling" element={isSignedIn ? <Scheduling /> : <Navigate to="/" replace />} />
            <Route path="/chat" element={isSignedIn ? <Chat /> : <Navigate to="/" replace />} />
            <Route path="/task-assignment" element={isSignedIn ? <TaskAssignment /> : <Navigate to="/" replace />} />
            <Route path="/todos" element={isSignedIn ? <TodoList /> : <Navigate to="/" replace />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/plans/:planId" element={<PlanDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/client-profile" element={isSignedIn ? <ClientProfile /> : <Navigate to="/" replace />} />
            <Route path="/employee-profile" element={isSignedIn ? <EmployeeProfile /> : <Navigate to="/" replace />} />
            <Route path="/clients" element={isSignedIn ? <Clients /> : <Navigate to="/" replace />} />
            <Route path="/billing" element={isSignedIn ? <Billing /> : <Navigate to="/" replace />} />
            <Route path="/time-tracking" element={isSignedIn ? <TimeTracking /> : <Navigate to="/" replace />} />
            <Route path="/payroll" element={isSignedIn ? <Payroll /> : <Navigate to="/" replace />} />
          </Routes>
          {showAuthModal && (
            <AuthModal
              mode={authMode}
              onClose={() => setShowAuthModal(false)}
              onAuth={handleAuth}
              onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
          )}
        </AppFrame>
      </Router>
    </AuthProvider>
  );
}

export default App;
