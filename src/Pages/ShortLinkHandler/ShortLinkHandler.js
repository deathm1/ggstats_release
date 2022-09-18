import * as React from 'react'
import { useParams } from 'react-router-dom'

export default function ShortLinkHandler(props) {
  const [url, seturl] = React.useState('asdasdasd')

  const { handle } = useParams()

  React.useEffect(() => {
    return () => {
      const url = handle
      seturl(url)
    }
  }, [handle])
  return <>{url}</>
}
