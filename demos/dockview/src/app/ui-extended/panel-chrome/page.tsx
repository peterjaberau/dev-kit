'use client';
import { Container, SimpleGrid, GridItem } from '@chakra-ui/react'
import { PanelChrome } from "#components/ui-extended/PanelChrome/PanelChrome"
import { useToggle } from "react-use"
import { LoadingState } from "#components/ui-extended/PanelChrome/constants"

export default function Page() {
  const [collapsed, toggleCollapsed] = useToggle(false);

  return (
    <Container width='1000px' backgroundColor='bg.emphasized'>
      <PanelChrome
        padding={'none'}
        width={400}
        height={150}
        collapsible={false}
        onToggleCollapse={toggleCollapsed}
        title={'Very long title that should get ellipsis when there is no more space'}
        statusMessage={'Error text'}
        loadingState={LoadingState.Streaming}
        // displayMode={'transparent'}
        showMenuAlways={true}

      >
        {(innerWidth: number, innerHeight: number) => {
          return <div style={{ width: innerWidth, height: innerHeight }}>xyz</div>;
        }}

      </PanelChrome>

    </Container>
  );
}
