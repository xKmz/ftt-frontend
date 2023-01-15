import styled from 'styled-components'

export const ProjectsContainer = styled.div`
  width: 100%;
  height: 80vh;
  padding: 0 1.5rem;
  border-right: 1px solid ${(props) => props.theme['green-300']};

  flex: 1;
`

export const ProjectsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const ProjectSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 1.5rem;
`
