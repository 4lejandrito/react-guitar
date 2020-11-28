import { useKey as useReactUseKey } from 'react-use'

export default function useKey(
  filter: string | ((e: KeyboardEvent) => boolean),
  fn: (e: KeyboardEvent) => void,
  deps?: any[]
) {
  useReactUseKey(
    filter,
    e => {
      if (
        (e.target instanceof HTMLInputElement &&
          (e.target.type === 'text' || e.target.type === 'number')) ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }
      fn(e)
    },
    {},
    deps
  )
}
