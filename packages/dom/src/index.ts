import { setupRenderContext } from '@rxjsx/core'
import { DomElementRenderNode } from './nodes/element.js'
import { DomFragmentRenderNode } from './nodes/fragment.js'
import { DomFunctionRenderNode } from './nodes/function.js'
import { DomTextRenderNode } from './nodes/text.js'
import { DomRenderer } from './renderer.js'

export * from './components/index.js'
export type { EventHandler } from './jsx/jsx.js'
export * from './renderer.js'

setupRenderContext({
  Renderer: DomRenderer,
  ElementRenderNode: DomElementRenderNode,
  TextRenderNode: DomTextRenderNode,
  FragmentRenderNode: DomFragmentRenderNode,
  FunctionRenderNode: DomFunctionRenderNode,
})
