import * as React from 'react'

export default function ShortLinkHandler(props) {
  const [url, seturl] = React.useState('asdasdasd')

  React.useEffect(() => {
    return () => {
      const raw = window.location.pathname
      if (raw !== '/') {
        const url = raw
        seturl(url)
      }
    }
  }, [])
  return <>{url}</>
}