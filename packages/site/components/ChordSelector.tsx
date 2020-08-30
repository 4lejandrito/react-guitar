import { useState, useMemo, useEffect } from 'react'
import Modal from './Modal'
import Label from './Label'
import range from 'lodash.range'
import { Theme } from 'react-guitar'
import Guitar from './Guitar'
import Select from './Select'
import { midiToNoteName } from '@tonaljs/midi'
import Note from '@tonaljs/note'
import ChordType from '@tonaljs/chord-type'
import Chord from '@tonaljs/chord'
import { fromSemitones } from '@tonaljs/interval'
import pcset from '@tonaljs/pcset'
import fretter from 'guitar-fretter'
import useSound from '../hooks/sound'
import { usePlausible } from 'next-plausible'

const getNotes = (type: string) => ChordType.get(type).setNum
const mask = (i: number) => 1 << (11 - i)
const set = (bits: number, i: number) => bits | mask(i)
const clear = (bits: number, i: number) => bits & ~mask(i)
const test = (bits: number, i: number) => !!(bits & mask(i))
const getFrets = (strings: number[]) => {
  const minFret = Math.min.apply(
    Math,
    strings.filter(s => s > 0)
  )
  const maxFret = Math.max.apply(Math, strings)
  return {
    from: maxFret < 4 ? 0 : minFret - 1,
    amount: Math.max(maxFret - minFret, 4)
  }
}
const getFretterChord = (root: string, notes: number) => ({
  root: Note.chroma(root) ?? 0,
  semitones: range(11).map(i => test(notes, i + 1))
})

function ChordSelectorModal(props: {
  initialName: string
  open: boolean
  tuning: number[]
  frets: number
  lefty: boolean
  theme?: Theme
  onChange: (strings: number[]) => void
  onRequestClose: () => void
  onAfterClose: () => void
}) {
  const initialChord = Chord.get(props.initialName)
  const [root, setRoot] = useState(initialChord.tonic || 'C')
  const [type, setType] = useState(initialChord.aliases[0] || 'M')
  const [notes, setNotes] = useState(() => getNotes(type))
  const pressed = 0
  const types = ChordType.all()
    .filter(type => type.intervals.length <= props.tuning.length)
    .filter(type => type.aliases.length > 0)
    .sort((t1, t2) => t2.aliases[0].localeCompare(t1.aliases[0]))
  const frettings = useMemo(
    () => fretter(getFretterChord(root, notes), props),
    [props.tuning, props.frets, notes, root]
  )
  const [frettingIndex, setFrettingIndex] = useState(0)
  const fretting = frettings[frettingIndex] ?? props.tuning.map(() => 0)
  useEffect(() => setFrettingIndex(0), [notes])
  const { strum } = useSound(fretting, props.tuning)
  return (
    <Modal
      isOpen={props.open}
      title="Select a chord"
      onRequestClose={props.onRequestClose}
      onAfterClose={props.onAfterClose}
    >
      <div className="w-full flex items-center justify-center flex-wrap border-b pb-2 mb-4">
        <Label
          name={
            <div>
              Type
              <div className="mt-1">
                <strong>{type}</strong>
              </div>
            </div>
          }
          lowercase
        >
          <Select
            value={type}
            values={[...types.map(type => type.aliases[0]), '-']}
            onChange={type => {
              setType(type)
              setNotes(getNotes(type))
            }}
          />
        </Label>
        <Label
          name={
            <div>
              Root
              <div className="mt-1">
                <strong>{root}</strong>
              </div>
            </div>
          }
          lowercase
        >
          <Select
            value={root}
            values={range(12).map(i =>
              midiToNoteName(i, { pitchClass: true, sharps: true })
            )}
            onChange={setRoot}
          />
        </Label>
        <div className="inline-flex overflow-auto">
          {range(1, 12).map(i => (
            <Label
              key={i}
              lowercase
              name={
                <div>
                  {fromSemitones(i)}
                  <div className="mt-1">
                    <strong>
                      {midiToNoteName((Note.get(root + '0').midi ?? 0) + i, {
                        pitchClass: true,
                        sharps: true
                      })}
                    </strong>
                  </div>
                </div>
              }
            >
              <input
                className="mx-2"
                type="checkbox"
                disabled={
                  !test(notes, i) &&
                  (pressed >= props.tuning.length ||
                    !types.some(
                      type =>
                        type.setNum === set(notes, i) ||
                        pcset.isSubsetOf(pcset.get(type.setNum))(
                          pcset.get(set(notes, i))
                        )
                    ))
                }
                checked={test(notes, i)}
                onChange={e => {
                  const setNum = (e.target.checked ? set : clear)(notes, i)
                  const newType = types.find(type => type.setNum === setNum)
                  setType(newType?.aliases[0] ?? '-')
                  setNotes(setNum)
                }}
              />
            </Label>
          ))}
        </div>
      </div>
      <div>
        <button
          className="mx-2 border-2 hover:bg-gray-200 font-bold py-1 px-2 rounded"
          disabled={frettingIndex === 0}
          onClick={() => setFrettingIndex(frettingIndex - 1)}
        >
          👈
        </button>
        <span className="inline-block w-24 text-center">
          {frettingIndex + 1} / {frettings.length}
        </span>
        <button
          className="mx-2 border-2 hover:bg-gray-200 font-bold py-1 px-2 rounded"
          disabled={frettingIndex === frettings.length - 1}
          onClick={() => setFrettingIndex(frettingIndex + 1)}
        >
          👉
        </button>
      </div>
      <div className="text-sm my-4 w-full flex items-center justify-center">
        <Guitar
          center
          frets={getFrets(fretting)}
          strings={fretting}
          lefty={props.lefty}
          tuning={props.tuning}
          theme={props.theme}
        />
      </div>
      <div>
        <button
          className="mx-2 border-2 bg-white hover:bg-gray-200 font-bold py-1 px-2 rounded"
          onClick={() => strum()}
        >
          👆 Strum 🎶
        </button>
        <button
          className="mx-2 border-2 bg-white hover:bg-gray-200 font-bold py-1 px-2 rounded"
          onClick={() => {
            props.onChange(fretting)
            props.onRequestClose()
          }}
        >
          🎯 Select 🎶
        </button>
      </div>
    </Modal>
  )
}

export default function ChordSelector(props: {
  strings: number[]
  tuning: number[]
  frets: number
  lefty: boolean
  theme?: Theme
  onChange: (strings: number[]) => void
}) {
  const [open, setOpen] = useState(false)
  const [closed, setClosed] = useState(true)
  const chordName = Chord.detect(
    props.tuning
      .map((midi, i) =>
        props.strings[i] === -1 ? -1 : midi + props.strings[i]
      )
      .filter(midi => midi !== -1)
      .reverse()
      .map(midi => midiToNoteName(midi))
  )[0]
  const plausible = usePlausible()
  return (
    <>
      <button
        className="border h-10 w-24 hover:bg-gray-200 py-1 px-2 rounded truncate"
        title={chordName || 'Select a chord'}
        onClick={() => {
          plausible('chords')
          setOpen(true)
          setClosed(false)
        }}
      >
        {chordName || '❓'}
      </button>
      {!closed && (
        <ChordSelectorModal
          {...props}
          initialName={chordName}
          open={open}
          onRequestClose={() => setOpen(false)}
          onAfterClose={() => setClosed(true)}
        />
      )}
    </>
  )
}
