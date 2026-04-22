"use client"
import ActorViz from "#modules/actor-viz"
import { dataTree } from "#modules/actor-viz/data"
import { sessionTimeoutMachine  } from "#modules/actor-viz/data/machines/sessionTimeout"

export default function Page() {
  return <ActorViz data={dataTree} machine={sessionTimeoutMachine} />
}
