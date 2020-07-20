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
            <Strings
              disabled={!props.onChange}
              fret={fret}
              strings={strings}
              renderFinger={renderFinger}
              onFretted={string =>
                props.onChange?.(
                  set(strings, string, strings[string] === fret ? 0 : fret)
                )
              }
              onOption={string => props.onOptions?.(string, fret)}
              onPlay={string => props.onPlay?.(string)}
            />
            {fret !== 0 && <span className="counter">{fret}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}
