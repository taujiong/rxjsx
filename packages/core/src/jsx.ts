/* eslint-disable @typescript-eslint/no-empty-interface */

import {
  ElementRenderNode,
  FragmentRenderNode,
  FunctionRenderNode,
  TextRenderNode,
} from './nodes/index.js'
import { RenderNode } from './render/index.js'

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
export type JsxElement = JsxText | RenderNode | null | undefined | false

const TEXT_TYPES = ['string', 'number', 'bigint']
const isJsxText = (val: unknown): val is JsxText => {
  return TEXT_TYPES.includes(typeof val)
}

export const convertToRenderNode = (child: JsxElement): RenderNode | undefined => {
  if (child === null || child === undefined || child === false) return

  if (child instanceof RenderNode) return child

  if (isJsxText(child)) {
    return new TextRenderNode({
      content: child,
    })
  }

  throw new Error(`invalid child type: ${typeof child}`)
}

export const createRenderNode = (
  type: string | FragmentType | Function,
  props: any
): RenderNode => {
  if (typeof type === 'function') {
    return new FunctionRenderNode({
      fn: type as () => RenderNode,
      props,
    })
  }

  const { children, ...restProps } = props
  const wrappedChildren = Array.isArray(children) ? children : [children]
  const childNodes = wrappedChildren
    .map(convertToRenderNode)
    .filter((node) => node !== undefined) as RenderNode[]

  if (type === Fragment) {
    return new FragmentRenderNode(null, childNodes)
  }

  return new ElementRenderNode(
    {
      type,
      props: restProps,
    },
    childNodes
  )
}
