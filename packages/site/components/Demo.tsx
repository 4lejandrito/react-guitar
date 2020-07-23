import Guitar, { useSound, tunings, getRenderFingerSpn } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'
import { useState } from 'react'
import Number from './Number'
import Toggle from './Toggle'
import Select from './Select'
import Label from './Label'

export default function Demo() {
  const [playOnHover, setPlayOnHover] = useState(false)
  const [lefty, setLefty] = useState(false)
  const [frets, setFrets] = useState(22)
  const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
  const [tuningName, setTuningName] = useState<keyof typeof tunings>('standard')
  const tuning = tunings[tuningName]
  const { play, strum } = useSound({ E2, D3, G3, E4 }, strings, tuning)

  return (
    <div className="slide-up w-full py-4">
      <div className="flex flex-wrap items-stretch justify-center px-4">
        <Label name="Tuning">
          <Select
            value={tuningName}
            values={Object.keys(tunings) as (keyof typeof tunings)[]}
            onChange={setTuningName}
          />
        </Label>
        <Label name="Number of frets">
          <Number value={frets} min={0} max={40} onChange={setFrets} />
        </Label>
        <Label name="Left handed">
          <Toggle value={lefty} onChange={setLefty} />
        </Label>
        <Label name="Play on hover">
          <Toggle value={playOnHover} onChange={setPlayOnHover} />
        </Label>
        <Label name="Strum">
          <button
            className="border-2 hover:bg-gray-200 font-bold py-1 px-2 rounded"
            onClick={() => strum()}
            title="Strum"
          >
            🎶 👆
          </button>
        </Label>
      </div>
      <div className="relative flex-grow mt-4 flex items-center justify-center">
        <div className="sm:rounded overflow-hidden shadow">
          <Guitar
            frets={{ from: 0, amount: frets }}
            strings={tuning.map((_, i) => strings[i] ?? 0)}
            lefty={lefty}
            renderFinger={getRenderFingerSpn(tuning)}
            onChange={setStrings}
            onPlay={string => playOnHover && play(string)}
          />
        </div>
      </div>
    </div>
  )
}
