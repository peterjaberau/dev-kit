
export enum JSON_TREE_CONSTANTS {
  APP = 'jt',
  ROOT = 'jt-root',
  NODE_PREFIX = 'jt-node-',
}

export const machineConstants = {
  APP: "jt",
  ROOT: "jt-root",
  NODE_PREFIX: 'jt-node-',
} as const

export const regexConstants = {
  defaultURLRegExp: /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
} as const
