export const managerProfile = {}
export const solidityProfile = {}
export const fileManagerProfile = {}
export const gitProfile = {}
export const dGitProviderProfile = {
  name: "dGitProvider",
  methods: [
    "clone",
    "addremote",
    "delremote",
    "remotes",
    "init",
    "status",
    "log",
    "commit",
    "add",
    "reset",
    "rm",
    "lsfiles",
    "readblob",
    "resolveref",
    "branch",
    "branches",
    "checkout",
    "currentbranch",
    "zip",
    "push",
    "pull",
    "setIpfsConfig",
    "getItem",
    "setItem",
    "localStorageUsed",
  ],
}
export const filePanelProfile = {
  name: "filePanel",
  displayName: "File explorers",
  description: "Provides communication between remix file explorers and remix-plugin",
  location: "sidePanel",
  documentation: "",
  version: "0.0.1",
  methods: [
    "getCurrentWorkspace",
    "getWorkspaces",
    "createWorkspace",
    "registerContextMenuItem",
    "renameWorkspace",
    "deleteWorkspace",
  ],
  events: ["setWorkspace", "workspaceRenamed", "workspaceDeleted", "workspaceCreated"],
}
export const solidityUnitTestingProfile = {
  name: "unitTest",
  methods: ["testFromPath", "testFromSource"],
}
export const editorProfile = {
  name: "editor",
  methods: ["discardHighlight", "highlight", "addAnnotation", "clearAnnotations", "discardHighlightAt", "gotoLine"],
}
export const networkProfile = {
  name: "network",
  methods: ["addNetwork", "detectNetwork", "getEndpoint", "getNetworkProvider", "removeNetwork"],
  events: ["providerChanged"],
}
export const udappProfile = {
  name: "udapp",
  methods: ["createVMAccount", "getAccounts", "sendTransaction", "getSettings", "setEnvironmentMode"],
  events: ["newTransaction"],
}
export const contentImportProfile = {
  name: "contentImport",
  methods: ["resolve", "resolveAndSave"],
}
export const settingsProfile = {
  name: "settings",
  methods: ["getGithubAccessToken"],
}
export const themeProfile = {
  name: "theme",
  methods: ["currentTheme"],
  events: ["themeChanged"],
}
export const vscodeExtAPIProfile = {
  name: "vscodeExtAPI",
  methods: ["executeCommand"],
}
export const terminalProfile = {
  name: "terminal",
  methods: ["log"],
}

export const remixProfiles = {
  manager: managerProfile,
  solidity: solidityProfile,
  fileManager: fileManagerProfile,
  git: gitProfile,
  dGitProvider: dGitProviderProfile,
  filePanel: filePanelProfile,
  solidityUnitTesting: solidityUnitTestingProfile,
  editor: editorProfile,
  network: networkProfile,
  udapp: udappProfile,
  contentImport: contentImportProfile,
  settings: settingsProfile,
  theme: themeProfile,
  vscodeExtAPI: vscodeExtAPIProfile,
  terminal: terminalProfile,
}

export const standardProfiles = {
  manager: managerProfile,
  solidity: solidityProfile,
  fileManager: fileManagerProfile,
  editor: editorProfile,
  network: networkProfile,
  udapp: udappProfile,
}
