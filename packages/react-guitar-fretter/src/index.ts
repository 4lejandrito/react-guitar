import range from 'lodash.range'
import flatten from 'lodash.flatten'
import flatMap from 'lodash.flatmap'
import max from 'lodash.max'
import min from 'lodash.min'
import reverse from 'lodash.reverse'
import mod from './util/mod'
import search from './util/search'
import findDuplicates from './util/find-duplicates'

/**
 * Returns an array of string frettings.
 * 
 * @param chord
 * `root` is starting position in the chromatic scale, starting at 0 which is C for standard tuning.
 * 
 * `semitones` is an array of booleans that represent the notes played in the chord on the chromatic scale.
 * 
 * For example, to describe a c-major chord, true must be set for the 1st, 5th, and 8th note of the chromatic scale i.e:
 * ```javascript
 * const chord = {
      root: 0,
      semitones: [
        true,
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
      ],
    }
 * ```
 * @param options
 * Optional configuration of `tuning`, `frets`, and `restrictChordTypeTo`.
 */
export default function fretter(
  chord: { root: number; semitones: boolean[] },
  options?: {
    tuning?: number[]
    frets?: number
    restrictChordTypeTo?: 'open' | 'barre' | 'all'
  }
): number[][] {
  const { root, semitones } = chord
  const { tuning = [64, 59, 55, 50, 45, 40], frets = 22 } = options ?? {}
  const notes = [
    root,
    ...semitones
      .map((semitone, i) => (semitone ? root + i + 1 : -1))
      .filter((n) => n >= 0),
  ]

  const width = (fretting: number[]) => {
    const fingers = fretting.filter((fret) => fret > 0)
    if (fingers.length <= 1) {
      return 0
    }
    return Math.abs((max(fingers) ?? 0) - (min(fingers) ?? 0))
  }

  const containsAllNotes = (fretting: number[]) =>
    notes.every((note) =>
      tuning.some(
        (n, i) => fretting[i] !== -1 && mod(note - (n + fretting[i]), 12) === 0
      )
    )

  const getFrets = (string: number, notes: number[]) =>
    flatMap(notes, (note) =>
      range(frets).filter(
        (fret) => mod(fret - (note - tuning[string]), 12) === 0
      )
    )

  const isOpenChord = (fretting: number[]) => {
    return fretting.includes(0) && !fretting.some((fret) => fret > 4)
  }

  const isBarreChord = (fretting: number[]) => {
    const strippedFretting = fretting.filter((fret) => fret > 0)
    const duplicates = findDuplicates(strippedFretting)
    return (
      duplicates.length !== 0 &&
      duplicates.some(
        (duplicateFret) =>
          duplicateFret === min(fretting.filter((fret) => fret >= 0))
      )
    )
  }

  const playableChords = (fretting: number[]) => {
    const strippedFretting = fretting.filter((fret) => fret > 0)
    const duplicates = findDuplicates(strippedFretting)
    return strippedFretting.length < 5 || (duplicates && isBarreChord(fretting))
  }

  const frettings = search<number[]>(
    [],
    (fretting) =>
      fretting.length === 0
        ? flatten(
            reverse(range(tuning.length))
              .map((string) => getFrets(string, [root]))
              .map((frets, i) =>
                frets.map((fret) =>
                  range(i + 1).map((j) => (j !== i ? -1 : fret))
                )
              )
          )
        : [...getFrets(tuning.length - 1 - fretting.length, notes)]
            .map((fret) => [...fretting, fret])
            .filter((fretting) => width(fretting) < 3),
    (fretting) => fretting.length === tuning.length
  )
    .map((fretting) => [...fretting].reverse())
    .filter(containsAllNotes)
    .filter(playableChords)
    .sort(
      (f1, f2) =>
        (min(f1.filter((n) => n > 0)) ?? 0) -
        (min(f2.filter((n) => n > 0)) ?? 0)
    )

  if (options?.restrictChordTypeTo === 'open')
    return frettings.filter(isOpenChord)
  if (options?.restrictChordTypeTo === 'barre')
    return frettings.filter(isBarreChord)
  return frettings
}

/**
 * Converts a string of form '00010010000' to array of booleans where 0 -> false and 1 -> true.
 *
 * @param text
 * String of the form '00010010000'
 */
export const toSemitones = (text: string) =>
  text.split('').map((c) => c === '1')

/**
 * Returns semitone boolean array for use in guitar fretter package.
 *
 * @param chordType
 * 'major' | 'minor' | 'diminished triad'
 */
export const getChordSemitones = (
  chordType: 'major' | 'minor' | 'diminished triad'
) => {
  switch (chordType.toLowerCase()) {
    case 'major':
      return toSemitones('00010010000')
    case 'minor':
      return toSemitones('00100010000')
    case 'diminished triad':
      return toSemitones('00100100000')
    default:
      return toSemitones('0000000000')
  }
}
