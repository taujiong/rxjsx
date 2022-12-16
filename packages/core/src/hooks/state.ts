import { BehaviorSubject } from 'rxjs'
import { isFunction } from '../utils.js'

export type Dispatch<TAction> = (value: TAction) => void
export type Reducer<TState, TAction> = (prevState: TState, action: TAction) => TState
export type ReducerState<TReducer extends Reducer<unknown, unknown>> = TReducer extends Reducer<
  infer TState,
  unknown
>
  ? TState
  : never
export type ReducerAction<TReducer extends Reducer<unknown, unknown>> = TReducer extends Reducer<
  unknown,
  infer TAction
>
  ? TAction
  : never
export const useReducer = <TReducer extends Reducer<any, any>, TInput = unknown>(
  reducer: TReducer,
  initialArgOrState: TInput,
  initialFn?: (input: TInput) => ReducerState<TReducer>
): [BehaviorSubject<ReducerState<TReducer>>, Dispatch<ReducerAction<TReducer>>] => {
  const state = initialFn
    ? initialFn(initialArgOrState)
    : (initialArgOrState as ReducerState<TReducer>)
  const state$ = new BehaviorSubject(state)
  const dispatch = (action: ReducerAction<TReducer>) => {
    state$.next(reducer(state$.getValue(), action))
  }

  return [state$, dispatch]
}

export type SetStateAction<TState> = TState | ((prevState: TState) => TState)
export function useState<TState>(): [
  BehaviorSubject<TState | undefined>,
  Dispatch<SetStateAction<TState>>
]
export function useState<TState>(
  initialState: TState | (() => TState)
): [BehaviorSubject<TState>, Dispatch<SetStateAction<TState>>]
export function useState<TState>(initialState?: TState | (() => TState)) {
  const state = isFunction(initialState) ? initialState() : initialState
  const reducer: Reducer<TState, SetStateAction<TState>> = (prevState, action) => {
    return isFunction(action) ? action(prevState) : action
  }

  return useReducer(reducer, state)
}
