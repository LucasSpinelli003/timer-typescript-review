import { ContainerHistory, HistoryList, Status } from './styles'

export function History() {
  return (
    <ContainerHistory>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicío</th>
              <th>
                <Status statusColor="red"> Interrompido</Status>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="yellow"> Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="green"> Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="green"> Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="yellow"> Em andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há dois meses</td>
              <td>
                <Status statusColor="green"> Concluido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </ContainerHistory>
  )
}
