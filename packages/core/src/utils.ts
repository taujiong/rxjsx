/** assert value passed in is a function */
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}
