import Switch from 'react-switch'

export default function Toggle(props: {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="w-1/2 p-2 sm:w-auto flex flex-col">
      <small className="text-center font-bold text-gray-600 uppercase mb-2">
        {props.label}
      </small>
      <div className="h-10 flex items-center justify-center">
        <Switch
          onColor="#48bb78"
          checkedIcon={false}
          handleDiameter={16}
          uncheckedIcon={false}
          checked={props.value}
          onChange={props.onChange}
        />
      </div>
    </label>
  )
}
