import { css } from '@emotion/react'
import { Theme } from '..'
import color from 'color'

const sw = (theme: Theme) => (theme.fret.separator.width === 'md' ? 0.7 : 0.3)
const stringHeight = 3.33125

export default (theme: Theme) =>
  css({
    fontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    position: 'relative',
    boxSizing: 'border-box',
    maxWidth: '100%',
    overflowY: 'auto',
    borderTopColor: theme.color,
    borderTopStyle: 'solid',
    borderTopWidth: '0.5em',

    '&.lefty': {
      direction: 'rtl',
      '.marker': {
        transform: 'scale(-1, 1)',
      },
      '.mute': {
        left: 'auto',
        right: 0,
      },
    },

    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },

    '.frets': {
      display: 'flex',
      position: 'relative',
      '.fret': {
        width: '10em',
        flexShrink: 0,
        position: 'relative',
        '&.nut,&.mute': {
          width: '7em',
        },
        '&.mute': {
          position: 'absolute',
          top: 0,
          left: 0,
        },
      },
    },

    '.frame': {
      height: '2em',
      '.counter': {
        fontWeight: 'bold',
        color: theme.fret.counter.color,
      },
      '.fret': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.color,
      },
    },

    '.strings': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      minHeight: `${stringHeight * 3}em`,

      '.string': {
        margin: 0,
        padding: 0,
        border: 'none',
        '.fret': {
          display: 'flex',
          alignItems: 'center',

          '.actual-string': {
            transition: 'opacity ease-in-out 0.1s',
            content: '""',
            width: '100%',
            height: '0.65em',
            position: 'absolute',
            left: '0',
          },

          label: {
            fontSize: '1em',
            width: '100%',
            height: `${stringHeight}em`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
          },

          '&:hover input:not(:disabled):not(:checked) ~ .finger': {
            opacity: 0.5,
          },

          'input:not(:disabled)': {
            height: '100%',
            width: '100%',
          },

          'input:not(:disabled),input:not(:disabled) ~ .finger': {
            cursor: 'pointer',
          },

          input: {
            position: 'absolute',
            margin: 0,
            opacity: 0,
            '&:checked ~ .finger': {
              opacity: 1,
            },
            '&:focus:not(:disabled) ~ .finger': {
              boxShadow: '0 0 0 0.2em rgba(66, 153, 225, 0.5)',
            },
          },
          '&.mute': {
            'input:checked ~ .finger': {
              opacity: 0,
            },
            'input:focus ~ .finger,&:hover input:checked ~ .finger': {
              opacity: 0.5,
            },
          },
        },
      },
    },

    '.fretboard': {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      '.fret': {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'end',
        backgroundColor: theme.fret.color,
        '&.nut': {
          backgroundColor: theme.nut.color,
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
          display: 'inline-block',
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
        },
      },
    },

    '.finger': {
      color: theme.finger.text.color,
      transition: 'opacity ease-in-out 0.1s',
      background: theme.finger.color,
      width: '5em',
      padding: '0',
      height: `${3.5 / 1.5}em`,
      borderRadius: '20px',
      borderBottom: `solid 0.2em ${color(theme.finger.color).darken(0.35)}`,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)',
      fontWeight: 'bold',
      opacity: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
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
      borderWidth: 0,
    },
  })
