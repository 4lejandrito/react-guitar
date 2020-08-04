import React from 'react'
import { ReactScreenshotTest } from 'react-screenshot-test'
import Guitar, { Theme, getRenderFingerSpn, tunings } from 'react-guitar'
import dark from 'react-guitar-theme-dark'
import coco from 'react-guitar-theme-coco'

const render = (theme?: Theme) => (
  <Guitar
    strings={[0, 1, 2, 2, 0, -1]}
    renderFinger={getRenderFingerSpn(tunings.standard)}
    theme={theme}
  />
)

ReactScreenshotTest.create('Guitar')
  .viewport('Desktop', {
    width: 1413,
    height: 376
  })
  .shoot('default', render())
  .shoot('dark', render(dark))
  .shoot('coco', render(coco))
  .run()
