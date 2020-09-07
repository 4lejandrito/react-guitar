import { useState } from 'react'
import Modal from './Modal'
import { button } from '../css/classes'
import classNames from 'classnames'
import Emoji from './Emoji'

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button
        className={classNames(button, 'w-10')}
        title="Keyboard shortcuts"
        onClick={() => setShow(!show)}
      >
        <Emoji text="⌨️" />
      </button>
      <Modal
        isOpen={show}
        title="Keyboard shortcuts"
        small
        onRequestClose={() => setShow(false)}
      >
        <table className="table-auto">
          <thead className="sr-only">
            <tr>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Key</th>
            </tr>
          </thead>
          <tbody>
            {[
              { keys: 'w', description: 'Strum up', emojis: ' 🎶 👇' },
              { keys: 's', description: 'Strum down', emojis: '🎶 👆' },
              {
                keys: '↑ ↓ tab',
                description: 'Move between strings',
                emojis: '⏫ ⏬'
              },
              {
                keys: '← →',
                description: 'Select frets on the focused string',
                emojis: '⏪ ⏩'
              },
              {
                keys: 'enter',
                description: 'Release / mute the focused string',
                emojis: '👎 👍'
              },
              {
                keys: 'p',
                description: 'Play the focused string',
                emojis: '🎶 🎻'
              }
            ].map(({ keys, description, emojis }, i) => (
              <tr key={i}>
                <td className="border px-4 py-2 text-right">
                  {description} <Emoji aria-hidden text={emojis} />
                </td>
                <td className="border px-4 py-2 text-center">
                  {keys.split(' ').map((key, i) => (
                    <kbd
                      key={i}
                      className="font-mono text-sm h-6 px-2 mx-1 bg-gray-800 shadow inline-flex items-center justify-center rounded text-white border-b-4 border-gray-900"
                    >
                      {key}
                    </kbd>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  )
}
