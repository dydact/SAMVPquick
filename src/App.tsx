// app.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";
import RootLayout from "./app/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Scheduling from './pages/Scheduling';
import TaskAssignment from './components/TaskAssignment';
import Chat from './pages/Chat';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import SignUpPage from './pages/SignUpPage';
import PlanDetails from './components/PlanDetails';
import Footer from './components/Footer';

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
      // Implement sign-in/sign-up logic using the generated client
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
        <RootLayout onAuthClick={handleAuthClick}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                isSignedIn ? <Dashboard /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/todos"
              element={
                isSignedIn ? (
                  <div className="app-container">
                    <section className="todo-section">
                      <TodoList />
                    </section>
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                isSignedIn ? (
                  <Analytics 
                    isSignedIn={isSignedIn} 
                    handleSignOut={checkAuthState} 
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/scheduling"
              element={
                isSignedIn ? <Scheduling /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/chat"
              element={
                isSignedIn ? <Chat /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/task-assignment"
              element={
                isSignedIn ? <TaskAssignment /> : <Navigate to="/" replace />
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/plans/:planId" element={<PlanDetails />} />
          </Routes>
          <Footer 
            isSignedIn={isSignedIn}
            onSignIn={() => { setAuthMode('signin'); setShowAuthModal(true); }}
            onSignUp={() => { setAuthMode('signup'); setShowAuthModal(true); }}
          />
          {showAuthModal && (
            <AuthModal
              mode={authMode}
              onClose={() => setShowAuthModal(false)}
              onAuth={handleAuth}
              onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
          )}
        </RootLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
