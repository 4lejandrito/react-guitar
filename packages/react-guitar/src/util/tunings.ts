import { midi } from '@tonaljs/note'

const makeTuning = (text: string): number[] =>
  text
    .split(' ')
    .map(name => midi(name) ?? 0)
    .reverse()

export default {
  standard: makeTuning('E2 A2 D3 G3 B3 E4'),
  rondeña: makeTuning('D2 A2 D3 F#3 B3 E4'),
  dadgad: makeTuning('D2 A2 D3 G3 A3 D4'),
  ukelele: makeTuning('G4 C4 E4 A4'),
  lute: makeTuning('E2 A2 D3 F#3 B3 E4')
}
