import { Frequency, Sampler, SamplerOptions, now } from 'tone'
import { useEffect, useState, useCallback } from 'react'
import range from 'lodash.range'
import { set } from '../util/arrays'
import tunings from '../util/tunings'

export default function useSound(
  samples: SamplerOptions['urls'],
  fretting: number[],
  tuning: number[] = tunings.standard,
  muted?: boolean
) {
  const [loaded, setLoaded] = useState(false)
  const [synth, setSynth] = useState<Sampler>()
  const [playing, setPlaying] = useState(tuning.map(() => false))

  useEffect(() => {
    if (!muted) {
      const synth = new Sampler(samples, () => setLoaded(true)).toMaster()
      setSynth(synth)
      return () => {
        synth.dispose()
      }
    }
  }, [muted])

  const play = (string: number, when: number = 0) => {
    const fret = fretting[string] ?? 0
    if (loaded && !muted && synth && fret >= 0) {
      setPlaying(playing => set(playing, string, true))
      setTimeout(() => setPlaying(playing => set(playing, string, false)), 3000)
      synth.triggerAttackRelease(
        Frequency(tuning[string] + fret, 'midi').toFrequency(),
        4,
        now() + when
      )
    }
  }

  const strum = (up?: boolean) => {
    range(tuning.length).forEach(i => {
      const string = !up ? tuning.length - i - 1 : i
      play(string, 0.05 * i)
    })
  }

  return { play, strum, playing }
}
