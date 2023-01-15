import { isObservable } from 'rxjs'
import { registerCustomComponet } from '../jsx.js'
import { FunctionRenderNode } from '../nodes/index.js'
import type { ElementShape, Shape } from '../render/index.js'
import type { FC, ObservableMaybe } from '../utils.js'

interface PortalProps {
  parentShape: ObservableMaybe<ElementShape>
}

class PortalRenderNode extends FunctionRenderNode<PortalProps> {
  private _currentParentShape: ElementShape | null = null

  public override get asParentShape(): Shape | null {
    return this._currentParentShape
  }

  protected override get parentShape(): ElementShape | null {
    return this._currentParentShape
  }

  public override get asAnchorShape(): Shape | null {
    return this.prevSiblingShape
  }

  public override activate(): void {
    this.preAttach()

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

    this.attach()
    this.postAttach()
  }
}

export const Portal: FC<PortalProps> = (props) => {
  return new PortalRenderNode({
    fn: (props) => <>{props.children}</>,
    props,
  })
}

registerCustomComponet(Portal)
