import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'

type Serializer<T> = {
  deserialize: (value: string) => T
  serialize: (value: T) => string
}

export function useQuery<T>(
  name: string,
  defaultValue: T,
  serializer: Serializer<T>
) {
  const { params, state, setState } = useContext(QueryContext)
  const setValue = useCallback(
    (value: T) =>
      setState(state => ({
        ...state,
        [name]: { serializer, value, defaultValue }
      })),
    [name, serializer, defaultValue, setState]
  )
  useEffect(() => {
    const param = params.get(name)
    setValue(param ? serializer.deserialize(param) : defaultValue)
  }, [name, params, defaultValue, serializer, setValue])
  return [
    (state[name]?.value as T) ?? defaultValue,
    useCallback(
      (value: T) => {
        window.history.replaceState(
          '',
          document.title,
          window.location.pathname
        )
        setValue(value)
      },
      [setValue]
    )
  ] as const
}

export const boolean: Serializer<boolean> = {
  deserialize: value => value === 'true',
  serialize: value => `${value}`
}

export const number: Serializer<number> = {
  deserialize: value => parseInt(value),
  serialize: value => `${value}`
}

export const numbers: Serializer<number[]> = {
  deserialize: value => value.split('|').map(n => parseInt(n)),
  serialize: values => values.join('|')
}

export const string: Serializer<string> = {
  deserialize: value => value,
  serialize: value => value
}

type QueryState = {
  [K: string]:
    | { serializer: Serializer<any>; value: any; defaultValue: any }
    | undefined
}
const QueryContext = createContext<{
  params: URLSearchParams
  state: QueryState
  setState: Dispatch<SetStateAction<QueryState>>
}>({
  params: new URLSearchParams(),
  state: {},
  setState: () => {}
})

export function useURL() {
  const { state } = useContext(QueryContext)
  const params = new URLSearchParams()
  Object.keys(state).forEach(key => {
    const entry = state[key]
    if (entry) {
      const {
        serializer: { serialize },
        defaultValue,
        value
      } = entry
      if (serialize(defaultValue) !== serialize(value)) {
        params.append(key, serialize(value))
      }
    }
  })
  const queryString = params.toString()
  return `${process.env.NEXT_PUBLIC_URL}${queryString ? '?' + queryString : ''}`
}

export default function QueryProvider(props: { children: ReactNode }) {
  const [state, setState] = useState({})
  const params = useMemo(
    () =>
      new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : ''
      ),
    []
  )
  return (
    <QueryContext.Provider
      value={useMemo(() => ({ params, state, setState }), [params, state])}
    >
      {props.children}
    </QueryContext.Provider>
  )
}
