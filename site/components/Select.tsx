import React from 'react'
import classNames from 'classnames'
import { clickable } from '../css/classes'

export default function Select<T extends string>(props: {
  value: T
  values: readonly T[]
  loading?: boolean
  onChange: (value: T) => void
}) {
  return (
    <select
      style={{
        textAlignLast: 'center'
      }}
      className={classNames(
        clickable,
        'truncate w-full appearance-none placeholder-gray-500 placeholder-opacity-100 text-center bg-white'
      )}
      disabled={props.loading}
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
          {props.loading ? 'Loading...' : value}
        </option>
      ))}
    </select>
  )
}
