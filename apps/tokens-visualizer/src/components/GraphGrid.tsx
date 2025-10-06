import { Box } from '@chakra-ui/react'

export const GraphGrid = (props: any) => (
  <Box
    position="absolute"
    width="100vw"
    height="100vh"
    backgroundImage={`
      radial-gradient(circle at 1px 1px, var(--chakra-colors-gray-300) 1px, transparent 0)
    `}
    backgroundSize="20px 20px"
    backgroundPosition={`${props.posx}px ${props.posy}px`}
    opacity={0.5}
  />
);
