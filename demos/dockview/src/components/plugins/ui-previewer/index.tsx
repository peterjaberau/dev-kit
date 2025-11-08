"use client"
// import { useParams } from "next/navigation"
import { Container } from "@chakra-ui/react"
import { ComponentRenderer } from "./component-renderer"



export const UiPreviewerPlugin = () => {
  // const params = useParams()


  return (
    <Container fluid w="full" h="full"  p={3}>
        <ComponentRenderer id={'sharing-02'} />
        {/*<ComponentRenderer id={params?.id as any} />*/}
    </Container>
  )
}

