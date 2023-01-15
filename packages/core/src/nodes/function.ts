import type { Observable } from 'rxjs'
import { combineLatest, isObservable } from 'rxjs'
import { convertToRenderNode } from '../jsx.js'
import type { RenderNode, Shape } from '../render/index.js'
import { ContainerRenderNode } from '../render/index.js'
import type { FC } from '../utils.js'

interface FunctionRenderContext<TProps extends {}> {
  fn: FC<TProps>
  props: TProps
}

export class FunctionRenderNode<TProps extends {} = {}> extends ContainerRenderNode<
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

  public override activate(): void {
    this.preAttach()

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

    this.attach()
    this.postAttach()
  }

  public override deactivate(): void {
    this.preDetach()
    this.internalDeactivate()
    this.detach()
    this.postAttach()
  }
}
