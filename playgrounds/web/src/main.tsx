import { createRoot } from '@rxjsx/dom'
import type { EventHandler } from '@rxjsx/dom/jsx/jsx.js'

interface ButtonProps {
  bgColor: string
  text: string
  onClick: EventHandler<HTMLButtonElement, MouseEvent>
}

const Button = ({ bgColor, onClick, text }: ButtonProps) => (
  <>
    <button style={{ backgroundColor: bgColor }} onClick={onClick}>
      {text}
    </button>
  </>
)

export const RxactApp = () => {
  const buttonText = 'click me'
  const isFalse = false
  const isTrue = true

  return (
    <>
      <h1>Rxjsx App</h1>
      {isTrue && 'should show'}
      {isFalse && 'should not show'}
      <Button bgColor="#ff0000" text={buttonText} onClick={() => alert(`you ${buttonText}`)} />
    </>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<RxactApp />)
