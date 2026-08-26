/** Create the name of the event for a call */
export function callEvent(name: string, key: string, id: number) {
  return `[${name}] ${key}-${id}`
}

/** Create the name of the event for a listen */
export function listenEvent(name: string, key: string) {
  return `[${name}] ${key}`
}

/** Create a method path based on the method name and the path */
export function getMethodPath(method: string, path?: string) {
  if (!path) {
    return method
  }
  const part = path.split(".")
  part.shift()
  part.push(method)
  return part.join(".")
}

/** Get the root name of a path */
export function getRootPath(path: string) {
  return path.split(".").shift()
}

export class PluginQueueItem {
  private resolve: (value: unknown) => void
  private reject: (reason: any) => void
  private timer: any
  private running: boolean
  private args: any[]

  public method: any
  public timedout: boolean
  public canceled: boolean
  public finished: boolean
  public request: any
  private options: any = {}

  constructor(
    resolve: (value: unknown) => void,
    reject: (reason: any) => void,
    request: any,
    method: any,
    options: any,
    args: any[],
  ) {
    this.resolve = resolve
    this.reject = reject
    this.method = method
    this.request = request
    this.timer = undefined
    this.timedout = false
    this.canceled = false
    this.finished = false
    this.running = false
    this.args = args
    this.options = options
  }

  setCurrentRequest(request: any): void {
    throw new Error("Cannot call this directly")
  }

  callMethod(method: string, args: any[]): void {
    throw new Error("Cannot call this directly")
  }

  letContinue(): void {
    throw new Error("Cannot call this directly")
  }

  cancel(): void {
    this.canceled = true
    clearTimeout(this.timer)
    this.reject(`[CANCEL] Canceled call ${this.method} from ${this.request.from}`)
    if (this.running) this.letContinue()
  }

  async run() {
    if (this.canceled) {
      this.letContinue()
      return
    }
    this.timer = setTimeout(() => {
      this.timedout = true
      this.reject(`[TIMEOUT] Timeout for call ${this.method} from ${this.request.from}`)
      this.letContinue()
    }, this.options.queueTimeout || 10000)

    this.running = true
    this.setCurrentRequest(this.request)
    try {
      const result = await this.callMethod(this.method, this.args)
      if (this.timedout || this.canceled) return
      this.resolve(result)
    } catch (err) {
      this.reject(err)
    }
    this.finished = true
    this.running = false
    clearTimeout(this.timer)
    this.letContinue()
  }
}


/** Check if the plugin is an instance of PluginService */
export const isPluginService = (service: any): service is PluginService => {
  return service instanceof PluginService
}

/**
 * Return the methods of a service, except "constructor" and methods starting with "_"
 * @param instance The instance of a class to get the method from
 */
export function getMethods(service: any): any {
  // If service exposes methods, use them
  if (service.methods) {
    for (const method of service.methods) {
      if (!(method in service)) {
        throw new Error(`Method ${method} is not part of serivce`)
      }
    }
    return service.methods
  }
  // Else get the public methods (without "_")
  if (isPluginService(service)) {
    const methods = Object.getPrototypeOf(service)
    return Object.getOwnPropertyNames(methods).filter((m) => {
      return m !== "constructor" && !m.startsWith("_")
    })
  } else {
    return Object.getOwnPropertyNames(service).filter((key) => {
      return typeof service[key] === "function" && !key.startsWith("_")
    })
  }
}

/**
 * Create a plugin service
 * @param path The path of the service separated by '.' (ex: 'box.profile')
 * @param service The service template
 * @note If the service doesn't provide a property "methods" then all methods are going to be exposed by default
 */
export function createService(path: string, service: any): any {
  if (service.path && getRootPath(service.path) !== path) {
    throw new Error(`Service path ${service.path} is different from the one provided: ${path}`)
  }

  const methods: string[] = getMethods(service)

  for (const method of methods) {
    if (!(method in service)) {
      throw new Error(`Method ${method} is not part of service ${path}`)
    }
  }

  if (isPluginService(service)) {
    if (!service.methods) {
      service.methods = methods
    }
    return service as any
  } else {
    return { ...service, methods, path } as any
  }
}

/**
 * Connect the service to the plugin client
 * @param client The main client of the plugin
 * @param service A service to activate
 */
export function activateService(client: any, service: any) {
  client.methods = [...(client.methods || []), ...service.methods]
  const methods: string[] = getMethods(service)

  for (const method of methods) {
    client[`${service.path}.${method}`] = service[method].bind(service)
  }

  return (client.call as any)("manager", "updateProfile", { methods: client.methods })
}


/**
 * A node that forward the call to the right path
 */
export abstract class PluginService {

  public methods: string[] | any
  abstract readonly path: string
  protected abstract plugin: any

  emit(key: string, ...payload: any[]) {
    this.plugin.emit(key, ...payload)
  }

  /**
   * Create a subservice under this service
   * @param name The name of the subservice inside this service
   * @param service The subservice to add
   */
  async createService<S extends Record<string, any>>(name: string, service: S): Promise<any> {
    if (this.methods.includes(name)) {
      throw new Error("A service cannot have the same name as an exposed method")
    }
    const path = `${this.path}.${name}`
    const _service = createService(path, service)
    await activateService(this.plugin, _service)
    return _service
  }

  /**
   * Prepare a service to be lazy loaded.
   * Service can be activated by doing `client.activateService(path)`
   * @param name The name of the subservice inside this service
   * @param factory A function to create the service on demand
   */
  prepareService<S extends Record<string, any>>(name: string, factory: () => S): void {
    if (this.methods.includes(name)) {
      throw new Error("A service cannot have the same name as an exposed method")
    }
    const path = `${this.path}.${name}`
    this.plugin.activateService[path] = async () => {
      const service = factory()
      const _service = createService(path, service)
      await activateService(this.plugin, _service)
      delete this.plugin.activateService[path]
      return _service
    }
  }
}

