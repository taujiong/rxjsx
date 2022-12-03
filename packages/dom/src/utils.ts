const SVG_TAG_NAMES = ['svg', 'path', 'use', 'g']
export const isSvg = (tag: string) => {
  return SVG_TAG_NAMES.includes(tag.toLowerCase())
}

export const isEvent = (name: string, ele: Element) => {
  return name.startsWith('on') && Reflect.has(ele, name.toLowerCase())
}
