import { Center, Container } from "@chakra-ui/react"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container css={{
      backgroundColor: 'bg.panel',
      p: 10,
      height: '100vh',
    }}>
      <Center css={{ boxShadow: 'sm', w: 'full', h: 'full'}}>{children}</Center>
    </Container>
  )
}
