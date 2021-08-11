export type StringInstrument = (tuning: number[]) => Promise<{
  play: (string: number, fret: number, when: number) => void
  dispose: () => void
}>

export type Player = {
  play: (string: number, fret: number, when: number) => Promise<void>
  dispose: () => void
}

export default async (
  instrument: StringInstrument,
  tuning: number[],
  onChange: (playing: boolean[]) => void
): Promise<Player> => {
  const { play, dispose } = await instrument(tuning)
  const resolvers: Partial<{ [K: number]: (change?: boolean) => void }> = {}
  const playing = tuning.map(() => false)
  const setPlaying = (string: number, value: boolean) => {
    if (playing[string] !== value) {
      playing[string] = value
      setTimeout(() => onChange([...playing]), 0)
    }
  }

  return {
    play: (string, fret, when = 0) =>
      new Promise((resolve) => {
        resolvers[string]?.(when === 0)
        if (fret < 0) return resolve()
        const startTimeout = setTimeout(
          () => setPlaying(string, true),
          when * 1000
        )
        const endTimeout = setTimeout(
          (resolvers[string] = (change) => {
            delete resolvers[string]
            clearTimeout(startTimeout)
            clearTimeout(endTimeout)
            resolve()
            if (!change) setPlaying(string, false)
          }),
          3000 + when * 1000
        )
        play(string, fret, when)
      }),
    dispose,
  }
}
