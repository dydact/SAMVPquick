import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './ui/elements/button';
import { useAuth } from '../context/AuthContext';

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
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 1) {
      setStep(2);
    } else {
      try {
        await signIn(email, password);
        onClose();
      } catch (error) {
        console.error('Error signing in:', error);
        setError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{step === 1 ? 'Enter Email' : 'Enter Password'}</h2>
        <Form onSubmit={handleSubmit}>
          {step === 1 ? (
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          ) : (
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          )}
          <Button type="submit">{step === 1 ? 'Next' : 'Sign In'}</Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;