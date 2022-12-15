export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}
