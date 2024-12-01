'use client'

import { useState, useEffect } from "react"
import { DndContext, DragEndEvent, DragOverlay, closestCorners } from "@dnd-kit/core"
import { Task, Status, Column as ColumnType } from "../types/board"
import { Column } from "./column"
import { TaskCard } from "./task-card"

const initialColumns: ColumnType[] = [
  { id: "not-started", title: "Not Started", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "completed", title: "Completed", tasks: [] },
]

export function Board() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks)
      const newColumns = initialColumns.map(col => ({
        ...col,
        tasks: tasks.filter(task => task.status === col.id)
      }))
      setColumns(newColumns)
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    const allTasks = columns.flatMap(col => col.tasks)
    localStorage.setItem('tasks', JSON.stringify(allTasks))
  }, [columns])
  // eslint-disable-next-line
  const handleDragStart = (event: any) => {
    const { active } = event
    setActiveTask(active.data.current)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeTask = active.data.current as Task
    const newStatus = over.id as Status

    if (activeTask.status !== newStatus) {
      setColumns(columns.map(col => ({
        ...col,
        tasks: col.id === activeTask.status
          ? col.tasks.filter(t => t.id !== activeTask.id)
          : col.id === newStatus
          ? [...col.tasks, { ...activeTask, status: newStatus }]
          : col.tasks
      })))
    }

    setActiveTask(null)
  }

  const handleAddTask = (status: Status) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: "New Task",
      description: "",
      status,
      createdAt: new Date().toISOString()
    }

    setColumns(columns.map(col => ({
      ...col,
      tasks: col.id === status ? [...col.tasks, newTask] : col.tasks
    })))
  }

  return (
    <div className="p-8">
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

