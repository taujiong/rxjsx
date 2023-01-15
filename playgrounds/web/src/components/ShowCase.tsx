import { Show } from '@rxjsx/core'
import { map, scan, startWith } from 'rxjs'
import { userClickEvent$ } from '../states/userClick.js'

export const ShowCase = () => {
  const shouldShow$ = userClickEvent$.pipe(
    scan((count) => count + 1, 0),
    map((count) => count % 2 === 0),
    startWith(true)
  )

  return <Show when={shouldShow$}>controlled by rxjs</Show>
}
