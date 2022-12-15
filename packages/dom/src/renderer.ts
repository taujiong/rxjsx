/* eslint-disable @typescript-eslint/no-empty-interface */

import type { DisposeFn, ElementShape, JsxText, Shape, TextShape } from '@rxjsx/core'
import { createRenderFn, isFunction, Renderer } from '@rxjsx/core'
import { isEvent, isSvg } from './utils.js'

declare module '@rxjsx/core' {
  interface ElementShape extends Element {}
  interface TextShape extends Text {}
}

class DomRenderer extends Renderer {
  public createElement(elementName: string): ElementShape {
    return isSvg(elementName)
      ? document.createElementNS('http://www.w3.org/2000/svg', elementName)
      : document.createElement(elementName)
  }
  public setAttribute(shape: ElementShape, key: string, value: any): DisposeFn | undefined {
    if (key === 'style') {
      const element = shape as HTMLElement
      if (typeof value === 'string') element.style.cssText = value
      else {
        element.style.cssText = ''
        Object.assign(element.style, value)
      }

      return
    }

    if (isEvent(key, shape)) {
      if (!isFunction(value)) {
        throw new Error(`${key} is recognized as an event, but its value is not a function`)
      }

      const eventName = key.substring(2).toLowerCase()
      shape.addEventListener(eventName, value)

      return () => shape.removeEventListener(eventName, value)
    }

    shape.setAttribute(key, value)
    return
  }
  public removeAttribute(shape: ElementShape, key: string): void {
    shape.removeAttribute(key)
  }
  public createText(text: JsxText): TextShape {
    return document.createTextNode(String(text))
  }
  public updateText(shape: TextShape, text: JsxText): void {
    shape.textContent = String(text)
  }
  public appendToParent(parentShape: ElementShape | null, shape: Shape): void {
    const finalParentShape = parentShape ?? this.rootShape
    finalParentShape.appendChild(shape)
  }
  public insertAfter(
    parentShape: ElementShape | null,
    anchorShape: Shape | null,
    shape: Shape
  ): void {
    const shouldAppend = !parentShape || !anchorShape
    const finalParentShape = parentShape ?? this.rootShape

    if (shouldAppend) {
      finalParentShape.append(shape)
      return
    }

    const nextNode = anchorShape ? anchorShape.nextSibling : finalParentShape.firstChild
    if (nextNode) {
      finalParentShape.insertBefore(nextNode, shape)
    } else {
      finalParentShape.appendChild(shape)
    }
  }
  public remove(_: ElementShape | null, shape: Shape): void {
    shape.remove()
  }
}

export const render = (root: ElementShape) => createRenderFn(root, DomRenderer)
