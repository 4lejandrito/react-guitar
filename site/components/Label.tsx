import React, { ReactNode } from 'react'
import classnames from 'classnames'

export default function Label(props: {
  className?: string
  name: string | ReactNode
  lowercase?: boolean
  children: ReactNode
}) {
  return (
    <label className={classnames('p-2 flex flex-col', props.className)}>
      <small
        className={classnames('text-center font-bold text-gray-600 mb-2', {
          uppercase: !props.lowercase
        })}
      >
        {props.name}
      </small>
      <div className="h-10 flex items-center justify-center">
        {props.children}
      </div>
    </label>
  )
}
