import type { DisposeFn } from '../hooks/dispose.js'
import type { FragmentType, JsxIntrinsicElements, JsxText } from './jsx.js'

/**
 * specific shape created from {@link JsxIntrinsicElements}
 */
export interface ElementShape {}
/**
 * specific shape created from {@link JsxText}
 */
export interface TextShape {}
/**
 * specific shape created from {@link FragmentType}
 */
export interface FragmentShape {}

export type Shape = ElementShape | TextShape | FragmentShape

export abstract class Renderer {
  public static current: Renderer

  public constructor(protected rootShape: Shape) {}

  // element ops
  public abstract createElement(elementName: string): ElementShape
  public abstract createFragment(): FragmentShape
  public abstract setAttribute(shape: Shape, key: string, value: any): DisposeFn | undefined
  public abstract removeAttribute(shape: Shape, key: string): void

  // text ops
  public abstract createText(text: JsxText): TextShape
  public abstract updateText(shape: TextShape, text: JsxText): void

  // place ops
  public abstract appendToParent(parentShape: Shape | null, shape: Shape): void
  public abstract insertAfter(
    parentShape: Shape | null,
    anchorShape: Shape | null,
    shape: Shape
  ): void
  public abstract remove(parentShape: Shape | null, shape: Shape): void
}
