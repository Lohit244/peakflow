import { useDroppable } from "@dnd-kit/core"
import { Status, Task } from "../types/board"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

interface ColumnProps {
  id: Status
  title: string
  tasks: Task[]
  onAddTask: (status: Status) => void
}

export function Column({ id, title, tasks, onAddTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id
  })

  return (
    <div ref={setNodeRef} className="p-4 bg-muted rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">
          {title} ({tasks.length})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddTask(id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  )
}

