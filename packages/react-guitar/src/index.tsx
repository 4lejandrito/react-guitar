/** @jsx jsx */
import { jsx } from '@emotion/core'
import useSound from './hooks/sound'
import tunings from './util/tunings'
import { useLayoutEffect, useRef, Fragment } from 'react'
import range from 'lodash.range'
import { set } from './util/arrays'
import classNames from 'classnames'
import { get, fromMidiSharps } from '@tonaljs/note'
import spanishTheme, { Theme } from './util/theme'
import './css/guitar.scss'

export { useSound, tunings, spanishTheme, Theme }

export function getRenderFingerSpn(tuning: number[]) {
  return (string: number, fret: number) => {
    const { letter, acc, oct } = get(fromMidiSharps(tuning[string] + fret))
    return (
      <span>
        {letter}
        {acc === '#' ? '♯' : acc === 'b' ? '♭' : ''}
        <sub>{oct}</sub>
      </span>
    )
  }
}

export function getRenderFingerRelative(tuning: number[], root: number) {
  const mod = (n: number, m: number) => (m + (n % m)) % m
  return (string: number, fret: number) => (
    <Fragment>
      {
        ['1', '2m', '2', '3m', '3', '4', '5dim', '5', '5aug', '6', '7m', '7'][
          mod(tuning[string] + fret - root, 12)
        ]
      }
    </Fragment>
  )
}

export default function Guitar(props: {
  className?: string
  strings?: number[]
  frets?: {
    from: number
    amount: number
  }
  lefty?: boolean
  center?: boolean
  renderFinger?: (string: number, fret: number) => JSX.Element
  theme?: Theme
  onChange?: (strings: number[]) => void
  onPlay?: (string: number) => void
}) {
  const {
    strings = [],
    frets = { from: 0, amount: 22 },
    lefty = false,
    center = false,
    renderFinger,
    theme = spanishTheme
  } = props
  const fretsNodeRef = useRef(null as HTMLOListElement | null)
  const fretNodesRef = useRef({} as { [K: number]: HTMLLIElement | null })
  useLayoutEffect(() => {
    const fretsNode = fretsNodeRef.current
    if (center && fretsNode) {
      const pressedFrets = strings.filter(fret => fret > 0)
      const minFret = Math.min.apply(Math, pressedFrets)
      const maxFret = Math.max.apply(Math, pressedFrets)
      const toFret = minFret + Math.floor((maxFret - minFret) / 2)
      const fretNode = fretNodesRef.current[toFret]
      if (fretNode) {
        fretsNode.scrollLeft =
          fretNode.offsetLeft -
          fretsNode.offsetWidth / 2 +
          fretNode.offsetWidth / 2
      }
    }
  }, [fretsNodeRef, fretNodesRef, strings, center, lefty])
  return (
    <div className={classNames('guitar', { lefty }, props.className)}>
      <ol className="frets" ref={fretsNodeRef}>
        {range(frets.from, frets.from + frets.amount + 1).map(fret => (
          <li
            className={fret === 0 ? 'nut' : undefined}
            key={fret}
            css={{
              backgroundColor: fret === 0 ? theme.nut.color : theme.fret.color,
              borderColor: theme.color,
              '&:before': {
                backgroundColor: theme.fret.separator.color
              }
            }}
            ref={node => (fretNodesRef.current[fret] = node)}
          >
            {theme.fret.marker && (
              <div className="marker">{theme.fret.marker(fret)}</div>
            )}
            <ol className="strings">
              {strings.map((currentFret, string) => (
                <li
                  key={string}
                  css={{
                    '&:after': {
                      backgroundColor: theme.string.color(string)
                    }
                  }}
                  onMouseEnter={() =>
                    currentFret >= 0 && props.onPlay?.(string)
                  }
                >
                  <label>
                    <input
                      disabled={!props.onChange}
                      type="checkbox"
                      checked={currentFret === fret}
                      onChange={() =>
                        props.onChange?.(
                          set(
                            strings,
                            string,
                            fret === 0 && strings[string] === 0
                              ? -1
                              : strings[string] === fret
                              ? 0
                              : fret
                          )
                        )
                      }
                    />
                    <span
                      className="finger"
                      css={{ color: theme.finger.color }}
                    >
                      {renderFinger?.(string, fret)}
                    </span>
                  </label>
                </li>
              ))}
            </ol>
            {fret !== 0 && (
              <span
                className="counter"
                css={{ color: theme.fret.counter.color }}
              >
                {fret}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
