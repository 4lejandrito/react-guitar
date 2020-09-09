import Select, { components, createFilter } from 'react-select'
import { ChordType, get } from '@tonaljs/chord-type'
import Interval from '@tonaljs/interval'
import { useMemo } from 'react'

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
      className="font-semibold text-gray-700 hover:shadow rounded"
      theme={theme => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          neutral20: '#e2e8f0',
          neutral40: 'rgba(203, 213, 224)'
        }
      })}
      styles={{
        singleValue: provided => ({ ...provided, color: 'inherit' }),
        menu: provided => ({ ...provided, width: '18em', zIndex: 3 }),
        control: (provided, state) => ({
          ...provided,
          borderColor: state.theme.colors.neutral20,
          borderWidth: '2px',
          '&:hover': {
            borderColor: state.theme.colors.neutral40
          },
          height: '2.5rem',
          boxShadow: state.isFocused && `0 0 0 3px rgba(66, 153, 225, 0.5)`
        })
      }}
      components={{
        DropdownIndicator: null,
        Option: props => {
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
        }
      }}
      options={useMemo(
        () => [
          ...['Major', 'Minor', 'Augmented', 'Diminished'].map(quality => ({
            label: quality,
            options: props.types
              .filter(type => type.quality === quality)
              .sort((a, b) => compare(a.intervals, b.intervals))
              .map(type => ({
                label: name(type),
                value: type.setNum
              }))
          }))
        ],
        [props.types]
      )}
      value={{ label: name(get(props.notes)), value: props.notes }}
      filterOption={createFilter({
        stringify: type => {
          const { name, aliases, intervals, quality } = get(type.value)
          return `${name} ${aliases.join(' ')} ${quality} ${intervals.join(
            ' '
          )}`
        }
      })}
      onChange={option => props.onChange((option as any).value)}
    />
  )
}
