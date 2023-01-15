import type { DisposeFn } from '../hooks/index.js'
import { Renderer } from './renderer.js'
import type { ElementShape, Shape } from './shape.js'

export abstract class RenderNode<TContext = any> {
  public constructor(protected ctx: TContext, protected childNodes?: RenderNode[]) {
    let prevSiblingNode: RenderNode | null = null
    this.childNodes?.forEach((childNode) => {
      childNode.parentNode = this
      childNode.prevSiblingNode = prevSiblingNode
      prevSiblingNode = childNode
    })
  }

  protected isConnected = false
  private _shape: Shape | null = null
  protected get shape(): Shape {
    if (this._shape) return this._shape
    throw new Error('shape has not been created yet')
  }

  public abstract get asParentShape(): Shape | null
  public parentNode: RenderNode | null = null
  protected get parentShape(): ElementShape | null {
    return this.parentNode?.asParentShape ?? null
  }

  public abstract get asAnchorShape(): Shape | null
  protected prevSiblingNode: RenderNode | null = null
  protected get prevSiblingShape(): Shape | null {
    if (this.prevSiblingNode) return this.prevSiblingNode.asAnchorShape
    if (this.parentNode instanceof ContainerRenderNode && this.parentNode.isConnected)
      return this.parentNode.prevSiblingShape
    return null
  }

  private _disposers?: DisposeFn[]
  protected get disposers() {
    if (this._disposers === undefined) this._disposers = []
    return this._disposers
  }

  public activate(): void {
    this.preAttach()
    this.childNodes?.forEach((childNode) => childNode.activate())
    this.attach()
    this.postAttach()
  }

  public deactivate(): void {
    this.preDetach()
    /**
     * without a settimeout, the execution order becomes:
     *    1. parentNode pre detach
     *    2. parentNode detach and post detach
     *    3. each of childNode pre detach, detach and post detach
     * with a settimeout, the execution order becomes:
     *    1. parentNode pre detach
     *    2. each of childNode pre detach
     *    3. parentNode detach and post detach
     *    4. each of childNode detach and post detach
     * in the context of web, if the parentNode remove first, fewer repaint occurs
     */
    setTimeout(() => {
      this.detach()
      this.postDetach()
      setTimeout(() => {
        this._shape = null
      }, 0)
    }, 0)
    this.childNodes?.forEach((childNode) => childNode.deactivate())
  }

  protected abstract createShape(): Shape
  protected preAttach() {
    this._shape = this.createShape()
  }
  protected attach() {
    Renderer.current.insertAfter(this.parentShape, this.prevSiblingShape, this.shape!)
    this.isConnected = true
  }
  protected postAttach() {}

  protected preDetach() {
    this._disposers?.forEach((dispose) => dispose())
  }
  protected detach() {
    Renderer.current.remove(this.parentShape, this._shape!)
    this.isConnected = false
  }
  protected postDetach() {}
}

export abstract class ConcreteRenderNode<TContext = any> extends RenderNode<TContext> {
  public override get asParentShape(): Shape | null {
    return this.shape
  }

  public override get asAnchorShape(): Shape | null {
    if (this.isConnected) return this.shape
    return this.prevSiblingShape
  }
}

export abstract class ContainerRenderNode<TContext = any> extends RenderNode<TContext> {
  protected override createShape(): Shape {
    return Renderer.current.createContainerElement()
  }

  // TODO only works for web since the container disappears when connected
  public override get asParentShape(): Shape | null {
    if (!this.isConnected) return this.shape

    return this.parentShape
  }
}
