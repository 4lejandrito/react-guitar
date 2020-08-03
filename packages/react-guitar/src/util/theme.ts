export type Theme = {
  color: string
  nut: { color: string }
  fret: {
    color: string
    separator: {
      color: string
      radius?: boolean
      shadow?: boolean
      width?: 'sm' | 'md'
    }
    marker?: (fret: number) => JSX.Element | null
    counter: { color: string }
  }
  string: { color: (string: number) => string }
  finger: { color: string }
}
const makeTheme = (theme: Theme) => theme

export default makeTheme({
  color: '#333333',
  nut: { color: '#fffacd' },
  fret: {
    color: '#9e6429',
    separator: { color: '#daa520', shadow: true },
    counter: { color: '#606c76' }
  },
  string: { color: () => '#eeeeee' },
  finger: { color: '#606c76' }
})
