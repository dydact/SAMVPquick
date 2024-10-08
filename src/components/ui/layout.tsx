"use client"

import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import AppFrame from './AppFrame';
import Body from './Body';

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6200ea;
    --primary-dark: #3700b3;
    --background: #f5f5f5;
    --background-light: #ffffff;
    --text: #333333;
    --text-muted: #666666;
    --border: #e0e0e0;
    --accent: #bb86fc;
    --header-bg: #1a1a1a;
    --siteaware-text: #e0e0e0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    color: var(--text);
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();

  const isSignedIn = !!user;

  const handleAuthClick = () => {
    // This will be handled by the App component
    console.log('Auth click');
  };

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <GlobalStyle />
      <AppFrame
        isSignedIn={isSignedIn}
        onAuthClick={handleAuthClick}
        onChatClick={handleChatClick}
      >
        <Body>{children}</Body>
      </AppFrame>
    </>
  );
};

export default RootLayout;