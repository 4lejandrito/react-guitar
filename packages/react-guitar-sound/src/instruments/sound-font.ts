import Soundfont, { InstrumentName } from 'soundfont-player'
import { StringInstrument } from '../util/player'

export default function withSoundFont(
  instrumentName: InstrumentName,
  options?: {
    format?: 'mp3' | 'ogg'
    soundfont?: 'FluidR3_GM' | 'MusyngKite'
  }
): StringInstrument {
  return async (tuning) => {
    const audioContext = new (window.AudioContext ||
      ((window as any).webkitAudioContext as typeof AudioContext))()
    const player = await Soundfont.instrument(audioContext, instrumentName, {
      ...options,
    })

    return {
      play: (string, fret, when = 0) => {
        player.play(
          (tuning[string] + fret) as any,
          audioContext.currentTime + when,
          {
            duration: 4,
            gain: 4,
          }
        )
      },
      dispose: () => {
        player.stop()
        audioContext.close()
      },
    }
  }
}
