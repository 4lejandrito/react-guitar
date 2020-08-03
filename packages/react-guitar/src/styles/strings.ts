import { css } from '@emotion/core'
import { Theme } from '..'
import color from 'color'

export const strings = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '20em'
})

export const string = (string: number, theme: Theme) =>
  css({
    zIndex: 1,
    margin: '0',
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',

    '&::after': {
      content: '""',
      width: '100%',
      height: '0.65em',
      position: 'absolute',
      left: '0',
      borderBottom: `solid 0.2em ${color(theme.string.color(string)).darken(
        0.35
      )}`,
      backgroundColor: theme.string.color(string)
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
  })

const height = `${3.5 / 1.5}em`

export const finger = (theme: Theme) =>
  css({
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
  })
