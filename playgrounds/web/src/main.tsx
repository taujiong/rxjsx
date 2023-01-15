import { createRenderRoot } from '@rxjsx/dom'
import { Counter } from './components/Counter.js'
import { PortalCase } from './components/PortalCase.js'
import { ShowCase } from './components/ShowCase.js'

export const RxactApp = () => {
  return (
    <>
      <h1>Rxjsx App</h1>
      <ShowCase />
      <Counter initialStep={2} />
      <PortalCase />
    </>
  )
}

const rootEle = document.getElementById('root') as HTMLElement
const root = createRenderRoot(rootEle)
root.render(<RxactApp />)
