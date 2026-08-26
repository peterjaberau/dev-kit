import { createService, activateService, getMethodPath, PluginQueueItem, listenEvent } from "../utils"

export class Plugin {
  activateService: Record<string, () => Promise<any>> = {}
  protected currentRequest: any
  /** Give access to all the plugins registered by the engine */
  protected app: any
  protected options: any = {}
  protected queue: PluginQueueItem[] = []
  // Lifecycle hooks
  onRegistration?(): void
  onActivation?(): void
  onDeactivation?(): void

  constructor(public profile: any) {}

  get name() {
    return this.profile.name
  }

  get methods() {
    return this.profile.methods
  }

  set methods(methods: any[]) {
    this.profile.methods = methods
  }

  activate(): any | Promise<any> {
    if (this.onActivation) this.onActivation()
  }
  deactivate(): any | Promise<any> {
    if (this.onDeactivation) this.onDeactivation()
  }

  setOptions(options: any = {}) {
    this.options = { ...this.options, ...options }
  }

  /** Call a method on this plugin */
  protected callPluginMethod(key: string, args: any[]): any {
    const path = this.currentRequest?.path
    const method: any = getMethodPath(key, path)
    if (!(method in this)) {
      throw new Error(`Method ${method} is not implemented by ${this.profile.name}`)
    }
    //@ts-ignore
    return this[method](...args)
  }

  protected setCurrentRequest(request: any) {
    this.currentRequest = request
  }

  protected letContinue() {
    delete this.currentRequest
    this.queue = this.queue.filter((value) => {
      return value.canceled === false && value.timedout === false && value.finished === false
    })
    const next = this.queue.find((value) => {
      return value.canceled === false && value.timedout === false && value.finished === false
    })
    ;(this as any).emit("queue", this.queue)
    if (next) next.run()
  }

  /** Add a request to the list of current requests */
  protected addRequest(request: any, method: any, args: any[]) {
    return new Promise((resolve, reject) => {
      const queue = new PluginQueueItem(resolve, reject, request, method, this.options, args)
      queue["setCurrentRequest"] = (request: any) => this.setCurrentRequest(request)
      queue["callMethod"] = async (method: string, args: any[]) => this.callPluginMethod(method, args)
      queue["letContinue"] = () => this.letContinue()
      this.queue.push(queue)
      ;(this as any).emit("queue", this.queue)
      // @ts-ignore
      if (this.queue.length === 1) this.queue[0].run()
    })
  }

  protected cancelRequests(request: any, method: any): void {
    for (const queue of this.queue) {
      if (queue.request.from == request.from && (method ? queue.method == method : true)) {
        queue.cancel()
        ;(this as any).emit("queue", queue.request)
      }
    }
  }

  /**
   * Ask the plugin manager if current request can call a specific method
   * @param method The method to call
   * @param message An optional message to show to the user
   */
  askUserPermission(method: any, message?: string): Promise<boolean> {
    // Internal call
    if (!this.currentRequest) {
      return Promise.resolve(true)
    }
    // External call
    if (this.methods.includes(method)) {
      const from = this.currentRequest.from
      const to = this.name
      return (this as any).call("manager", "canCall", from, to, method, message)
    } else {
      return Promise.resolve(false)
    }
  }

  /**
   * Called by the engine when a plugin try to activate it
   * @param from the profile of the plugin activating this plugin
   * @param method method used to activate this plugin if any
   */
  async canActivate(from: any, method?: string): Promise<boolean> {
    return true
  }

  /**
   * Called by the engine when a plugin try to deactivate it
   * @param from the profile of the plugin deactivating this plugin
   */
  async canDeactivate(from: any): Promise<boolean> {
    return true
  }

  /////////////
  // SERVICE //
  /////////////

  /**
   * Create a service under the client node
   * @param name The name of the service
   * @param service The service
   */
  async createService<S extends Record<string, any>>(name: string, service: S): Promise<any> {
    if (this.methods && this.methods.includes(name as any)) {
      throw new Error("A service cannot have the same name as an exposed method")
    }
    const _service = createService(name, service)
    await activateService(this, _service)
    return _service
  }

  /**
   * Prepare a service to be lazy loaded
   * @param name The name of the subservice inside this service
   * @param factory A function to create the service on demand
   */
  prepareService(name: string, factory: () => any): () => Promise<any> {
    return (this.activateService[name] = async () => {
      if (this.methods && this.methods.includes(name as any)) {
        throw new Error("A service cannot have the same name as an exposed method")
      }
      const service = await factory()
      const _service = createService(name, service)
      await activateService(this as any, _service)
      delete this.activateService[name]
      return _service
    })
  }

  /** Listen on an event from another plugin */
  on(name: any, key: any, cb: any): void {
    throw new Error(`Cannot use method "on" from plugin "${this.name}". It is not registered in the engine yet.`)
  }

  /** Listen once an event from another plugin then remove event listener */
  once(name: any, key: any, cb: any): void {
    throw new Error(`Cannot use method "once" from plugin "${this.name}". It is not registered in the engine yet.`)
  }

  /** Stop listening on an event from another plugin */
  off(name: any, key: any): void {
    throw new Error(`Cannot use method "off" from plugin "${this.name}". It is not registered in the engine yet.`)
  }

  /** Call a method of another plugin */
  async call(name: any, key: any, ...payload: any): Promise<any> {
    throw new Error(`Cannot use method "call" from plugin "${this.name}". It is not registered in the engine yet.`)
  }

  /** Cancel a method of another plugin */
  async cancel(name: any, key: any): Promise<ReturnType<any>> {
    throw new Error(`Cannot use method "cancel" from plugin "${this.name}". It is not registered in the engine yet.`)
  }

  /** Emit an event */
  emit(key: any, ...payload: any): void {
    throw new Error(`Cannot use method "emit" from plugin "${this.name}". It is not registered in the engine yet.`)
  }
}

/** List of available gateways for decentralised storage */
export const defaultGateways: any = {
  "ipfs://": (url: any, name: any) => `https://${name}.dyn.plugin.remix-project.org/ipfs/${url.replace("ipfs://", "")}`,
  "swarm://": (url: any, name: any) => `https://swarm-gateways.net/bzz-raw://${url.replace("swarm://", "")}`,
}

/** Transform the URL to use a gateway if decentralised storage is specified */
export function transformUrl({ url, name }: any) {
  const network = Object.keys(defaultGateways).find((key) => url.startsWith(key))
  return network ? defaultGateways[network](url, name) : url
}

export abstract class PluginConnector extends Plugin {
  protected loaded: boolean | any
  protected id = 0
  protected pendingRequest: Record<number, (result: any, error: Error | string) => void> = {}
  protected options: any
  profile: any
  constructor(profile: any) {
    super(profile)
  }

  /**
   * Send a message to the external plugin
   * @param message the message passed to the plugin
   */
  protected abstract send(message: Partial<Message>): void
  /**
   * Open connection with the plugin
   * @param url The transformed url the plugin should connect to
   */
  protected abstract connect(url: string): any | Promise<any>
  /** Close connection with the plugin */
  protected abstract disconnect(): any | Promise<any>

  async activate() {
    const url = this.options.transformUrl ? this.options.transformUrl(this.profile) : transformUrl(this.profile)
    await this.connect(url)
    return super.activate()
  }

  async deactivate() {
    this.loaded = false
    await this.disconnect()
    return super.deactivate()
  }

  /** Set options for an external plugin */
  setOptions(options: any = {}) {
    super.setOptions(options)
  }

  /** Call a method from this plugin */
  protected callPluginMethod(key: string, payload: any[] = []): Promise<any> {
    const action: any = "request"
    const id: any = this.id++
    const requestInfo = this.currentRequest
    const name = this.name
    const promise = new Promise((res, rej) => {
      this.pendingRequest[id] = (result: any[], error: Error | string) => (error ? rej(error) : res(result))
    })
    this.send({ id, action, key, payload, requestInfo, name } as any)
    return promise
  }

  /** Perform handshake with the client if not loaded yet */
  protected async handshake() {
    if (!this.loaded) {
      this.loaded = true
      let methods: string[]
      try {
        methods = await this.callPluginMethod("handshake", [this.profile.name, this.options?.engine])
      } catch (err) {
        this.loaded = false
        throw err
      }
      if (methods) {
        this.profile.methods = methods
        this.call("manager", "updateProfile", this.profile)
      }
    } else {
      // If there is a broken connection we want send back the handshake to the plugin client
      return this.callPluginMethod("handshake", [this.profile.name, this.options?.engine])
    }
  }

  /**
   * React when a message comes from client
   * @param message The message sent by the client
   */
  protected async getMessage(message: any) {
    // Check for handshake request from the client
    if (message.action === "request" && message.key === "handshake") {
      return this.handshake()
    }

    switch (message.action) {
      // Start listening on an event
      case "on":
      case "listen": {
        const { name, key } = message
        const action = "notification"
        this.on(name, key, (...payload: any[]) => this.send({ action, name, key, payload } as any))
        break
      }
      case "off": {
        const { name, key } = message
        this.off(name, key)
        break
      }
      case "once": {
        const { name, key } = message
        const action = "notification"
        this.once(name, key, (...payload: any) => this.send({ action, name, key, payload } as any))
        break
      }
      // Emit an event
      case "emit":
      case "notification": {
        if (!message.payload) break
        this.emit(message.key, ...message.payload)
        break
      }
      // Call a method
      case "call":
      case "request": {
        const action = "response"
        try {
          const payload = await this.call(message.name, message.key, ...message.payload)
          const error = undefined
          this.send({ ...message, action, payload, error })
        } catch (err: any) {
          const payload = undefined
          const error = err.message || err
          this.send({ ...message, action, payload, error })
        }
        break
      }
      case "cancel": {
        const payload = this.cancel(message.name, message.key)
        break
      }
      // Return result from exposed method
      case "response": {
        const { id, payload, error } = message
        //@ts-ignore
        this.pendingRequest[id](payload, error)
        delete this.pendingRequest[id]
        break
      }
      default: {
        throw new Error("Message should be a notification, request or response")
      }
    }
  }
}

export class Engine {
  private plugins: Record<string, Plugin> = {}
  private events: Record<string, any> = {}
  private listeners: Record<string, any> = {}
  private eventMemory: Record<string, any> = {}
  private manager: any

  onRegistration?(plugin: Plugin): void
  /** Update the options of the plugin when being registered */
  setPluginOption?(profile: any): any

  /**
   * Broadcast an event to the plugin listening
   * @param emitter Plugin name that emits the event
   * @param event The name of the event
   * @param payload The content of the event
   */
  private broadcast(emitter: string, event: string, ...payload: any[]) {
    const eventName = listenEvent(emitter, event)
    if (!this.listeners[eventName]) return // Nobody is listening
    const listeners = this.listeners[eventName] || []
    listeners.forEach((listener: string) => {
      if (!this.events[listener][eventName]) {
        throw new Error(
          `Plugin ${listener} should be listening on event ${event} from ${emitter}. But no callback have been found`,
        )
      }
      this.events[listener][eventName](...payload)
    })
    // Add event memory
    this.eventMemory[emitter]
      ? (this.eventMemory[emitter][event] = payload)
      : (this.eventMemory[emitter] = { [event]: payload })
  }

  /**
   * Start listening on an event from another plugin
   * @param listener The name of the plugin that listen on the event
   * @param emitter The name of the plugin that emit the event
   * @param event The name of the event
   * @param cb Callback function to trigger when the event is trigger
   */
  private addListener(listener: string, emitter: string, event: string, cb: Function) {
    const eventName = listenEvent(emitter, event)
    // If not already listening
    if (!this.events[listener][eventName]) {
      this.events[listener][eventName] = cb
    }
    // Record that "listener" is listening on "emitter"
    if (!this.listeners[eventName]) this.listeners[eventName] = []
    // If not already recorded
    if (!this.listeners[eventName].includes(listener)) {
      this.listeners[eventName].push(listener)
    }
    // If engine has memory of this event emit previous value
    if (emitter in this.eventMemory && event in this.eventMemory[emitter]) {
      cb(...this.eventMemory[emitter][event])
    }
  }

  /**
   * Remove an event from the list of a listener's events
   * @param listener The name of the plugin that was listening on the event
   * @param emitter The name of the plugin that emitted the event
   * @param event The name of the event
   */
  private removeListener(listener: string, emitter: string, event: string) {
    const eventName = listenEvent(emitter, event)
    // Remove listener
    this.listeners[eventName] = this.listeners[eventName].filter((name: any) => name !== listener)
    // Remove callback
    delete this.events[listener][eventName]
  }

  /**
   * Create a listener that listen only once on an event
   * @param listener The name of the plugin that listen on the event
   * @param emitter The name of the plugin that emitted the event
   * @param event The name of the event
   * @param cb Callback function to trigger when event is triggered
   */
  private listenOnce(listener: string, emitter: string, event: string, cb: Function) {
    this.addListener(listener, emitter, event, (...args: any[]) => {
      cb(...args)
      this.removeListener(listener, emitter, event)
    })
  }

  /**
   * Call a method of a plugin from another
   * @param caller The name of the plugin that calls the method
   * @param path The path of the plugin that manages the method
   * @param method The name of the method
   * @param payload The argument to pass to the method
   */
  private async callMethod(caller: string, path: string, method: string, ...payload: any[]) {
    const target: any = path.split(".").shift()
    if (!this.plugins[target]) {
      throw new Error(`Cannot call ${target} from ${caller}, because ${target} is not registered`)
    }

    // Get latest version of the profiles
    const [to, from] = await Promise.all([this.manager.getProfile(target), this.manager.getProfile(caller)])

    // Check if plugin FROM can activate plugin TO
    const isActive = await this.manager.isActive(target)

    if (!isActive) {
      const managerCanActivate = await this.manager.canActivatePlugin(from, to, method)
      const pluginCanActivate = await this.plugins[to.name]?.canActivate(to, method)
      if (managerCanActivate && pluginCanActivate) {
        await this.manager.toggleActive(target)
      } else {
        throw new Error(`${from.name} cannot call ${method} of ${target}, because ${target} is not activated yet`)
      }
    }

    // Check if method is exposed
    // note: native methods go here
    const methods = [...(to.methods || []), "canDeactivate"]
    if (!methods.includes(method)) {
      const notExposedMsg = `Cannot call method "${method}" of "${target}" from "${caller}", because "${method}" is not exposed.`
      const exposedMethodsMsg = `Here is the list of exposed methods: ${methods.map((m) => `"${m}"`).join(",")}`
      throw new Error(`${notExposedMsg} ${exposedMethodsMsg}`)
    }

    const request = { from: caller, path }
    return this.plugins[target]["addRequest"](request, method, payload)
  }

  /**
   * Cancels calls from a plugin to another
   * @param caller The name of the plugin that calls the method
   * @param path The path of the plugin that manages the method
   * @param method The name of the method to be cancelled, if is empty cancels all calls from plugin
   */
  private async cancelMethod(caller: string, path: string, method: string) {
    const target: any = path.split(".").shift()
    if (!this.plugins[target]) {
      throw new Error(`Cannot cancel ${method} on ${target} from ${caller}, because ${target} is not registered`)
    }

    // Get latest version of the profiles
    const [to, from] = await Promise.all([this.manager.getProfile(target), this.manager.getProfile(caller)])

    // Check if plugin FROM can activate plugin TO
    const isActive = await this.manager.isActive(target)

    if (!isActive) {
      throw new Error(
        `${from.name} cannot cancel ${method ? `${method} of ` : "calls on"}${target}, because ${target} is not activated`,
      )
    }

    // Check if method is exposed
    // note: native methods go here
    const methods = [...(to.methods || []), "canDeactivate"]
    if (!methods.includes(method) && method) {
      const notExposedMsg = `Cannot cancel "${method}" of "${target}" from "${caller}", because "${method}" is not exposed.`
      const exposedMethodsMsg = `Here is the list of exposed methods: ${methods.map((m) => `"${m}"`).join(",")}`
      throw new Error(`${notExposedMsg} ${exposedMethodsMsg}`)
    }

    const request = { from: caller, path }
    return this.plugins[target]["cancelRequests"](request, method)
  }

  /**
   * Create an object to easily access any registered plugin
   * @param name Name of the caller plugin
   * @note This method creates a snapshot at the time of activation
   */
  private async createApp(name: string): Promise<any> {
    const getProfiles = Object.keys(this.plugins).map((key) => this.manager.getProfile(key))
    const profiles = await Promise.all(getProfiles)
    return profiles.reduce((app, target) => {
      app[target.name] = (target.methods || []).reduce(
        (methods: any, method: any) => {
          methods[method] = (...payload: any[]) => this.callMethod(name, target.name, method, ...payload)
          return methods
        },
        {
          on: (event: string, cb: (...payload: any[]) => void) => this.addListener(name, target.name, event, cb),
          once: (event: string, cb: (...payload: any[]) => void) => this.listenOnce(name, target.name, event, cb),
          off: (event: string) => this.removeListener(name, target.name, event),
          profile: target,
        },
      )
      return app
    }, {})
  }

  /**
   * Activate a plugin by making its method and event available
   * @param name The name of the plugin
   * @note This method is trigger by the plugin manager when a plugin has been activated
   */
  private async activatePlugin(name: string) {
    if (!this.plugins[name]) {
      throw new Error(`Cannot active plugin ${name} because it's not registered yet`)
    }
    const isActive = await this.manager.isActive(name)
    if (isActive) return

    const plugin: any = this.plugins[name]
    this.events[name] = {}
    plugin["on"] = (emitter: string, event: string, cb: (...payload: any[]) => void) => {
      this.addListener(name, emitter, event, cb)
    }
    plugin["once"] = (emitter: string, event: string, cb: (...payload: any[]) => void) => {
      this.listenOnce(name, emitter, event, cb)
    }
    plugin["off"] = (emitter: string, event: string) => {
      this.removeListener(name, emitter, event)
    }
    plugin["emit"] = (event: string, ...payload: any[]) => {
      this.broadcast(name, event, ...payload)
    }
    plugin["call"] = (target: string, method: string, ...payload: any[]): Promise<any> => {
      return this.callMethod(name, target, method, ...payload)
    }
    plugin["cancel"] = (target: string, method: string): Promise<any> => {
      return this.cancelMethod(name, target, method)
    }

    // GIVE ACCESS TO APP
    plugin["app"] = await this.createApp(name)
    plugin["createApp"] = () => this.createApp(name)

    // Call hooks
    await plugin.activate()
  }

  /**
   * Deactivate a plugin by removing all its event listeners and making it inaccessible
   * @param name The name of the plugin
   * @note This method is trigger by the plugin manager when a plugin has been deactivated
   */
  private async deactivatePlugin(name: string) {
    if (!this.plugins[name]) {
      throw new Error(`Cannot deactive plugin ${name} because it's not registered yet`)
    }
    const isActive = await this.manager.isActive(name)
    if (!isActive) return

    const plugin = this.plugins[name]
    // Call hooks
    await plugin.deactivate()

    this.updateErrorHandler(plugin)

    // REMOVE PLUGIN APP
    delete plugin["app"]
    // @ts-ignore
    delete plugin["createApp"]

    // REMOVE LISTENER
    // Note : We don't remove the listeners of this plugin.
    // Because we would keep track of them to reactivate them on reactivation. Which doesn't make sense
    delete this.events[name]

    // Remove event memory from this plugin
    delete this.eventMemory[name]

    // REMOVE EVENT RECORD
    Object.keys(this.listeners).forEach((eventName) => {
      this.listeners[eventName].forEach((listener: string, i: number) => {
        if (listener === name) this.listeners[eventName].splice(i, 1)
      })
    })
  }

  /**
   * Update error message when trying to call a method when not activated
   * @param plugin The deactivated plugin to update the methods from
   */
  private updateErrorHandler(plugin: Plugin) {
    const name = plugin.name
    // SET ERROR MESSAGE FOR call, on, once, off, emit
    const deactivatedWarning = (message: string) => {
      return `Plugin "${name}" is currently deactivated. ${message}. Activate "${name}" first.`
    }
    plugin["call"] = (target: string, key: string, ...payload: any[]) => {
      throw new Error(deactivatedWarning(`It cannot call method ${key} of plugin ${target}.`))
    }
    plugin["cancel"] = (target: string, key: string, ...payload: any[]) => {
      throw new Error(deactivatedWarning(`It cannot cancel method ${key} of plugin ${target}.`))
    }
    plugin["on"] = (target: string, event: string) => {
      throw new Error(deactivatedWarning(`It cannot listen on event ${event} of plugin ${target}.`))
    }
    plugin["once"] = (target: string, event: string) => {
      throw new Error(deactivatedWarning(`It cannot listen on event ${event} of plugin ${target}.`))
    }
    plugin["off"] = (target: string, event: string) => {
      throw new Error(deactivatedWarning("All event listeners are already removed."))
    }
    plugin["emit"] = (event: string, ...payload: any[]) => {
      throw new Error(deactivatedWarning(`It cannot emit the event ${event}`))
    }
  }

  /**
   * Register a plugin to the engine and update the manager
   * @param plugin The plugin
   */
  register(plugins: Plugin | Plugin[]) {
    const register = (plugin: Plugin) => {
      if (this.plugins[plugin.name]) {
        throw new Error(`Plugin ${plugin.name} is already register.`)
      }
      if (plugin.name === "manager") {
        this.registerManager(plugin as any)
      }
      this.plugins[plugin.name] = plugin
      this.manager?.addProfile(plugin.profile)
      // Update Error Handling for better debug
      this.updateErrorHandler(plugin)
      // SetPluginOption is before onRegistration to let plugin update it's option inside onRegistration
      if (this.setPluginOption) {
        const options = this.setPluginOption(plugin.profile)
        plugin.setOptions(options)
      }
      if (plugin.onRegistration) plugin.onRegistration()
      if (this.onRegistration) this.onRegistration(plugin)
      return plugin.name
    }
    return Array.isArray(plugins) ? plugins.map(register) : register(plugins)
  }

  /** Register the manager */
  private registerManager(manager: any) {
    this.manager = manager
    // Activate the Engine & start listening on activation and deactivation
    this.manager["engineActivatePlugin"] = (name: string) => this.activatePlugin(name)
    this.manager["engineDeactivatePlugin"] = (name: string) => this.deactivatePlugin(name)
    // Add all previous profiles
    const profiles = Object.values(this.plugins).map((p) => p.profile)
    this.manager.addProfile(profiles)
  }

  /** Remove plugin(s) from engine */
  remove(names: string | string[]) {
    const remove = async (name: string) => {
      await this.manager.deactivatePlugin(name)
      delete this.listeners[name]
      delete this.plugins[name]
    }
    return Array.isArray(names) ? Promise.all(names.map(remove)) : remove(names)
  }

  /**
   * Check is a name is already registered
   * @param name Name of the plugin
   */
  isRegistered(name: string) {
    return !!this.plugins[name]
  }
}

export function isViewLibrary(profile: any): any is LibraryViewProfile {
  return !!profile.location
}

export class LibraryPlugin<T extends Api = any, P extends LibraryProfile | LibraryViewProfile = any> extends Plugin {
  private isView: boolean

  constructor(
    protected library: LibraryApi<T, P>,
    public profile: P,
  ) {
    super(profile)
    profile.methods.forEach((method) => {
      if (!library[method]) {
        throw new Error(
          `Method ${method} is exposed by LibraryPlugin ${profile.name}. But library doesn't expose this method`,
        )
      }
    })
    this.isView = isViewLibrary(profile)
    if (this.isView && !this["render"]) {
      throw new Error(
        `Profile ${profile.name} define the location ${(profile as LibraryViewProfile).location}, but method "render" is not implemented`,
      )
    }
  }

  async activate() {
    if (this.isView) {
      await this.call((this.profile as LibraryViewProfile).location, "addView", this.profile, this["render"]())
    }

    // Forward event to the library
    if (this.profile.notifications) {
      if (!this.library.events || !this.library.events.emit) {
        throw new Error(`"events" object from Library of plugin ${this.name} should implement "emit"`)
      }
      Object.keys(this.profile.notifications).forEach((name) => {
        this.profile.notifications[name].forEach((key) => {
          this.on(name, key, (payload: any[]) => this.library.events.emit(`[${name}] ${key}`, ...payload))
        })
      })
    }
    // Start listening on events from the library
    if (this.profile.events) {
      if (!this.library.events || !this.library.events.emit) {
        throw new Error(`"events" object from Library of plugin ${this.name} should implement "emit"`)
      }
      this.profile.events.forEach((event) => {
        this.library.events.on(event, (...payload) => this.emit(event, ...payload))
      })
    }
    // Start listening before running onActivation
    super.activate()
  }

  deactivate() {
    if (this.isView) {
      this.call((this.profile as LibraryViewProfile).location, "removeView", this.profile)
    }
    // Stop listening on events
    if (this.profile.notifications) {
      Object.keys(this.profile.notifications).forEach((name) => {
        this.profile.notifications[name].forEach((key) => this.off(name, key))
      })
    }
    // Stop listening on events from the library
    this.profile.events?.forEach((e) => this.library.events?.removeAllListeners(e))
    super.deactivate()
  }

  /** Call a method from this plugin */
  protected callPluginMethod(key: string, payload: any[]) {
    if (!this.library[key]) {
      throw new Error(`LibraryPlugin ${this.name} doesn't expose method ${key}`)
    }
    return this.library[key](...payload)
  }
}
