import type { FragmentShape, Shape } from '@rxjsx/core'
import { Renderer, RenderNode } from '@rxjsx/core'

abstract class DomRenderNode<TContext = any, TShape extends Shape = Shape> extends RenderNode<
  TContext,
  TShape
> {
  public override get prevSiblingShape(): Shape | null {
    if (this.prevSiblingNode) return this.prevSiblingNode.asAnchorShape
    if (this.parentNode instanceof ContainerRenderNode && this.parentNode.isConnected)
      return this.parentNode.prevSiblingShape
    return null
  }

  protected override beforeChildrenActivate(): void {
    this.ensureShapeCreated()
  }

  protected override afterChildrenActivate(): void {
    Renderer.current.insertAfter(this.parentShape, this.prevSiblingShape, this.shape)
  }

  protected override beforeChildrenDeactivate(): void {
    this.dispose()
    Renderer.current.remove(this.parentShape, this.shape)
  }
}

export abstract class ConcreteRenderNode<
  TContext = any,
  TShape extends Shape = Shape
> extends DomRenderNode<TContext, TShape> {
  public override get isConnected(): boolean {
    return this.shape.isConnected
  }

  public override get asParentShape(): Shape | null {
    return this.shape
  }

  public override get asAnchorShape(): Shape | null {
    if (this.isConnected) return this.shape
    return this.prevSiblingShape
  }

  protected override beforeChildrenDeactivate(): void {
    super.beforeChildrenDeactivate()
    Renderer.current.remove(this.parentShape, this.shape)
  }
}

export abstract class ContainerRenderNode<TContext = any> extends DomRenderNode<
  TContext,
  FragmentShape
> {
  private _isConnnected = false

  public override get isConnected(): boolean {
    return this._isConnnected
  }

  protected override afterChildrenActivate(): void {
    super.afterChildrenActivate()
    this._isConnnected = true
  }

  protected override afterChildrenDeactivate(): void {
    super.afterChildrenDeactivate()
    this._isConnnected = false
  }

  protected override createShape(): FragmentShape {
    return Renderer.current.createFragment()
  }

  public override get asParentShape(): Shape | null {
    if (!this.isConnected) return this.shape

    return this.parentShape
  }
}
