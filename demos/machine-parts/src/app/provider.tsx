'use client';
import {
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import "react18-json-view/src/style.css"


const themeConfig: any = defineConfig({
  ...defaultConfig,
  // cssVarsPrefix: 'chakra',
} as any);
const theme = createSystem(themeConfig);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider  disableTransitionOnChange>
          {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
};