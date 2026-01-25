// app/(app)/layout.tsx
import AppProviders from "./AppProviders"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>
}
