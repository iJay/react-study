import { Component, createContext, useContext } from "react"

// 用 createContext 创建 context
const countContext = createContext(111)

function Aaa () {
  // 使用 xxxContext.Provider 修改它的值
  return (
    <div>
      <countContext.Provider value={222}>
        <Bbb />
      </countContext.Provider>
    </div>
  )
}

function Bbb () {
  return (
    <div>
      <Ccc1></Ccc1>
      <countContext.Consumer>
        {value => <Ccc2 count={value} />}
      </countContext.Consumer>
    </div>
  )
}

class Ccc2 extends Component {
  render() {
    return <h2>类组件Ccc2 获取的context的值为：{this.props.count}</h2>
  }
}

function Ccc1 () {
  // 用 useContext 取出来
  const count = useContext(countContext)
  return (
    <div>
      函数组件Ccc1 获取的context的值为： {count}
    </div>
  )
}

function App () {
  return <Aaa />
}

export default App
