export type Status = 'not-started' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  createdAt: string
}

export interface Column {
  id: Status
  title: string
  tasks: Task[]
}

