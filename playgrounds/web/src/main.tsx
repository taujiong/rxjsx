import { render } from '@rxjsx/dom'
import { Counter } from './Counter.js'

export const RxactApp = () => {
  const isFalse = false
  const isTrue = true

  return (
    <>
      <h1>Rxjsx App</h1>
      {isTrue && 'should show'}
      {isFalse && 'should not show'}
      <Counter step={2} />
    </>
  )
}

const root = document.getElementById('root') as HTMLElement
render(root)(<RxactApp />)
