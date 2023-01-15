import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Overlay, Content, CloseButton } from './styles'
import { useContext } from 'react'
import { ProjectsContext } from '../../context/ProjectsContext'

const newProjectFormSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type NewProjectFormInputs = z.infer<typeof newProjectFormSchema>

export function NewProject() {
  const { createProject } = useContext(ProjectsContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewProjectFormInputs>({
    resolver: zodResolver(newProjectFormSchema),
  })

  async function handleCreateNewProject(data: NewProjectFormInputs) {
    const { name, description } = data

    try {
      await createProject({
        name,
        description,
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
        <Dialog.Title>Novo projeto</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewProject)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />

          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
