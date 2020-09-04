import { css } from '@emotion/core'
import { Theme } from '..'
import color from 'color'

const sw = (theme: Theme) => (theme.fret.separator.width === 'md' ? 0.7 : 0.3)
const height = `${3.5 / 1.5}em`

export default (theme: Theme) =>
  css({
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
      direction: 'rtl',
      '.marker': {
        transform: 'scale(-1, 1)'
      }
    },

    '*, *::before, *::after': {
      boxSizing: 'border-box'
    },

    'ol,li': {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },

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
      borderColor: theme.color,

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
        width: `${sw(theme)}em`,
        backgroundColor: theme.fret.separator.color,
        borderRight: theme.fret.separator.shadow
          ? `solid ${sw(theme) / 2}em ${color(
              theme.fret.separator.color
            ).darken(0.1)}`
          : 0,
        borderRadius: theme.fret.separator.radius ? '3px' : 0,
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
        justifyContent: 'center'
      },

      '.counter': {
        width: '100%',
        height: '6%',
        position: 'absolute',
        bottom: '-1.5em',
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.fret.counter.color
      }
    },

    '.strings': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '20em',

      '> li': {
        zIndex: 1,
        margin: '0',
        position: 'relative',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',

        '.string': {
          transition: 'opacity ease-in-out 0.1s',
          content: '""',
          width: '100%',
          height: '0.65em',
          position: 'absolute',
          left: '0'
        },

        label: {
          fontSize: '1em',
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          margin: 0
        },

        '&:hover input:not(:disabled):not(:checked) ~ .finger,input:focus:not(:disabled):not(:checked) ~ .finger': {
          opacity: 0.5
        },

        'input:not(:disabled)': {
          height: '100%',
          width: '100%'
        },

        'input:not(:disabled),input:not(:disabled) ~ .finger': {
          cursor: 'pointer'
        },

        input: {
          position: 'absolute',
          opacity: 0,
          '&:checked ~ .finger': {
            opacity: 1
          },
          '&:focus:not(:disabled) ~ .finger': {
            boxShadow: '0 0 0 0.2em rgba(66, 153, 225, 0.5)'
          }
        }
      }
    },

    '.finger': {
      color: theme.finger.text.color,
      transition: 'opacity ease-in-out 0.1s',
      background: theme.finger.color,
      width: '5em',
      padding: '0',
      height: height,
      borderRadius: '20px',
      borderBottom: `solid 0.2em ${color(theme.finger.color).darken(0.35)}`,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)',
      lineHeight: height,
      textAlign: 'center',
      fontWeight: 'bold',
      opacity: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '.sr-only': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0
    }
  })
