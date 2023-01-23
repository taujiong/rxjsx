import type { ElementRenderContext, ElementShape } from '@rxjsx/core'
import { Renderer } from '@rxjsx/core'
import { isObservable } from 'rxjs'
import { ConcreteRenderNode } from './base.js'

export class DomElementRenderNode extends ConcreteRenderNode<ElementRenderContext, ElementShape> {
  protected override createShape(): ElementShape {
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
