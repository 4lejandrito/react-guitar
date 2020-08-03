export type Theme = {
  color: string
  nut: { color: string }
  fret: {
    color: string
    separator: { color: string }
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
    separator: { color: '#daa520' },
    counter: { color: '#606c76' }
  },
  string: { color: () => '#f3f3f3' },
  finger: { color: '#606c76' }
})
