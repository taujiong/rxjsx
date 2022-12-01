import { data as consoleData } from '@rxjsx/console'
import { data as coreData } from '@rxjsx/core'

const root = ['rxjsx for cli']
root.push(coreData, consoleData)
const content = root.join('\n')

console.log(content)
