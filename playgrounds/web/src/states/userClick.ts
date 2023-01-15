import { fromEvent, map } from 'rxjs'

export const userClickEvent$ = fromEvent<MouseEvent>(document, 'click')
export const currentClickedElement$ = userClickEvent$.pipe(map((event) => event.target as Element))
