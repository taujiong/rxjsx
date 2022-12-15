import type { JsxElement } from '../jsx.js'
import { convertToRenderNode } from '../jsx.js'
import type { RenderNode, Shape } from '../render/index.js'
import { ContainerRenderNode } from '../render/index.js'

interface FunctionRenderContext {
  fn: (props: any) => JsxElement
  props: {}
}

export class FunctionRenderNode extends ContainerRenderNode<FunctionRenderContext> {
  private _internalNode: RenderNode | null = null

  public get asAnchorShape(): Shape | null {
    if (!this._internalNode) throw new Error('node has not been activated yet')
    return this._internalNode.asAnchorShape
  }

  public override activate(): void {
    const jsxElement = this.ctx.fn(this.ctx.props)
    this._internalNode = convertToRenderNode(jsxElement) ?? null
    if (!this._internalNode) return

    this._internalNode.parentNode = this
    this._internalNode.activate()
  }

  public override deactivate(): void {
    this._internalNode?.deactivate()
    this._internalNode = null
    super.deactivate()
  }
}
