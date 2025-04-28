import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  })
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setNum(num + 1)}>
          num is { num }
        </button>
      </div>
    </>
  )
}

export default App
