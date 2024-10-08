import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (username: string, password: string) => Promise<void>;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignIn }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { username: string; password: string }) => {
    setIsSubmitting(true);
    try {
      await onSignIn(values.username, values.password);
      onClose();
    } catch (error) {
      console.error('Sign in failed:', error);
      // You could set an error state here and display it to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Sign In" open={true} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignInModal;