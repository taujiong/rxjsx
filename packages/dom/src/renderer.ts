/* eslint-disable @typescript-eslint/no-empty-interface */

import type { ElementShape, Renderer } from '@rxjsx/core'
import { createRenderRoot, isFunction } from '@rxjsx/core'
import { isEvent, isSvg } from './utils.js'

declare module '@rxjsx/core' {
  interface ElementShape extends Element {}
  interface TextShape extends Text {}
}

const domRenderer: Renderer = {
  createElement: (elementName) => {
    return isSvg(elementName)
      ? document.createElementNS('http://www.w3.org/2000/svg', elementName)
      : document.createElement(elementName)
  },
  setAttribute: (ele, key, value) => {
    if (key === 'style') {
      const element = ele as HTMLElement
      if (typeof value === 'string') element.style.cssText = value
      else {
        element.style.cssText = ''
        Object.assign(element.style, value)
      }

      return
    }

    if (isEvent(key, ele)) {
      if (!isFunction(value)) {
        throw new Error(`${key} is recognized as an event, but its value is not a function`)
      }

      const eventName = key.substring(2).toLowerCase()
      ele.addEventListener(eventName, value)

      return () => ele.removeEventListener(eventName, value)
    }

    ele.setAttribute(key, value)
    return
  },
  removeAttribute: (ele, key) => {
    ele.removeAttribute(key)
  },
  createText: (text) => {
    return document.createTextNode(String(text))
  },
  updateText: (node, text) => {
    node.textContent = String(text)
  },
  appendToParent: (parent, node) => {
    parent.appendChild(node)
  },
  insertAfter: (parent, anchor, node) => {
    const nextNode = anchor.nextSibling
    if (nextNode) {
      parent.insertBefore(nextNode, node)
    } else {
      parent.appendChild(node)
    }
  },
  remove: (_, node) => {
    node.remove()
  },
}

export const createRoot = (root: ElementShape) => createRenderRoot(root, domRenderer)
