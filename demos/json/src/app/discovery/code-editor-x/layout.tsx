import { ThemeProvider } from "./src/lib/theme-provider"
import { SettingsProvider } from "./src/lib/settings-provider"
import { ProjectProvider } from "./src/lib/project-provider"
import { DashboardPage, EditorPage, SettingsPage } from "./src/pages"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider defaultTheme="light">
      <SettingsProvider>
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}
