export interface Profile {
  name: string
  displayName?: string
  methods?: string[]
  events?: string[]
  permission?: boolean
  hash?: string
  description?: string
  documentation?: string
  version?: string
  kind?: string
  canActivate?: string[]
  icon?: string
  maintainedBy?: string
  author?: string
  repo?: string
  authorContact?: string
}

export interface IPluginManager {
  events: {
    profileUpdated(profile: Profile): void
    profileAdded(profile: Profile): void
    pluginDeactivated(profile: Profile): void
    pluginActivated(profile: Profile): void,
    [event: string]: (...args: any[]) => void
  }
  methods: {
    getProfile(name: string): Promise<Profile>
    updateProfile(profile: Partial<Profile>): any
    activatePlugin(name: string): any
    deactivatePlugin(name: string): any
    isActive(name: string): boolean
    canCall(from: string, to: string, method: string, message?: string): any
  }
}

export const pluginManagerProfile = {
  name: "manager",
  methods: ["getProfile", "updateProfile", "activatePlugin", "deactivatePlugin", "isActive", "canCall"],
  events: ["pluginActivated", "pluginDeactivated", "profileAdded", "profileUpdated"],
}
