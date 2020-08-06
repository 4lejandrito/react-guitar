import tunings, { toString, parse } from '../util/tunings'
import Select from 'react-select/creatable'
import { components } from 'react-select'

export default function TuningSelector(props: {
  tuning: number[]
  onChange: (tuning: number[]) => void
}) {
  return (
    <Select<{ label: string; value: number[] }>
      className="w-40"
      theme={theme => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          neutral20: '#e2e8f0'
        }
      })}
      styles={{
        menu: provided => ({ ...provided, width: '18em', zIndex: 3 }),
        control: (provided, state) => ({
          ...provided,
          borderColor: state.theme.colors.neutral20,
          '&:hover': {
            borderColor: state.theme.colors.neutral20
          },
          height: '2.5rem',
          boxShadow: state.isFocused && `0 0 0 3px rgba(66, 153, 225, 0.5)`
        })
      }}
      components={{
        Option: props =>
          props.data.__isNew__ ? (
            <components.Option {...props} />
          ) : (
            <components.Option {...props}>
              <div className="flex items-center text-sm">
                {props.data.label}{' '}
                <pre className="flex-grow text-right font-mono text-xs">
                  {toString(props.data.value)}
                </pre>
              </div>
            </components.Option>
          )
      }}
      formatCreateLabel={name => (
        <div className="flex items-center text-sm">
          Custom{' '}
          <pre className="flex-grow text-right font-mono text-xs">
            {toString(parse(name))}
          </pre>
        </div>
      )}
      options={Array.from(
        new Set(tunings.map(tuning => tuning.instrument))
      ).map(instrument => ({
        label: instrument,
        options: tunings
          .filter(tuning => tuning.instrument === instrument)
          .map((tuning, i) => ({
            label: tuning.name,
            value: tuning.notes
          }))
      }))}
      value={{
        label: `${toString(props.tuning)}`,
        value: props.tuning
      }}
      onChange={option => props.onChange((option as any).value)}
      onCreateOption={text => props.onChange(parse(text))}
    />
  )
}
