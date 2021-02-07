import { get } from '@tonaljs/note'
import { midiToNoteName } from '@tonaljs/midi'

export type Tuning = {
  instrument: string
  name: string
  notes: number[]
}

export const toString = (
  tuning: number[],
  options?: {
    pad: number
  }
) =>
  tuning
    .map((midi) =>
      midiToNoteName(midi, { pitchClass: true, sharps: true }).padEnd(
        options?.pad ?? 0,
        ' '
      )
    )
    .reverse()
    .join(' ')

export const parse = (string: string) =>
  string
    .split(' ')
    .map((name) => get(name).midi ?? (get(name).chroma ?? 0) + 12 * 3)
    .reverse()

const tunings: Tuning[] = [
  {
    instrument: 'guitar',
    name: 'Standard',
    notes: 'E2 A2 D3 G3 B3 E4',
  },
  {
    instrument: 'guitar',
    name: 'Open A',
    notes: 'E2 A2 C#3 E3 A3 E4',
  },
  {
    instrument: 'guitar',
    name: 'Open B',
    notes: 'B1 F#2 B2 F#3 B3 D#4',
  },
  {
    instrument: 'guitar',
    name: 'Open C',
    notes: 'C2 G2 C3 G3 C4 E4',
  },
  {
    instrument: 'guitar',
    name: 'Open D',
    notes: 'D2 A2 D3 F#3 A3 D4',
  },
  {
    instrument: 'guitar',
    name: 'Open E',
    notes: 'E2 B2 E3 G#3 B3 E4',
  },
  {
    instrument: 'guitar',
    name: 'Open F',
    notes: 'C2 F2 C3 F3 A3 F4',
  },
  {
    instrument: 'guitar',
    name: 'Open G',
    notes: 'D2 G2 D3 G3 B3 D4',
  },
  {
    instrument: 'guitar',
    name: 'Drop A',
    notes: 'A1 E2 A2 D3 F#3 B3',
  },
  {
    instrument: 'guitar',
    name: 'Drop A#',
    notes: 'A#1 F2 A#2 D#3 G3 C4',
  },
  {
    instrument: 'guitar',
    name: 'Drop B',
    notes: 'B1 F#2 B2 E3 G#3 C#4',
  },
  {
    instrument: 'guitar',
    name: 'Drop C',
    notes: 'C2 G2 C3 F3 A3 D4',
  },
  {
    instrument: 'guitar',
    name: 'Drop C#',
    notes: 'C#2 G#2 C#3 F#3 A#3 D#4',
  },
  {
    instrument: 'guitar',
    name: 'Drop D',
    notes: 'D2 A2 D3 G3 B3 E4',
  },
  {
    instrument: 'guitar',
    name: 'Drop D#',
    notes: 'D#2 A#2 D#3 G#3 C4 F4',
  },
  {
    instrument: 'guitar',
    name: 'Drop E',
    notes: 'E2 B2 E3 A3 C#4 F#4',
  },
  {
    instrument: 'guitar',
    name: 'Drop F',
    notes: 'F2 C3 F3 A#3 D4 G4',
  },
  {
    instrument: 'guitar',
    name: 'Drop F#',
    notes: 'F#2 C#3 F#3 B3 D#4 G#4',
  },
  {
    instrument: 'guitar',
    name: 'Drop G',
    notes: 'G1 D2 G2 C3 E3 A3',
  },
  {
    instrument: 'guitar',
    name: 'Drop G#',
    notes: 'G#1 D#2 G#2 C#3 F3 A#3',
  },
  {
    instrument: 'guitar',
    name: 'Rondeña',
    notes: 'D2 A2 D3 F#3 B3 E4',
  },
  {
    instrument: 'guitar',
    name: 'Irish',
    notes: 'D2 A2 D3 G3 A3 D4',
  },
  {
    instrument: 'ukelele',
    name: 'Standard',
    notes: 'G4 C4 E4 A4',
  },
  {
    instrument: 'ukelele',
    name: 'Tenor',
    notes: 'G3 C4 E4 A4',
  },
  {
    instrument: 'ukelele',
    name: 'Baritone',
    notes: 'D3 G3 B3 E4',
  },
  {
    instrument: 'bass',
    name: 'Standard',
    notes: 'E1 A1 D2 G2',
  },
  {
    instrument: 'bass',
    name: '5 string',
    notes: 'B0 E1 A1 D2 G2',
  },
  {
    instrument: 'bass',
    name: '6 string',
    notes: 'B0 E1 A1 D2 G2 C3',
  },
  {
    instrument: 'banjo',
    name: 'Standard',
    notes: 'G4 D3 G3 B3 D4',
  },
  {
    instrument: 'banjo',
    name: 'Open G',
    notes: 'G4 D3 G3 B3 D4',
  },
  {
    instrument: 'banjo',
    name: 'Double C',
    notes: 'G4 C3 G3 C4 D4',
  },
  {
    instrument: 'banjo',
    name: 'Sawmill',
    notes: 'G4 D3 G3 C4 D4',
  },
  {
    instrument: 'lute',
    name: 'Standard',
    notes: 'E2 A2 D3 F#3 B3 E4',
  },
  {
    instrument: 'mandolin',
    name: 'Standard',
    notes: 'G3 G3 D4 D4 A4 A4 E5 E5',
  },
  {
    instrument: 'cello',
    name: 'Standard',
    notes: 'C2 G2 D3 A3',
  },
  {
    instrument: 'viola',
    name: 'Standard',
    notes: 'C3 G3 D4 A4',
  },
  {
    instrument: 'violin',
    name: 'Standard',
    notes: 'G3 D4 A4 E5',
  },
].map((tuning) => ({
  ...tuning,
  notes: parse(tuning.notes),
}))

export const standard = tunings[0].notes

export default tunings
