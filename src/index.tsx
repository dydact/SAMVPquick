import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Set dev mode based on your environment or build configuration
if (process.env.NODE_ENV === 'development') {
  window.__DEV_MODE__ = true;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);