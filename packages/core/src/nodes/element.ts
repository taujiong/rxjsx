import { ConcreteRenderNode, Renderer } from '../render/index.js'
import type { ElementShape, Shape } from '../render/shape.js'

interface ElementRenderContext {
  type: string
  props: {}
}

export class ElementRenderNode extends ConcreteRenderNode<ElementRenderContext> {
  public override get asParentShape(): ElementShape {
    return this.shape
  }

  protected override createShape(): Shape {
    const renderer = Renderer.current

    const shape = renderer.createElement(this.ctx.type)
    Object.entries(this.ctx.props).forEach(([name, value]) => {
      const disposer = renderer.setAttribute(shape, name, value)
      if (disposer) {
        this.disposers ??= []
        this.disposers.push(disposer)
      }
    })

    return shape
  }
}
