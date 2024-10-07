import { FormEvent, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { signUp, signIn, signOut, getCurrentUser } from "aws-amplify/auth";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";
import "./Layout.css";

Amplify.configure(outputs);

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: FormElements;
}

function App() {
  const [authState, setAuthState] = useState<'signIn' | 'signUp'>('signIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsSignedIn(true);
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
      setIsSignedIn(true);
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle sign-in error
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>My App</h1>
        {isSignedIn && <button onClick={handleSignOut}>Sign Out</button>}
      </header>

      {!isSignedIn ? (
        <section className="auth-section">
          {authState === 'signIn' && (
            <form onSubmit={handleSignIn} className="auth-form">
              <h2>Sign In</h2>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign In</button>
              <p>Don't have an account? <button type="button" onClick={() => setAuthState('signUp')}>Sign Up</button></p>
            </form>
          )}

          {authState === 'signUp' && (
            <form onSubmit={handleSignUp} className="auth-form">
              <h2>Sign Up</h2>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
              <p>Already have an account? <button type="button" onClick={() => setAuthState('signIn')}>Sign In</button></p>
            </form>
          )}
        </section>
      ) : (
        <section className="todo-section">
          <TodoList />
        </section>
      )}

      <footer className="footer">
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;