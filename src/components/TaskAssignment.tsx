import React, { useState, useEffect } from 'react';
import { Task, User } from '../types';
import { fetchTasks, fetchUsers, assignTask } from '../api';

interface TaskAssignmentProps {
  onAssignmentComplete: () => void;
}

const TaskAssignment: React.FC<TaskAssignmentProps> = ({ onAssignmentComplete }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const tasksData = await fetchTasks();
      const usersData = await fetchUsers();
      setTasks(tasksData);
      setUsers(usersData);
    };
    loadData();
  }, []);

  const handleAssign = async () => {
    if (selectedTask && selectedUser) {
      await assignTask(selectedTask, selectedUser);
      onAssignmentComplete();
    }
  };

  return (
    <div className="task-assignment">
      <h2>Assign Task</h2>
      <select
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="">Select a task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleAssign}>Assign Task</button>
    </div>
  );
};

export default TaskAssignment;