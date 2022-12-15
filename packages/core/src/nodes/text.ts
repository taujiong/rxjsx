import type { JsxText } from '../jsx.js'
import type { ElementShape, Shape } from '../render/index.js'
import { ConcreteRenderNode, Renderer } from '../render/index.js'

interface TextRenderContext {
  content: JsxText
}

export class TextRenderNode extends ConcreteRenderNode<TextRenderContext> {
  public override get asParentShape(): ElementShape {
    throw new Error('text shape can not be used as a parent shape')
  }

  protected override createShape(): Shape {
    const renderer = Renderer.current
    const content = this.ctx.content
    const shape = renderer.createText(content)

    return shape
  }
}
