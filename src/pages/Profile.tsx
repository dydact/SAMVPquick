import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/UserIcon/avatarImage";
import { Button } from "../components/ui/elements/button";
import { Card, CardContent } from "../components/ui/elements/card";
import { Input } from "../components/ui/elements/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { ArrowLeft, Edit2, Filter, PauseCircle, PlayCircle, Plus, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

interface Task {
  id: number;
  title: string;
  tags: string[];
  estimation?: string;
  completed?: string;
  today: string;
  total?: string;
  status: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [companyName, setCompanyName] = useState("Enter Company Name");
  const [tasks, setTasks] = useState<Task[]>([
    // ... (tasks array remains the same)
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: "New Task",
      tags: ["Low"],
      estimation: "1h 00m",
      today: "00h:00m",
      total: "00h:00m",
      status: "Not Started"
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <ProfileContainer>
      {/* Profile content goes here */}
      <h1>Profile</h1>
      <p>Welcome, {user?.username}</p>
      <div>
        <h2>Timer: {formatTime(elapsedTime)}</h2>
        <Button onClick={toggleTimer}>{isTimerRunning ? 'Pause' : 'Start'}</Button>
      </div>
      <div>
        <h2>Tasks</h2>
        <Button onClick={addNewTask}>Add New Task</Button>
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              {/* Add more task details here */}
            </CardContent>
          </Card>
        ))}
      </div>
    </ProfileContainer>
  );
};

export default Profile;