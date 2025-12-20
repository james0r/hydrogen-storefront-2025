import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const CounterReset = () => {
    const { setCount } = useContext(CounterContext);
    return <button onClick={() => setCount(0)}>Reset</button>;
};

export default CounterReset;