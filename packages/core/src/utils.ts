import type { Observable, SubjectLike } from 'rxjs'
import type { JsxElement } from './jsx.js'

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export interface IHasChildren {
  children?: JsxElement | JsxElement[]
}

export type FC<TProps extends {} | undefined = {}> = (props: TProps & IHasChildren) => JsxElement

export type ObservableMaybe<TValue> = TValue | Observable<TValue>

type MaybeReactive<TProps extends {}> = {
  [K in keyof TProps]: ObservableMaybe<TProps[K]>
}
export const markAsReactive = <TProps extends {} = {}>(component: FC<TProps>) =>
  component as FC<MaybeReactive<TProps>>

type SelectorFn<TSource, TTarget> = (source: TSource) => TTarget
export const pipeTo = <TSource, TTarget>(
  target: SubjectLike<TTarget>,
  selectorFn?: SelectorFn<TSource, TTarget>
) => {
  return (source: TSource) => {
    const data = selectorFn ? selectorFn(source) : (source as any as TTarget)
    target.next(data)
  }
}
