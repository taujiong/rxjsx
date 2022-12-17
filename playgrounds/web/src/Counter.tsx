import type { FC } from '@rxjsx/core'
import { markAsReactive, pipeTo, useState } from '@rxjsx/core'
import { interval, map } from 'rxjs'

interface CounterProps {
  initialStep: number
}

const _Counter: FC<CounterProps> = ({ initialStep }) => {
  const [step, step$] = useState(initialStep).select('all')
  const [count$, setCount] = useState(0).select('stream')
  const style$ = interval(1000).pipe(map((i) => ({ opacity: 0.5 * (0.5 + (i % 2)) })))

  return (
    <>
      <div>
        <label for="stepInput">step</label>
        <input
          id="stepInput"
          onChange={pipeTo(step$, (e) => parseInt(e.currentTarget.value, 10))}
        />
      </div>
      <div>
        <button onClick={() => setCount((c) => c - step())}>-</button>
        <span style={style$}>{count$}</span>
        <button onClick={() => setCount((c) => c + step())}>+</button>
      </div>
    </>
  )
}

export const Counter = markAsReactive(_Counter)
