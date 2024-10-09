import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Badge, List, Card, Button, Form, Input, DatePicker, Select, Tag, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTasks } from '../hooks/useTasks';
import styled from 'styled-components';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';

const { Option } = Select;

const client = generateClient<Schema>();

const TaskRContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 80px; // Increased padding to prevent clipping
  height: calc(100vh - 80px); // Adjust for full viewport height minus header
  overflow: hidden; // Prevent scrolling on the container
`;

const CalendarContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  padding-right: 20px;
`;

const TaskListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-left: 20px;
`;

const EmployeeSidebar = styled.div`
  width: 250px;
  padding: 1rem;
  background-color: #f0f0f0;
  border-right: 1px solid #d9d9d9;
  overflow-y: auto;
`;

const TaskList = styled(List)`
  max-height: calc(100vh - 300px);
  overflow-y: auto;
`;

const TaskItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskR: React.FC = () => {
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

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const fileInputRef = useRef<any>(null);

  const [employees, setEmployees] = useState<Schema['User'][]>([]);

  const fetchEmployees = async () => {
    try {
      const { data } = await client.models.User.list();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const dateCellRender = (value: moment.Moment) => {
    const listData = tasks.filter(task => 
      moment(task.createdAt).isSame(value, 'day')
    );

    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.id}>
            <Badge status={item.status === 'COMPLETED' ? 'success' : 'processing'} text={item.description} />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateSelect = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployee(employeeId);
  };

  const filteredTasks = tasks
    .filter(task => !selectedDate || moment(task.createdAt).isSame(selectedDate, 'day'))
    .filter(task => !selectedEmployee || task.treatmentPlanID === selectedEmployee)
    .sort((a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf());

  const handleFileUpload = async (file: File) => {
    try {
      // Implement your file upload logic here
      // For example, you might use AWS S3 or another storage service
      console.log('Uploading file:', file.name);
      // After successful upload, you might want to associate the file with the task
      message.success(`${file.name} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error(`Failed to upload ${file.name}`);
    }
  };

  const renderTaskList = () => (
    <TaskList
      dataSource={filteredTasks}
      renderItem={(task) => (
        <TaskItem>
          <div>
            <h4>{task.description}</h4>
            <p>Date: {moment(task.createdAt).format('YYYY-MM-DD')}</p>
            <p>Stakeholder: {task.treatmentPlanID}</p>
            <p>Priority: {task.priority || 'Normal'}</p>
          </div>
          <Tag color={task.status === 'COMPLETED' ? 'green' : 'blue'}>{task.status}</Tag>
        </TaskItem>
      )}
    />
  );

  return (
    <TaskRContainer>
      <EmployeeSidebar>
        <Input.Search placeholder="Search employees" onSearch={(value) => {
          // Implement search functionality here
        }} />
        <List
          dataSource={employees}
          renderItem={(employee) => (
            <List.Item
              onClick={() => handleEmployeeSelect(employee.id)}
              style={{ cursor: 'pointer' }}
            >
              {employee.firstName} {employee.lastName}
            </List.Item>
          )}
        />
      </EmployeeSidebar>
      <CalendarContainer>
        <Calendar dateCellRender={dateCellRender} onSelect={handleDateSelect} />
      </CalendarContainer>
      <TaskListContainer>
        <h2>Tasks {selectedDate && `for ${selectedDate.format('MMMM D, YYYY')}`}</h2>
        {user?.role === 'ADMIN' && (
          <Form
            form={form}
            onFinish={isEditing ? handleUpdateTask : handleCreateTask}
            layout="vertical"
          >
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="treatmentPlanID" label="Assigned To" rules={[{ required: true }]}>
              <Select>
                {/* Add options for users */}
              </Select>
            </Form.Item>
            <Form.Item name="createdAt" label="Due Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="priority" label="Priority">
              <Select>
                <Option value="Low">Low</Option>
                <Option value="Normal">Normal</Option>
                <Option value="High">High</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Upload
                beforeUpload={(file) => {
                  handleFileUpload(file);
                  return false; // Prevent default upload behavior
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Document</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEditing ? 'Update Task' : 'Create Task'}
              </Button>
              {isEditing && (
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              )}
            </Form.Item>
          </Form>
        )}
        {renderTaskList()}
      </TaskListContainer>
    </TaskRContainer>
  );
};

export default TaskR;