/** @jsx jsx */
import { jsx } from '@emotion/core'
import useSound from './hooks/sound'
import tunings from './util/tunings'
import { useRef, Fragment, useMemo } from 'react'
import useLayoutEffect from './hooks/layoutEffect'
import range from 'lodash.range'
import { set } from './util/arrays'
import classNames from 'classnames'
import { get, fromMidiSharps } from '@tonaljs/note'
import spanishTheme, { Theme } from './util/theme'
import getStyles from './styles'
import color from 'color'

export { useSound, tunings, spanishTheme, Theme }

export function getRenderFingerSpn(tuning: number[]) {
  return (string: number, fret: number) => {
    const { letter, acc, oct } = get(fromMidiSharps(tuning[string] + fret))
    return (
      <span>
        {letter}
        {acc === '#' ? '♯' : acc === 'b' ? '♭' : ''}
        <sub aria-label={`octave ${oct}`}>{oct}</sub>
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
  playOnHover?: boolean
  onChange?: (strings: number[]) => void
  onPlay?: (string: number) => void
}) {
  const {
    strings = [],
    frets = { from: 0, amount: 22 },
    lefty = false,
    center = false,
    renderFinger,
    theme = spanishTheme,
    playOnHover
  } = props
  const styles = useMemo(() => getStyles(theme), [theme])
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
    <ol
      aria-label={`This is a guitar with ${strings.length} strings and ${
        frets.amount
      } frets, starting from ${
        frets.from
      }. Its current fretting is ${strings.join(', ')}.${
        props.onChange ? ' You can tab between strings and frets.' : ''
      }${
        props.onPlay
          ? " When a specific string is focused you can play it by pressing 'p'."
          : ''
      }`}
      aria-live="polite"
      className={classNames('guitar', { lefty }, props.className)}
      css={styles}
      ref={fretsNodeRef}
    >
      {range(frets.from, frets.from + frets.amount + 1).map(fret => (
        <li
          className={fret === 0 ? 'nut' : undefined}
          key={fret}
          style={{
            backgroundColor: fret === 0 ? theme.nut.color : theme.fret.color
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
                onMouseEnter={() => playOnHover && props.onPlay?.(string)}
              >
                <div
                  className="string"
                  style={{
                    opacity: currentFret === -1 ? 0.2 : 1,
                    borderBottom: `solid 0.2em ${color(
                      theme.string.color(string)
                    ).darken(0.35)}`,
                    backgroundColor: theme.string.color(string)
                  }}
                />
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
                    onKeyPress={e => e.key === 'p' && props.onPlay?.(string)}
                  />
                  <span className="sr-only">
                    String {string + 1}, fret {fret}.
                  </span>
                  <span className="finger">{renderFinger?.(string, fret)}</span>
                </label>
              </li>
            ))}
          </ol>
          {fret !== 0 && <span className="counter">{fret}</span>}
        </li>
      ))}
    </ol>
  )
}
