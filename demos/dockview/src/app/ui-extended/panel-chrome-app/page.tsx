'use client';
import { Container, SimpleGrid, GridItem } from '@chakra-ui/react'
import { Panel } from "#components/ui-extended/panel-chrome/panel"


const panelConfig = {
  collapse: {
    collapsible: true,
    collapsed: false
  },
  warning: {
    show: true,
    tooltip: 'Warning content'
  },


  menu: {
    items: [
      { label: "Ascending", value: "asc", onClick: () => console.log('asc!!!') },
      { label: "Descending", value: "desc", onClick: () => console.log('desc!!!') },
    ]
  },
  toolbar: {
    items: [
      {
        type: 'button',
        label: "Button",
        onClick: () => console.log('Button!!!') ,
        props: {
          variant: 'solid'
        }
      },
      {
        type: 'link',
        label: "Link",
        href: "#",

      },
      {
        type: 'toggle',
        label: "Toggle",
        props: {}
      },
    ]
  }
}

export default function Page() {

  return (
    <Container width='1000px' backgroundColor='bg.panel' boxShadow={'sm'} p={4} mt={10} borderRadius={'sm'}>
      <Panel
        collapse={panelConfig.collapse}
        title={'default title'}
        toolbar={panelConfig.toolbar.items}
        menu={panelConfig.menu.items}
        warning={panelConfig.warning}
      />
    </Container>
  );
}
