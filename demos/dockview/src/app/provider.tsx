'use client';
import {
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import ActorsApp from "#modules/dockview/actors"


const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any);
const theme = createSystem(themeConfig);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
      <ChakraProvider value={theme}>
        <ThemeProvider attribute='class' disableTransitionOnChange>
          <ActorsApp>
          {props.children}
          </ActorsApp>
        </ThemeProvider>
      </ChakraProvider>
  );
};
