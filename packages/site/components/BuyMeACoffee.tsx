import { usePlausible } from 'next-plausible'
import { unpaddedHeaderButton } from '../css/classes'
import classNames from 'classnames'

export function BuyMeACoffee() {
  const plausible = usePlausible()
  return (
    <a
      style={{ height: '2.25rem' }}
      className={classNames(
        unpaddedHeaderButton,
        'overflow-hidden flex-shrink-0'
      )}
      href="https://www.buymeacoffee.com/b4iusc3"
      title="Buy Me A Coffee"
      target="_blank"
      onClick={() => plausible('buymeacoffee')}
    >
      <img
        className="h-full"
        src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
        alt="Buy Me A Coffee"
      />
    </a>
  )
}
