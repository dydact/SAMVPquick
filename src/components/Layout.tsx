import React from 'react';
import { useAuth } from '../context/AuthContext'; // This is now the correct path

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <div>
      {/* Your layout structure here */}
      <header>
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button>Sign In</button>
        )}
      </header>
      <main>{children}</main>
      {/* Add footer or other layout elements as needed */}
    </div>
  );
};

export default Layout;