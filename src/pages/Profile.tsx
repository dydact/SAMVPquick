import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { ArrowLeft, Edit2, Filter, PauseCircle, PlayCircle, Plus, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [companyName, setCompanyName] = useState("Enter Company Name")
  const [tasks, setTasks] = useState<Task[]>([
    // ... (tasks array remains the same)
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const addNewTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: "New Task",
      tags: ["Low"],
      estimation: "1h 00m",
      today: "00h:00m",
      total: "00h:00m",
      status: "Not Started"
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        {/* ... (header content remains the same) */}
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Profile Information */}
        <div className="flex justify-between items-start mb-8">
          {/* ... (profile information content remains the same) */}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="worked" className="mb-8">
          {/* ... (tabs content remains the same) */}
        </Tabs>

        {/* Task Search and Add */}
        <div className="flex justify-between items-center mb-4">
          {/* ... (task search and add content remains the same) */}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Now</h3>
          {tasks.map((task, index) => (
            <Card key={task.id} className="bg-gray-800 border-gray-700">
              {/* ... (task card content remains the same) */}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Profile