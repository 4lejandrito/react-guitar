import React from 'react'

export type Theme = {
  color: string
  nut: { color: string }
  fret: {
    color: string
    separator: { color: string }
    marker?: (fret: number) => JSX.Element | null
    counter: { color: string }
  }
  string: { color: (string: number) => string }
  finger: { color: string }
}
const makeTheme = (theme: Theme) => theme

export default {
  spanish: makeTheme({
    color: '#333333',
    nut: { color: '#fffacd' },
    fret: {
      color: '#9e6429',
      separator: { color: '#daa520' },
      counter: { color: '#606c76' }
    },
    string: { color: () => '#f3f3f3' },
    finger: { color: '#606c76' }
  }),
  dark: makeTheme({
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
  })
}
