import { useContext, useState, useRef } from 'react'
import { Trash } from 'phosphor-react'

import { ConfirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

import { ProjectsContainer, ProjectsTable, ProjectSpan } from './styled'
import { ProjectsContext } from '../../context/ProjectsContext'
import { TasksContext } from '../../context/TasksContext'

export function Projects() {
  const { projects, deleteProject } = useContext(ProjectsContext)
  const { fetchTasks } = useContext(TasksContext)
  const [visible, setVisible] = useState<boolean>(false)
  const [projectId, setProjectId] = useState<string>()
  const toast = useRef(null)

  async function onHandleSelectProject(id: string) {
    await fetchTasks(id)
  }

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Deletado com sucesso!',
      life: 3000,
    })

    onHandleDelete(projectId!)
    setProjectId('')
  }

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Cancelado',
      detail: 'Cancelado com sucesso!',
      life: 3000,
    })

    setProjectId('')
  }

  async function onHandleDelete(id: string) {
    await deleteProject(id)
  }

  return (
    <>
      <Toast ref={toast} />

      <ProjectsContainer>
        <h1>Projetos</h1>

        {projects.length > 0 ? (
          <ProjectsTable>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr
                    key={project.id}
                    onClick={() => onHandleSelectProject(project.id)}
                  >
                    <td width="80%">{project.name}</td>
                    <td>
                      <Trash
                        size={24}
                        color="#f75a68"
                        onClick={() => {
                          setVisible(true)
                          setProjectId(project.id)
                        }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </ProjectsTable>
        ) : (
          <ProjectSpan>
            Não há projetos cadastrados, adicione para gerencias suas tarefas.
          </ProjectSpan>
        )}
      </ProjectsContainer>

      <div className="card">
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Você tem certeza que deseja efetuar a ação?"
          header="Confirmação"
          icon="pi pi-exclamation-triangle"
          acceptLabel="Confirmar"
          rejectLabel="Cancelar"
          accept={accept}
          reject={reject}
        />
      </div>
    </>
  )
}
