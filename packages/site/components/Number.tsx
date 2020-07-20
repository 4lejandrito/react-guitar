export default function Number(props: {
  disabled?: boolean
  label: string
  value: number
  min: number
  max?: number
  onChange: (value: number) => void
}) {
  return (
    <label className="w-1/2 p-2 sm:w-40 text-center">
      <small className="text-center block font-bold text-gray-600 uppercase mb-2">
        {props.label}
      </small>
      <input
        className="w-full appearance-none placeholder-gray-500 placeholder-opacity-100 border rounded h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        disabled={props.disabled}
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={e => props.onChange(e.target.valueAsNumber)}
      />
    </label>
  )
}
