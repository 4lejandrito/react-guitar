import { useEffect, useState, useCallback } from 'react'
import makePlayer, { Player, StringInstrument } from './util/player'
import withSoundFont from './instruments/sound-font'
import withSamples from './instruments/samples'

export { StringInstrument, withSoundFont, withSamples }

const defaultInstrument = withSoundFont('acoustic_guitar_nylon')

export default function useSound(props: {
  instrument?: StringInstrument
  fretting: number[]
  tuning: number[]
  muted?: boolean
}) {
  const { fretting, tuning, muted, instrument = defaultInstrument } = props
  const [player, setPlayer] = useState<Player>()
  const [playing, setPlaying] = useState(tuning.map(() => false))

  useEffect(() => {
    const promise = makePlayer(instrument, tuning, setPlaying)
    promise.then(setPlayer)

    return () => {
      setPlayer(undefined)
      promise.then((player) => {
        player.dispose()
      })
    }
  }, [instrument, tuning])

  const play = useCallback(
    (string: number, when: number = 0) => {
      if (!muted) player?.play(string, fretting[string] ?? 0, when)
    },
    [muted, player, fretting]
  )

  const strum = useCallback(
    (up?: boolean) =>
      tuning.forEach((_, i) => play(!up ? tuning.length - i - 1 : i, 0.05 * i)),
    [tuning, play]
  )

  return { play, strum, playing, loading: !player }
}
