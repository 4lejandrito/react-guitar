export default function Button(props: {
  href: string
  label: string
  target?: '_blank'
}) {
  return (
    <a
      href={props.href}
      target={props.target}
      className="mx-2 border-2 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
    >
      {props.label}
    </a>
  )
}
