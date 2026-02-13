import { ChakraProvider } from "@/components/chakra-provider"
import { Provider as JotaiProvider } from "jotai"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

const appUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url || "https://reui.io"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontVariables, "overscroll-none")}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          "[&:not(:has([data-slot=patterns-preview]))]:font-inter",
          "style-nova", // for docs
        )}
      >
        <ChakraProvider>
          <ThemeProvider>
            <LayoutProvider>
              <JotaiProvider>
                <NuqsAdapter>
                  {children}
                  <TailwindIndicator />
                  <Toaster position="top-center" />
                </NuqsAdapter>
              </JotaiProvider>
            </LayoutProvider>
          </ThemeProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
