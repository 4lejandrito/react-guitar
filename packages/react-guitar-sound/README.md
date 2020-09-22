# React-Guitar-Sound &middot; [![npm version](https://img.shields.io/npm/v/react-guitar-sound.svg?style=flat)](https://www.npmjs.com/package/react-guitar)

A React Hook to play sound with react-guitar.

See https://react-guitar.com for a live demo.

**For the full documentation go to the [root README](https://github.com/4lejandrito/react-guitar).**

[![Edit quizzical-dawn-0hzuq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-breeze-ll7zh)

## Usage

```
npm i react-guitar react-guitar-sound
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'
import { standard } from 'guitar-tunings'
import useSound from 'react-guitar-sound'
import E2 from 'react-guitar-sound/resources/E2.mp3'
import D3 from 'react-guitar-sound/resources/D3.mp3'
import G3 from 'react-guitar-sound/resources/G3.mp3'
import E4 from 'react-guitar-sound/resources/E4.mp3'

const samples = { E2, D3, G3, E4 }

function SampleGuitarWithSound() {
  const strings = [0, 1, 2, 2, 0, -1]
  const { play, strum } = useSound(samples, strings, standard)

  return <Guitar strings={strings} onPlay={play} />
}

render(<SampleGuitarWithSound />, document.getElementById('root'))
```

## Developing

- `yarn start` will watch and rebuild.
- `yarn build` will generate the production scripts under the `dist` folder.
