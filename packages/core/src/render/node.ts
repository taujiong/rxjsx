import type { DisposeFn } from '../hooks/index.js'
import { Renderer } from './renderer.js'
import type { ElementShape, Shape } from './shape.js'

export abstract class RenderNode<TContext = any> {
  public constructor(protected ctx: TContext, protected childNodes?: RenderNode[]) {
    console.log(ctx)

    let prevSiblingNode: RenderNode | null = null
    this.childNodes?.forEach((childNode) => {
      childNode.parentNode = this
      childNode.prevSiblingNode = prevSiblingNode
      prevSiblingNode = childNode
    })
  }

  private _isRoot = false
  public markAsRoot(): void {
    this._isRoot = true
  }

  private _parentNode: RenderNode | null = null
  public get parentNode(): RenderNode | null {
    if (this._parentNode) return this._parentNode
    if (this._isRoot) return null
    throw new Error('parent node has not been set yet')
  }
  public set parentNode(node: RenderNode | null) {
    if (node === null) throw new Error('type null can not be set as a parent node')
    this._parentNode = node
  }

  private prevSiblingNode: RenderNode | null = null

  public abstract get asParentShape(): ElementShape | null
  public get parentShape(): ElementShape | null {
    if (this._isRoot) return null
    return this.parentNode!.asParentShape
  }

  public abstract get asAnchorShape(): Shape | null
  public get prevSiblingShape(): Shape | null {
    if (!this.prevSiblingNode) return null
    return this.prevSiblingNode.asAnchorShape
  }

  protected disposers?: DisposeFn[]

  public activate(): void {
    this.childNodes?.forEach((childNode) => childNode.activate())
  }

  public deactivate(): void {
    this.childNodes?.forEach((childNode) => childNode.deactivate())
    this.disposers?.forEach((dispose) => dispose())
  }
}

export abstract class ConcreteRenderNode<TContext = any> extends RenderNode<TContext> {
  private _shape: Shape | null = null
  protected get shape(): Shape {
    if (this._shape) return this._shape
    throw new Error('shape has not been created yet')
  }

  public override get asAnchorShape() {
    return this.shape
  }

  public abstract override get asParentShape(): ElementShape
  protected abstract createShape(): Shape

  protected attach(): void {
    const renderer = Renderer.current
    console.log(this)

    renderer.insertAfter(this.parentShape, this.prevSiblingShape, this.shape!)
  }

  protected detach(): void {
    const renderer = Renderer.current
    renderer.remove(this.parentShape, this._shape!)
  }

  public override activate(): void {
    this._shape = this.createShape()
    super.activate()
    this.attach()
  }

  public override deactivate(): void {
    // TODO: think about the order
    super.deactivate()
    this.detach()
  }
}

export abstract class ContainerRenderNode<TContext = any> extends RenderNode<TContext> {
  public override get asParentShape() {
    return this.parentShape
  }
}
