import useSound from 'react-guitar-sound'
import E2 from 'react-guitar-sound/resources/E2.ogg'
import D3 from 'react-guitar-sound/resources/D3.ogg'
import G3 from 'react-guitar-sound/resources/G3.ogg'
import E4 from 'react-guitar-sound/resources/E4.ogg'
import useKey from './key'

const samples = { E2, D3, G3, E4 }

export default function useClassicSound(
  strings: number[],
  tuning: number[],
  muted?: boolean
) {
  const { play, strum, ...rest } = useSound(samples, strings, tuning, muted)

  useKey(
    () => true,
    e => {
      const string = parseInt(e.key) - 1
      string >= 0 && string < tuning.length && play(string)
    },
    [tuning, play]
  )
  useKey('w', () => strum(true), [strum])
  useKey('s', () => strum(), [strum])

  return { play, strum, ...rest }
}
