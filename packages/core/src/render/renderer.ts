import type { DisposeFn } from '../hooks/dispose.js'
import type { JsxElement, JsxText } from '../jsx.js'
import { convertToRenderNode } from '../jsx.js'
import { TextRenderNode } from '../nodes/index.js'
import type { RenderNode } from './node.js'
import type { ContainerShape, ElementShape, Shape, TextShape } from './shape.js'

export abstract class Renderer {
  public static current: Renderer

  public constructor(protected rootShape: ElementShape) {}

  // element ops
  public abstract createElement(elementName: string): ElementShape
  public abstract createContainerElement(): ContainerShape
  public abstract setAttribute(shape: ElementShape, key: string, value: any): DisposeFn | undefined
  public abstract removeAttribute(shape: ElementShape, key: string): void

  // text ops
  public abstract createText(text: JsxText): TextShape
  public abstract updateText(shape: TextShape, text: JsxText): void

  // place ops
  public abstract appendToParent(parentShape: ElementShape | null, shape: Shape): void
  public abstract insertAfter(
    parentShape: ElementShape | null,
    anchorShape: Shape | null,
    shape: Shape
  ): void
  public abstract remove(parentShape: ElementShape | null, shape: Shape): void
}

export interface RenderRoot {
  render: (element: JsxElement) => void
  destroy: () => void
}

export const createCoreRenderRoot = (
  root: ElementShape,
  RendererImplCls: new (root: ElementShape) => Renderer
): RenderRoot => {
  Renderer.current = new RendererImplCls(root)
  let renderNode: RenderNode | null = null

  return {
    render(element) {
      renderNode =
        convertToRenderNode(element) ??
        new TextRenderNode({
          content: 'Attention: an element with no concrete shape was passed to the root',
        })

      renderNode.activate()
    },
    destroy() {
      renderNode?.deactivate()
      renderNode = null
    },
  }
}
