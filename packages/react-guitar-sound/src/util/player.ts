import { Frequency, Sampler, SamplerOptions, now } from 'tone'

export type Player = {
  play: (string: number, fret: number, when: number) => Promise<void>
  dispose: () => void
}

const toMidi = (note: string | number) => {
  if (typeof note === 'string') return Frequency(note).toMidi()
  return note
}

const closest = (midi: number, samples: SamplerOptions['urls']) => {
  let min = Object.keys(samples)[0]
  Object.keys(samples).forEach(key => {
    if (Math.abs(midi - toMidi(key)) < Math.abs(midi - toMidi(min))) {
      min = key
    }
  })
  return { [min]: samples[min] }
}

export default async (
  samples: SamplerOptions['urls'],
  tuning: number[],
  onChange: (playing: boolean[]) => void
): Promise<Player> => {
  const synths = await Promise.all(
    tuning.map(
      midi =>
        new Promise<Sampler>(resolve => {
          const synth: Sampler = new Sampler(closest(midi, samples), () =>
            resolve(synth)
          ).toDestination()
        })
    )
  )
  const resolvers: Partial<{ [K: number]: (change?: boolean) => void }> = {}
  const playing = tuning.map(() => false)
  const setPlaying = (string: number, value: boolean) => {
    if (playing[string] !== value) {
      playing[string] = value
      setTimeout(() => onChange([...playing]), 0)
    }
  }

  return {
    play: (string, fret, when = 0) =>
      new Promise(resolve => {
        resolvers[string]?.(when === 0)
        if (fret < 0) return resolve()
        const startTimeout = setTimeout(
          () => setPlaying(string, true),
          when * 1000
        )
        const endTimeout = setTimeout(
          (resolvers[string] = change => {
            delete resolvers[string]
            clearTimeout(startTimeout)
            clearTimeout(endTimeout)
            resolve()
            if (!change) setPlaying(string, false)
          }),
          3000 + when * 1000
        )
        synths[string].triggerAttackRelease(
          Frequency(tuning[string] + fret, 'midi').toFrequency(),
          4,
          now() + when
        )
      }),
    dispose: () => synths.map(synth => synth.dispose())
  }
}
