'use client';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import "react18-json-view/src/style.css"
import likec4Config from './likec4/packages/style-preset';


const theme = createSystem(defaultConfig, likec4Config);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider  disableTransitionOnChange>
          {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
};
