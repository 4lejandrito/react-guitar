import React from 'react'
import classNames from 'classnames'
import { clickable } from '../css/classes'

export default function Number(props: {
  disabled?: boolean
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <input
      className={classNames(
        clickable,
        'w-16 appearance-none placeholder-gray-500 placeholder-opacity-100'
      )}
      disabled={props.disabled}
      type="number"
      min={props.min}
      max={props.max}
      value={`${props.value}`}
      onChange={e => props.onChange(e.target.valueAsNumber)}
    />
  )
}
