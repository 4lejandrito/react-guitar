import tunings from '../tunings'

describe('standard tuning', () => {
  it('is E2 A2 D3 G3 B3 E4', () => {
    expect(tunings.standard).toEqual([40, 45, 50, 55, 59, 64].reverse())
  })
})

describe('rondeña tuning', () => {
  it('is D2 A2 D3 F#3 B3 E4', () => {
    expect(tunings.rondeña).toEqual([38, 45, 50, 54, 59, 64].reverse())
  })
})

describe('dadgad tuning', () => {
  it('is D2 A2 D3 G3 A3 D4', () => {
    expect(tunings.dadgad).toEqual([38, 45, 50, 55, 57, 62].reverse())
  })
})

describe('ukelele tuning', () => {
  it('is G4 C4 E4 A4', () => {
    expect(tunings.ukelele).toEqual([67, 60, 64, 69].reverse())
  })
})

describe('lute tuning', () => {
  it('is E2 A2 D3 F#3 B3 E4', () => {
    expect(tunings.lute).toEqual([40, 45, 50, 54, 59, 64].reverse())
  })
})
