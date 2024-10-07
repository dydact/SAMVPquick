import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Clock, Users, BarChart, Calendar, PlusCircle, Search } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="flex space-x-4">
          <Input className="flex-grow" placeholder="Search projects or tasks" />
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Hours Logged">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">245.5</div>
              <p className="text-sm text-gray-600">+2% from last week</p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        <Card title="Active Projects">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-gray-600">2 completed this month</p>
            </div>
            <BarChart className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        <Card title="Team Members">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-gray-600">3 new this month</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
        <Card title="Upcoming Deadlines">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">7</div>
              <p className="text-sm text-gray-600">Within next 2 weeks</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Recent Activity">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="flex-grow">John logged 8 hours on Project A</span>
              <span className="text-sm text-gray-600">2h ago</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="flex-grow">New task added to Project B</span>
              <span className="text-sm text-gray-600">5h ago</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="flex-grow">Project C deadline updated</span>
              <span className="text-sm text-gray-600">1d ago</span>
            </li>
          </ul>
        </Card>
        <Card title="Quick Actions">
          <div className="space-y-4">
            <Button className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
            <Button className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Log Time
            </Button>
            <Button className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
            <Button className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}