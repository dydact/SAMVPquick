import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Schema['Task'][]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await client.models.Task.list({
        filter: {
          status: {
            eq: 'PENDING'
          }
        },
        sort: {
          field: 'createdAt',
          direction: 'DESC'
        },
        limit: 10
      });
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <NotificationList>
      {notifications.map((task) => (
        <NotificationItem key={task.id}>
          New task: {task.description}
        </NotificationItem>
      ))}
    </NotificationList>
  );
};

export default Notifications;