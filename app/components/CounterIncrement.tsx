import { useContext } from 'react'
import { CounterContext } from '~/components/CounterContext'

const CounterIncrement = () => {
  const { setCount } = useContext(CounterContext)
  return (
    <button onClick={() => setCount((count: number) => count + 1)}>
      Increment Counter
    </button>
  )
}

export default CounterIncrement