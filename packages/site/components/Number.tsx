export default function Number(props: {
  disabled?: boolean
  value: number
  min: number
  max?: number
  onChange: (value: number) => void
}) {
  return (
    <input
      className="w-24 appearance-none placeholder-gray-500 placeholder-opacity-100 border rounded h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      disabled={props.disabled}
      type="number"
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={e => props.onChange(e.target.valueAsNumber)}
    />
  )
}
