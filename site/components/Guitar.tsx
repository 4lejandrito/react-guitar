import React from 'react'
import Guitar, { getRenderFingerSpn } from 'react-guitar'

export default function DemoGuitar(
  props: Parameters<typeof Guitar>[0] & {
    tuning: number[]
  }
) {
  return (
    <div className="max-w-full inline-block sm:rounded overflow-hidden shadow transform-gpu">
      <Guitar {...props} renderFinger={getRenderFingerSpn(props.tuning)} />
    </div>
  )
}
