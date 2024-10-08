import React from 'react';
import { Button, Card, List } from 'antd';
import { useTasks } from '../hooks/useTasks';
import TaskForm from './TaskForm';

const TaskAssignment: React.FC = () => {
  const {
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
  } = useTasks();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div>
      {/* Admin Task Creation Form */}
      {user && user.isAdmin && (
        <TaskForm
          form={form}
          isEditing={isEditing}
          editingTask={editingTask}
          onCreate={handleCreateTask}
          onUpdate={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {/* Task List */}
      <List
        loading={loading}
        dataSource={tasks}
        renderItem={(task: any) => (
          <List.Item>
            <Card
              title={task.title}
              actions={[
                <Button key="edit" type="link" onClick={() => handleEditTask(task)}>Edit</Button>,
                <Button key="delete" type="link" danger onClick={() => handleDeleteTask(task.id)}>Delete</Button>,
              ]}
            >
              <p>{task.description}</p>
              <p>Assigned to: {task.assignedTo}</p>
              <p>Due: {formatDate(task.dueDate)}</p>
              <p>Status: {task.status}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskAssignment;