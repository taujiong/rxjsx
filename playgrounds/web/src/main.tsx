import { Show } from '@rxjsx/core'
import { render } from '@rxjsx/dom'
import { fromEvent, map, scan, startWith } from 'rxjs'
import { Counter } from './Counter.js'

export const RxactApp = () => {
  const shouldShow$ = fromEvent(document, 'click').pipe(
    scan((count) => count + 1, 0),
    map((count) => count % 2 === 0),
    startWith(true)
  )

  return (
    <>
      <h1>Rxjsx App</h1>
      <Show when={shouldShow$}>controlled by rxjs</Show>
      <Counter initialStep={2} />
    </>
  )
}

const root = document.getElementById('root') as HTMLElement
render(root)(<RxactApp />)
