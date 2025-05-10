import { useState, type ChangeEvent } from 'react'
import './App.css'

function App() {
  const [keyword, setKeyword] = useState('why')

  // 非受控模式
  function onChange1 (event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
  }

  console.log('render...')

  // 受控模式: 需要对输入的值做处理之后设置到表单的时候，或者是你想实时同步状态值到父组件。
  function onChange2 (event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setKeyword(value.toLocaleUpperCase())
  }
  return (
    <div>
      <input onChange={onChange1} defaultValue={'hello'}/>
      <input onChange={onChange2} value={keyword} />
    </div>
  )
}

export default App
