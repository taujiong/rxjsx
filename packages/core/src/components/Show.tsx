import type { FC } from '../utils.js'
import { markAsReactive } from '../utils.js'

interface ShowProps {
  when: boolean
}

const _Show: FC<ShowProps> = ({ when: shouldShow, children }) => {
  return shouldShow ? <>{children}</> : null
}

export const Show = markAsReactive(_Show)
