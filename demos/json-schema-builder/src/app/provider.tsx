'use client';
import {
  ChakraProvider,
  defineConfig,
  defaultConfig,
  createSystem,
} from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




const queryClient = new QueryClient();


const themeConfig: any = defineConfig({
  ...defaultConfig,
  cssVarsPrefix: 'ck',
} as any);
const theme = createSystem(themeConfig);


export const Provider = (props: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={theme}>
        <ThemeProvider attribute='class' disableTransitionOnChange>
          <TooltipProvider>
            <Toaster />
            <Sonner />
          {props.children}
          </TooltipProvider>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
