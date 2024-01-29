import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  function handleGoUp() {
    setActiveCycle((state: number) => state + 1)
    setActiveCycle((state: number) => state + 1)
  }
  return (
    <>
      <h1>NewCycleForm: {activeCycle}</h1>
      <button onClick={handleGoUp}>Aumentar</button>
    </>
  )
}
function Countdownn() {
  const { activeCycle } = useContext(CyclesContext)
  return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <>
      <CyclesContext.Provider value={{ setActiveCycle, activeCycle }}>
        <h1>Home</h1>
        <NewCycleForm />
        <Countdownn />
      </CyclesContext.Provider>
    </>
  )
}
