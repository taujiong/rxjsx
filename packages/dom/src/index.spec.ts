import { queryByTestId } from '@testing-library/dom'
import { expect, it } from 'vitest'
import { data } from './index.js'

it('should work', () => {
  const root = document.createElement('div')
  const ele = document.createElement('div')
  const testid = 'variable'
  ele.setAttribute('data-testid', testid)
  ele.innerHTML = data
  root.append(ele)

  const targetEle = queryByTestId(root, testid)

  expect(targetEle).toBeTruthy()
  expect(targetEle!.innerHTML).toBe(data)
})
