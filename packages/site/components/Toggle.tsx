import React from 'react'
import Switch from 'react-switch'

export default function Toggle(props: {
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <Switch
      aria-checked={props.value}
      onColor="#48bb78"
      checkedIcon={false}
      handleDiameter={16}
      uncheckedIcon={false}
      checked={props.value}
      onChange={props.onChange}
    />
  )
}
