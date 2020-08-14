import { css } from '@emotion/core'

export default css({
  fontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  position: 'relative',
  boxSizing: 'border-box',
  maxWidth: '100%',
  overflowY: 'auto',
  whiteSpace: 'nowrap',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  '&.lefty': {
    direction: 'rtl'
  },

  '*, *::before, *::after': {
    boxSizing: 'border-box'
  },

  'ol,li': {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
})
