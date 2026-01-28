import type { Project } from '../../types'

const DB_NAME = 'editorx-db'
const DB_VERSION = 1
const PROJECTS_STORE = 'projects'

let dbInstance: IDBDatabase | null = null

export function openDatabase(): Promise<IDBDatabase> {
  if (dbInstance) {
    return Promise.resolve(dbInstance)
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      reject(new Error('Failed to open database'))
    }

    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create projects store with keyPath 'id'
      if (!db.objectStoreNames.contains(PROJECTS_STORE)) {
        db.createObjectStore(PROJECTS_STORE, { keyPath: 'id' })
      }
    }
  })
}

export async function getAllProjects(): Promise<Project[]> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PROJECTS_STORE, 'readonly')
    const store = transaction.objectStore(PROJECTS_STORE)
    const request = store.getAll()

    request.onerror = () => {
      reject(new Error('Failed to get projects'))
    }

    request.onsuccess = () => {
      const projects = request.result.map(deserializeProject)
      resolve(projects)
    }
  })
}

export async function getProject(id: string): Promise<Project | undefined> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PROJECTS_STORE, 'readonly')
    const store = transaction.objectStore(PROJECTS_STORE)
    const request = store.get(id)

    request.onerror = () => {
      reject(new Error('Failed to get project'))
    }

    request.onsuccess = () => {
      if (request.result) {
        resolve(deserializeProject(request.result))
      } else {
        resolve(undefined)
      }
    }
  })
}

export async function saveProject(project: Project): Promise<void> {
  const db = await openDatabase()
  const serialized = serializeProject(project)

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PROJECTS_STORE, 'readwrite')
    const store = transaction.objectStore(PROJECTS_STORE)
    const request = store.put(serialized)

    request.onerror = () => {
      reject(new Error('Failed to save project'))
    }

    request.onsuccess = () => {
      resolve()
    }
  })
}

export async function deleteProject(id: string): Promise<void> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PROJECTS_STORE, 'readwrite')
    const store = transaction.objectStore(PROJECTS_STORE)
    const request = store.delete(id)

    request.onerror = () => {
      reject(new Error('Failed to delete project'))
    }

    request.onsuccess = () => {
      resolve()
    }
  })
}

// Serialization helpers for Date objects
interface SerializedProject extends Omit<Project, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

function serializeProject(project: Project): SerializedProject {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }
}

function deserializeProject(data: SerializedProject): Project {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}
