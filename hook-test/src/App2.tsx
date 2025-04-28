import { useEffect, useState } from "react"

async function queryData () {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(999)
    }, 1000)
  })
}

function App () {
  const [count, setCount] = useState(0)

  useEffect(
    () => {
      console.log('effect running...')
      queryData().then((data: number) => {
        setCount(data)
      })
    },
    [ // 依赖数组为空时，effect 只会在组件挂载时执行一次
      1,
      // Date.now(), // 这里的 Date 对象是一个新对象，每次都会变化，所以会导致 effect 每次都执行
    ]
  )

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        { count }
      </button>
    </div>
  )
}

export default App