# React-Guitar &middot; [![npm version](https://img.shields.io/npm/v/react-guitar.svg?style=flat)](https://www.npmjs.com/package/react-guitar)

A beautiful and flexible guitar component for React.

![Screenshot of the rendered component with an A minor chord](packages/react-guitar/screenshot.png)

[![Edit quizzical-dawn-0hzuq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-breeze-ll7zh)

## Installation

```
npm i react-guitar
```

## Usage

```jsx
import React from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'

render(
  <Guitar strings={[0, 1, 2, 2, 0, -1]} />,
  document.getElementById('root')
)
```

Check out [the stories](packages/react-guitar/stories/index.stories.tsx) for more advanced examples.

### Props

| Name           | Description                                                                                                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`    | An css class string to apply to the container element.                                                                                                                                                                                    |
| `strings`      | An array where each number represents the fret the string is pressed on (`0` means open string and `-1` muted). `[0, 1, 2, 2, 0, -1]` is an `A minor` in a standard guitar and `[3, 0, 0, 0]` is a `C major` in an ukelele.               |
| `frets`        | An object with the shape `{ from: number amount: number }` to configure the frets of the guitar (`{ from: 0, amount: 22 }` by default). It can start on any fret which is useful for displaying just a chord instead of the whole guitar. |
| `lefty`        | A boolean to configure the guitar for left handed people like me.                                                                                                                                                                         |
| `renderFinger` | A function `(string: number, fret: number) => JSX.Element` that will be used to render the content of the white bubble used for the fingers. This can be used to render the note name.                                                    |
| `onChange`     | A function `(strings: number[]) => void` that will be called when a string is press/unpressed. If not present the guitar will be read only.                                                                                               |
| `onPlay`       | A function `(string: number) => void` that will be called each time the user plays a string (hovering with the mouse). This can be used to play the sound of the string.                                                                  |

## Developing

- `yarn start` will spin up the storybook and the site.
- `yarn build` will build the component and the site.
