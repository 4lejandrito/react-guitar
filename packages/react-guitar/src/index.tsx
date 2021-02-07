/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useRef, Fragment, useMemo, ReactElement, useState } from 'react'
import useLayoutEffect from './hooks/layoutEffect'
import range from 'lodash.range'
import uniqueId from 'lodash.uniqueid'
import { set } from './util/arrays'
import classNames from 'classnames'
import { get, fromMidiSharps } from '@tonaljs/note'
import { fromSemitones } from '@tonaljs/interval'
import spanishTheme, { Theme } from './util/theme'
import getStyles from './styles'
import color from 'color'
import { getKey } from 'keyboard-key'

export { spanishTheme, Theme }

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

const mod = (n: number, m: number) => (m + (n % m)) % m

export function getRenderFingerRelative(tuning: number[], root: number) {
  return (string: number, fret: number) => (
    <Fragment>
      {range(12).map(fromSemitones)[mod(tuning[string] + fret - root, 12)]}
    </Fragment>
  )
}

function Frets(props: {
  className?: string
  currentFret?: number
  frets: {
    from: number
    amount: number
  }
  children?: (fret: number) => ReactElement | ReactElement[] | null
  onMouseEnter?: () => void
}) {
  const { from, amount } = props.frets
  return (
    <div
      className={classNames(props.className, 'frets')}
      onMouseEnter={props.onMouseEnter}
    >
      {props.currentFret !== undefined && (
        <div
          className="fret mute"
          style={{ zIndex: props.currentFret === -1 ? 1 : undefined }}
        >
          {props.children?.(-1)}
        </div>
      )}
      {range(from, from + amount + 1).map((fret) => (
        <div className={classNames('fret', { nut: fret === 0 })} key={fret}>
          {props.children?.(fret)}
        </div>
      ))}
    </div>
  )
}

export default function Guitar(props: {
  id?: string
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
    playOnHover,
  } = props
  const id = useMemo(() => props.id || uniqueId('guitar-'), [props.id])
  const styles = useMemo(() => getStyles(theme), [theme])
  const ref = useRef(null as HTMLDivElement | null)
  const focusString = (string: number, fret: number = strings[string]) =>
    ref.current
      ?.querySelector?.<HTMLInputElement>(
        `input[name="${id}-string-${string}"][value="${fret}"]`
      )
      ?.focus()
  const releaseString = (string: number) =>
    pressString(string, strings[string] === 0 ? -1 : 0)
  const pressString = (string: number, fret: number) => {
    focusString(string, fret)
    props.onChange?.(set(strings, string, fret))
  }
  const getNavigationDelta = (e: KeyboardEvent) => {
    switch (getKey(e)) {
      case 'ArrowDown':
        return { x: 0, y: 1 }
      case 'ArrowUp':
        return { x: 0, y: -1 }
      case 'ArrowRight':
        return { x: lefty ? -1 : 1, y: 0 }
      case 'ArrowLeft':
        return { x: lefty ? 1 : -1, y: 0 }
      default:
        return null
    }
  }
  useLayoutEffect(() => {
    const fretsNode = ref.current
    if (center && fretsNode) {
      const children = fretsNode.querySelectorAll('.fret')
      const pressedFrets = strings.filter((fret) => fret > 0)
      const minFret = Math.min.apply(Math, pressedFrets)
      const maxFret = Math.max.apply(Math, pressedFrets)
      const toFret = minFret + Math.floor((maxFret - minFret) / 2)
      const fretNode = children[toFret] as HTMLElement | undefined
      if (fretNode) {
        fretsNode.scrollLeft =
          fretNode.offsetLeft -
          fretsNode.offsetWidth / 2 +
          fretNode.offsetWidth / 2
      }
    }
  }, [ref, strings, center, lefty])
  const [focusedString, setFocusedString] = useState(0)
  return (
    <div
      id={id}
      ref={ref}
      css={styles}
      className={classNames('guitar', { lefty }, props.className)}
      onKeyDown={(e) => {
        const delta = getNavigationDelta(e.nativeEvent)
        if (delta) {
          const string = mod(focusedString + delta.y, strings.length)
          const fret = strings[string] + delta.x
          pressString(
            string,
            fret > frets.from + frets.amount
              ? -1
              : fret < -1
              ? frets.from + frets.amount
              : fret
          )
          e.preventDefault()
        }
      }}
    >
      <div className="sr-only">
        This is a guitar with {strings.length} strings and {frets.amount} frets,
        starting from {frets.from}. Its theme describes it as:{' '}
        {theme.description}.
        {props.onChange && (
          <span>
            Once you focus on a string you will be able to navigate strings and
            frets using the arrow keys.
          </span>
        )}
        {props.onPlay && (
          <span>
            When a specific string is focused you can play it by pressing 'p'.
          </span>
        )}
      </div>
      <div className="sr-only" role="status">
        Current fretting: {strings.join(', ')}.
      </div>
      <div className="strings">
        <Frets className="fretboard" frets={frets}>
          {theme.fret.marker
            ? (fret) => (
                <div className="marker">{theme.fret.marker?.(fret)}</div>
              )
            : undefined}
        </Frets>
        {strings.map((currentFret, string) => (
          <fieldset key={string} className="string">
            <legend className="sr-only">
              String {string + 1}.{' '}
              {currentFret === -1 && 'This string is muted.'}
            </legend>
            <Frets
              currentFret={currentFret}
              frets={frets}
              onMouseEnter={() => playOnHover && props.onPlay?.(string)}
            >
              {(fret) => (
                <label>
                  <span className="sr-only">
                    Fret {fret} {fret === -1 && '(Mute)'}.
                  </span>
                  {fret >= 0 && (
                    <span
                      className="actual-string"
                      style={{
                        opacity: currentFret === -1 ? 0.2 : 1,
                        borderBottom: `solid 0.2em ${color(
                          theme.string.color(string)
                        ).darken(0.35)}`,
                        backgroundColor: theme.string.color(string),
                      }}
                    />
                  )}
                  <input
                    disabled={!props.onChange}
                    type="radio"
                    name={`${id}-string-${string}`}
                    value={fret}
                    checked={currentFret === fret}
                    onChange={(e) => {
                      props.onChange?.(set(strings, string, fret))
                      e.target.focus()
                    }}
                    onClick={() =>
                      fret === currentFret && releaseString(string)
                    }
                    onKeyDown={(e) => {
                      switch (e.keyCode) {
                        case 80:
                          props.onPlay?.(string)
                          break
                        case 13:
                          releaseString(string)
                          e.preventDefault()
                      }
                    }}
                    onFocus={() => setFocusedString(string)}
                  />
                  <span className="finger">
                    {renderFinger?.(string, fret === -1 ? 0 : fret)}
                  </span>
                </label>
              )}
            </Frets>
          </fieldset>
        ))}
      </div>
      <Frets className="frame" frets={frets}>
        {(fret) =>
          fret !== 0 ? <span className="counter">{fret}</span> : null
        }
      </Frets>
    </div>
  )
}
