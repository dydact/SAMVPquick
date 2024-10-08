// Developer Note: Custom hook for managing task-related logic and state.

import { useState, useEffect } from 'react';
import { Form } from 'antd';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const client = generateClient();

const listTasks = /* GraphQL */ `
  query ListTasks {
    listTasks {
      items {
        id
        title
        description
        assignedTo
        dueDate
        status
      }
    }
  }
`;

const createTask = /* GraphQL */ `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      assignedTo
      dueDate
      status
    }
  }
`;

const updateTask = /* GraphQL */ `
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      assignedTo
      dueDate
      status
    }
  }
`;

const deleteTask = /* GraphQL */ `
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: string;
}

interface ListTasksQuery {
  listTasks: {
    items: Task[];
  };
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const fetchUser = async () => {
    try {
      const userInfo = await getCurrentUser();
      const userAttributes = await fetchUserAttributes();
      
      // Check if the user is an admin
      const isAdmin = userAttributes['custom:isAdmin'] === 'true' || 
                      (userAttributes['cognito:groups'] && 
                       JSON.parse(userAttributes['cognito:groups']).includes('admin'));

      setUser({
        ...userInfo,
        isAdmin,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await client.graphql({ query: listTasks }) as GraphQLResult<ListTasksQuery>;
      if (result.data) {
        setTasks(
          result.data.listTasks.items.sort(
            (a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          )
        );
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (values: any) => {
    try {
      const newTask = {
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
        dueDate: values.dueDate.toISOString(),
        status: 'open',
      };

      await client.graphql({
        query: createTask,
        variables: { input: newTask }
      });
      form.resetFields();
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (values: any) => {
    if (!editingTask) return;

    try {
      const updatedTask = {
        id: editingTask.id,
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
        dueDate: values.dueDate.toISOString(),
      };

      await client.graphql({
        query: updateTask,
        variables: { input: updatedTask }
      });
      setIsEditing(false);
      setEditingTask(null);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await client.graphql({
        query: deleteTask,
        variables: { input: { id } }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setIsEditing(true);
    setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: new Date(task.dueDate),
    });
  };

  return {
    tasks,
    loading,
    user,
    isEditing,
    editingTask,
    form,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
    handleEditTask,
    setIsEditing,
  };
};