 // memo + useMemo + useCallback

import { useEffect, useState, memo, useCallback, useMemo } from "react"

interface BbbProps {
  count: number,
  callback: () => void
}

function Bbb (props: BbbProps) {
  console.log('bbb render');
  return <h2>{props.count}</h2>
}

// memo 的作用是只有 props 变的时候，才会重新渲染被包裹的组件
const MemoBbb = memo(Bbb)

 function App () {
  const [, setNum] = useState(0)

  const [count, setCount] = useState(1)

  useEffect(() => {
    setInterval(() => {
      setNum(Math.random())
      console.log('setNum')
    }, 2000)
  }, [])
  // 每次render都会声明新的函数 导致Bbb即便count没变Bbb组件也会重新渲染
  // function bBBCallback () {

  // }

  // useCallback作用是当deps不变，始终返回同一个function
  const bBBCallback = useCallback(() => {
    // 
  }, [])

  const count2 = useMemo(() => {
    return count * 10
  }, [count])

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount(Math.random())
  //     console.log('setCount')
  //   }, 2000)
  // }, [])

  return (
    <div>
      <MemoBbb count={count2} callback={bBBCallback}/>
    </div>
  )
 }

 export default App

 /**
  * 如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 useMemo、useCallback 包裹，
  * 否则，每次 props 都会变，memo 就没用了。
  * 反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，那也没意义，
  * 因为不管 props 变没变都会重新渲染，只是做了无用功。
  */