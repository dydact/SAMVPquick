import React, { useState, useEffect } from 'react';
import { Tabs, Table, Form, Input, DatePicker, Button, Select } from 'antd';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../amplify/data/resource';
import styled from 'styled-components';

const { TabPane } = Tabs;
const { Option } = Select;

const client = generateClient<Schema>();

const Container = styled.div`
  padding: 20px;
`;

const PayrollBillingTimeTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payroll');
  const [employees, setEmployees] = useState<Schema['User'][]>([]);
  const [timeEntries, setTimeEntries] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEmployees();
    fetchTimeEntries();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await client.models.User.list();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchTimeEntries = async () => {
    // Implement fetching time entries from your backend
  };

  const handleTimeEntrySubmit = async (values: any) => {
    // Implement submitting time entry to your backend
    console.log('Time entry submitted:', values);
  };

  const payrollColumns = [
    { title: 'Employee', dataIndex: 'name', key: 'name' },
    { title: 'Hours Worked', dataIndex: 'hoursWorked', key: 'hoursWorked' },
    { title: 'Rate', dataIndex: 'rate', key: 'rate' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];

  const billingColumns = [
    { title: 'Client', dataIndex: 'client', key: 'client' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Hours', dataIndex: 'hours', key: 'hours' },
    { title: 'Rate', dataIndex: 'rate', key: 'rate' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];

  return (
    <Container>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Payroll" key="payroll">
          <Table columns={payrollColumns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Billing" key="billing">
          <Table columns={billingColumns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Time Tracking" key="timeTracking">
          <Form form={form} onFinish={handleTimeEntrySubmit} layout="vertical">
            <Form.Item name="employeeId" label="Employee" rules={[{ required: true }]}>
              <Select>
                {employees.map(employee => (
                  <Option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="hours" label="Hours Worked" rules={[{ required: true }]}>
              <Input type="number" step="0.5" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit Time Entry</Button>
            </Form.Item>
          </Form>
          <Table dataSource={timeEntries} columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Employee', dataIndex: 'employee', key: 'employee' },
            { title: 'Hours', dataIndex: 'hours', key: 'hours' },
            { title: 'Description', dataIndex: 'description', key: 'description' },
          ]} />
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default PayrollBillingTimeTracking;