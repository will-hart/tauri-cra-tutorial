import { useInvoke } from "./useInvoke";

const defaultArgs = { delta: 1 }

const Counter = ({ counterId }: { counterId: number }) => {
  const { data: counter, update } = useInvoke(
    counterId,
    'get_counter',
    'increment_counter'
  )

  return (
    <div>
      <button onClick={() => update(defaultArgs)}>increment</button>
      Counter {counterId}: {counter}
    </div>
  )
}

export default Counter
