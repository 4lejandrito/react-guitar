import emoji from 'react-easy-emoji'

export default function Emoji(props: {
  text: string
  title?: string
  style?: any
}) {
  return (
    <span style={props.style} className="inline-block">
      {emoji(props.text, {
        baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
        ext: '.svg',
        size: '',
        props: {
          title: props.title,
          className: 'emoji inline-block'
        }
      })}
    </span>
  )
}
