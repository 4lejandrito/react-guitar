import React from 'react'
import renderer from 'react-test-renderer'
import { generateImage } from 'jsdom-screenshot'
import { render } from '@testing-library/react'
import Guitar from '../src/index'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

it('renders the right HTML', () => {
  expect(
    renderer.create(<Guitar strings={[0, 0, 1, 2, 2, 0]} />).toJSON()
  ).toMatchSnapshot()
})

it('hides fingers when renderFinger returns null', async () => {
  const guitar = (
    <Guitar strings={[0, 0, 1, 2, 2, 0]} renderFinger={() => null} />
  )
  expect(renderer.create(guitar).toJSON()).toMatchSnapshot()
  render(guitar)
  expect(await generateImage()).toMatchImageSnapshot({
    failureThreshold: 0.03,
    failureThresholdType: 'percent',
  })
})

it('has no visual regressions', async () => {
  render(<Guitar strings={[0, 0, 1, 2, 2, 0]} />)
  expect(await generateImage()).toMatchImageSnapshot({
    failureThreshold: 0.03,
    failureThresholdType: 'percent',
  })
})
