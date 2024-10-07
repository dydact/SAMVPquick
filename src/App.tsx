import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";

// Developer Notes:
// - This file contains the main application logic and UI.
// - It uses AWS Amplify for data management and authentication.
// - The AuthenticatorWrapper component provides a pre-built UI for user authentication.
// - The main App component is wrapped with the AuthenticatorWrapper for secure access.

Amplify.configure(outputs);
const client = generateClient<Schema>();

// Authenticator component
function AuthenticatorWrapper({ children }) {
  return (
    <Authenticator>
      {({ signOut, user }) => children({ signOut, user })}
    </Authenticator>
  );
}

// Main App component
function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // Subscribe to Todo updates
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <AuthenticatorWrapper>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
        </main>
      )}
    </AuthenticatorWrapper>
  );
}

export default App;
