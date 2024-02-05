import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFineshedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountPassedSeconds: number
  markCurrentCycleAsFineshed: () => void
  secondsPassed: (value: number) => void
  createNewCycle: (data: NewCycleFormData) => void
  handleInterruptCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountPassedSeconds, setAmountPassedSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFineshed() {
    dispatch(markCurrentCycleAsFineshedAction())
  }

  function secondsPassed(value: number) {
    setAmountPassedSeconds(value)
  }

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle])
    dispatch(addNewCycleAction(newCycle))
    setAmountPassedSeconds(0)

    // reset()
  }

  function handleInterruptCycle() {
    dispatch(interruptCurrentCycleAction())
    // setActiveCycleId(null)
  }

  return (
    <>
      <CyclesContext.Provider
        value={{
          cycles,
          activeCycle,
          activeCycleId,
          amountPassedSeconds,
          secondsPassed,
          markCurrentCycleAsFineshed,
          createNewCycle,
          handleInterruptCycle,
        }}
      >
        {children}
      </CyclesContext.Provider>
    </>
  )
}
