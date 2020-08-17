import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import classnames from 'classnames'

ReactModal.setAppElement('#__next')

export default function Modal({
  children,
  className,
  isOpen,
  title,
  onRequestClose = () => {},
  onAfterClose = () => {}
}: {
  children: ReactNode | ReactNode[]
  className?: string
  isOpen: boolean
  title: string
  onRequestClose?: () => void
  onAfterClose?: () => void
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={title}
      overlayClassName="fixed top-0 w-full h-screen overflow-auto z-50 pt-16 sm:pt-24 sm:px-6"
      className="w-full mx-auto sm:w-auto max-w-screen-lg outline-none"
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
        className={classnames(
          className,
          'bg-white sm:rounded shadow px-4 sm:px-8 w-full sm:w-auto max-w-full text-gray-800 sm:mb-12'
        )}
      >
        <p className="relative text-lg w-full text-center py-4 border-t border-b text-gray-700">
          <strong>{title}</strong>
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
