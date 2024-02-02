import { ReactNode, createContext, useReducer, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountPassedSeconds, setAmountPassedSeconds] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFineshed() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: { activeCycleId },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
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
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle },
    })
    setActiveCycleId(newCycle.id)
    setAmountPassedSeconds(0)

    // reset()
  }

  function handleInterruptCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: { activeCycleId },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
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
