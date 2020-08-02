import { css } from '@emotion/core'

const height = `${3.5 / 1.5}em`

export default css({
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

    '&::after': {
      content: '""',
      width: '100%',
      height: '0.6em',
      position: 'absolute',
      left: '0',
      borderBottom: 'solid 0.1em #555'
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
    '&:hover input:not(:disabled):not(:checked) + .finger,input:focus:not(:disabled):not(:checked) + .finger': {
      opacity: 0.5
    },
    'input:not(:disabled)': {
      height: '100%',
      width: '100%'
    },
    'input:not(:disabled),input:not(:disabled) + .finger': {
      cursor: 'pointer'
    },
    input: {
      position: 'absolute',
      opacity: 0,
      '&:checked + .finger': {
        opacity: 1
      },
      '&:focus:not(:disabled) + .finger': {
        boxShadow: '0 0 0 0.2em rgba(66, 153, 225, 0.5)'
      }
    },
    '.finger': {
      transition: 'opacity ease-in-out 0.1s',
      background: 'white',
      width: '5em',
      padding: '0',
      height: height,
      borderRadius: '100px',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      lineHeight: height,
      textAlign: 'center',
      fontWeight: 'bold',
      opacity: 0
    }
  }
})
