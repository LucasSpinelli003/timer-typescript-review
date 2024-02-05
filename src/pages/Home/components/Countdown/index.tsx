import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styled'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../context/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFineshed,
    amountPassedSeconds,
    secondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference > totalSeconds) {
          markCurrentCycleAsFineshed()
          secondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          secondsPassed(secondsDifference)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFineshed,
    secondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountPassedSeconds : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
    }
    if (
      minutes[0] === '0' &&
      minutes[1] === '0' &&
      seconds[0] === '0' &&
      seconds[1] === '0'
    ) {
      document.title = '- Timer - '
    }
  }, [minutes, seconds, activeCycle])

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
