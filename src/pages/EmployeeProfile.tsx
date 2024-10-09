import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import { List, Card } from 'antd';

const client = generateClient<Schema>();

const EmployeeProfileContainer = styled.div`
  padding: 2rem;
`;

const EmployeeProfile: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Schema['Task'][]>([]);

  useEffect(() => {
    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  const fetchUserTasks = async () => {
    if (!user) return;
    try {
      const { data } = await client.models.Task.list({
        filter: {
          treatmentPlanID: {
            eq: user.userId // Change this to userId
          }
        }
      });
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <EmployeeProfileContainer>
      <h1>Employee Profile</h1>
      {user && (
        <div>
          <p>Name: {user.firstName || ''} {user.lastName || ''}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role || ''}</p>
        </div>
      )}
      <h2>Assigned Tasks</h2>
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <Card title={task.description || 'No description'}>
              <p>Status: {task.status || 'Unknown'}</p>
              <p>Created At: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Unknown'}</p>
            </Card>
          </List.Item>
        )}
      />
    </EmployeeProfileContainer>
  );
};

export default EmployeeProfile;