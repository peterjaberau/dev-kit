"use client"
import ActorModel from "#modules/actor-model"
import { dataTree } from "#modules/actor-model/data"

export default function Page() {
  return <ActorModel data={dataTree} />
}
