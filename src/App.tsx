// app.tsx
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";
import AuthPopup from "./components/AuthPopup";
import "./Layout.css";
import Layout from "./app/layout"; // Import the Layout component

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
    <Layout 
      isSignedIn={isSignedIn} 
      handleSignOut={handleSignOut} 
      setShowAuthPopup={setShowAuthPopup} 
    > 
      <div className="app-container"> 
        {/* ... your existing app content ... */}
        {isSignedIn ? (
          <section className="todo-section">
            <TodoList />
          </section>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to My App</h2>
            <p>Please sign in to view and manage your todos.</p>
          </div>
        )}
        {/* ... your existing app content ... */}
      </div>
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </Layout>
  );
}

export default App;