import { css } from '@emotion/core'

export default css({
  fontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  position: 'relative',
  boxSizing: 'border-box',
  maxWidth: '100%',
  display: 'inline-flex',

  '&.lefty': {
    direction: 'rtl'
  },

  '*': {
    boxSizing: 'border-box'
  },

  'ol,li': {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
})
