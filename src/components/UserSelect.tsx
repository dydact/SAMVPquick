import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const { Option } = Select;

const client = generateClient();

const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers {
      items {
        id
        username
      }
    }
  }
`;

interface ListUsersQuery {
  listUsers: {
    items: Array<{ id: string; username: string }>;
  };
}

const UserSelect: React.FC = () => {
  const [users, setUsers] = useState<Array<{ id: string; username: string }>>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await client.graphql({ query: listUsers }) as GraphQLResult<ListUsersQuery>;
      if (result.data) {
        setUsers(result.data.listUsers.items);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Select>
      {users.map((user) => (
        <Option key={user.id} value={user.username}>
          {user.username}
        </Option>
      ))}
    </Select>
  );
};

export default UserSelect;