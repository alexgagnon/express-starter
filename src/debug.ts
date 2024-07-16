import { isAbsolute, basename } from 'node:path'
import Debug from 'debug'

export function getDebug(namespace: string) {
  return Debug(`app:${isAbsolute(namespace) ? basename(namespace) : namespace}`)
}
