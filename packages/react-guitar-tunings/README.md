# React-Guitar-Tunings &middot; [![npm version](https://img.shields.io/npm/v/react-guitar.svg?style=flat)](https://www.npmjs.com/package/react-guitar-tunings)

A cromprehensive string tunings dictionary.

See https://react-guitar.com for a live demo.

## Usage

```
npm i react-guitar-tunings
```

```jsx
import tunings from 'react-guitar-tunings'
```

Tunings exports an array of objects with the following shape:

```tsx
{
  name: string // 'Standard', 'Open A'...
  instrument: string // 'guitar', 'ukelele'...
  notes: number[]  // The midi values for each string
}
```

## Developing

- `yarn start` will build on change.
- `yarn build` will generate the production scripts under the `dist` folder.
