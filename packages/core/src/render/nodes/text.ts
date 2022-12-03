import type { JsxText } from '../../jsx.js'
import type { Shape } from '../shape.js'
import { RenderNode } from './base.js'

interface TextRenderContext {
  content: JsxText
}

export class TextRenderNode extends RenderNode<TextRenderContext> {
  protected createShape(): Shape {
    const renderer = RenderNode.renderer
    const content = this.ctx.content
    const shape = renderer.createText(content)

    return shape
  }
}
