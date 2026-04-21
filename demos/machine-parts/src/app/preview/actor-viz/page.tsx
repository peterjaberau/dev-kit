"use client"
import ActorViz from "#modules/actor-viz"
import { dataTree } from "#modules/actor-viz/data"

export default function Page() {
  return <ActorViz data={dataTree} />
}
