'use client';
import { ChakraProvider as ChakraThemeProvider, defineConfig, defaultConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from 'next-themes';


const themeConfig: any = defineConfig({
  ...defaultConfig,
  preflight: false,
  // cssVarsPrefix: 'chakra',
} as any)
const theme = createSystem(themeConfig);


export const ChakraProvider = (props: { children: React.ReactNode }) => {
  return (
    <ChakraThemeProvider value={theme}>
        {props.children}
    </ChakraThemeProvider>
  )
}
