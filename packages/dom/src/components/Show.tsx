import type { FC } from '@rxjsx/core'
import { markAsReactive } from '@rxjsx/core'

interface ShowProps {
  when: boolean
}

const _Show: FC<ShowProps> = ({ when: shouldShow, children }) => {
  return shouldShow ? <>{children}</> : null
}

export const Show = markAsReactive(_Show)
