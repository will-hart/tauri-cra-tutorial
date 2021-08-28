import Counter from './Counter'

const App = () => {
  return (
    <div>
      <Counter counterId={1} />
      <Counter counterId={1} />
      <Counter counterId={2} />
    </div>
  )
}

export default App;
