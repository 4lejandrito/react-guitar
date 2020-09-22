import React from 'react'
import Guitar, {
  getRenderFingerRelative,
  getRenderFingerSpn,
  spanishTheme
} from 'react-guitar'
import { standard } from 'guitar-tunings'
import useSound from 'react-guitar-sound'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  number,
  boolean,
  select,
  color
} from '@storybook/addon-knobs'
import { midiToNoteName } from '@tonaljs/midi'
import { range } from 'lodash'
import { useState } from '@storybook/addons'
import E2 from 'react-guitar-sound/resources/E2.mp3'
import D3 from 'react-guitar-sound/resources/D3.mp3'
import G3 from 'react-guitar-sound/resources/G3.mp3'
import E4 from 'react-guitar-sound/resources/E4.mp3'
import coco from 'react-guitar-theme-coco'
import dark from 'react-guitar-theme-dark'

const samples = { E2, D3, G3, E4 }
const themes = { spanish: spanishTheme, dark, coco }

storiesOf('Guitar', module)
  .addDecorator(withKnobs)
  .add('advanced', () => {
    const notes = range(12)
      .map(note => note + 12)
      .reduce(
        (acc, note) => ({
          ...acc,
          [midiToNoteName(note, { pitchClass: true, sharps: true })]: note
        }),
        {} as {
          [K: string]: number
        }
      )
    const root = select('Root', notes, notes['C'])
    const renderFingerFunctions = {
      'Scientific Pitch Notation': getRenderFingerSpn(standard),
      'Relative to Root': getRenderFingerRelative(standard, root)
    }
    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
    const { play } = useSound(samples, strings, standard)
    return (
      <Guitar
        lefty={boolean('Lefty', false)}
        frets={{
          from: number('From fret', 0),
          amount: number('Frets', 22)
        }}
        strings={strings}
        renderFinger={
          renderFingerFunctions[
            select<keyof typeof renderFingerFunctions>(
              'Notes',
              ['Scientific Pitch Notation', 'Relative to Root'],
              'Scientific Pitch Notation'
            )
          ]
        }
        theme={(themes as any)[select('Theme', Object.keys(themes), 'spanish')]}
        onChange={setStrings}
        onPlay={play}
      />
    )
  })
  .add('with fixed A minor', () => <Guitar strings={[0, 1, 2, 2, 0, -1]} />)
  .add('with fixed and centered A bar chord', () => (
    <Guitar
      strings={[5, 5, 6, 7, 7, 5]}
      lefty={boolean('Lefty', false)}
      center
    />
  ))
  .add('with fixed A minor and sound', () => {
    const fretting = [0, 1, 2, 2, 0, -1]
    const { play } = useSound(samples, fretting, standard)
    return <Guitar strings={fretting} onPlay={play} />
  })
  .add('editable', () => {
    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
    return <Guitar strings={strings} onChange={setStrings} />
  })
  .add('without strings', () => <Guitar />)
  .add('ukelele', () => {
    const [strings, setStrings] = useState([0, 0, 0, 0])
    const { play } = useSound(samples, strings, standard)
    return (
      <Guitar
        strings={strings}
        onPlay={play}
        renderFinger={getRenderFingerSpn(standard)}
        onChange={setStrings}
      />
    )
  })
  .add('dark', () => (
    <Guitar theme={themes.dark} strings={[0, 0, 0, 0, 0, 0]} />
  ))
  .add('coco', () => (
    <Guitar theme={themes.coco} strings={[0, 0, 0, 0, 0, 0]} />
  ))
  .add('theming', () => (
    <Guitar
      theme={{
        description: 'A guitar with user defined colors',
        color: color('color', spanishTheme.color),
        nut: { color: color('Nut color', spanishTheme.nut.color) },
        fret: {
          color: color('Fret color', spanishTheme.fret.color),
          separator: {
            color: color(
              'Fret separator color',
              spanishTheme.fret.separator.color
            ),
            radius: boolean('Fret separator radius', false),
            shadow: boolean('Fret separator shadow', true),
            width: select('Fret separator width', ['sm', 'md'], 'sm')
          },
          counter: {
            color: color('Counter color', spanishTheme.fret.counter.color)
          }
        },
        string: {
          color: string =>
            color(`String color ${string}`, spanishTheme.string.color(string))
        },
        finger: {
          text: {
            color: color('Finger text color', spanishTheme.finger.text.color)
          },
          color: color('Finger color', spanishTheme.finger.color)
        }
      }}
      renderFinger={getRenderFingerSpn(standard)}
      strings={[0, 0, 0, 0, 0, 0]}
    />
  ))
  .add('smaller', () => (
    <div style={{ fontSize: '.5em' }}>
      <Guitar strings={[0, 1, 2, 2, 0, -1]} />
    </div>
  ))
