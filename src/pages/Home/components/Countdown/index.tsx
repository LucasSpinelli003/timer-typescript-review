import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styled'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../index'

export function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference > totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountPassedSeconds(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountPassedSeconds(secondsDifference)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}