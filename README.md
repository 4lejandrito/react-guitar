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

## Developing

- `yarn start` will spin up the storybook and the site.
- `yarn build` will build the component and the site.
