import { css } from '@emotion/core'
import { Theme } from '..'
import color from 'color'

export const frets = css({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflowY: 'auto'
})

const sw = (theme: Theme) => (theme.fret.separator.width === 'md' ? 0.7 : 0.3)

export const fret = (fret: number, theme: Theme) =>
  css({
    width: '10em',
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    position: 'relative',
    borderTopWidth: '0.5em',
    borderBottomWidth: '2em',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    verticalAlign: 'top',
    backgroundColor: fret === 0 ? theme.nut.color : theme.fret.color,
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
        ? `solid ${sw(theme) / 2}em ${color(theme.fret.separator.color).darken(
            0.1
          )}`
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
      justifyContent: 'center',

      '.lefty &': {
        transform: 'scale(-1, 1)'
      }
    }
  })

export const counter = (theme: Theme) =>
  css({
    width: '100%',
    height: '6%',
    position: 'absolute',
    bottom: '-1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.fret.counter.color
  })
