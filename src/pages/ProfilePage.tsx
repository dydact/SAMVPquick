import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/elements/button';

const ProfilePageContainer = styled.div`
  padding: 2rem;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
`;

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [notifications, setNotifications] = useState(user?.notifications || false);
  const [theme, setTheme] = useState(user?.theme || 'light');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ notifications, theme });
    // In a real application, you'd send this data to your backend
    console.log('Settings updated:', { notifications, theme });
  };

  return (
    <ProfilePageContainer>
      <h1>User Profile</h1>
      <SettingsForm onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Receive notifications
        </label>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <Button type="submit">Save Settings</Button>
      </SettingsForm>
    </ProfilePageContainer>
  );
};

export default ProfilePage;