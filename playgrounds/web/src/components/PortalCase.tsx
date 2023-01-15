import { Portal } from '@rxjsx/core'

export const PortalCase = () => {
  const portalEle = document.getElementById('portal')!
  return (
    <>
      <div>not attached to the portal element</div>
      <Portal parentShape={portalEle}>
        <div>attached to the portal element</div>
      </Portal>
    </>
  )
}
