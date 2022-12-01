import { expect, it } from 'vitest'
import { data } from './index.js'

it('should work', () => {
  const root = ['rxjsx for cli']
  root.push(data)
  const content = root.join('\n')

  expect(content).contains(data)
})
