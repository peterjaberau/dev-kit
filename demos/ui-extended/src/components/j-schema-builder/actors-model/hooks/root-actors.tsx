import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { ROOT_SYSTEM_IDS } from "../shared/constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.APP, rootRef)
  const rootSessionRef = getSpawnedActor(ROOT_SYSTEM_IDS.SESSION, rootRef)
  const rootCurrentAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.CURRENT_APP, rootRef)

  const rootJSchemaStandardsRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_STANDARDS, rootRef)
  const rootJSchemaToolsRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_TOOLS, rootRef)
  const rootJSchemaFormsRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_FORMS, rootRef)

  const rootJSchemaTreeRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_TREE, rootRef)

  const rootJSchemaExamplesRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_EXAMPLES, rootRef)


  const rootJSchemaZudokuRef = getSpawnedActor(ROOT_SYSTEM_IDS.JSON_SCHEMA_ZUDOKU, rootRef)


  return {
    rootRef,
    rootAppRef,
    rootSessionRef,
    rootCurrentAppRef,

    rootJSchemaStandardsRef,
    rootJSchemaToolsRef,
    rootJSchemaFormsRef,

    rootJSchemaTreeRef,

    rootJSchemaExamplesRef,

    rootJSchemaZudokuRef,
  }
}
