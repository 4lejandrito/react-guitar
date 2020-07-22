import useSound from './hooks/sound'
import tunings from './music/tunings'
import React, { useEffect, useRef } from 'react'
import min from 'lodash.min'
import range from 'lodash.range'
import scroll from 'scroll'
import { set } from './util/arrays'
import classNames from 'classnames'
import { toRelativeText } from './music/note'
import { describe } from './music/note'
import './css/guitar.scss'

export { useSound, tunings }

export function getRenderFingerSpn(tuning: number[], key?: number) {
  return (string: number, fret: number) => {
    const { name, accidental, octave } = describe(tuning[string] + fret, key)
    return (
      <span>
        {name}
        {accidental}
        <sub>{octave}</sub>
      </span>
    )
  }
}

export function getRenderFingerRelative(tuning: number[], root: number) {
  return (string: number, fret: number) => (
    <>{toRelativeText(tuning[string] + fret, root)}</>
  )
}

export default function Guitar(props: {
  className?: string
  fitFretting?: boolean
  strings?: number[]
  frets?: {
    from: number
    amount: number
  }
  lefty?: boolean
  renderFinger?: (string: number, fret: number) => JSX.Element
  onChange?: (strings: number[]) => void
  onPlay?: (string: number) => void
}) {
  const {
    strings = [],
    fitFretting = false,
    frets = { from: 0, amount: 22 },
    lefty = false,
    renderFinger
  } = props
  const fretsNodeRef = useRef(null as HTMLOListElement | null)
  const fretNodesRef = useRef({} as { [K: number]: HTMLLIElement | null })
  useEffect(() => {
    const fretsNode = fretsNodeRef.current
    if (fretsNode) {
      const toFret =
        min(strings.map(fret => fret).filter(fret => fret > 0)) || 1
      const fretNode = fretNodesRef.current[toFret]
      if (fitFretting && fretNode) {
        if (lefty) {
          if (fretNode.offsetLeft > 0) {
            scroll.left(fretsNode, fretsNode.scrollWidth - fretNode.offsetLeft)
          } else {
            scroll.left(
              fretsNode,
              fretNode.offsetLeft - fretsNode.offsetWidth + fretNode.offsetWidth
            )
          }
        } else {
          scroll.left(fretsNode, fretNode.offsetLeft)
        }
      }
    }
  }, [fretsNodeRef, fretNodesRef, strings])
  return (
    <div className={classNames('guitar', { lefty }, props.className)}>
      <ol className="frets" ref={fretsNodeRef}>
        {range(frets.from, frets.from + frets.amount + 1).map(fret => (
          <li
            className={fret === 0 ? 'nut' : undefined}
            key={fret}
            ref={node => (fretNodesRef.current[fret] = node)}
          >
            <ol className="strings">
              {strings.map((currentFret, string) => (
                <li
                  key={string}
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
                    <span className="finger">
                      {renderFinger?.(string, fret)}
                    </span>
                  </label>
                </li>
              ))}
            </ol>
            {fret !== 0 && <span className="counter">{fret}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}
