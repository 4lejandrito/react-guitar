import { Styles, Theme } from 'react-select'

export const className = 'font-semibold text-gray-700 hover:shadow rounded'

export const theme = (theme: Theme) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    neutral20: '#e2e8f0',
    neutral40: 'rgba(203, 213, 224)',
  },
})

export const styles: Partial<Styles> = {
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
    boxShadow: state.isFocused && `0 0 0 3px rgba(66, 153, 225, 0.5)`,
  }),
}
