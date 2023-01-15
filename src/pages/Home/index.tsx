import { Header } from '../../components/Header'
import { Projects } from '../../components/Projects'
import { Tasks } from '../../components/Tasks'
import { BodyContainer } from './styles'

export function Home() {
  return (
    <div>
      <Header />

      <BodyContainer>
        <Projects />
        <Tasks />
      </BodyContainer>
    </div>
  )
}
