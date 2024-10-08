import React from 'react';
import { Form, Input, DatePicker, TimePicker, Button } from 'antd';
import UserSelect from './UserSelect';

interface TaskFormProps {
  form: any;
  isEditing: boolean;
  editingTask: any;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ form, isEditing, onCreate, onUpdate, onCancel }) => {
  const onFinish = (values: any) => {
    if (isEditing) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="assignedTo" label="Assigned To" rules={[{ required: true }]}>
        <UserSelect />
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="dueTime" label="Due Time" rules={[{ required: true }]}>
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
        {isEditing && (
          <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TaskForm;