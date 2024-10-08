// app.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { signIn, signOut, getCurrentUser, AuthUser } from "aws-amplify/auth";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";
import RootLayout from "./app/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Scheduling from './pages/Scheduling';
import TaskAssignment from './components/TaskAssignment';

Amplify.configure(outputs);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const currentUser = await getCurrentUser();
      setIsSignedIn(true);
      setUser(currentUser);
    } catch {
      setIsSignedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignIn(username: string, password: string) {
    try {
      await signIn({ username, password });
      checkAuthState();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsSignedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <RootLayout
        user={user}
        isSignedIn={isSignedIn}
        handleSignOut={handleSignOut}
        handleSignIn={handleSignIn}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              isSignedIn ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
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
            element={<Analytics isSignedIn={isSignedIn} handleSignOut={handleSignOut} setShowAuthPopup={() => {}} />} 
          />
          <Route 
            path="/scheduling" 
            element={<Scheduling isSignedIn={isSignedIn} handleSignOut={handleSignOut} setShowAuthPopup={() => {}} />} 
          />
        </Routes>
        {!isSignedIn && (
          <div className="welcome-message">
            <h2>Welcome to My App</h2>
            <p>Please sign in to view and manage your todos.</p>
          </div>
        )}
        <TaskAssignment />
      </RootLayout>
    </Router>
  );
}

export default App;
