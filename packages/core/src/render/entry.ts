import { renderContext } from './context.js'
import type { JsxElement } from './jsx.js'
import { convertToRenderNode } from './jsx.js'
import type { RenderNode } from './node.js'
import type { Shape } from './shape.js'
import { Renderer } from './shape.js'

export interface RenderRoot {
  render: (element: JsxElement) => void
  destroy: () => void
}

export const createCoreRenderRoot = (root: Shape): RenderRoot => {
  Renderer.current = new renderContext.Renderer(root)
  let renderNode: RenderNode | null = null

  return {
    render(element) {
      renderNode = convertToRenderNode(element) ?? null

      if (!renderNode) {
        throw new Error('an element with no concrete shape was passed to the root')
      }

      renderNode.activate()
    },
    destroy() {
      renderNode?.deactivate()
      renderNode = null
    },
  }
}
