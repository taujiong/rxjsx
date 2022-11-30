import { data as coreData } from '@rxjsx/core'
import { data as domData } from '@rxjsx/dom'

const createNode = (text: string) => {
  const ele = document.createElement('div')
  ele.innerHTML = text
  return ele
}

const root = document.getElementById('root')!
root.append(createNode(domData), createNode(coreData))
