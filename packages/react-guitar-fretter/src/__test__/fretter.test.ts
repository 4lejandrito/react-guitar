import fretter, { toSemitones } from '../'

describe('toSemitones()', () => {
  it(`maps correctly`, () =>
    // prettier-ignore
    expect(
    toSemitones('01010101010')
  ).toEqual([false, true, false, true, false, true, false, true, false, true, false]))
})

describe('fretter()', () => {
  it(`frets C major`, () =>
    expect(
      fretter({ root: 0, semitones: toSemitones('00010010000') })[0]
    ).toEqual([0, 1, 0, 2, 3, -1]))

  it(`frets C major barre`, () =>
    expect(
      fretter(
        {
          root: 0,
          semitones: toSemitones('00010010000'),
        },
        { frettingType: 'barre' }
      )[0]
    ).toEqual([3, 5, 5, 5, 3, -1]))

  it(`frets C major open`, () =>
    expect(
      fretter(
        {
          root: 0,
          semitones: toSemitones('00010010000'),
        },
        { frettingType: 'open' }
      )[0]
    ).toEqual([0, 1, 0, 2, 3, -1]))

  it(`frets A minor`, () =>
    expect(
      fretter({ root: 9, semitones: toSemitones('00100010000') })[0]
    ).toEqual([0, 1, 2, 2, 0, -1]))

  it(`frets A minor barre`, () =>
    expect(
      fretter(
        {
          root: 9,
          semitones: toSemitones('00100010000'),
        },
        { frettingType: 'barre' }
      )[0]
    ).toEqual([5, 5, 5, 7, 7, 5]))

  it(`frets A minor open`, () =>
    expect(
      fretter(
        {
          root: 9,
          semitones: toSemitones('00100010000'),
        },
        { frettingType: 'open' }
      )[0]
    ).toEqual([0, 1, 2, 2, 0, -1]))
})
