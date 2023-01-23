import type { ObservableMaybe } from '../utils/reactivity.js'
import type { FC, JsxText } from './jsx.js'
import type { RenderNode } from './node.js'
import type { ElementShape, FragmentShape, Renderer, Shape, TextShape } from './shape.js'

export interface ElementRenderContext {
  type: string
  props: {}
}

export interface TextRenderContext {
  content: ObservableMaybe<JsxText>
}

export interface FunctionRenderContext<TProps extends {} = {}> {
  fn: FC<TProps>
  props: TProps
}

type RenderNodeImplCls<TContext, TShape extends Shape> = new (
  ctx: TContext,
  childNodes?: RenderNode[]
) => RenderNode<TContext, TShape>

export const renderContext = {
  Renderer: null as any as new (root: Shape) => Renderer,
  ElementRenderNode: null as any as RenderNodeImplCls<ElementRenderContext, ElementShape>,
  TextRenderNode: null as any as RenderNodeImplCls<TextRenderContext, TextShape>,
  FragmentRenderNode: null as any as RenderNodeImplCls<null, FragmentShape>,
  FunctionRenderNode: null as any as RenderNodeImplCls<FunctionRenderContext, Shape>,
}

export const setupRenderContext = (implCls: typeof renderContext) => {
  Object.assign(renderContext, implCls)
}
