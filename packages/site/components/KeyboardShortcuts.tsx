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
              { keys: 'w', description: 'Strum up 🎶 👇' },
              { keys: 's', description: 'Strum down 🎶 👆' },
              {
                keys: 'tab',
                description: 'Move between strings and frets ⏪ ⏩'
              },
              {
                keys: 'space',
                description: 'Press / release the focused string 👎 👍'
              },
              {
                keys: 'p',
                description: 'Play the focused string 🎶 🎻'
              }
            ].map(({ keys, description }, i) => (
              <tr key={i}>
                <td className="border px-4 py-2 text-right">
                  <Emoji text={description} />
                </td>
                <td className="border px-4 py-2 text-center">
                  <kbd className="font-mono text-sm h-6 px-2 bg-gray-800 shadow inline-flex items-center justify-center rounded text-white border-b-4 border-gray-900">
                    {keys}
                  </kbd>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  )
}
