import note, { toRelativeText, describe } from '../note'

const majorScale = [0, 2, 4, 5, 7, 9, 11]
const flat = (note: number) => note - 1
const sharp = (note: number) => note + 1

majorScale.forEach((value, i) => {
  const text = String.fromCharCode('CDEFGAB'.charCodeAt(i))
  const sharp = text + '♯'
  const flat = text + '♭'

  function test(text: string, value: number) {
    it(`converts ${text} to ${value}`, () => expect(note(text)).toBe(value))
  }

  function testTextToValue(text: string, value: number) {
    test(text, value)
    for (var i = -1; i <= 10; i++) {
      test(text + i, value + 12 * (i + 1))
    }
  }

  testTextToValue(text, value)

  if (value > 0) {
    testTextToValue(flat, value - 1)
  }
  if (value < 11) {
    testTextToValue(sharp, value + 1)
  }
})

it('C mayor scale inverse', () => {
  for (let i = 0; i < 10; i++) {
    expect(toRelativeText(majorScale[0] + 12 * i)).toBe('1')
    expect(toRelativeText(flat(majorScale[1]) + 12 * i)).toBe('2m')
    expect(toRelativeText(majorScale[1] + 12 * i)).toBe('2')
    expect(toRelativeText(flat(majorScale[2]) + 12 * i)).toBe('3m')
    expect(toRelativeText(majorScale[2] + 12 * i)).toBe('3')
    expect(toRelativeText(majorScale[3] + 12 * i)).toBe('4')
    expect(toRelativeText(flat(majorScale[4]) + 12 * i)).toBe('5dim')
    expect(toRelativeText(majorScale[4] + 12 * i)).toBe('5')
    expect(toRelativeText(sharp(majorScale[4]) + 12 * i)).toBe('5aug')
    expect(toRelativeText(majorScale[5] + 12 * i)).toBe('6')
    expect(toRelativeText(flat(majorScale[6]) + 12 * i)).toBe('7m')
    expect(toRelativeText(majorScale[6] + 12 * i)).toBe('7')
  }
  const key = note('E')
  for (let i = 0; i < 10; i++) {
    expect(toRelativeText(note('E') + 12 * i, key)).toBe('1')
    expect(toRelativeText(note('F♯') + 12 * i, key)).toBe('2')
    expect(toRelativeText(note('G♯') + 12 * i, key)).toBe('3')
    expect(toRelativeText(note('A') + 12 * i, key)).toBe('4')
    expect(toRelativeText(note('B') + 12 * i, key)).toBe('5')
    expect(toRelativeText(note('C♯') + 12 * i, key)).toBe('6')
    expect(toRelativeText(note('D♯') + 12 * i, key)).toBe('7')
  }
})

it('describes the note', () => {
  expect(describe(note('C♯7'))).toEqual({
    name: 'C',
    accidental: '♯',
    octave: 7
  })
})

it('describes the note for a given scale', () => {
  expect(describe(note('F') + 5, note('F'))).toEqual({
    name: 'B',
    accidental: '♭',
    octave: -1
  })
})
