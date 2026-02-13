import { Patterns } from "./components/patterns"

export const dynamic = "force-static"
export const revalidate = false

export default function IndexPage() {
  return (
    <div className="homepage relative overflow-hidden bg-linear-to-b to-gray-100 to-35% dark:to-zinc-900">
      <Patterns />
    </div>
  )
}
