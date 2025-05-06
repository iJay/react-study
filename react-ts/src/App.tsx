import { createContext, memo, useContext, useEffect, useRef, useState, type ComponentProps, type CSSProperties, type FunctionComponent, type HTMLAttributes, type JSX, type MouseEvent, type MouseEventHandler, type PropsWithChildren, type ReactNode } from 'react'
import './App.css'

interface AaaProps {
  name: string;
  clickHandler: MouseEventHandler<HTMLDivElement> // 组件需要传入一些事件处理函数就要用 xxxEventHandler 的类型，比如 MouseEventHandler、ChangeEventHandler
  content: React.ReactNode // ReactElement不接受number和null类型 如果需要替换成React.ReactNodes
}

interface UserInfoProps {
  name?: string;
  age?: number
}

type CccProps = PropsWithChildren<{
  content?: ReactNode,
  color?: CSSProperties['color'],
  styles?: CSSProperties
}>

interface DddProps extends ComponentProps<'div'>{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void // 组件需要传入一些事件处理函数不用 XxxEventHandler，自己声明一个函数类型也可以
}

// interface CccProps extends ComponentProps<'a'> {
//   content?: ReactNode
//   color?: CSSProperties['color']
//   styles?: CSSProperties
// }
// interface Element extends React.ReactElement<any, any> {}
// 因此想描述一个jsx类型，只要用React.ReactElement就可以
// 这三个类型的关系 ReactNode > ReactElement > JSX.Element
const content: JSX.Element = <div>aaa</div>

const userInfoContext = createContext({})

// 组件一般不写返回值类型 默认推导JSX.Element
function Aaa (props: AaaProps) {
  return <div onClick={props.clickHandler}>
    <div>aaa, { props.name } {props.content}</div>
    <userInfoContext.Provider value={{ name: 'Amyzhan', age: 32}}>
      <Bbb></Bbb>
    </userInfoContext.Provider>
  </div>
}

const Ccc: FunctionComponent<CccProps> = (props) => {
  const userInfo = useContext<UserInfoProps>(userInfoContext)
  function callback () {
    console.log('MemoDdd click!')
  }
  return (
    <div style={{ "color": props.color }}>
      { props.content }
      <p>name: {userInfo.name}</p>
      <p>age: {userInfo.age}</p>
      <div>
        <DddMemo title='hover show!' clickHandler={(e) => {
          console.log('DddMemo', e)
        }} callback={callback}></DddMemo>
        <div>{ props.children }</div>
      </div>
    </div>
  )
}

const CccMemo = memo(Ccc)
// 针对html标签中的原生属性 可以继承HTMLAttributes 或者 ComponentProps
// interface DddProps extends HTMLAttributes<HTMLDivElement>{
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
//   callback: Function
// }

const DddMemo = memo<DddProps>(function Ddd(props) {
  const { callback } = props
  return (
    <div title={props.title} onClick={props.clickHandler}>
      <button onClick={() => {callback()}}>Ddd click</button>
    </div>
  )
})

// FC类型的返回值是ReactNode
const Bbb: React.FC = () => {
  const [count, setCount] = useState(0)

  // 这里虽然使用了memo但是 因为children的存在， Ccc组件在每一次点击后都会重新渲染
  function handlClick () {
    setCount((count) => count + 1)
  }
  return (
    <div>
      <button onClick={handlClick}>click</button>
      <Ccc content={<h3>Ccc的content</h3>} color="yellow" styles={{ backgroundColor: "gray" }}>
        <h3>这里是Ccc的child!</h3>
      </Ccc>
      <CccMemo content={'CccMemo的content'} color="blueviolet">
        <h3>这里是CccMemo的child!</h3>
      </CccMemo>
    </div>
  )
}

function App() {
  // const [count, setCount] = useState(0) 可以使用默认推导的类型
  const [count, setCount] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  function updateXXX () {}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const fnRef = useRef<Function>(null)
  useEffect(() => {
    const timer = setInterval(() => {
      fnRef.current = updateXXX
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div ref={ ref }>
      <div onClick={() => setCount((count) => count + 1)}>{count}</div>
      <Aaa clickHandler={(e) => {
        console.log('Aaa', e)
      }} name='LeoHan' content={<button>xxx</button>}/>
      {/* <Aaa name='LeoHan' content={3}/> React.ReactElement不接受number类型 */}
      {/* <Aaa name='LeoHan' content={null}/> React.ReactElement不接受null类型 */}
    </div>
  )
}

export default App
