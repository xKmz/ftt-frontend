import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../lib/axios'

interface Project {
  id: string
  name: string
  description: string
}

interface CreateProjectInput {
  name: string
  description: string
}

interface ProjectContextType {
  projects: Project[]
  fetchProjects: () => Promise<void>
  createProject: (data: CreateProjectInput) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

interface ProjectsProviderProps {
  children: ReactNode
}

export const ProjectsContext = createContext({} as ProjectContextType)

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([])

  async function fetchProjects() {
    const response = await api.get('/projects')

    setProjects(response.data)
  }

  async function createProject(data: CreateProjectInput) {
    const { name, description } = data

    const response = await api.post('/projects', {
      name,
      description,
    })

    setProjects((state) => [...state, response.data])
  }

  async function deleteProject(id: string) {
    await api.delete(`/projects/${id}`)

    const restProjects = projects.filter((project) => project.id !== id)

    setProjects(restProjects)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        fetchProjects,
        createProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
