import { tunings, spanishTheme, Theme } from 'react-guitar'
import Guitar from './Guitar'
import useSound from '../hooks/sound'
import React, { useMemo, useState } from 'react'
import Number from './Number'
import Toggle from './Toggle'
import Select from './Select'
import Label from './Label'
import coco from 'react-guitar-theme-coco'
import dark from 'react-guitar-theme-dark'
import TuningSelector from './TuningSelector'
import QueryProvider, {
  boolean,
  number,
  numbers,
  string,
  useQuery,
  useURL
} from './Query'
import { useCopyToClipboard } from 'react-use'
import ChordSelector from './ChordSelector'
import { button } from '../css/classes'
import Emoji from './Emoji'
import KeyboardShortcuts from './KeyboardShortcuts'

const zero = () => 0

function Demo() {
  const [playOnHover, setPlayOnHover] = useQuery('playOnHover', false, boolean)
  const [lefty, setLefty] = useQuery('lefty', false, boolean)
  const [frets, setFrets] = useQuery('frets', 22, number)
  const [tuning, setTuning] = useQuery('tuning', tunings.standard, numbers)
  const [strings, setStrings] = useQuery(
    'strings',
    useMemo(() => tuning.map(zero), [tuning]),
    numbers
  )
  const themes: { [K: string]: Theme } = { spanish: spanishTheme, dark, coco }
  const [themeName, setThemeName] = useQuery('theme', 'spanish', string)
  const theme = themes[themeName] || themes.spanish
  const [chordSelectorOpen, setChordSelectorOpen] = useState(false)
  const { play, strum } = useSound(strings, tuning, chordSelectorOpen)
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const [center, setCenter] = useState(true)
  const url = useURL()

  return (
    <div className="slide-up animation-delay w-full py-4 flex-grow flex flex-col">
      <div className="flex flex-wrap items-stretch justify-center px-4">
        <Label name="Tuning">
          <TuningSelector tuning={tuning} onChange={setTuning} />
        </Label>
        <Label name="Theme">
          <Select
            value={themeName}
            values={Object.keys(themes)}
            onChange={setThemeName}
          />
        </Label>
        <Label name="Frets">
          <Number value={frets} min={0} max={40} onChange={setFrets} />
        </Label>
        <Label name="Left handed">
          <Toggle value={lefty} onChange={setLefty} />
        </Label>
        <Label name="Play on hover">
          <Toggle value={playOnHover} onChange={setPlayOnHover} />
        </Label>
        <Label name="Chord">
          <ChordSelector
            open={chordSelectorOpen}
            strings={strings}
            tuning={tuning}
            frets={frets}
            lefty={lefty}
            theme={theme}
            onRequestOpenChange={setChordSelectorOpen}
            onChange={setStrings}
          />
        </Label>
        <Label name="Strum">
          <button className={button} onClick={() => strum()} title="Strum">
            <Emoji text="🎶 👆" />
          </button>
        </Label>
        <Label className="w-24" name={copied ? 'Copied!' : 'Copy Link'}>
          <button
            className={button}
            onClick={() => {
              copy(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 1000)
            }}
            title={`Copy link to current state: ${url}`}
          >
            <Emoji text="🎸🔗" />
          </button>
        </Label>
        <Label name="Keys">
          <KeyboardShortcuts />
        </Label>
      </div>
      <div className="relative flex-grow mt-4 flex items-center justify-center">
        <Guitar
          frets={{ from: 0, amount: frets }}
          strings={tuning.map((_, i) => strings[i] ?? 0)}
          tuning={tuning}
          lefty={lefty}
          center={center}
          theme={theme}
          onChange={strings => {
            setStrings(strings)
            setCenter(false)
          }}
          playOnHover={playOnHover}
          onPlay={play}
        />
      </div>
    </div>
  )
}

export default function DemoWithQuery() {
  return (
    <QueryProvider>
      <Demo />
    </QueryProvider>
  )
}
