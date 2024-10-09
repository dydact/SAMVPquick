import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RootLayout from "./app/layout";
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

// Import all pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// ... (import other pages)

function App() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            {/* ... (other routes) */}
          </Routes>
        </RootLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
