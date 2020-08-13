import React from 'react'
import Guitar, { Theme, getRenderFingerSpn, tunings } from 'react-guitar'
import dark from 'react-guitar-theme-dark'
import coco from 'react-guitar-theme-coco'
import path from 'path'
import shoot from './shoot'

const SampleGuitar = (props: { theme?: Theme }) => (
  <Guitar
    strings={[0, 1, 2, 2, 0, -1]}
    frets={{ from: 0, amount: 8 }}
    renderFinger={getRenderFingerSpn(tunings.standard)}
    theme={props.theme}
  />
)

const screenshot = (name: string) =>
  path.join(__dirname, '..', name, 'screenshot.png')

shoot(screenshot('react-guitar'), <SampleGuitar />)
shoot(screenshot('react-guitar-theme-dark'), <SampleGuitar theme={dark} />)
shoot(screenshot('react-guitar-theme-coco'), <SampleGuitar theme={coco} />)
