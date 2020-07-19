export function set<T>(array: T[], pos: number, item: T): T[] {
  const newArray = array.slice(0)
  newArray[pos] = item
  return newArray
}
