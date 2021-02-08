import classNames from 'classnames'

export const transitioned = 'transition duration-200'
export const bordered = 'border-2 rounded'
export const clickable = classNames(
  transitioned,
  bordered,
  'font-semibold leading-tight h-10 px-2 text-gray-700 hover:border-gray-300 focus:border-gray-300 hover:shadow focus:outline-none focus:ring'
)
export const unpaddedHeaderButton = classNames(
  transitioned,
  bordered,
  'mx-2 hover:bg-blue-400 text-white font-semibold hover:shadow focus:outline-none focus:shadow-outline-inverse'
)
export const headerButton = classNames(unpaddedHeaderButton, 'py-1 px-2')
export const button = classNames(clickable, 'text-center')
