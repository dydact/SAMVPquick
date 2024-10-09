import { useState, useEffect } from 'react';
import { Form } from 'antd';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';
import { useAuth } from '../context/AuthContext';

const client = generateClient<Schema>();

export const useTasks = () => {
  const [tasks, setTasks] = useState<Schema['Task'][]>([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Schema['Task'] | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await client.models.Task.list();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (values: any) => {
    try {
      await client.models.Task.create({
        description: values.description,
        treatmentPlanID: values.treatmentPlanID,
        status: 'PENDING',
        createdAt: values.createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
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
      await client.models.Task.update({
        id: editingTask.id,
        description: values.description,
        treatmentPlanID: values.treatmentPlanID,
        status: values.status,
        createdAt: values.createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
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
      await client.models.Task.delete({ id });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task: Schema['Task']) => {
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