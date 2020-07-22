import { useState, useEffect } from 'react'

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
    if (!isNaN(value)) {
      if (value < props.min || value > props.max) {
        setValue(props.value)
      } else {
        props.onChange(value)
      }
    }
  }, [value, props.value, props.onChange])
  return (
    <input
      className="w-24 appearance-none placeholder-gray-500 placeholder-opacity-100 border rounded h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled={props.disabled}
      type="number"
      min={props.min}
      max={props.max}
      value={isNaN(value) ? '' : value}
      onChange={e => setValue(e.target.valueAsNumber)}
    />
  )
}
