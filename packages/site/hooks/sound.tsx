import { useSound } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'
import { useEffect } from 'react'
import tinikeys from 'tinykeys'

export default function useClassicSound(strings: number[], tuning?: number[]) {
  const { strum, ...rest } = useSound({ E2, D3, G3, E4 }, strings, tuning)

  useEffect(() => {
    return tinikeys(window, {
      w: () => strum(true),
      s: () => strum()
    })
  }, [strum])

  return { strum, ...rest }
}
