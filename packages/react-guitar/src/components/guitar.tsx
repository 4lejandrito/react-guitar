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
      <div className="nut">
        <Strings
          disabled={!props.onChange}
          fret={0}
          strings={strings}
          renderFinger={renderFinger}
          onFretted={string =>
            props.onChange?.(
              set(strings, string, strings[string] === 0 ? -1 : 0)
            )
          }
          onOption={string => props.onOptions?.(string, 0)}
          onPlay={string => props.onPlay?.(string)}
        />
      </div>
      <ol className="frets" ref={fretsNodeRef}>
        {range(frets.from + 1, frets.from + frets.amount + 1).map(fret => (
          <li key={fret} ref={node => (fretNodesRef.current[fret] = node)}>
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
            <span className="counter">{fret}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
