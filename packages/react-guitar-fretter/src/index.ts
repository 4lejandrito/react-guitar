import { range, flatten, flatMap, max, min } from 'lodash'
import mod from './util/mod'
import search from './util/search'

export default function fretter(
  chord: { root: number; semitones: boolean[] },
  options?: { tuning?: number[]; frets?: number }
): number[][] {
  const { root, semitones } = chord
  const { tuning = [64, 59, 55, 50, 45, 40], frets = 22 } = options ?? {}
  const notes = [
    root,
    ...semitones
      .map((semitone, i) => (semitone ? root + i + 1 : -1))
      .filter(n => n >= 0)
  ]

  const width = (fretting: number[]) => {
    const fingers = fretting.filter(fret => fret > 0)
    if (fingers.length <= 1) {
      return 0
    }
    return Math.abs((max(fingers) ?? 0) - (min(fingers) ?? 0))
  }

  const containsAllNotes = (fretting: number[]) =>
    notes.every(note =>
      tuning.some(
        (n, i) => fretting[i] !== -1 && mod(note - (n + fretting[i]), 12) === 0
      )
    )

  const getFrets = (string: number, notes: number[]) =>
    flatMap(notes, note =>
      range(frets).filter(fret => mod(fret - (note - tuning[string]), 12) === 0)
    )

  return search<number[]>(
    [],
    fretting =>
      fretting.length === 0
        ? flatten(
            range(tuning.length)
              .map(string => tuning.length - 1 - string)
              .map(string => getFrets(string, [root]))
              .map((frets, i) =>
                frets.map(fret => range(i + 1).map(j => (j !== i ? -1 : fret)))
              )
          )
        : [...getFrets(tuning.length - 1 - fretting.length, notes)]
            .map(fret => [...fretting, fret])
            .filter(fretting => width(fretting) < 3),
    fretting => fretting.length === tuning.length
  )
    .map(fretting => [...fretting].reverse())
    .filter(containsAllNotes)
    .sort(
      (f1, f2) =>
        (min(f1.filter(n => n > 0)) ?? 0) - (min(f2.filter(n => n > 0)) ?? 0)
    )
}
