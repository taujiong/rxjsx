import { fromEvent } from 'rxjs'

export const userClickEvent$ = fromEvent<MouseEvent>(document, 'click')
