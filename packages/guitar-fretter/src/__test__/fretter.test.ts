import fretter from '../'

const toSemitones = (text: string) => text.split('').map(c => c === '1')

describe('fretter()', () => {
  it(`frets C major`, () =>
    expect(
      fretter({ root: 0, semitones: toSemitones('00010010000') })[0]
    ).toEqual([0, 1, 0, 2, 3, -1]))

  it(`frets A minor`, () =>
    expect(
      fretter({ root: 9, semitones: toSemitones('00100010000') })[0]
    ).toEqual([0, 1, 2, 2, 0, -1]))
})
