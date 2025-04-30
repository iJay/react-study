import { useEffect, useImperativeHandle, useRef, useState } from "react"

function MyInput({ ref }) {
  const inputRef = useRef(null);
  // 此时如果我不想暴露给父组件原生dom节点，只想暴露给父组件若干自定义方法
  // 可以借助useImperativeHandle
  useImperativeHandle(ref, () => {
    // ... your methods ...
    return {
      focus () {
        inputRef?.current?.focus()
      },
      scrollIntoView() {
        inputRef?.current?.scrollIntoView();
      }
    }
  }, [inputRef])
  return <input ref={inputRef} />
}

// 保存dom引用 
// useRef 一般是用来存一些不是用于渲染的内容的。
function App () {
  // useRef 的类型参数是保存的内容的类型
  const inputRef = useRef<HTMLInputElement>(null)

  const numRef=useRef<number>(0)

  const [, forceRender] = useState(0)

  useEffect(() => {
    // ref 的内容是保存在 current 属性上的
    console.log(inputRef.current)
    inputRef.current?.focus()
  })

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={() => {
        numRef.current += 1;
        forceRender(Math.random())
      }}>{numRef.current}</button>
      <button onClick={() => {
        inputRef.current?.scrollIntoView()
      }}>scrollIntoView</button>
    </div>
  )
}

export default App
