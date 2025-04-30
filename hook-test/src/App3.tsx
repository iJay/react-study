import { produce } from "immer"
import { useReducer, useState } from "react"
// 在 react 里，只要涉及到 state 的修改，就必须返回新的对象，不管是 useState 还是 useReducer。
interface Data {
  result: number
}

interface Data2 {
  a: {
    c: {
      e: number,
      f: number
    },
    d: number
  },
  b: number
}

interface Action {
  type: 'add' | 'minus',
  num: number
}

function reducer (state: Data, action: Action): Data {
  switch (action.type) {
    case 'add':
      return {
        result: state.result + action.num
      }
    case 'minus':
      return {
        result: state.result - action.num
      }
    default:
      return state
  } 
}

function reducer2 (state: Data2, action: Action): Data2 {
  switch (action.type) {
    case 'add':
      return { // 对于复杂对象，使用展开运算符来复制对象 但是不易维护
        ...state,
        a: {
          ...state.a,
          c: {
            ...state.a.c,
            e: state.a.c.e + action.num
          }
        }
      }
    case 'minus':
      return {
        ...state,
        a: {
          ...state.a,
          c: {
            ...state.a.c,
            e: state.a.c.e - action.num
          }
        }
      }
    default:
      return state
  }
}

function reducer3 (state: Data2, action: Action): Data2 {
  switch (action.type) {
    case 'add':
      // produce 返回一个新的对象，第二个参数是一个函数，函数的参数是一个草稿对象，草稿对象是可以直接修改的
      // 但是不会影响原对象，最后会返回一个新的对象
      return produce(state, (draft) => {
        draft.a.c.e += action.num;
      });
    case 'minus':
      return produce(state, (draft) => {
        draft.a.c.e -= action.num;
      });
    default:
      return state
  }
}
// useReducer 是一个 hook，返回一个 state 和 dispatch 函数
function App () {
  const [res, dispatch] = useReducer(reducer, { result: 0 });
  const [res2, dispatch2] = useReducer(reducer2, 'zero', () => {
    return {
      a: {
        c: {
          e: 0,
          f: 0
        },
        d: 0
      },
      b: 0
    }
  })
  const [res3, dispatch3] = useReducer(reducer3, 'zero', () => {
    return {
      a: {
        c: {
          e: 0,
          f: 0
        },
        d: 0
      },
      b: 0
    }
  })

  const [obj1, setObj1] = useState({
    a: {
      c: {
        e: 0,
        f: 0
      },
      d: 0
    },
    b: 0
  })
  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2>useReducer</h2>
        <h3>数字操作</h3>
        <button onClick={() => dispatch({ type: 'add', num: 1 })}>加 +</button>
        <button onClick={() => dispatch({ type: 'minus', num: 1 })}>减 —</button>
        <div>{ res.result }</div>
      </div>
      <div>
        <h3>复杂对象操作</h3>
        <button onClick={() => dispatch2({ type: 'add', num: 1 })}>加 +</button>
        <button onClick={() => dispatch2({ type: 'minus', num: 1 })}>减 —</button>
        <div>{JSON.stringify(res2)}</div>
      </div>
      <div>
        <h3>复杂对象利用immer操作（推荐）</h3>
        <button onClick={() => dispatch3({ type: 'add', num: 1 })}>加 +</button>
        <button onClick={() => dispatch3({ type: 'minus', num: 1 })}>减 —</button>
        <div>{JSON.stringify(res3)}</div>
      </div>
      <div>
        <h3>useState操作复杂对象01</h3>
        <button onClick={
          () => {
            obj1.a.c.e += 1
            setObj1(obj1)
          }
        }>加 ➕</button>
        <button onClick={() => {
            obj1.a.c.e -= 1
            setObj1(obj1)
          }}>减 ➖</button>
        <div>{JSON.stringify(obj1)}</div>
      </div>
      <div>
        <h3>useState操作复杂对象02</h3>
        <button onClick={
          () => {
            const newObj = produce(obj1, (draft) => {
              draft.a.c.e += 1
            })
            setObj1(newObj)
          }
        }>加 ➕</button>
        <button onClick={() => {
            // 对于useState来说，直接修改对象是不可取的，复杂对象的操作还是推荐使用immer
            const newObj = produce(obj1, (draft) => {
              draft.a.c.e -= 1
            })
            setObj1(newObj)
          }}>减 ➖</button>
        <div>{JSON.stringify(obj1)}</div>
      </div>
    </>
  )
}

export default App
