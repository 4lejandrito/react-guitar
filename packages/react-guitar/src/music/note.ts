import mod from './mod'

const scales = [
  'C , C♯, D , D♯, E , F , F♯, G , G♯, A , A♯, B ',
  'D♭, ? , E♭, ? , F , G♭, ? , A♭, ? , B♭, ? , C ',
  'D , ? , E , ? , F♯, G , ? , A , ? , B , ? , C♯',
  'E♭, ? , F , ? , G , A♭, ? , B♭, ? , C , ? , D ',
  'E , ? , F♯, ? , G♯, A , ? , B , ? , C♯, ? , D♯',
  'F , ? , G , ? , A , B♭, ? , C , ? , D , ? , E ',
  'F♯, ? , G♯, ? , A♯, B , ? , C♯, ? , D♯, ? , F ',
  'G , ? , A , ? , B , C , ? , D , ? , E , ? , F♯',
  'A♭, ? , B♭, ? , C , D♭, ? , E♭, ? , F , ? , G ',
  'A , ? , B , ? , C♯, D , ? , E , ? , F♯, ? , G♯',
  'B♭, ? , C , ? , D , E♭, ? , F , ? , G , ? , A ',
  'B , ? , C♯, ? , D♯, E , ? , F♯, ? , G♯, ? , A♯'
].map(s => s.split(', ').map(s => s.trim()))

const noteRegex = /^([A-Z])(♯|♭)?(-)?(\d+)?$/

export const fromText = (text: string) => {
  var match = text.match(noteRegex)

  if (match) {
    const letter = match[1]
    const accidental = match[2]
    const minus = !!match[3]
    const octave = match[4] ? (minus ? -1 : 1) * parseInt(match[4], 10) : -1
    let offset = scales[0].indexOf(letter)

    if (accidental) {
      if (accidental === '♯') {
        offset++
      } else if (accidental === '♭') {
        offset--
      }
    }

    return offset + (octave + 1) * 12
  }

  return NaN
}

export const spn = (value: number, key = 0) => {
  const { name, accidental, octave } = describe(value, key)
  return name + (accidental || '') + octave
}

export const describe = (value: number, key = 0) => {
  const fullName = name(value, key)

  return {
    name: fullName[0],
    accidental: fullName.length >= 2 ? fullName.substring(1) : null,
    octave: Math.floor((value - 12) / 12)
  }
}

export const name = (note: number, key = 0) => {
  const name = scales[key][mod(note - key, 12)]

  if (name === '?')
    return `${scales[key][mod(note + 1 - key, 12)]}♭/${
      scales[key][mod(note - 1 - key, 12)]
    }♯`

  return name
}

export const add = (note: number, semitones = 1) => note + semitones

export const same = (note1: number, note2: number) =>
  mod(note1 - note2, 12) === 0

export const toRelativeText = (note: number, key = 0) =>
  ['1', '2m', '2', '3m', '3', '4', '5dim', '5', '5aug', '6', '7m', '7'][
    mod(note - key, 12)
  ]

export default fromText
