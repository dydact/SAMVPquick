// app.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";
import AuthPopup from "./components/AuthPopup";
import "./Layout.css";
import Layout from "./app/layout"; // Import the Layout component
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

Amplify.configure(outputs);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await getCurrentUser();
      setIsSignedIn(true);
    } catch {
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  function handleAuthSuccess() {
    setIsSignedIn(true);
    setShowAuthPopup(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout
        isSignedIn={isSignedIn}
        handleSignOut={handleSignOut}
        setShowAuthPopup={setShowAuthPopup}
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
            element={
              <Analytics 
                isSignedIn={isSignedIn} 
                handleSignOut={handleSignOut} 
                setShowAuthPopup={setShowAuthPopup}
              />
            } 
          />
        </Routes>
        {!isSignedIn && (
          <div className="welcome-message">
            <h2>Welcome to My App</h2>
            <p>Please sign in to view and manage your todos.</p>
          </div>
        )}
        {showAuthPopup && (
          <AuthPopup
            onClose={() => setShowAuthPopup(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </Layout>
    </Router>
  );
}

export default App;