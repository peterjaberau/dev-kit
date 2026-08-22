import type { Metadata } from 'next'
import { AppShell } from './example/components/app-shell'
import '../../globals.css'


export default function Layout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === 'development'

  return <AppShell>{children}</AppShell>
}
