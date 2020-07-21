import { ReactNode } from 'react'

export default function Label(props: { name: string; children: ReactNode }) {
  return (
    <label className="p-2 flex flex-col">
      <small className="text-center font-bold text-gray-600 uppercase mb-2">
        {props.name}
      </small>
      <div className="h-10 flex items-center justify-center">
        {props.children}
      </div>
    </label>
  )
}
