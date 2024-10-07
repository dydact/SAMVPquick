import React, { useState, useEffect } from 'react';
import Layout from '../app/layout';

// Define the props interface for the Scheduling component
interface SchedulingProps {
  isSignedIn: boolean;
  handleSignOut: () => Promise<void>;
  setShowAuthPopup: (show: boolean) => void;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

interface Schedule {
  id: string;
  date: string;
  clientName: string;
  color: string;
}

const Scheduling: React.FC<SchedulingProps> = ({ isSignedIn, handleSignOut, setShowAuthPopup }) => {
  const [currentWeek] = useState<Date>(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchEmployees();
    fetchSchedules();
  }, [currentWeek]);

  const fetchEmployees = async () => {
    try {
      // Simulating API call
      const mockEmployees: Employee[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
      ];
      setEmployees(mockEmployees);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      // Simulating API call
      const mockSchedules: Schedule[] = [
        { id: '1', date: '2023-05-01', clientName: 'Client A', color: '#ff0000' },
        { id: '2', date: '2023-05-02', clientName: 'Client B', color: '#00ff00' },
      ];
      setSchedules(mockSchedules);
    } catch (err) {
      setError('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout isSignedIn={isSignedIn} handleSignOut={handleSignOut} setShowAuthPopup={setShowAuthPopup}>
      <div>
        <h1>Scheduling</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div>
            <h2>Employees</h2>
            <ul>
              {employees.map(employee => (
                <li key={employee.id}>{employee.name}</li>
              ))}
            </ul>
            <h2>Schedules</h2>
            <ul>
              {schedules.map(schedule => (
                <li key={schedule.id}>{schedule.clientName} - {schedule.date}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Scheduling;