import React from 'react'
import emoji from 'react-easy-emoji'

export default function Emoji(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > & {
    text: string
  }
) {
  const { text, ...rest } = props
  return (
    <span {...rest} className="inline-block">
      {emoji(props.text, {
        baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
        ext: '.svg',
        size: '',
        props: {
          className: 'emoji inline-block',
        },
      })}
    </span>
  )
}
