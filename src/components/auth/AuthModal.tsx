import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/elements/button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--background-light);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
`;

const ToggleText = styled.p`
  margin-top: 1rem;
  text-align: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
`;

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onAuth: (username: string, password: string, isSignUp: boolean) => Promise<void>;
  onToggleMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onAuth, onToggleMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAuth(username, password, mode === 'signup');
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Button>
        </Form>
        <ToggleText>
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <ToggleButton onClick={onToggleMode}>
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </ToggleButton>
        </ToggleText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;