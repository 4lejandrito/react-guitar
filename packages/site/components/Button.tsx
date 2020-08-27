import classNames from 'classnames'
import analytics from '../util/analytics'

export function BuyMeACoffee() {
  return (
    <a
      style={{ height: '2.25rem' }}
      className="rounded overflow-hidden border-2 mx-2 flex-shrink-0"
      href="https://www.buymeacoffee.com/b4iusc3"
      target="_blank"
      onClick={() => analytics('buymeacoffee')}
    >
      <img
        className="h-full"
        src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
        alt="Buy Me A Coffee"
      />
    </a>
  )
}

export default function Button(props: {
  className?: string
  href: string
  label: string
  target?: '_blank'
}) {
  return (
    <a
      href={props.href}
      target={props.target}
      className={classNames(
        'mx-2 border-2 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded',
        props.className
      )}
    >
      {props.label}
    </a>
  )
}
