import { Portal } from '@rxjsx/core'
import { distinctUntilChanged, startWith } from 'rxjs'
import { currentClickedElement$ } from '../states/userClick.js'

export const PortalCase = () => {
  const firstPortalEle = document.getElementById('portal')!
  const portalEle$ = currentClickedElement$.pipe(startWith(firstPortalEle), distinctUntilChanged())

  return (
    <>
      <div>not attached to the portal element</div>
      <Portal parentShape={portalEle$}>
        <div>attached to the portal element</div>
      </Portal>
    </>
  )
}
