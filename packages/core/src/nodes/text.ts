import { isObservable } from 'rxjs'
import type { JsxText } from '../jsx.js'
import type { ElementShape, Shape } from '../render/index.js'
import { ConcreteRenderNode, Renderer } from '../render/index.js'
import type { ObservableMaybe } from '../utils.js'

interface TextRenderContext {
  content: ObservableMaybe<JsxText>
}

export class TextRenderNode extends ConcreteRenderNode<TextRenderContext> {
  public override get asParentShape(): ElementShape {
    throw new Error('text shape can not be used as a parent shape')
  }

  protected override createShape(): Shape {
    const renderer = Renderer.current
    const content = this.ctx.content
    let shape: Shape

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
