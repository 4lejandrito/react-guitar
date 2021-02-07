import { Frequency, Sampler, SamplerOptions, immediate } from 'tone'
import { StringInstrument } from '../util/player'

const toMidi = (note: string | number) => {
  if (typeof note === 'string') return Frequency(note).toMidi()
  return note
}

const closest = (midi: number, samples: SamplerOptions['urls']) => {
  let min = Object.keys(samples)[0]
  Object.keys(samples).forEach((key) => {
    if (Math.abs(midi - toMidi(key)) < Math.abs(midi - toMidi(min))) {
      min = key
    }
  })
  return { [min]: samples[min] }
}

export default function withSamples(
  samples: SamplerOptions['urls']
): StringInstrument {
  return async (tuning) => {
    const synths = await Promise.all(
      tuning.map(
        (midi) =>
          new Promise<Sampler>((resolve) => {
            const synth: Sampler = new Sampler(closest(midi, samples), () =>
              resolve(synth)
            ).toDestination()
          })
      )
    )
    return {
      play: (string, fret, when = 0) => {
        synths[string].triggerAttackRelease(
          Frequency(tuning[string] + fret, 'midi').toFrequency(),
          4,
          immediate() + when
        )
      },
      dispose: () => synths.map((synth) => synth.dispose()),
    }
  }
}
