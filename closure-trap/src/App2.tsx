import { useState } from "react"
import useInterval from "./useInterval"

function App () {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount(count + 1)
  }

  useInterval(updateCount, 1000)

  return (
    <div>
      count: { count }
    </div>
  )
}

export default App
