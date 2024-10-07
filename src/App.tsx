import { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp, signIn } from "aws-amplify/auth";
import outputs from "../amplify_outputs.json";
import TodoList from "./components/TodoList";

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

function App() {
  async function handleSignUp() {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: "hello@mycompany.com",
        password: "hunter2",
        options: {
          userAttributes: {
            email: "hello@mycompany.com",
            phone_number: "+15555555555" // E.164 number convention
          },
        }
      });
      
      console.log("Sign-up result:", { isSignUpComplete, userId, nextStep });
      // Handle the sign-up result as needed
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Handle sign-up error
    }
  }

  async function handleConfirmSignUp() {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: "hello@mycompany.com",
        confirmationCode: "123456"
      });

      console.log("Confirmation result:", { isSignUpComplete, nextStep });
      // Handle the confirmation result as needed
    } catch (error) {
      console.error("Error during confirmation:", error);
      // Handle confirmation error
    }
  }

  async function handleSubmit(event: FormEvent<SignInForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    // ... validate inputs
    try {
      const signInResult = await signIn({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });
      console.log("Sign-in result:", signInResult);
      // Handle successful sign-in
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle sign-in error
    }
  }

  return (
    <main>
      <h1>My App</h1>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Sign In" />
      </form>

      <TodoList />

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
