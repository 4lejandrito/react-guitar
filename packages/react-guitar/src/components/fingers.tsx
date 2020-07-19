import React from 'react'
import { toRelativeText } from '../music/note'
import { describe } from '../music/note'

export function getRenderFingerSpn(tuning: number[], key?: number) {
  return (string: number, fret: number) => {
    const { name, accidental, octave } = describe(tuning[string] + fret, key)
    return (
      <span>
        {name}
        {accidental}
        <sub>{octave}</sub>
      </span>
    )
  }
}

export function getRenderFingerRelative(tuning: number[], root: number) {
  return (string: number, fret: number) => (
    <>{toRelativeText(tuning[string] + fret, root)}</>
  )
}
