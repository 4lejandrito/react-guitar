import React, { useState } from 'react'
import Modal from './Modal'
import { button } from '../css/classes'
import classNames from 'classnames'
import Emoji from './Emoji'
import { useKey } from 'react-use'
import Note from '@tonaljs/note'

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false)
  useKey('?', () => setShow(true))
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
              { keys: 'w', description: 'Strum up' },
              { keys: 's', description: 'Strum down' },
              {
                keys: '↑ ↓ tab',
                description: 'Move between strings'
              },
              {
                keys: '← →',
                description: 'Select frets on the focused string'
              },
              {
                keys: 'enter',
                description: 'Release / mute the focused string'
              },
              {
                keys: 'p',
                description: 'Play the focused string'
              },
              {
                keys: '1 2 3 4 5 6',
                description: 'Play each string'
              },
              {
                keys: Note.names().join(' '),
                description: 'Fret a major chord'
              },
              {
                keys: 'm',
                description: 'Make the current chord minor'
              },
              {
                keys: '?',
                description: 'Open keyboard shortcut help'
              }
            ].map(({ keys, description }, i) => (
              <tr key={i}>
                <td className="border px-4 py-2 text-right">{description}</td>
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
