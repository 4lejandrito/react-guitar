import React from 'react'
import { Theme } from 'react-guitar'

const dark: Theme = {
  color: '#222831',
  nut: { color: '#222831' },
  fret: {
    color: '#393e46',
    separator: { color: '#eeeeee' },
    marker: fret =>
      [3, 5, 7, 9, 12, 15, 17, 19, 21].includes(fret) ? (
        <span
          style={{
            width: '1em',
            height: '1em',
            borderRadius: '100%',
            backgroundColor: '#eeeeee'
          }}
        />
      ) : null,
    counter: { color: '#606c76' }
  },
  string: { color: () => '#f3f3f3' },
  finger: { color: '#606c76' }
}

export default dark
