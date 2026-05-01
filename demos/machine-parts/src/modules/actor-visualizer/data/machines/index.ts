import type { AnyStateMachine } from "xstate"
import { authMachine } from "./auth"
import { checkoutMachine } from "./checkout"
import { dragMachine } from "./drag"
import { mediaPlayerMachine } from "./mediaPlayer"
import { otpVerificationMachine } from "./otpVerification"
import { savageMachine } from "./savageMachine"
import { sessionTimeoutMachine } from "./sessionTimeout"
import { stopwatchMachine } from "./stopwatch"
import { trafficLightMachine } from "./trafficLight"
import { vendingMachineMachine } from "./vendingMachine"
import { wizardMachine } from "./wizard"

export * from './auth'
export * from "./checkout"
export * from "./drag"
export * from "./mediaPlayer"
export * from "./otpVerification"
export * from "./sessionTimeout"
export * from "./stopwatch"
export * from "./trafficLight"
export * from './vendingMachine'
export * from "./wizard"
export * from "./savageMachine"

export type ActorVisualizerMachineOption = {
  id: string
  label: string
  machine: AnyStateMachine
}

export const actorVisualizerMachines = [
  { id: "trafficLight", label: "Traffic Light", machine: trafficLightMachine },
  { id: "auth", label: "Auth", machine: authMachine },
  { id: "checkout", label: "Checkout", machine: checkoutMachine },
  { id: "drag", label: "Drag", machine: dragMachine },
  { id: "mediaPlayer", label: "Media Player", machine: mediaPlayerMachine },
  { id: "otpVerification", label: "OTP Verification", machine: otpVerificationMachine },
  { id: "sessionTimeout", label: "Session Timeout", machine: sessionTimeoutMachine },
  { id: "stopwatch", label: "Stopwatch", machine: stopwatchMachine },
  { id: "vendingMachine", label: "Vending Machine", machine: vendingMachineMachine },
  { id: "wizard", label: "Wizard", machine: wizardMachine },
  { id: "savage", label: "Savage", machine: savageMachine as AnyStateMachine },
] satisfies ActorVisualizerMachineOption[]

export const defaultActorVisualizerMachineId = "trafficLight"
