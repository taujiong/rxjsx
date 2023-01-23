import type { JsxText } from '../render/jsx.js'

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

const TEXT_TYPES = ['string', 'number', 'bigint']
export const isJsxText = (val: unknown): val is JsxText => {
  return TEXT_TYPES.includes(typeof val)
}
