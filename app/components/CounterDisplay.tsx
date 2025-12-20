import { useContext } from 'react'
import { CounterContext } from '~/components/CounterContext'

const CounterDisplay = () => {
  const { count } = useContext(CounterContext)
  return <div>Counter: {count}</div>
}

export default CounterDisplay