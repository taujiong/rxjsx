import type { FC } from '@rxjsx/core'
import { useState } from '@rxjsx/core'
import { interval, map } from 'rxjs'

interface CounterProps {
  step: number
}

export const Counter: FC<CounterProps> = ({ step }) => {
  const [count$, setCount] = useState(0)
  const style$ = interval(1000).pipe(map((i) => ({ opacity: 0.5 * (0.5 + (i % 2)) })))

  return (
    <>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span style={style$}>{count$}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
    </>
  )
}
