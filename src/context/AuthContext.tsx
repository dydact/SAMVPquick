import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession, signIn, signOut, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { Auth } from 'aws-amplify';

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
  signIn: (username: string, password: string) => Promise<{ isSignedIn: boolean; nextStep?: any }>;
  signUp: (username: string, password: string, email: string, name: string) => Promise<{ isSignUpComplete: boolean; userId?: string; nextStep?: any }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isSignedIn: boolean;
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
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
    
      if (!isSignedIn) {
        console.log('Additional steps required', nextStep);
        return { isSignedIn, nextStep };
      }

      await checkUser();
      return { isSignedIn };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Re-throw the error so it can be caught in the AuthModal
    }
  }

  async function signOutUser() {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async function signUpUser(username: string, password: string, email: string, name: string) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });

      if (!isSignUpComplete) {
        // Handle confirmation step if required
        console.log('Confirmation may be required');
        return { userId, nextStep };
      }

      return { isSignUpComplete };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  function toggleDevMode() {
    setIsDevMode(prev => !prev);
    checkUser();
  }

  const cognitoSignUp = async (username: string, password: string, email: string) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log('Cognito sign up successful', user);
      // Update state or perform additional actions as needed
    } catch (error) {
      console.error('Error signing up with Cognito:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const cognitoSignIn = async (username: string, password: string) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log('Cognito sign in successful', user);
      // Update state or perform additional actions as needed
    } catch (error) {
      console.error('Error signing in with Cognito:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const contextValue: AuthContextType = {
    user,
    signIn: signInUser,
    signOut: signOutUser,
    isLoading,
    isSignedIn: !!user,
    toggleDevMode,
    isDevMode,
    signUp: signUpUser,
    cognitoSignUp,
    cognitoSignIn,
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