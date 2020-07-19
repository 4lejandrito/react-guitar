import Guitar from './components/guitar'
import useGuitar from './hooks/guitar'
import tunings from './music/tunings'
import {
  getRenderFingerRelative,
  getRenderFingerSpn
} from './components/fingers'

export type Props = {
  className?: string
  fitFretting?: boolean
  strings?: number[]
  frets?: {
    from: number
    amount: number
  }
  lefty?: boolean
  onChange?: (strings: number[]) => void
  onOptions?: (string: number, fret: number) => void
  onPlay?: (string: number) => void
  renderFinger?: (string: number, fret: number) => JSX.Element
}
import './css/guitar.scss'
export { useGuitar, tunings, getRenderFingerRelative, getRenderFingerSpn }
export default Guitar
