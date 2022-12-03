import type { Shape } from '../shape.js'
import { RenderNode } from './base.js'

interface ElementRenderContext {
  type: string
  props: {}
}

export class ElementRenderNode extends RenderNode<ElementRenderContext> {
  protected createShape(): Shape {
    const renderer = RenderNode.renderer

    // create shape
    const shape = renderer.createElement(this.ctx.type)

    // set props
    Object.entries(this.ctx.props).forEach(([name, value]) => {
      const disposer = renderer.setAttribute(shape, name, value)
      if (disposer) {
        this.disposers.push(disposer)
      }
    })

    return shape
  }
}
