import type { Shape } from '../render/index.js'
import { ContainerRenderNode } from '../render/index.js'

export class FragmentRenderNode extends ContainerRenderNode<null> {
  public override get asAnchorShape(): Shape | null {
    if (!this.isConnected || !this.childNodes) return this.prevSiblingShape

    const lastChildNode = this.childNodes.at(-1)
    return lastChildNode?.asAnchorShape ?? this.prevSiblingShape
  }
}
