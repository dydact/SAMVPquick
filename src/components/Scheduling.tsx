import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/UserIcon/avatarImage";
import { Button } from "../components/ui/elements/button";
import { Card, CardContent } from "../components/ui/elements/card";
import { Input } from "../components/ui/elements/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MessageSquare, Calendar, ChevronLeft, ChevronRight, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TaskRLogo from './TaskRLogo';

const employees = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(123) 456-7890', image: '/placeholder.svg' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(234) 567-8901', image: '/placeholder.svg' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '(345) 678-9012', image: '/placeholder.svg' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com', phone: '(456) 789-0123', image: '/placeholder.svg' },
  { id: 5, name: 'Carol Brown', email: 'carol@example.com', phone: '(567) 890-1234', image: '/placeholder.svg' },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SchedulingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 1.5rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const EmployeeList = styled(Card)`
  width: 25%;
`;

const WeeklyCalendar = styled(Card)`
  flex-grow: 1;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const CalendarDay = styled.div`
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 100%;
`;

const ScheduledBlock = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  color: var(--text);
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  cursor: move;
`;

const TaskRContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const Scheduling: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() - date.getDay() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <SchedulingContainer>
      <MainContent>
        <ContentWrapper>
          <HeaderSection>
            <h1>Scheduling</h1>
            <div>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))}>
                Next Week
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Tabs defaultValue="week">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </HeaderSection>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <EmployeeList>
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2>Employees</h2>
                  <Input type="text" placeholder="Search employees" style={{ width: '12rem' }} />
                </div>
                <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                  {employees.map((employee) => (
                    <div key={employee.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: 'var(--background-light)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                      <Avatar>
                        <AvatarImage src={employee.image} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3>{employee.name}</h3>
                        <p>{employee.email}</p>
                        <p>{employee.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </EmployeeList>
            <WeeklyCalendar>
              <CardContent>
                <CalendarGrid>
                  {weekDays.map((day, index) => (
                    <div key={day} style={{ textAlign: 'center' }}>
                      <div>{day}</div>
                      <div>{weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                  ))}
                </CalendarGrid>
                <CalendarGrid style={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                  {weekDays.map((day) => (
                    <CalendarDay key={day}>
                      <ScheduledBlock color="var(--primary-light)">
                        <p>Client A</p>
                        <p>9:00 AM - 10:00 AM</p>
                      </ScheduledBlock>
                      <ScheduledBlock color="var(--accent-light)">
                        <p>Client B</p>
                        <p>11:00 AM - 12:00 PM</p>
                      </ScheduledBlock>
                      <ScheduledBlock color="var(--secondary-light)">
                        <p>Client C</p>
                        <p>2:00 PM - 3:00 PM</p>
                      </ScheduledBlock>
                    </CalendarDay>
                  ))}
                </CalendarGrid>
              </CardContent>
            </WeeklyCalendar>
          </div>
        </ContentWrapper>
      </MainContent>
      <TaskRContainer>
        <TaskRLogo />
      </TaskRContainer>
    </SchedulingContainer>
  );
};

export default Scheduling;