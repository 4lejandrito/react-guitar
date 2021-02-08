import React from 'react'
import {
  SelectComponentsConfig,
  StylesConfig,
  Theme,
  components,
} from 'react-select'
import classNames from 'classnames'

export const className = 'font-semibold text-gray-700 hover:shadow rounded'

export const theme = (theme: Theme) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    neutral20: 'rgb(229, 231, 235)',
    neutral40: '#d4d4d8',
  },
})

export const styles: StylesConfig<any, false> = {
  singleValue: (provided) => ({ ...provided, color: 'inherit' }),
  menu: (provided) => ({ ...provided, width: '18em', zIndex: 3 }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.theme.colors.neutral20,
    borderWidth: '2px',
    '&:hover': {
      borderColor: state.theme.colors.neutral40,
    },
    height: '2.5rem',
    boxShadow: undefined,
  }),
}

export const customComponents: SelectComponentsConfig<any, any> = {
  DropdownIndicator: null,
  Control: (props) => (
    <components.Control
      {...props}
      className={classNames(props.className, {
        'outline-none ring': props.isFocused,
      })}
    />
  ),
}
