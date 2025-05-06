import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'

interface Data {
  result: number
}

interface Action {
  type: 'add' | 'minus'
  payload: number
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case 'add':
      return {
        result: state.result + action.payload
      }
    case 'minus':
      return {
        result: state.result - action.payload
      }
    default:
      return state
  }
}

function App() {
  const [count, setCount] = useState(0)

  const [count1, setCount1] = useState(0)

  const [num, dispatch] = useReducer(reducer, { result: 0})

  useEffect(() => {
    const timer = setInterval(() => {}, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    setInterval(() => {
      // console.log('setInterval', count)
      setCount((count) => {
        // console.log('setCount', count)
        return count + 1
      })
    }, 1000)
  }, [])

  // 每次count1变化都会清除旧的定时器，然后启动新的定时器
  // 这就导致了定时器不准确
  useEffect(() => {
    const timer = setInterval(() => {
      // console.log('setInterval', count1)
      setCount1(count1 + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count1])

  useEffect(() => {
    setInterval(() => {
      // console.log('setInterval', num)
      dispatch(
        {
          type: 'add',
          payload: 1
        }
      )
    }, 1000)
  }, [])


  const [num1, setNum1] = useState(0)

  const updateNum1 = () => {
    setNum1(num1 + 1)
  }

  const ref = useRef(updateNum1)
 
  // React文档中一般不推荐在渲染过程中直接读取或者修改ref.current
  ref.current = updateNum1 // ref.current的改变不会触发重新渲染，他很适合保存渲染过程中的一些数据场景

  useEffect(() => {
    const timer = setInterval(() => ref.current(), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className="card">
        count: {count}
      </div>
      <div className="card">
        count1: {count1}
      </div>
      <div className="card">
        num: {num.result}
      </div>
      <div className="card">
        num1: {num1}
      </div>
    </>
  )
}

export default App
