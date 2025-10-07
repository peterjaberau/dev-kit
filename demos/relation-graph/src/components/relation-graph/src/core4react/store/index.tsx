"use client"

import React, { createContext } from "react"
import type { RelationGraphInstance } from "#models-core/types"

// ===============================
// Types
// ===============================
export type RGUpdateAction = (rgInstance: RelationGraphInstance) => void
export type RelationGraphReducer = (
  state: RelationGraphInstance,
  action: RGUpdateAction
) => RelationGraphInstance

// ===============================
// Reducer
// ===============================
export const relationGraphReducer: RelationGraphReducer = (state, action): RelationGraphInstance => {
  action(state)
  return state
}

// ===============================
// Contexts
// ===============================
export const RelationGraphStoreContext = createContext<RelationGraphInstance | null>(null) as React.Context<RelationGraphInstance>
export const RGUpdateContext = createContext<((v?: RelationGraphInstance) => void) | null>(null) as React.Context<(v?: RelationGraphInstance) => void>
export const RGUpdateSingalContext = createContext<boolean>(false) as React.Context<boolean>

// ===============================
// Providers
// ===============================
export const RelationGraphProvider = RelationGraphStoreContext.Provider
export const RGUpdateProvider = RGUpdateContext.Provider
export const RGUpdateSingalProvider = RGUpdateSingalContext.Provider
