import { createContext, useContext, useState } from 'react'

const cycleContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(cycleContext)

  function handleGoUp() {
    setActiveCycle((state: number) => state + 1)
    setActiveCycle((state: number) => state + 1)
  }
  return (
    <h1>
      NewCycleForm : {activeCycle}
      <button onClick={handleGoUp}>aumentar</button>
    </h1>
  )
}
function Countdown() {
  const { activeCycle } = useContext(cycleContext)
  return <h1>Countdown:{activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <cycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <h1>Home</h1>
        <Countdown />
        <NewCycleForm />
      </div>
    </cycleContext.Provider>
  )
}
