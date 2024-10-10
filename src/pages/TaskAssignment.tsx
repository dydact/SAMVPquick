import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskAssignment from '../components/TaskAssignment';

const TaskAssignmentPage: React.FC = () => {
  const handleTaskCreated = () => {
    // Refresh task list or perform other actions after task creation
  };

  const handleAssignmentComplete = () => {
    // Refresh task list or perform other actions after assignment
  };

  return (
    <div className="task-assignment-page">
      <h1>Task Management</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskAssignment onAssignmentComplete={handleAssignmentComplete} />
    </div>
  );
};

export default TaskAssignmentPage;