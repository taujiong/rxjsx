import type { TextRenderContext, TextShape } from '@rxjsx/core'
import { Renderer } from '@rxjsx/core'
import { isObservable } from 'rxjs'
import { ConcreteRenderNode } from './base.js'

export class DomTextRenderNode extends ConcreteRenderNode<TextRenderContext, TextShape> {
  protected override createShape(): TextShape {
    const renderer = Renderer.current
    const content = this.ctx.content
    let shape: TextShape

    if (isObservable(content)) {
      shape = renderer.createText('')
      const subscription = content.subscribe((text) => {
        renderer.updateText(shape, text)
      })
      this.disposers.push(() => subscription.unsubscribe())
    } else {
      shape = renderer.createText(content)
    }

    return shape
  }
}
