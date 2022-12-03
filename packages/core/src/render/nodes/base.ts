import type { Renderer } from '../renderer.js'
import type { ConcreteShape, ElementShape, Shape } from '../shape.js'
import { EmptyShape } from '../shape.js'

export abstract class RenderNode<TContext = any> {
  public static renderer: Renderer

  /**
   * basic render node with common logic for {@link Shape}:
   * 1. how to create a shape
   * 2. when to attach the shape
   * 3. where to attach the shape
   * 4. when to detach the shape
   * 5. how to detach the shape
   * @param ctx render context that used to create a {@link Shape}
   */
  public constructor(protected ctx: TContext, private childNodes?: RenderNode[]) {
    this.ctx = ctx
    this.childNodes = childNodes
    let prevSiblingNode: RenderNode | null = null
    this.childNodes?.forEach((childNode) => {
      childNode.parentNode = this
      childNode.prevSiblingNode = prevSiblingNode
      prevSiblingNode = childNode
    })
  }

  private isRoot = false
  private _parentNode: RenderNode | null = null
  /** parent {@link RenderNode} in the render tree */
  public get parentNode() {
    if (!this._parentNode) {
      throw new Error('parent node has not been set yet')
    }
    return this._parentNode
  }
  public set parentNode(node: RenderNode) {
    this._parentNode = node
  }

  /** previous sibling {@link RenderNode} in the render tree */
  private prevSiblingNode: RenderNode | null = null

  private _shape: Shape | null = null
  /** shape created from the context of this {@link RenderNode} */
  public get shape(): Shape | null {
    return this._shape
  }

  /** the {@link Shape} of {@link parentNode} */
  public get parentShape(): ElementShape {
    // @ts-ignore special case for the root of the render tree
    if (this._parentShape) return this._parentShape
    if (this.parentNode.shape !== EmptyShape) return this.parentNode.shape!
    return this.parentNode.parentShape
  }
  /**
   * the {@link Shape} of the {@link prevSiblingNode},
   * it is used as an anchor to get the position when attached to the {@link parentShape}
   */
  public get prevSiblingShape(): ConcreteShape | null {
    if (!this.prevSiblingNode) return null
    const exactPrevSiblingShape = this.prevSiblingNode.shape

    return exactPrevSiblingShape === null || exactPrevSiblingShape === EmptyShape
      ? this.prevSiblingNode.prevSiblingShape
      : exactPrevSiblingShape
  }

  /**
   * functions that will be executed when this {@link RenderNode} removed,
   * usually used to remove event listeners or clear side effects
   */
  protected disposers: (() => void)[] = []

  /** mark this {@link RenderNode} as the root, which means it has no parent {@link RenderNode} */
  public markAsRoot() {
    this.isRoot = true
  }

  /**
   * render this {@link RenderNode} into a shape, attach it to the runtime shape tree
   * @param candidateParentShape the candidate {@link Shape} that will be used to get a position to atach, if not set, the {@link prevSiblingShape} and then {@link parentShape} will be used
   * @return the rendered shape in the runtime shape tree
   */
  public render(candidateParentShape?: ElementShape): Shape {
    if (this.isRoot) {
      if (!candidateParentShape) {
        throw new Error('root render node must have a parent shape when rendering')
      }
      // @ts-ignore special case for the root of the render tree
      this._parentShape = candidateParentShape
    }

    this._shape = this.createShape()
    const passThroughShape = this._shape === EmptyShape ? candidateParentShape : undefined
    this.childNodes?.forEach((childNode) => childNode.render(passThroughShape))
    this.attach(candidateParentShape)

    return this._shape
  }

  protected abstract createShape(): Shape

  /**
   * attach the {@link Shape} of this {@link RenderNode} to the runtime shape tree
   * @param candidateParentShape the same as the parameter of {@link render}
   * @returns
   */
  protected attach(candidateParentShape?: ElementShape) {
    if (this.shape === EmptyShape) return

    const renderer = RenderNode.renderer
    if (candidateParentShape) {
      renderer.appendToParent(candidateParentShape, this.shape!)
    } else if (this.prevSiblingShape) {
      renderer.insertAfter(this.parentShape, this.prevSiblingShape, this.shape!)
    } else if (this.parentShape) {
      renderer.appendToParent(this.parentShape, this.shape!)
    } else {
      throw new Error('there is no situable position to attach')
    }
  }

  /**
   * clean {@link RenderNode} and detach from the runtime shape tree
   * @return the detached shape
   */
  public remove(): Shape {
    this.childNodes?.forEach((childNode) => childNode.remove())
    this.disposers.forEach((dispose) => dispose())
    return this.detach()
  }

  /** detach from the runtime shape tree */
  protected detach(): Shape {
    const detachedShape = this.shape!
    if (detachedShape !== EmptyShape) {
      RenderNode.renderer.remove(this.parentShape, detachedShape)
    }
    this._shape = null

    return detachedShape
  }
}
