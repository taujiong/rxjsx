import { FunctionRenderNode } from '../nodes/index.js'
import type { ElementShape } from '../render/index.js'
import type { FC } from '../utils.js'
import { markAsReactive } from '../utils.js'

interface PortalProps {
  parentShape: ElementShape
}

class PortalRenderNode extends FunctionRenderNode<PortalProps> {
  protected override get parentShape(): ElementShape | null {
    return this.ctx.props.parentShape
  }
}

const _Portal: FC<PortalProps> = (props) => {
  return new PortalRenderNode({
    fn: (props) => <>{props.children}</>,
    props,
  })
}

export const Portal = markAsReactive(_Portal)
