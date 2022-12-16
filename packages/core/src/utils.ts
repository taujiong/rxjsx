import type { JsxElement } from './jsx.js'

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export type FC<TProps extends {} | undefined = {}> = (
  props: TProps & { children?: JsxElement | JsxElement[] }
) => JsxElement