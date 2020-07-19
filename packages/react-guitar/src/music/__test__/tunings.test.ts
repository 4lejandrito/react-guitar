import tunings from '../tunings'

it('is E2 A2 D3 G3 B3 E4', () => {
  expect(tunings.standard).toEqual([40, 45, 50, 55, 59, 64].reverse())
})
