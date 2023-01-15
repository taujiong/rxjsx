import { Portal, Show } from '@rxjsx/core'
import { createRenderRoot } from '@rxjsx/dom'
import { fromEvent, map, scan, startWith } from 'rxjs'
import { Counter } from './Counter.js'

export const RxactApp = () => {
  const portalEle = document.getElementById('portal')!
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
      <div>
        <div>not attached to the portal element</div>
        <Portal parentShape={portalEle}>
          <div>attached to the portal element</div>
        </Portal>
      </div>
    </>
  )
}

const rootEle = document.getElementById('root') as HTMLElement
const root = createRenderRoot(rootEle)
root.render(<RxactApp />)
