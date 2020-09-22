import React from 'react'
import Guitar, { Theme, getRenderFingerSpn } from 'react-guitar'
import dark from 'react-guitar-theme-dark'
import coco from 'react-guitar-theme-coco'
import { standard } from 'guitar-tunings'
import path from 'path'
import shoot from './shoot'

const SampleGuitar = (props: { theme?: Theme }) => (
  <Guitar
    strings={[0, 0, 1, 2, 2, 0]}
    frets={{ from: 0, amount: 5 }}
    renderFinger={getRenderFingerSpn(standard)}
    theme={props.theme}
  />
)

const screenshot = (name: string) =>
  path.join(__dirname, '..', 'packages', name, 'screenshot.png')

shoot(screenshot('react-guitar'), <SampleGuitar />)
shoot(screenshot('react-guitar-theme-dark'), <SampleGuitar theme={dark} />)
shoot(screenshot('react-guitar-theme-coco'), <SampleGuitar theme={coco} />)
shoot(
  path.join(__dirname, '..', 'site', 'public', 'social.png'),
  <div
    style={{
      width: 1200,
      height: 630,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white'
    }}
  >
    <div
      style={{
        borderRadius: '0.25rem',
        overflow: 'hidden',
        boxShadow:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}
    >
      <SampleGuitar />
    </div>
  </div>
)
