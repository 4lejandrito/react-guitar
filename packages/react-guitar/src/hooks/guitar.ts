import { Frequency, Sampler, SamplerOptions } from 'tone'
import { useEffect, useState } from 'react'
import range from 'lodash.range'
import { set } from '../util/arrays'
import tunings from '../music/tunings'

export default function useGuitar(
  samples: SamplerOptions['urls'],
  fretting: number[],
  tuning: number[] = tunings.standard,
  muted?: boolean
) {
  const [loaded, setLoaded] = useState(false)
  const [synth, setSynth] = useState<Sampler>()
  const [playing, setPlaying] = useState(tuning.map(() => false))

  useEffect(() => {
    const synth = new Sampler(samples, () => setLoaded(true)).toMaster()
    setSynth(synth)
    return () => {
      synth.dispose()
    }
  }, [])

  const play = (string: number, when = '+0') => {
    if (loaded && !muted && synth && fretting[string] >= 0) {
      setPlaying(playing => set(playing, string, true))
      setTimeout(() => setPlaying(playing => set(playing, string, false)), 3000)
      synth.triggerAttackRelease(
        Frequency(tuning[string] + fretting[string], 'midi').toFrequency(),
        4,
        when
      )
    }
  }
  const strum = (up?: boolean) => {
    range(tuning.length).forEach(i => {
      const string = !up ? tuning.length - i - 1 : i
      play(string, `+${0.05 * i}`)
    })
  }

  return { play, strum, playing }
}
