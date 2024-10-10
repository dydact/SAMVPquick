import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/elements/button';

const SignInContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #0f172a;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const RightPanel = styled.div`
  flex: 1;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
`;

const StyledButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-top: 1rem;
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <SignInContainer>
      <LeftPanel>
        <Title>SiteAware</Title>
        <Subtitle>Empower your team with intelligent time tracking and project management.</Subtitle>
      </LeftPanel>
      <RightPanel>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton type="submit">Sign In</StyledButton>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </RightPanel>
    </SignInContainer>
  );
};

export default SignIn;