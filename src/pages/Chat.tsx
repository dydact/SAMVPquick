import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  padding: 2rem;
`;

const Chat: React.FC = () => {
  return (
    <ChatContainer>
      <h1>Chat</h1>
      <p>Communicate with your team members in real-time.</p>
      {/* Add more placeholder content as needed */}
    </ChatContainer>
  );
};

export default Chat;