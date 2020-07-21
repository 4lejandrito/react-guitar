import React from 'react'

export default function Strings(props: {
  disabled: boolean
  fret: number
  strings: number[]
  renderFinger?: (string: number, fret: number) => JSX.Element
  onFretted: (string: number) => void
  onPlay: (string: number) => void
}) {
  return (
    <ol className="strings">
      {props.strings.map((fret, string) => (
        <li key={string} onMouseEnter={() => fret >= 0 && props.onPlay(string)}>
          <label>
            <input
              disabled={props.disabled}
              type="checkbox"
              checked={fret === props.fret}
              onChange={() => props.onFretted(string)}
            />
            <span className="finger">
              {props.renderFinger?.(string, props.fret)}
            </span>
          </label>
        </li>
      ))}
    </ol>
  )
}
