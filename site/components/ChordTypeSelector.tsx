import Select, { components, createFilter } from 'react-select'
import { ChordType, get } from '@tonaljs/chord-type'
import Interval from '@tonaljs/interval'
import React, { useMemo } from 'react'
import { theme, styles, className } from '../util/react-select'

const set = (bits: number, i: number) => bits | (1 << i)

const getIntervalNumber = (interval: string) =>
  Interval.get(interval).semitones ?? 0

const getIntervalsNumber = (intervals: string[]) =>
  intervals.map(getIntervalNumber).reduce((acc, i) => set(acc, 30 - i), 0)

const compare = (a: string[], b: string[]) =>
  a.length !== b.length
    ? a.length - b.length
    : getIntervalsNumber(b) - getIntervalsNumber(a)

const name = (type: ChordType | undefined) => type?.aliases[0] || '❓'

export default function ChordTypeSelector(props: {
  notes: number
  types: ChordType[]
  onChange: (notes: number) => void
}) {
  return (
    <Select<{ label: string; value: number }>
      id="chord-type-selector"
      instanceId="chord-type-selector"
      className={className}
      theme={theme}
      styles={styles}
      components={{
        DropdownIndicator: null,
        Option: (props) => {
          const { aliases = [], intervals = [], name = '❓' } = get(
            props.data.value
          )
          const subTitle =
            ((!name && aliases.length > 1) || name) && aliases.join(', ')
          return (
            <components.Option {...props}>
              <div className="flex justify-center flex-col text-sm">
                <span>{name || aliases[0]}</span>
                <div className="flex">
                  <small
                    title={subTitle}
                    className="inline-block truncate font-normal"
                  >
                    {subTitle}
                  </small>
                  <pre className="flex-grow text-right font-normal font-mono text-xs">
                    {intervals.join(' ')}
                  </pre>
                </div>
              </div>
            </components.Option>
          )
        },
      }}
      options={useMemo(
        () => [
          ...['Major', 'Minor', 'Augmented', 'Diminished'].map((quality) => ({
            label: quality,
            options: props.types
              .filter((type) => type.quality === quality)
              .sort((a, b) => compare(a.intervals, b.intervals))
              .map((type) => ({
                label: name(type),
                value: type.setNum,
              })),
          })),
        ],
        [props.types]
      )}
      value={{ label: name(get(props.notes)), value: props.notes }}
      filterOption={createFilter({
        stringify: (type) => {
          const { name, aliases, intervals, quality } = get(type.value)
          return `${name} ${aliases.join(' ')} ${quality} ${intervals.join(
            ' '
          )}`
        },
      })}
      onChange={(option) => props.onChange((option as any).value)}
    />
  )
}
