# React-Guitar-Sound &middot; [![npm version](https://img.shields.io/npm/v/react-guitar-sound.svg?style=flat)](https://www.npmjs.com/package/react-guitar)

A React Hook to play sound with react-guitar.

See https://react-guitar.com for a live demo.

**For the full documentation go to the [root README](https://github.com/4lejandrito/react-guitar).**

[![Edit quizzical-dawn-0hzuq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-breeze-ll7zh)

## Usage

```
npm i react-guitar react-guitar-sound react-guitar-tunings
```

```jsx
import React, { useMemo } from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'
import { standard } from 'react-guitar-tunings'
import useSound from 'react-guitar-sound'
import E2 from 'react-guitar-sound/resources/E2.ogg'
import D3 from 'react-guitar-sound/resources/D3.ogg'
import G3 from 'react-guitar-sound/resources/G3.ogg'
import E4 from 'react-guitar-sound/resources/E4.ogg'

const samples = { E2, D3, G3, E4 }

function SampleGuitarWithSound() {
  const strings = useMemo(() => [0, 1, 2, 2, 0, -1], [])
  const { play, strum } = useSound(samples, strings, standard)

  return <Guitar strings={strings} onPlay={play} />
}

render(<SampleGuitarWithSound />, document.getElementById('root'))
```

## Developing

- `yarn start` will watch and rebuild.
- `yarn build` will generate the production scripts under the `dist` folder.
