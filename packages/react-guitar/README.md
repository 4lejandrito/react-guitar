# React-Guitar &middot; [![npm version](https://img.shields.io/npm/v/react-guitar.svg?style=flat)](https://www.npmjs.com/package/react-guitar)

A beautiful and accessible guitar component for React.

See https://react-guitar.com for a live demo.

**For the full documentation go to the [root README](https://github.com/4lejandrito/react-guitar).**

![Screenshot of the rendered component with an E major chord](screenshot.png)

[![Edit quizzical-dawn-0hzuq](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/interesting-breeze-ll7zh)

## Usage

```
npm i react-guitar
```

```jsx
import React from 'react'
import { render } from 'react-dom'
import Guitar from 'react-guitar'

render(
  <Guitar strings={[0, 1, 2, 2, 0, -1]} />,
  document.getElementById('root')
)
```

Check out [the storybook](https://react-guitar.com/storybook) for more advanced examples.

## Developing

- `yarn start` will spin up the storybook.
- `yarn build` will generate the production scripts under the `dist` folder.
