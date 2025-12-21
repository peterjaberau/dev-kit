import { chakra, Container } from '@chakra-ui/react'
import { Ref } from "react"
import { useRoot } from "../selectors"


export const Root = (props: any) => {

  const { data } = useRoot()


  return (
    <Container
      css={{
        padding: 0,
        margin: 0
      }}
    >
      <chakra.pre>
        { JSON.stringify(data, null, 2) }
      </chakra.pre>
    </Container>
  )

}
