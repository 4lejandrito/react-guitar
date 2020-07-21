import Guitar, { useGuitar, tunings, getRenderFingerSpn } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'
import { useState } from 'react'
import Number from './Number'
import Toggle from './Toggle'
import Select from './Select'
import classNames from 'classnames'

export default function Demo() {
  const [playOnHover, setPlayOnHover] = useState(false)
  const [lefty, setLefty] = useState(false)
  const [frets, setFrets] = useState(22)
  const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
  const [tuningName, setTuningName] = useState<keyof typeof tunings>('standard')
  const tuning = tunings[tuningName]
  const { play, strum } = useGuitar({ E2, D3, G3, E4 }, strings, tuning)

  return (
    <div className="slide-up w-full py-4">
      <div className="flex flex-wrap items-stretch justify-center px-4">
        <Select
          label="Tuning"
          value={tuningName}
          values={['standard', 'ukelele', 'rondeña', 'dadgad']}
          onChange={setTuningName}
        />
        <Number
          label="Number of frets"
          value={frets}
          min={0}
          onChange={setFrets}
        />
        <Toggle label="Left handed" value={lefty} onChange={setLefty} />
        <Toggle
          label="Play on hover"
          value={playOnHover}
          onChange={setPlayOnHover}
        />
        <label className="w-auto p-2 text-center flex flex-col">
          <small className="flex-grow text-center block font-bold text-gray-600 uppercase mb-2">
            Strum
          </small>
          <div className="h-10 flex items-center justify-center">
            <button
              className={classNames(
                'border-2 hover:bg-gray-200 font-bold py-1 px-2 rounded'
              )}
              onClick={() => strum()}
              title="Strum"
            >
              🎶 👇
            </button>
          </div>
        </label>
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
