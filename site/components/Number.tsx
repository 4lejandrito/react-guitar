import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { clickable } from '../css/classes'

export default function Number(props: {
  disabled?: boolean
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  const [value, setValue] = useState(props.value)
  useEffect(() => {
    setValue(props.value)
  }, [props.value])
  useEffect(() => {
    if (!isNaN(value) && value !== props.value) {
      if (value < props.min || value > props.max) {
        setValue(props.value)
      } else {
        props.onChange(value)
      }
    }
  }, [value, props])
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
      value={isNaN(value) ? '' : value}
      onChange={e => setValue(e.target.valueAsNumber)}
    />
  )
}
