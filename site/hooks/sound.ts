import useReactGuitarSound, {
  StringInstrument,
  withSamples,
  withSoundFont
} from 'react-guitar-sound'
import useKey from './key'

const named = (name: string, instrument: StringInstrument) => ({
  name,
  instrument
})

export const instruments = [
  named(
    'Flamenco Guitar',
    withSamples(
      Object.fromEntries(
        ['E2', 'D3', 'G3', 'E4'].map(n => [n, `/samples/${n}.mp3`])
      )
    )
  ),
  named('Acoustic Guitar Nylon', withSoundFont('acoustic_guitar_nylon')),
  named('Acoustic Guitar Steel', withSoundFont('acoustic_guitar_steel')),
  named('Electric Guitar Clean', withSoundFont('electric_guitar_clean')),
  named('Electric Guitar Jazz', withSoundFont('electric_guitar_jazz')),
  named('Acoustic Bass', withSoundFont('acoustic_bass')),
  named('Electric Bass', withSoundFont('electric_bass_pick')),
  named('Banjo', withSoundFont('banjo')),
  named('Sitar', withSoundFont('sitar'))
]

export default function useSound(props: {
  instrument?: StringInstrument
  fretting: number[]
  tuning: number[]
  muted?: boolean
}) {
  const { play, strum, ...rest } = useReactGuitarSound(props)

  useKey(
    () => true,
    e => {
      const string = parseInt(e.key) - 1
      string >= 0 && string < props.tuning.length && play(string)
    },
    [props.tuning, play]
  )
  useKey('w', () => strum(true), [strum])
  useKey('s', () => strum(), [strum])

  return { play, strum, ...rest }
}
