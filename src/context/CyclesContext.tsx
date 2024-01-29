import { createContext } from 'react'

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountPassedSeconds: number
  markCurrentCycleAsFineshed: () => void
  secondsPassed: (value: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)
