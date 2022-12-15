import { ContainerRenderNode } from '../render/index.js'

export class FragmentRenderNode extends ContainerRenderNode<null> {
  public override get asAnchorShape() {
    if (!this.childNodes) return this.prevSiblingShape

    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      const node = this.childNodes[i]
      if (node.asAnchorShape) return node.asAnchorShape
      continue
    }

    return this.prevSiblingShape
  }
}
