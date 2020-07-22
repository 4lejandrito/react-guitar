import React, { useEffect, useRef } from 'react'
import min from 'lodash.min'
import range from 'lodash.range'
import scroll from 'scroll'
import Strings from './strings'
import { Props } from '..'
import { set } from '../util/arrays'
import classNames from 'classnames'

export default function Guitar(props: Props) {
  const {
    strings = [],
    fitFretting = false,
    frets = { from: 0, amount: 22 },
    lefty = false,
    renderFinger
  } = props

  const pressedKeys = useRef([Number])
  const currentChord = useRef({
    chord: Number,
    fif: false,
    sev: false,
    nin: false
  })

  const fretsNodeRef = useRef(null as HTMLOListElement | null)
  const fretNodesRef = useRef({} as { [K: number]: HTMLLIElement | null })

  useEffect(() => {
    document.addEventListener('keydown', (event: any) => {
      if (!pressedKeys.current.includes(event.keyCode)) {
        pressedKeys.current.push(event.keyCode)
      }

      const currentChord = {
        chord: Number,
        fif: false,
        sev: false,
        nin: false
      }

      pressedKeys.current.forEach((key: any) => {
        if (key >= 65 && key <= 71) {
          currentChord.chord = key
        } else if (key === 53) {
          currentChord.fif = true
        } else if (key === 55) {
          currentChord.sev = true
        } else if (key === 57) {
          currentChord.nin = true
        }
      })

      let strings

      switch (currentChord.chord as any) {
        case 67: // C
          strings = currentChord.fif
            ? [-1, -1, -1, 5, 3, -1]
            : currentChord.sev
            ? [0, 1, 3, 2, 3, 0]
            : currentChord.nin
            ? [0, 3, 3, 2, 3, -1]
            : [0, 1, 0, 2, 3, 0]
          break
        case 68: // D
          strings = currentChord.fif
            ? [-1, -1, -1, 7, 5, -1]
            : currentChord.sev
            ? [2, 1, 2, 0, 0, 0]
            : currentChord.nin
            ? [0, 1, 2, 0, -1, -1]
            : [2, 3, 2, 0, 0, 0]

          props.onChange?.([2, 3, 2, 0, 0, 0])
          break
        case 69: // E
          strings = currentChord.fif
            ? [-1, -1, -1, 9, 7, -1]
            : currentChord.sev
            ? [0, 0, 1, 0, 2, 0]
            : currentChord.nin
            ? [2, 0, 1, 0, 2, 0]
            : [0, 0, 1, 2, 2, 0]
          break
        case 70: // F
          strings = currentChord.fif
            ? [-1, -1, -1, -1, 3, 1]
            : currentChord.sev
            ? [1, 1, 2, 1, 3, 1]
            : currentChord.nin
            ? [3, 1, 2, 1, 3, 1]
            : [1, 1, 2, 3, 3, 1]
          break
        case 71: // G
          strings = currentChord.fif
            ? [-1, -1, -1, -1, 5, 3]
            : currentChord.sev
            ? [1, 0, 0, 0, 2, 3]
            : currentChord.nin
            ? [1, 0, 2, 0, -1, -1]
            : [3, 0, 0, 0, 2, 3]
          break
        case 65: // A
          strings = currentChord.fif
            ? [-1, -1, -1, -1, 7, 5]
            : currentChord.sev
            ? [0, 2, 0, 2, 0, 0]
            : currentChord.nin
            ? [3, 2, 4, 2, 0, -1]
            : [0, 2, 2, 2, 0, 0]
          break
        case 66: // B
          strings = currentChord.fif
            ? [-1, -1, -1, -1, 9, 7]
            : currentChord.sev
            ? [2, 0, 2, 1, 2, 0]
            : currentChord.nin
            ? [2, 2, 2, 1, 2, -1]
            : [2, 4, 4, 4, 2, 2]
          break
      }

      if (strings) {
        props.onChange?.(strings)
      }
    })

    document.addEventListener('keyup', (event: any) => {
      const keyPosition = pressedKeys.current.indexOf(event.keyCode)

      if (keyPosition !== -1) {
        pressedKeys.current.splice(keyPosition, 1)
      }
    })
  }, [])

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
            <Strings
              disabled={!props.onChange}
              fret={fret}
              strings={strings}
              renderFinger={renderFinger}
              onFretted={string =>
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
              onPlay={string => props.onPlay?.(string)}
            />

            {fret !== 0 && <span className="counter">{fret}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}
