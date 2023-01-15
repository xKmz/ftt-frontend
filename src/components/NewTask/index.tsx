import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Overlay, Content, CloseButton } from './styles'
import { useContext } from 'react'
import { TasksContext } from '../../context/TasksContext'

const newTaskFormSchema = z.object({
  name: z.string(),
  person: z.string(),
  end_date: z.string(),
})

type NewTaskFormInputs = z.infer<typeof newTaskFormSchema>

export function NewTask() {
  const { createTask } = useContext(TasksContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTaskFormInputs>({
    resolver: zodResolver(newTaskFormSchema),
  })

  async function handleCreateNewTask(data: NewTaskFormInputs) {
    const { name, person, end_date } = data

    try {
      await createTask({
        name,
        person,
        end_date,
      })

      reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova tarefa</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTask)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />
          <input
            type="text"
            placeholder="Executor"
            required
            {...register('person')}
          />
          <input
            type="date"
            placeholder="Data de Entrega"
            required
            {...register('end_date')}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
