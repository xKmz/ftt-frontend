import { createContext, ReactNode, useState } from 'react'
import { api } from '../lib/axios'

interface Task {
  id: string
  name: string
  person: string
  end_date: Date
  finished: boolean
  project_id: string
}

interface CreateTaskInput {
  name: string
  person: string
  end_date: Date
}

interface TaskContextType {
  tasks: Task[]
  fetchTasks: (id: string) => Promise<void>
  createTask: (data: CreateTaskInput) => Promise<void>
  finishTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TaskContextType)

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projectId, setProjectId] = useState<string>()

  async function fetchTasks(id: string) {
    try {
      const response = await api.get('/tasks', { params: { project_id: id } })

      setProjectId(id)
      setTasks(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function createTask(data: CreateTaskInput) {
    const { name, person, end_date } = data
    try {
      const response = await api.post('/tasks', {
        name,
        person,
        end_date,
        project_id: projectId,
      })

      setTasks((state) => [...state, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.delete(`/tasks/${id}`)

      const restTasks = tasks.filter((task) => task.id !== id)

      setTasks(restTasks)
    } catch (err) {
      console.log(err)
    }
  }

  async function finishTask(id: string) {
    try {
      await api.put(`/tasks/${id}`)

      fetchTasks(projectId!)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        fetchTasks,
        createTask,
        finishTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
