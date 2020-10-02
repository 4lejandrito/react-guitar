import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import classNames from 'classnames'

ReactModal.setAppElement('#__next')

export default function Modal({
  children,
  isOpen,
  title,
  small,
  onRequestClose = () => {},
  onAfterClose = () => {}
}: {
  children: ReactNode | ReactNode[]
  isOpen: boolean
  title: string
  small?: boolean
  onRequestClose?: () => void
  onAfterClose?: () => void
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={title}
      overlayClassName="fixed top-0 w-full h-screen overflow-auto z-50 flex flex-col"
      className={classNames(
        'inline-flex mt-auto md:m-auto max-w-full outline-none',
        {
          'm-auto': small,
          'w-full max-w-screen-md': !small
        }
      )}
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
    >
      <style jsx global>{`
        .ReactModal__Body--open {
          overflow-y: hidden;
        }
        .ReactModal__Overlay {
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.65) !important;
          transition: opacity 200ms ease-in-out;
        }
        .ReactModal__Overlay--after-open {
          opacity: 1;
        }
        .ReactModal__Overlay--before-close {
          opacity: 0;
        }
        .ReactModal__Content {
          transition: all 200ms ease-in-out;
        }
      `}</style>
      <main
        className={classNames(
          'inline-block max-w-full w-full bg-white md:rounded shadow px-4 md:px-8 text-gray-800 md:my-8',
          { rounded: small }
        )}
      >
        <p className="relative text-lg w-full text-center py-4 border-t border-b text-gray-700">
          <strong className="inline-block w-64">{title}</strong>
          <button
            className="absolute right-0 top-0 leading-none px-2 pb-1 mt-3 focus:outline-none focus:shadow-outline transition duration-200 rounded text-right text-3xl outline-none"
            onClick={onRequestClose}
          >
            ×
          </button>
        </p>

        <div className="flex flex-col items-center justify-center pt-4 pb-6">
          {children}
        </div>
      </main>
    </ReactModal>
  )
}
