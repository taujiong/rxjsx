import type { Observable } from 'rxjs'
import { combineLatest, isObservable } from 'rxjs'
import { convertToRenderNode } from '../jsx.js'
import type { RenderNode, Shape } from '../render/index.js'
import { ContainerRenderNode } from '../render/index.js'
import type { FC } from '../utils.js'

interface FunctionRenderContext {
  fn: FC
  props: {}
}

export class FunctionRenderNode extends ContainerRenderNode<FunctionRenderContext> {
  private _internalNode: RenderNode | null = null

  public get asAnchorShape(): Shape | null {
    if (!this._internalNode) throw new Error('node has not been activated yet')
    return this._internalNode.asAnchorShape
  }

  private internalActivate(props: {}): void {
    const jsxElement = this.ctx.fn(props)
    this._internalNode = convertToRenderNode(jsxElement) ?? null
    if (!this._internalNode) return

    this._internalNode.parentNode = this
    this._internalNode.activate()
  }

  private internalDeactivate(): void {
    this._internalNode?.deactivate()
    this._internalNode = null
  }

  public override activate(): void {
    const observableProps = Object.entries(this.ctx.props).filter((entry) => isObservable(entry[1]))

    if (observableProps.length === 0) {
      this.internalActivate(this.ctx.props)
      return
    }

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

  public override deactivate(): void {
    this.internalDeactivate()
    super.deactivate()
  }
}
