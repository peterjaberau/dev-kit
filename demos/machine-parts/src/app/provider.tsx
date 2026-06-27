'use client';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import "react18-json-view/src/style.css"


const theme = createSystem(defaultConfig);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider  disableTransitionOnChange>
          {props.children}
      </ThemeProvider>
    </ChakraProvider>
  );
};
