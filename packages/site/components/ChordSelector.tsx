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
import { button } from '../css/classes'
import classNames from 'classnames'

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
  useEffect(() => setFrettingIndex(0), [notes, root])
  const { strum } = useSound(fretting, props.tuning)
  return (
    <Modal
      isOpen={props.open}
      title="Select a chord"
      onRequestClose={props.onRequestClose}
      onAfterClose={props.onAfterClose}
    >
      <div
        className="text-sm bg-blue-500 text-white px-3 py-2 rounded mb-3"
        role="alert"
      >
        <strong>Work in progress!</strong> Feedback is welcome on{' '}
        <a
          className="underline"
          href="https://github.com/4lejandrito/react-guitar/issues/8"
          target="__blank"
        >
          <strong>this issue</strong>
        </a>
        .
      </div>
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
          className={classNames(button, 'w-10')}
          disabled={frettingIndex === 0 || frettings.length === 0}
          onClick={() => setFrettingIndex(frettingIndex - 1)}
        >
          👈
        </button>
        <span className="inline-block w-24 text-center">
          {frettings.length ? frettingIndex + 1 : 0} / {frettings.length}
        </span>
        <button
          className={classNames(button, 'w-10')}
          disabled={
            frettingIndex === frettings.length - 1 || frettings.length === 0
          }
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
        <button className={classNames(button, 'mx-2')} onClick={() => strum()}>
          👆 Strum 🎶
        </button>
        <button
          className={classNames(button, 'mx-2')}
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
  open: boolean
  strings: number[]
  tuning: number[]
  frets: number
  lefty: boolean
  theme?: Theme
  onChange: (strings: number[]) => void
  onRequestOpenChange: (open: boolean) => void
}) {
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
        className={classNames(button, 'w-32 truncate')}
        title={chordName || 'Select a chord'}
        onClick={() => {
          plausible('chords')
          props.onRequestOpenChange(true)
          setClosed(false)
        }}
      >
        {chordName || '❓'}
      </button>
      {!closed && (
        <ChordSelectorModal
          {...props}
          initialName={chordName}
          open={props.open}
          onRequestClose={() => props.onRequestOpenChange(false)}
          onAfterClose={() => setClosed(true)}
        />
      )}
    </>
  )
}
