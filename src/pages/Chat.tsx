import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  padding: 2rem;
`;

const Chat: React.FC = () => {
  return (
    <ChatContainer>
      <h1>Chat</h1>
      <p>Communicate with your team and clients in real-time.</p>
      {/* Add chat interface, message history, and user list here */}
    </ChatContainer>
  );
};

export default Chat;