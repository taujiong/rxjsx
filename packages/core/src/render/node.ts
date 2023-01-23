import type { DisposeFn } from '../hooks/dispose.js'
import type { Shape } from './shape.js'

export abstract class RenderNode<TContext = any, TShape extends Shape = Shape> {
  /**
   * fundmental object to decide:
   * 1. how to create a shape
   * 2. when to attach the shape
   * 3. where to attach the shape
   * 4. when to detach the shape
   * 5. how to detach the shape
   * @param ctx extra information that used to create a shape
   * @param childNodes child nodes in the node tree
   */
  public constructor(protected ctx: TContext, public childNodes?: RenderNode[]) {
    let prevSiblingNode: RenderNode | null = null
    this.childNodes?.forEach((childNode) => {
      childNode.parentNode = this
      childNode.prevSiblingNode = prevSiblingNode
      prevSiblingNode = childNode
    })
  }

  /**
   * whether the shape is connected to the shape tree
   */
  public abstract get isConnected(): boolean
  private _shape: TShape | null = null
  /**
   * the ui element that can be seen or interacted in the render context
   *
   * in the context of web, a shape is a [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
   */
  public get shape(): TShape {
    if (this._shape) return this._shape
    throw new Error('shape has not been created yet')
  }

  /**
   * create shape
   */
  protected abstract createShape(): TShape

  /**
   * ensure the shape is created
   * @returns the shape is created in this invocation
   */
  protected ensureShapeCreated(): boolean {
    if (this._shape) return false

    this._shape = this.createShape()
    return true
  }

  /**
   * the shape to be attached to when child shape wants to connect to the shape tree
   */
  public abstract get asParentShape(): Shape | null
  /**
   * the parent node in the node tree
   */
  public parentNode: RenderNode | null = null
  /**
   * the shape to attach to when this.{@link shape} wants to connect to the shape tree
   */
  public get parentShape(): Shape | null {
    return this.parentNode?.asParentShape ?? null
  }

  /**
   * the shape that will be used as an anchor,
   * to get the accurate position when  wants to connect to the shape tree
   */
  public abstract get asAnchorShape(): Shape | null
  /**
   * the previous sibling node in the node tree
   */
  public prevSiblingNode: RenderNode | null = null
  /**
   * the shape that will be used as an anchor,
   * to get the accurate position when child shape wants to connect to the shape tree
   */
  public get prevSiblingShape(): Shape | null {
    return this.prevSiblingNode?.asAnchorShape ?? null
  }

  private _disposers?: DisposeFn[]
  /**
   * functions that will be executed when this node deactivates,
   * usually used to remove event listeners or clear side effects
   */
  protected get disposers(): DisposeFn[] {
    if (this._disposers === undefined) this._disposers = []
    return this._disposers
  }
  protected dispose(): void {
    this._disposers?.forEach((dispose) => dispose())
  }

  /**
   * connect the shape to the shape tree
   */
  public activate(): void {
    this.beforeChildrenActivate()
    this.childNodes?.forEach((childNode) => childNode.activate())
    this.afterChildrenActivate()
  }

  /**
   * before child nodes activate
   */
  protected beforeChildrenActivate(): void {}
  /**
   * after child nodes activate
   */
  protected afterChildrenActivate(): void {}

  /**
   * disconnect the shape from the shape tree
   */
  public deactivate(): void {
    this.beforeChildrenDeactivate()
    this.childNodes?.forEach((childNode) => childNode.deactivate())
    this.afterChildrenDeactivate()
  }

  /**
   * before child nodes deactivate
   */
  protected beforeChildrenDeactivate(): void {}
  /**
   * after child nodes deactivate
   */
  protected afterChildrenDeactivate(): void {}
}
