import React, { FormEvent, useState } from 'react';
import { signUp, signIn } from "aws-amplify/auth";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: FormElements;
}

interface AuthPopupProps {
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose, onAuthSuccess }) => {
  const [authState, setAuthState] = useState<'signIn' | 'signUp'>('signIn');

  async function handleSignUp(event: FormEvent<CustomForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const { isSignUpComplete, userId } = await signUp({
        username: form.elements.email.value,
        password: form.elements.password.value,
        options: {
          userAttributes: {
            email: form.elements.email.value,
          },
          autoSignIn: true
        }
      });
      
      console.log("Sign-up result:", { isSignUpComplete, userId });
      if (isSignUpComplete) {
        onAuthSuccess();
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Handle sign-up error
    }
  }

  async function handleSignIn(event: FormEvent<CustomForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const signInResult = await signIn({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });
      console.log("Sign-in result:", signInResult);
      onAuthSuccess();
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle sign-in error
    }
  }

  return (
    <div className="auth-popup">
      <div className="auth-popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        {authState === 'signIn' ? (
          <form onSubmit={handleSignIn} className="auth-form">
            <h2>Sign In</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
            <p>Don't have an account? <button type="button" className="text-button" onClick={() => setAuthState('signUp')}>Sign Up</button></p>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="auth-form">
            <h2>Sign Up</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
            <p>Already have an account? <button type="button" className="text-button" onClick={() => setAuthState('signIn')}>Sign In</button></p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;