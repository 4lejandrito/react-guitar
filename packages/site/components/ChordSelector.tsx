import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
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
import Emoji from './Emoji'
import ChordTypeSelector from './ChordTypeSelector'
import { useKey } from 'react-use'

const getNotes = (type?: { setNum: number }) => type?.setNum ?? 0
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
const detectChord = (
  tuning: number[],
  strings: number[]
): TChord | undefined => {
  const name = Chord.detect(
    tuning
      .map((midi, i) => (strings[i] === -1 ? -1 : midi + strings[i]))
      .filter(midi => midi !== -1)
      .reverse()
      .map(midi => midiToNoteName(midi))
  )[0]
  const chord = Chord.get(name)
  return { ...chord, symbol: chord.symbol || name }
}

type TChord = ReturnType<typeof Chord['get']>

function ChordSelectorModal(props: {
  chord?: TChord
  open: boolean
  tuning: number[]
  frets: number
  lefty: boolean
  theme?: Theme
  onChange: (chord: TChord, fretting: number[]) => void
  onRequestClose: () => void
  onAfterClose: () => void
}) {
  const initialChord = props.chord
  const [root, setRoot] = useState(initialChord?.tonic || 'C')
  const [notes, setNotes] = useState(() => getNotes(initialChord))
  const pressed = 0
  const types = useMemo(
    () =>
      ChordType.all()
        .filter(type => type.intervals.length <= props.tuning.length)
        .filter(type => type.aliases.length > 0)
        .sort((t1, t2) => t2.aliases[0].localeCompare(t1.aliases[0])),
    [props.tuning]
  )
  const frettings = useMemo(
    () =>
      fretter(getFretterChord(root, notes), {
        frets: props.frets,
        tuning: props.tuning
      }),
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
          rel="noopener"
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
                <strong>{ChordType.get(notes)?.aliases[0] ?? '❓'}</strong>
              </div>
            </div>
          }
          lowercase
        >
          <div className="w-24 h-10">
            {props.open && (
              <ChordTypeSelector
                notes={notes}
                types={types}
                onChange={setNotes}
              />
            )}
          </div>
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
                onChange={e =>
                  setNotes((e.target.checked ? set : clear)(notes, i))
                }
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
          <Emoji text="👈" />
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
          <Emoji text="👉" />
        </button>
      </div>
      <div className="text-sm my-4 w-full flex items-center justify-center">
        <Guitar
          id="chords"
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
          <Emoji text="👆 Strum 🎶" />
        </button>
        <button
          className={classNames(button, 'mx-2')}
          onClick={() => {
            props.onChange(
              Chord.getChord(ChordType.get(notes).aliases[0], root),
              fretting
            )
            props.onRequestClose()
          }}
        >
          <Emoji text="🎯 Select 🎶" />
        </button>
      </div>
    </Modal>
  )
}

function useKeyboardChord(props: {
  chord?: TChord
  tuning: number[]
  frets: number
  onChange: (chord: TChord, fretting: number[]) => void
}) {
  const { chord, tuning, frets, onChange } = props
  const update = useCallback(
    (root: string, type: number) => {
      const chord = Chord.getChord(ChordType.get(type).aliases[0], root)
      onChange(
        chord,
        fretter(getFretterChord(root, type), { frets, tuning })[0]
      )
    },
    [tuning, frets, onChange]
  )

  useKey(
    () => true,
    e =>
      Note.names().includes(e.key.toUpperCase()) &&
      update(e.key, ChordType.get('M').setNum),
    {},
    [update]
  )

  useKey(
    'm',
    () => chord?.tonic && update(chord.tonic, ChordType.get('m').setNum),
    {},
    [update, chord]
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
  const [chord, setChord] = useState(detectChord(props.tuning, props.strings))
  const stringsRef = useRef(props.strings)
  const { onChange } = props
  const update = useCallback(
    (chord: TChord, fretting: number[]) => {
      setChord(chord)
      onChange((stringsRef.current = fretting))
    },
    [onChange]
  )
  useEffect(() => {
    const chord = detectChord(props.tuning, props.strings)
    setChord(chord)
    stringsRef.current = props.strings
  }, [props.strings, props.tuning])
  useKeyboardChord({ ...props, chord, onChange: update })
  const plausible = usePlausible()
  return (
    <>
      <button
        aria-live="polite"
        className={classNames(button, 'w-32 truncate')}
        title={chord?.symbol || 'Select a chord'}
        onClick={() => {
          plausible('chords')
          props.onRequestOpenChange(true)
          setClosed(false)
        }}
      >
        {chord?.symbol || <Emoji text="❓" />}
      </button>
      {!closed && (
        <ChordSelectorModal
          {...props}
          chord={chord}
          open={props.open}
          onChange={update}
          onRequestClose={() => props.onRequestOpenChange(false)}
          onAfterClose={() => setClosed(true)}
        />
      )}
    </>
  )
}
