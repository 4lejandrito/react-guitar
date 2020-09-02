import classNames from 'classnames'
import { clickable } from '../css/classes'

export default function Select<T extends string>(props: {
  value: T
  values: T[]
  onChange: (value: T) => void
}) {
  return (
    <select
      className={classNames(
        clickable,
        'appearance-none placeholder-gray-500 placeholder-opacity-100'
      )}
      value={props.value}
      onChange={e => {
        const value = props.values.find(value => value === e.target.value)
        value && props.onChange(value)
      }}
    >
      {props.values.map(value => (
        <option
          key={value}
          value={value}
          onSelect={() => props.onChange(value)}
        >
          {value}
        </option>
      ))}
    </select>
  )
}
