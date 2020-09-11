import { useSound } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'
import { useKey } from 'react-use'

const samples = { E2, D3, G3, E4 }

export default function useClassicSound(
  strings: number[],
  tuning: number[],
  muted?: boolean
) {
  const { strum, ...rest } = useSound(samples, strings, tuning, muted)

  useKey('w', () => strum(true), {}, [strum])
  useKey('s', () => strum(), {}, [strum])

  return { strum, ...rest }
}
