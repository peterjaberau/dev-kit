import { ThemeToggle } from "./theme-toggle"
import { DirectoryTree } from "./directory-tree"
import { DirectoryInfo } from "./directory-info"

const Index = () => {
  return (
    <div className="bg-background text-foreground flex h-full items-center justify-center rounded p-8 font-sans">
      <div className="grid h-full w-full grid-cols-2 gap-8">
        <DirectoryTree />
        <DirectoryInfo />
      </div>
      <ThemeToggle />
    </div>
  )
}
export default Index