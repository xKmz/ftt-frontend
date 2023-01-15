import { ThemeProvider } from 'styled-components'
import { ProjectsProvider } from './context/ProjectsContext'
import { TasksProvider } from './context/TasksContext'
import { Home } from './pages/Home'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <ProjectsProvider>
        <TasksProvider>
          <Home />
        </TasksProvider>
      </ProjectsProvider>
    </ThemeProvider>
  )
}
