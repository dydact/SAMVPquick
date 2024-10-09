import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  name: string;
  email: string;
}

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const authState = await authService.checkAuthState();
      setIsSignedIn(authState);
      if (authState) {
        // Fetch user data from your auth service
        const userData = await authService.getUserData();
        setUser(userData);
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(username: string, password: string) {
    await authService.signIn(username, password);
    await checkAuthState();
  }

  async function signUp(username: string, password: string) {
    await authService.signUp(username, password);
    await checkAuthState();
  }

  async function signOut() {
    await authService.signOut();
    await checkAuthState();
  }

  return { isSignedIn, isLoading, user, signIn, signUp, signOut };
}