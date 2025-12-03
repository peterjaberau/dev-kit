'use client';
import { Container, SimpleGrid, GridItem } from '@chakra-ui/react'
import { Panel } from "#components/ui-extended/panel-chrome/panel"


const panelConfig = {
  menu: {
    items: [
      { label: "Ascending", value: "asc", onClick: () => console.log('asc!!!') },
      { label: "Descending", value: "desc", onClick: () => console.log('desc!!!') },
    ]
  },
  toolbar: {
    items: [
      { type: 'button', label: "Ascending", value: "asc", onClick: () => console.log('asc!!!') },
      { type: 'link', label: "Descending", value: "desc", onClick: () => console.log('desc!!!') },
      { type: 'toggle', label: "Descending", value: "desc", onClick: () => console.log('desc!!!') },
    ]
  }
}

export default function Page() {

  return (
    <Container width='1000px' backgroundColor='bg.emphasized'>
      <Panel
        title={'default title'}
        toolbar={panelConfig.toolbar.items}
        menu={panelConfig.menu.items}
      />
    </Container>
  );
}
