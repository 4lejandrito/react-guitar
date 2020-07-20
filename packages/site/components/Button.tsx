export default function Button(props: { href: string; label: string }) {
  return (
    <a
      href={props.href}
      target="__blank"
      className="mx-2 border-2 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
    >
      {props.label}
    </a>
  )
}
