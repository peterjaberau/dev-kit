'use client';
import {
  chakra,
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
} from '@chakra-ui/react';

const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any);
const theme = createSystem(themeConfig);


function PreviewUI({ item }: any) {
  return (
    <chakra.div
      css={{
        borderWidth: '1px',
        borderColor: '#0B120E24',
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
        borderRadius: 'md',
        paddingY: 2,
        paddingX: 3,
      }}
    >
      Item {item.id}
    </chakra.div>
  )
}


export function TreeItemDragPreview({ item }: any) {
  return (
    <ChakraProvider value={theme}>
      <PreviewUI item={item} />
    </ChakraProvider>
  )
}
