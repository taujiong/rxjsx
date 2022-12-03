/* eslint-disable @typescript-eslint/no-empty-interface */

import type { RenderNode } from './nodes/index.js'

/**
 * a special shape which means it is a container of other shapes,
 * it is used to differentiate from `null` which means no shape
 */
export const EmptyShape = Symbol.for('@RXJSX.EMPTY_SHAPE')
/** a specific shape created from {@link ElementRenderNode} */
export interface ElementShape {}
/** a specific shape created from {@link TextRenderNode} */
export interface TextShape {}

export type VoidShape = typeof EmptyShape
export type ConcreteShape = ElementShape | TextShape
/**
 * 1. shape is the object that created from {@link RenderNode}
 * 2. shape is the basic block that consists of the runtime context
 * 3. shape is what the user can see or can interact in the runtime context
 * 4. in the world of dom, a shape is a [node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
 * 5. in the world of console, a shape is always a string
 */
export type Shape = VoidShape | ConcreteShape
