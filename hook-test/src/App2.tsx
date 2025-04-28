import { useEffect, useLayoutEffect, useState } from "react"

async function queryData () {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(999)
    }, 1000)
  })
}

function App () {
  const [count, setCount] = useState(0)

  console.log('rendering...')

  useEffect(
    () => {
      console.log('effect running...01')
      queryData().then((data: number) => {
        setCount(data)
      })
    },
    [ // 依赖数组为空时，effect 只会在组件挂载时执行一次
      1, // 这里的 1 是一个常量，所以不会导致 effect 每次都执行
      // {}, // 这里的 {} 是一个新对象，每次都会变化，所以会导致 effect 每次都执行 []同理
      // Date.now(), // 这里的 Date 对象是一个新对象，每次都会变化，所以会导致 effect 每次都执行
    ]
  )

  useEffect(() => {
    console.log('effect running...02')
  }) // 依赖数组不传时，effect 每次都会执行

  useLayoutEffect(() => {
    console.log('layout effect running...01')
  })
  // useLayoutEffect 和 useEffect 的区别在于，useLayoutEffect 会在 DOM 更新前执行 DOM 更新后执行
  // 因此useLayoutEffect 会阻塞浏览器的绘制

  Promise.resolve().then(() => {
    console.log('promise running...03')
  })

  useLayoutEffect(() => {
    console.log('layout effect running...02')
  }, [count])

  setTimeout(() => {
    console.log('timeout running...04')
  }, 0)

  // 这里effect执行时机：当用户交互事件触发状态改变， effect很可能会在 DOM 更新前执行
  // 当非用户交互事件触发状态改变， effect会在 DOM 更新后执行

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        { count }
      </button>
    </div>
  )
}

export default App