# React-Guitar Theme Dark &middot; [![npm version](https://img.shields.io/npm/v/react-guitar-theme-dark.svg?style=flat)](https://www.npmjs.com/package/react-guitar-theme-dark)

A [react-guitar](https://github.com/4lejandrito/react-guitar) dark theme.

See https://react-guitar.com?theme=dark for a live demo.

![Screenshot of the rendered component with an E major chord](screenshot.png)

## Usage

```
npm i react-guitar react-guitar-theme-dark
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'
import dark from 'react-guitar-theme-dark'

render(
  <Guitar strings={[0, 1, 2, 2, 0, -1]} theme={dark} />,
  document.getElementById('root')
)
```

## Developing

- `yarn start` will watch.
- `yarn build` will generate the production scripts under the `dist` folder.
