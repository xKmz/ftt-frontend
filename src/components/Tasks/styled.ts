import styled from 'styled-components'

export const TasksContainer = styled.div`
  width: 100%;
  padding: 0 1.5rem;

  flex: 2;
`

export const TaskContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TaskButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
`

export const TaskTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`

interface TasksIsFinishedProps {
  isFinished: boolean
}

export const TaskTrTable = styled.tr<TasksIsFinishedProps>`
  background: ${(props) =>
    props.isFinished === true
      ? props.theme['green-300']
      : props.theme['gray-700']};

  td {
    padding: 1.25rem 2rem;

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

export const TaskSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 2.5rem;
`
