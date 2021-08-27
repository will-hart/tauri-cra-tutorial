import { useInvoke } from "./useInvoke";

const defaultArgs = { delta: 1}

const App = () => {
  const { data: counter, update } = useInvoke(defaultArgs, 'get_counter', 'increment_counter')
  const { data: counter2, update: update2 } = useInvoke(defaultArgs, 'get_counter', 'increment_counter')

  return (
    <div>
      <div><button onClick={update}>increment</button> {counter}</div>
      <div><button onClick={update2}>increment</button> {counter2}</div>
    </div>
  )
}

export default App;
