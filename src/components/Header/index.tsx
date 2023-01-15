import { HeaderContainer, HeaderContent, NewProjectButton } from './styled'
import * as Dialog from '@radix-ui/react-dialog'
import { NewProject } from '../NewProject'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>For The Test</h1>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewProjectButton>Novo projeto</NewProjectButton>
          </Dialog.Trigger>

          <NewProject />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
