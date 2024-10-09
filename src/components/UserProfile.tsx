import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;