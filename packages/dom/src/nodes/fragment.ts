import type { Shape } from '@rxjsx/core'
import { ContainerRenderNode } from './base.js'

export class DomFragmentRenderNode extends ContainerRenderNode<null> {
  public override get asAnchorShape(): Shape | null {
    if (!this.isConnected || !this.childNodes) return this.prevSiblingShape

    const lastChildNode = this.childNodes.at(-1)
    return lastChildNode?.asAnchorShape ?? this.prevSiblingShape
  }
}
