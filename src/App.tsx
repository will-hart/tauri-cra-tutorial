import { useCallback, useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api'

const App = () => {
  const [counter, setCounter] = useState(-1)

  useEffect(() => {
    invoke('increment_counter', { delta: 0 }).then((result) => setCounter(result as number))
  }, [setCounter])

  const increment = useCallback(async () => {
    const result = await invoke('increment_counter', { delta: 1 }) as number
    setCounter(result)
  }, [setCounter])

  return (
    <div>
      <button onClick={increment}>increment</button> {counter}
    </div>
  )
}

export default App;
