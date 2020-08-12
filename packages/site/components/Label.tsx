import { ReactNode } from 'react'
import classnames from 'classnames'

export default function Label(props: {
  className?: string
  name: string
  children: ReactNode
}) {
  return (
    <label className={classnames('p-2 flex flex-col', props.className)}>
      <small className="text-center font-bold text-gray-600 uppercase mb-2">
        {props.name}
      </small>
      <div className="h-10 flex items-center justify-center">
        {props.children}
      </div>
    </label>
  )
}
