import { useSelector } from "@xstate/react"
import { getSpawnedActor } from '../common'
import { ENGINE_SYSTEM_IDS } from '../engine/engine.constants'
import { EngineContext } from "../engine/engine.provider"

export function useEngine() {
  const engineRef = EngineContext.useActorRef()
  const sendToEngine = engineRef.send

  const engineState: any = useSelector(engineRef, (state) => state)
  const engineContext = engineState.context

  return {
    engineRef,
    sendToEngine,

    engineState,
    engineContext,
  }
}

export function useEngineActors() {
  const { engineRef } = useEngine()

  const engineConfigRef = getSpawnedActor(ENGINE_SYSTEM_IDS.CONFIG, engineRef)
  const engineSessionRef = getSpawnedActor(ENGINE_SYSTEM_IDS.SESSION, engineRef)
  const engineCurrentInstanceRef = getSpawnedActor(ENGINE_SYSTEM_IDS.CURRENT_INSTANCE, engineRef)
  const engineCurrentAppRef = getSpawnedActor(ENGINE_SYSTEM_IDS.CURRENT_APP, engineRef)




  return {
    engineConfigRef,
    engineSessionRef,
    engineCurrentInstanceRef,
    engineCurrentAppRef,


  }


}
