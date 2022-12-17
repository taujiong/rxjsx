import { BehaviorSubject } from 'rxjs'
import { isFunction } from '../utils.js'

export type Dispatch<TAction> = (value: TAction) => void
export type Reducer<TState, TAction> = (prevState: TState, action: TAction) => TState
export type ReducerState<TReducer extends Reducer<any, any>> = TReducer extends Reducer<
  infer TState,
  any
>
  ? TState
  : never
export type ReducerAction<TReducer extends Reducer<any, any>> = TReducer extends Reducer<
  any,
  infer TAction
>
  ? TAction
  : never
export type ReducerOutputSelectMode = 'state' | 'stream' | 'all'
export interface ReducerOutput<TReducer extends Reducer<any, any>> {
  select: <TMode extends ReducerOutputSelectMode>(
    mode: TMode
  ) => TMode extends 'state'
    ? [() => ReducerState<TReducer>, Dispatch<ReducerAction<TReducer>>]
    : TMode extends 'stream'
    ? [BehaviorSubject<ReducerState<TReducer>>, Dispatch<ReducerAction<TReducer>>]
    : TMode extends 'all'
    ? [
        () => ReducerState<TReducer>,
        BehaviorSubject<ReducerState<TReducer>>,
        Dispatch<ReducerAction<TReducer>>
      ]
    : never
}

export const useReducer = <TReducer extends Reducer<any, any>, TInput = any>(
  reducer: TReducer,
  initialArgOrState: TInput,
  initialFn?: (input: TInput) => ReducerState<TReducer>
): ReducerOutput<TReducer> => {
  const state = initialFn
    ? initialFn(initialArgOrState)
    : (initialArgOrState as ReducerState<TReducer>)
  const state$ = new BehaviorSubject(state)
  const dispatch = (action: ReducerAction<TReducer>) => {
    state$.next(reducer(state$.getValue(), action))
  }

  return {
    select(mode: ReducerOutputSelectMode) {
      switch (mode) {
        case 'state':
          return [() => state$.getValue(), dispatch]
        case 'stream':
          return [state$, dispatch]
        case 'all':
        default:
          return [() => state$.getValue(), state$, dispatch]
      }
    },
  } as any
}

export type SetStateAction<TState> = TState | ((prevState: TState) => TState)
export function useState<TState>(): ReducerOutput<
  Reducer<TState | undefined, SetStateAction<TState | undefined>>
>
export function useState<TState>(
  initialState: TState | (() => TState)
): ReducerOutput<Reducer<TState, SetStateAction<TState>>>
export function useState<TState>(initialState?: TState | (() => TState)) {
  const state = isFunction(initialState) ? initialState() : initialState
  const reducer: Reducer<TState, SetStateAction<TState>> = (prevState, action) => {
    return isFunction(action) ? action(prevState) : action
  }

  return useReducer(reducer, state)
}
