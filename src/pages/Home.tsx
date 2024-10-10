import React from 'react'
import { Button } from "../components/ui/elements/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/elements/card"
import { ArrowRight, Clock, Users, BarChart, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Welcome to SiteAware
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Empower your team with intelligent time tracking and project management. SiteAware brings clarity to your workflow, enhancing productivity and collaboration.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-400">Streamlined Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Effortlessly log hours, track project progress, and manage team productivity with our intuitive interface.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-400">Comprehensive Project Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Gain valuable insights into project health, team performance, and resource allocation with detailed analytics.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <Clock className="h-12 w-12 text-purple-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
            <p className="text-gray-300">Accurate and easy time logging</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-purple-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Team Management</h3>
            <p className="text-gray-300">Efficiently manage your workforce</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart className="h-12 w-12 text-purple-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-300">Insightful project and team analytics</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="h-12 w-12 text-purple-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Scheduling</h3>
            <p className="text-gray-300">Smart scheduling and resource allocation</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
        <p className="text-xl text-gray-300 mb-6">
          Join thousands of teams already using SiteAware to streamline their workflows.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  )
}