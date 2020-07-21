import Guitar, { useGuitar, tunings, getRenderFingerSpn } from 'react-guitar'
import E2 from 'react-guitar/resources/E2.mp3'
import D3 from 'react-guitar/resources/D3.mp3'
import G3 from 'react-guitar/resources/G3.mp3'
import E4 from 'react-guitar/resources/E4.mp3'
import { useState } from 'react'
import Number from './Number'
import Toggle from './Toggle'
import Select from './Select'

export default function Demo() {
  const [muted, setMuted] = useState(true)
  const [lefty, setLefty] = useState(false)
  const [frets, setFrets] = useState(22)
  const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])
  const [tuningName, setTuningName] = useState<keyof typeof tunings>('standard')
  const tuning = tunings[tuningName]
  const { play } = useGuitar({ E2, D3, G3, E4 }, strings, tuning, muted)

  return (
    <div className="slide-up w-full py-4">
      <div className="flex flex-wrap items-center justify-center px-4">
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
          label="Sound"
          value={!muted}
          onChange={sound => setMuted(!sound)}
        />
      </div>
      <div className="flex-grow mt-4 flex items-center justify-center">
        <div className="sm:rounded overflow-hidden shadow">
          <Guitar
            frets={{ from: 0, amount: frets }}
            strings={tuning.map((_, i) => strings[i] ?? 0)}
            lefty={lefty}
            renderFinger={getRenderFingerSpn(tuning)}
            onChange={setStrings}
            onPlay={play}
          />
        </div>
      </div>
    </div>
  )
}
