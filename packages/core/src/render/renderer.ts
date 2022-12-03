import type { JsxElement, JsxText } from '../jsx.js'
import { convertToRenderNode } from '../jsx.js'
import { RenderNode, TextRenderNode } from './nodes/index.js'
import type { ConcreteShape, ElementShape, Shape, TextShape } from './shape.js'

/**
 * interface to be implemented for specific runtime context,
 * to create or place {@link Shape}
 */
export interface Renderer {
  // element ops
  createElement: (elementName: string) => ElementShape
  setAttribute: (ele: ElementShape, key: string, value: any) => (() => void) | undefined
  removeAttribute: (ele: ElementShape, key: string) => void

  // text ops
  createText: (text: JsxText) => TextShape
  updateText: (shape: TextShape, text: JsxText) => void

  // place ops
  appendToParent: (parent: ElementShape, shape: ConcreteShape) => void
  insertAfter: (parent: ElementShape, anchor: ConcreteShape, shape: ConcreteShape) => void
  remove: (parent: ElementShape | null, shape: ConcreteShape) => void
}

export interface RenderRoot {
  root: ElementShape
  render: (element: JsxElement) => void
}

/**
 * create {@link RenderRoot} to render the whole render tree created by jsx
 * @param root the root shape that the whole render tree will attach to
 * @param renderer implementation for specific runtime context to create or place {@link Shape}
 */
export const createRenderRoot = (root: ElementShape, renderer: Renderer): RenderRoot => {
  RenderNode.renderer = renderer

  return {
    root,
    render: (element) => {
      const renderNode =
        convertToRenderNode(element) ??
        new TextRenderNode({
          content: 'Attention: an element with no concrete shape was passed to the root',
        })

      renderNode.markAsRoot()
      renderNode.render(root)
    },
  }
}
