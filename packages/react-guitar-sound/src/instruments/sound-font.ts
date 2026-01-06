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
    const context: { audioContext?: AudioContext; player?: Soundfont.Player } =
      {}
    const audioContext = () =>
      (context.audioContext =
        context.audioContext ??
        new (window.AudioContext ||
          ((window as any).webkitAudioContext as typeof AudioContext))())
    const player = async () =>
      (context.player =
        context.player ??
        (await Soundfont.instrument(audioContext(), instrumentName, {
          ...options,
        })))
    return {
      play: (string, fret, when = 0) => {
        player().then((player) =>
          player.play(
            (tuning[string] + fret) as any,
            audioContext().currentTime + when,
            {
              duration: 4,
              gain: 4,
            }
          )
        )
      },
      dispose: () => {
        player().then((player) => {
          player.stop()
          audioContext().close()
        })
      },
    }
  }
}
