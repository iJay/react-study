import { memo, useState } from "react"
import useInterval from "./useInterval"

interface ChildProps {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  clean: Function
}

function Child (props: ChildProps) {
  const { clean } = props
  return (
    <button onClick={() => { clean()}}>stop timer</button>
  )
}

const ChildMemo = memo(Child)

function App () {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount(count + 1)
  }

  const cleanUp = useInterval(updateCount, 1000)

  return (
    <div>
      count: { count }
      <div>
        <ChildMemo clean={cleanUp}/>
      </div>
    </div>
  )
}

export default App
