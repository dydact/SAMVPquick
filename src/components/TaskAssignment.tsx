import React, { useState, useEffect } from 'react';
import { Button, Card, List, DatePicker, Input, Select } from 'antd';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import moment from 'moment';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const { Option } = Select;

const client = generateClient<Schema>();

const TaskAssignment: React.FC = () => {
  const [tasks, setTasks] = useState<Schema['Task'][]>([]);
  const [users, setUsers] = useState<Schema['User'][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<moment.Moment | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await client.models.Task.list();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await client.models.User.list();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleDueDateChange = (date: moment.Moment | null) => {
    setSelectedDueDate(date);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmitTask = async () => {
    if (selectedUser && selectedDueDate && taskDescription) {
      try {
        await client.models.Task.create({
          description: taskDescription,
          status: 'PENDING',
          treatmentPlanID: 'PLACEHOLDER_ID', // You'll need to determine how to get the correct treatment plan ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        fetchTasks(); // Refresh the task list
        setSelectedUser(null);
        setSelectedDueDate(null);
        setTaskDescription('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleEditTask = (task: Schema['Task']) => {
    // Implement edit functionality
    console.log('Edit task:', task);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await client.models.Task.delete({ id: taskId });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDate = (date: moment.Moment | null) => {
    return date ? date.format('YYYY-MM-DD') : '';
  };

  return (
    <div>
      {/* Admin Task Creation Form */}
      {user && user.role === 'ADMIN' && (
        <div>
          <h2>Assign Task</h2>
          <Input
            placeholder="Task Description"
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
          <br />
          <Select
            placeholder="Select User"
            value={selectedUser}
            onChange={handleUserChange}
            style={{ width: 200 }}
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </Option>
            ))}
          </Select>
          <br />
          <DatePicker
            placeholder="Select Due Date"
            value={selectedDueDate}
            onChange={handleDueDateChange}
          />
          <br />
          <Button type="primary" onClick={handleSubmitTask}>
            Assign Task
          </Button>
        </div>
      )}

      {/* Task List (for all users) */}
      <List
        loading={loading}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <Card
              title={task.description}
              actions={[
                <Button key="edit" type="link" onClick={() => handleEditTask(task)}>Edit</Button>,
                <Button key="delete" type="link" danger onClick={() => handleDeleteTask(task.id)}>Delete</Button>,
              ]}
            >
              <p>Assigned to: {task.treatmentPlanID}</p>
              <p>Due: {formatDate(moment(task.createdAt))}</p>
              <p>Status: {task.status}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskAssignment;
