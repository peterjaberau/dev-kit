import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "#tilery/react/style.css"
import "@fontsource-variable/mona-sans"
import {
  ACCENT_CSS,
  ACCENT_IDS_PATTERN,
  ACCENT_MIGRATIONS,
  DEFAULT_ACCENT,
  STORAGE_KEY as ACCENT_STORAGE_KEY,
} from "./lab/tilery/src/content/accents"

import { Provider as ChakraProvider } from "./provider"
import "./globals.css"

import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
const themeScript = `(function(){try{var t=localStorage.getItem('tilery-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;var a=localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)});var m=${JSON.stringify(ACCENT_MIGRATIONS)};a=m[a]||a;if(!/^(${ACCENT_IDS_PATTERN})$/.test(a||'')){a=${JSON.stringify(DEFAULT_ACCENT)};}document.documentElement.dataset.accent=a;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.accent=${JSON.stringify(DEFAULT_ACCENT)};}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "#FCF8F8",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="tilery-theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <style id="tilery-accent-tokens" dangerouslySetInnerHTML={{ __html: ACCENT_CSS }} />
        <Suspense>
          <ChakraProvider>{children}</ChakraProvider>
        </Suspense>
      </body>
    </html>
  )
}
