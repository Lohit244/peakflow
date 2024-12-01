'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Task, Status } from '@/types/board'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function TaskPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks)
      const foundTask = tasks.find(t => t.id === params.id)
      if (foundTask) {
        setTask(foundTask)
      }
    }
  }, [params.id])

  const handleSave = () => {
    if (task) {
      const savedTasks = localStorage.getItem('tasks')
      if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks)
        const updatedTasks = tasks.map(t => t.id === task.id ? task : t)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      }
      router.push('/')
    }
  }

  const handleDelete = () => {
    if (task) {
      const savedTasks = localStorage.getItem('tasks')
      if (savedTasks) {
        const tasks: Task[] = JSON.parse(savedTasks)
        const updatedTasks = tasks.filter(t => t.id !== task.id)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      }
      router.push('/')
    }
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Task Details</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <Select
            value={task.status}
            onValueChange={(value: Status) => setTask({ ...task, status: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between">
          <Button onClick={handleSave}>Save Changes</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete Task</Button>
        </div>
      </div>
    </div>
  )
}

