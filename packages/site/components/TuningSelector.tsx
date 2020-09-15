import React from 'react'
import tunings, { toString, parse } from '../util/tunings'
import Select from 'react-select/creatable'
import { components } from 'react-select'
import { theme, styles, className } from '../util/react-select'
import classNames from 'classnames'

export default function TuningSelector(props: {
  tuning: number[]
  onChange: (tuning: number[]) => void
}) {
  return (
    <Select<{ label: string; value: number[] }>
      id="tuning-selector"
      instanceId="tuning-selector"
      className={classNames(className, 'w-40')}
      theme={theme}
      styles={styles}
      components={{
        DropdownIndicator: null,
        Option: props =>
          props.data.__isNew__ ? (
            <components.Option {...props} />
          ) : (
            <components.Option {...props}>
              <div className="flex items-center text-sm">
                <span className="font-normal">{props.data.label}</span>{' '}
                <pre className="flex-grow text-right font-mono text-xs">
                  {toString(props.data.value)}
                </pre>
              </div>
            </components.Option>
          )
      }}
      formatCreateLabel={name => (
        <div className="flex items-center text-sm">
          <span className="font-normal">Custom</span>{' '}
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
