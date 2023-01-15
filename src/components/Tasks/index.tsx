import { useState, useRef, useContext } from 'react'
import { Trash, CheckSquare } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { ConfirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

import {
  TaskContent,
  TasksContainer,
  TaskButton,
  TaskTable,
  TaskTrTable,
  TaskSpan,
} from './styled'
import { NewTask } from '../NewTask'
import { TasksContext } from '../../context/TasksContext'
import { dateFormatter } from '../../utils/formatter'

export function Tasks() {
  const { tasks, finishTask, deleteTask } = useContext(TasksContext)
  const [visible, setVisible] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const [taskId, setTaskId] = useState<string>()
  const toast = useRef(null)

  async function onHandleFinish(id: string) {
    await finishTask(id)
  }

  async function onHandleDelete(id: string) {
    await deleteTask(id)
  }

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Deletado com sucesso!',
      life: 3000,
    })

    if (isFinished) {
      onHandleFinish(taskId!)
    }

    if (isDeleted) {
      onHandleDelete(taskId!)
    }

    setIsFinished(false)
    setIsDeleted(false)
    setTaskId('')
  }

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Cancelado',
      detail: 'Cancelado com sucesso!',
      life: 3000,
    })

    setIsFinished(false)
    setIsDeleted(false)
    setTaskId('')
  }

  return (
    <>
      <Toast ref={toast} />

      <TasksContainer>
        <TaskContent>
          <h1>Tarefas</h1>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <TaskButton>Nova tarefa</TaskButton>
            </Dialog.Trigger>

            <NewTask />
          </Dialog.Root>
        </TaskContent>

        {tasks.length > 0 ? (
          <TaskTable>
            <tbody>
              {tasks.map((task) => {
                return (
                  <TaskTrTable key={task.id} isFinished={task.finished}>
                    <td width="50%">{task.name}</td>
                    <td>{task.person}</td>
                    <td>{dateFormatter.format(new Date(task.end_date))}</td>
                    <td>
                      {task.finished === true ? (
                        ''
                      ) : (
                        <CheckSquare
                          size={24}
                          color="#00B37E"
                          onClick={() => {
                            setTaskId(task.id)
                            setIsFinished(true)
                            setVisible(true)
                          }}
                        />
                      )}
                    </td>
                    <td>
                      <Trash
                        size={24}
                        color="#f75a68"
                        onClick={() => {
                          setTaskId(task.id)
                          setIsDeleted(true)
                          setVisible(true)
                        }}
                      />
                    </td>
                  </TaskTrTable>
                )
              })}
            </tbody>
          </TaskTable>
        ) : (
          <TaskSpan>
            Não há tarefas disponiveis, por favor selecione um projeto ou
            adicione novas tarefas.
          </TaskSpan>
        )}
      </TasksContainer>

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
