import { isObservable } from 'rxjs'
import { ConcreteRenderNode, Renderer } from '../render/index.js'
import type { Shape } from '../render/shape.js'

interface ElementRenderContext {
  type: string
  props: {}
}

export class ElementRenderNode extends ConcreteRenderNode<ElementRenderContext> {
  protected override createShape(): Shape {
    const renderer = Renderer.current

    const shape = renderer.createElement(this.ctx.type)
    Object.entries(this.ctx.props).forEach(([name, value]) => {
      if (isObservable(value)) {
        const subscription = value.subscribe((val) => {
          if (val) renderer.setAttribute(shape, name, val)
          else renderer.removeAttribute(shape, name)
        })
        this.disposers.push(() => subscription.unsubscribe())
      } else {
        const disposer = renderer.setAttribute(shape, name, value)
        if (disposer) {
          this.disposers.push(disposer)
        }
      }
    })

    return shape
  }
}
