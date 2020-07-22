import Guitar from './components/guitar'
import useGuitar from './hooks/guitar'
import tunings from './music/tunings'
import {
  getRenderFingerRelative,
  getRenderFingerSpn
} from './components/guitar'

export type Props = {
  className?: string
  fitFretting?: boolean
  strings?: number[]
  frets?: {
    from: number
    amount: number
  }
  lefty?: boolean
  renderFinger?: (string: number, fret: number) => JSX.Element
  onChange?: (strings: number[]) => void
  onPlay?: (string: number) => void
}
import './css/guitar.scss'
export { useGuitar, tunings, getRenderFingerRelative, getRenderFingerSpn }
export default Guitar
