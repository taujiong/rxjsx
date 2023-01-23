import type { ElementShape, FC, ObservableMaybe, Shape } from '@rxjsx/core'
import { registerCustomComponet } from '@rxjsx/core'
import { isObservable } from 'rxjs'
import { DomFunctionRenderNode } from '../nodes/function.js'

interface PortalProps {
  parentShape: ObservableMaybe<ElementShape>
}

class PortalRenderNode extends DomFunctionRenderNode<PortalProps> {
  private _currentParentShape: ElementShape | null = null

  public override get asParentShape(): Shape | null {
    return this._currentParentShape
  }

  public override get parentShape(): ElementShape | null {
    return this._currentParentShape
  }

  public override get asAnchorShape(): Shape | null {
    return this.prevSiblingShape
  }

  protected override beforeChildrenActivate(): void {
    super.beforeChildrenActivate()
    const parentShape = this.ctx.props.parentShape
    if (!isObservable(parentShape)) {
      this._currentParentShape = parentShape
      this.internalActivate(this.ctx.props)
    } else {
      const subscription = parentShape.subscribe((newShape) => {
        this.internalDeactivate()
        this._currentParentShape = newShape as ElementShape
        this.internalActivate(this.ctx.props)
      })
      this.disposers.push(() => subscription.unsubscribe())
    }
  }
}

export const Portal: FC<PortalProps> = (props) => {
  return new PortalRenderNode({
    fn: (props) => <>{props.children}</>,
    props,
  })
}

registerCustomComponet(Portal)
