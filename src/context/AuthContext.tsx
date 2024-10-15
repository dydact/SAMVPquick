import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession, signIn, signOut, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Use window.__DEV_MODE__ instead of process.env
declare global {
  interface Window {
    __DEV_MODE__?: boolean;
  }
}

// Set this in your index.html or main entry point
// window.__DEV_MODE__ = true; // Set this to true to enable dev mode

const DEV_MODE = window.__DEV_MODE__ === true;

interface User extends Omit<AuthUser, 'username'> {
  email: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  organizationRole: string;
  subscriptionTier?: string;
  subscriptionStatus?: string;
  username: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isSignedIn: boolean;
  toggleDevMode: () => void;
  isDevMode: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(DEV_MODE);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    if (isDevMode) {
      setUser({
        email: 'dev@example.com',
        firstName: 'Dev',
        lastName: 'User',
        organizationName: 'Dev Org',
        organizationRole: 'ADMIN',
        subscriptionTier: 'pro',
        subscriptionStatus: 'active',
        userId: 'dev-user-id',
        username: 'dev-user'
      } as User);
      setIsLoading(false);
      return;
    }

    try {
      const session = await fetchAuthSession();
      if (session.tokens) {
        const authUser = await getCurrentUser();
        const { data: userData } = await client.models.User.get({ id: authUser.userId });
        
        if (userData) {
          setUser({
            ...authUser,
            ...userData,
            organizationName: userData.organizationName || '',
            organizationRole: userData.organizationRole || '',
          } as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function signInUser(username: string, password: string) {
    if (isDevMode) {
      setUser({
        email: username,
        firstName: 'Dev',
        lastName: 'User',
        organizationName: 'Dev Org',
        organizationRole: 'ADMIN',
        userId: 'dev-user-id',
        username: username
      } as User);
      return;
    }

    try {
      await signIn({ username, password });
      await checkUser();
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function signOutUser() {
    if (isDevMode) {
      setUser(null);
      return;
    }

    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  function toggleDevMode() {
    setIsDevMode(prev => !prev);
    checkUser();
  }

  const contextValue: AuthContextType = {
    user,
    signIn: signInUser,
    signOut: signOutUser,
    isLoading,
    isSignedIn: !!user,
    toggleDevMode,
    isDevMode,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};