import React from 'react'
import Skull from './skull'
import { Theme } from 'react-guitar'

const coco: Theme = {
  description:
    "The guitar from the Pixar's film Coco with a white fretboard and golden details including a typical Mexican skull on the third fret",
  color: '#333333',
  nut: { color: '#FEB756' },
  fret: {
    color: '#fefaf2',
    separator: { color: '#FEB756', radius: true, shadow: true, width: 'md' },
    counter: { color: '#606c76' },
    marker: (fret) =>
      fret === 3 ? (
        <div
          style={{
            width: '7em',
            transform: 'rotate(-90deg)',
          }}
        >
          <Skull />
        </div>
      ) : [3, 5, 7, 9, 12, 15, 17, 19, 21].includes(fret) ? (
        <div
          style={{
            backgroundColor: '#FEB756',
            height: '3em',
            width: '3em',
            transform: [7, 12].includes(fret)
              ? 'rotate(45deg) skew(15deg, 15deg)'
              : undefined,
            borderRadius: ![3, 7, 12].includes(fret) ? '100%' : undefined,
          }}
        />
      ) : null,
  },
  string: { color: () => '#f3f3f3' },
  finger: { color: 'white', text: { color: '#606c76' } },
}

export default coco
