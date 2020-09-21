import { SamplerOptions } from 'tone'
import { useEffect, useState, useCallback } from 'react'
import range from 'lodash.range'
import tunings from '../util/tunings'
import makePlayer, { Player } from '../util/player'

export default function useSound(
  samples: SamplerOptions['urls'],
  fretting: number[],
  tuning: number[] = tunings.standard,
  muted?: boolean
) {
  const [player, setPlayer] = useState<Player>()
  const [playing, setPlaying] = useState(tuning.map(() => false))

  useEffect(() => {
    const promise = makePlayer(samples, tuning, setPlaying)
    promise.then(setPlayer)

    return () => {
      setPlayer(undefined)
      promise.then(player => {
        player.dispose()
      })
    }
  }, [samples, tuning])

  const play = useCallback(
    (string: number, when: number = 0) => {
      if (!muted) player?.play(string, fretting[string] ?? 0, when)
    },
    [muted, player, fretting]
  )

  const strum = useCallback(
    (up?: boolean) =>
      range(tuning.length).forEach(i =>
        play(!up ? tuning.length - i - 1 : i, 0.05 * i)
      ),
    [tuning.length, play]
  )

  return { play, strum, playing }
}
