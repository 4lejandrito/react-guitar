import { css } from '@emotion/core'

export default css({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflowY: 'auto',

  '> li': {
    width: '10em',
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    position: 'relative',
    borderTopWidth: '0.5em',
    borderBottomWidth: '2em',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    verticalAlign: 'top',

    '&.nut': {
      width: '7em',
      flexShrink: 0,
      zIndex: 1
    },

    '&:not(.nut)::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '0.3em',
      display: 'inline-block'
    },

    '.marker': {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '.lefty &': {
        transform: 'scale(-1, 1)'
      }
    },

    '.counter': {
      width: '100%',
      height: '6%',
      position: 'absolute',
      bottom: '-1.5em',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  }
})
