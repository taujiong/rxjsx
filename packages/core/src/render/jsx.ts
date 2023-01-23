import { isObservable } from 'rxjs'
import { isJsxText } from '../utils/is.js'
import type { ObservableMaybe } from '../utils/reactivity.js'
import { renderContext } from './context.js'
import { RenderNode } from './node.js'

export const Fragment = Symbol.for('JSX.FRAGMENT')
export type FragmentType = typeof Fragment

/**
 * element type map from which {@link ElementRenderNode} created,
 * this is an internal identifier for [JSX.IntrinsicElements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements),
 * so that runtime context libs can take advantage of [declaration merge](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
 */
export interface JsxIntrinsicElements {}
/** primitive javascript types from which {@link TextRenderNode} created */
export type JsxText = string | number | bigint

/**
 * the result of a jsx expression,
 * this is an internal identifier for the [jsx result type](https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-result-type)
 */
export type JsxElement = ObservableMaybe<JsxText> | RenderNode | null | undefined | false

export interface IHasChildren {
  children?: JsxElement | JsxElement[]
}

export type FC<TProps extends {} | undefined = {}> = (props: TProps & IHasChildren) => JsxElement

export const convertToRenderNode = (child: JsxElement): RenderNode | undefined => {
  if (child === null || child === undefined || child === false) return

  if (child instanceof RenderNode) return child

  if (isJsxText(child) || isObservable(child)) {
    return new renderContext.TextRenderNode({
      content: child,
    })
  }

  throw new Error(`invalid child type: ${typeof child}`)
}

const customComponentSet = new Set<FC>()

export const registerCustomComponet = (...components: FC<any>[]) => {
  components.forEach((component) => customComponentSet.add(component))
}

export const createRenderNode = (
  type: string | FragmentType | Function,
  props: any
): RenderNode => {
  if (typeof type === 'function') {
    if (customComponentSet.has(type as FC)) return type(props)

    return new renderContext.FunctionRenderNode({
      fn: type as () => RenderNode,
      props,
    })
  }

  const { children, ...restProps } = props
  let childNodes
  if (children === undefined) {
    childNodes = undefined
  } else {
    const wrappedChildren = Array.isArray(children) ? children : [children]
    childNodes = wrappedChildren
      .map(convertToRenderNode)
      .filter((node) => node !== undefined) as RenderNode[]
  }

  if (type === Fragment) {
    return new renderContext.FragmentRenderNode(null, childNodes)
  }

  return new renderContext.ElementRenderNode(
    {
      type,
      props: restProps,
    },
    childNodes
  )
}
