import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function useInterval (fn: Function, delay: number | null) {
  const callbackFn = useRef(fn)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const cleanUpFnRef = useRef<Function>(null)

  // 因为这个clean函数作为参数传入其他组件，所以用useCallBack包裹
  const clean = useCallback(() => {
    cleanUpFnRef.current?.()
  }, [])

  // 这里之所以不在渲染过程中给赋值，不是因为不能，而是因为React文档中不建议
  useLayoutEffect(() => {}, [
    callbackFn.current = fn
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      callbackFn.current()
    }, delay || 0)

    cleanUpFnRef.current = () => {
      clearInterval(timer)
    }

    return clean
  }, [])

  return clean
}

export default useInterval
