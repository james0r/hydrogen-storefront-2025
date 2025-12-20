import { createContext, useState } from 'react'
type CounterContextType = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}
const CounterContext = createContext<CounterContextType>({
  count: 0,
  setCount: () => { }
})


const CounterProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [count, setCount] = useState(0)

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  )
}

export { CounterContext, CounterProvider }