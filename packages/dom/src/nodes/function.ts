import type { FunctionRenderContext, RenderNode, Shape } from '@rxjsx/core'
import { convertToRenderNode } from '@rxjsx/core'
import type { Observable } from 'rxjs'
import { combineLatest, isObservable } from 'rxjs'
import { ContainerRenderNode } from './base.js'

export class DomFunctionRenderNode<TProps extends {}> extends ContainerRenderNode<
  FunctionRenderContext<TProps>
> {
  private _internalNode: RenderNode | null = null

  public override get asAnchorShape(): Shape | null {
    if (!this.isConnected) return this.prevSiblingShape

    return this._internalNode?.asAnchorShape ?? this.prevSiblingShape
  }

  protected internalActivate(props: TProps): void {
    const jsxElement = this.ctx.fn(props)
    this._internalNode = convertToRenderNode(jsxElement) ?? null
    if (!this._internalNode) return

    this._internalNode.parentNode = this
    this._internalNode.activate()
  }

  protected internalDeactivate(): void {
    this._internalNode?.deactivate()
    this._internalNode = null
  }

  protected override beforeChildrenActivate(): void {
    super.beforeChildrenActivate()
    const observableProps = Object.entries(this.ctx.props).filter((entry) => isObservable(entry[1]))
    if (observableProps.length === 0) {
      this.internalActivate(this.ctx.props)
    } else {
      const newProps$ = combineLatest(
        Object.fromEntries(observableProps) as Record<string, Observable<any>>
      )
      const subscription = newProps$.subscribe((newProps) => {
        const fullProps = {
          ...this.ctx.props,
          ...newProps,
        }

        this.internalDeactivate()
        this.internalActivate(fullProps)
      })
      this.disposers.push(() => subscription.unsubscribe())
    }
  }

  public override afterChildrenDeactivate(): void {
    super.afterChildrenDeactivate()
    this.internalDeactivate()
  }
}
