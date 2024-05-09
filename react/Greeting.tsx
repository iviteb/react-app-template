import React, { useEffect } from 'react'
import { useUpdateSessionInline, useFullSession } from 'vtex.session-client'
import { SessionSuccess } from 'vtex.session-client/react/SessionTypes'


type Props = {
  name: string
}

function Greeting({ name }: Props) {

  const sessionData = useFullSession()
  console.log("🚀 ~ Greeting ~ sessionData:", sessionData?.data?.session)
  const [updateSession, { loading, called, data }] = useUpdateSessionInline()
  console.log("🚀 ~ Greeting ~ updateSession:", updateSession)
  console.log("🚀 ~ Greeting ~ updateSession:", loading, called, data)

  useEffect(() => {
    if (!sessionData?.data?.session) {
      return
    }

    const currentValue = (sessionData?.data?.session as SessionSuccess)?.namespaces?.public?.itDoesntMatter?.value
    console.log("🚀 ~ useEffect ~ currentValue:", currentValue)

    const newValue = currentValue !== 'a' ? 'a' : 'b'
    console.log("🚀 ~ useEffect ~ newValue:", newValue)
    updateSession({
      variables: {
        fields: {
          "itDoesntMatter": newValue
        }
      }
    })
  }, [
    sessionData?.data?.session
  ])
  return <div>Hey, {name}</div>
}

export default Greeting
