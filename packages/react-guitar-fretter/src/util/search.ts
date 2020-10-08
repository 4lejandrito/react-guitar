import flatMap from 'lodash.flatmap'

type Expand<T> = (node: T) => T[]
type IsFinal<T> = (node: T) => boolean

function doSearch<T>(node: T, expand: Expand<T>, isFinal: IsFinal<T>): T[] {
  if (isFinal(node)) {
    return [node]
  }
  return flatMap(expand(node), node => doSearch(node, expand, isFinal))
}

export default function search<T>(
  start: T,
  expand: Expand<T>,
  isFinal: IsFinal<T>
): T[] {
  return doSearch(start, expand, isFinal)
}
