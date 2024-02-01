import { useContext } from 'react'
import { ContainerHistory, HistoryList, Status } from './styles'
import { CyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <ContainerHistory>
      <h1>Meu histórico</h1>

      <pre>{JSON.stringify(cycles, null, 2)}</pre>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicío</th>
              <th>
                <Status statusColor="green"> Status</Status>
              </th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>
                    {cycle.minutesAmount}{' '}
                    {cycle.minutesAmount > 1 ? 'minutos' : 'minuto'}
                  </td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green"> Concluido</Status>
                    )}
                    {cycle.interruptedDate && !cycle.finishedDate && (
                      <Status statusColor="red"> Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow"> Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
            {/* <tr>
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
            </tr> */}
          </tbody>
        </table>
      </HistoryList>
    </ContainerHistory>
  )
}
