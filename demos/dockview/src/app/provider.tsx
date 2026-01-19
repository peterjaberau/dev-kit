'use client';
import {
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import ActorsApp from "#modules/dockview/actors"
import { data as getInitialData } from "#adaptive-menu/stories/jira-refactor-cycle1/data"
import { Root } from '#adaptive-menu/namespaces/primitive'


const themeConfig: any = defineConfig({
  ...defaultConfig,
  preflight: false,
  // cssVarsPrefix: 'chakra',
} as any);
const theme = createSystem(themeConfig);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ActorsApp>
          <Root data={getInitialData}>{props.children}</Root>
        </ActorsApp>
      </ThemeProvider>
    </ChakraProvider>
  )
};
