import type { Shape } from '../shape.js'
import { EmptyShape } from '../shape.js'
import { RenderNode } from './base.js'

export class FragmentRenderNode extends RenderNode<null> {
  protected createShape(): Shape {
    return EmptyShape
  }
}
