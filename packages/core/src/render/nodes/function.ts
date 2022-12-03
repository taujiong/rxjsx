import type { Shape } from '../shape.js'
import { EmptyShape } from '../shape.js'
import { RenderNode } from './base.js'

interface FunctionRenderContext {
  fn: (props: any) => RenderNode | null
  props: {}
}

export class FunctionRenderNode extends RenderNode<FunctionRenderContext> {
  private internalNode: RenderNode | null = null

  public override get shape() {
    return EmptyShape
  }

  protected createShape(): Shape {
    let shape: Shape | null = null
    this.internalNode = this.ctx.fn(this.ctx.props)
    if (this.internalNode !== null) {
      this.internalNode.parentNode = this
      shape = this.internalNode.render()
    }

    return shape === null ? EmptyShape : shape
  }
}
