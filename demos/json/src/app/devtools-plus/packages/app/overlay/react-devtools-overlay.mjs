var React = (typeof window !== 'undefined' ? window.React : undefined) || (typeof global !== 'undefined' ? global.React : undefined);
var ReactDOM = (typeof window !== 'undefined' ? window.ReactDOM : undefined) || (typeof global !== 'undefined' ? global.ReactDOM : undefined);
var ou = Object.defineProperty, iu = Object.defineProperties;
var au = Object.getOwnPropertyDescriptors;
var Ki = Object.getOwnPropertySymbols;
var su = Object.prototype.hasOwnProperty, lu = Object.prototype.propertyIsEnumerable;
var Ji = (e, t, n) => t in e ? ou(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Te = (e, t) => {
  for (var n in t || (t = {}))
    su.call(t, n) && Ji(e, n, t[n]);
  if (Ki)
    for (var n of Ki(t))
      lu.call(t, n) && Ji(e, n, t[n]);
  return e;
}, nn = (e, t) => iu(e, au(t));
var cu = Object.create, Ps = Object.defineProperty, uu = Object.getOwnPropertyDescriptor, Os = Object.getOwnPropertyNames, du = Object.getPrototypeOf, pu = Object.prototype.hasOwnProperty, fu = (e, t) => function() {
  return t || (0, e[Os(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, hu = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (var o = Os(t), i = 0, a = o.length, l; i < a; i++)
    l = o[i], !pu.call(e, l) && l !== n && Ps(e, l, {
      get: ((s) => t[s]).bind(null, l),
      enumerable: !(r = uu(t, l)) || r.enumerable
    });
  return e;
}, mu = (e, t, n) => (n = e != null ? cu(du(e)) : {}, hu(Ps(n, "default", {
  value: e,
  enumerable: !0
}), e)), Hr;
const Ar = typeof navigator != "undefined", qe = typeof window != "undefined" ? window : typeof globalThis != "undefined" ? globalThis : typeof global != "undefined" ? global : {};
typeof qe.chrome != "undefined" && qe.chrome.devtools;
typeof navigator != "undefined" && ((Hr = navigator.userAgent) === null || Hr === void 0 || Hr.toLowerCase().includes("electron"));
var gu = /* @__PURE__ */ fu({ "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js": ((e, t) => {
  t.exports = r;
  function n(i) {
    return i instanceof Buffer ? Buffer.from(i) : new i.constructor(i.buffer.slice(), i.byteOffset, i.length);
  }
  function r(i) {
    if (i = i || {}, i.circles) return o(i);
    const a = /* @__PURE__ */ new Map();
    if (a.set(Date, (d) => new Date(d)), a.set(Map, (d, f) => new Map(s(Array.from(d), f))), a.set(Set, (d, f) => new Set(s(Array.from(d), f))), i.constructorHandlers) for (const d of i.constructorHandlers) a.set(d[0], d[1]);
    let l = null;
    return i.proto ? p : u;
    function s(d, f) {
      const h = Object.keys(d), m = new Array(h.length);
      for (let v = 0; v < h.length; v++) {
        const w = h[v], g = d[w];
        typeof g != "object" || g === null ? m[w] = g : g.constructor !== Object && (l = a.get(g.constructor)) ? m[w] = l(g, f) : ArrayBuffer.isView(g) ? m[w] = n(g) : m[w] = f(g);
      }
      return m;
    }
    function u(d) {
      if (typeof d != "object" || d === null) return d;
      if (Array.isArray(d)) return s(d, u);
      if (d.constructor !== Object && (l = a.get(d.constructor))) return l(d, u);
      const f = {};
      for (const h in d) {
        if (Object.hasOwnProperty.call(d, h) === !1) continue;
        const m = d[h];
        typeof m != "object" || m === null ? f[h] = m : m.constructor !== Object && (l = a.get(m.constructor)) ? f[h] = l(m, u) : ArrayBuffer.isView(m) ? f[h] = n(m) : f[h] = u(m);
      }
      return f;
    }
    function p(d) {
      if (typeof d != "object" || d === null) return d;
      if (Array.isArray(d)) return s(d, p);
      if (d.constructor !== Object && (l = a.get(d.constructor))) return l(d, p);
      const f = {};
      for (const h in d) {
        const m = d[h];
        typeof m != "object" || m === null ? f[h] = m : m.constructor !== Object && (l = a.get(m.constructor)) ? f[h] = l(m, p) : ArrayBuffer.isView(m) ? f[h] = n(m) : f[h] = p(m);
      }
      return f;
    }
  }
  function o(i) {
    const a = [], l = [], s = /* @__PURE__ */ new Map();
    if (s.set(Date, (h) => new Date(h)), s.set(Map, (h, m) => new Map(p(Array.from(h), m))), s.set(Set, (h, m) => new Set(p(Array.from(h), m))), i.constructorHandlers) for (const h of i.constructorHandlers) s.set(h[0], h[1]);
    let u = null;
    return i.proto ? f : d;
    function p(h, m) {
      const v = Object.keys(h), w = new Array(v.length);
      for (let g = 0; g < v.length; g++) {
        const y = v[g], k = h[y];
        if (typeof k != "object" || k === null) w[y] = k;
        else if (k.constructor !== Object && (u = s.get(k.constructor))) w[y] = u(k, m);
        else if (ArrayBuffer.isView(k)) w[y] = n(k);
        else {
          const S = a.indexOf(k);
          S !== -1 ? w[y] = l[S] : w[y] = m(k);
        }
      }
      return w;
    }
    function d(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return p(h, d);
      if (h.constructor !== Object && (u = s.get(h.constructor))) return u(h, d);
      const m = {};
      a.push(h), l.push(m);
      for (const v in h) {
        if (Object.hasOwnProperty.call(h, v) === !1) continue;
        const w = h[v];
        if (typeof w != "object" || w === null) m[v] = w;
        else if (w.constructor !== Object && (u = s.get(w.constructor))) m[v] = u(w, d);
        else if (ArrayBuffer.isView(w)) m[v] = n(w);
        else {
          const g = a.indexOf(w);
          g !== -1 ? m[v] = l[g] : m[v] = d(w);
        }
      }
      return a.pop(), l.pop(), m;
    }
    function f(h) {
      if (typeof h != "object" || h === null) return h;
      if (Array.isArray(h)) return p(h, f);
      if (h.constructor !== Object && (u = s.get(h.constructor))) return u(h, f);
      const m = {};
      a.push(h), l.push(m);
      for (const v in h) {
        const w = h[v];
        if (typeof w != "object" || w === null) m[v] = w;
        else if (w.constructor !== Object && (u = s.get(w.constructor))) m[v] = u(w, f);
        else if (ArrayBuffer.isView(w)) m[v] = n(w);
        else {
          const g = a.indexOf(w);
          g !== -1 ? m[v] = l[g] : m[v] = f(w);
        }
      }
      return a.pop(), l.pop(), m;
    }
  }
}) }), vu = /* @__PURE__ */ mu(gu());
(0, vu.default)({ circles: !0 });
var wu = class {
  constructor(e = {}) {
    this.connections = /* @__PURE__ */ new Map(), this.reconnectAttempts = /* @__PURE__ */ new Map(), this.reconnectTimers = /* @__PURE__ */ new Map(), this.maxReconnectAttempts = e.maxReconnectAttempts || 5, this.reconnectDelay = e.reconnectDelay || 1e3;
  }
  /**
   * Register a connection
   * 注册连接
   */
  register(e, t) {
    this.connections.set(e, t), this.reconnectAttempts.set(e, 0);
  }
  /**
   * Unregister a connection
   * 注销连接
   */
  unregister(e) {
    const t = this.reconnectTimers.get(e);
    t && (clearTimeout(t), this.reconnectTimers.delete(e)), this.connections.delete(e), this.reconnectAttempts.delete(e);
  }
  /**
   * Get a connection
   * 获取连接
   */
  get(e) {
    return this.connections.get(e);
  }
  /**
   * Get all connections
   * 获取所有连接
   */
  getAll() {
    return new Map(this.connections);
  }
  /**
   * Check if a connection exists
   * 检查连接是否存在
   */
  has(e) {
    return this.connections.has(e);
  }
  /**
   * Handle connection error and attempt reconnect
   * 处理连接错误并尝试重连
   */
  handleError(e, t, n) {
    if (console.error(`[React DevTools] Connection error for ${e}:`, t), !n)
      return;
    const r = this.reconnectAttempts.get(e) || 0;
    if (r >= this.maxReconnectAttempts) {
      console.error(`[React DevTools] Max reconnect attempts reached for ${e}`);
      return;
    }
    const o = this.reconnectDelay * 2 ** r, i = setTimeout(async () => {
      try {
        await n(), this.reconnectAttempts.set(e, 0);
      } catch (a) {
        this.reconnectAttempts.set(e, r + 1), this.handleError(e, a, n);
      }
    }, o);
    this.reconnectTimers.set(e, i);
  }
  /**
   * Close all connections
   * 关闭所有连接
   */
  closeAll() {
    this.connections.forEach((e) => {
      e.$close && e.$close();
    }), this.reconnectTimers.forEach((e) => {
      clearTimeout(e);
    }), this.connections.clear(), this.reconnectAttempts.clear(), this.reconnectTimers.clear();
  }
};
new wu();
var yu = class {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map();
  }
  /**
   * Subscribe to an event
   * 订阅事件
   */
  on(e, t) {
    this.handlers.has(e) || this.handlers.set(e, /* @__PURE__ */ new Set());
    const n = this.handlers.get(e);
    return n.add(t), () => {
      n.delete(t), n.size === 0 && this.handlers.delete(e);
    };
  }
  /**
   * Subscribe to an event once
   * 订阅一次性事件
   */
  once(e, t) {
    let n;
    const r = (o) => {
      t(o), n();
    };
    return n = this.on(e, r), n;
  }
  /**
   * Emit an event
   * 发送事件
   */
  emit(e) {
    const t = this.handlers.get(e.type);
    t && t.forEach((n) => {
      try {
        n(e);
      } catch (r) {
        console.error(`[React DevTools] Error in event handler for "${e.type}":`, r);
      }
    });
  }
  /**
   * Remove all event handlers
   * 移除所有事件处理器
   */
  clear() {
    this.handlers.clear();
  }
  /**
   * Remove all handlers for a specific event type
   * 移除特定事件类型的所有处理器
   */
  clearType(e) {
    this.handlers.delete(e);
  }
  /**
   * Get number of handlers for an event type
   * 获取事件类型的处理器数量
   */
  getHandlerCount(e) {
    var t;
    return ((t = this.handlers.get(e)) == null ? void 0 : t.size) || 0;
  }
  /**
   * Check if there are any handlers for an event type
   * 检查是否有事件类型的处理器
   */
  hasHandlers(e) {
    return this.getHandlerCount(e) > 0;
  }
}, bu = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Map(), this.contexts = /* @__PURE__ */ new Map(), this.eventBus = new yu(), this.rpcFunctions = /* @__PURE__ */ new Map();
  }
  /**
   * Register a plugin
   * 注册插件
   */
  async register(e) {
    if (this.plugins.has(e.id))
      throw new Error(`[React DevTools] Plugin "${e.id}" is already registered`);
    const t = this.createContext(e.id);
    if (this.contexts.set(e.id, t), this.plugins.set(e.id, e), e.rpc && Object.entries(e.rpc).forEach(([n, r]) => {
      const o = `${e.id}.${n}`;
      this.rpcFunctions.set(o, r);
    }), e.on && Object.entries(e.on).forEach(([n, r]) => {
      r && this.eventBus.on(n, r);
    }), e.setup)
      try {
        await e.setup(t), console.log(`[React DevTools] Plugin "${e.name}" registered successfully`);
      } catch (n) {
        throw console.error(`[React DevTools] Failed to setup plugin "${e.name}":`, n), this.plugins.delete(e.id), this.contexts.delete(e.id), n;
      }
  }
  /**
   * Unregister a plugin
   * 注销插件
   */
  async unregister(e) {
    const t = this.plugins.get(e);
    if (!t) {
      console.warn(`[React DevTools] Plugin "${e}" is not registered`);
      return;
    }
    if (t.teardown)
      try {
        await t.teardown();
      } catch (n) {
        console.error(`[React DevTools] Error during plugin teardown for "${t.name}":`, n);
      }
    t.rpc && Object.keys(t.rpc).forEach((n) => {
      const r = `${e}.${n}`;
      this.rpcFunctions.delete(r);
    }), this.plugins.delete(e), this.contexts.delete(e), console.log(`[React DevTools] Plugin "${t.name}" unregistered`);
  }
  /**
   * Get a plugin by ID
   * 根据 ID 获取插件
   */
  get(e) {
    return this.plugins.get(e);
  }
  /**
   * Get all plugins
   * 获取所有插件
   */
  getAll() {
    return Array.from(this.plugins.values());
  }
  /**
   * Check if a plugin is registered
   * 检查插件是否已注册
   */
  has(e) {
    return this.plugins.has(e);
  }
  /**
   * Get plugin context
   * 获取插件上下文
   */
  getContext(e) {
    return this.contexts.get(e);
  }
  /**
   * Set component tree getter
   * 设置组件树获取器
   */
  setComponentTreeGetter(e) {
    this.componentTreeGetter = e;
  }
  /**
   * Set component details getter
   * 设置组件详情获取器
   */
  setComponentDetailsGetter(e) {
    this.componentDetailsGetter = e;
  }
  /**
   * Call plugin RPC function
   * 调用插件 RPC 函数
   */
  async callRPC(e, ...t) {
    const n = this.rpcFunctions.get(e);
    if (!n)
      throw new Error(`[React DevTools] RPC function "${e}" not found`);
    try {
      return await n(...t);
    } catch (r) {
      throw console.error(`[React DevTools] Error calling RPC function "${e}":`, r), r;
    }
  }
  /**
   * Emit event to all plugins
   * 向所有插件发送事件
   */
  emit(e) {
    this.eventBus.emit(e);
  }
  /**
   * Subscribe to events
   * 订阅事件
   */
  on(e, t) {
    return this.eventBus.on(e, t);
  }
  /**
   * Cleanup all plugins
   * 清理所有插件
   */
  async cleanup() {
    const e = Array.from(this.plugins.keys());
    for (const t of e)
      await this.unregister(t);
    this.eventBus.clear(), this.rpcFunctions.clear();
  }
  /**
   * Create plugin context
   * 创建插件上下文
   */
  createContext(e) {
    return {
      getComponentTree: async () => {
        if (!this.componentTreeGetter)
          throw new Error("[React DevTools] Component tree getter not set");
        return this.componentTreeGetter();
      },
      getComponentDetails: async (t) => {
        if (!this.componentDetailsGetter)
          throw new Error("[React DevTools] Component details getter not set");
        return this.componentDetailsGetter(t);
      },
      emit: (t) => {
        this.eventBus.emit(t);
      },
      on: (t, n) => this.eventBus.on(t, n),
      registerRPC: (t, n) => {
        const r = `${e}.${t}`;
        this.rpcFunctions.set(r, n);
      },
      callRPC: async (t, ...n) => this.callRPC(t, ...n)
    };
  }
}, ko = new bu();
Math.random.bind(Math);
const W = {
  FunctionComponent: 0,
  ClassComponent: 1,
  IndeterminateComponent: 2,
  HostRoot: 3,
  HostComponent: 5,
  HostText: 6,
  Fragment: 7,
  Mode: 8,
  ContextConsumer: 9,
  ContextProvider: 10,
  ForwardRef: 11,
  SuspenseComponent: 13,
  MemoComponent: 14,
  SimpleMemoComponent: 15
};
function Ze(e) {
  var i;
  const { elementType: t, type: n, tag: r } = e, o = t || n;
  if (!o)
    return r === W.HostRoot ? "Root" : r === W.HostComponent ? typeof e.type == "string" ? e.type : "Host" : "Unknown";
  if (typeof o == "string")
    return o;
  if (o.displayName)
    return o.displayName;
  if (o.name)
    return o.name;
  if (o.__name)
    return o.__name;
  if (o.type) {
    const a = o.type;
    if (a != null && a.displayName)
      return a.displayName;
    if (a != null && a.name)
      return a.name;
    if (a != null && a.__name)
      return a.__name;
  }
  if ((i = o.render) != null && i.name)
    return o.render.name;
  if (typeof o == "function") {
    const a = o.name;
    if (a && a !== "")
      return a;
  }
  return "Anonymous";
}
function hi(e, t) {
  return e.tag === W.HostText || e.tag === W.Fragment || e.tag === W.Mode || e.tag === W.HostRoot || !t && e.tag === W.HostComponent ? !1 : [
    W.HostComponent,
    W.FunctionComponent,
    W.ClassComponent,
    W.ForwardRef,
    W.MemoComponent,
    W.SimpleMemoComponent,
    W.IndeterminateComponent,
    W.ContextProvider,
    W.ContextConsumer,
    W.SuspenseComponent
  ].includes(e.tag);
}
let xu = 0;
const Ur = /* @__PURE__ */ new WeakMap();
function Ge(e) {
  return Ur.has(e) || Ur.set(e, `react-fiber-${++xu}`), Ur.get(e);
}
function Ms(e) {
  const t = Object.keys(e);
  for (const n of t)
    if (n.startsWith("__reactFiber") || n.startsWith("__reactInternalInstance"))
      return e[n];
  return null;
}
function Co(e, t = 0, n = 6) {
  var o, i;
  if (e === null)
    return { type: "null", value: "null" };
  if (e === void 0)
    return { type: "undefined", value: "undefined" };
  const r = typeof e;
  if (r === "string")
    return { type: "string", value: `"${e.length > 100 ? `${e.slice(0, 100)}...` : e}"` };
  if (r === "number")
    return { type: "number", value: String(e) };
  if (r === "boolean")
    return { type: "boolean", value: String(e) };
  if (r === "function")
    return { type: "function", value: `ƒ ${e.name || "anonymous"}()` };
  if (r === "symbol")
    return { type: "symbol", value: e.toString() };
  if (t > n)
    return Array.isArray(e) ? { type: "array", value: `Array(${e.length})` } : { type: "object", value: "Object" };
  if (Array.isArray(e)) {
    const a = {};
    return e.forEach((l, s) => {
      a[String(s)] = Co(l, t + 1, n);
    }), {
      type: "array",
      value: `Array(${e.length})`,
      children: Object.keys(a).length > 0 ? a : void 0
    };
  }
  if (r === "object") {
    if (e.$$typeof)
      return { type: "element", value: `<${((o = e.type) == null ? void 0 : o.displayName) || ((i = e.type) == null ? void 0 : i.name) || e.type || "Unknown"} />` };
    const a = Object.keys(e), l = {};
    for (const s of a)
      try {
        l[s] = Co(e[s], t + 1, n);
      } catch (u) {
        l[s] = { type: "unknown", value: "[Error]" };
      }
    return {
      type: "object",
      value: "Object",
      preview: a.length > 0 ? `{${a.slice(0, 3).join(", ")}${a.length > 3 ? ", ..." : ""}}` : "{}",
      children: Object.keys(l).length > 0 ? l : void 0
    };
  }
  return { type: "unknown", value: String(e) };
}
function _u(e) {
  var r, o, i;
  const t = ((r = e.type) == null ? void 0 : r._context) || e.type;
  if (!t)
    return "Unknown Context";
  if (t.displayName)
    return t.displayName;
  if ((o = t.Provider) != null && o.displayName)
    return t.Provider.displayName.replace(".Provider", "");
  if ((i = t.Consumer) != null && i.displayName)
    return t.Consumer.displayName.replace(".Consumer", "");
  const n = Ze(e);
  return n && n !== "Anonymous" ? n.replace(".Provider", "").replace(".Consumer", "") : "Context";
}
function ku(e) {
  if (e.memoizedProps && "value" in e.memoizedProps)
    return e.memoizedProps.value;
}
function So(e) {
  return e.tag === W.ContextProvider;
}
function To(e, t, n, r) {
  var o;
  if (!(!e || r.has(e))) {
    if (r.add(e), e.tag === W.ContextConsumer && (((o = e.type) == null ? void 0 : o._context) || e.type) === t && n.push({
      id: Ge(e),
      name: Ze(e),
      fiberId: Ge(e)
    }), e.tag === W.FunctionComponent || e.tag === W.ForwardRef || e.tag === W.MemoComponent || e.tag === W.SimpleMemoComponent) {
      let i = e.memoizedState;
      for (; i; ) {
        if (i.memoizedState !== void 0) {
          const a = e.dependencies;
          if (a != null && a.firstContext) {
            let l = a.firstContext;
            for (; l; ) {
              if (l.context === t) {
                n.push({
                  id: Ge(e),
                  name: Ze(e),
                  fiberId: Ge(e)
                });
                break;
              }
              l = l.next;
            }
          }
        }
        i = i.next;
      }
    }
    e.child && To(e.child, t, n, r), e.sibling && To(e.sibling, t, n, r);
  }
}
function zs(e, t) {
  var l;
  if (!So(e))
    return null;
  const n = (l = e.type) == null ? void 0 : l._context, r = [];
  e.child && To(e.child, n, r, /* @__PURE__ */ new WeakSet());
  const o = r.filter(
    (s, u, p) => u === p.findIndex((d) => d.id === s.id)
  ), i = {
    id: Ge(e),
    name: _u(e),
    value: Co(ku(e)),
    fiberId: Ge(e),
    consumerCount: o.length,
    consumers: o,
    children: [],
    source: e._debugSource ? {
      fileName: e._debugSource.fileName,
      lineNumber: e._debugSource.lineNumber,
      columnNumber: e._debugSource.columnNumber
    } : void 0
  }, a = (s) => {
    var u;
    if (!(!s || t.has(s)))
      if (t.add(s), So(s) && ((u = s.type) == null ? void 0 : u._context) === n) {
        const p = zs(s, t);
        p && i.children.push(p);
      } else
        s.child && a(s.child), s.sibling && a(s.sibling);
  };
  return e.child && a(e.child), i;
}
function Eo(e, t, n, r) {
  var o;
  if (!(!e || n.has(e))) {
    if (n.add(e), So(e)) {
      const i = (o = e.type) == null ? void 0 : o._context;
      if (i && !r.has(i)) {
        const a = zs(e, new WeakSet([e]));
        a && (t.push(a), r.add(i));
      }
    }
    e.child && Eo(e.child, t, n, r), e.sibling && Eo(e.sibling, t, n, r);
  }
}
function Ds(e) {
  var a;
  const t = [], n = /* @__PURE__ */ new WeakSet(), r = /* @__PURE__ */ new Set();
  (a = e == null ? void 0 : e.current) != null && a.child && Eo(e.current.child, t, n, r);
  let o = 0;
  const i = (l) => {
    for (const s of l)
      o += s.consumerCount, s.children.length > 0 && i(s.children);
  };
  return i(t), {
    providers: t,
    totalProviders: t.length,
    totalConsumers: o
  };
}
function Cu(e, t) {
  const n = Ds(e), r = (o) => {
    for (const i of o) {
      if (i.fiberId === t)
        return i;
      const a = r(i.children);
      if (a)
        return a;
    }
    return null;
  };
  return r(n.providers);
}
function Su(e) {
  return Ds(e);
}
function nt(e, t = 0, n = 8) {
  var o, i;
  if (e === null)
    return { type: "null", value: "null" };
  if (e === void 0)
    return { type: "undefined", value: "undefined" };
  const r = typeof e;
  if (r === "string")
    return { type: "string", value: `"${e.length > 100 ? `${e.slice(0, 100)}...` : e}"` };
  if (r === "number")
    return { type: "number", value: String(e) };
  if (r === "boolean")
    return { type: "boolean", value: String(e) };
  if (r === "function")
    return { type: "function", value: `ƒ ${e.name || "anonymous"}()` };
  if (r === "symbol")
    return { type: "symbol", value: e.toString() };
  if (t > n)
    return Array.isArray(e) ? { type: "array", value: `Array(${e.length})` } : { type: "object", value: "Object" };
  if (Array.isArray(e)) {
    const a = {};
    return e.forEach((l, s) => {
      a[String(s)] = nt(l, t + 1, n);
    }), {
      type: "array",
      value: `Array(${e.length})`,
      children: Object.keys(a).length > 0 ? a : void 0
    };
  }
  if (r === "object") {
    if (e.$$typeof)
      return { type: "element", value: `<${((o = e.type) == null ? void 0 : o.displayName) || ((i = e.type) == null ? void 0 : i.name) || e.type || "Unknown"} />` };
    const a = Object.keys(e), l = {};
    for (const s of a)
      try {
        l[s] = nt(e[s], t + 1, n);
      } catch (u) {
        l[s] = { type: "unknown", value: "[Error]" };
      }
    return {
      type: "object",
      value: "Object",
      preview: a.length > 0 ? `{${a.slice(0, 3).join(", ")}${a.length > 3 ? ", ..." : ""}}` : "{}",
      children: Object.keys(l).length > 0 ? l : void 0
    };
  }
  return { type: "unknown", value: String(e) };
}
function Tu(e) {
  var r, o;
  const t = {}, n = e.memoizedProps;
  if (!n || typeof n != "object")
    return t;
  for (const [i, a] of Object.entries(n)) {
    if (i === "children") {
      if (a)
        if (Array.isArray(a))
          t[i] = { type: "array", value: `[${a.length} children]` };
        else if (typeof a == "object" && a.$$typeof) {
          const l = ((r = a.type) == null ? void 0 : r.displayName) || ((o = a.type) == null ? void 0 : o.name) || a.type || "Element";
          t[i] = { type: "element", value: `<${l} />` };
        } else typeof a == "string" ? t[i] = { type: "string", value: `"${a.slice(0, 50)}${a.length > 50 ? "..." : ""}"` } : t[i] = nt(a);
      continue;
    }
    t[i] = nt(a);
  }
  return t;
}
const Zi = {
  0: "useState",
  1: "useReducer",
  2: "useContext",
  3: "useRef",
  4: "useEffect",
  5: "useInsertionEffect",
  6: "useLayoutEffect",
  7: "useCallback",
  8: "useMemo",
  9: "useImperativeHandle",
  10: "useDebugValue",
  11: "useDeferredValue",
  12: "useTransition",
  13: "useMutableSource",
  14: "useSyncExternalStore",
  15: "useId",
  16: "useCacheRefresh"
};
function Eu(e) {
  var i;
  const t = [];
  if (e.tag !== W.FunctionComponent && e.tag !== W.ForwardRef && e.tag !== W.SimpleMemoComponent && e.tag !== W.MemoComponent)
    return t;
  const n = e._debugHookTypes;
  let r = e.memoizedState, o = 0;
  for (; r; ) {
    let a = "Hook";
    n && n[o] ? a = n[o] : r.tag !== void 0 && Zi[r.tag] ? a = Zi[r.tag] : r.queue !== void 0 && r.baseState !== void 0 ? a = "useState" : r.memoizedState !== void 0 && r.deps !== void 0 ? a = "useMemo/useCallback" : r.current !== void 0 && (a = "useRef");
    let l;
    if (a === "useState" || a === "useReducer")
      l = nt(r.memoizedState);
    else if (a === "useRef")
      l = nt((i = r.memoizedState) == null ? void 0 : i.current);
    else if (a === "useContext")
      l = nt(r.memoizedState);
    else if (a === "useMemo" || a === "useCallback" || a === "useMemo/useCallback") {
      const s = r.memoizedState;
      Array.isArray(s) && s.length >= 1 ? l = nt(s[0]) : l = nt(s);
    } else
      l = { type: "unknown", value: "..." };
    t.push({
      name: a,
      value: l
    }), r = r.next, o++;
  }
  return t;
}
function Nu(e) {
  const t = [];
  let n = e.return, r = 0;
  const o = 10;
  for (; n && r < o; ) {
    if (n.tag === W.FunctionComponent || n.tag === W.ClassComponent || n.tag === W.ForwardRef || n.tag === W.MemoComponent || n.tag === W.SimpleMemoComponent || n.tag === W.ContextProvider) {
      const i = Ze(n);
      i && i !== "Anonymous" && t.push({
        id: Ge(n),
        name: i,
        tag: n.tag
      });
    }
    n = n.return, r++;
  }
  return t;
}
function Ru(e) {
  if (e._debugSource)
    return {
      fileName: e._debugSource.fileName,
      lineNumber: e._debugSource.lineNumber,
      columnNumber: e._debugSource.columnNumber
    };
}
function Iu(e) {
  return {
    id: Ge(e),
    name: Ze(e),
    tag: e.tag,
    props: Tu(e),
    hooks: Eu(e),
    renderedBy: Nu(e),
    source: Ru(e),
    key: e.key
  };
}
const Fs = "__react-devtools-component-inspector__", $s = "__react-devtools-component-inspector__card__", Ls = "__react-devtools-component-inspector__name__", js = "__react-devtools-component-inspector__indicator__", No = "__react-devtools-component-inspector__source-file__", Au = "__react-devtools-component-inspector__source-hint__";
let Ro;
const Pu = {
  display: "block",
  zIndex: "2147483640",
  position: "fixed",
  backgroundColor: "color-mix(in srgb, var(--color-primary-500, #61dafb), transparent 85%)",
  border: "1px solid color-mix(in srgb, var(--color-primary-500, #61dafb), transparent 50%)",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, Vs = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: "0",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "24px",
  backgroundColor: "var(--color-primary-500, #61dafb)",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  whiteSpace: "nowrap"
}, Ou = Te({}, Vs), Mu = nn(Te({}, Vs), {
  fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
  padding: "6px 10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "2px"
}), zu = {
  display: "inline-block",
  fontWeight: "400",
  fontStyle: "normal",
  fontSize: "12px",
  opacity: "0.7",
  marginLeft: "6px"
}, Du = {
  fontSize: "12px",
  fontWeight: "500"
}, Fu = {
  fontSize: "10px",
  opacity: "0.8",
  fontWeight: "normal"
};
function mi() {
  return document.getElementById(Fs);
}
function Ws(e, t, n) {
  const r = document.createElement("div");
  r.id = Fs, Object.assign(r.style, Pu);
  const o = document.createElement("div");
  if (o.id = $s, n) {
    Object.assign(o.style, Mu);
    const i = document.createElement("div");
    i.id = No, Object.assign(i.style, Du), o.appendChild(i);
    const a = document.createElement("div");
    a.id = Au, Object.assign(a.style, Fu), a.textContent = "Click to go to the file", o.appendChild(a);
  } else {
    Object.assign(o.style, Ou);
    const i = document.createElement("span");
    i.id = Ls, o.appendChild(i);
    const a = document.createElement("i");
    a.id = js, Object.assign(a.style, zu), o.appendChild(a);
  }
  return r.appendChild(o), document.body.appendChild(r), Hs(e, t, n), r;
}
function Hs(e, t, n) {
  let r = mi();
  const o = document.getElementById($s), i = document.getElementById(No);
  if (r && (n && !i || !n && i) && (r.remove(), r = null), !r) {
    Ws(e, t, n);
    return;
  }
  if (Object.assign(r.style, {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`,
    display: "block",
    opacity: "1",
    backgroundColor: "color-mix(in srgb, var(--color-primary-500, #61dafb), transparent 85%)",
    border: "1px solid color-mix(in srgb, var(--color-primary-500, #61dafb), transparent 50%)"
  }), o && Object.assign(o.style, {
    top: e.top < 45 ? "100%" : "auto",
    bottom: e.top < 45 ? "auto" : "100%",
    marginTop: e.top < 45 ? "4px" : "0",
    marginBottom: e.top < 45 ? "0" : "4px"
  }), n) {
    const a = document.getElementById(No);
    if (a) {
      let l = n.fileName;
      const s = l.split("/"), u = s.findIndex((p) => p === "src");
      u > 0 ? l = s.slice(u).join("/") : s.length > 1 && !l.startsWith("/") && (l = s.slice(1).join("/")), a.textContent = `${l}:${n.lineNumber}:${n.columnNumber}`;
    }
  } else {
    const a = document.getElementById(Ls);
    a && (a.textContent = t === "Element" ? "Element" : `<${t}>`);
    const l = document.getElementById(js);
    l && (l.textContent = `${Math.round(e.width * 100) / 100} x ${Math.round(e.height * 100) / 100}`);
  }
}
function Ke() {
  const e = mi();
  e && (window.clearTimeout(Ro), e.style.opacity = "0", Ro = window.setTimeout(() => {
    e.style.display = "none";
  }, 150));
}
function Qi(e, t, n) {
  const r = mi();
  window.clearTimeout(Ro), r ? Hs(e, t, n) : Ws(e, t, n);
}
function $u(e) {
  if (!e.length)
    return null;
  let t = Number.POSITIVE_INFINITY, n = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
  return e.forEach((i) => {
    t = Math.min(t, i.top), n = Math.min(n, i.left), r = Math.max(r, i.right), o = Math.max(o, i.bottom);
  }), new DOMRect(n, t, Math.max(0, r - n), Math.max(0, o - t));
}
function Br(e) {
  var n;
  if (!e || !(e instanceof Node))
    return !1;
  const t = document.getElementById("react-devtools-overlay");
  return (n = t == null ? void 0 : t.contains(e)) != null ? n : !1;
}
function gi(e, t, n = /* @__PURE__ */ new WeakSet()) {
  var o;
  if (!e || n.has(e) || (n.add(e), e.stateNode && Br(e.stateNode)))
    return;
  if (e.tag === W.HostComponent && e.stateNode instanceof Element) {
    Br(e.stateNode) || t.add(e.stateNode);
    return;
  }
  if (e.tag === W.HostText) {
    const i = (o = e.stateNode) == null ? void 0 : o.parentElement;
    i && !Br(i) && t.add(i);
    return;
  }
  let r = e.child;
  for (; r; )
    gi(r, t, n), r = r.sibling;
}
function Dt(e, t) {
  if (!e) {
    Ke();
    return;
  }
  if (e.tag === W.HostComponent && e.stateNode instanceof Element) {
    const a = e.stateNode, l = a.getBoundingClientRect();
    if (l.width > 0 || l.height > 0) {
      const s = e.type || a.tagName.toLowerCase();
      Qi(l, s, t);
      return;
    }
  }
  const n = /* @__PURE__ */ new Set();
  if (gi(e, n), n.size === 0) {
    Ke();
    return;
  }
  const r = Array.from(n).map((a) => a.getBoundingClientRect()).filter((a) => a.width > 0 || a.height > 0), o = $u(r);
  if (!o || o.width === 0 && o.height === 0) {
    Ke();
    return;
  }
  const i = Ze(e);
  Qi(o, i, t);
}
function Lu(e) {
  if (!e)
    return;
  if (e.tag === W.HostComponent && e.stateNode instanceof Element) {
    e.stateNode.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    return;
  }
  const t = /* @__PURE__ */ new Set();
  if (gi(e, t), t.size === 0)
    return;
  const n = Array.from(t)[0];
  n && n.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}
const Us = /* @__PURE__ */ new Map();
function Je(e) {
  return Us.get(e);
}
function Bs(e, t, n, r) {
  let o = e;
  for (; o; ) {
    if (r.has(o)) {
      o = o.sibling;
      continue;
    }
    if (hi(o, t)) {
      r.add(o);
      const i = Ys(o, t);
      i && n.push(i);
    } else
      o.child && Bs(o.child, t, n, r);
    o = o.sibling;
  }
}
function Ys(e, t, n) {
  if (!e || e.tag === W.Mode || e.tag === W.Fragment || e.tag === W.HostRoot)
    return null;
  const r = Ze(e), o = {
    id: Ge(e),
    name: r,
    children: [],
    meta: {
      tag: e.tag
    }
  };
  Us.set(o.id, e);
  const i = /* @__PURE__ */ new WeakSet();
  return Bs(e.child, t, o.children, i), o;
}
function Xs(e, t) {
  if (!(e != null && e.current))
    return null;
  let r = e.current.child, o = 0;
  for (; r && o < 20; ) {
    if (o++, r.tag === W.Mode || r.tag === W.Fragment || r.tag === W.HostRoot) {
      r = r.child || r.sibling;
      continue;
    }
    if (hi(r, t))
      return Ys(r, t);
    if (r.child) {
      r = r.child;
      continue;
    }
    r = r.sibling;
  }
  return null;
}
const Yr = /* @__PURE__ */ new Map(), ju = /* @__PURE__ */ new Map();
function Gs() {
  const e = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!(e != null && e.renderers))
    return null;
  for (const t of e.renderers.values())
    if (t != null && t.overrideProps)
      return t;
  for (const t of e.renderers.values())
    if (t)
      return t;
  return null;
}
function vi(e, t) {
  if (t === "null" || t === "undefined")
    return e === "null" ? null : e === "undefined" ? void 0 : Vu(e);
  switch (t) {
    case "number":
      return Number(e);
    case "boolean":
      return e === "true";
    case "object":
    case "array":
      try {
        return JSON.parse(e);
      } catch (n) {
        return e;
      }
    default:
      return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1) : e;
  }
}
function Vu(e) {
  const t = e.trim();
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  if (t === "null")
    return null;
  if (t === "undefined")
    return;
  const n = Number(t);
  if (!Number.isNaN(n) && t !== "")
    return n;
  if (t.startsWith("{") && t.endsWith("}") || t.startsWith("[") && t.endsWith("]"))
    try {
      return JSON.parse(t);
    } catch (r) {
    }
  return t.startsWith('"') && t.endsWith('"') || t.startsWith("'") && t.endsWith("'") ? t.slice(1, -1) : t;
}
function qs(e, t, n) {
  if (t.length === 0)
    return n;
  const r = Array.isArray(e) ? [...e] : Te({}, e);
  let o = r;
  for (let i = 0; i < t.length - 1; i++) {
    const a = t[i], l = t[i + 1], s = !Number.isNaN(Number(l));
    o[a] = o[a] ? Array.isArray(o[a]) ? [...o[a]] : Te({}, o[a]) : s ? [] : {}, o = o[a];
  }
  return o[t[t.length - 1]] = n, r;
}
function Ks(e) {
  if (e.stateNode && typeof e.stateNode.forceUpdate == "function")
    try {
      return e.stateNode.forceUpdate(), !0;
    } catch (r) {
    }
  let t = e, n = 0;
  for (; t && n < 50; ) {
    if (t.stateNode && typeof t.stateNode.forceUpdate == "function")
      try {
        return t.stateNode.forceUpdate(), !0;
      } catch (r) {
      }
    if (t.memoizedState !== null && typeof t.memoizedState == "object" && Js(t.memoizedState))
      return !0;
    t = t.return, n++;
  }
  return !1;
}
function Js(e) {
  for (; e; ) {
    const t = e.queue, n = e.memoizedState;
    if (t != null && t.dispatch)
      try {
        const r = t.dispatch;
        if (n !== null && typeof n == "object") {
          const o = Array.isArray(n) ? [...n] : Te({}, n);
          return r(o), !0;
        } else {
          if (typeof n == "boolean")
            return r(!n), setTimeout(() => r(n), 0), !0;
          if (typeof n == "number")
            return r(n + 1e-7), setTimeout(() => r(n), 0), !0;
        }
      } catch (r) {
      }
    e = e.next;
  }
  return !1;
}
function Zs() {
  var e;
  try {
    const t = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!(t != null && t.renderers))
      return !1;
    for (const [n] of t.renderers.entries()) {
      const r = (e = t.getFiberRoots) == null ? void 0 : e.call(t, n);
      if (r) {
        for (const o of r)
          if (o.current && Io(o.current))
            return !0;
      }
    }
  } catch (t) {
  }
  return !1;
}
function Io(e, t = 0) {
  if (!e || t > 100)
    return !1;
  if (e.stateNode && typeof e.stateNode.forceUpdate == "function")
    try {
      return e.stateNode.forceUpdate(), !0;
    } catch (n) {
    }
  return !!(e.memoizedState !== null && typeof e.memoizedState == "object" && Js(e.memoizedState) || e.child && Io(e.child, t + 1) || e.sibling && Io(e.sibling, t + 1));
}
function Wu(e, t, n, r) {
  const o = Je(e);
  if (!o)
    return console.warn(`[React DevTools] Fiber not found: ${e}`), !1;
  const i = vi(n, r), a = t.split(".");
  try {
    Yr.has(e) || Yr.set(e, /* @__PURE__ */ new Map()), Yr.get(e).set(t, i);
    const l = Gs();
    if (l != null && l.overrideProps)
      try {
        return l.overrideProps(o, a, i), !0;
      } catch (p) {
        const d = Number.parseInt(e.replace("react-fiber-", ""), 10);
        if (!Number.isNaN(d))
          try {
            return l.overrideProps(d, a, i), !0;
          } catch (f) {
          }
      }
    const s = o.memoizedProps || {}, u = qs(s, a, i);
    return o.memoizedProps = u, o.pendingProps = u, o.alternate && (o.alternate.memoizedProps = u, o.alternate.pendingProps = u), Ks(o) || Zs(), !0;
  } catch (l) {
    return console.warn("[React DevTools] Failed to set prop:", l), !1;
  }
}
function Hu(e, t) {
  return !(["children", "key", "ref", "$$typeof"].includes(e) || ["element", "function", "symbol"].includes(t));
}
function Uu(e, t, n) {
  const r = Je(e);
  if (!r)
    return console.warn(`[React DevTools] Fiber not found: ${e}`), !1;
  if (r.tag !== W.ContextProvider)
    return console.warn("[React DevTools] Fiber is not a Context Provider"), !1;
  try {
    const o = vi(t, n);
    return wi(r, o, e);
  } catch (o) {
    return console.warn("[React DevTools] Failed to set context value:", o), !1;
  }
}
function Bu(e, t) {
  const n = Je(e);
  if (!n)
    return console.warn(`[React DevTools] Fiber not found: ${e}`), !1;
  if (n.tag !== W.ContextProvider)
    return console.warn("[React DevTools] Fiber is not a Context Provider"), !1;
  try {
    const r = JSON.parse(t);
    return wi(n, r, e);
  } catch (r) {
    return console.warn("[React DevTools] Failed to set context value from JSON:", r), !1;
  }
}
function Yu(e, t, n, r) {
  var i;
  const o = Je(e);
  if (!o)
    return console.warn(`[React DevTools] Fiber not found: ${e}`), !1;
  if (o.tag !== W.ContextProvider)
    return console.warn("[React DevTools] Fiber is not a Context Provider"), !1;
  try {
    const a = vi(n, r), l = t.split("."), s = (i = o.memoizedProps) == null ? void 0 : i.value, u = qs(s, l, a);
    return wi(o, u, e);
  } catch (a) {
    return console.warn("[React DevTools] Failed to set context value at path:", a), !1;
  }
}
function wi(e, t, n) {
  var a;
  ju.set(n, t);
  const r = Gs();
  if (r != null && r.overrideProps)
    try {
      return r.overrideProps(e, ["value"], t), !0;
    } catch (l) {
      const s = Number.parseInt(n.replace("react-fiber-", ""), 10);
      if (!Number.isNaN(s))
        try {
          return r.overrideProps(s, ["value"], t), !0;
        } catch (u) {
        }
    }
  const o = nn(Te({}, e.memoizedProps || {}), { value: t });
  e.memoizedProps = o, e.pendingProps = o, e.alternate && (e.alternate.memoizedProps = o, e.alternate.pendingProps = o);
  const i = (a = e.type) == null ? void 0 : a._context;
  return i && (i._currentValue = t, "_currentValue2" in i && (i._currentValue2 = t)), Ks(e) || Zs(), !0;
}
function Xu(e) {
  var a;
  const t = Je(e);
  if (!t)
    return [];
  if (t.tag !== W.FunctionComponent && t.tag !== W.ForwardRef && t.tag !== W.SimpleMemoComponent && t.tag !== W.MemoComponent)
    return [];
  const n = [], r = t._debugHookTypes;
  let o = t.memoizedState, i = 0;
  for (; o; ) {
    if ((a = o.queue) != null && a.dispatch) {
      const l = (r == null ? void 0 : r[i]) || "State", s = o.memoizedState, u = Ku(s);
      n.push({
        index: i,
        name: l,
        value: Qu(s),
        type: u,
        canEdit: Ju(u)
      });
    }
    o = o.next, i++;
  }
  return n;
}
function Gu(e, t, n, r) {
  var u;
  const o = Je(e);
  if (!o)
    return console.warn(`[React DevTools] Fiber not found: ${e}`), !1;
  let i = o.memoizedState, a = 0, l = null;
  for (; i; ) {
    if ((u = i.queue) != null && u.dispatch) {
      if (a === t) {
        l = i;
        break;
      }
      a++;
    }
    i = i.next;
  }
  if (!l)
    return console.warn(`[React DevTools] Hook at index ${t} not found`), !1;
  const s = l.queue.dispatch;
  if (!s)
    return console.warn("[React DevTools] Hook has no dispatch function"), !1;
  try {
    const p = Zu(n, r);
    return s(p), !0;
  } catch (p) {
    return console.warn("[React DevTools] Failed to set hook state:", p), !1;
  }
}
function qu(e, t, n) {
  var r;
  try {
    const o = JSON.parse(n), i = Je(e);
    if (!i)
      return !1;
    let a = i.memoizedState, l = 0;
    for (; a; ) {
      if ((r = a.queue) != null && r.dispatch) {
        if (l === t)
          return a.queue.dispatch(o), !0;
        l++;
      }
      a = a.next;
    }
    return !1;
  } catch (o) {
    return console.warn("[React DevTools] Failed to set hook state from JSON:", o), !1;
  }
}
function Ku(e) {
  return e === null ? "null" : e === void 0 ? "undefined" : Array.isArray(e) ? "array" : typeof e;
}
function Ju(e) {
  return ["string", "number", "boolean", "null", "undefined", "object", "array"].includes(e);
}
function Zu(e, t) {
  switch (t) {
    case "number":
      return Number(e);
    case "boolean":
      return e === "true";
    case "null":
      return null;
    case "undefined":
      return;
    case "object":
    case "array":
      try {
        return JSON.parse(e);
      } catch (n) {
        return e;
      }
    default:
      return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1) : e;
  }
}
function Qu(e) {
  if (e === null)
    return null;
  if (e !== void 0)
    return typeof e == "function" ? `ƒ ${e.name || "anonymous"}()` : typeof e == "symbol" ? e.toString() : e;
}
let Qs = null;
const jt = [];
let pn = null, yn;
const ed = 50;
function td(e) {
  Qs = e;
}
function nd(e) {
  const t = [], n = /:([^/]+)/g;
  let r = n.exec(e);
  for (; r !== null; )
    t.push(r[1]), r = n.exec(e);
  return t;
}
function rd(e) {
  var t, n, r;
  return e ? ((t = e.$$typeof) == null ? void 0 : t.toString()) === "Symbol(react.lazy)" || ((r = (n = e.type) == null ? void 0 : n.$$typeof) == null ? void 0 : r.toString()) === "Symbol(react.lazy)" : !1;
}
function el(e) {
  var t, n, r, o, i;
  if (e) {
    if (typeof e.type == "string")
      return e.type;
    if ((t = e.type) != null && t.name)
      return e.type.name;
    if ((n = e.type) != null && n.displayName)
      return e.type.displayName;
    if ((i = (o = (r = e.type) == null ? void 0 : r._payload) == null ? void 0 : o._result) != null && i.name)
      return e.type._payload._result.name;
  }
}
function tl(e, t = "") {
  var u;
  if (!e || !e.props)
    return null;
  const n = e.props, r = n.index === !0;
  let o = "";
  r ? o = t || "/" : n.path ? (n.path, o = n.path.startsWith("/") ? n.path : `${t}/${n.path}`.replace(/\/+/g, "/")) : o = t || "/";
  const i = [];
  if (n.children) {
    const p = Array.isArray(n.children) ? n.children : [n.children];
    for (const d of p)
      if (d && d.type && (d.type.name === "Route" || ((u = d.type) == null ? void 0 : u.displayName) === "Route")) {
        const f = tl(d, o);
        f && i.push(f);
      }
  }
  const a = i.length > 0, l = nd(n.path || ""), s = {
    path: o || "/",
    name: n.id || void 0,
    element: el(n.element),
    isIndex: r,
    isLayout: a,
    hasLoader: !!n.loader,
    hasAction: !!n.action,
    isLazy: rd(n.element) || !!n.lazy,
    hasErrorBoundary: !!n.errorElement || !!n.ErrorBoundary,
    params: l.length > 0 ? l : void 0
  };
  return a && (s.children = i), s;
}
function od(e) {
  var r;
  const t = [];
  if (!(e != null && e.children))
    return t;
  const n = Array.isArray(e.children) ? e.children : [e.children];
  for (const o of n)
    if (o && o.type && (o.type.name === "Route" || ((r = o.type) == null ? void 0 : r.displayName) === "Route")) {
      const i = tl(o);
      i && t.push(i);
    }
  return t;
}
function id(e) {
  const t = [], n = /* @__PURE__ */ new WeakSet();
  function r(o, i = "") {
    var u, p, d, f, h, m;
    if (!o || n.has(o))
      return;
    n.add(o);
    const a = Ze(o), l = o.memoizedProps || o.pendingProps;
    if ((a === "Route" || a === "RenderedRoute" || a === "RouteContext.Provider") && l) {
      const v = l.match || ((u = l.value) == null ? void 0 : u.match), w = l.route || ((p = l.value) == null ? void 0 : p.route);
      if (v || w) {
        const g = {
          path: (v == null ? void 0 : v.pathname) || (w == null ? void 0 : w.path) || i || "/",
          name: (w == null ? void 0 : w.id) || void 0,
          element: ((f = (d = w == null ? void 0 : w.element) == null ? void 0 : d.type) == null ? void 0 : f.name) || ((m = (h = w == null ? void 0 : w.element) == null ? void 0 : h.type) == null ? void 0 : m.displayName) || el(l.element),
          hasLoader: !!(w != null && w.loader),
          hasAction: !!(w != null && w.action),
          hasErrorBoundary: !!(w != null && w.errorElement)
        };
        t.some((y) => y.path === g.path) || t.push(g);
      }
    }
    o.child && r(o.child, i), o.sibling && r(o.sibling, i);
  }
  return r(e), t;
}
function ad(e) {
  if (!e)
    return [];
  const t = /* @__PURE__ */ new WeakSet();
  let n = [];
  function r(o) {
    if (!o || t.has(o))
      return;
    t.add(o);
    const i = Ze(o), a = o.memoizedProps || o.pendingProps;
    if (i === "Routes") {
      const l = od(a);
      if (l.length > 0) {
        n = l;
        return;
      }
    }
    if (i === "DataRoutes" || i === "RoutesRenderer") {
      const l = id(o);
      l.length > 0 && n.push(...l);
    }
    o.child && r(o.child), o.sibling && r(o.sibling);
  }
  return r(e), n;
}
function sd(e, t) {
  const n = {}, r = e.split("/").filter(Boolean), o = t.split("/").filter(Boolean);
  if (r.length === 0 && o.length === 0)
    return { matched: !0, params: n };
  let i = 0, a = 0;
  for (; i < r.length && a < o.length; ) {
    const l = r[i], s = o[a];
    if (l.startsWith(":")) {
      const u = l.slice(1).replace("?", "");
      n[u] = s;
    } else {
      if (l === "*")
        return n["*"] = o.slice(a).join("/"), { matched: !0, params: n };
      if (l !== s)
        return { matched: !1, params: {} };
    }
    i++, a++;
  }
  for (; i < r.length; ) {
    const l = r[i];
    if (!l.endsWith("?") && !l.startsWith(":"))
      return { matched: !1, params: {} };
    i++;
  }
  return { matched: !0, params: n };
}
function ld(e, t) {
  const n = [];
  function r(o, i) {
    for (const a of o) {
      const { matched: l, params: s } = sd(a.path, t);
      if (l && (n.push({
        path: a.path,
        params: s,
        element: a.element
      }), a.children && a.children.length > 0 && r(a.children, a.path), a.path === t || a.isIndex))
        return !0;
    }
    return n.length > 0;
  }
  return r(e), n;
}
function tr() {
  if (window.location.hash && window.location.hash.startsWith("#/")) {
    const e = window.location.hash.slice(1), [t, n] = e.split("#"), [r, o] = (t || "/").split("?");
    return {
      path: r || "/",
      search: o ? `?${o}` : "",
      hash: n ? `#${n}` : ""
    };
  }
  return {
    path: window.location.pathname || "/",
    search: window.location.search || "",
    hash: window.location.hash || ""
  };
}
function cd(e) {
  const t = {};
  for (const n of e)
    Object.assign(t, n.params);
  return t;
}
function ud(e) {
  if (!e)
    return null;
  const t = /* @__PURE__ */ new WeakSet();
  function n(r) {
    if (!r || t.has(r))
      return null;
    t.add(r);
    const o = Ze(r);
    if (o === "Router" || o === "BrowserRouter" || o === "HashRouter" || o === "MemoryRouter" || o === "Routes" || o === "Route")
      return "react-router";
    if (r.child) {
      const i = n(r.child);
      if (i)
        return i;
    }
    if (r.sibling) {
      const i = n(r.sibling);
      if (i)
        return i;
    }
    return null;
  }
  return n(e);
}
function ea(e, t, n) {
  const r = Date.now();
  pn !== null && (yn = r - pn), jt.unshift({
    path: e,
    search: t,
    hash: n,
    timestamp: r,
    duration: yn
  }), jt.length > ed && jt.pop(), pn = null;
}
function dd() {
  const e = Qs, t = tr();
  if (!(e != null && e.current))
    return {
      currentPath: t.path,
      search: t.search,
      hash: t.hash,
      routes: [],
      routerType: null,
      matchedRoutes: [],
      params: {},
      history: [...jt],
      lastNavigationDuration: yn
    };
  const n = e.current, r = ud(n), o = ad(n.child), i = ld(o, t.path), a = cd(i);
  return {
    currentPath: t.path,
    search: t.search,
    hash: t.hash,
    routes: o,
    routerType: r,
    matchedRoutes: i,
    params: a,
    history: [...jt],
    lastNavigationDuration: yn
  };
}
function pd(e) {
  try {
    return pn = Date.now(), window.history && window.history.pushState ? (window.location.hash && window.location.hash.startsWith("#/") ? window.location.hash = e : (window.history.pushState({}, "", e), window.dispatchEvent(new PopStateEvent("popstate"))), !0) : (window.location.href = e, !0);
  } catch (t) {
    return console.error("[React DevTools] Failed to navigate:", t), pn = null, !1;
  }
}
function fd() {
  jt.length = 0, yn = void 0;
}
if (typeof window != "undefined") {
  let e = "";
  const t = () => {
    const a = tr();
    e = `${a.path}${a.search}${a.hash}`;
  }, n = () => {
    const a = tr(), l = `${a.path}${a.search}${a.hash}`;
    l !== e && (ea(a.path, a.search, a.hash), e = l);
  };
  window.addEventListener("popstate", n), window.addEventListener("hashchange", n);
  const r = window.history.pushState, o = window.history.replaceState;
  window.history.pushState = function(...a) {
    const l = r.apply(this, a);
    return n(), l;
  }, window.history.replaceState = function(...a) {
    const l = o.apply(this, a);
    return t(), l;
  };
  const i = tr();
  ea(i.path, i.search, i.hash), e = `${i.path}${i.search}${i.hash}`;
}
const fn = /* @__PURE__ */ new Map();
let jn = null, ta = null;
const Ao = /* @__PURE__ */ new Set();
function hd(e) {
  return Ao.add(e), () => {
    Ao.delete(e);
  };
}
function nl(e) {
  Ao.forEach((t) => {
    try {
      t(e);
    } catch (n) {
    }
  });
}
function ct(e) {
  return fn.has(e) || fn.set(e, /* @__PURE__ */ new Set()), fn.get(e);
}
function yi() {
  var e;
  if (typeof window != "undefined")
    return (e = window.__REACT_DEVTOOLS_CONFIG__) == null ? void 0 : e.rootSelector;
}
function rl(e) {
  const t = document.getElementById("react-devtools-overlay");
  if (!t)
    return !1;
  const n = e.containerInfo;
  return n && n instanceof Node && t.contains(n);
}
function md(e, t) {
  const n = e.containerInfo;
  if (!n || !(n instanceof Node))
    return !1;
  const r = document.querySelector(t);
  return r ? n === r || r.contains(n) : !1;
}
function gd(e) {
  if (rl(e))
    return !1;
  const t = yi();
  return t ? md(e, t) : !0;
}
function ol() {
  for (const t of fn.values())
    for (const n of t)
      if (n && gd(n))
        return n;
  if (!yi()) {
    for (const t of fn.values())
      for (const n of t)
        if (n && !rl(n))
          return n;
  }
  return null;
}
function na() {
  return ol();
}
function Ft(e, t) {
  ta !== (e == null ? void 0 : e.current) && (ta = e == null ? void 0 : e.current, td(e), jn && clearTimeout(jn), jn = setTimeout(() => {
    const n = Xs(e, t());
    n && nl(n), jn = null;
  }, 200));
}
function vd(e) {
  const t = ol();
  t && setTimeout(() => {
    const n = Xs(t, e);
    n && nl(n);
  }, 100);
}
function wd(e) {
  let t = 0;
  const n = /* @__PURE__ */ new Map();
  return {
    supportsFiber: !0,
    renderers: n,
    inject(r) {
      const o = ++t;
      return n.set(o, r), o;
    },
    getFiberRoots(r) {
      return new Set(ct(r));
    },
    onCommitFiberRoot(r, o) {
      ct(r).add(o), Ft(o, e);
    },
    onCommitFiberUnmount() {
    }
  };
}
function yd(e, t) {
  if (e.__REACT_DEVTOOLS_PATCHED__)
    return e;
  if ((e._instrumentationSource || "").includes("bippy") || window.__REACT_SCAN_INTERNALS__) {
    if (e.renderers)
      for (const o of e.renderers.keys())
        ln(o);
    try {
      const o = window.__REACT_SCAN_INTERNALS__;
      if (o && o.options) {
        const i = () => {
          if (e.renderers)
            for (const a of e.renderers.keys())
              ct(a).forEach((s) => Ft(s, t));
        };
        setInterval(() => {
          if (e.renderers)
            for (const a of e.renderers.keys())
              ct(a).forEach((s) => Ft(s, t));
        }, 1e3);
      }
    } catch (o) {
      console.warn("[React DevTools] Failed to attach to React Scan", o);
    }
    return e;
  }
  const r = e.onCommitFiberRoot;
  if (r) {
    const o = function(i, a) {
      let l;
      try {
        l = r.call(this, i, a);
      } catch (s) {
        console.error("[React DevTools] Error in other devtools hook:", s);
      }
      try {
        ct(i).add(a), Ft(a, t);
      } catch (s) {
      }
      return l;
    };
    Object.setPrototypeOf(o, Object.getPrototypeOf(r)), e.onCommitFiberRoot = o;
  } else
    e.onCommitFiberRoot = (o, i) => {
      ct(o).add(i), Ft(i, t);
    };
  return e.getFiberRoots || (e.getFiberRoots = (o) => new Set(ct(o))), e.__REACT_DEVTOOLS_PATCHED__ = !0, e;
}
function ln(e) {
  const t = yi();
  function n(l) {
    let s = l, u = 0;
    const p = 100;
    for (; s && u < p; ) {
      if (s.tag === 3 || s.tag === 24)
        return s.stateNode;
      s = s.return || s._debugOwner, u++;
    }
    return null;
  }
  function r(l) {
    const s = [...Object.keys(l), ...Object.getOwnPropertyNames(l)], u = /* @__PURE__ */ new Set();
    for (const p of s)
      if (!u.has(p)) {
        u.add(p);
        try {
          const d = l[p];
          if (!d || typeof d != "object")
            continue;
          if (p.startsWith("__reactContainer")) {
            if (d && (d.tag === 3 || d.tag === 24)) {
              const h = d.stateNode;
              if (h)
                return h;
            }
            const f = n(d);
            if (f)
              return f;
          } else if (p.startsWith("__reactFiber")) {
            const f = n(d);
            if (f)
              return f;
          } else if (p.startsWith("__reactInternalInstance")) {
            const f = n(d);
            if (f)
              return f;
          }
        } catch (d) {
          continue;
        }
      }
    return null;
  }
  function o(l, s) {
    const u = l.containerInfo;
    if (!u || !(u instanceof Element))
      return !1;
    const p = document.querySelector(s);
    return p ? u === p || p.contains(u) : !1;
  }
  function i(l) {
    if (t) {
      const d = document.querySelector(t);
      if (d) {
        const f = r(d);
        if (f && o(f, t))
          return f;
        const h = document.createTreeWalker(d, NodeFilter.SHOW_ELEMENT);
        let m = h.currentNode;
        for (; m; ) {
          const v = r(m);
          if (v && o(v, t))
            return v;
          m = h.nextNode();
        }
      }
      return null;
    }
    const s = ["root", "app", "main", "app-root"];
    for (const d of s) {
      const f = document.getElementById(d);
      if (!f)
        continue;
      const h = r(f);
      if (h)
        return h;
    }
    const u = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT);
    let p = u.currentNode;
    for (; p; ) {
      const d = r(p);
      if (d)
        return d;
      p = u.nextNode();
    }
    return null;
  }
  const a = i(document.body || document);
  return a ? (ct(e).add(a), setTimeout(() => {
    Ft(a, () => !1);
  }, 50), !0) : !1;
}
function bd() {
  const t = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!t || !t.renderers)
    return null;
  for (const n of t.renderers.values()) {
    if (n && n.version)
      return n.version;
    if (n && n.reconcilerVersion)
      return n.reconcilerVersion;
  }
  if (typeof window != "undefined") {
    const n = window.React;
    if (n && n.version)
      return n.version;
  }
  return null;
}
function xd(e) {
  const t = globalThis;
  if (t.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    const a = yd(t.__REACT_DEVTOOLS_GLOBAL_HOOK__, e);
    if (a.renderers && a.renderers.size > 0)
      for (const l of a.renderers.keys())
        ln(l);
    else {
      const l = a.inject({});
      ln(l);
    }
    return;
  }
  const n = wd(e);
  t.__REACT_DEVTOOLS_GLOBAL_HOOK__ = n;
  let r = 0;
  const o = 10;
  function i() {
    r++;
    const a = n.inject({});
    if (!ln(a)) {
      if (n.renderers && n.renderers.size > 0) {
        for (const s of n.renderers.keys())
          if (ln(s))
            return;
      }
      r < o && setTimeout(i, 200 * r);
    }
  }
  i(), setTimeout(() => {
    i();
  }, 50);
}
let bi = !1, bn = "select-component";
const Po = /* @__PURE__ */ new Set(), Oo = /* @__PURE__ */ new Set();
function _d(e) {
  return Po.add(e), () => Po.delete(e);
}
function kd(e) {
  return Oo.add(e), () => Oo.delete(e);
}
function Cd(e) {
  Po.forEach((t) => t(e));
}
function ra(e, t, n) {
  Oo.forEach((r) => r(e, t, n));
}
function il(e) {
  let t = e;
  for (; t; ) {
    if (hi(t, !1))
      return t;
    t = t.return;
  }
  return null;
}
function al(e) {
  let t = e;
  for (; t; ) {
    if (t._debugSource)
      return t;
    t = t.return;
  }
  return null;
}
function Sd(e) {
  const t = e.lastIndexOf(":");
  if (t === -1)
    return null;
  const n = e.lastIndexOf(":", t - 1);
  if (n === -1)
    return null;
  const r = e.substring(0, n), o = Number.parseInt(e.substring(n + 1, t), 10), i = Number.parseInt(e.substring(t + 1), 10);
  return Number.isNaN(o) || Number.isNaN(i) ? null : { fileName: r, lineNumber: o, columnNumber: i };
}
function sl(e) {
  if (!e)
    return null;
  let t = e;
  for (; t && t !== document.body; ) {
    const n = t.getAttribute("data-source-path");
    if (n)
      return Sd(n);
    t = t.parentElement;
  }
  return null;
}
function oa(e) {
  if (!bi)
    return;
  const t = e.target, n = Ms(t);
  if (bn === "select-component") {
    const r = il(n);
    r ? Dt(r) : Ke();
  } else if (bn === "open-in-editor") {
    const r = sl(t);
    if (r && n)
      Dt(n, r);
    else {
      const o = al(n);
      if (o) {
        const i = o._debugSource ? {
          fileName: o._debugSource.fileName,
          lineNumber: o._debugSource.lineNumber,
          columnNumber: o._debugSource.columnNumber
        } : void 0;
        Dt(n || o, i);
      } else
        Ke();
    }
  }
}
function ia(e) {
  if (!bi)
    return;
  e.preventDefault(), e.stopPropagation();
  const t = e.target, n = Ms(t);
  if (bn === "select-component") {
    const r = il(n);
    if (r) {
      const o = Ge(r);
      Cd(o), Vt(!1), Ke();
    }
  } else if (bn === "open-in-editor") {
    const r = sl(t);
    if (r) {
      const { fileName: o, lineNumber: i, columnNumber: a } = r;
      ra(o, i, a), Vt(!1), Ke();
    } else {
      const o = al(n);
      if (o && o._debugSource) {
        const { fileName: i, lineNumber: a, columnNumber: l } = o._debugSource;
        ra(i, a, l), Vt(!1), Ke();
      }
    }
  }
}
function Vt(e, t = {}) {
  bi = e, t.mode && (bn = t.mode), e ? (window.addEventListener("mouseover", oa, !0), window.addEventListener("click", ia, !0), document.body.style.cursor = "default") : (window.removeEventListener("mouseover", oa, !0), window.removeEventListener("click", ia, !0), document.body.style.cursor = "", Ke());
}
const Td = [
  "webstorm",
  "phpstorm",
  "idea",
  "intellij",
  "pycharm",
  "rubymine",
  "goland",
  "clion",
  "rider",
  "appcode",
  "datagrip",
  "dataspell"
];
function Ed(e, t, n, r) {
  const o = e.toLowerCase();
  return Td.some((i) => o.includes(i)) ? `${e}://open?file=${encodeURIComponent(t)}&line=${n}&column=${r}` : `${e}://file/${t}:${n}:${r}`;
}
function ll() {
  const e = window.__REACT_DEVTOOLS_CONFIG__;
  if (e != null && e.launchEditor)
    return e.launchEditor;
  const t = localStorage.getItem("react_devtools_editor");
  return t || "vscode";
}
function Nd(e, t, n) {
  try {
    const r = ll(), o = Ed(r, e, t, n), i = document.createElement("a");
    return i.href = o, i.click(), i.remove(), !0;
  } catch (r) {
    return console.warn("[React DevTools] Failed to open with URL protocol:", r), !1;
  }
}
function Rd() {
  const e = window.__REACT_DEVTOOLS_CONFIG__;
  if (e != null && e.clientUrl)
    try {
      return new URL(e.clientUrl, window.location.origin).pathname.replace(/\/$/, "");
    } catch (n) {
    }
  const t = window.location.pathname;
  if (t.includes("/devtools")) {
    const n = t.match(/^(.*\/devtools)/);
    if (n)
      return n[1];
  }
  return "/__react_devtools__";
}
function Id(e) {
  return !(!e.ok || (e.headers.get("content-type") || "").includes("text/html"));
}
async function aa(e, t, n) {
  const r = encodeURIComponent(`${e}:${t}:${n}`), o = ll(), i = encodeURIComponent(o), a = Rd(), l = [
    `/__open-in-editor?file=${r}&editor=${i}`,
    // Standard Vite/Webpack path
    `${a}/api/open-in-editor?file=${r}&editor=${i}`
    // Next.js DevTools API path
  ];
  for (const s of l)
    try {
      const u = await fetch(s);
      if (Id(u))
        return;
    } catch (u) {
    }
  console.warn("[React DevTools] All server endpoints failed, trying URL protocol fallback"), Nd(e, t, n);
}
let kt = {
  recordingState: !1,
  mouseEventEnabled: !0,
  keyboardEventEnabled: !0,
  componentEventEnabled: !0,
  performanceEventEnabled: !0,
  selected: "mouse"
}, xi = 0;
const Ad = /* @__PURE__ */ new Map(), Mo = /* @__PURE__ */ new Set();
function Pd(e) {
  return Mo.add(e), () => {
    Mo.delete(e);
  };
}
function cl(e, t) {
  Mo.forEach((n) => {
    try {
      n(e, t);
    } catch (r) {
    }
  });
}
function Od() {
  return Te({}, kt);
}
function Md(e) {
  kt = Te(Te({}, kt), e);
}
function zd() {
  xi = 0, Ad.clear();
}
function Dd(e, t, n) {
  if (!kt.recordingState || !kt.mouseEventEnabled)
    return;
  const r = {
    id: ++xi,
    time: Date.now(),
    data: {
      type: e,
      x: t,
      y: n
    },
    title: e
  };
  cl("mouse", r);
}
function Fd(e, t, n) {
  if (!kt.recordingState || !kt.keyboardEventEnabled)
    return;
  const r = {
    id: ++xi,
    time: Date.now(),
    data: Te({
      type: e,
      key: t
    }, n),
    title: t,
    subtitle: e
  };
  cl("keyboard", r);
}
let sa = !1;
function $d() {
  if (typeof window == "undefined" || sa)
    return;
  sa = !0, ["mousedown", "mouseup", "click", "dblclick"].forEach((n) => {
    window.addEventListener(n, (r) => {
      Dd(n, r.clientX, r.clientY);
    }, { capture: !0, passive: !0 });
  }), ["keyup", "keydown", "keypress"].forEach((n) => {
    window.addEventListener(n, (r) => {
      Fd(n, r.key, {
        ctrlKey: r.ctrlKey,
        shiftKey: r.shiftKey,
        altKey: r.altKey,
        metaKey: r.metaKey
      });
    }, { capture: !0, passive: !0 });
  });
}
const la = "q", ca = "s", Ld = 6e4;
function ul(e) {
  return e;
}
const jd = ul, { clearTimeout: ua, setTimeout: Vd } = globalThis, Wd = Math.random.bind(Math);
function Hd(e, t) {
  const {
    post: n,
    on: r,
    off: o = () => {
    },
    eventNames: i = [],
    serialize: a = ul,
    deserialize: l = jd,
    resolver: s,
    bind: u = "rpc",
    timeout: p = Ld
  } = t;
  let d = !1;
  const f = /* @__PURE__ */ new Map();
  let h, m;
  async function v(I, N, L, $) {
    var P;
    if (d)
      throw new Error(`[birpc] rpc is closed, cannot call "${I}"`);
    const O = { m: I, a: N, t: la };
    $ && (O.o = !0);
    const ee = async (F) => n(a(F));
    if (L) {
      await ee(O);
      return;
    }
    if (h)
      try {
        await h;
      } finally {
        h = void 0;
      }
    let { promise: Z, resolve: le, reject: b } = Yd();
    const C = Gd();
    O.i = C;
    let _;
    async function R(F = O) {
      var V;
      return p >= 0 && (_ = Vd(() => {
        var re;
        try {
          if (((re = t.onTimeoutError) == null ? void 0 : re.call(m, I, N)) !== !0)
            throw new Error(`[birpc] timeout on calling "${I}"`);
        } catch (K) {
          b(K);
        }
        f.delete(C);
      }, p), typeof _ == "object" && (_ = (V = _.unref) == null ? void 0 : V.call(_))), f.set(C, { resolve: le, reject: b, timeoutId: _, method: I }), await ee(F), Z;
    }
    try {
      t.onRequest ? await t.onRequest.call(m, O, R, le) : await R();
    } catch (F) {
      if (((P = t.onGeneralError) == null ? void 0 : P.call(m, F)) !== !0)
        throw F;
      return;
    } finally {
      ua(_), f.delete(C);
    }
    return Z;
  }
  const S = {
    $call: (I, ...N) => v(I, N, !1),
    $callOptional: (I, ...N) => v(I, N, !1, !0),
    $callEvent: (I, ...N) => v(I, N, !0),
    $callRaw: (I) => v(I.method, I.args, I.event, I.optional),
    $rejectPendingCalls: E,
    get $closed() {
      return d;
    },
    get $meta() {
      return t.meta;
    },
    $close: T,
    $functions: e
  };
  m = new Proxy({}, {
    get(I, N) {
      if (Object.prototype.hasOwnProperty.call(S, N))
        return S[N];
      if (N === "then" && !i.includes("then") && !("then" in e))
        return;
      const L = (...O) => v(N, O, !0);
      if (i.includes(N))
        return L.asEvent = L, L;
      const $ = (...O) => v(N, O, !1);
      return $.asEvent = L, $;
    }
  });
  function T(I) {
    d = !0, f.forEach(({ reject: N, method: L }) => {
      var O;
      const $ = new Error(`[birpc] rpc is closed, cannot call "${L}"`);
      if (I)
        return (O = I.cause) != null || (I.cause = $), N(I);
      N($);
    }), f.clear(), o(A);
  }
  function E(I) {
    const L = Array.from(f.values()).map(({ method: $, reject: O }) => I ? I({ method: $, reject: O }) : O(new Error(`[birpc]: rejected pending call "${$}".`)));
    return f.clear(), L;
  }
  async function A(I, ...N) {
    var $, O, ee;
    let L;
    try {
      L = l(I);
    } catch (Z) {
      if ((($ = t.onGeneralError) == null ? void 0 : $.call(m, Z)) !== !0)
        throw Z;
      return;
    }
    if (L.t === la) {
      const { m: Z, a: le, o: b } = L;
      let C, _, R = await (s ? s.call(m, Z, e[Z]) : e[Z]);
      if (b && (R || (R = () => {
      })), !R)
        _ = new Error(`[birpc] function "${Z}" not found`);
      else
        try {
          C = await R.apply(u === "rpc" ? m : e, le);
        } catch (P) {
          _ = P;
        }
      if (L.i) {
        if (_ && t.onError && t.onError.call(m, _, Z, le), _ && t.onFunctionError && t.onFunctionError.call(m, _, Z, le) === !0)
          return;
        if (!_)
          try {
            await n(a({ t: ca, i: L.i, r: C }), ...N);
            return;
          } catch (P) {
            if (_ = P, ((O = t.onGeneralError) == null ? void 0 : O.call(m, P, Z, le)) !== !0)
              throw P;
          }
        try {
          await n(a({ t: ca, i: L.i, e: _ }), ...N);
        } catch (P) {
          if (((ee = t.onGeneralError) == null ? void 0 : ee.call(m, P, Z, le)) !== !0)
            throw P;
        }
      }
    } else {
      const { i: Z, r: le, e: b } = L, C = f.get(Z);
      C && (ua(C.timeoutId), b ? C.reject(b) : C.resolve(le)), f.delete(Z);
    }
  }
  return h = r(A), m;
}
const da = /* @__PURE__ */ new WeakMap();
function Ud(e, t) {
  return e.map((n) => {
    let r = da.get(n);
    return r || (r = t(n), da.set(n, r)), r;
  });
}
function Bd(e, t, n = {}) {
  const r = () => typeof t == "function" ? t() : t, o = (f = r()) => Ud(f, (h) => Hd(e, Te(Te({}, n), h)));
  function i(f, h, m, v) {
    const w = o();
    return Promise.all(w.map((g) => g.$callRaw({ method: f, args: h, event: m, optional: v })));
  }
  function a(f, ...h) {
    return i(f, h, !1);
  }
  function l(f, ...h) {
    return i(f, h, !1, !0);
  }
  function s(f, ...h) {
    return i(f, h, !0);
  }
  const u = {
    $call: a,
    $callOptional: l,
    $callEvent: s
  }, p = new Proxy({}, {
    get(f, h) {
      if (Object.prototype.hasOwnProperty.call(u, h))
        return u[h];
      const v = o().map((g) => g[h]), w = (...g) => Promise.all(v.map((y) => y(...g)));
      return w.asEvent = async (...g) => {
        await Promise.all(v.map((y) => y.asEvent(...g)));
      }, w;
    }
  });
  function d(f) {
    const h = r();
    return f == null || f(h), o(h);
  }
  return o(), {
    get clients() {
      return o();
    },
    functions: e,
    updateChannels: d,
    broadcast: p,
    /**
     * @deprecated use `broadcast`
     */
    // @ts-expect-error deprecated
    boardcast: p
  };
}
function Yd() {
  let e, t;
  return { promise: new Promise((r, o) => {
    e = r, t = o;
  }), resolve: e, reject: t };
}
const Xd = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function Gd(e = 21) {
  let t = "", n = e;
  for (; n--; )
    t += Xd[Wd() * 64 | 0];
  return t;
}
class qd {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(t, n) {
    this.keyToValue.set(t, n), this.valueToKey.set(n, t);
  }
  getByKey(t) {
    return this.keyToValue.get(t);
  }
  getByValue(t) {
    return this.valueToKey.get(t);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}
class dl {
  constructor(t) {
    this.generateIdentifier = t, this.kv = new qd();
  }
  register(t, n) {
    this.kv.getByValue(t) || (n || (n = this.generateIdentifier(t)), this.kv.set(n, t));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(t) {
    return this.kv.getByValue(t);
  }
  getValue(t) {
    return this.kv.getByKey(t);
  }
}
class Kd extends dl {
  constructor() {
    super((t) => t.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(t, n) {
    typeof n == "object" ? (n.allowProps && this.classToAllowedProps.set(t, n.allowProps), super.register(t, n.identifier)) : super.register(t, n);
  }
  getAllowedProps(t) {
    return this.classToAllowedProps.get(t);
  }
}
function Jd(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const n in e)
    e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function Zd(e, t) {
  const n = Jd(e);
  if ("find" in n)
    return n.find(t);
  const r = n;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t(i))
      return i;
  }
}
function Xt(e, t) {
  Object.entries(e).forEach(([n, r]) => t(r, n));
}
function nr(e, t) {
  return e.indexOf(t) !== -1;
}
function pa(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (t(r))
      return r;
  }
}
class Qd {
  constructor() {
    this.transfomers = {};
  }
  register(t) {
    this.transfomers[t.name] = t;
  }
  findApplicable(t) {
    return Zd(this.transfomers, (n) => n.isApplicable(t));
  }
  findByName(t) {
    return this.transfomers[t];
  }
}
const ep = (e) => Object.prototype.toString.call(e).slice(8, -1), pl = (e) => typeof e == "undefined", tp = (e) => e === null, xn = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, zo = (e) => xn(e) && Object.keys(e).length === 0, pt = (e) => Array.isArray(e), np = (e) => typeof e == "string", rp = (e) => typeof e == "number" && !isNaN(e), op = (e) => typeof e == "boolean", ip = (e) => e instanceof RegExp, _n = (e) => e instanceof Map, kn = (e) => e instanceof Set, fl = (e) => ep(e) === "Symbol", ap = (e) => e instanceof Date && !isNaN(e.valueOf()), hl = (e) => e instanceof Error, fa = (e) => typeof e == "number" && isNaN(e), sp = (e) => op(e) || tp(e) || pl(e) || rp(e) || np(e) || fl(e), lp = (e) => typeof e == "bigint", cp = (e) => e === 1 / 0 || e === -1 / 0, up = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), dp = (e) => e instanceof URL, Do = (e) => e.replace(/\\/g, "\\\\").replace(/\./g, "\\."), Xr = (e) => e.map(String).map(Do).join("."), hn = (e, t) => {
  const n = [];
  let r = "";
  for (let i = 0; i < e.length; i++) {
    let a = e.charAt(i);
    if (!t && a === "\\") {
      const u = e.charAt(i + 1);
      if (u === "\\") {
        r += "\\", i++;
        continue;
      } else if (u !== ".")
        throw Error("invalid path");
    }
    if (a === "\\" && e.charAt(i + 1) === ".") {
      r += ".", i++;
      continue;
    }
    if (a === ".") {
      n.push(r), r = "";
      continue;
    }
    r += a;
  }
  const o = r;
  return n.push(o), n;
};
function Be(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
const ml = [
  Be(pl, "undefined", () => null, () => {
  }),
  Be(lp, "bigint", (e) => e.toString(), (e) => typeof BigInt != "undefined" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Be(ap, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Be(hl, "Error", (e, t) => {
    const n = {
      name: e.name,
      message: e.message
    };
    return "cause" in e && (n.cause = e.cause), t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }, (e, t) => {
    const n = new Error(e.message, { cause: e.cause });
    return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }),
  Be(ip, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, n);
  }),
  Be(
    kn,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Be(_n, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Be((e) => fa(e) || cp(e), "number", (e) => fa(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Be((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Be(dp, "URL", (e) => e.toString(), (e) => new URL(e))
];
function Pr(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
const gl = Pr((e, t) => fl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
  const r = n.symbolRegistry.getValue(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown symbol");
  return r;
}), pp = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), vl = Pr(up, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const n = pp[t[1]];
  if (!n)
    throw new Error("Trying to deserialize unknown typed array");
  return new n(e);
});
function wl(e, t) {
  return e != null && e.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
const yl = Pr(wl, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const n = t.classRegistry.getAllowedProps(e.constructor);
  if (!n)
    return Te({}, e);
  const r = {};
  return n.forEach((o) => {
    r[o] = e[o];
  }), r;
}, (e, t, n) => {
  const r = n.classRegistry.getValue(t[1]);
  if (!r)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(r.prototype), e);
}), bl = Pr((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
  const r = n.customTransformerRegistry.findByName(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown custom value");
  return r.deserialize(e);
}), fp = [yl, gl, bl, vl], ha = (e, t) => {
  const n = pa(fp, (o) => o.isApplicable(e, t));
  if (n)
    return {
      value: n.transform(e, t),
      type: n.annotation(e, t)
    };
  const r = pa(ml, (o) => o.isApplicable(e, t));
  if (r)
    return {
      value: r.transform(e, t),
      type: r.annotation
    };
}, xl = {};
ml.forEach((e) => {
  xl[e.annotation] = e;
});
const hp = (e, t, n) => {
  if (pt(t))
    switch (t[0]) {
      case "symbol":
        return gl.untransform(e, t, n);
      case "class":
        return yl.untransform(e, t, n);
      case "custom":
        return bl.untransform(e, t, n);
      case "typed-array":
        return vl.untransform(e, t, n);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const r = xl[t];
    if (!r)
      throw new Error("Unknown transformation: " + t);
    return r.untransform(e, n);
  }
}, $t = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const n = e.keys();
  for (; t > 0; )
    n.next(), t--;
  return n.next().value;
};
function _l(e) {
  if (nr(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (nr(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (nr(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
const mp = (e, t) => {
  _l(t);
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (kn(e))
      e = $t(e, +r);
    else if (_n(e)) {
      const o = +r, i = +t[++n] == 0 ? "key" : "value", a = $t(e, o);
      switch (i) {
        case "key":
          e = a;
          break;
        case "value":
          e = e.get(a);
          break;
      }
    } else
      e = e[r];
  }
  return e;
}, Fo = (e, t, n) => {
  if (_l(t), t.length === 0)
    return n(e);
  let r = e;
  for (let i = 0; i < t.length - 1; i++) {
    const a = t[i];
    if (pt(r)) {
      const l = +a;
      r = r[l];
    } else if (xn(r))
      r = r[a];
    else if (kn(r)) {
      const l = +a;
      r = $t(r, l);
    } else if (_n(r)) {
      if (i === t.length - 2)
        break;
      const s = +a, u = +t[++i] == 0 ? "key" : "value", p = $t(r, s);
      switch (u) {
        case "key":
          r = p;
          break;
        case "value":
          r = r.get(p);
          break;
      }
    }
  }
  const o = t[t.length - 1];
  if (pt(r) ? r[+o] = n(r[+o]) : xn(r) && (r[o] = n(r[o])), kn(r)) {
    const i = $t(r, +o), a = n(i);
    i !== a && (r.delete(i), r.add(a));
  }
  if (_n(r)) {
    const i = +t[t.length - 2], a = $t(r, i);
    switch (+o == 0 ? "key" : "value") {
      case "key": {
        const s = n(a);
        r.set(s, r.get(a)), s !== a && r.delete(a);
        break;
      }
      case "value": {
        r.set(a, n(r.get(a)));
        break;
      }
    }
  }
  return e;
}, kl = (e) => e < 1;
function $o(e, t, n, r = []) {
  if (!e)
    return;
  const o = kl(n);
  if (!pt(e)) {
    Xt(e, (l, s) => $o(l, t, n, [
      ...r,
      ...hn(s, o)
    ]));
    return;
  }
  const [i, a] = e;
  a && Xt(a, (l, s) => {
    $o(l, t, n, [
      ...r,
      ...hn(s, o)
    ]);
  }), t(i, r);
}
function gp(e, t, n, r) {
  return $o(t, (o, i) => {
    e = Fo(e, i, (a) => hp(a, o, r));
  }, n), e;
}
function vp(e, t, n) {
  const r = kl(n);
  function o(i, a) {
    const l = mp(e, hn(a, r));
    i.map((s) => hn(s, r)).forEach((s) => {
      e = Fo(e, s, () => l);
    });
  }
  if (pt(t)) {
    const [i, a] = t;
    i.forEach((l) => {
      e = Fo(e, hn(l, r), () => e);
    }), a && Xt(a, o);
  } else
    Xt(t, o);
  return e;
}
const wp = (e, t) => xn(e) || pt(e) || _n(e) || kn(e) || hl(e) || wl(e, t);
function yp(e, t, n) {
  const r = n.get(e);
  r ? r.push(t) : n.set(e, [t]);
}
function bp(e, t) {
  const n = {};
  let r;
  return e.forEach((o) => {
    if (o.length <= 1)
      return;
    t || (o = o.map((l) => l.map(String)).sort((l, s) => l.length - s.length));
    const [i, ...a] = o;
    i.length === 0 ? r = a.map(Xr) : n[Xr(i)] = a.map(Xr);
  }), r ? zo(n) ? [r] : [r, n] : zo(n) ? void 0 : n;
}
const Cl = (e, t, n, r, o = [], i = [], a = /* @__PURE__ */ new Map()) => {
  var h;
  const l = sp(e);
  if (!l) {
    yp(e, o, t);
    const m = a.get(e);
    if (m)
      return r ? {
        transformedValue: null
      } : m;
  }
  if (!wp(e, n)) {
    const m = ha(e, n), v = m ? {
      transformedValue: m.value,
      annotations: [m.type]
    } : {
      transformedValue: e
    };
    return l || a.set(e, v), v;
  }
  if (nr(i, e))
    return {
      transformedValue: null
    };
  const s = ha(e, n), u = (h = s == null ? void 0 : s.value) != null ? h : e, p = pt(u) ? [] : {}, d = {};
  Xt(u, (m, v) => {
    if (v === "__proto__" || v === "constructor" || v === "prototype")
      throw new Error(`Detected property ${v}. This is a prototype pollution risk, please remove it from your object.`);
    const w = Cl(m, t, n, r, [...o, v], [...i, e], a);
    p[v] = w.transformedValue, pt(w.annotations) ? d[Do(v)] = w.annotations : xn(w.annotations) && Xt(w.annotations, (g, y) => {
      d[Do(v) + "." + y] = g;
    });
  });
  const f = zo(d) ? {
    transformedValue: p,
    annotations: s ? [s.type] : void 0
  } : {
    transformedValue: p,
    annotations: s ? [s.type, d] : d
  };
  return l || a.set(e, f), f;
};
function Sl(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function ma(e) {
  return Sl(e) === "Array";
}
function xp(e) {
  if (Sl(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function _p(e, t, n, r, o) {
  const i = {}.propertyIsEnumerable.call(r, t) ? "enumerable" : "nonenumerable";
  i === "enumerable" && (e[t] = n), o && i === "nonenumerable" && Object.defineProperty(e, t, {
    value: n,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function Lo(e, t = {}) {
  if (ma(e))
    return e.map((o) => Lo(o, t));
  if (!xp(e))
    return e;
  const n = Object.getOwnPropertyNames(e), r = Object.getOwnPropertySymbols(e);
  return [...n, ...r].reduce((o, i) => {
    if (i === "__proto__" || ma(t.props) && !t.props.includes(i))
      return o;
    const a = e[i], l = Lo(a, t);
    return _p(o, i, l, e, t.nonenumerable), o;
  }, {});
}
class X {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: t = !1 } = {}) {
    this.classRegistry = new Kd(), this.symbolRegistry = new dl((n) => {
      var r;
      return (r = n.description) != null ? r : "";
    }), this.customTransformerRegistry = new Qd(), this.allowedErrorProps = [], this.dedupe = t;
  }
  serialize(t) {
    const n = /* @__PURE__ */ new Map(), r = Cl(t, n, this, this.dedupe), o = {
      json: r.transformedValue
    };
    r.annotations && (o.meta = nn(Te({}, o.meta), {
      values: r.annotations
    }));
    const i = bp(n, this.dedupe);
    return i && (o.meta = nn(Te({}, o.meta), {
      referentialEqualities: i
    })), o.meta && (o.meta.v = 1), o;
  }
  deserialize(t, n) {
    var a, l;
    const { json: r, meta: o } = t;
    let i = n != null && n.inPlace ? r : Lo(r);
    return o != null && o.values && (i = gp(i, o.values, (a = o.v) != null ? a : 0, this)), o != null && o.referentialEqualities && (i = vp(i, o.referentialEqualities, (l = o.v) != null ? l : 0)), i;
  }
  stringify(t) {
    return JSON.stringify(this.serialize(t));
  }
  parse(t) {
    return this.deserialize(JSON.parse(t), { inPlace: !0 });
  }
  registerClass(t, n) {
    this.classRegistry.register(t, n);
  }
  registerSymbol(t, n) {
    this.symbolRegistry.register(t, n);
  }
  registerCustom(t, n) {
    this.customTransformerRegistry.register(Te({
      name: n
    }, t));
  }
  allowErrorProps(...t) {
    this.allowedErrorProps.push(...t);
  }
}
X.defaultInstance = new X();
X.serialize = X.defaultInstance.serialize.bind(X.defaultInstance);
X.deserialize = X.defaultInstance.deserialize.bind(X.defaultInstance);
X.stringify = X.defaultInstance.stringify.bind(X.defaultInstance);
X.parse = X.defaultInstance.parse.bind(X.defaultInstance);
X.registerClass = X.defaultInstance.registerClass.bind(X.defaultInstance);
X.registerSymbol = X.defaultInstance.registerSymbol.bind(X.defaultInstance);
X.registerCustom = X.defaultInstance.registerCustom.bind(X.defaultInstance);
X.allowErrorProps = X.defaultInstance.allowErrorProps.bind(X.defaultInstance);
X.serialize;
X.deserialize;
X.stringify;
X.parse;
X.registerClass;
X.registerCustom;
X.registerSymbol;
X.allowErrorProps;
const kp = "__REACT_DEVTOOLS_KIT_BROADCAST_MESSAGE__";
function Cp() {
  if (!Ar)
    return {
      post: () => {
      },
      on: () => {
      }
    };
  const e = new BroadcastChannel(kp);
  return {
    post: (t) => e.postMessage(X.stringify(t)),
    on: (t) => e.addEventListener("message", (n) => {
      try {
        t(X.parse(n.data));
      } catch (r) {
      }
    })
  };
}
const Sp = "__REACT_DEVTOOLS_KIT_BROADCAST_MESSAGE__";
function Tp() {
  if (!Ar)
    return {
      post: () => {
      },
      on: () => {
      }
    };
  const e = new BroadcastChannel(Sp);
  return {
    post: (t) => e.postMessage(X.stringify(t)),
    on: (t) => e.addEventListener("message", (n) => {
      try {
        t(X.parse(n.data));
      } catch (r) {
      }
    })
  };
}
let Tl = null;
function Ep(e) {
  Tl = e;
}
function ga() {
  return Tl;
}
const fr = "__REACT_DEVTOOLS_KIT_IFRAME_MESSAGE__";
function Np() {
  return Ar ? {
    post: (e) => window.parent.postMessage(X.stringify({
      event: fr,
      data: e
    }), "*"),
    on: (e) => window.addEventListener("message", (t) => {
      try {
        const n = X.parse(t.data);
        t.source === window.parent && n.event === fr && e(n.data);
      } catch (n) {
      }
    })
  } : {
    post: () => {
    },
    on: () => {
    }
  };
}
function Rp() {
  return Ar ? {
    post: (e) => {
      var n;
      const t = ga();
      (n = t == null ? void 0 : t.contentWindow) == null || n.postMessage(X.stringify({
        event: fr,
        data: e
      }), "*");
    },
    on: (e) => {
      window.addEventListener("message", (t) => {
        const n = ga();
        try {
          const r = X.parse(t.data);
          t.source === (n == null ? void 0 : n.contentWindow) && r.event === fr && e(r.data);
        } catch (r) {
        }
      });
    }
  } : {
    post: () => {
    },
    on: () => {
    }
  };
}
function Ip(e, t = "client") {
  return {
    iframe: {
      client: Np,
      server: Rp
    },
    broadcast: {
      client: Cp,
      server: Tp
    }
  }[e][t]();
}
var Is;
(Is = qe.__REACT_DEVTOOLS_KIT_RPC_CLIENT__) != null || (qe.__REACT_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var As;
(As = qe.__REACT_DEVTOOLS_KIT_RPC_SERVER__) != null || (qe.__REACT_DEVTOOLS_KIT_RPC_SERVER__ = null);
function Ap(e) {
  qe.__REACT_DEVTOOLS_KIT_RPC_SERVER__ = e;
}
function zt() {
  var e;
  return (e = qe.__REACT_DEVTOOLS_KIT_RPC_SERVER__) != null ? e : null;
}
function Pp(e, t = {}) {
  const { channel: n, preset: r } = t, o = r ? Ip(r, "server") : n, i = zt();
  if (i)
    i.updateChannels((a) => {
      a.push(o);
    });
  else {
    const a = Bd(e, [o], {
      timeout: -1
    });
    Ap(a);
  }
}
var Op = Object.defineProperty, Mp = Object.defineProperties, zp = Object.getOwnPropertyDescriptors, hr = Object.getOwnPropertySymbols, El = Object.prototype.hasOwnProperty, Nl = Object.prototype.propertyIsEnumerable, jo = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), va = (e, t, n) => t in e ? Op(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, D = (e, t) => {
  for (var n in t || (t = {}))
    El.call(t, n) && va(e, n, t[n]);
  if (hr)
    for (var n of hr(t))
      Nl.call(t, n) && va(e, n, t[n]);
  return e;
}, H = (e, t) => Mp(e, zp(t)), rr = (e, t) => {
  var n = {};
  for (var r in e)
    El.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && hr)
    for (var r of hr(e))
      t.indexOf(r) < 0 && Nl.call(e, r) && (n[r] = e[r]);
  return n;
}, Rl = function(e, t) {
  this[0] = e, this[1] = t;
}, Dp = (e, t, n) => {
  var r = (a, l, s, u) => {
    try {
      var p = n[a](l), d = (l = p.value) instanceof Rl, f = p.done;
      Promise.resolve(d ? l[0] : l).then((h) => d ? r(a === "return" ? a : "next", l[1] ? { done: h.done, value: h.value } : h, s, u) : s({ value: h, done: f })).catch((h) => r("throw", h, s, u));
    } catch (h) {
      u(h);
    }
  }, o = (a) => i[a] = (l) => new Promise((s, u) => r(a, l, s, u)), i = {};
  return n = n.apply(e, t), i[jo("asyncIterator")] = () => i, o("next"), o("throw"), o("return"), i;
}, Il = (e, t, n) => (t = e[jo("asyncIterator")]) ? t.call(e) : (e = e[jo("iterator")](), t = {}, n = (r, o) => (o = e[r]) && (t[r] = (i) => new Promise((a, l, s) => (i = o.call(e, i), s = i.done, Promise.resolve(i.value).then((u) => a({ value: u, done: s }), l)))), n("next"), n("return"), t), Fp = "0.3.34", _i = `bippy-${Fp}`, wa = Object.defineProperty, $p = Object.prototype.hasOwnProperty, cn = () => {
}, Al = (e) => {
  try {
    Function.prototype.toString.call(e).indexOf("^_^") > -1 && setTimeout(() => {
      throw new Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build");
    });
  } catch (t) {
  }
}, Pl = (e = Kt()) => "getFiberRoots" in e, Ol = !1, Gr = void 0, Vo = (e = Kt()) => Ol ? !0 : (typeof e.inject == "function" && (Gr = e.inject.toString()), !!(Gr != null && Gr.includes("(injected)"))), or = /* @__PURE__ */ new Set(), Wo = /* @__PURE__ */ new Set(), Lp = (e) => {
  const t = /* @__PURE__ */ new Map();
  let n = 0, r = {
    _instrumentationIsActive: !1,
    _instrumentationSource: _i,
    checkDCE: Al,
    hasUnsupportedRendererAttached: !1,
    inject(o) {
      const i = ++n;
      return t.set(i, o), Wo.add(o), r._instrumentationIsActive || (r._instrumentationIsActive = !0, or.forEach((a) => a())), i;
    },
    on: cn,
    onCommitFiberRoot: cn,
    onCommitFiberUnmount: cn,
    onPostCommitFiberRoot: cn,
    renderers: t,
    supportsFiber: !0,
    supportsFlight: !0
  };
  try {
    wa(globalThis, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
      configurable: !0,
      enumerable: !0,
      get() {
        return r;
      },
      set(a) {
        if (a && typeof a == "object") {
          const l = r.renderers;
          r = a, l.size > 0 && (l.forEach((s, u) => {
            Wo.add(s), a.renderers.set(u, s);
          }), Ho(e));
        }
      }
    });
    const o = window.hasOwnProperty;
    let i = !1;
    wa(window, "hasOwnProperty", {
      configurable: !0,
      value: function(...a) {
        try {
          if (!i && a[0] === "__REACT_DEVTOOLS_GLOBAL_HOOK__")
            return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__ = void 0, i = !0, -0;
        } catch (l) {
        }
        return o.apply(this, a);
      },
      writable: !0
    });
  } catch (o) {
    Ho(e);
  }
  return r;
}, Ho = (e) => {
  e && or.add(e);
  try {
    const t = globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!t) return;
    if (!t._instrumentationSource) {
      const n = Pl();
      if (t.checkDCE = Al, t.supportsFiber = !0, t.supportsFlight = !0, t.hasUnsupportedRendererAttached = !1, t._instrumentationSource = _i, t._instrumentationIsActive = !1, n || (t.on = cn), t.renderers.size) {
        t._instrumentationIsActive = !0, or.forEach((o) => o());
        return;
      }
      const r = t.inject;
      Vo(t) && !n && (Ol = !0, t.inject({ scheduleRefresh() {
      } }) && (t._instrumentationIsActive = !0)), t.inject = (o) => {
        const i = r(o);
        return Wo.add(o), t._instrumentationIsActive = !0, or.forEach((a) => a()), i;
      };
    }
    (t.renderers.size || t._instrumentationIsActive || Vo()) && (e == null || e());
  } catch (t) {
  }
}, jp = () => $p.call(globalThis, "__REACT_DEVTOOLS_GLOBAL_HOOK__"), Kt = (e) => jp() ? (Ho(e), globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__) : Lp(e), Vp = () => {
  var e, t;
  return !!(typeof window != "undefined" && ((e = window.document) != null && e.createElement || ((t = window.navigator) == null ? void 0 : t.product) === "ReactNative"));
}, Wp = () => {
  try {
    Vp() && Kt();
  } catch (e) {
  }
}, Or = 0, Tt = 1, Ml = 3, Hp = 5, Up = 6, Bp = 7, Yp = 9, Mr = 11, zr = 13, Mn = 14, zn = 15, Xp = 18, Gp = 22, qp = 23, Kp = 26, Jp = 27, Zp = 60111, Qp = "Symbol(react.concurrent_mode)", ef = "Symbol(react.async_mode)", ya = 1, tf = 2, nf = 4096, rf = 4, ba = 8, of = 16, af = 32, sf = 1024, lf = 8192, xa = tf | rf | of | af | nf | lf | sf, Cn = (e) => {
  switch (e.tag) {
    case Hp:
    case Kp:
    case Jp:
      return !0;
    default:
      return typeof e.type == "string";
  }
}, Jt = (e) => {
  switch (e.tag) {
    case Tt:
    case Mr:
    case Or:
    case Mn:
    case zn:
      return !0;
    default:
      return !1;
  }
}, cf = (e, t) => {
  var n;
  try {
    const r = e.dependencies, o = (n = e.alternate) == null ? void 0 : n.dependencies;
    if (!r || !o || typeof r != "object" || !("firstContext" in r) || typeof o != "object" || !("firstContext" in o)) return !1;
    let i = r.firstContext, a = o.firstContext;
    for (; i && typeof i == "object" && "memoizedValue" in i || a && typeof a == "object" && "memoizedValue" in a; ) {
      if (t(i, a) === !0) return !0;
      i = i == null ? void 0 : i.next, a = a == null ? void 0 : a.next;
    }
  } catch (r) {
  }
  return !1;
}, ki = (e) => {
  var t, n, r;
  const o = e.memoizedProps, i = ((t = e.alternate) == null ? void 0 : t.memoizedProps) || {}, a = (r = (n = e.flags) != null ? n : e.effectTag) != null ? r : 0;
  switch (e.tag) {
    case Tt:
    case Yp:
    case Mr:
    case Or:
    case Mn:
    case zn:
      return (a & ya) === ya;
    default:
      return e.alternate ? i !== o || e.alternate.memoizedState !== e.memoizedState || e.alternate.ref !== e.ref : !0;
  }
}, Ci = (e) => (e.flags & (xa | ba)) !== 0 || (e.subtreeFlags & (xa | ba)) !== 0, uf = (e) => {
  const t = [], n = [e];
  for (; n.length; ) {
    const r = n.pop();
    r && (Cn(r) && Ci(r) && ki(r) && t.push(r), r.child && n.push(r.child), r.sibling && n.push(r.sibling));
  }
  return t;
}, Si = (e) => {
  switch (e.tag) {
    case Xp:
      return !0;
    case Bp:
    case Up:
    case qp:
    case Gp:
      return !0;
    case Ml:
      return !1;
    default: {
      const t = typeof e.type == "object" && e.type !== null ? e.type.$$typeof : e.type;
      switch (typeof t == "symbol" ? t.toString() : t) {
        case Zp:
        case Qp:
        case ef:
          return !0;
        default:
          return !1;
      }
    }
  }
}, df = (e) => {
  const t = [], n = [];
  for (Cn(e) ? t.push(e) : e.child && n.push(e.child); n.length; ) {
    const r = n.pop();
    if (!r) break;
    Cn(r) ? t.push(r) : r.child && n.push(r.child), r.sibling && n.push(r.sibling);
  }
  return t;
};
function zl(e, t, n = !1) {
  return e && t(e) instanceof Promise ? Fl(e, t, n) : Dl(e, t, n);
}
var Dl = (e, t, n = !1) => {
  if (!e) return null;
  if (t(e) === !0) return e;
  let r = n ? e.return : e.child;
  for (; r; ) {
    const o = Dl(r, t, n);
    if (o) return o;
    r = n ? null : r.sibling;
  }
  return null;
}, Fl = async (e, t, n = !1) => {
  if (!e) return null;
  if (await t(e) === !0) return e;
  let r = n ? e.return : e.child;
  for (; r; ) {
    const o = await Fl(r, t, n);
    if (o) return o;
    r = n ? null : r.sibling;
  }
  return null;
}, yt = (e) => {
  var t, n, r;
  const o = (t = e == null ? void 0 : e.actualDuration) != null ? t : 0;
  let i = o, a = (n = e == null ? void 0 : e.child) != null ? n : null;
  for (; o > 0 && a != null; )
    i -= (r = a.actualDuration) != null ? r : 0, a = a.sibling;
  return {
    selfTime: i,
    totalTime: o
  };
}, Sn = (e) => {
  var t;
  return !!((t = e.updateQueue) != null && t.memoCache);
}, Et = (e) => {
  const t = e;
  return typeof t == "function" ? t : typeof t == "object" && t ? Et(t.type || t.render) : null;
}, he = (e) => {
  const t = e;
  if (typeof t == "string") return t;
  if (typeof t != "function" && !(typeof t == "object" && t)) return null;
  const n = t.displayName || t.name || null;
  if (n) return n;
  const r = Et(t);
  return r && (r.displayName || r.name) || null;
}, pf = (e) => {
  try {
    if (typeof e.version == "string" && e.bundleType > 0) return "development";
  } catch (t) {
  }
  return "production";
}, ff = () => !!Kt()._instrumentationIsActive || Pl() || Vo(), $l = 0, Gt = /* @__PURE__ */ new WeakMap(), hf = (e, t = $l++) => {
  Gt.set(e, t);
}, Pe = (e) => {
  let t = Gt.get(e);
  return !t && e.alternate && (t = Gt.get(e.alternate)), t || (t = $l++, hf(e, t)), t;
}, dt = (e, t, n) => {
  let r = t;
  for (; r != null; ) {
    if (Gt.has(r) || Pe(r), !Si(r) && ki(r) && e(r, "mount"), r.tag === zr)
      if (r.memoizedState !== null) {
        const a = r.child, l = a ? a.sibling : null;
        if (l) {
          const s = l.child;
          s !== null && dt(e, s, !1);
        }
      } else {
        let a = null;
        r.child !== null && (a = r.child.child), a !== null && dt(e, a, !1);
      }
    else r.child != null && dt(e, r.child, !0);
    r = n ? r.sibling : null;
  }
}, Uo = (e, t, n, r) => {
  var o, i, a, l, s, u;
  if (Gt.has(t) || Pe(t), !n) return;
  Gt.has(n) || Pe(n);
  const p = t.tag === zr;
  !Si(t) && ki(t) && e(t, "update");
  const f = p && n.memoizedState !== null, h = p && t.memoizedState !== null;
  if (f && h) {
    const m = (i = (o = t.child) == null ? void 0 : o.sibling) != null ? i : null, v = (l = (a = n.child) == null ? void 0 : a.sibling) != null ? l : null;
    m !== null && v !== null && Uo(e, m, v);
  } else if (f && !h) {
    const m = t.child;
    m !== null && dt(e, m, !0);
  } else if (!f && h) {
    Ll(e, n);
    const m = (u = (s = t.child) == null ? void 0 : s.sibling) != null ? u : null;
    m !== null && dt(e, m, !0);
  } else if (t.child !== n.child) {
    let m = t.child;
    for (; m; ) {
      if (m.alternate) {
        const v = m.alternate;
        Uo(e, m, v);
      } else dt(e, m, !1);
      m = m.sibling;
    }
  }
}, Bo = (e, t) => {
  (t.tag === Ml || !Si(t)) && e(t, "unmount");
}, Ll = (e, t) => {
  var n, r;
  const o = t.tag === zr && t.memoizedState !== null;
  let i = t.child;
  if (o) {
    const a = t.child, l = (n = a == null ? void 0 : a.sibling) != null ? n : null;
    i = (r = l == null ? void 0 : l.child) != null ? r : null;
  }
  for (; i !== null; )
    i.return !== null && (Bo(e, i), Ll(e, i)), i = i.sibling;
}, mf = 0, _a = /* @__PURE__ */ new WeakMap(), gf = (e, t) => {
  const n = "current" in e ? e.current : e;
  let r = _a.get(e);
  r || (r = {
    id: mf++,
    prevFiber: null
  }, _a.set(e, r));
  const { prevFiber: o } = r;
  if (!n) Bo(t, n);
  else if (o !== null) {
    const i = o && o.memoizedState != null && o.memoizedState.element != null && o.memoizedState.isDehydrated !== !0, a = n.memoizedState != null && n.memoizedState.element != null && n.memoizedState.isDehydrated !== !0;
    !i && a ? dt(t, n, !1) : i && a ? Uo(t, n, n.alternate) : i && !a && Bo(t, n);
  } else dt(t, n, !0);
  r.prevFiber = n;
}, vf = (e) => {
  var t;
  const n = Kt(e.onActive);
  n._instrumentationSource = (t = e.name) != null ? t : _i;
  const r = n.onCommitFiberRoot;
  if (e.onCommitFiberRoot) {
    const a = (l, s, u) => {
      var p;
      n.onCommitFiberRoot === a && (r == null || r(l, s, u), (p = e.onCommitFiberRoot) == null || p.call(e, l, s, u));
    };
    n.onCommitFiberRoot = a;
  }
  const o = n.onCommitFiberUnmount;
  if (e.onCommitFiberUnmount) {
    const a = (l, s) => {
      var u;
      n.onCommitFiberUnmount === a && (o == null || o(l, s), (u = e.onCommitFiberUnmount) == null || u.call(e, l, s));
    };
    n.onCommitFiberUnmount = a;
  }
  const i = n.onPostCommitFiberRoot;
  if (e.onPostCommitFiberRoot) {
    const a = (l, s) => {
      var u;
      n.onPostCommitFiberRoot === a && (i == null || i(l, s), (u = e.onPostCommitFiberRoot) == null || u.call(e, l, s));
    };
    n.onPostCommitFiberRoot = a;
  }
  return n;
}, qr = /* @__PURE__ */ new Set();
Wp();
var Dr, Y, jl, Vl, wt, ka, Wl, Hl, Ul, Ti, Yo, Xo, Bl, Tn = {}, Yl = [], wf = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Dn = Array.isArray;
function rt(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Ei(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Ct(e, t, n) {
  var r, o, i, a = {};
  for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : a[i] = t[i];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? Dr.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) a[i] === void 0 && (a[i] = e.defaultProps[i]);
  return ir(e, a, r, o, null);
}
function ir(e, t, n, r, o) {
  var i = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o == null ? ++jl : o, __i: -1, __u: 0 };
  return o == null && Y.vnode != null && Y.vnode(i), i;
}
function ne(e) {
  return e.children;
}
function $e(e, t) {
  this.props = e, this.context = t;
}
function qt(e, t) {
  if (t == null) return e.__ ? qt(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? qt(e) : null;
}
function Xl(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
      e.__e = e.__c.base = n.__e;
      break;
    }
    return Xl(e);
  }
}
function Go(e) {
  (!e.__d && (e.__d = !0) && wt.push(e) && !mr.__r++ || ka != Y.debounceRendering) && ((ka = Y.debounceRendering) || Wl)(mr);
}
function mr() {
  for (var e, t, n, r, o, i, a, l = 1; wt.length; ) wt.length > l && wt.sort(Hl), e = wt.shift(), l = wt.length, e.__d && (n = void 0, r = void 0, o = (r = (t = e).__v).__e, i = [], a = [], t.__P && ((n = rt({}, r)).__v = r.__v + 1, Y.vnode && Y.vnode(n), Ni(t.__P, n, r, t.__n, t.__P.namespaceURI, 32 & r.__u ? [o] : null, i, o == null ? qt(r) : o, !!(32 & r.__u), a), n.__v = r.__v, n.__.__k[n.__i] = n, Kl(i, n, a), r.__e = r.__ = null, n.__e != o && Xl(n)));
  mr.__r = 0;
}
function Gl(e, t, n, r, o, i, a, l, s, u, p) {
  var d, f, h, m, v, w, g, y = r && r.__k || Yl, k = t.length;
  for (s = yf(n, t, y, s, k), d = 0; d < k; d++) (h = n.__k[d]) != null && (f = h.__i == -1 ? Tn : y[h.__i] || Tn, h.__i = d, w = Ni(e, h, f, o, i, a, l, s, u, p), m = h.__e, h.ref && f.ref != h.ref && (f.ref && Ri(f.ref, null, h), p.push(h.ref, h.__c || m, h)), v == null && m != null && (v = m), (g = !!(4 & h.__u)) || f.__k === h.__k ? s = ql(h, s, e, g) : typeof h.type == "function" && w !== void 0 ? s = w : m && (s = m.nextSibling), h.__u &= -7);
  return n.__e = v, s;
}
function yf(e, t, n, r, o) {
  var i, a, l, s, u, p = n.length, d = p, f = 0;
  for (e.__k = new Array(o), i = 0; i < o; i++) (a = t[i]) != null && typeof a != "boolean" && typeof a != "function" ? (typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? a = e.__k[i] = ir(null, a, null, null, null) : Dn(a) ? a = e.__k[i] = ir(ne, { children: a }, null, null, null) : a.constructor === void 0 && a.__b > 0 ? a = e.__k[i] = ir(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : e.__k[i] = a, s = i + f, a.__ = e, a.__b = e.__b + 1, l = null, (u = a.__i = bf(a, n, s, d)) != -1 && (d--, (l = n[u]) && (l.__u |= 2)), l == null || l.__v == null ? (u == -1 && (o > p ? f-- : o < p && f++), typeof a.type != "function" && (a.__u |= 4)) : u != s && (u == s - 1 ? f-- : u == s + 1 ? f++ : (u > s ? f-- : f++, a.__u |= 4))) : e.__k[i] = null;
  if (d) for (i = 0; i < p; i++) (l = n[i]) != null && (2 & l.__u) == 0 && (l.__e == r && (r = qt(l)), Zl(l, l));
  return r;
}
function ql(e, t, n, r) {
  var o, i;
  if (typeof e.type == "function") {
    for (o = e.__k, i = 0; o && i < o.length; i++) o[i] && (o[i].__ = e, t = ql(o[i], t, n, r));
    return t;
  }
  e.__e != t && (r && (t && e.type && !t.parentNode && (t = qt(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function gr(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Dn(e) ? e.some(function(n) {
    gr(n, t);
  }) : t.push(e)), t;
}
function bf(e, t, n, r) {
  var o, i, a, l = e.key, s = e.type, u = t[n], p = u != null && (2 & u.__u) == 0;
  if (u === null && l == null || p && l == u.key && s == u.type) return n;
  if (r > (p ? 1 : 0)) {
    for (o = n - 1, i = n + 1; o >= 0 || i < t.length; ) if ((u = t[a = o >= 0 ? o-- : i++]) != null && (2 & u.__u) == 0 && l == u.key && s == u.type) return a;
  }
  return -1;
}
function Ca(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n == null ? "" : n) : e[t] = n == null ? "" : typeof n != "number" || wf.test(t) ? n : n + "px";
}
function Vn(e, t, n, r, o) {
  var i, a;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || Ca(e.style, t, "");
    if (n) for (t in n) r && n[t] == r[t] || Ca(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") i = t != (t = t.replace(Ul, "$1")), a = t.toLowerCase(), t = a in e || t == "onFocusOut" || t == "onFocusIn" ? a.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? r ? n.u = r.u : (n.u = Ti, e.addEventListener(t, i ? Xo : Yo, i)) : e.removeEventListener(t, i ? Xo : Yo, i);
  else {
    if (o == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n == null ? "" : n;
      break e;
    } catch (l) {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function Sa(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t.t == null) t.t = Ti++;
      else if (t.t < n.u) return;
      return n(Y.event ? Y.event(t) : t);
    }
  };
}
function Ni(e, t, n, r, o, i, a, l, s, u) {
  var p, d, f, h, m, v, w, g, y, k, S, T, E, A, I, N, L, $ = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (s = !!(32 & n.__u), i = [l = t.__e = n.__e]), (p = Y.__b) && p(t);
  e: if (typeof $ == "function") try {
    if (g = t.props, y = "prototype" in $ && $.prototype.render, k = (p = $.contextType) && r[p.__c], S = p ? k ? k.props.value : p.__ : r, n.__c ? w = (d = t.__c = n.__c).__ = d.__E : (y ? t.__c = d = new $(g, S) : (t.__c = d = new $e(g, S), d.constructor = $, d.render = _f), k && k.sub(d), d.state || (d.state = {}), d.__n = r, f = d.__d = !0, d.__h = [], d._sb = []), y && d.__s == null && (d.__s = d.state), y && $.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = rt({}, d.__s)), rt(d.__s, $.getDerivedStateFromProps(g, d.__s))), h = d.props, m = d.state, d.__v = t, f) y && $.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), y && d.componentDidMount != null && d.__h.push(d.componentDidMount);
    else {
      if (y && $.getDerivedStateFromProps == null && g !== h && d.componentWillReceiveProps != null && d.componentWillReceiveProps(g, S), t.__v == n.__v || !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(g, d.__s, S) === !1) {
        for (t.__v != n.__v && (d.props = g, d.state = d.__s, d.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(O) {
          O && (O.__ = t);
        }), T = 0; T < d._sb.length; T++) d.__h.push(d._sb[T]);
        d._sb = [], d.__h.length && a.push(d);
        break e;
      }
      d.componentWillUpdate != null && d.componentWillUpdate(g, d.__s, S), y && d.componentDidUpdate != null && d.__h.push(function() {
        d.componentDidUpdate(h, m, v);
      });
    }
    if (d.context = S, d.props = g, d.__P = e, d.__e = !1, E = Y.__r, A = 0, y) {
      for (d.state = d.__s, d.__d = !1, E && E(t), p = d.render(d.props, d.state, d.context), I = 0; I < d._sb.length; I++) d.__h.push(d._sb[I]);
      d._sb = [];
    } else do
      d.__d = !1, E && E(t), p = d.render(d.props, d.state, d.context), d.state = d.__s;
    while (d.__d && ++A < 25);
    d.state = d.__s, d.getChildContext != null && (r = rt(rt({}, r), d.getChildContext())), y && !f && d.getSnapshotBeforeUpdate != null && (v = d.getSnapshotBeforeUpdate(h, m)), N = p, p != null && p.type === ne && p.key == null && (N = Jl(p.props.children)), l = Gl(e, Dn(N) ? N : [N], t, n, r, o, i, a, l, s, u), d.base = t.__e, t.__u &= -161, d.__h.length && a.push(d), w && (d.__E = d.__ = null);
  } catch (O) {
    if (t.__v = null, s || i != null) if (O.then) {
      for (t.__u |= s ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; ) l = l.nextSibling;
      i[i.indexOf(l)] = null, t.__e = l;
    } else {
      for (L = i.length; L--; ) Ei(i[L]);
      qo(t);
    }
    else t.__e = n.__e, t.__k = n.__k, O.then || qo(t);
    Y.__e(O, t, n);
  }
  else i == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : l = t.__e = xf(n.__e, t, n, r, o, i, a, s, u);
  return (p = Y.diffed) && p(t), 128 & t.__u ? void 0 : l;
}
function qo(e) {
  e && e.__c && (e.__c.__e = !0), e && e.__k && e.__k.forEach(qo);
}
function Kl(e, t, n) {
  for (var r = 0; r < n.length; r++) Ri(n[r], n[++r], n[++r]);
  Y.__c && Y.__c(t, e), e.some(function(o) {
    try {
      e = o.__h, o.__h = [], e.some(function(i) {
        i.call(o);
      });
    } catch (i) {
      Y.__e(i, o.__v);
    }
  });
}
function Jl(e) {
  return typeof e != "object" || e == null || e.__b && e.__b > 0 ? e : Dn(e) ? e.map(Jl) : rt({}, e);
}
function xf(e, t, n, r, o, i, a, l, s) {
  var u, p, d, f, h, m, v, w = n.props || Tn, g = t.props, y = t.type;
  if (y == "svg" ? o = "http://www.w3.org/2000/svg" : y == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), i != null) {
    for (u = 0; u < i.length; u++) if ((h = i[u]) && "setAttribute" in h == !!y && (y ? h.localName == y : h.nodeType == 3)) {
      e = h, i[u] = null;
      break;
    }
  }
  if (e == null) {
    if (y == null) return document.createTextNode(g);
    e = document.createElementNS(o, y, g.is && g), l && (Y.__m && Y.__m(t, i), l = !1), i = null;
  }
  if (y == null) w === g || l && e.data == g || (e.data = g);
  else {
    if (i = i && Dr.call(e.childNodes), !l && i != null) for (w = {}, u = 0; u < e.attributes.length; u++) w[(h = e.attributes[u]).name] = h.value;
    for (u in w) if (h = w[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") d = h;
      else if (!(u in g)) {
        if (u == "value" && "defaultValue" in g || u == "checked" && "defaultChecked" in g) continue;
        Vn(e, u, null, h, o);
      }
    }
    for (u in g) h = g[u], u == "children" ? f = h : u == "dangerouslySetInnerHTML" ? p = h : u == "value" ? m = h : u == "checked" ? v = h : l && typeof h != "function" || w[u] === h || Vn(e, u, h, w[u], o);
    if (p) l || d && (p.__html == d.__html || p.__html == e.innerHTML) || (e.innerHTML = p.__html), t.__k = [];
    else if (d && (e.innerHTML = ""), Gl(t.type == "template" ? e.content : e, Dn(f) ? f : [f], t, n, r, y == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, i, a, i ? i[0] : n.__k && qt(n, 0), l, s), i != null) for (u = i.length; u--; ) Ei(i[u]);
    l || (u = "value", y == "progress" && m == null ? e.removeAttribute("value") : m != null && (m !== e[u] || y == "progress" && !m || y == "option" && m != w[u]) && Vn(e, u, m, w[u], o), u = "checked", v != null && v != e[u] && Vn(e, u, v, w[u], o));
  }
  return e;
}
function Ri(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), r && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (o) {
    Y.__e(o, n);
  }
}
function Zl(e, t, n) {
  var r, o;
  if (Y.unmount && Y.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || Ri(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (i) {
      Y.__e(i, t);
    }
    r.base = r.__P = null;
  }
  if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && Zl(r[o], t, n || typeof e.type != "function");
  n || Ei(e.__e), e.__c = e.__ = e.__e = void 0;
}
function _f(e, t, n) {
  return this.constructor(e, n);
}
function mn(e, t, n) {
  var r, o, i, a;
  t == document && (t = document.documentElement), Y.__ && Y.__(e, t), o = (r = !1) ? null : t.__k, i = [], a = [], Ni(t, e = t.__k = Ct(ne, null, [e]), o || Tn, Tn, t.namespaceURI, o ? null : t.firstChild ? Dr.call(t.childNodes) : null, i, o ? o.__e : t.firstChild, r, a), Kl(i, e, a);
}
function Ql(e) {
  function t(n) {
    var r, o;
    return this.getChildContext || (r = /* @__PURE__ */ new Set(), (o = {})[t.__c] = this, this.getChildContext = function() {
      return o;
    }, this.componentWillUnmount = function() {
      r = null;
    }, this.shouldComponentUpdate = function(i) {
      this.props.value != i.value && r.forEach(function(a) {
        a.__e = !0, Go(a);
      });
    }, this.sub = function(i) {
      r.add(i);
      var a = i.componentWillUnmount;
      i.componentWillUnmount = function() {
        r && r.delete(i), a && a.call(i);
      };
    }), n.children;
  }
  return t.__c = "__cC" + Bl++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, r) {
    return n.children(r);
  }).contextType = t, t;
}
Dr = Yl.slice, Y = { __e: function(e, t, n, r) {
  for (var o, i, a; t = t.__; ) if ((o = t.__c) && !o.__) try {
    if ((i = o.constructor) && i.getDerivedStateFromError != null && (o.setState(i.getDerivedStateFromError(e)), a = o.__d), o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), a = o.__d), a) return o.__E = o;
  } catch (l) {
    e = l;
  }
  throw e;
} }, jl = 0, Vl = function(e) {
  return e != null && e.constructor === void 0;
}, $e.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = rt({}, this.state), typeof e == "function" && (e = e(rt({}, n), this.props)), e && rt(n, e), e != null && this.__v && (t && this._sb.push(t), Go(this));
}, $e.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Go(this));
}, $e.prototype.render = ne, wt = [], Wl = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Hl = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, mr.__r = 0, Ul = /(PointerCapture)$|Capture$/i, Ti = 0, Yo = Sa(!1), Xo = Sa(!0), Bl = 0;
var St, ge, Kr, Ta, En = 0, ec = [], be = Y, Ea = be.__b, Na = be.__r, Ra = be.diffed, Ia = be.__c, Aa = be.unmount, Pa = be.__;
function Fn(e, t) {
  be.__h && be.__h(ge, e, En || t), En = 0;
  var n = ge.__H || (ge.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function J(e) {
  return En = 1, kf(tc, e);
}
function kf(e, t, n) {
  var r = Fn(St++, 2);
  if (r.t = e, !r.__c && (r.__ = [tc(void 0, t), function(l) {
    var s = r.__N ? r.__N[0] : r.__[0], u = r.t(s, l);
    s !== u && (r.__N = [u, r.__[1]], r.__c.setState({}));
  }], r.__c = ge, !ge.__f)) {
    var o = function(l, s, u) {
      if (!r.__c.__H) return !0;
      var p = r.__c.__H.__.filter(function(f) {
        return !!f.__c;
      });
      if (p.every(function(f) {
        return !f.__N;
      })) return !i || i.call(this, l, s, u);
      var d = r.__c.props !== l;
      return p.forEach(function(f) {
        if (f.__N) {
          var h = f.__[0];
          f.__ = f.__N, f.__N = void 0, h !== f.__[0] && (d = !0);
        }
      }), i && i.call(this, l, s, u) || d;
    };
    ge.__f = !0;
    var i = ge.shouldComponentUpdate, a = ge.componentWillUpdate;
    ge.componentWillUpdate = function(l, s, u) {
      if (this.__e) {
        var p = i;
        i = void 0, o(l, s, u), i = p;
      }
      a && a.call(this, l, s, u);
    }, ge.shouldComponentUpdate = o;
  }
  return r.__N || r.__;
}
function q(e, t) {
  var n = Fn(St++, 3);
  !be.__s && Pi(n.__H, t) && (n.__ = e, n.u = t, ge.__H.__h.push(n));
}
function Ii(e, t) {
  var n = Fn(St++, 4);
  !be.__s && Pi(n.__H, t) && (n.__ = e, n.u = t, ge.__h.push(n));
}
function j(e) {
  return En = 5, Ue(function() {
    return { current: e };
  }, []);
}
function Ue(e, t) {
  var n = Fn(St++, 7);
  return Pi(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function ye(e, t) {
  return En = 8, Ue(function() {
    return e;
  }, t);
}
function Ai(e) {
  var t = ge.context[e.__c], n = Fn(St++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(ge)), t.props.value) : e.__;
}
function Cf() {
  for (var e; e = ec.shift(); ) if (e.__P && e.__H) try {
    e.__H.__h.forEach(ar), e.__H.__h.forEach(Ko), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], be.__e(t, e.__v);
  }
}
be.__b = function(e) {
  ge = null, Ea && Ea(e);
}, be.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Pa && Pa(e, t);
}, be.__r = function(e) {
  Na && Na(e), St = 0;
  var t = (ge = e.__c).__H;
  t && (Kr === ge ? (t.__h = [], ge.__h = [], t.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.forEach(ar), t.__h.forEach(Ko), t.__h = [], St = 0)), Kr = ge;
}, be.diffed = function(e) {
  Ra && Ra(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (ec.push(t) !== 1 && Ta === be.requestAnimationFrame || ((Ta = be.requestAnimationFrame) || Sf)(Cf)), t.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), Kr = ge = null;
}, be.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.forEach(ar), n.__h = n.__h.filter(function(r) {
        return !r.__ || Ko(r);
      });
    } catch (r) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], be.__e(r, n.__v);
    }
  }), Ia && Ia(e, t);
}, be.unmount = function(e) {
  Aa && Aa(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      ar(r);
    } catch (o) {
      t = o;
    }
  }), n.__H = void 0, t && be.__e(t, n.__v));
};
var Oa = typeof requestAnimationFrame == "function";
function Sf(e) {
  var t, n = function() {
    clearTimeout(r), Oa && cancelAnimationFrame(t), setTimeout(e);
  }, r = setTimeout(n, 35);
  Oa && (t = requestAnimationFrame(n));
}
function ar(e) {
  var t = ge, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), ge = t;
}
function Ko(e) {
  var t = ge;
  e.__c = e.__(), ge = t;
}
function Pi(e, t) {
  return !e || e.length !== t.length || t.some(function(n, r) {
    return n !== e[r];
  });
}
function tc(e, t) {
  return typeof t == "function" ? t(e) : t;
}
var Tf = /* @__PURE__ */ Symbol.for("preact-signals");
function Oi() {
  if (Wt > 1) {
    Wt--;
    return;
  }
  let e, t = !1;
  for (; gn !== void 0; ) {
    let n = gn;
    for (gn = void 0, Jo++; n !== void 0; ) {
      const r = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && rc(n)) try {
        n.c();
      } catch (o) {
        t || (e = o, t = !0);
      }
      n = r;
    }
  }
  if (Jo = 0, Wt--, t) throw e;
}
var se, gn;
function Nn(e) {
  const t = se;
  se = void 0;
  try {
    return e();
  } finally {
    se = t;
  }
}
var Wt = 0, Jo = 0, vr = 0;
function nc(e) {
  if (se === void 0) return;
  let t = e.n;
  if (t === void 0 || t.t !== se)
    return t = { i: 0, S: e, p: se.s, n: void 0, t: se, e: void 0, x: void 0, r: t }, se.s !== void 0 && (se.s.n = t), se.s = t, e.n = t, 32 & se.f && e.S(t), t;
  if (t.i === -1)
    return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = se.s, t.n = void 0, se.s.n = t, se.s = t), t;
}
function Ee(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
Ee.prototype.brand = Tf;
Ee.prototype.h = function() {
  return !0;
};
Ee.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : Nn(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
};
Ee.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && Nn(() => {
      var r;
      (r = this.Z) == null || r.call(this);
    }));
  }
};
Ee.prototype.subscribe = function(e) {
  return Fr(() => {
    const t = this.value, n = se;
    se = void 0;
    try {
      e(t);
    } finally {
      se = n;
    }
  }, { name: "sub" });
};
Ee.prototype.valueOf = function() {
  return this.value;
};
Ee.prototype.toString = function() {
  return this.value + "";
};
Ee.prototype.toJSON = function() {
  return this.value;
};
Ee.prototype.peek = function() {
  const e = se;
  se = void 0;
  try {
    return this.value;
  } finally {
    se = e;
  }
};
Object.defineProperty(Ee.prototype, "value", { get() {
  const e = nc(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (Jo > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, vr++, Wt++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      Oi();
    }
  }
} });
function _e(e, t) {
  return new Ee(e, t);
}
function rc(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function oc(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function ic(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const r = n.p;
    n.i === -1 ? (n.S.U(n), r !== void 0 && (r.n = n.n), n.n !== void 0 && (n.n.p = r)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = r;
  }
  e.s = t;
}
function Nt(e, t) {
  Ee.call(this, void 0), this.x = e, this.s = void 0, this.g = vr - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
Nt.prototype = new Ee();
Nt.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === vr)) return !0;
  if (this.g = vr, this.f |= 1, this.i > 0 && !rc(this))
    return this.f &= -2, !0;
  const e = se;
  try {
    oc(this), se = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return se = e, ic(this), this.f &= -2, !0;
};
Nt.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  Ee.prototype.S.call(this, e);
};
Nt.prototype.U = function(e) {
  if (this.t !== void 0 && (Ee.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
};
Nt.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
};
Object.defineProperty(Nt.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = nc(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function Rt(e, t) {
  return new Nt(e, t);
}
function ac(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Wt++;
    const n = se;
    se = void 0;
    try {
      t();
    } catch (r) {
      throw e.f &= -2, e.f |= 8, Mi(e), r;
    } finally {
      se = n, Oi();
    }
  }
}
function Mi(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, ac(e);
}
function Ef(e) {
  if (se !== this) throw new Error("Out-of-order effect");
  ic(this), se = e, this.f &= -2, 8 & this.f && Mi(this), Oi();
}
function Zt(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
Zt.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
};
Zt.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ac(this), oc(this), Wt++;
  const e = se;
  return se = this, Ef.bind(this, e);
};
Zt.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = gn, gn = this);
};
Zt.prototype.d = function() {
  this.f |= 8, 1 & this.f || Mi(this);
};
Zt.prototype.dispose = function() {
  this.d();
};
function Fr(e, t) {
  const n = new Zt(e, t);
  try {
    n.c();
  } catch (o) {
    throw n.d(), o;
  }
  const r = n.d.bind(n);
  return r[Symbol.dispose] = r, r;
}
function Qt(e, t) {
  Y[e] = t.bind(null, Y[e] || (() => {
  }));
}
var Jr;
function wr(e) {
  Jr && Jr(), Jr = e && e.S();
}
function sc({ data: e }) {
  const t = Rf(e);
  t.value = e;
  const n = Ue(() => {
    let r = this.__v;
    for (; r = r.__; ) if (r.__c) {
      r.__c.__$f |= 4;
      break;
    }
    return this.__$u.c = () => {
      var o;
      const i = this.__$u.S(), a = n.value;
      i(), Vl(a) || ((o = this.base) == null ? void 0 : o.nodeType) !== 3 ? (this.__$f |= 1, this.setState({})) : this.base.data = a;
    }, Rt(() => {
      let o = t.value.value;
      return o === 0 ? 0 : o === !0 ? "" : o || "";
    });
  }, []);
  return n.value;
}
sc.displayName = "_st";
Object.defineProperties(Ee.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: sc }, props: { configurable: !0, get() {
  return { data: this };
} }, __b: { configurable: !0, value: 1 } });
Qt("__b", (e, t) => {
  if (typeof t.type == "string") {
    let n, r = t.props;
    for (let o in r) {
      if (o === "children") continue;
      let i = r[o];
      i instanceof Ee && (n || (t.__np = n = {}), n[o] = i, r[o] = i.peek());
    }
  }
  e(t);
});
Qt("__r", (e, t) => {
  wr();
  let n, r = t.__c;
  r && (r.__$f &= -2, n = r.__$u, n === void 0 && (r.__$u = n = (function(o) {
    let i;
    return Fr(function() {
      i = this;
    }), i.c = () => {
      r.__$f |= 1, r.setState({});
    }, i;
  })())), wr(n), e(t);
});
Qt("__e", (e, t, n, r) => {
  wr(), e(t, n, r);
});
Qt("diffed", (e, t) => {
  wr();
  let n;
  if (typeof t.type == "string" && (n = t.__e)) {
    let r = t.__np, o = t.props;
    if (r) {
      let i = n.U;
      if (i) for (let a in i) {
        let l = i[a];
        l !== void 0 && !(a in r) && (l.d(), i[a] = void 0);
      }
      else
        i = {}, n.U = i;
      for (let a in r) {
        let l = i[a], s = r[a];
        l === void 0 ? (l = Nf(n, a, s, o), i[a] = l) : l.o(s, o);
      }
    }
  }
  e(t);
});
function Nf(e, t, n, r) {
  const o = t in e && e.ownerSVGElement === void 0, i = _e(n);
  return { o: (a, l) => {
    i.value = a, r = l;
  }, d: Fr(() => {
    const a = i.value.value;
    r[t] !== a && (r[t] = a, o ? e[t] = a : a ? e.setAttribute(t, a) : e.removeAttribute(t));
  }) };
}
Qt("unmount", (e, t) => {
  if (typeof t.type == "string") {
    let n = t.__e;
    if (n) {
      const r = n.U;
      if (r) {
        n.U = void 0;
        for (let o in r) {
          let i = r[o];
          i && i.d();
        }
      }
    }
  } else {
    let n = t.__c;
    if (n) {
      const r = n.__$u;
      r && (n.__$u = void 0, r.d());
    }
  }
  e(t);
});
Qt("__h", (e, t, n, r) => {
  (r < 3 || r === 9) && (t.__$f |= 2), e(t, n, r);
});
$e.prototype.shouldComponentUpdate = function(e, t) {
  const n = this.__$u, r = n && n.s !== void 0;
  for (let o in t) return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    const o = 2 & this.__$f;
    if (!(r || o || 4 & this.__$f) || 1 & this.__$f) return !0;
  } else if (!(r || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (let o in e) if (o !== "__source" && e[o] !== this.props[o]) return !0;
  for (let o in this.props) if (!(o in e)) return !0;
  return !1;
};
function Rf(e) {
  return Ue(() => _e(e), []);
}
function Rn(e) {
  const t = j(e);
  t.current = e, q(() => Fr(() => t.current()), []);
}
function lc(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Zo(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function If(e, t) {
  var n = t(), r = J({ t: { __: n, u: t } }), o = r[0].t, i = r[1];
  return Ii(function() {
    o.__ = n, o.u = t, Zr(o) && i({ t: o });
  }, [e, n, t]), q(function() {
    return Zr(o) && i({ t: o }), e(function() {
      Zr(o) && i({ t: o });
    });
  }, [e]), n;
}
function Zr(e) {
  var t, n, r = e.u, o = e.__;
  try {
    var i = r();
    return !((t = o) === (n = i) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
  } catch (a) {
    return !0;
  }
}
function Ma(e, t) {
  this.props = e, this.context = t;
}
function $r(e, t) {
  function n(o) {
    var i = this.props.ref, a = i == o.ref;
    return !a && i && (i.call ? i(null) : i.current = null), Zo(this.props, o);
  }
  function r(o) {
    return this.shouldComponentUpdate = n, Ct(e, o);
  }
  return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r.type = e, r;
}
(Ma.prototype = new $e()).isPureReactComponent = !0, Ma.prototype.shouldComponentUpdate = function(e, t) {
  return Zo(this.props, e) || Zo(this.state, t);
};
var za = Y.__b;
Y.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), za && za(e);
};
var Af = typeof Symbol != "undefined" && Symbol.for && /* @__PURE__ */ Symbol.for("react.forward_ref") || 3911;
function zi(e) {
  function t(n) {
    var r = lc({}, n);
    return delete r.ref, e(r, n.ref || null);
  }
  return t.$$typeof = Af, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Pf = Y.__e;
Y.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, i = t; i = i.__; ) if ((o = i.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  Pf(e, t, n, r);
};
var Da = Y.unmount;
function cc(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = lc({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return cc(r, t, n);
  })), e;
}
function uc(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return uc(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Qr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function dc(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function Wn() {
  this.i = null, this.l = null;
}
Y.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Da && Da(e);
}, (Qr.prototype = new $e()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = dc(r.__v), i = !1, a = function() {
    i || (i = !0, n.__R = null, o ? o(l) : l());
  };
  n.__R = a;
  var l = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var s = r.state.__a;
        r.__v.__k[0] = uc(s, s.__c.__P, s.__c.__O);
      }
      var u;
      for (r.setState({ __a: r.__b = null }); u = r.o.pop(); ) u.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(a, a);
}, Qr.prototype.componentWillUnmount = function() {
  this.o = [];
}, Qr.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = cc(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && Ct(ne, null, e.fallback);
  return o && (o.__u &= -33), [Ct(ne, null, t.__a ? null : e.children), o];
};
var Fa = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function Of(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function Mf(e) {
  var t = this, n = e.h;
  if (t.componentWillUnmount = function() {
    mn(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
    for (var r = t.__v; r !== null && !r.__m && r.__ !== null; ) r = r.__;
    t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], __k: { __m: r.__m }, contains: function() {
      return !0;
    }, insertBefore: function(o, i) {
      this.childNodes.push(o), t.h.insertBefore(o, i);
    }, removeChild: function(o) {
      this.childNodes.splice(this.childNodes.indexOf(o) >>> 1, 1), t.h.removeChild(o);
    } };
  }
  mn(Ct(Of, { context: t.context }, e.__v), t.v);
}
function zf(e, t) {
  var n = Ct(Mf, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(Wn.prototype = new $e()).__a = function(e) {
  var t = this, n = dc(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var i = function() {
      t.props.revealOrder ? (r.push(o), Fa(t, e, r)) : o();
    };
    n ? n(i) : i();
  };
}, Wn.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = gr(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, Wn.prototype.componentDidUpdate = Wn.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    Fa(e, n, t);
  });
};
var Df = typeof Symbol != "undefined" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Ff = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, $f = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Lf = /[A-Z0-9]/g, jf = typeof document != "undefined", Vf = function(e) {
  return (typeof Symbol != "undefined" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
$e.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty($e.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var $a = Y.event;
function Wf() {
}
function Hf() {
  return this.cancelBubble;
}
function Uf() {
  return this.defaultPrevented;
}
Y.event = function(e) {
  return $a && (e = $a(e)), e.persist = Wf, e.isPropagationStopped = Hf, e.isDefaultPrevented = Uf, e.nativeEvent = e;
};
var Bf = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, La = Y.vnode;
Y.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, r = t.type, o = {}, i = r.indexOf("-") === -1;
    for (var a in n) {
      var l = n[a];
      if (!(a === "value" && "defaultValue" in n && l == null || jf && a === "children" && r === "noscript" || a === "class" || a === "className")) {
        var s = a.toLowerCase();
        a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && l === !0 ? l = "" : s === "translate" && l === "no" ? l = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || r !== "input" && r !== "textarea" || Vf(n.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : $f.test(a) && (a = s) : s = a = "oninput" : i && Ff.test(a) ? a = a.replace(Lf, "-$&").toLowerCase() : l === null && (l = void 0), s === "oninput" && o[a = s] && (a = "oninputCapture"), o[a] = l;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = gr(n.children).forEach(function(u) {
      u.props.selected = o.value.indexOf(u.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = gr(n.children).forEach(function(u) {
      u.props.selected = o.multiple ? o.defaultValue.indexOf(u.props.value) != -1 : o.defaultValue == u.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", Bf)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  })(e), e.$$typeof = Df, La && La(e);
};
var ja = Y.__r;
Y.__r = function(e) {
  ja && ja(e), e.__c;
};
var Va = Y.diffed;
Y.diffed = function(e) {
  Va && Va(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
var Yf = 0;
function c(e, t, n, r, o, i) {
  t || (t = {});
  var a, l, s = t;
  if ("ref" in s) for (l in s = {}, t) l == "ref" ? a = t[l] : s[l] = t[l];
  var u = { type: e, props: s, key: n, ref: a, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Yf, __i: -1, __u: 0, __source: o, __self: i };
  if (typeof e == "function" && (a = e.defaultProps)) for (l in a) s[l] === void 0 && (s[l] = a[l]);
  return Y.vnode && Y.vnode(u), u;
}
Array.prototype.toSorted || Object.defineProperty(Array.prototype, "toSorted", {
  value: function(e) {
    return [...this].sort(e);
  },
  writable: !0,
  configurable: !0
});
function Xf(e, t) {
  return t - e;
}
function Gf(e) {
  let t = e[0].name;
  const n = e.length, r = Math.min(4, n);
  for (let o = 1; o < r; o++)
    t += `, ${e[o].name}`;
  return t;
}
function qf(e) {
  let t = e[0].time;
  for (let n = 1, r = e.length; n < r; n++)
    t += e[n].time;
  return t;
}
function Kf(e) {
  for (let t = 0, n = e.length; t < n; t++)
    if (e[t].forget)
      return !0;
  return !1;
}
var Jf = (e) => {
  let t = "";
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const { forget: l, time: s, aggregatedCount: u, name: p } = a;
    n.has(u) || n.set(u, []);
    const d = n.get(u);
    d && d.push({ name: p, forget: l, time: s != null ? s : 0 });
  }
  const r = Array.from(n.keys()).sort(Xf), o = [];
  let i = 0;
  for (const a of r) {
    const l = n.get(a);
    if (!l) continue;
    let s = Gf(l);
    const u = qf(l), p = Kf(l);
    i += u, l.length > 4 && (s += "…"), a > 1 && (s += ` × ${a}`), p && (s = `✨${s}`), o.push(s);
  }
  return t = o.join(", "), t.length ? (t.length > 40 && (t = `${t.slice(0, 40)}…`), i >= 0.01 && (t += ` (${Number(i.toFixed(2))}ms)`), t) : null;
};
function ft(e, t) {
  return e === t || e !== e && t !== t;
}
var Di = (e) => {
  const t = e.createOscillator(), n = e.createGain();
  t.connect(n), n.connect(e.destination);
  const r = {
    type: "sine",
    freq: [
      392,
      //  523.25,
      600
      //  659.25
    ],
    duration: 0.3,
    gain: 0.12
  }, o = r.freq, i = r.duration / o.length;
  o.forEach((a, l) => {
    t.frequency.setValueAtTime(
      a,
      e.currentTime + l * i
    );
  }), t.type = r.type, n.gain.setValueAtTime(r.gain, e.currentTime), n.gain.setTargetAtTime(
    0,
    e.currentTime + r.duration * 0.7,
    0.05
  ), t.start(), t.stop(e.currentTime + r.duration);
}, Zf = (e) => new Promise((t) => {
  const n = /* @__PURE__ */ new Map(), r = new IntersectionObserver((o) => {
    for (const i of o) {
      const a = i.target, l = i.boundingClientRect;
      n.set(a, l);
    }
    r.disconnect(), t(n);
  });
  for (const o of e)
    r.observe(o);
}), Qf = {
  mount: 1,
  update: 2,
  unmount: 4
  /* Unmount */
}, ve = zi(({
  size: e = 15,
  name: t,
  fill: n = "currentColor",
  stroke: r = "currentColor",
  className: o,
  externalURL: i = "",
  style: a
}, l) => {
  const s = Array.isArray(e) ? e[0] : e, u = Array.isArray(e) ? e[1] || e[0] : e, p = `${i}#${t}`;
  return /* @__PURE__ */ c(
    "svg",
    {
      ref: l,
      width: `${s}px`,
      height: `${u}px`,
      fill: n,
      stroke: r,
      className: o,
      style: H(D({}, a), {
        minWidth: `${s}px`,
        maxWidth: `${s}px`,
        minHeight: `${u}px`,
        maxHeight: `${u}px`
      }),
      children: [
        /* @__PURE__ */ c("title", { children: t }),
        /* @__PURE__ */ c("use", { href: p })
      ]
    }
  );
}), B = 24, xe = {
  width: 550,
  height: 350,
  initialHeight: 400
}, We = 240, ot = "react-scan-widget-settings-v2", sr = "react-scan-widget-collapsed-v1", It = "react-scan-widget-last-view-v1", Qe = typeof window != "undefined";
function pc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = pc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function eh() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = pc(e)) && (r && (r += " "), r += t);
  return r;
}
var Fi = "-", th = (e) => {
  const t = rh(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const l = a.split(Fi);
      return l[0] === "" && l.length !== 1 && l.shift(), fc(l, t) || nh(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const s = n[a] || [];
      return l && r[a] ? [...s, ...r[a]] : s;
    }
  };
}, fc = (e, t) => {
  var n;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], o = t.nextPart.get(r), i = o ? fc(e.slice(1), o) : void 0;
  if (i)
    return i;
  if (t.validators.length === 0)
    return;
  const a = e.join(Fi);
  return (n = t.validators.find(({
    validator: l
  }) => l(a))) == null ? void 0 : n.classGroupId;
}, Wa = /^\[(.+)\]$/, nh = (e) => {
  if (Wa.test(e)) {
    const t = Wa.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, rh = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ih(Object.entries(e.classGroups), n).forEach(([i, a]) => {
    Qo(a, r, i, t);
  }), r;
}, Qo = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : Ha(t, o);
      i.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (oh(o)) {
        Qo(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([i, a]) => {
      Qo(a, Ha(t, i), n, r);
    });
  });
}, Ha = (e, t) => {
  let n = e;
  return t.split(Fi).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, oh = (e) => e.isThemeGetter, ih = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((i) => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([a, l]) => [t + a, l])) : i);
  return [n, o];
}) : e, ah = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (i, a) => {
    n.set(i, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = n.get(i);
      if (a !== void 0)
        return a;
      if ((a = r.get(i)) !== void 0)
        return o(i, a), a;
    },
    set(i, a) {
      n.has(i) ? n.set(i, a) : o(i, a);
    }
  };
}, hc = "!", sh = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], i = t.length, a = (l) => {
    const s = [];
    let u = 0, p = 0, d;
    for (let w = 0; w < l.length; w++) {
      let g = l[w];
      if (u === 0) {
        if (g === o && (r || l.slice(w, w + i) === t)) {
          s.push(l.slice(p, w)), p = w + i;
          continue;
        }
        if (g === "/") {
          d = w;
          continue;
        }
      }
      g === "[" ? u++ : g === "]" && u--;
    }
    const f = s.length === 0 ? l : l.substring(p), h = f.startsWith(hc), m = h ? f.substring(1) : f, v = d && d > p ? d - p : void 0;
    return {
      modifiers: s,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: v
    };
  };
  return n ? (l) => n({
    className: l,
    parseClassName: a
  }) : a;
}, lh = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, ch = (e) => D({
  cache: ah(e.cacheSize),
  parseClassName: sh(e)
}, th(e)), uh = /\s+/, dh = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, i = [], a = e.trim().split(uh);
  let l = "";
  for (let s = a.length - 1; s >= 0; s -= 1) {
    const u = a[s], {
      modifiers: p,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: h
    } = n(u);
    let m = !!h, v = r(m ? f.substring(0, h) : f);
    if (!v) {
      if (!m) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (v = r(f), !v) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      m = !1;
    }
    const w = lh(p).join(":"), g = d ? w + hc : w, y = g + v;
    if (i.includes(y))
      continue;
    i.push(y);
    const k = o(v, m);
    for (let S = 0; S < k.length; ++S) {
      const T = k[S];
      i.push(g + T);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function ph() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = mc(t)) && (r && (r += " "), r += n);
  return r;
}
var mc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = mc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function fh(e, ...t) {
  let n, r, o, i = a;
  function a(s) {
    const u = t.reduce((p, d) => d(p), e());
    return n = ch(u), r = n.cache.get, o = n.cache.set, i = l, l(s);
  }
  function l(s) {
    const u = r(s);
    if (u)
      return u;
    const p = dh(s, n);
    return o(s, p), p;
  }
  return function() {
    return i(ph.apply(null, arguments));
  };
}
var pe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, gc = /^\[(?:([a-z-]+):)?(.+)\]$/i, hh = /^\d+\/\d+$/, mh = /* @__PURE__ */ new Set(["px", "full", "screen"]), gh = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, vh = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, wh = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, yh = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, bh = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, et = (e) => Ht(e) || mh.has(e) || hh.test(e), st = (e) => en(e, "length", Nh), Ht = (e) => !!e && !Number.isNaN(Number(e)), eo = (e) => en(e, "number", Ht), rn = (e) => !!e && Number.isInteger(Number(e)), xh = (e) => e.endsWith("%") && Ht(e.slice(0, -1)), G = (e) => gc.test(e), lt = (e) => gh.test(e), _h = /* @__PURE__ */ new Set(["length", "size", "percentage"]), kh = (e) => en(e, _h, vc), Ch = (e) => en(e, "position", vc), Sh = /* @__PURE__ */ new Set(["image", "url"]), Th = (e) => en(e, Sh, Ih), Eh = (e) => en(e, "", Rh), on = () => !0, en = (e, t, n) => {
  const r = gc.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Nh = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  vh.test(e) && !wh.test(e)
), vc = () => !1, Rh = (e) => yh.test(e), Ih = (e) => bh.test(e), Ah = () => {
  const e = pe("colors"), t = pe("spacing"), n = pe("blur"), r = pe("brightness"), o = pe("borderColor"), i = pe("borderRadius"), a = pe("borderSpacing"), l = pe("borderWidth"), s = pe("contrast"), u = pe("grayscale"), p = pe("hueRotate"), d = pe("invert"), f = pe("gap"), h = pe("gradientColorStops"), m = pe("gradientColorStopPositions"), v = pe("inset"), w = pe("margin"), g = pe("opacity"), y = pe("padding"), k = pe("saturate"), S = pe("scale"), T = pe("sepia"), E = pe("skew"), A = pe("space"), I = pe("translate"), N = () => ["auto", "contain", "none"], L = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", G, t], O = () => [G, t], ee = () => ["", et, st], Z = () => ["auto", Ht, G], le = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], b = () => ["solid", "dashed", "dotted", "double", "none"], C = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _ = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], R = () => ["", "0", G], P = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], F = () => [Ht, G];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [on],
      spacing: [et, st],
      blur: ["none", "", lt, G],
      brightness: F(),
      borderColor: [e],
      borderRadius: ["none", "", "full", lt, G],
      borderSpacing: O(),
      borderWidth: ee(),
      contrast: F(),
      grayscale: R(),
      hueRotate: F(),
      invert: R(),
      gap: O(),
      gradientColorStops: [e],
      gradientColorStopPositions: [xh, st],
      inset: $(),
      margin: $(),
      opacity: F(),
      padding: O(),
      saturate: F(),
      scale: F(),
      sepia: R(),
      skew: F(),
      space: O(),
      translate: O()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", G]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [lt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": P()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": P()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...le(), G]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: L()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": L()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": L()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: N()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": N()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": N()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [v]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [v]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [v]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [v]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [v]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [v]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [v]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [v]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [v]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", rn, G]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: $()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", G]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: R()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: R()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", rn, G]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [on]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", rn, G]
        }, G]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [on]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [rn, G]
        }, G]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Z()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", G]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", G]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ..._()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ..._(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [..._(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [y]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [y]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [y]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [y]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [y]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [y]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [y]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [y]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [y]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [w]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [w]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [w]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [w]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [w]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [w]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [w]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [w]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [w]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [A]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [A]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", G, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [G, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [G, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [lt]
        }, lt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [G, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [G, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [G, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [G, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", lt, st]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", eo]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [on]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", G]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ht, eo]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", et, G]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", G]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", G]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [g]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [g]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...b(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", et, st]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", et, G]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: O()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", G]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [g]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...le(), Ch]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", kh]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Th]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [m]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [i]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [i]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [i]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [i]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [i]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [i]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [i]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [i]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [i]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [i]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [i]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [i]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [g]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...b(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [g]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: b()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...b()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [et, G]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [et, st]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: ee()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [g]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [et, st]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", lt, Eh]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [on]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...C(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": C()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [s]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", lt, G]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [k]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [T]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [s]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [g]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [k]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [T]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", G]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: F()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", G]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: F()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", G]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [S]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [S]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [S]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [rn, G]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [I]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [I]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [E]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [E]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", G]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": O()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": O()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": O()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": O()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": O()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": O()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": O()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", G]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [et, st, eo]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Ph = /* @__PURE__ */ fh(Ah), x = (...e) => Ph(eh(e));
typeof navigator != "undefined" && navigator.userAgent.includes("Firefox");
var wc = (e, t) => {
  let n = 0;
  return (r) => {
    const o = Date.now();
    if (o - n >= t)
      return n = o, e(r);
  };
}, it = (e) => {
  if (!Qe) return null;
  try {
    const t = localStorage.getItem(e);
    return t ? JSON.parse(t) : null;
  } catch (t) {
    return null;
  }
}, Ae = (e, t) => {
  if (Qe)
    try {
      window.localStorage.setItem(e, JSON.stringify(t));
    } catch (n) {
    }
}, Ua = (e) => {
  if (Qe)
    try {
      window.localStorage.removeItem(e);
    } catch (t) {
    }
}, Oh = 24, Mh = 12, In = (e) => {
  if (!e)
    return {
      name: "Unknown",
      wrappers: [],
      wrapperTypes: []
    };
  const { tag: t, type: n, elementType: r } = e;
  let o = he(n);
  const i = [], a = [];
  if (Sn(e) || t === zn || t === Mn || (n == null ? void 0 : n.$$typeof) === /* @__PURE__ */ Symbol.for("react.memo") || (r == null ? void 0 : r.$$typeof) === /* @__PURE__ */ Symbol.for("react.memo")) {
    const l = Sn(e);
    a.push({
      type: "memo",
      title: l ? "This component has been auto-memoized by the React Compiler." : "Memoized component that skips re-renders if props are the same",
      compiler: l
    });
  }
  if (t === Oh && a.push({
    type: "lazy",
    title: "Lazily loaded component that supports code splitting"
  }), t === zr && a.push({
    type: "suspense",
    title: "Component that can suspend while content is loading"
  }), t === Mh && a.push({
    type: "profiler",
    title: "Component that measures rendering performance"
  }), typeof o == "string") {
    const l = /^(\w+)\((.*)\)$/;
    let s = o;
    for (; l.test(s); ) {
      const u = s.match(l);
      if (u != null && u[1] && (u != null && u[2]))
        i.unshift(u[1]), s = u[2];
      else
        break;
    }
    o = s;
  }
  return {
    name: o || "Unknown",
    wrappers: i,
    wrapperTypes: a
  };
}, Lr = /* @__PURE__ */ _e(!1), ei = /* @__PURE__ */ _e(
  null
), Ye = {
  corner: "bottom-right",
  dimensions: {
    isFullWidth: !1,
    isFullHeight: !1,
    width: xe.width,
    height: xe.height,
    position: { x: B, y: B }
  },
  lastDimensions: {
    isFullWidth: !1,
    isFullHeight: !1,
    width: xe.width,
    height: xe.height,
    position: { x: B, y: B }
  },
  componentsTree: {
    width: We
  }
}, zh = () => {
  var e, t, n, r, o;
  const i = it(ot);
  return i ? {
    corner: (e = i.corner) != null ? e : Ye.corner,
    dimensions: (t = i.dimensions) != null ? t : Ye.dimensions,
    lastDimensions: (r = (n = i.lastDimensions) != null ? n : i.dimensions) != null ? r : Ye.lastDimensions,
    componentsTree: (o = i.componentsTree) != null ? o : Ye.componentsTree
  } : (Ae(ot, {
    corner: Ye.corner,
    dimensions: Ye.dimensions,
    lastDimensions: Ye.lastDimensions,
    componentsTree: Ye.componentsTree
  }), Ye);
}, z = _e(zh()), to = () => {
  if (!Qe) return;
  const { dimensions: e } = z.value, { width: t, height: n, position: r } = e;
  z.value = H(D({}, z.value), {
    dimensions: {
      isFullWidth: t >= window.innerWidth - B * 2,
      isFullHeight: n >= window.innerHeight - B * 2,
      width: t,
      height: n,
      position: r
    }
  });
}, ue = _e({
  view: "none"
}), Ba = it(
  sr
), Oe = /* @__PURE__ */ _e(Ba != null ? Ba : null);
function Dh() {
  return !1;
}
function $i(e) {
  function t(n) {
    return this.shouldComponentUpdate = Dh, Ct(e, n);
  }
  return t.displayName = `Memo(${e.displayName || e.name})`, t.prototype.isReactComponent = !0, t._forwarded = !0, t;
}
var Fh = (e) => {
  const { count: t, getScrollElement: n, estimateSize: r, overscan: o = 5 } = e, [i, a] = J(0), [l, s] = J(0), u = j(), p = j(null), d = j(null), f = r(), h = ye((g) => {
    var y, k;
    if (!p.current) return;
    const S = (k = (y = g == null ? void 0 : g[0]) == null ? void 0 : y.contentRect.height) != null ? k : p.current.getBoundingClientRect().height;
    s(S);
  }, []), m = ye(() => {
    d.current !== null && cancelAnimationFrame(d.current), d.current = requestAnimationFrame(() => {
      h(), d.current = null;
    });
  }, [h]);
  q(() => {
    const g = n();
    if (!g) return;
    p.current = g;
    const y = () => {
      p.current && a(p.current.scrollTop);
    };
    h(), u.current || (u.current = new ResizeObserver(() => {
      m();
    })), u.current.observe(g), g.addEventListener("scroll", y, { passive: !0 });
    const k = new MutationObserver(m);
    return k.observe(g, {
      attributes: !0,
      childList: !0,
      subtree: !0
    }), () => {
      g.removeEventListener("scroll", y), u.current && u.current.disconnect(), k.disconnect(), d.current !== null && cancelAnimationFrame(d.current);
    };
  }, [n, h, m]);
  const v = Ue(() => {
    const g = Math.floor(i / f), y = Math.ceil(l / f);
    return {
      start: Math.max(0, g - o),
      end: Math.min(t, g + y + o)
    };
  }, [i, f, l, t, o]);
  return {
    virtualItems: Ue(() => {
      const g = [];
      for (let y = v.start; y < v.end; y++)
        g.push({
          key: y,
          index: y,
          start: y * f
        });
      return g;
    }, [v, f]),
    totalSize: t * f,
    scrollTop: i,
    containerHeight: l
  };
};
it("react-scann-pinned");
var $h = (e) => {
  var t;
  const n = [];
  let r = e;
  for (; r; ) {
    const o = r.elementType, i = typeof o == "function" ? o.displayName || o.name : typeof o == "string" ? o : "Unknown", a = r.index !== void 0 ? `[${r.index}]` : "";
    n.unshift(`${i}${a}`), r = (t = r.return) != null ? t : null;
  }
  return n.join("::");
}, ht = /* @__PURE__ */ new WeakMap(), Lh = (e, t) => {
  const n = t.bind(null, e);
  return document.addEventListener("scroll", n, {
    passive: !0,
    capture: !0
  }), () => {
    document.removeEventListener("scroll", n, { capture: !0 });
  };
}, jh = {
  activeFlashes: /* @__PURE__ */ new Map(),
  create(e) {
    const t = e.querySelector(
      ".react-scan-flash-overlay"
    ), n = t instanceof HTMLElement ? t : (() => {
      const o = document.createElement("div");
      o.className = "react-scan-flash-overlay", e.appendChild(o);
      const i = Lh(e, () => {
        e.querySelector(".react-scan-flash-overlay") && this.create(e);
      });
      return this.activeFlashes.set(e, {
        element: e,
        overlay: o,
        scrollCleanup: i
      }), o;
    })(), r = ht.get(n);
    r && (clearTimeout(r), ht.delete(n)), requestAnimationFrame(() => {
      n.style.transition = "none", n.style.opacity = "0.9";
      const o = setTimeout(() => {
        n.style.transition = "opacity 150ms ease-out", n.style.opacity = "0";
        const i = setTimeout(() => {
          n.parentNode && n.parentNode.removeChild(n);
          const a = this.activeFlashes.get(e);
          a != null && a.scrollCleanup && a.scrollCleanup(), this.activeFlashes.delete(e), ht.delete(n);
        }, 150);
        ht.set(n, i);
      }, 300);
      ht.set(n, o);
    });
  },
  cleanup(e) {
    const t = this.activeFlashes.get(e);
    if (t) {
      const n = ht.get(t.overlay);
      n && (clearTimeout(n), ht.delete(t.overlay)), t.overlay.parentNode && t.overlay.parentNode.removeChild(t.overlay), t.scrollCleanup && t.scrollCleanup(), this.activeFlashes.delete(e);
    }
  },
  cleanupAll() {
    for (const [, e] of this.activeFlashes)
      this.cleanup(e.element);
  }
}, Ya = 1e3, yc = {
  updates: [],
  currentFiber: null,
  totalUpdates: 0,
  windowOffset: 0,
  currentIndex: 0,
  isViewingHistory: !1,
  latestFiber: null,
  isVisible: !1,
  playbackSpeed: 1
}, Ie = _e(yc), Li = _e(0), bt = [], mt = null, Vh = () => {
  if (bt.length === 0) return;
  const e = [...bt], { updates: t, totalUpdates: n, currentIndex: r, isViewingHistory: o } = Ie.value, i = [...t];
  let a = n;
  for (const { update: p } of e)
    i.length >= Ya && i.shift(), i.push(p), a++;
  const l = Math.max(0, a - Ya);
  let s;
  o ? r === n - 1 ? s = i.length - 1 : r === 0 ? s = 0 : l === 0 ? s = r : s = r - 1 : s = i.length - 1;
  const u = e[e.length - 1];
  Ie.value = H(D({}, Ie.value), {
    latestFiber: u.fiber,
    updates: i,
    totalUpdates: a,
    windowOffset: l,
    currentIndex: s,
    isViewingHistory: o
  }), bt = bt.slice(e.length);
}, bc = {
  showTimeline: () => {
    Ie.value = H(D({}, Ie.value), {
      isVisible: !0
    });
  },
  hideTimeline: () => {
    Ie.value = H(D({}, Ie.value), {
      isVisible: !1,
      currentIndex: Ie.value.updates.length - 1
    });
  },
  updateFrame: (e, t) => {
    Ie.value = H(D({}, Ie.value), {
      currentIndex: e,
      isViewingHistory: t
    });
  },
  updatePlaybackSpeed: (e) => {
    Ie.value = H(D({}, Ie.value), {
      playbackSpeed: e
    });
  },
  addUpdate: (e, t) => {
    if (bt.push({ update: e, fiber: t }), !mt) {
      const n = () => {
        Vh(), mt = null, bt.length > 0 && (mt = setTimeout(n, 96));
      };
      mt = setTimeout(n, 96);
    }
  },
  reset: () => {
    mt && (clearTimeout(mt), mt = null), bt = [], Ie.value = yc;
  }
}, Ne = _e({
  query: "",
  matches: [],
  currentMatchIndex: -1
}), no = /* @__PURE__ */ _e(!1), xc = (e, t = 0, n = null) => e.reduce((r, o, i) => {
  var a, l;
  const s = o.element ? $h(o.fiber) : `${n}-${i}`, u = (a = o.fiber) != null && a.type ? Oc(o.fiber) : void 0, p = H(D({}, o), {
    depth: t,
    nodeId: s,
    parentId: n,
    fiber: o.fiber,
    renderData: u
  });
  return r.push(p), (l = o.children) != null && l.length && r.push(...xc(o.children, t + 1, s)), r;
}, []), Wh = (e) => e.reduce((t, n) => Math.max(t, n.depth), 0), Hh = (e, t) => {
  if (t <= 0) return 24;
  const i = Math.max(0, e - We);
  if (i < 24) return 0;
  const l = Math.min(
    i * 0.3,
    t * 24
  ) / t;
  return Math.max(0, Math.min(24, l));
}, Uh = ["memo", "forwardRef", "lazy", "suspense"], _c = (e) => {
  const t = e.match(/\[(.*?)\]/);
  if (!t) return null;
  const n = [], r = t[1].split(",");
  for (const o of r) {
    const i = o.trim().toLowerCase();
    i && n.push(i);
  }
  return n;
}, Bh = (e) => {
  if (e.length === 0) return !1;
  for (const t of e) {
    let n = !1;
    for (const r of Uh)
      if (r.toLowerCase().includes(t)) {
        n = !0;
        break;
      }
    if (!n) return !1;
  }
  return !0;
}, kc = (e, t) => {
  if (e.length === 0) return !0;
  if (!t.length) return !1;
  for (const n of e) {
    let r = !1;
    for (const o of t)
      if (o.type.toLowerCase().includes(n)) {
        r = !0;
        break;
      }
    if (!r) return !1;
  }
  return !0;
}, Yh = (e, t) => Ue(() => {
  const { query: n, matches: r } = t, o = r.some((u) => u.nodeId === e.nodeId), i = _c(n) || [], a = n ? n.replace(/\[.*?\]/, "").trim() : "";
  if (!n || !o)
    return {
      highlightedText: /* @__PURE__ */ c("span", { className: "truncate", children: e.label }),
      typeHighlight: !1
    };
  let l = !0;
  if (i.length > 0)
    if (!e.fiber)
      l = !1;
    else {
      const { wrapperTypes: u } = In(e.fiber);
      l = kc(i, u);
    }
  let s = /* @__PURE__ */ c("span", { className: "truncate", children: e.label });
  if (a)
    try {
      if (a.startsWith("/") && a.endsWith("/")) {
        const u = a.slice(1, -1), p = new RegExp(`(${u})`, "i"), d = e.label.split(p);
        s = /* @__PURE__ */ c("span", { className: "tree-node-search-highlight", children: d.map(
          (f, h) => p.test(f) ? /* @__PURE__ */ c(
            "span",
            {
              className: x("regex", {
                start: p.test(f) && h === 0,
                middle: p.test(f) && h % 2 === 1,
                end: p.test(f) && h === d.length - 1,
                "!ml-0": h === 1
              }),
              children: f
            },
            `${e.nodeId}-${f}`
          ) : f
        ) });
      } else {
        const u = e.label.toLowerCase(), p = a.toLowerCase(), d = u.indexOf(p);
        d >= 0 && (s = /* @__PURE__ */ c("span", { className: "tree-node-search-highlight", children: [
          e.label.slice(0, d),
          /* @__PURE__ */ c("span", { className: "single", children: e.label.slice(d, d + a.length) }),
          e.label.slice(d + a.length)
        ] }));
      }
    } catch (u) {
    }
  return {
    highlightedText: s,
    typeHighlight: l && i.length > 0
  };
}, [e.label, e.nodeId, e.fiber, t]), Xa = (e) => e > 0 ? e < 0.1 - Number.EPSILON ? "< 0.1" : e < 1e3 ? Number(e.toFixed(1)).toString() : `${(e / 1e3).toFixed(1)}k` : "0", Xh = ({
  node: e,
  nodeIndex: t,
  hasChildren: n,
  isCollapsed: r,
  handleTreeNodeClick: o,
  handleTreeNodeToggle: i,
  searchValue: a
}) => {
  var l, s, u;
  const p = j(null), d = j((s = (l = e.renderData) == null ? void 0 : l.renderCount) != null ? s : 0), { highlightedText: f, typeHighlight: h } = Yh(
    e,
    a
  );
  q(() => {
    var w;
    const g = (w = e.renderData) == null ? void 0 : w.renderCount, y = p.current;
    !y || !d.current || !g || d.current === g || (y.classList.remove("count-flash"), y.offsetWidth, y.classList.add("count-flash"), d.current = g);
  }, [(u = e.renderData) == null ? void 0 : u.renderCount]);
  const m = Ue(() => {
    if (!e.renderData) return null;
    const { selfTime: w, totalTime: g, renderCount: y } = e.renderData;
    return y ? /* @__PURE__ */ c(
      "span",
      {
        className: x(
          "flex items-center gap-x-0.5 ml-1.5",
          "text-[10px] text-neutral-400"
        ),
        children: /* @__PURE__ */ c(
          "span",
          {
            ref: p,
            title: `Self time: ${Xa(w)}ms
Total time: ${Xa(g)}ms`,
            className: "count-badge",
            children: [
              "×",
              y
            ]
          }
        )
      }
    ) : null;
  }, [e.renderData]), v = Ue(() => {
    if (!e.fiber) return null;
    const { wrapperTypes: w } = In(e.fiber), g = w[0];
    return /* @__PURE__ */ c(
      "span",
      {
        className: x(
          "flex items-center gap-x-1",
          "text-[10px] text-neutral-400 tracking-wide",
          "overflow-hidden"
        ),
        children: [
          g && /* @__PURE__ */ c(ne, { children: [
            /* @__PURE__ */ c(
              "span",
              {
                title: g == null ? void 0 : g.title,
                className: x(
                  "rounded py-[1px] px-1",
                  "bg-neutral-700 text-neutral-300",
                  "truncate",
                  g.type === "memo" && "bg-[#8e61e3] text-white",
                  h && "bg-yellow-300 text-black"
                ),
                children: g.type
              },
              g.type
            ),
            g.compiler && /* @__PURE__ */ c("span", { className: "text-yellow-300 ml-1", children: "✨" })
          ] }),
          w.length > 1 && `×${w.length}`,
          m
        ]
      }
    );
  }, [e.fiber, h, m]);
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      title: e.title,
      "data-index": t,
      className: x(
        "flex items-center gap-x-1",
        "pl-1 pr-2",
        "w-full h-7",
        "text-left",
        "rounded",
        "cursor-pointer select-none"
      ),
      onClick: o,
      children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            "data-index": t,
            onClick: i,
            className: x("w-6 h-6 flex items-center justify-center", "text-left"),
            children: n && /* @__PURE__ */ c(
              ve,
              {
                name: "icon-chevron-right",
                size: 12,
                className: x("transition-transform", !r && "rotate-90")
              }
            )
          }
        ),
        f,
        v
      ]
    }
  );
}, Gh = () => {
  const e = j(null), t = j(null), n = j(null), r = j(null), o = j(null), i = j(0), a = j(!1), l = j(!1), s = j(null), [u, p] = J([]), [d, f] = J(/* @__PURE__ */ new Set()), [h, m] = J(
    void 0
  ), [v, w] = J(Ne.value), g = Ue(() => {
    const b = [], C = u, _ = new Map(C.map((R) => [R.nodeId, R]));
    for (const R of C) {
      let P = !0, F = R;
      for (; F.parentId; ) {
        const V = _.get(F.parentId);
        if (!V) break;
        if (d.has(V.nodeId)) {
          P = !1;
          break;
        }
        F = V;
      }
      P && b.push(R);
    }
    return b;
  }, [d, u]), y = 28, { virtualItems: k, totalSize: S } = Fh({
    count: g.length,
    getScrollElement: () => e.current,
    estimateSize: () => y,
    overscan: 5
  }), T = ye(
    (b) => {
      var C;
      a.current = !0, (C = r.current) == null || C.blur(), no.value = !0;
      const { parentCompositeFiber: _ } = xt(b);
      if (!_) return;
      M.inspectState.value = {
        kind: "focused",
        focusedDomElement: b,
        fiber: _
      };
      const R = g.findIndex(
        (P) => P.element === b
      );
      if (R !== -1) {
        m(R);
        const P = R * y, F = e.current;
        if (F) {
          const V = F.clientHeight, re = F.scrollTop;
          (P < re || P + y > re + V) && F.scrollTo({
            top: Math.max(0, P - V / 2),
            behavior: "instant"
          });
        }
      }
    },
    [g]
  ), E = ye(
    (b) => {
      const C = b.currentTarget, _ = Number(C.dataset.index);
      if (Number.isNaN(_)) return;
      const R = g[_].element;
      R && T(R);
    },
    [g, T]
  ), A = ye((b) => {
    f((C) => {
      const _ = new Set(C);
      return _.has(b) ? _.delete(b) : _.add(b), _;
    });
  }, []), I = ye(
    (b) => {
      b.stopPropagation();
      const C = b.target, _ = Number(C.dataset.index);
      if (Number.isNaN(_)) return;
      const R = g[_].nodeId;
      A(R);
    },
    [g, A]
  ), N = ye(
    (b) => {
      var C, _, R, P, F;
      (C = n.current) == null || C.classList.remove("!border-red-500");
      const V = [];
      if (!b) {
        Ne.value = { query: b, matches: V, currentMatchIndex: -1 };
        return;
      }
      if (b.includes("[") && !b.includes("]") && b.length > b.indexOf("[") + 1) {
        (_ = n.current) == null || _.classList.add("!border-red-500");
        return;
      }
      const re = _c(b) || [];
      if (b.includes("[") && !Bh(re)) {
        (R = n.current) == null || R.classList.add("!border-red-500");
        return;
      }
      const K = b.replace(/\[.*?\]/, "").trim(), oe = /^\/.*\/$/.test(K);
      let me = (Q) => !1;
      if (K.startsWith("/") && !oe && K.length > 1) {
        (P = n.current) == null || P.classList.add("!border-red-500");
        return;
      }
      if (oe)
        try {
          const Q = K.slice(1, -1), ie = new RegExp(Q, "i");
          me = (de) => ie.test(de);
        } catch (Q) {
          (F = n.current) == null || F.classList.add("!border-red-500");
          return;
        }
      else if (K) {
        const Q = K.toLowerCase();
        me = (ie) => ie.toLowerCase().includes(Q);
      }
      for (const Q of u) {
        let ie = !0;
        if (K && (ie = me(Q.label)), ie && re.length > 0)
          if (!Q.fiber)
            ie = !1;
          else {
            const { wrapperTypes: de } = In(Q.fiber);
            ie = kc(re, de);
          }
        ie && V.push(Q);
      }
      if (Ne.value = {
        query: b,
        matches: V,
        currentMatchIndex: V.length > 0 ? 0 : -1
      }, V.length > 0) {
        const Q = V[0], ie = g.findIndex(
          (de) => de.nodeId === Q.nodeId
        );
        if (ie !== -1) {
          const de = ie * y, Se = e.current;
          if (Se) {
            const at = Se.clientHeight;
            Se.scrollTo({
              top: Math.max(0, de - at / 2),
              behavior: "instant"
            });
          }
        }
      }
    },
    [u, g]
  ), L = ye(
    (b) => {
      const C = b.currentTarget;
      C && N(C.value);
    },
    [N]
  ), $ = ye(
    (b) => {
      const { matches: C, currentMatchIndex: _ } = Ne.value;
      if (C.length === 0) return;
      const R = b === "next" ? (_ + 1) % C.length : (_ - 1 + C.length) % C.length;
      Ne.value = H(D({}, Ne.value), {
        currentMatchIndex: R
      });
      const P = C[R], F = g.findIndex(
        (V) => V.nodeId === P.nodeId
      );
      if (F !== -1) {
        m(F);
        const V = F * y, re = e.current;
        if (re) {
          const K = re.clientHeight;
          re.scrollTo({
            top: Math.max(0, V - K / 2),
            behavior: "instant"
          });
        }
      }
    },
    [g]
  ), O = ye((b) => {
    if (t.current && (t.current.style.width = `${b}px`), e.current) {
      e.current.style.width = `${b}px`;
      const C = Hh(b, i.current);
      e.current.style.setProperty(
        "--indentation-size",
        `${C}px`
      );
    }
  }, []), ee = ye((b) => {
    if (!s.current) return;
    const C = z.value.dimensions.width, _ = Math.floor(C - We / 2);
    s.current.classList.remove(
      "cursor-ew-resize",
      "cursor-w-resize",
      "cursor-e-resize"
    ), b <= We ? s.current.classList.add("cursor-w-resize") : b >= _ ? s.current.classList.add("cursor-e-resize") : s.current.classList.add("cursor-ew-resize");
  }, []), Z = ye(
    (b) => {
      if (b.preventDefault(), b.stopPropagation(), !e.current) return;
      e.current.style.setProperty("pointer-events", "none"), l.current = !0;
      const C = b.clientX, _ = e.current.offsetWidth, R = z.value.dimensions.width, P = Math.floor(R - We / 2);
      ee(_);
      const F = (re) => {
        const K = C - re.clientX, oe = _ + K;
        ee(oe);
        const me = Math.min(
          P,
          Math.max(We, oe)
        );
        O(me);
      }, V = () => {
        e.current && (e.current.style.removeProperty("pointer-events"), document.removeEventListener("pointermove", F), document.removeEventListener("pointerup", V), z.value = H(D({}, z.value), {
          componentsTree: H(D({}, z.value.componentsTree), {
            width: e.current.offsetWidth
          })
        }), Ae(ot, z.value), l.current = !1);
      };
      document.addEventListener("pointermove", F), document.addEventListener("pointerup", V);
    },
    [O, ee]
  );
  q(() => {
    if (!e.current) return;
    const b = e.current.offsetWidth;
    return ee(b), z.subscribe(() => {
      e.current && ee(e.current.offsetWidth);
    });
  }, [ee]);
  const le = ye(() => {
    a.current = !1;
  }, []);
  return q(() => {
    let b = !0;
    const C = (V) => {
      const re = /* @__PURE__ */ new Map(), K = [];
      for (const { element: oe, name: me, fiber: Q } of V) {
        if (!oe) continue;
        let ie = me;
        const { name: de, wrappers: Se } = In(Q);
        de && (Se.length > 0 ? ie = `${Se.join("(")}(${de})${")".repeat(Se.length)}` : ie = de), re.set(oe, {
          label: de || me,
          title: ie,
          children: [],
          element: oe,
          fiber: Q
        });
      }
      for (const { element: oe, depth: me } of V) {
        if (!oe) continue;
        const Q = re.get(oe);
        if (Q)
          if (me === 0)
            K.push(Q);
          else {
            let ie = oe.parentElement;
            for (; ie; ) {
              const de = re.get(ie);
              if (de) {
                de.children = de.children || [], de.children.push(Q);
                break;
              }
              ie = ie.parentElement;
            }
          }
      }
      return K;
    }, _ = () => {
      const V = o.current;
      if (!V) return;
      const re = hm(), K = C(re);
      if (K.length > 0) {
        const oe = xc(K), me = Wh(oe);
        if (i.current = me, O(z.value.componentsTree.width), p(oe), b) {
          b = !1;
          const Q = oe.findIndex(
            (ie) => ie.element === V
          );
          if (Q !== -1) {
            const ie = Q * y, de = e.current;
            de && setTimeout(() => {
              de.scrollTo({
                top: ie,
                behavior: "instant"
              });
            }, 96);
          }
        }
      }
    }, R = M.inspectState.subscribe((V) => {
      if (V.kind === "focused") {
        if (no.value)
          return;
        N(""), o.current = V.focusedDomElement, _();
      }
    });
    let P = 0;
    const F = Li.subscribe(() => {
      if (M.inspectState.value.kind === "focused") {
        if (cancelAnimationFrame(P), l.current) return;
        P = requestAnimationFrame(() => {
          no.value = !1, _();
        });
      }
    });
    return () => {
      R(), F(), Ne.value = {
        query: "",
        matches: [],
        currentMatchIndex: -1
      };
    };
  }, []), q(() => {
    const b = (C) => {
      if (a.current && h)
        switch (C.key) {
          case "ArrowUp": {
            if (C.preventDefault(), C.stopPropagation(), h > 0) {
              const _ = g[h - 1];
              _ != null && _.element && T(_.element);
            }
            return;
          }
          case "ArrowDown": {
            if (C.preventDefault(), C.stopPropagation(), h < g.length - 1) {
              const _ = g[h + 1];
              _ != null && _.element && T(_.element);
            }
            return;
          }
          case "ArrowLeft": {
            C.preventDefault(), C.stopPropagation();
            const _ = g[h];
            _ != null && _.nodeId && A(_.nodeId);
            return;
          }
          case "ArrowRight": {
            C.preventDefault(), C.stopPropagation();
            const _ = g[h];
            _ != null && _.nodeId && A(_.nodeId);
            return;
          }
        }
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [h, g, T, A]), q(() => Ne.subscribe(w), []), q(() => z.subscribe((C) => {
    var _;
    (_ = t.current) == null || _.style.setProperty("transition", "width 0.1s"), O(C.componentsTree.width), setTimeout(() => {
      var R;
      (R = t.current) == null || R.style.removeProperty("transition");
    }, 500);
  }), []), /* @__PURE__ */ c("div", { className: "react-scan-components-tree flex", children: [
    /* @__PURE__ */ c(
      "div",
      {
        ref: s,
        onPointerDown: Z,
        className: "relative resize-v-line",
        children: /* @__PURE__ */ c("span", { children: /* @__PURE__ */ c(ve, { name: "icon-ellipsis", size: 18 }) })
      }
    ),
    /* @__PURE__ */ c("div", { ref: t, className: "flex flex-col h-full", children: [
      /* @__PURE__ */ c("div", { className: "p-2 border-b border-[#1e1e1e]", children: /* @__PURE__ */ c(
        "div",
        {
          ref: n,
          title: `Search components by:

• Name (e.g., "Button") — Case insensitive, matches any part

• Regular Expression (e.g., "/^Button/") — Use forward slashes

• Wrapper Type (e.g., "[memo,forwardRef]"):
   - Available types: memo, forwardRef, lazy, suspense
   - Matches any part of type name (e.g., "mo" matches "memo")
   - Use commas for multiple types

• Combined Search:
   - Mix name/regex with type: "button [for]"
   - Will match components satisfying both conditions

• Navigation:
   - Enter → Next match
   - Shift + Enter → Previous match
   - Cmd/Ctrl + Enter → Select and focus match
`,
          className: x(
            "relative",
            "flex items-center gap-x-1 px-2",
            "rounded",
            "border border-transparent",
            "focus-within:border-[#454545]",
            "bg-[#1e1e1e] text-neutral-300",
            "transition-colors",
            "whitespace-nowrap",
            "overflow-hidden"
          ),
          children: [
            /* @__PURE__ */ c(ve, { name: "icon-search", size: 12, className: " text-neutral-500" }),
            /* @__PURE__ */ c("div", { className: "relative flex-1 h-7 overflow-hidden", children: /* @__PURE__ */ c(
              "input",
              {
                ref: r,
                type: "text",
                value: Ne.value.query,
                onClick: (b) => {
                  b.stopPropagation(), b.currentTarget.focus();
                },
                onPointerDown: (b) => {
                  b.stopPropagation();
                },
                onKeyDown: (b) => {
                  b.key === "Escape" && b.currentTarget.blur(), Ne.value.matches.length && (b.key === "Enter" && b.shiftKey ? $("prev") : b.key === "Enter" && (b.metaKey || b.ctrlKey ? (b.preventDefault(), b.stopPropagation(), T(
                    Ne.value.matches[Ne.value.currentMatchIndex].element
                  ), b.currentTarget.focus()) : $("next")));
                },
                onChange: L,
                className: "absolute inset-y-0 inset-x-1",
                placeholder: "Component name, /regex/, or [type]"
              }
            ) }),
            Ne.value.query ? /* @__PURE__ */ c(ne, { children: [
              /* @__PURE__ */ c("span", { className: "flex items-center gap-x-0.5 text-xs text-neutral-500", children: [
                Ne.value.currentMatchIndex + 1,
                "|",
                Ne.value.matches.length
              ] }),
              !!Ne.value.matches.length && /* @__PURE__ */ c(ne, { children: [
                /* @__PURE__ */ c(
                  "button",
                  {
                    type: "button",
                    onClick: (b) => {
                      b.stopPropagation(), $("prev");
                    },
                    className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                    children: /* @__PURE__ */ c(
                      ve,
                      {
                        name: "icon-chevron-right",
                        className: "-rotate-90",
                        size: 12
                      }
                    )
                  }
                ),
                /* @__PURE__ */ c(
                  "button",
                  {
                    type: "button",
                    onClick: (b) => {
                      b.stopPropagation(), $("next");
                    },
                    className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                    children: /* @__PURE__ */ c(
                      ve,
                      {
                        name: "icon-chevron-right",
                        className: "rotate-90",
                        size: 12
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ c(
                "button",
                {
                  type: "button",
                  onClick: (b) => {
                    b.stopPropagation(), N("");
                  },
                  className: "button rounded w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-neutral-300",
                  children: /* @__PURE__ */ c(ve, { name: "icon-close", size: 12 })
                }
              )
            ] }) : !!u.length && /* @__PURE__ */ c("span", { className: "text-xs text-neutral-500", children: u.length })
          ]
        }
      ) }),
      /* @__PURE__ */ c("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ c(
        "div",
        {
          ref: e,
          onPointerLeave: le,
          className: "tree h-full overflow-auto will-change-transform",
          children: /* @__PURE__ */ c(
            "div",
            {
              className: "relative w-full",
              style: {
                height: S
              },
              children: k.map((b) => {
                var C;
                const _ = g[b.index];
                if (!_) return null;
                const R = M.inspectState.value.kind === "focused" && _.element === M.inspectState.value.focusedDomElement, P = b.index === h;
                return /* @__PURE__ */ c(
                  "div",
                  {
                    className: x(
                      "absolute left-0 w-full overflow-hidden",
                      "text-neutral-400 hover:text-neutral-300",
                      "bg-transparent hover:bg-[#5f3f9a]/20",
                      (R || P) && "text-neutral-300 bg-[#5f3f9a]/40 hover:bg-[#5f3f9a]/40"
                    ),
                    style: {
                      top: b.start,
                      height: y
                    },
                    children: /* @__PURE__ */ c(
                      "div",
                      {
                        className: "w-full h-full",
                        style: {
                          paddingLeft: `calc(${_.depth} * var(--indentation-size))`
                        },
                        children: /* @__PURE__ */ c(
                          Xh,
                          {
                            node: _,
                            nodeIndex: b.index,
                            hasChildren: !!((C = _.children) != null && C.length),
                            isCollapsed: d.has(_.nodeId),
                            handleTreeNodeClick: E,
                            handleTreeNodeToggle: I,
                            searchValue: v
                          }
                        )
                      }
                    )
                  },
                  _.nodeId
                );
              })
            }
          )
        }
      ) })
    ] })
  ] });
}, yr = /* @__PURE__ */ $r(
  ({
    text: e,
    children: t,
    onCopy: n,
    className: r,
    iconSize: o = 14
  }) => {
    const [i, a] = J(!1);
    q(() => {
      if (i) {
        const u = setTimeout(() => a(!1), 600);
        return () => {
          clearTimeout(u);
        };
      }
    }, [i]);
    const l = ye(
      (u) => {
        u.preventDefault(), u.stopPropagation(), navigator.clipboard.writeText(e).then(
          () => {
            a(!0), n == null || n(!0, e);
          },
          () => {
            n == null || n(!1, e);
          }
        );
      },
      [e, n]
    ), s = /* @__PURE__ */ c(
      "button",
      {
        onClick: l,
        type: "button",
        className: x(
          "z-10",
          "flex items-center justify-center",
          "hover:text-dev-pink-400",
          "transition-colors duration-200 ease-in-out",
          "cursor-pointer",
          `size-[${o}px]`,
          r
        ),
        children: /* @__PURE__ */ c(
          ve,
          {
            name: `icon-${i ? "check" : "copy"}`,
            size: [o],
            className: x(i && "text-green-500")
          }
        )
      }
    );
    return t ? t({
      ClipboardIcon: s,
      onClick: l
    }) : s;
  }
), qh = ({
  length: e,
  expanded: t,
  onToggle: n,
  isNegative: r
}) => /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
  /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: n,
      className: "flex items-center p-0 opacity-50",
      children: /* @__PURE__ */ c(
        ve,
        {
          name: "icon-chevron-right",
          size: 12,
          className: x(
            "transition-[color,transform]",
            r ? "text-[#f87171]" : "text-[#4ade80]",
            t && "rotate-90"
          )
        }
      )
    }
  ),
  /* @__PURE__ */ c("span", { children: [
    "Array(",
    e,
    ")"
  ] })
] }), ti = ({
  value: e,
  path: t,
  isNegative: n
}) => {
  const [r, o] = J(!1);
  if (!(e !== null && typeof e == "object" && !(e instanceof Date)))
    return /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ c("span", { className: "text-gray-500", children: [
        t,
        ":"
      ] }),
      /* @__PURE__ */ c("span", { className: "truncate", children: kr(e) })
    ] });
  const a = Object.entries(e);
  return /* @__PURE__ */ c("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: () => o(!r),
          className: "flex items-center p-0 opacity-50",
          children: /* @__PURE__ */ c(
            ve,
            {
              name: "icon-chevron-right",
              size: 12,
              className: x(
                "transition-[color,transform]",
                n ? "text-[#f87171]" : "text-[#4ade80]",
                r && "rotate-90"
              )
            }
          )
        }
      ),
      /* @__PURE__ */ c("span", { className: "text-gray-500", children: [
        t,
        ":"
      ] }),
      !r && /* @__PURE__ */ c("span", { className: "truncate", children: e instanceof Date ? kr(e) : `{${Object.keys(e).join(", ")}}` })
    ] }),
    r && /* @__PURE__ */ c("div", { className: "pl-5 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: a.map(([l, s]) => /* @__PURE__ */ c(
      ti,
      {
        value: s,
        path: l,
        isNegative: n
      },
      l
    )) })
  ] });
}, br = ({
  value: e,
  expanded: t,
  onToggle: n,
  isNegative: r
}) => {
  const { value: o, error: i } = vm(e);
  return i ? /* @__PURE__ */ c("span", { className: "text-gray-500 font-italic", children: i }) : o !== null && typeof o == "object" && !(o instanceof Promise) ? Array.isArray(o) ? /* @__PURE__ */ c("div", { className: "flex flex-col gap-1 relative", children: [
    /* @__PURE__ */ c(
      qh,
      {
        length: o.length,
        expanded: t,
        onToggle: n,
        isNegative: r
      }
    ),
    t && /* @__PURE__ */ c("div", { className: "pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: o.map((l, s) => /* @__PURE__ */ c(
      ti,
      {
        value: l,
        path: s.toString(),
        isNegative: r
      },
      s.toString()
    )) }),
    /* @__PURE__ */ c(
      yr,
      {
        text: Za(o),
        className: "absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end",
        children: ({ ClipboardIcon: l }) => /* @__PURE__ */ c(ne, { children: l })
      }
    )
  ] }) : /* @__PURE__ */ c("div", { className: "flex items-start gap-1 relative", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: n,
        className: x("flex items-center", "p-0 mt-0.5 mr-1", "opacity-50"),
        children: /* @__PURE__ */ c(
          ve,
          {
            name: "icon-chevron-right",
            size: 12,
            className: x(
              "transition-[color,transform]",
              r ? "text-[#f87171]" : "text-[#4ade80]",
              t && "rotate-90"
            )
          }
        )
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex-1", children: t ? /* @__PURE__ */ c("div", { className: "pl-2 border-l border-[#333] mt-0.5 ml-1 flex flex-col gap-0.5", children: Object.entries(o).map(([l, s]) => /* @__PURE__ */ c(
      ti,
      {
        value: s,
        path: l,
        isNegative: r
      },
      l
    )) }) : /* @__PURE__ */ c("span", { children: kr(o) }) }),
    /* @__PURE__ */ c(
      yr,
      {
        text: Za(o),
        className: "absolute top-0.5 right-0.5 opacity-0 transition-opacity group-hover:opacity-100 self-end",
        children: ({ ClipboardIcon: l }) => /* @__PURE__ */ c(ne, { children: l })
      }
    )
  ] }) : /* @__PURE__ */ c("span", { children: kr(o) });
}, Kh = 50;
_e({
  fiber: null,
  fiberProps: { current: [], changes: /* @__PURE__ */ new Set() },
  fiberState: { current: [], changes: /* @__PURE__ */ new Set() },
  fiberContext: { current: [], changes: /* @__PURE__ */ new Set() }
});
var ni = (e) => {
  switch (e.kind) {
    case "initialized":
      return e.changes.currentValue;
    case "partially-initialized":
      return e.value;
  }
}, Ga = (e, t) => {
  for (const n of e) {
    const r = t.get(n.name);
    if (r) {
      t.set(r.name, {
        count: r.count + 1,
        currentValue: n.value,
        id: r.name,
        lastUpdated: Date.now(),
        name: r.name,
        previousValue: n.prevValue
      });
      continue;
    }
    t.set(n.name, {
      count: 1,
      currentValue: n.value,
      id: n.name,
      lastUpdated: Date.now(),
      name: n.name,
      previousValue: n.prevValue
    });
  }
}, Jh = (e, t) => {
  for (const n of e) {
    const r = t.contextChanges.get(n.contextType);
    if (r) {
      if (ft(ni(r), n.value))
        continue;
      if (r.kind === "partially-initialized") {
        t.contextChanges.set(n.contextType, {
          kind: "initialized",
          changes: {
            count: 1,
            currentValue: n.value,
            id: n.contextType.toString(),
            // come back to this why was this ever expected to be a number?
            lastUpdated: Date.now(),
            name: n.name,
            previousValue: r.value
          }
        });
        continue;
      }
      t.contextChanges.set(n.contextType, {
        kind: "initialized",
        changes: {
          count: r.changes.count + 1,
          currentValue: n.value,
          id: n.contextType.toString(),
          lastUpdated: Date.now(),
          name: n.name,
          previousValue: r.changes.currentValue
        }
      });
      continue;
    }
    t.contextChanges.set(n.contextType, {
      kind: "partially-initialized",
      id: n.contextType.toString(),
      lastUpdated: Date.now(),
      name: n.name,
      value: n.value
    });
  }
}, Zh = (e) => {
  const t = {
    contextChanges: /* @__PURE__ */ new Map(),
    propsChanges: /* @__PURE__ */ new Map(),
    stateChanges: /* @__PURE__ */ new Map()
  };
  return e.forEach((n) => {
    Jh(n.contextChanges, t), Ga(n.stateChanges, t.stateChanges), Ga(n.propsChanges, t.propsChanges);
  }), t;
}, qa = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return e.forEach((r, o) => {
    n.set(o, r);
  }), t.forEach((r, o) => {
    const i = n.get(o);
    if (!i) {
      n.set(o, r);
      return;
    }
    n.set(o, {
      count: i.count + r.count,
      currentValue: r.currentValue,
      id: r.id,
      lastUpdated: r.lastUpdated,
      name: r.name,
      previousValue: r.previousValue
    });
  }), n;
}, Qh = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return e.contextChanges.forEach((r, o) => {
    n.set(o, r);
  }), t.contextChanges.forEach((r, o) => {
    const i = n.get(o);
    if (!i) {
      n.set(o, r);
      return;
    }
    if (ni(r) !== ni(i))
      switch (i.kind) {
        case "initialized":
          switch (r.kind) {
            case "initialized": {
              n.set(o, {
                kind: "initialized",
                changes: H(D({}, r.changes), {
                  // if existing was initialized, the pre-initialization done by the collapsed queue was not necessary, so we need to increment count to account for the preInit entry
                  count: r.changes.count + i.changes.count + 1,
                  currentValue: r.changes.currentValue,
                  previousValue: r.changes.previousValue
                  // we always want to show this value, since this will be the true state transition (if you make the previousValue the last seen currentValue, u will have weird behavior with primitive state updates)
                })
              });
              return;
            }
            case "partially-initialized": {
              n.set(o, {
                kind: "initialized",
                changes: {
                  count: i.changes.count + 1,
                  currentValue: r.value,
                  id: r.id,
                  lastUpdated: r.lastUpdated,
                  name: r.name,
                  previousValue: i.changes.currentValue
                }
              });
              return;
            }
          }
        case "partially-initialized":
          switch (r.kind) {
            case "initialized": {
              n.set(o, {
                kind: "initialized",
                changes: {
                  count: r.changes.count + 1,
                  currentValue: r.changes.currentValue,
                  id: r.changes.id,
                  lastUpdated: r.changes.lastUpdated,
                  name: r.changes.name,
                  previousValue: i.value
                }
              });
              return;
            }
            case "partially-initialized": {
              n.set(o, {
                kind: "initialized",
                changes: {
                  count: 1,
                  currentValue: r.value,
                  id: r.id,
                  lastUpdated: r.lastUpdated,
                  name: r.name,
                  previousValue: i.value
                }
              });
              return;
            }
          }
      }
  }), n;
}, em = (e, t) => {
  const n = Qh(e, t), r = qa(
    e.propsChanges,
    t.propsChanges
  ), o = qa(
    e.stateChanges,
    t.stateChanges
  );
  return {
    contextChanges: n,
    propsChanges: r,
    stateChanges: o
  };
}, ri = (e) => Array.from(e.propsChanges.values()).reduce(
  (t, n) => t + n.count,
  0
) + Array.from(e.stateChanges.values()).reduce(
  (t, n) => t + n.count,
  0
) + Array.from(e.contextChanges.values()).filter(
  (t) => t.kind === "initialized"
).reduce((t, n) => t + n.changes.count, 0), tm = (e) => {
  const t = j({ queue: [] }), [n, r] = J({
    propsChanges: /* @__PURE__ */ new Map(),
    stateChanges: /* @__PURE__ */ new Map(),
    contextChanges: /* @__PURE__ */ new Map()
  }), o = M.inspectState.value.kind === "focused" ? M.inspectState.value.fiber : null, i = o ? Pe(o) : null;
  return q(() => {
    const a = setInterval(() => {
      t.current.queue.length !== 0 && (r((l) => {
        var s;
        const u = Zh(t.current.queue), p = em(l, u), d = ri(l), h = ri(p) - d;
        return (s = void 0) == null || s.call(e, h), p;
      }), t.current.queue = []);
    }, Kh);
    return () => {
      clearInterval(a);
    };
  }, [o]), q(() => {
    if (!i)
      return;
    const a = (s) => {
      var u;
      (u = t.current) == null || u.queue.push(s);
    };
    let l = M.changesListeners.get(i);
    return l || (l = [], M.changesListeners.set(i, l)), l.push(a), () => {
      var s, u;
      r({
        propsChanges: /* @__PURE__ */ new Map(),
        stateChanges: /* @__PURE__ */ new Map(),
        contextChanges: /* @__PURE__ */ new Map()
      }), t.current.queue = [], M.changesListeners.set(
        i,
        (u = (s = M.changesListeners.get(i)) == null ? void 0 : s.filter((p) => p !== a)) != null ? u : []
      );
    };
  }, [i]), q(() => () => {
    r({
      propsChanges: /* @__PURE__ */ new Map(),
      stateChanges: /* @__PURE__ */ new Map(),
      contextChanges: /* @__PURE__ */ new Map()
    }), t.current.queue = [];
  }, [i]), n;
}, xr = (e) => {
  var t;
  if (e == null) return { value: e };
  if (typeof e == "function") return { value: e };
  if (typeof e != "object") return { value: e };
  if (Bt(e))
    return { value: "Promise" };
  try {
    const n = Object.getPrototypeOf(e);
    return n === Promise.prototype || ((t = n == null ? void 0 : n.constructor) == null ? void 0 : t.name) === "Promise" ? { value: "Promise" } : { value: e };
  } catch (n) {
    return { value: null, error: "Error accessing value" };
  }
}, nm = /* @__PURE__ */ $r(() => {
  const [e, t] = J(!0), n = tm(), [r, o] = J(!1), i = ri(n) > 0;
  q(() => {
    if (!r && i) {
      const s = setTimeout(() => {
        o(!0), requestAnimationFrame(() => {
          t(!0);
        });
      }, 0);
      return () => clearTimeout(s);
    }
  }, [r, i]);
  const a = new Map(
    Array.from(n.contextChanges.entries()).filter(([, s]) => s.kind === "initialized").map(([s, u]) => [
      s,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      u.kind === "partially-initialized" ? null : u.changes
    ])
  ), l = M.inspectState.value.kind === "focused" ? M.inspectState.value.fiber : null;
  if (l)
    return /* @__PURE__ */ c(ne, { children: [
      /* @__PURE__ */ c(om, {}),
      /* @__PURE__ */ c("div", { className: "overflow-hidden h-full flex flex-col gap-y-2", children: [
        /* @__PURE__ */ c("div", { className: "flex flex-col gap-2 px-3 pt-2", children: [
          /* @__PURE__ */ c("span", { className: "text-sm font-medium text-[#888]", children: [
            "Why did",
            " ",
            /* @__PURE__ */ c("span", { className: "text-[#A855F7]", children: he(l) }),
            " ",
            "render?"
          ] }),
          !i && /* @__PURE__ */ c("div", { className: "text-sm text-[#737373] bg-[#1E1E1E] rounded-md p-4 flex flex-col gap-4", children: [
            /* @__PURE__ */ c("div", { children: "No changes detected since selecting" }),
            /* @__PURE__ */ c("div", { children: "The props, state, and context changes within your component will be reported here" })
          ] })
        ] }),
        /* @__PURE__ */ c(
          "div",
          {
            className: x(
              "flex flex-col gap-y-2 pl-3 relative overflow-y-auto h-full"
            ),
            children: [
              /* @__PURE__ */ c(
                ro,
                {
                  changes: n.propsChanges,
                  title: "Changed Props",
                  isExpanded: e
                }
              ),
              /* @__PURE__ */ c(
                ro,
                {
                  renderName: (s) => {
                    var u;
                    return rm(
                      s,
                      (u = he(Et(l))) != null ? u : "Unknown Component"
                    );
                  },
                  changes: n.stateChanges,
                  title: "Changed State",
                  isExpanded: e
                }
              ),
              /* @__PURE__ */ c(
                ro,
                {
                  changes: a,
                  title: "Changed Context",
                  isExpanded: e
                }
              )
            ]
          }
        )
      ] })
    ] });
}), rm = (e, t) => {
  if (Number.isNaN(Number(e)))
    return e;
  const n = Number.parseInt(e);
  return /* @__PURE__ */ c("span", { className: "truncate", children: [
    /* @__PURE__ */ c("span", { className: "text-white", children: [
      n,
      ((o) => {
        const i = o % 10, a = o % 100;
        if (a >= 11 && a <= 13)
          return "th";
        switch (i) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      })(n),
      " hook",
      " "
    ] }),
    /* @__PURE__ */ c("span", { style: { color: "#666" }, children: [
      "called in ",
      /* @__PURE__ */ c("i", { className: "text-[#A855F7] truncate", children: t })
    ] })
  ] });
}, om = $r(() => {
  const e = j(null), t = j(null), n = j(null), r = j({
    isPropsChanged: !1,
    isStateChanged: !1,
    isContextChanged: !1
  });
  return q(() => {
    const o = wc(() => {
      var a, l, s;
      const u = [];
      ((a = e.current) == null ? void 0 : a.dataset.flash) === "true" && u.push(e.current), ((l = t.current) == null ? void 0 : l.dataset.flash) === "true" && u.push(t.current), ((s = n.current) == null ? void 0 : s.dataset.flash) === "true" && u.push(n.current);
      for (const p of u)
        p.classList.remove("count-flash-white"), p.offsetWidth, p.classList.add("count-flash-white");
    }, 400);
    return Ie.subscribe((a) => {
      var l, s, u, p, d, f, h, m, v;
      if (!e.current || !t.current || !n.current)
        return;
      const { currentIndex: w, updates: g } = a, y = g[w];
      !y || w === 0 || (o(), r.current = {
        isPropsChanged: ((u = (s = (l = y.props) == null ? void 0 : l.changes) == null ? void 0 : s.size) != null ? u : 0) > 0,
        isStateChanged: ((f = (d = (p = y.state) == null ? void 0 : p.changes) == null ? void 0 : d.size) != null ? f : 0) > 0,
        isContextChanged: ((v = (m = (h = y.context) == null ? void 0 : h.changes) == null ? void 0 : m.size) != null ? v : 0) > 0
      }, e.current.dataset.flash !== "true" && (e.current.dataset.flash = r.current.isPropsChanged.toString()), t.current.dataset.flash !== "true" && (t.current.dataset.flash = r.current.isStateChanged.toString()), n.current.dataset.flash !== "true" && (n.current.dataset.flash = r.current.isContextChanged.toString()));
    });
  }, []), /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      className: x(
        "react-section-header",
        "overflow-hidden",
        "max-h-0",
        "transition-[max-height]"
      ),
      children: /* @__PURE__ */ c("div", { className: x("flex-1 react-scan-expandable"), children: /* @__PURE__ */ c("div", { className: "overflow-hidden", children: /* @__PURE__ */ c("div", { className: "flex items-center whitespace-nowrap", children: [
        /* @__PURE__ */ c("div", { className: "flex items-center gap-x-2", children: "What changed?" }),
        /* @__PURE__ */ c(
          "div",
          {
            className: x(
              "ml-auto",
              "change-scope",
              "transition-opacity duration-300 delay-150"
            ),
            children: [
              /* @__PURE__ */ c("div", { ref: e, children: "props" }),
              /* @__PURE__ */ c("div", { ref: t, children: "state" }),
              /* @__PURE__ */ c("div", { ref: n, children: "context" })
            ]
          }
        )
      ] }) }) })
    }
  );
}), im = (e) => e, ro = /* @__PURE__ */ $r(
  ({ title: e, changes: t, renderName: n = im }) => {
    const [r, o] = J(/* @__PURE__ */ new Set()), [i, a] = J(/* @__PURE__ */ new Set()), l = Array.from(t.entries());
    return t.size === 0 ? null : /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ c("div", { className: "text-xs text-[#888] mb-1.5", children: e }),
      /* @__PURE__ */ c("div", { className: "flex flex-col gap-2", children: l.map(([s, u]) => {
        const p = i.has(String(s)), { value: d, error: f } = xr(
          u.previousValue
        ), { value: h, error: m } = xr(
          u.currentValue
        ), v = Ec(d, h);
        return /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => {
                a((w) => {
                  const g = new Set(w);
                  return g.has(String(s)) ? g.delete(String(s)) : g.add(String(s)), g;
                });
              },
              className: "flex items-center gap-2 w-full bg-transparent border-none p-0 cursor-pointer text-white text-xs",
              children: /* @__PURE__ */ c("div", { className: "flex items-center gap-1.5 flex-1", children: [
                /* @__PURE__ */ c(
                  ve,
                  {
                    name: "icon-chevron-right",
                    size: 12,
                    className: x(
                      "text-[#666] transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      {
                        "rotate-90": p
                      }
                    )
                  }
                ),
                /* @__PURE__ */ c("div", { className: "whitespace-pre-wrap break-words text-left font-medium flex items-center gap-x-1.5", children: [
                  n(u.name),
                  /* @__PURE__ */ c(
                    cm,
                    {
                      count: u.count,
                      isFunction: typeof u.currentValue == "function",
                      showWarning: v.changes.length === 0,
                      forceFlash: !0
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: x("react-scan-expandable", {
                "react-scan-expanded": p
              }),
              children: /* @__PURE__ */ c("div", { className: "pl-3 text-xs font-mono border-l-1 border-[#333]", children: /* @__PURE__ */ c("div", { className: "flex flex-col gap-0.5", children: f || m ? /* @__PURE__ */ c(
                am,
                {
                  currError: m,
                  prevError: f
                }
              ) : v.changes.length > 0 ? /* @__PURE__ */ c(
                sm,
                {
                  change: u,
                  diff: v,
                  expandedFns: r,
                  renderName: n,
                  setExpandedFns: o,
                  title: e
                }
              ) : /* @__PURE__ */ c(
                lm,
                {
                  currValue: h,
                  entryKey: s,
                  expandedFns: r,
                  prevValue: d,
                  setExpandedFns: o
                }
              ) }) })
            }
          )
        ] }, s);
      }) })
    ] });
  }
), am = ({
  prevError: e,
  currError: t
}) => /* @__PURE__ */ c(ne, { children: [
  e && /* @__PURE__ */ c("div", { className: "text-[#f87171] bg-[#2a1515] pr-1.5 py-[3px] rounded italic", children: e }),
  t && /* @__PURE__ */ c("div", { className: "text-[#4ade80] bg-[#1a2a1a] pr-1.5 py-[3px] rounded italic mt-0.5", children: t })
] }), sm = ({
  diff: e,
  title: t,
  renderName: n,
  change: r,
  expandedFns: o,
  setExpandedFns: i
}) => e.changes.map((a, l) => {
  const { value: s, error: u } = xr(
    a.prevValue
  ), { value: p, error: d } = xr(
    a.currentValue
  ), f = typeof s == "function" || typeof p == "function";
  let h;
  return t === "Props" && (h = a.path.length > 0 ? `${n(String(r.name))}.${Le(a.path)}` : void 0), t === "State" && a.path.length > 0 && (h = `state.${Le(a.path)}`), h || (h = Le(a.path)), /* @__PURE__ */ c(
    "div",
    {
      className: x(
        "flex flex-col gap-y-1",
        l < e.changes.length - 1 && "mb-4"
      ),
      children: [
        h && /* @__PURE__ */ c("div", { className: "text-[#666] text-[10px]", children: h }),
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: x(
              "group",
              "flex items-start",
              "py-[3px] px-1.5",
              "text-left text-[#f87171] bg-[#2a1515]",
              "rounded",
              "overflow-hidden break-all",
              f && "cursor-pointer"
            ),
            onClick: f ? () => {
              const m = `${Le(a.path)}-prev`;
              i((v) => {
                const w = new Set(v);
                return w.has(m) ? w.delete(m) : w.add(m), w;
              });
            } : void 0,
            children: [
              /* @__PURE__ */ c("span", { className: "w-3 flex items-center justify-center opacity-50", children: "-" }),
              /* @__PURE__ */ c("span", { className: "flex-1 whitespace-nowrap font-mono", children: u ? /* @__PURE__ */ c("span", { className: "italic text-[#f87171]", children: u }) : f ? /* @__PURE__ */ c("div", { className: "flex gap-1 items-start flex-col", children: [
                /* @__PURE__ */ c("div", { className: "flex gap-1 items-start w-full", children: [
                  /* @__PURE__ */ c("span", { className: "flex-1 max-h-40", children: ii(
                    s,
                    o.has(`${Le(a.path)}-prev`)
                  ) }),
                  typeof s == "function" && /* @__PURE__ */ c(
                    yr,
                    {
                      text: s.toString(),
                      className: "opacity-0 transition-opacity group-hover:opacity-100",
                      children: ({ ClipboardIcon: m }) => /* @__PURE__ */ c(ne, { children: m })
                    }
                  )
                ] }),
                (s == null ? void 0 : s.toString()) === (p == null ? void 0 : p.toString()) && /* @__PURE__ */ c("div", { className: "text-[10px] text-[#666] italic", children: "Function reference changed" })
              ] }) : /* @__PURE__ */ c(
                br,
                {
                  value: s,
                  expanded: o.has(
                    `${Le(a.path)}-prev`
                  ),
                  onToggle: () => {
                    const m = `${Le(a.path)}-prev`;
                    i((v) => {
                      const w = new Set(v);
                      return w.has(m) ? w.delete(m) : w.add(m), w;
                    });
                  },
                  isNegative: !0
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: x(
              "group",
              "flex items-start",
              "py-[3px] px-1.5",
              "text-left text-[#4ade80] bg-[#1a2a1a]",
              "rounded",
              "overflow-hidden break-all",
              f && "cursor-pointer"
            ),
            onClick: f ? () => {
              const m = `${Le(a.path)}-current`;
              i((v) => {
                const w = new Set(v);
                return w.has(m) ? w.delete(m) : w.add(m), w;
              });
            } : void 0,
            children: [
              /* @__PURE__ */ c("span", { className: "w-3 flex items-center justify-center opacity-50", children: "+" }),
              /* @__PURE__ */ c("span", { className: "flex-1 whitespace-pre-wrap font-mono", children: d ? /* @__PURE__ */ c("span", { className: "italic text-[#4ade80]", children: d }) : f ? /* @__PURE__ */ c("div", { className: "flex gap-1 items-start flex-col", children: [
                /* @__PURE__ */ c("div", { className: "flex gap-1 items-start w-full", children: [
                  /* @__PURE__ */ c("span", { className: "flex-1", children: ii(
                    p,
                    o.has(`${Le(a.path)}-current`)
                  ) }),
                  typeof p == "function" && /* @__PURE__ */ c(
                    yr,
                    {
                      text: p.toString(),
                      className: "opacity-0 transition-opacity group-hover:opacity-100",
                      children: ({ ClipboardIcon: m }) => /* @__PURE__ */ c(ne, { children: m })
                    }
                  )
                ] }),
                (s == null ? void 0 : s.toString()) === (p == null ? void 0 : p.toString()) && /* @__PURE__ */ c("div", { className: "text-[10px] text-[#666] italic", children: "Function reference changed" })
              ] }) : /* @__PURE__ */ c(
                br,
                {
                  value: p,
                  expanded: o.has(
                    `${Le(a.path)}-current`
                  ),
                  onToggle: () => {
                    const m = `${Le(a.path)}-current`;
                    i((v) => {
                      const w = new Set(v);
                      return w.has(m) ? w.delete(m) : w.add(m), w;
                    });
                  },
                  isNegative: !1
                }
              ) })
            ]
          }
        )
      ]
    },
    `${h}-${r.name}-${l}`
  );
}), lm = ({
  prevValue: e,
  currValue: t,
  entryKey: n,
  expandedFns: r,
  setExpandedFns: o
}) => /* @__PURE__ */ c(ne, { children: [
  /* @__PURE__ */ c("div", { className: "group flex gap-0.5 items-start text-[#f87171] bg-[#2a1515] py-[3px] px-1.5 rounded", children: [
    /* @__PURE__ */ c("span", { className: "w-3 flex items-center justify-center opacity-50", children: "-" }),
    /* @__PURE__ */ c("span", { className: "flex-1 overflow-hidden whitespace-pre-wrap font-mono", children: /* @__PURE__ */ c(
      br,
      {
        value: e,
        expanded: r.has(`${String(n)}-prev`),
        onToggle: () => {
          const i = `${String(n)}-prev`;
          o((a) => {
            const l = new Set(a);
            return l.has(i) ? l.delete(i) : l.add(i), l;
          });
        },
        isNegative: !0
      }
    ) })
  ] }),
  /* @__PURE__ */ c("div", { className: "group flex gap-0.5 items-start text-[#4ade80] bg-[#1a2a1a] py-[3px] px-1.5 rounded mt-0.5", children: [
    /* @__PURE__ */ c("span", { className: "w-3 flex items-center justify-center opacity-50", children: "+" }),
    /* @__PURE__ */ c("span", { className: "flex-1 overflow-hidden whitespace-pre-wrap font-mono", children: /* @__PURE__ */ c(
      br,
      {
        value: t,
        expanded: r.has(`${String(n)}-current`),
        onToggle: () => {
          const i = `${String(n)}-current`;
          o((a) => {
            const l = new Set(a);
            return l.has(i) ? l.delete(i) : l.add(i), l;
          });
        },
        isNegative: !1
      }
    ) })
  ] }),
  typeof t == "object" && t !== null && /* @__PURE__ */ c("div", { className: "text-[#666] text-[10px] italic mt-1 flex items-center gap-x-1", children: [
    /* @__PURE__ */ c(
      ve,
      {
        name: "icon-triangle-alert",
        className: "text-yellow-500 mb-px",
        size: 14
      }
    ),
    /* @__PURE__ */ c("span", { children: "Reference changed but objects are structurally the same" })
  ] })
] }), cm = ({
  count: e,
  forceFlash: t,
  isFunction: n,
  showWarning: r
}) => {
  const o = j(!0), i = j(null), a = j(e);
  return q(() => {
    const l = i.current;
    !l || a.current === e || (l.classList.remove("count-flash"), l.offsetWidth, l.classList.add("count-flash"), a.current = e);
  }, [e]), q(() => {
    if (o.current) {
      o.current = !1;
      return;
    }
    if (t) {
      let l = setTimeout(() => {
        var s;
        (s = i.current) == null || s.classList.add("count-flash-white"), l = setTimeout(() => {
          var u;
          (u = i.current) == null || u.classList.remove("count-flash-white");
        }, 300);
      }, 500);
      return () => {
        clearTimeout(l);
      };
    }
  }, [t]), /* @__PURE__ */ c("div", { ref: i, className: "count-badge", children: [
    r && /* @__PURE__ */ c(
      ve,
      {
        name: "icon-triangle-alert",
        className: "text-yellow-500 mb-px",
        size: 14
      }
    ),
    n && /* @__PURE__ */ c(ve, { name: "icon-function", className: "text-[#A855F7] mb-px", size: 14 }),
    "x",
    e
  ] });
}, ut = {
  lastRendered: /* @__PURE__ */ new Map(),
  expandedPaths: /* @__PURE__ */ new Set(),
  cleanup: () => {
    ut.lastRendered.clear(), ut.expandedPaths.clear(), jh.cleanupAll(), xm(), bc.reset();
  }
}, Cc = class extends $e {
  constructor() {
    super(...arguments), this.state = {
      hasError: !1,
      error: null
    }, this.handleReset = () => {
      this.setState({ hasError: !1, error: null }), ut.cleanup();
    };
  }
  static getDerivedStateFromError(e) {
    return { hasError: !0, error: e };
  }
  render() {
    var e;
    return this.state.hasError ? /* @__PURE__ */ c("div", { className: "p-4 bg-red-950/50 h-screen backdrop-blur-sm", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2 mb-3 text-red-400 font-medium", children: [
        /* @__PURE__ */ c(ve, { name: "icon-flame", className: "text-red-500", size: 16 }),
        "Something went wrong in the inspector"
      ] }),
      /* @__PURE__ */ c("div", { className: "p-3 bg-black/40 rounded font-mono text-xs text-red-300 mb-4 break-words", children: ((e = this.state.error) == null ? void 0 : e.message) || JSON.stringify(this.state.error) }),
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: this.handleReset,
          className: "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2",
          children: "Reset Inspector"
        }
      )
    ] }) : this.props.children;
  }
}, um = Rt(
  () => x(
    "react-scan-inspector",
    "flex-1",
    "opacity-0",
    "overflow-y-auto overflow-x-hidden",
    "transition-opacity delay-0",
    "pointer-events-none",
    !Lr.value && "opacity-100 delay-300 pointer-events-auto"
  )
), dm = /* @__PURE__ */ $i(() => {
  const e = j(null), t = (n) => {
    if (!n) return;
    e.current = n;
    const { data: r, shouldUpdate: o } = km(n);
    if (o) {
      const i = {
        timestamp: Date.now(),
        fiberInfo: wm(n),
        props: r.fiberProps,
        state: r.fiberState,
        context: r.fiberContext,
        stateNames: bm(n)
      };
      bc.addUpdate(i, n);
    }
  };
  return Rn(() => {
    const n = M.inspectState.value;
    Nn(() => {
      var r;
      if (n.kind !== "focused" || !n.focusedDomElement) {
        e.current = null, ut.cleanup();
        return;
      }
      n.kind === "focused" && (Lr.value = !1);
      const { parentCompositeFiber: o } = Ja(
        n.focusedDomElement,
        n.fiber
      );
      if (!o) {
        M.inspectState.value = {
          kind: "inspect-off"
        }, ue.value = {
          view: "none"
        };
        return;
      }
      ((r = e.current) == null ? void 0 : r.type) !== o.type && (e.current = o, ut.cleanup(), t(o));
    });
  }), Rn(() => {
    Li.value, Nn(() => {
      const n = M.inspectState.value;
      if (n.kind !== "focused" || !n.focusedDomElement) {
        e.current = null, ut.cleanup();
        return;
      }
      const { parentCompositeFiber: r } = Ja(
        n.focusedDomElement,
        n.fiber
      );
      if (!r) {
        M.inspectState.value = {
          kind: "inspect-off"
        }, ue.value = {
          view: "none"
        };
        return;
      }
      t(r), n.focusedDomElement.isConnected || (e.current = null, ut.cleanup(), M.inspectState.value = {
        kind: "inspecting",
        hoveredDomElement: null
      });
    });
  }), q(() => () => {
    ut.cleanup();
  }, []), /* @__PURE__ */ c(Cc, { children: /* @__PURE__ */ c("div", { className: um, children: /* @__PURE__ */ c("div", { className: "w-full h-full", children: /* @__PURE__ */ c(nm, {}) }) }) });
}), pm = /* @__PURE__ */ $i(() => M.inspectState.value.kind !== "focused" ? null : /* @__PURE__ */ c(Cc, { children: [
  /* @__PURE__ */ c(dm, {}),
  /* @__PURE__ */ c(Gh, {})
] })), Sc = (e) => {
  var t, n, r, o;
  if ("__REACT_DEVTOOLS_GLOBAL_HOOK__" in window) {
    const i = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!(i != null && i.renderers)) return null;
    for (const [, a] of Array.from(i.renderers))
      try {
        const l = (t = a.findFiberByHostInstance) == null ? void 0 : t.call(a, e);
        if (l) return l;
      } catch (l) {
      }
  }
  if ("_reactRootContainer" in e) {
    const a = e._reactRootContainer;
    return (o = (r = (n = a == null ? void 0 : a._internalRoot) == null ? void 0 : n.current) == null ? void 0 : r.child) != null ? o : null;
  }
  for (const i in e)
    if (i.startsWith("__reactInternalInstance$") || i.startsWith("__reactFiber"))
      return e[i];
  return null;
}, ji = (e) => {
  let t = e;
  for (; t; ) {
    if (t.stateNode instanceof Element)
      return t.stateNode;
    if (!t.child)
      break;
    t = t.child;
  }
  for (; t; ) {
    if (t.stateNode instanceof Element)
      return t.stateNode;
    if (!t.return)
      break;
    t = t.return;
  }
  return null;
}, Vi = (e) => {
  if (!e) return null;
  try {
    const t = Sc(e);
    if (!t) return null;
    const n = Ut(t);
    return n ? n[0] : null;
  } catch (t) {
    return null;
  }
}, Ut = (e) => {
  let t = e, n = null;
  for (; t; ) {
    if (Jt(t)) return [t, n];
    Cn(t) && !n && (n = t), t = t.return;
  }
  return null;
}, Ka = (e, t) => !!zl(t, (r) => r === e), fm = async (e) => {
  const t = Vi(e);
  if (!t) return null;
  const n = ji(t);
  if (!n) return null;
  const r = (await Zf([n])).get(n);
  return r || null;
}, xt = (e) => {
  const t = Vi(e);
  if (!t) return {};
  if (!ji(t)) return {};
  const r = Ut(t);
  if (!r)
    return {};
  const [o] = r;
  return {
    parentCompositeFiber: o
  };
}, Ja = (e, t) => {
  var n, r, o, i;
  if (!e.isConnected) return {};
  let a = t != null ? t : Vi(e);
  if (!a) return {};
  let l = a, s = null, u = null;
  for (; l; ) {
    if (!l.stateNode) {
      l = l.return;
      continue;
    }
    if ((n = te.instrumentation) != null && n.fiberRoots.has(l.stateNode)) {
      s = l, u = l.stateNode.current;
      break;
    }
    l = l.return;
  }
  if (!s || !u) return {};
  if (a = Ka(a, u) ? a : (r = a.alternate) != null ? r : a, !a) return {};
  if (!ji(a)) return {};
  const p = (o = Ut(a)) == null ? void 0 : o[0];
  return p ? {
    parentCompositeFiber: Ka(p, u) ? p : (i = p.alternate) != null ? i : p
  } : {};
}, Tc = (e) => {
  var t, n, r;
  const o = (t = e.memoizedProps) != null ? t : {}, i = (r = (n = e.alternate) == null ? void 0 : n.memoizedProps) != null ? r : {}, a = [];
  for (const l in o) {
    if (l === "children") continue;
    const s = o[l], u = i[l];
    ft(s, u) || a.push({
      name: l,
      value: s,
      prevValue: u,
      type: 1
      /* Props */
    });
  }
  return a;
}, oi = /* @__PURE__ */ new Set([
  "HTML",
  "HEAD",
  "META",
  "TITLE",
  "BASE",
  "SCRIPT",
  "SCRIPT",
  "STYLE",
  "LINK",
  "NOSCRIPT",
  "SOURCE",
  "TRACK",
  "EMBED",
  "OBJECT",
  "PARAM",
  "TEMPLATE",
  "PORTAL",
  "SLOT",
  "AREA",
  "XML",
  "DOCTYPE",
  "COMMENT"
]), _r = (e, t = !0) => {
  if (e.stateNode && "nodeType" in e.stateNode) {
    const r = e.stateNode;
    return t && r.tagName && oi.has(r.tagName.toLowerCase()) ? null : r;
  }
  let n = e.child;
  for (; n; ) {
    const r = _r(n, t);
    if (r) return r;
    n = n.sibling;
  }
  return null;
}, hm = (e = document.body) => {
  const t = [], n = (o) => {
    if (!o) return null;
    const { parentCompositeFiber: i } = xt(o);
    return i && _r(i) === o ? o : null;
  }, r = (o, i = 0) => {
    var a;
    const l = n(o);
    if (l) {
      const { parentCompositeFiber: s } = xt(l);
      if (!s) return;
      t.push({
        element: l,
        depth: i,
        name: (a = he(s.type)) != null ? a : "Unknown",
        fiber: s
      });
    }
    for (const s of Array.from(o.children))
      r(s, l ? i + 1 : i);
  };
  return r(e), t;
}, Za = (e) => {
  try {
    if (e === null) return "null";
    if (e === void 0) return "undefined";
    if (Bt(e)) return "Promise";
    if (typeof e == "function") {
      const t = e.toString();
      try {
        return t.replace(/\s+/g, " ").replace(/{\s+/g, `{
  `).replace(/;\s+/g, `;
  `).replace(/}\s*$/g, `
}`).replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").replace(/,\s+/g, ", ");
      } catch (n) {
        return t;
      }
    }
    switch (!0) {
      case e instanceof Date:
        return e.toISOString();
      case e instanceof RegExp:
        return e.toString();
      case e instanceof Error:
        return `${e.name}: ${e.message}`;
      case e instanceof Map:
        return JSON.stringify(Array.from(e.entries()), null, 2);
      case e instanceof Set:
        return JSON.stringify(Array.from(e), null, 2);
      case e instanceof DataView:
        return JSON.stringify(
          Array.from(new Uint8Array(e.buffer)),
          null,
          2
        );
      case e instanceof ArrayBuffer:
        return JSON.stringify(Array.from(new Uint8Array(e)), null, 2);
      case (ArrayBuffer.isView(e) && "length" in e):
        return JSON.stringify(
          Array.from(e),
          null,
          2
        );
      case Array.isArray(e):
        return JSON.stringify(e, null, 2);
      case typeof e == "object":
        return JSON.stringify(e, null, 2);
      default:
        return String(e);
    }
  } catch (t) {
    return String(e);
  }
}, mm = (e, t) => {
  try {
    return typeof e != "function" || typeof t != "function" ? !1 : e.toString() === t.toString();
  } catch (n) {
    return !1;
  }
}, Ec = (e, t, n = [], r = /* @__PURE__ */ new WeakSet()) => {
  if (e === t)
    return { type: "primitive", changes: [], hasDeepChanges: !1 };
  if (typeof e == "function" && typeof t == "function") {
    const u = mm(e, t);
    return {
      type: "primitive",
      changes: [
        {
          path: n,
          prevValue: e,
          currentValue: t,
          sameFunction: u
        }
      ],
      hasDeepChanges: !u
    };
  }
  if (e === null || t === null || e === void 0 || t === void 0 || typeof e != "object" || typeof t != "object")
    return {
      type: "primitive",
      changes: [{ path: n, prevValue: e, currentValue: t }],
      hasDeepChanges: !0
    };
  if (r.has(e) || r.has(t))
    return {
      type: "object",
      changes: [{ path: n, prevValue: "[Circular]", currentValue: "[Circular]" }],
      hasDeepChanges: !1
    };
  r.add(e), r.add(t);
  const o = e, i = t, a = /* @__PURE__ */ new Set([
    ...Object.keys(o),
    ...Object.keys(i)
  ]), l = [];
  let s = !1;
  for (const u of a) {
    const p = o[u], d = i[u];
    if (p !== d)
      if (typeof p == "object" && typeof d == "object" && p !== null && d !== null) {
        const f = Ec(
          p,
          d,
          [...n, u],
          r
        );
        l.push(...f.changes), f.hasDeepChanges && (s = !0);
      } else
        l.push({
          path: [...n, u],
          prevValue: p,
          currentValue: d
        }), s = !0;
  }
  return {
    type: "object",
    changes: l,
    hasDeepChanges: s
  };
}, Le = (e) => e.length === 0 ? "" : e.reduce((t, n, r) => /^\d+$/.test(n) ? `${t}[${n}]` : r === 0 ? n : `${t}.${n}`, "");
function gm(e) {
  const t = e.replace(/\s+/g, " ").trim(), n = [];
  let r = "";
  for (let g = 0; g < t.length; g++) {
    const y = t[g];
    if (y === "=" && t[g + 1] === ">") {
      r.trim() && n.push(r.trim()), n.push("=>"), r = "", g++;
      continue;
    }
    /[(){}[\];,<>:\?!]/.test(y) ? (r.trim() && n.push(r.trim()), n.push(y), r = "") : /\s/.test(y) ? (r.trim() && n.push(r.trim()), r = "") : r += y;
  }
  r.trim() && n.push(r.trim());
  const o = [];
  for (let g = 0; g < n.length; g++) {
    const y = n[g], k = n[g + 1];
    y === "(" && k === ")" || y === "[" && k === "]" || y === "{" && k === "}" || y === "<" && k === ">" ? (o.push(y + k), g++) : o.push(y);
  }
  const i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  function l(g, y, k) {
    let S = 0;
    for (let T = k; T < o.length; T++) {
      const E = o[T];
      if (E === g) S++;
      else if (E === y && (S--, S === 0))
        return T;
    }
    return -1;
  }
  for (let g = 0; g < o.length; g++)
    if (o[g] === "(") {
      const k = l("(", ")", g);
      if (k !== -1 && o[k + 1] === "=>")
        for (let S = g; S <= k; S++)
          i.add(S);
    }
  for (let g = 1; g < o.length; g++) {
    const y = o[g - 1], k = o[g];
    if (/^[a-zA-Z0-9_$]+$/.test(y) && k === "<") {
      const S = l("<", ">", g);
      if (S !== -1)
        for (let T = g; T <= S; T++)
          a.add(T);
    }
  }
  let s = 0;
  const u = "  ", p = [];
  let d = "";
  function f() {
    d.trim() && p.push(d.replace(/\s+$/, "")), d = "";
  }
  function h() {
    f(), d = u.repeat(s);
  }
  const m = [];
  function v() {
    return m.length ? m[m.length - 1] : null;
  }
  function w(g, y = !1) {
    d.trim() ? y || /^[),;:\].}>]$/.test(g) ? d += g : d += ` ${g}` : d += g;
  }
  for (let g = 0; g < o.length; g++) {
    const y = o[g], k = o[g + 1] || "";
    if (["(", "{", "[", "<"].includes(y)) {
      if (w(y), m.push(y), y === "{")
        s++, h();
      else if ((y === "(" || y === "[" || y === "<") && !(i.has(g) && y === "(" || a.has(g) && y === "<")) {
        const S = {
          "(": ")",
          "[": "]",
          "<": ">"
        }[y];
        k !== S && k !== "()" && k !== "[]" && k !== "<>" && (s++, h());
      }
    } else if ([")", "}", "]", ">"].includes(y)) {
      const S = v();
      y === ")" && S === "(" || y === "]" && S === "[" || y === ">" && S === "<" ? !(i.has(g) && y === ")") && !(a.has(g) && y === ">") && (s = Math.max(s - 1, 0), h()) : y === "}" && S === "{" && (s = Math.max(s - 1, 0), h()), m.pop(), w(y), y === "}" && h();
    } else if (/^\(\)|\[\]|\{\}|\<\>$/.test(y))
      w(y);
    else if (y === "=>")
      w(y);
    else if (y === ";")
      w(y, !0), h();
    else if (y === ",") {
      w(y, !0);
      const S = v();
      !(i.has(g) && S === "(") && !(a.has(g) && S === "<") && S && ["{", "[", "(", "<"].includes(S) && h();
    } else
      w(y);
  }
  return f(), p.join(`
`).replace(/\n\s*\n+/g, `
`).trim();
}
var ii = (e, t = !1) => {
  try {
    const n = e.toString(), r = n.match(
      /(?:function\s*)?(?:\(([^)]*)\)|([^=>\s]+))\s*=>?/
    );
    if (!r) return "ƒ";
    const i = (r[1] || r[2] || "").replace(/\s+/g, "");
    return t ? gm(n) : `ƒ (${i}) => ...`;
  } catch (n) {
    return "ƒ";
  }
}, kr = (e) => {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  if (typeof e == "string")
    return `"${e.length > 150 ? `${e.slice(0, 20)}...` : e}"`;
  if (typeof e == "number" || typeof e == "boolean")
    return String(e);
  if (typeof e == "function") return ii(e);
  if (Array.isArray(e)) return `Array(${e.length})`;
  if (e instanceof Map) return `Map(${e.size})`;
  if (e instanceof Set) return `Set(${e.size})`;
  if (e instanceof Date) return e.toISOString();
  if (e instanceof RegExp) return e.toString();
  if (e instanceof Error) return `${e.name}: ${e.message}`;
  if (typeof e == "object") {
    const t = Object.keys(e);
    return `{${t.length > 2 ? `${t.slice(0, 2).join(", ")}, ...` : t.join(", ")}}`;
  }
  return String(e);
}, vm = (e) => {
  var t;
  if (e == null) return { value: e };
  if (typeof e == "function") return { value: e };
  if (typeof e != "object") return { value: e };
  if (e instanceof Promise)
    return { value: "Promise" };
  try {
    const n = Object.getPrototypeOf(e);
    return n === Promise.prototype || ((t = n == null ? void 0 : n.constructor) == null ? void 0 : t.name) === "Promise" ? { value: "Promise" } : { value: e };
  } catch (n) {
    return { value: null, error: "Error accessing value" };
  }
}, Bt = (e) => !!e && (e instanceof Promise || typeof e == "object" && "then" in e), wm = (e) => {
  var t, n;
  const r = yt(e);
  return {
    displayName: he(e) || "Unknown",
    type: e.type,
    key: e.key,
    id: e.index,
    selfTime: (t = r == null ? void 0 : r.selfTime) != null ? t : null,
    totalTime: (n = r == null ? void 0 : r.totalTime) != null ? n : null
  };
}, Wi = /* @__PURE__ */ new Map(), Nc = /* @__PURE__ */ new Map(), Hi = /* @__PURE__ */ new Map(), ai = null, ym = new RegExp("\\[(?<name>\\w+),\\s*set\\w+\\]", "g"), bm = (e) => {
  var t, n;
  const r = ((n = (t = e.type) == null ? void 0 : t.toString) == null ? void 0 : n.call(t)) || "";
  return r ? Array.from(
    r.matchAll(ym),
    (o) => {
      var i, a;
      return (a = (i = o.groups) == null ? void 0 : i.name) != null ? a : "";
    }
  ) : [];
}, xm = () => {
  Wi.clear(), Nc.clear(), Hi.clear(), ai = null;
}, _m = (e) => {
  const t = e.type !== ai;
  return ai = e.type, t;
}, oo = (e, t, n, r) => {
  const o = e.get(t), i = e === Wi || e === Hi, a = !ft(n, r);
  if (!o)
    return e.set(t, {
      count: a && i ? 1 : 0,
      currentValue: n,
      previousValue: r,
      lastUpdated: Date.now()
    }), {
      hasChanged: a,
      count: a && i ? 1 : i ? 0 : 1
    };
  if (!ft(o.currentValue, n)) {
    const l = o.count + 1;
    return e.set(t, {
      count: l,
      currentValue: n,
      previousValue: o.currentValue,
      lastUpdated: Date.now()
    }), { hasChanged: !0, count: l };
  }
  return { hasChanged: !1, count: o.count };
}, Qa = (e) => {
  if (!e) return {};
  if (e.tag === Or || e.tag === Mr || e.tag === zn || e.tag === Mn) {
    let t = e.memoizedState;
    const n = {};
    let r = 0;
    for (; t; )
      t.queue && t.memoizedState !== void 0 && (n[r] = t.memoizedState), t = t.next, r++;
    return n;
  }
  return e.tag === Tt ? e.memoizedState || {} : {};
}, Ui = (e) => {
  var t;
  const n = e.memoizedProps || {}, r = ((t = e.alternate) == null ? void 0 : t.memoizedProps) || {}, o = {}, i = {}, a = Object.keys(n);
  for (const s of a)
    s in n && (o[s] = n[s], i[s] = r[s]);
  const l = Tc(e).map((s) => ({
    name: s.name,
    value: s.value,
    prevValue: s.prevValue
  }));
  return { current: o, prev: i, changes: l };
}, Bi = (e) => {
  const t = Qa(e), n = e.alternate ? Qa(e.alternate) : {}, r = [];
  for (const [o, i] of Object.entries(t)) {
    const a = e.tag === Tt ? o : Number(o);
    e.alternate && !ft(n[o], i) && r.push({
      name: a,
      value: i,
      prevValue: n[o]
    });
  }
  return { current: t, prev: n, changes: r };
}, Yi = (e) => {
  const t = ts(e), n = e.alternate ? ts(e.alternate) : /* @__PURE__ */ new Map(), r = {}, o = {}, i = [], a = /* @__PURE__ */ new Set();
  for (const [l, s] of t) {
    const u = s.displayName, p = l;
    if (a.has(p)) continue;
    a.add(p), r[u] = s.value;
    const d = n.get(l);
    d && (o[u] = d.value, ft(d.value, s.value) || i.push({
      name: u,
      value: s.value,
      prevValue: d.value,
      contextType: l
    }));
  }
  return { current: r, prev: o, changes: i };
}, km = (e) => {
  const t = () => ({
    current: [],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  });
  if (!e)
    return {
      data: {
        fiberProps: t(),
        fiberState: t(),
        fiberContext: t()
      },
      shouldUpdate: !1
    };
  let n = !1;
  const r = _m(e), o = t();
  if (e.memoizedProps) {
    const { current: d, changes: f } = Ui(e);
    for (const [h, m] of Object.entries(d))
      o.current.push({
        name: h,
        value: Bt(m) ? { type: "promise", displayValue: "Promise" } : m
      });
    for (const h of f) {
      const { hasChanged: m, count: v } = oo(
        Wi,
        h.name,
        h.value,
        h.prevValue
      );
      m && (n = !0, o.changes.add(h.name), o.changesCounts.set(h.name, v));
    }
  }
  const i = t(), { current: a, changes: l } = Bi(e);
  for (const [d, f] of Object.entries(a)) {
    const h = e.tag === Tt ? d : Number(d);
    i.current.push({ name: h, value: f });
  }
  for (const d of l) {
    const { hasChanged: f, count: h } = oo(
      Nc,
      d.name,
      d.value,
      d.prevValue
    );
    f && (n = !0, i.changes.add(d.name), i.changesCounts.set(d.name, h));
  }
  const s = t(), { current: u, changes: p } = Yi(e);
  for (const [d, f] of Object.entries(u))
    s.current.push({ name: d, value: f });
  if (!r)
    for (const d of p) {
      const { hasChanged: f, count: h } = oo(
        Hi,
        d.name,
        d.value,
        d.prevValue
      );
      f && (n = !0, s.changes.add(d.name), s.changesCounts.set(d.name, h));
    }
  return !n && !r && (o.changes.clear(), i.changes.clear(), s.changes.clear()), {
    data: {
      fiberProps: o,
      fiberState: i,
      fiberContext: s
    },
    shouldUpdate: n || r
  };
}, es = /* @__PURE__ */ new WeakMap(), ts = (e) => {
  var t;
  if (!e)
    return /* @__PURE__ */ new Map();
  const n = es.get(e);
  if (n)
    return n;
  const r = /* @__PURE__ */ new Map();
  let o = e;
  for (; o; ) {
    const i = o.dependencies;
    if (i != null && i.firstContext) {
      let a = i.firstContext;
      for (; a; ) {
        const l = a.memoizedValue, s = (t = a.context) == null ? void 0 : t.displayName;
        if (r.has(l) || r.set(a.context, {
          value: l,
          displayName: s != null ? s : "UnnamedContext",
          contextType: null
        }), a === a.next)
          break;
        a = a.next;
      }
    }
    o = o.return;
  }
  return es.set(e, r), r;
}, ns = (e) => {
  const t = () => ({
    current: [],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  });
  if (!e)
    return {
      fiberProps: t(),
      fiberState: t(),
      fiberContext: t()
    };
  const n = t();
  if (e.memoizedProps) {
    const { current: l, changes: s } = Ui(e);
    for (const [u, p] of Object.entries(l))
      n.current.push({
        name: u,
        value: Bt(p) ? { type: "promise", displayValue: "Promise" } : p
      });
    for (const u of s)
      n.changes.add(u.name), n.changesCounts.set(u.name, 1);
  }
  const r = t();
  if (e.memoizedState) {
    const { current: l, changes: s } = Bi(e);
    for (const [u, p] of Object.entries(l))
      r.current.push({
        name: u,
        value: Bt(p) ? { type: "promise", displayValue: "Promise" } : p
      });
    for (const u of s)
      r.changes.add(u.name), r.changesCounts.set(u.name, 1);
  }
  const o = t(), { current: i, changes: a } = Yi(e);
  for (const [l, s] of Object.entries(i))
    o.current.push({
      name: l,
      value: Bt(s) ? { type: "promise", displayValue: "Promise" } : s
    });
  for (const l of a)
    o.changes.add(l.name), o.changesCounts.set(l.name, 1);
  return {
    // data: {
    fiberProps: n,
    fiberState: r,
    fiberContext: o
    // },
  };
}, si = 0, rs = performance.now(), io = 0, os = !1, Rc = () => {
  io++;
  const e = performance.now();
  e - rs >= 1e3 && (si = io, io = 0, rs = e), requestAnimationFrame(Rc);
}, Ic = () => (os || (os = !0, Rc(), si = 60), si), Cm = (e) => {
  var t, n;
  if (!e) return [];
  const r = [];
  if (e.tag === Or || e.tag === Mr || e.tag === zn || e.tag === Mn) {
    let o = e.memoizedState, i = (t = e.alternate) == null ? void 0 : t.memoizedState, a = 0;
    for (; o; ) {
      if (o.queue && o.memoizedState !== void 0) {
        const l = {
          type: 2,
          name: a.toString(),
          value: o.memoizedState,
          prevValue: i == null ? void 0 : i.memoizedState
        };
        ft(l.prevValue, l.value) || r.push(l);
      }
      o = o.next, i = i == null ? void 0 : i.next, a++;
    }
    return r;
  }
  if (e.tag === Tt) {
    const o = {
      type: 3,
      name: "state",
      value: e.memoizedState,
      prevValue: (n = e.alternate) == null ? void 0 : n.memoizedState
    };
    return ft(o.prevValue, o.value) || r.push(o), r;
  }
  return r;
}, ao = 0, is = /* @__PURE__ */ new WeakMap(), Sm = (e) => {
  const t = is.get(e);
  return t || (ao++, is.set(e, ao), ao);
};
function Tm(e, t) {
  var n;
  if (!e || !t) return;
  const r = e.memoizedValue, o = {
    type: 4,
    name: (n = e.context.displayName) != null ? n : "Context.Provider",
    value: r,
    contextType: Sm(e.context)
    // unstable: false,
  };
  this.push(o);
}
var Em = (e) => {
  const t = [];
  return cf(e, Tm.bind(t)), t;
}, Ac = /* @__PURE__ */ new Map(), as = !1, so = () => Array.from(Ac.values()), Nm = 16, li = /* @__PURE__ */ new WeakMap();
function Pc(e) {
  return String(Pe(e));
}
function Oc(e) {
  const t = Pc(e), n = li.get(Et(e));
  if (n)
    return n.get(t);
}
function Rm(e, t) {
  const n = Et(e.type), r = Pc(e);
  let o = li.get(n);
  o || (o = /* @__PURE__ */ new Map(), li.set(n, o)), o.set(r, t);
}
var Im = (e, t, n, r, o) => {
  const i = Date.now(), a = Oc(e);
  if ((r || o) && (!a || i - (a.lastRenderTimestamp || 0) > Nm)) {
    const l = a || {
      selfTime: 0,
      totalTime: 0,
      renderCount: 0,
      lastRenderTimestamp: i
    };
    l.renderCount = (l.renderCount || 0) + 1, l.selfTime = t || 0, l.totalTime = n || 0, l.lastRenderTimestamp = i, Rm(e, D({}, l));
  }
}, Am = (e, t) => {
  const n = {
    // this will typically be false, but in cases where a user provides showToolbar: true, this will be true
    isPaused: _e(!te.options.value.enabled),
    fiberRoots: /* @__PURE__ */ new WeakSet()
  };
  return Ac.set(e, {
    key: e,
    config: t,
    instrumentation: n
  }), as || (as = !0, vf({
    name: "react-scan",
    onActive: t.onActive,
    onCommitFiberRoot(r, o) {
      n.fiberRoots.add(o);
      const i = so();
      for (const a of i)
        a.config.onCommitStart();
      gf(
        o.current,
        (a, l) => {
          const s = Et(a.type);
          if (!s) return null;
          const u = so(), p = [];
          for (let y = 0, k = u.length; y < k; y++)
            u[y].config.isValidFiber(a) && p.push(y);
          if (!p.length) return null;
          const d = [];
          if (u.some((y) => y.config.trackChanges)) {
            const y = Ui(a).changes, k = Bi(a).changes, S = Yi(a).changes;
            d.push.apply(
              null,
              y.map(
                (T) => ({
                  type: 1,
                  name: T.name,
                  value: T.value
                })
              )
            );
            for (const T of k)
              a.tag === Tt ? d.push({
                type: 3,
                name: T.name.toString(),
                value: T.value
              }) : d.push({
                type: 2,
                name: T.name.toString(),
                value: T.value
              });
            d.push.apply(
              null,
              S.map(
                (T) => ({
                  type: 4,
                  name: T.name,
                  value: T.value,
                  contextType: Number(T.contextType)
                })
              )
            );
          }
          const { selfTime: f, totalTime: h } = yt(a), m = Ic(), v = {
            phase: Qf[l],
            componentName: he(s),
            count: 1,
            changes: d,
            time: f,
            forget: Sn(a),
            // todo: allow this to be toggle-able through toolbar
            // todo: performance optimization: if the last fiber measure was very off screen, do not run isRenderUnnecessary
            unnecessary: null,
            didCommit: Ci(a),
            fps: m
          }, w = d.length > 0, g = uf(a).length > 0;
          l === "update" && Im(
            a,
            f,
            h,
            w,
            g
          );
          for (let y = 0, k = p.length; y < k; y++) {
            const S = p[y];
            u[S].config.onRender(a, [v]);
          }
        }
      );
      for (const a of i)
        a.config.onCommitFinish();
    },
    onPostCommitFiberRoot() {
      const r = so();
      for (const o of r)
        o.config.onPostCommitFiberRoot();
    }
  })), n;
}, Pm = (e) => {
  var t;
  const n = /* @__PURE__ */ new Map();
  for (let r = 0, o = e.length; r < o; r++) {
    const i = e[r];
    if (!i.componentName) continue;
    const a = (t = n.get(i.componentName)) != null ? t : [], l = Jf([
      H(D({
        aggregatedCount: 1,
        computedKey: null,
        name: i.componentName,
        frame: null
      }, i), {
        changes: {
          // TODO(Alexis): use a faster reduction method
          type: i.changes.reduce((p, d) => p | d.type, 0),
          unstable: i.changes.some((p) => p.unstable)
        },
        phase: i.phase,
        computedCurrent: null
      })
    ]);
    if (!l) continue;
    let s = null, u = null;
    if (i.changes)
      for (let p = 0, d = i.changes.length; p < d; p++) {
        const { name: f, prevValue: h, nextValue: m, unstable: v, type: w } = i.changes[p];
        w === 1 ? (s != null || (s = {}), u != null || (u = {}), s[`${v ? "⚠️" : ""}${f} (prev)`] = h, u[`${v ? "⚠️" : ""}${f} (next)`] = m) : a.push({
          prev: h,
          next: m,
          type: w === 4 ? "context" : "state",
          unstable: v != null ? v : !1
        });
      }
    s && u && a.push({
      prev: s,
      next: u,
      type: "props",
      unstable: !1
    }), n.set(l, a);
  }
  for (const [r, o] of Array.from(n.entries())) {
    console.group(
      `%c${r}`,
      "background: hsla(0,0%,70%,.3); border-radius:3px; padding: 0 2px;"
    );
    for (const { type: i, prev: a, next: l, unstable: s } of o)
      console.log(`${i}:`, s ? "⚠️" : "", a, "!==", l);
    console.groupEnd();
  }
}, Om = () => {
  if (window.hideIntro) {
    window.hideIntro = void 0;
    return;
  }
  console.log(
    "%c[·] %cReact Scan",
    "font-weight:bold;color:#7a68e8;font-size:20px;",
    "font-weight:bold;font-size:14px;"
  ), console.log(
    "Try React Scan Monitoring to target performance issues in production: https://react-scan.com/monitoring"
  );
}, ss = 7, Mm = "Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace", zm = 0.1, Hn = (e, t) => Math.floor(e + (t - e) * zm), Dm = 4, Cr = 40, lo = 45, co = "115,97,230";
function Fm(e, t) {
  return t[0] - e[0];
}
function $m(e) {
  return [...e.entries()].sort(Fm);
}
function ls([e, t]) {
  let n = `${t.slice(0, Dm).join(", ")} ×${e}`;
  return n.length > Cr && (n = `${n.slice(0, Cr)}…`), n;
}
var cs = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const { name: i, count: a } of e)
    t.set(i, (t.get(i) || 0) + a);
  const n = /* @__PURE__ */ new Map();
  for (const [i, a] of t) {
    const l = n.get(a);
    l ? l.push(i) : n.set(a, [i]);
  }
  const r = $m(n);
  let o = ls(r[0]);
  for (let i = 1, a = r.length; i < a; i++)
    o += ", " + ls(r[i]);
  return o.length > Cr ? `${o.slice(0, Cr)}…` : o;
}, us = (e) => {
  let t = 0;
  for (const n of e)
    t += n.width * n.height;
  return t;
}, Lm = (e, t) => {
  for (const { id: n, name: r, count: o, x: i, y: a, width: l, height: s, didCommit: u } of t) {
    const p = {
      id: n,
      name: r,
      count: o,
      x: i,
      y: a,
      width: l,
      height: s,
      frame: 0,
      targetX: i,
      targetY: a,
      targetWidth: l,
      targetHeight: s,
      didCommit: u
    }, d = String(p.id), f = e.get(d);
    f ? (f.count++, f.frame = 0, f.targetX = i, f.targetY = a, f.targetWidth = l, f.targetHeight = s, f.didCommit = u) : e.set(d, p);
  }
}, jm = (e, t, n) => {
  for (const r of e.values()) {
    const o = r.x - t, i = r.y - n;
    r.targetX = o, r.targetY = i;
  }
}, Vm = (e, t) => {
  const n = e.getContext("2d", { alpha: !0 });
  return n && n.scale(t, t), n;
}, Wm = (e, t, n, r) => {
  e.clearRect(0, 0, t.width / n, t.height / n);
  const o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const s of r.values()) {
    const {
      x: u,
      y: p,
      width: d,
      height: f,
      targetX: h,
      targetY: m,
      targetWidth: v,
      targetHeight: w,
      frame: g
    } = s;
    h !== u && (s.x = Hn(u, h)), m !== p && (s.y = Hn(p, m)), v !== d && (s.width = Hn(d, v)), w !== f && (s.height = Hn(f, w));
    const y = `${h != null ? h : u},${m != null ? m : p}`, k = `${y},${v != null ? v : d},${w != null ? w : f}`, S = o.get(y);
    S ? S.push(s) : o.set(y, [s]);
    const T = 1 - g / lo;
    s.frame++;
    const E = i.get(k) || {
      x: u,
      y: p,
      width: d,
      height: f,
      alpha: T
    };
    T > E.alpha && (E.alpha = T), i.set(k, E);
  }
  for (const { x: s, y: u, width: p, height: d, alpha: f } of i.values())
    e.strokeStyle = `rgba(${co},${f})`, e.lineWidth = 1, e.beginPath(), e.rect(s, u, p, d), e.stroke(), e.fillStyle = `rgba(${co},${f * 0.1})`, e.fill();
  e.font = `11px ${Mm}`;
  const a = /* @__PURE__ */ new Map();
  e.textRendering = "optimizeSpeed";
  for (const s of o.values()) {
    const u = s[0], { x: p, y: d, frame: f } = u, h = 1 - f / lo, m = cs(s), { width: v } = e.measureText(m);
    if (a.set(`${p},${d},${v},${m}`, {
      text: m,
      width: v,
      height: 11,
      alpha: h,
      x: p,
      y: d,
      outlines: s
    }), f > lo)
      for (const g of s)
        r.delete(String(g.id));
  }
  const l = Array.from(a.entries()).sort(
    ([s, u], [p, d]) => us(d.outlines) - us(u.outlines)
  );
  for (const [s, u] of l)
    if (a.has(s))
      for (const [p, d] of a.entries()) {
        if (s === p) continue;
        const { x: f, y: h, width: m, height: v } = u, {
          x: w,
          y: g,
          width: y,
          height: k
        } = d;
        f + m > w && w + y > f && h + v > g && g + k > h && (u.text = cs(u.outlines.concat(d.outlines)), u.width = e.measureText(u.text).width, a.delete(p));
      }
  for (const s of a.values()) {
    const { x: u, y: p, alpha: d, width: f, height: h, text: m } = s;
    let v = p - h - 4;
    v < 0 && (v = 0), e.fillStyle = `rgba(${co},${d})`, e.fillRect(u, v, f + 4, h + 4), e.fillStyle = `rgba(255,255,255,${d})`, e.fillText(m, u + 2, v + h);
  }
  return r.size > 0;
}, Hm = '"use strict";(()=>{var D="Menlo,Consolas,Monaco,Liberation Mono,Lucida Console,monospace";var M=(t,i)=>Math.floor(t+(i-t)*.1);var _="115,97,230";function F(t,i){return i[0]-t[0]}function I(t){return[...t.entries()].sort(F)}function $([t,i]){let o=`${i.slice(0,4).join(", ")} \\xD7${t}`;return o.length>40&&(o=`${o.slice(0,40)}\\u2026`),o}var S=t=>{let i=new Map;for(let{name:e,count:u}of t)i.set(e,(i.get(e)||0)+u);let o=new Map;for(let[e,u]of i){let A=o.get(u);A?A.push(e):o.set(u,[e])}let h=I(o),s=$(h[0]);for(let e=1,u=h.length;e<u;e++)s+=", "+$(h[e]);return s.length>40?`${s.slice(0,40)}\\u2026`:s},X=t=>{let i=0;for(let o of t)i+=o.width*o.height;return i};var N=(t,i)=>{let o=t.getContext("2d",{alpha:!0});return o&&o.scale(i,i),o},Y=(t,i,o,h)=>{t.clearRect(0,0,i.width/o,i.height/o);let s=new Map,e=new Map;for(let n of h.values()){let{x:r,y:c,width:a,height:g,targetX:l,targetY:d,targetWidth:f,targetHeight:p,frame:O}=n;l!==r&&(n.x=M(r,l)),d!==c&&(n.y=M(c,d)),f!==a&&(n.width=M(a,f)),p!==g&&(n.height=M(g,p));let w=`${l??r},${d??c}`,y=`${w},${f??a},${p??g}`,v=s.get(w);v?v.push(n):s.set(w,[n]);let E=1-O/45;n.frame++;let x=e.get(y)||{x:r,y:c,width:a,height:g,alpha:E};E>x.alpha&&(x.alpha=E),e.set(y,x)}for(let{x:n,y:r,width:c,height:a,alpha:g}of e.values())t.strokeStyle=`rgba(${_},${g})`,t.lineWidth=1,t.beginPath(),t.rect(n,r,c,a),t.stroke(),t.fillStyle=`rgba(${_},${g*.1})`,t.fill();t.font=`11px ${D}`;let u=new Map;t.textRendering="optimizeSpeed";for(let n of s.values()){let r=n[0],{x:c,y:a,frame:g}=r,l=1-g/45,d=S(n),{width:f}=t.measureText(d),p=11;u.set(`${c},${a},${f},${d}`,{text:d,width:f,height:p,alpha:l,x:c,y:a,outlines:n});let O=a-p-4;if(O<0&&(O=0),g>45)for(let w of n)h.delete(String(w.id))}let A=Array.from(u.entries()).sort(([n,r],[c,a])=>X(a.outlines)-X(r.outlines));for(let[n,r]of A)if(u.has(n))for(let[c,a]of u.entries()){if(n===c)continue;let{x:g,y:l,width:d,height:f}=r,{x:p,y:O,width:w,height:y}=a;g+d>p&&p+w>g&&l+f>O&&O+y>l&&(r.text=S(r.outlines.concat(a.outlines)),r.width=t.measureText(r.text).width,u.delete(c))}for(let n of u.values()){let{x:r,y:c,alpha:a,width:g,height:l,text:d}=n,f=c-l-4;f<0&&(f=0),t.fillStyle=`rgba(${_},${a})`,t.fillRect(r,f,g+4,l+4),t.fillStyle=`rgba(255,255,255,${a})`,t.fillText(d,r+2,f+l)}return h.size>0};var m=null,L=null,b=1,T=new Map,C=null,R=()=>{if(!L||!m)return;Y(L,m,b,T)?C=requestAnimationFrame(R):C=null};self.onmessage=t=>{let{type:i}=t.data;if(i==="init"&&(m=t.data.canvas,b=t.data.dpr,m&&(m.width=t.data.width,m.height=t.data.height,L=N(m,b))),!(!m||!L)){if(i==="resize"){b=t.data.dpr,m.width=t.data.width*b,m.height=t.data.height*b,L.resetTransform(),L.scale(b,b),R();return}if(i==="draw-outlines"){let{data:o,names:h}=t.data,s=new Float32Array(o);for(let e=0;e<s.length;e+=7){let u=s[e+2],A=s[e+3],n=s[e+4],r=s[e+5],c=s[e+6],a={id:s[e],name:h[e/7],count:s[e+1],x:u,y:A,width:n,height:r,frame:0,targetX:u,targetY:A,targetWidth:n,targetHeight:r,didCommit:c},g=String(a.id),l=T.get(g);l?(l.count++,l.frame=0,l.targetX=u,l.targetY=A,l.targetWidth=n,l.targetHeight=r,l.didCommit=c):T.set(g,a)}C||(C=requestAnimationFrame(R));return}if(i==="scroll"){let{deltaX:o,deltaY:h}=t.data;for(let s of T.values()){let e=s.x-o,u=s.y-h;s.targetX=e,s.targetY=u}}}};})();\n', je = null, Sr = null, _t = null, De = 1, Tr = null, Xi = /* @__PURE__ */ new Map(), vn = /* @__PURE__ */ new Map(), Lt = /* @__PURE__ */ new Set(), Um = (e) => {
  if (!Jt(e)) return;
  const t = typeof e.type == "string" ? e.type : he(e);
  if (!t) return;
  const n = vn.get(e), r = df(e), o = Ci(e);
  n ? n.count++ : (vn.set(e, {
    name: t,
    count: 1,
    elements: r.map((i) => i.stateNode),
    didCommit: o ? 1 : 0
  }), Lt.add(e));
}, Bm = (e) => {
  const t = e[0];
  if (e.length === 1) return t;
  let n, r, o, i;
  for (let a = 0, l = e.length; a < l; a++) {
    const s = e[a];
    n = n == null ? s.x : Math.min(n, s.x), r = r == null ? s.y : Math.min(r, s.y), o = o == null ? s.x + s.width : Math.max(o, s.x + s.width), i = i == null ? s.y + s.height : Math.max(i, s.y + s.height);
  }
  return n == null || r == null || o == null || i == null ? e[0] : new DOMRect(n, r, o - n, i - r);
};
function Ym(e, t) {
  const n = [];
  for (const r of e) {
    const o = r.target;
    this.seenElements.has(o) || (this.seenElements.add(o), n.push(r));
  }
  n.length > 0 && this.resolveNext && (this.resolveNext(n), this.resolveNext = null), this.seenElements.size === this.uniqueElements.size && (t.disconnect(), this.done = !0, this.resolveNext && this.resolveNext([]));
}
var Mc = function(e) {
  return Dp(this, null, function* () {
    const t = {
      uniqueElements: new Set(e),
      seenElements: /* @__PURE__ */ new Set(),
      resolveNext: null,
      done: !1
    }, n = new IntersectionObserver(Ym.bind(t));
    for (const r of t.uniqueElements)
      n.observe(r);
    for (; !t.done; ) {
      const r = yield new Rl(new Promise(
        (o) => {
          t.resolveNext = o;
        }
      ));
      r.length > 0 && (yield r);
    }
  });
}, Xm = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : ArrayBuffer, Gm = async () => {
  const e = [];
  for (const a of Lt) {
    const l = vn.get(a);
    if (l)
      for (let s = 0; s < l.elements.length; s++)
        l.elements[s] instanceof Element && e.push(l.elements[s]);
  }
  const t = /* @__PURE__ */ new Map();
  try {
    for (var n = Il(Mc(e)), r, o, i; r = !(o = await n.next()).done; r = !1) {
      const a = o.value;
      for (const p of a) {
        const d = p.target, f = p.intersectionRect;
        p.isIntersecting && f.width && f.height && t.set(d, f);
      }
      const l = [], s = [], u = [];
      for (const p of Lt) {
        const d = vn.get(p);
        if (!d) continue;
        const f = [];
        for (let h = 0; h < d.elements.length; h++) {
          const m = d.elements[h], v = t.get(m);
          v && f.push(v);
        }
        f.length && (l.push(d), s.push(Bm(f)), u.push(Pe(p)));
      }
      if (l.length > 0) {
        const p = new Xm(
          l.length * ss * 4
        ), d = new Float32Array(p), f = new Array(l.length);
        let h;
        for (let m = 0, v = l.length; m < v; m++) {
          const w = l[m], g = u[m], { x: y, y: k, width: S, height: T } = s[m], { count: E, name: A, didCommit: I } = w;
          if (je) {
            const N = m * ss;
            d[N] = g, d[N + 1] = E, d[N + 2] = y, d[N + 3] = k, d[N + 4] = S, d[N + 5] = T, d[N + 6] = I, f[m] = A;
          } else
            h || (h = new Array(l.length)), h[m] = {
              id: g,
              name: A,
              count: E,
              x: y,
              y: k,
              width: S,
              height: T,
              didCommit: I
            };
        }
        je ? je.postMessage({
          type: "draw-outlines",
          data: p,
          names: f
        }) : Sr && _t && h && (Lm(Xi, h), Tr || (Tr = requestAnimationFrame(Gi)));
      }
    }
  } catch (a) {
    i = [a];
  } finally {
    try {
      r && (o = n.return) && await o.call(n);
    } finally {
      if (i)
        throw i[0];
    }
  }
  for (const a of Lt)
    vn.delete(a), Lt.delete(a);
}, Gi = () => {
  if (!_t || !Sr) return;
  Wm(_t, Sr, De, Xi) ? Tr = requestAnimationFrame(Gi) : Tr = null;
}, qm = typeof OffscreenCanvas != "undefined" && typeof Worker != "undefined", ds = () => Math.min(window.devicePixelRatio || 1, 2), Km = () => {
  Jm();
  const e = document.createElement("div");
  e.setAttribute("data-react-scan", "true");
  const t = e.attachShadow({ mode: "open" }), n = document.createElement("canvas");
  if (n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.pointerEvents = "none", n.style.zIndex = "2147483646", n.setAttribute("aria-hidden", "true"), t.appendChild(n), !n) return null;
  De = ds(), Sr = n;
  const { innerWidth: r, innerHeight: o } = window;
  n.style.width = `${r}px`, n.style.height = `${o}px`;
  const i = r * De, a = o * De;
  if (n.width = i, n.height = a, qm && !window.__REACT_SCAN_EXTENSION__)
    try {
      je = new Worker(
        URL.createObjectURL(
          new Blob([Hm], { type: "application/javascript" })
        )
      );
      const d = n.transferControlToOffscreen();
      je == null || je.postMessage(
        {
          type: "init",
          canvas: d,
          width: n.width,
          height: n.height,
          dpr: De
        },
        [d]
      );
    } catch (d) {
      console.warn("Failed to initialize OffscreenCanvas worker:", d);
    }
  je || (_t = Vm(n, De));
  let l = !1;
  window.addEventListener("resize", () => {
    l || (l = !0, setTimeout(() => {
      const d = window.innerWidth, f = window.innerHeight;
      De = ds(), n.style.width = `${d}px`, n.style.height = `${f}px`, je ? je.postMessage({
        type: "resize",
        width: d,
        height: f,
        dpr: De
      }) : (n.width = d * De, n.height = f * De, _t && (_t.resetTransform(), _t.scale(De, De)), Gi()), l = !1;
    }));
  });
  let s = window.scrollX, u = window.scrollY, p = !1;
  return window.addEventListener("scroll", () => {
    p || (p = !0, setTimeout(() => {
      const { scrollX: d, scrollY: f } = window, h = d - s, m = f - u;
      s = d, u = f, je ? je.postMessage({
        type: "scroll",
        deltaX: h,
        deltaY: m
      }) : requestAnimationFrame(
        jm.bind(null, Xi, h, m)
      ), p = !1;
    }, 32));
  }), setInterval(() => {
    Lt.size && requestAnimationFrame(Gm);
  }, 32), t.appendChild(n), e;
}, ps = () => globalThis.__REACT_SCAN_STOP__, Jm = () => {
  const e = document.querySelector("[data-react-scan]");
  e && e.remove();
}, Zm = (e) => {
  var t, n;
  if (Jt(e) && te.options.value.showToolbar !== !1 && M.inspectState.value.kind === "focused") {
    const r = e, { selfTime: o } = yt(e), i = he(e.type), a = Pe(r), l = M.reportData.get(a), s = (t = l == null ? void 0 : l.count) != null ? t : 0, u = (n = l == null ? void 0 : l.time) != null ? n : 0, p = [], d = M.changesListeners.get(Pe(e));
    if (d != null && d.length) {
      const h = Tc(
        e
      ).map((g) => ({
        type: 1,
        name: g.name,
        value: g.value,
        prevValue: g.prevValue,
        unstable: !1
      })), m = Cm(e), w = Em(e).map(
        (g) => ({
          name: g.name,
          type: 4,
          value: g.value,
          contextType: g.contextType
        })
      );
      d.forEach((g) => {
        g({
          propsChanges: h,
          stateChanges: m,
          contextChanges: w
        });
      });
    }
    const f = {
      count: s + 1,
      time: u + o || 0,
      renders: [],
      displayName: i,
      type: Et(e.type) || null,
      changes: p
    };
    M.reportData.set(a, f), ci = !0;
  }
}, ci = !1, fs, Qm = () => {
  clearInterval(fs), fs = setInterval(() => {
    ci && (M.lastReportTime.value = Date.now(), ci = !1);
  }, 50);
}, eg = (e) => !Uv.has(e.memoizedProps), tg = (e) => {
  if (ps()) return;
  let t, n = !1;
  const r = () => {
    n || (t && cancelAnimationFrame(t), t = requestAnimationFrame(() => {
      n = !0;
      const i = Km();
      i && document.documentElement.appendChild(i), e();
    }));
  }, o = Am("react-scan-devtools-0.1.0", {
    onCommitStart: () => {
      var i, a;
      (a = (i = te.options.value).onCommitStart) == null || a.call(i);
    },
    onActive: () => {
      ps() || (r(), window.__REACT_SCAN_EXTENSION__ || (globalThis.__REACT_SCAN__ = {
        ReactScanInternals: te
      }), Qm(), Om());
    },
    onError: () => {
    },
    isValidFiber: eg,
    onRender: (i, a) => {
      var l, s, u, p;
      Jt(i) && ((l = M.interactionListeningForRenders) == null || l.call(M, i, a));
      const d = (s = te.instrumentation) == null ? void 0 : s.isPaused.value, f = M.inspectState.value.kind === "inspect-off" || M.inspectState.value.kind === "uninitialized";
      d && f || (d || Um(i), te.options.value.log && Pm(a), M.inspectState.value.kind === "focused" && (Li.value = Date.now()), f || Zm(i), (p = (u = te.options.value).onRender) == null || p.call(u, i, a));
    },
    onCommitFinish: () => {
      var i, a;
      r(), (a = (i = te.options.value).onCommitFinish) == null || a.call(i);
    },
    onPostCommitFiberRoot() {
      r();
    },
    trackChanges: !1
  });
  te.instrumentation = o;
}, ng = `*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
.\\!container {
  width: 100% !important;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .\\!container {
    max-width: 640px !important;
  }

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .\\!container {
    max-width: 768px !important;
  }

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .\\!container {
    max-width: 1024px !important;
  }

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .\\!container {
    max-width: 1280px !important;
  }

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .\\!container {
    max-width: 1536px !important;
  }

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}
.visible {
  visibility: visible;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.inset-0 {
  inset: 0px;
}
.inset-x-1 {
  left: 4px;
  right: 4px;
}
.inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.-right-1 {
  right: -4px;
}
.-right-2\\.5 {
  right: -10px;
}
.-top-1 {
  top: -4px;
}
.-top-2\\.5 {
  top: -10px;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-4 {
  bottom: 16px;
}
.left-0 {
  left: 0px;
}
.left-3 {
  left: 12px;
}
.right-0 {
  right: 0px;
}
.right-0\\.5 {
  right: 2px;
}
.right-2 {
  right: 8px;
}
.right-4 {
  right: 16px;
}
.top-0 {
  top: 0px;
}
.top-0\\.5 {
  top: 2px;
}
.top-1\\/2 {
  top: 50%;
}
.top-2 {
  top: 8px;
}
.z-10 {
  z-index: 10;
}
.z-100 {
  z-index: 100;
}
.z-50 {
  z-index: 50;
}
.z-\\[124124124124\\] {
  z-index: 124124124124;
}
.z-\\[214748365\\] {
  z-index: 214748365;
}
.z-\\[214748367\\] {
  z-index: 214748367;
}
.m-\\[2px\\] {
  margin: 2px;
}
.mx-0\\.5 {
  margin-left: 2px;
  margin-right: 2px;
}
.\\!ml-0 {
  margin-left: 0px !important;
}
.mb-1\\.5 {
  margin-bottom: 6px;
}
.mb-2 {
  margin-bottom: 8px;
}
.mb-3 {
  margin-bottom: 12px;
}
.mb-4 {
  margin-bottom: 16px;
}
.mb-px {
  margin-bottom: 1px;
}
.ml-1 {
  margin-left: 4px;
}
.ml-1\\.5 {
  margin-left: 6px;
}
.ml-auto {
  margin-left: auto;
}
.mr-0\\.5 {
  margin-right: 2px;
}
.mr-1 {
  margin-right: 4px;
}
.mr-1\\.5 {
  margin-right: 6px;
}
.mr-16 {
  margin-right: 64px;
}
.mr-auto {
  margin-right: auto;
}
.mt-0\\.5 {
  margin-top: 2px;
}
.mt-1 {
  margin-top: 4px;
}
.mt-4 {
  margin-top: 16px;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.table {
  display: table;
}
.hidden {
  display: none;
}
.aspect-square {
  aspect-ratio: 1 / 1;
}
.h-1 {
  height: 4px;
}
.h-1\\.5 {
  height: 6px;
}
.h-10 {
  height: 40px;
}
.h-12 {
  height: 48px;
}
.h-4 {
  height: 16px;
}
.h-4\\/5 {
  height: 80%;
}
.h-6 {
  height: 24px;
}
.h-7 {
  height: 28px;
}
.h-8 {
  height: 32px;
}
.h-\\[150px\\] {
  height: 150px;
}
.h-\\[235px\\] {
  height: 235px;
}
.h-\\[28px\\] {
  height: 28px;
}
.h-\\[48px\\] {
  height: 48px;
}
.h-\\[50px\\] {
  height: 50px;
}
.h-\\[calc\\(100\\%-150px\\)\\] {
  height: calc(100% - 150px);
}
.h-\\[calc\\(100\\%-200px\\)\\] {
  height: calc(100% - 200px);
}
.h-\\[calc\\(100\\%-25px\\)\\] {
  height: calc(100% - 25px);
}
.h-\\[calc\\(100\\%-40px\\)\\] {
  height: calc(100% - 40px);
}
.h-\\[calc\\(100\\%-48px\\)\\] {
  height: calc(100% - 48px);
}
.h-fit {
  height: -moz-fit-content;
  height: fit-content;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.max-h-0 {
  max-height: 0px;
}
.max-h-40 {
  max-height: 160px;
}
.max-h-9 {
  max-height: 36px;
}
.min-h-9 {
  min-height: 36px;
}
.min-h-\\[48px\\] {
  min-height: 48px;
}
.min-h-fit {
  min-height: -moz-fit-content;
  min-height: fit-content;
}
.w-1 {
  width: 4px;
}
.w-1\\/2 {
  width: 50%;
}
.w-1\\/3 {
  width: 33.333333%;
}
.w-2\\/4 {
  width: 50%;
}
.w-3 {
  width: 12px;
}
.w-4 {
  width: 16px;
}
.w-4\\/5 {
  width: 80%;
}
.w-6 {
  width: 24px;
}
.w-80 {
  width: 320px;
}
.w-\\[20px\\] {
  width: 20px;
}
.w-\\[72px\\] {
  width: 72px;
}
.w-\\[90\\%\\] {
  width: 90%;
}
.w-\\[calc\\(100\\%-200px\\)\\] {
  width: calc(100% - 200px);
}
.w-fit {
  width: -moz-fit-content;
  width: fit-content;
}
.w-full {
  width: 100%;
}
.w-px {
  width: 1px;
}
.w-screen {
  width: 100vw;
}
.min-w-0 {
  min-width: 0px;
}
.min-w-\\[200px\\] {
  min-width: 200px;
}
.min-w-fit {
  min-width: -moz-fit-content;
  min-width: fit-content;
}
.max-w-md {
  max-width: 448px;
}
.flex-1 {
  flex: 1 1 0%;
}
.shrink-0 {
  flex-shrink: 0;
}
.grow {
  flex-grow: 1;
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-\\[200\\%\\] {
  --tw-translate-y: -200%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-1 {
  --tw-translate-y: 4px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-rotate-90 {
  --tw-rotate: -90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-110 {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes fadeIn {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn ease-in forwards;
}
.cursor-default {
  cursor: default;
}
.cursor-e-resize {
  cursor: e-resize;
}
.cursor-ew-resize {
  cursor: ew-resize;
}
.cursor-move {
  cursor: move;
}
.cursor-nesw-resize {
  cursor: nesw-resize;
}
.cursor-ns-resize {
  cursor: ns-resize;
}
.cursor-nwse-resize {
  cursor: nwse-resize;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-w-resize {
  cursor: w-resize;
}
.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.resize {
  resize: both;
}
.appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.flex-col {
  flex-direction: column;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-stretch {
  align-items: stretch;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-0\\.5 {
  gap: 2px;
}
.gap-1 {
  gap: 4px;
}
.gap-1\\.5 {
  gap: 6px;
}
.gap-2 {
  gap: 8px;
}
.gap-4 {
  gap: 16px;
}
.gap-x-0\\.5 {
  -moz-column-gap: 2px;
       column-gap: 2px;
}
.gap-x-1 {
  -moz-column-gap: 4px;
       column-gap: 4px;
}
.gap-x-1\\.5 {
  -moz-column-gap: 6px;
       column-gap: 6px;
}
.gap-x-2 {
  -moz-column-gap: 8px;
       column-gap: 8px;
}
.gap-x-3 {
  -moz-column-gap: 12px;
       column-gap: 12px;
}
.gap-x-4 {
  -moz-column-gap: 16px;
       column-gap: 16px;
}
.gap-y-0\\.5 {
  row-gap: 2px;
}
.gap-y-1 {
  row-gap: 4px;
}
.gap-y-2 {
  row-gap: 8px;
}
.gap-y-4 {
  row-gap: 16px;
}
.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(6px * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(6px * var(--tw-space-y-reverse));
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-zinc-800 > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-divide-opacity, 1));
}
.place-self-center {
  place-self: center;
}
.self-end {
  align-self: flex-end;
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.\\!overflow-visible {
  overflow: visible !important;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.text-wrap {
  text-wrap: wrap;
}
.break-words {
  overflow-wrap: break-word;
}
.break-all {
  word-break: break-all;
}
.rounded {
  border-radius: 4px;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 8px;
}
.rounded-md {
  border-radius: 6px;
}
.rounded-sm {
  border-radius: 2px;
}
.rounded-l-md {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.rounded-l-sm {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.rounded-r-md {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.rounded-r-sm {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.rounded-t-lg {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.rounded-t-sm {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
.rounded-bl-lg {
  border-bottom-left-radius: 8px;
}
.rounded-br-lg {
  border-bottom-right-radius: 8px;
}
.rounded-tl-lg {
  border-top-left-radius: 8px;
}
.rounded-tr-lg {
  border-top-right-radius: 8px;
}
.border {
  border-width: 1px;
}
.border-4 {
  border-width: 4px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-l {
  border-left-width: 1px;
}
.border-l-0 {
  border-left-width: 0px;
}
.border-l-1 {
  border-left-width: 1px;
}
.border-r {
  border-right-width: 1px;
}
.border-t {
  border-top-width: 1px;
}
.border-none {
  border-style: none;
}
.\\!border-red-500 {
  --tw-border-opacity: 1 !important;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1)) !important;
}
.border-\\[\\#1e1e1e\\] {
  --tw-border-opacity: 1;
  border-color: rgb(30 30 30 / var(--tw-border-opacity, 1));
}
.border-\\[\\#222\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
}
.border-\\[\\#27272A\\] {
  --tw-border-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-border-opacity, 1));
}
.border-\\[\\#333\\] {
  --tw-border-opacity: 1;
  border-color: rgb(51 51 51 / var(--tw-border-opacity, 1));
}
.border-transparent {
  border-color: transparent;
}
.border-zinc-800 {
  --tw-border-opacity: 1;
  border-color: rgb(39 39 42 / var(--tw-border-opacity, 1));
}
.bg-\\[\\#0A0A0A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(10 10 10 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#141414\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(20 20 20 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#18181B\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#18181B\\]\\/50 {
  background-color: rgb(24 24 27 / 0.5);
}
.bg-\\[\\#1D3A66\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(29 58 102 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1E1E1E\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(30 30 30 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1a2a1a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(26 42 26 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#1e1e1e\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(30 30 30 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#214379d4\\] {
  background-color: #214379d4;
}
.bg-\\[\\#27272A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#2a1515\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(42 21 21 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#412162\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(65 33 98 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#44444a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(68 68 74 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#4b4b4b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(75 75 75 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#5f3f9a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(95 63 154 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#5f3f9a\\]\\/40 {
  background-color: rgb(95 63 154 / 0.4);
}
.bg-\\[\\#6a369e\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(106 54 158 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#7521c8\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(117 33 200 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#8e61e3\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(142 97 227 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#EFD81A\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(239 216 26 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#b77116\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(183 113 22 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#b94040\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(185 64 64 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#d36cff\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(211 108 255 / var(--tw-bg-opacity, 1));
}
.bg-\\[\\#efd81a6b\\] {
  background-color: #efd81a6b;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}
.bg-black\\/40 {
  background-color: rgb(0 0 0 / 0.4);
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.bg-green-500\\/50 {
  background-color: rgb(34 197 94 / 0.5);
}
.bg-green-500\\/60 {
  background-color: rgb(34 197 94 / 0.6);
}
.bg-neutral-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(64 64 64 / var(--tw-bg-opacity, 1));
}
.bg-purple-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity, 1));
}
.bg-purple-500\\/90 {
  background-color: rgb(168 85 247 / 0.9);
}
.bg-purple-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 33 168 / var(--tw-bg-opacity, 1));
}
.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.bg-red-500\\/90 {
  background-color: rgb(239 68 68 / 0.9);
}
.bg-red-950\\/50 {
  background-color: rgb(69 10 10 / 0.5);
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.bg-yellow-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 224 71 / var(--tw-bg-opacity, 1));
}
.bg-zinc-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1));
}
.bg-zinc-900\\/30 {
  background-color: rgb(24 24 27 / 0.3);
}
.bg-zinc-900\\/50 {
  background-color: rgb(24 24 27 / 0.5);
}
.p-0 {
  padding: 0px;
}
.p-1 {
  padding: 4px;
}
.p-2 {
  padding: 8px;
}
.p-3 {
  padding: 12px;
}
.p-4 {
  padding: 16px;
}
.p-5 {
  padding: 20px;
}
.p-6 {
  padding: 24px;
}
.px-1 {
  padding-left: 4px;
  padding-right: 4px;
}
.px-1\\.5 {
  padding-left: 6px;
  padding-right: 6px;
}
.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}
.px-2\\.5 {
  padding-left: 10px;
  padding-right: 10px;
}
.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}
.px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
.py-0\\.5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}
.py-1\\.5 {
  padding-top: 6px;
  padding-bottom: 6px;
}
.py-2 {
  padding-top: 8px;
  padding-bottom: 8px;
}
.py-3 {
  padding-top: 12px;
  padding-bottom: 12px;
}
.py-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}
.py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
}
.py-\\[3px\\] {
  padding-top: 3px;
  padding-bottom: 3px;
}
.py-\\[5px\\] {
  padding-top: 5px;
  padding-bottom: 5px;
}
.pb-2 {
  padding-bottom: 8px;
}
.pl-1 {
  padding-left: 4px;
}
.pl-2 {
  padding-left: 8px;
}
.pl-2\\.5 {
  padding-left: 10px;
}
.pl-3 {
  padding-left: 12px;
}
.pl-5 {
  padding-left: 20px;
}
.pl-6 {
  padding-left: 24px;
}
.pr-1 {
  padding-right: 4px;
}
.pr-1\\.5 {
  padding-right: 6px;
}
.pr-2 {
  padding-right: 8px;
}
.pr-2\\.5 {
  padding-right: 10px;
}
.pt-0 {
  padding-top: 0px;
}
.pt-2 {
  padding-top: 8px;
}
.pt-5 {
  padding-top: 20px;
}
.text-left {
  text-align: left;
}
.font-mono {
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
}
.text-\\[10px\\] {
  font-size: 10px;
}
.text-\\[11px\\] {
  font-size: 11px;
}
.text-\\[13px\\] {
  font-size: 13px;
}
.text-\\[14px\\] {
  font-size: 14px;
}
.text-\\[17px\\] {
  font-size: 17px;
}
.text-\\[8px\\] {
  font-size: 8px;
}
.text-sm {
  font-size: 14px;
  line-height: 20px;
}
.text-xs {
  font-size: 12px;
  line-height: 16px;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.uppercase {
  text-transform: uppercase;
}
.lowercase {
  text-transform: lowercase;
}
.capitalize {
  text-transform: capitalize;
}
.italic {
  font-style: italic;
}
.leading-6 {
  line-height: 24px;
}
.leading-none {
  line-height: 1;
}
.tracking-wide {
  letter-spacing: 0.025em;
}
.text-\\[\\#4ade80\\] {
  --tw-text-opacity: 1;
  color: rgb(74 222 128 / var(--tw-text-opacity, 1));
}
.text-\\[\\#5a5a5a\\] {
  --tw-text-opacity: 1;
  color: rgb(90 90 90 / var(--tw-text-opacity, 1));
}
.text-\\[\\#65656D\\] {
  --tw-text-opacity: 1;
  color: rgb(101 101 109 / var(--tw-text-opacity, 1));
}
.text-\\[\\#666\\] {
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity, 1));
}
.text-\\[\\#6E6E77\\] {
  --tw-text-opacity: 1;
  color: rgb(110 110 119 / var(--tw-text-opacity, 1));
}
.text-\\[\\#6F6F78\\] {
  --tw-text-opacity: 1;
  color: rgb(111 111 120 / var(--tw-text-opacity, 1));
}
.text-\\[\\#7346a0\\] {
  --tw-text-opacity: 1;
  color: rgb(115 70 160 / var(--tw-text-opacity, 1));
}
.text-\\[\\#737373\\] {
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}
.text-\\[\\#888\\] {
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
}
.text-\\[\\#8E61E3\\] {
  --tw-text-opacity: 1;
  color: rgb(142 97 227 / var(--tw-text-opacity, 1));
}
.text-\\[\\#999\\] {
  --tw-text-opacity: 1;
  color: rgb(153 153 153 / var(--tw-text-opacity, 1));
}
.text-\\[\\#A1A1AA\\] {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity, 1));
}
.text-\\[\\#A855F7\\] {
  --tw-text-opacity: 1;
  color: rgb(168 85 247 / var(--tw-text-opacity, 1));
}
.text-\\[\\#E4E4E7\\] {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity, 1));
}
.text-\\[\\#d36cff\\] {
  --tw-text-opacity: 1;
  color: rgb(211 108 255 / var(--tw-text-opacity, 1));
}
.text-\\[\\#f87171\\] {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.text-gray-100 {
  --tw-text-opacity: 1;
  color: rgb(243 244 246 / var(--tw-text-opacity, 1));
}
.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity, 1));
}
.text-neutral-300 {
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
}
.text-neutral-400 {
  --tw-text-opacity: 1;
  color: rgb(163 163 163 / var(--tw-text-opacity, 1));
}
.text-neutral-500 {
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}
.text-purple-400 {
  --tw-text-opacity: 1;
  color: rgb(192 132 252 / var(--tw-text-opacity, 1));
}
.text-red-300 {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity, 1));
}
.text-red-400 {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity, 1));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.text-white\\/30 {
  color: rgb(255 255 255 / 0.3);
}
.text-white\\/70 {
  color: rgb(255 255 255 / 0.7);
}
.text-yellow-300 {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity, 1));
}
.text-yellow-500 {
  --tw-text-opacity: 1;
  color: rgb(234 179 8 / var(--tw-text-opacity, 1));
}
.text-zinc-200 {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity, 1));
}
.text-zinc-400 {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity, 1));
}
.text-zinc-500 {
  --tw-text-opacity: 1;
  color: rgb(113 113 122 / var(--tw-text-opacity, 1));
}
.text-zinc-600 {
  --tw-text-opacity: 1;
  color: rgb(82 82 91 / var(--tw-text-opacity, 1));
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.opacity-50 {
  opacity: 0.5;
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline {
  outline-style: solid;
}
.ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.ring-white\\/\\[0\\.08\\] {
  --tw-ring-color: rgb(255 255 255 / 0.08);
}
.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.\\!filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow) !important;
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[border-radius\\] {
  transition-property: border-radius;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[color\\2c transform\\] {
  transition-property: color,transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[max-height\\] {
  transition-property: max-height;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-\\[opacity\\] {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-none {
  transition-property: none;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.delay-0 {
  transition-delay: 0s;
}
.delay-150 {
  transition-delay: 150ms;
}
.delay-300 {
  transition-delay: 300ms;
}
.\\!duration-0 {
  transition-duration: 0s !important;
}
.duration-0 {
  transition-duration: 0s;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-\\[cubic-bezier\\(0\\.23\\2c 1\\2c 0\\.32\\2c 1\\)\\] {
  transition-timing-function: cubic-bezier(0.23,1,0.32,1);
}
.ease-\\[cubic-bezier\\(0\\.25\\2c 0\\.1\\2c 0\\.25\\2c 1\\)\\] {
  transition-timing-function: cubic-bezier(0.25,0.1,0.25,1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.will-change-transform {
  will-change: transform;
}
.animation-duration-300 {
  animation-duration: .3s;
}
.animation-delay-300 {
  animation-delay: .3s;
}
.\\[touch-action\\:none\\] {
  touch-action: none;
}

* {
  outline: none !important;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;

  /* WebKit (Chrome, Safari, Edge) specific scrollbar styles */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}

@-moz-document url-prefix() {
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
    scrollbar-width: 6px;
  }
}

button:hover {
  background-image: none;
}

button {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-style: none;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-timing-function: linear;
  cursor: pointer;
}

input {
  border-style: none;
  background-color: transparent;
  background-image: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

input::-moz-placeholder {
  font-size: 12px;
  line-height: 16px;
  font-style: italic;
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}

input::placeholder {
  font-size: 12px;
  line-height: 16px;
  font-style: italic;
  --tw-text-opacity: 1;
  color: rgb(115 115 115 / var(--tw-text-opacity, 1));
}

input:-moz-placeholder-shown {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input:placeholder-shown {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

svg {
  height: auto;
  width: auto;
  pointer-events: none;
}

/*
  Using CSS content with data attributes is more performant than:
  1. React re-renders with JSX text content
  2. Direct DOM manipulation methods:
     - element.textContent (creates/updates text nodes, triggers repaint)
     - element.innerText (triggers reflow by computing styles & layout)
     - element.innerHTML (heavy parsing, triggers reflow, security risks)
  3. Multiple data attributes with complex CSS concatenation

  This approach:
  - Avoids React reconciliation
  - Uses browser's native CSS engine (optimized content updates)
  - Minimizes main thread work
  - Reduces DOM operations
  - Avoids forced reflows (layout recalculation)
  - Only triggers necessary repaints
  - Keeps pseudo-element updates in render layer
*/
.with-data-text {
  overflow: hidden;
  &::before {
    content: attr(data-text);
  }
  &::before {
    display: block;
  }
  &::before {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

#react-scan-toolbar {
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  font-size: 13px;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: move;
  opacity: 0;
  z-index: 2147483678;
}

@keyframes fadeIn {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

#react-scan-toolbar {
  animation: fadeIn ease-in forwards;
  animation-duration: .3s;
  animation-delay: .3s;
  --tw-shadow: 0 4px 12px rgba(0,0,0,0.2);
  --tw-shadow-colored: 0 4px 12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  place-self: start;

  /* [CURSOR GENERATED] Anti-blur fixes:
   * We removed will-change-transform and replaced it with these properties
   * because will-change was causing stacking context issues and inconsistent
   * text rendering. The new properties work together to force proper
   * GPU acceleration without z-index side effects:
   */
  transform: translate3d(
    0,
    0,
    0
  ); /* Forces GPU acceleration without causing stacking issues */
  backface-visibility: hidden; /* Prevents blurry text during transforms */
  perspective: 1000; /* Creates proper 3D context for crisp text */ /* Ensures consistent text rendering across browsers */
  transform-style: preserve-3d;
}

.button {
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
}

.resize-line-wrapper {
  position: absolute;
  overflow: hidden;
}

.resize-line {
  position: absolute;
  inset: 0px;
  overflow: hidden;
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  svg {
    position: absolute;
  }

  svg {
    top: 50%;
  }

  svg {
    left: 50%;
  }

  svg {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-right,
.resize-left {
  top: 0px;
  bottom: 0px;
  width: 24px;
  cursor: ew-resize;

  .resize-line-wrapper {
    top: 0px;
    bottom: 0px;
  }

  .resize-line-wrapper {
    width: 50%;
  }

  &:hover {
    .resize-line {
      --tw-translate-x: 0px;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }
}
.resize-right {
  right: 0px;
  --tw-translate-x: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    right: 0px;
  }
  .resize-line {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .resize-line {
    --tw-translate-x: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-left {
  left: 0px;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    left: 0px;
  }
  .resize-line {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .resize-line {
    --tw-translate-x: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-top,
.resize-bottom {
  left: 0px;
  right: 0px;
  height: 24px;
  cursor: ns-resize;

  .resize-line-wrapper {
    left: 0px;
    right: 0px;
  }

  .resize-line-wrapper {
    height: 50%;
  }

  &:hover {
    .resize-line {
      --tw-translate-y: 0px;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }
}
.resize-top {
  top: 0px;
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    top: 0px;
  }
  .resize-line {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .resize-line {
    --tw-translate-y: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.resize-bottom {
  bottom: 0px;
  --tw-translate-y: 50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));

  .resize-line-wrapper {
    bottom: 0px;
  }
  .resize-line {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .resize-line {
    --tw-translate-y: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-header {
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 12px;
  padding-right: 8px;
  min-height: 36px;
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
  overflow: hidden;
  white-space: nowrap;
}

.react-scan-replay-button,
.react-scan-close-button {
  display: flex;
  align-items: center;
  padding: 4px;
  min-width: -moz-fit-content;
  min-width: fit-content;
  border-radius: 4px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.react-scan-replay-button {
  position: relative;
  overflow: hidden;
  background-color: rgb(168 85 247 / 0.5) !important;

  &:hover {
    background-color: rgb(168 85 247 / 0.25);
  }

  &.disabled {
    opacity: 0.5;
  }

  &.disabled {
    pointer-events: none;
  }

  &:before {
    content: "";
  }

  &:before {
    position: absolute;
  }

  &:before {
    inset: 0px;
  }

  &:before {
    --tw-translate-x: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &:before {
    animation: shimmer 2s infinite;
    background: linear-gradient(
      to right,
      transparent,
      rgba(142, 97, 227, 0.3),
      transparent
    );
  }
}

.react-scan-close-button {
  background-color: rgb(255 255 255 / 0.1);

  &:hover {
    background-color: rgb(255 255 255 / 0.15);
  }
}

@keyframes shimmer {
  100% {
    --tw-translate-x: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-section-header {
  position: sticky;
  z-index: 100;
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 12px;
  padding-right: 12px;
  height: 28px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(34 34 34 / var(--tw-border-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(10 10 10 / var(--tw-bg-opacity, 1));
}

.react-scan-section {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));
}

.react-scan-section::before {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
  --tw-content: attr(data-section);
  content: var(--tw-content);
}

.react-scan-section {
  font-size: 12px;
  line-height: 16px;

  > .react-scan-property {
    margin-left: -14px;
  }
}

.react-scan-property {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  border-left-width: 1px;
  border-color: transparent;
  overflow: hidden;
}

.react-scan-property-content {
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  min-height: 28px;
  max-width: 100%;
  overflow: hidden;
}

.react-scan-string {
  color: #9ecbff;
}

.react-scan-number {
  color: #79c7ff;
}

.react-scan-boolean {
  color: #56b6c2;
}

.react-scan-key {
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  white-space: nowrap;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.react-scan-input {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.react-scan-arrow {
  position: absolute;
  top: 0px;
  left: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 28px;
  width: 24px;
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  z-index: 10;

  > svg {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
}

.react-scan-expandable {
  display: grid;
  grid-template-rows: 0fr;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 75ms;

  &.react-scan-expanded {
    grid-template-rows: 1fr;
  }

  &.react-scan-expanded {
    transition-duration: 100ms;
  }
}

.react-scan-nested {
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
  }

  &:before {
    position: absolute;
  }

  &:before {
    top: 0px;
  }

  &:before {
    left: 0px;
  }

  &:before {
    height: 100%;
  }

  &:before {
    width: 1px;
  }

  &:before {
    background-color: rgb(107 114 128 / 0.3);
  }
}

.react-scan-settings {
  position: absolute;
  inset: 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  --tw-text-opacity: 1;
  color: rgb(136 136 136 / var(--tw-text-opacity, 1));

  > div {
    display: flex;
  }

  > div {
    align-items: center;
  }

  > div {
    justify-content: space-between;
  }

  > div {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }
}

.react-scan-preview-line {
  position: relative;
  display: flex;
  min-height: 28px;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
}

.react-scan-flash-overlay {
  position: absolute;
  inset: 0px;
  opacity: 0;
  z-index: 50;
  pointer-events: none;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  mix-blend-mode: multiply;
  background-color: rgb(168 85 247 / 0.9);
}

.react-scan-toggle {
  position: relative;
  display: inline-flex;
  height: 24px;
  width: 40px;

  input {
    position: absolute;
  }

  input {
    inset: 0px;
  }

  input {
    z-index: 20;
  }

  input {
    opacity: 0;
  }

  input {
    cursor: pointer;
  }

  input {
    height: 100%;
  }

  input {
    width: 100%;
  }

  input:checked {
    + div {
      --tw-bg-opacity: 1;
      background-color: rgb(95 63 154 / var(--tw-bg-opacity, 1));
    }
    + div {

      &::before {
        --tw-translate-x: 100%;
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }

      &::before {
        left: auto;
      }

      &::before {
        --tw-border-opacity: 1;
        border-color: rgb(95 63 154 / var(--tw-border-opacity, 1));
      }
    }
  }

  > div {
    position: absolute;
  }

  > div {
    inset: 4px;
  }

  > div {
    --tw-bg-opacity: 1;
    background-color: rgb(64 64 64 / var(--tw-bg-opacity, 1));
  }

  > div {
    border-radius: 9999px;
  }

  > div {
    pointer-events: none;
  }

  > div {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }

  > div {

    &:before {
      --tw-content: '';
      content: var(--tw-content);
    }

    &:before {
      position: absolute;
    }

    &:before {
      top: 50%;
    }

    &:before {
      left: 0px;
    }

    &:before {
      --tw-translate-y: -50%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }

    &:before {
      height: 16px;
    }

    &:before {
      width: 16px;
    }

    &:before {
      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
    }

    &:before {
      border-width: 2px;
    }

    &:before {
      --tw-border-opacity: 1;
      border-color: rgb(64 64 64 / var(--tw-border-opacity, 1));
    }

    &:before {
      border-radius: 9999px;
    }

    &:before {
      --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }

    &:before {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    &:before {
      transition-duration: 300ms;
    }
  }
}

.react-scan-flash-active {
  opacity: 0.4;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.react-scan-inspector-overlay {
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
}

.react-scan-what-changed {
  ul {
    list-style-type: disc;
  }
  ul {
    padding-left: 16px;
  }

  li {
    white-space: nowrap;
  }

  li {
    > div {
      display: flex;
    }
    > div {
      align-items: center;
    }
    > div {
      justify-content: space-between;
    }
    > div {
      -moz-column-gap: 8px;
           column-gap: 8px;
    }
  }
}

.count-badge {
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
  --tw-text-opacity: 1;
  color: rgb(168 85 247 / var(--tw-text-opacity, 1));
  background-color: rgb(168 85 247 / 0.1);
  transform-origin: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 150ms;
  transition-duration: 300ms;
}

@keyframes countFlash {

  0% {
    background-color: rgba(168, 85, 247, 0.3);
    transform: scale(1.05);
  }

  100% {
    background-color: rgba(168, 85, 247, 0.1);
    transform: scale(1);
  }
}

.count-flash {
  animation: countFlash .3s ease-out forwards;
}

@keyframes countFlashShake {

  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  50% {
    transform: translateX(5px) scale(1.1);
  }

  75% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}

.count-flash-white {
  animation: countFlashShake .3s ease-out forwards;
  transition-delay: 500ms !important;
}

.change-scope {
  display: flex;
  align-items: center;
  -moz-column-gap: 4px;
       column-gap: 4px;
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity, 1));
  font-size: 12px;
  line-height: 16px;
  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;

  > div {
    padding-left: 6px;
    padding-right: 6px;
  }

  > div {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  > div {
    transform-origin: center;
  }

  > div {
    border-radius: 4px;
  }

  > div {
    font-size: 12px;
    line-height: 16px;
  }

  > div {
    font-weight: 500;
  }

  > div {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
  }

  > div {
    transform-origin: center;
  }

  > div {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > div {
    transition-delay: 150ms;
  }

  > div {
    transition-duration: 300ms;
  }

  > div {

    &[data-flash="true"] {
      background-color: rgb(168 85 247 / 0.1);
    }

    &[data-flash="true"] {
      --tw-text-opacity: 1;
      color: rgb(168 85 247 / var(--tw-text-opacity, 1));
    }
  }
}

.react-scan-slider {
  position: relative;
  min-height: 24px;

  > input {
    position: absolute;
  }

  > input {
    inset: 0px;
  }

  > input {
    opacity: 0;
  }

  &:before {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:before {
    position: absolute;
  }

  &:before {
    left: 0px;
    right: 0px;
  }

  &:before {
    top: 50%;
  }

  &:before {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &:before {
    height: 6px;
  }

  &:before {
    background-color: rgb(142 97 227 / 0.4);
  }

  &:before {
    border-radius: 8px;
  }

  &:before {
    pointer-events: none;
  }

  &:after {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:after {
    position: absolute;
  }

  &:after {
    left: 0px;
    right: 0px;
  }

  &:after {
    top: -8px;
    bottom: -8px;
  }

  &:after {
    z-index: -10;
  }

  span {
    position: absolute;
  }

  span {
    left: 0px;
  }

  span {
    top: 50%;
  }

  span {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  span {
    height: 10px;
  }

  span {
    width: 10px;
  }

  span {
    border-radius: 8px;
  }

  span {
    --tw-bg-opacity: 1;
    background-color: rgb(142 97 227 / var(--tw-bg-opacity, 1));
  }

  span {
    pointer-events: none;
  }

  span {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  span {
    transition-duration: 75ms;
  }
}

.resize-v-line {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4px;
  max-width: 4px;
  height: 100%;
  width: 100%;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover,
  &:active {
    > span {
      --tw-bg-opacity: 1;
      background-color: rgb(34 34 34 / var(--tw-bg-opacity, 1));
    }

    svg {
      opacity: 1;
    }
  }

  &::before {
    --tw-content: "";
    content: var(--tw-content);
  }

  &::before {
    position: absolute;
  }

  &::before {
    inset: 0px;
  }

  &::before {
    left: 50%;
  }

  &::before {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &::before {
    width: 1px;
  }

  &::before {
    --tw-bg-opacity: 1;
    background-color: rgb(34 34 34 / var(--tw-bg-opacity, 1));
  }

  &::before {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  > span {
    position: absolute;
  }

  > span {
    left: 50%;
  }

  > span {
    top: 50%;
  }

  > span {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  > span {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  > span {
    height: 18px;
  }

  > span {
    width: 6px;
  }

  > span {
    border-radius: 4px;
  }

  > span {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  svg {
    position: absolute;
  }

  svg {
    left: 50%;
  }

  svg {
    top: 50%;
  }

  svg {
    --tw-translate-x: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-rotate: 90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  svg {
    --tw-text-opacity: 1;
    color: rgb(163 163 163 / var(--tw-text-opacity, 1));
  }

  svg {
    opacity: 0;
  }

  svg {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  svg {
    z-index: 50;
  }
}

.tree-node-search-highlight {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    padding-top: 1px;
    padding-bottom: 1px;
  }

  span {
    border-radius: 2px;
  }

  span {
    --tw-bg-opacity: 1;
    background-color: rgb(253 224 71 / var(--tw-bg-opacity, 1));
  }

  span {
    font-weight: 500;
  }

  span {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity, 1));
  }

  .single {
    margin-right: 1px;
  }

  .single {
    padding-left: 2px;
    padding-right: 2px;
  }

  .regex {
    padding-left: 2px;
    padding-right: 2px;
  }

  .start {
    margin-left: 1px;
  }

  .start {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .end {
    margin-right: 1px;
  }

  .end {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .middle {
    margin-left: 1px;
    margin-right: 1px;
  }

  .middle {
    border-radius: 2px;
  }
}

.react-scan-toolbar-notification {
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  -moz-column-gap: 8px;
       column-gap: 8px;
  padding: 4px;
  padding-left: 8px;
  font-size: 10px;
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
  background-color: rgb(0 0 0 / 0.9);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:before {
    --tw-content: '';
    content: var(--tw-content);
  }

  &:before {
    position: absolute;
  }

  &:before {
    left: 0px;
    right: 0px;
  }

  &:before {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
  }

  &:before {
    height: 8px;
  }

  &.position-top {
    top: 100%;
  }

  &.position-top {
    --tw-translate-y: -100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &.position-top {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &.position-top {

    &::before {
      top: 0px;
    }

    &::before {
      --tw-translate-y: -100%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }

  &.position-bottom {
    bottom: 100%;
  }

  &.position-bottom {
    --tw-translate-y: 100%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  &.position-bottom {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &.position-bottom {

    &::before {
      bottom: 0px;
    }

    &::before {
      --tw-translate-y: 100%;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
  }

  &.is-open {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-header-item {
  position: absolute;
  inset: 0px;
  --tw-translate-y: -200%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &.is-visible {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.react-scan-components-tree:has(.resize-v-line:hover, .resize-v-line:active)
  .tree {
  overflow: hidden;
}

.react-scan-expandable {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 75ms;
  transition-timing-function: ease-out;

  > * {
    min-height: 0;
  }

  &.react-scan-expanded {
    grid-template-rows: 1fr;
    transition-duration: 100ms;
  }
}

.after\\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\\:inset-0::after {
  content: var(--tw-content);
  inset: 0px;
}

.after\\:left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}

.after\\:top-\\[100\\%\\]::after {
  content: var(--tw-content);
  top: 100%;
}

.after\\:h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}

.after\\:w-\\[10px\\]::after {
  content: var(--tw-content);
  width: 10px;
}

.after\\:-translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes fadeOut {

  0% {
    content: var(--tw-content);
    opacity: 1;
  }

  100% {
    content: var(--tw-content);
    opacity: 0;
  }
}

.after\\:animate-\\[fadeOut_1s_ease-out_forwards\\]::after {
  content: var(--tw-content);
  animation: fadeOut 1s ease-out forwards;
}

.after\\:border-l-\\[5px\\]::after {
  content: var(--tw-content);
  border-left-width: 5px;
}

.after\\:border-r-\\[5px\\]::after {
  content: var(--tw-content);
  border-right-width: 5px;
}

.after\\:border-t-\\[6px\\]::after {
  content: var(--tw-content);
  border-top-width: 6px;
}

.after\\:border-l-transparent::after {
  content: var(--tw-content);
  border-left-color: transparent;
}

.after\\:border-r-transparent::after {
  content: var(--tw-content);
  border-right-color: transparent;
}

.after\\:border-t-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-top-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}

.after\\:bg-purple-500\\/30::after {
  content: var(--tw-content);
  background-color: rgb(168 85 247 / 0.3);
}

.after\\:content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}

.focus-within\\:border-\\[\\#454545\\]:focus-within {
  --tw-border-opacity: 1;
  border-color: rgb(69 69 69 / var(--tw-border-opacity, 1));
}

.hover\\:bg-\\[\\#0f0f0f\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(15 15 15 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#18181B\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#34343b\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(52 52 59 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-\\[\\#5f3f9a\\]\\/20:hover {
  background-color: rgb(95 63 154 / 0.2);
}

.hover\\:bg-\\[\\#5f3f9a\\]\\/40:hover {
  background-color: rgb(95 63 154 / 0.4);
}

.hover\\:bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-zinc-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(63 63 70 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-zinc-800\\/50:hover {
  background-color: rgb(39 39 42 / 0.5);
}

.hover\\:text-neutral-300:hover {
  --tw-text-opacity: 1;
  color: rgb(212 212 212 / var(--tw-text-opacity, 1));
}

.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#21437982\\] {
  background-color: #21437982;
}

.group:hover .group-hover\\:bg-\\[\\#5b2d89\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(91 45 137 / var(--tw-bg-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#6a6a6a\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(106 106 106 / var(--tw-bg-opacity, 1));
}

.group:hover .group-hover\\:bg-\\[\\#efda1a2f\\] {
  background-color: #efda1a2f;
}

.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}

.peer\\/bottom:hover ~ .peer-hover\\/bottom\\:rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}

.peer\\/left:hover ~ .peer-hover\\/left\\:rounded-l-none {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.peer\\/right:hover ~ .peer-hover\\/right\\:rounded-r-none {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.peer\\/top:hover ~ .peer-hover\\/top\\:rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
`, rg = (e, t, n = t) => {
  const [r, o] = J(e);
  return q(() => {
    if (e === r) return;
    const a = setTimeout(() => o(e), e ? t : n);
    return () => clearTimeout(a);
  }, [e, t, n]), r;
}, og = Rt(
  () => x(
    "absolute inset-0 flex items-center gap-x-2",
    "translate-y-0",
    "transition-transform duration-300",
    Lr.value && "-translate-y-[200%]"
  )
), ig = () => {
  const e = j(null), t = j(null), [n, r] = J(null);
  Rn(() => {
    const i = M.inspectState.value;
    i.kind === "focused" && r(i.fiber);
  }), Rn(() => {
    const i = Ie.value;
    Nn(() => {
      var a, l;
      if (M.inspectState.value.kind !== "focused" || !e.current || !t.current) return;
      const { totalUpdates: s, currentIndex: u, updates: p, isVisible: d, windowOffset: f } = i, h = Math.max(0, s - 1), m = d ? `#${f + u} Re-render` : h > 0 ? `×${h}` : "";
      let v;
      if (h > 0 && u >= 0 && u < p.length) {
        const w = (l = (a = p[u]) == null ? void 0 : a.fiberInfo) == null ? void 0 : l.selfTime;
        v = w > 0 ? w < 0.1 - Number.EPSILON ? "< 0.1ms" : `${Number(w.toFixed(1))}ms` : void 0;
      }
      e.current.dataset.text = m ? ` • ${m}` : "", t.current.dataset.text = v ? ` • ${v}` : "";
    });
  });
  const o = Ue(() => {
    if (!n) return null;
    const { name: i, wrappers: a, wrapperTypes: l } = In(n), s = a.length ? `${a.join("(")}(${i})${")".repeat(a.length)}` : i != null ? i : "", u = l[0];
    return /* @__PURE__ */ c("span", { title: s, className: "flex items-center gap-x-1", children: [
      i != null ? i : "Unknown",
      /* @__PURE__ */ c(
        "span",
        {
          title: u == null ? void 0 : u.title,
          className: "flex items-center gap-x-1 text-[10px] text-purple-400",
          children: !!u && /* @__PURE__ */ c(ne, { children: [
            /* @__PURE__ */ c(
              "span",
              {
                className: x(
                  "rounded py-[1px] px-1",
                  "truncate",
                  u.compiler && "bg-purple-800 text-neutral-400",
                  !u.compiler && "bg-neutral-700 text-neutral-300",
                  u.type === "memo" && "bg-[#5f3f9a] text-white"
                ),
                children: u.type
              },
              u.type
            ),
            u.compiler && /* @__PURE__ */ c("span", { className: "text-yellow-300", children: "✨" })
          ] })
        }
      ),
      l.length > 1 && /* @__PURE__ */ c("span", { className: "text-[10px] text-neutral-400", children: [
        "×",
        l.length - 1
      ] })
    ] });
  }, [n]);
  return /* @__PURE__ */ c("div", { className: og, children: [
    o,
    /* @__PURE__ */ c("div", { className: "flex items-center gap-x-2 mr-auto text-xs text-[#888]", children: [
      /* @__PURE__ */ c(
        "span",
        {
          ref: e,
          className: "with-data-text cursor-pointer !overflow-visible",
          title: "Click to toggle between rerenders and total renders"
        }
      ),
      /* @__PURE__ */ c("span", { ref: t, className: "with-data-text !overflow-visible" })
    ] })
  ] });
}, ag = () => {
  const e = rg(
    M.inspectState.value.kind === "focused",
    150,
    0
  ), t = () => {
    ue.value = {
      view: "none"
    }, M.inspectState.value = {
      kind: "inspect-off"
    };
  };
  if (ue.value.view !== "notifications")
    return /* @__PURE__ */ c("div", { className: "react-scan-header", children: [
      /* @__PURE__ */ c("div", { className: "relative flex-1 h-full", children: /* @__PURE__ */ c(
        "div",
        {
          className: x(
            "react-scan-header-item is-visible",
            !e && "!duration-0"
          ),
          children: /* @__PURE__ */ c(ig, {})
        }
      ) }),
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          title: "Close",
          className: "react-scan-close-button",
          onClick: t,
          children: /* @__PURE__ */ c(ve, { name: "icon-close" })
        }
      )
    ] });
}, sg = (e) => {
  var t = e, {
    className: n
  } = t, r = rr(t, [
    "className"
  ]);
  return /* @__PURE__ */ c("div", { className: x("react-scan-toggle", n), children: [
    /* @__PURE__ */ c(
      "input",
      D({
        type: "checkbox"
      }, r)
    ),
    /* @__PURE__ */ c("div", {})
  ] });
}, lg = ({ fps: e }) => {
  const t = (n) => n < 30 ? "#EF4444" : n < 50 ? "#F59E0B" : "rgb(214,132,245)";
  return /* @__PURE__ */ c(
    "div",
    {
      className: x(
        "flex items-center gap-x-1 px-2 w-full",
        "h-6",
        "rounded-md",
        "font-mono leading-none",
        "bg-[#141414]",
        "ring-1 ring-white/[0.08]"
      ),
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            style: { color: t(e) },
            className: "text-sm font-semibold tracking-wide transition-colors ease-in-out w-full flex justify-center items-center",
            children: e
          }
        ),
        /* @__PURE__ */ c("span", { className: "text-white/30 text-[11px] font-medium tracking-wide ml-auto min-w-fit", children: "FPS" })
      ]
    }
  );
}, cg = () => {
  const [e, t] = J(null);
  return q(() => {
    const n = setInterval(() => {
      t(Ic());
    }, 200);
    return () => clearInterval(n);
  }, []), /* @__PURE__ */ c(
    "div",
    {
      className: x(
        "flex items-center justify-end gap-x-2 px-1 ml-1 w-[72px]",
        "whitespace-nowrap text-sm text-white"
      ),
      children: e === null ? /* @__PURE__ */ c(ne, { children: "️" }) : /* @__PURE__ */ c(lg, { fps: e })
    }
  );
}, Ve = () => Qe ? (window.reactScanIdCounter === void 0 && (window.reactScanIdCounter = 0), `${++window.reactScanIdCounter}`) : "0", He = (e) => e(), ke = class zc extends Array {
  constructor(t = 25) {
    super(), this.capacity = t;
  }
  push(...t) {
    const n = super.push(...t);
    for (; this.length > this.capacity; )
      this.shift();
    return n;
  }
  // do not couple capacity with a default param, it must be explicit
  static fromArray(t, n) {
    const r = new zc(n);
    return r.push(...t), r;
  }
}, ug = class {
  constructor(e) {
    this.subscribers = /* @__PURE__ */ new Set(), this.currentValue = e;
  }
  subscribe(e) {
    return this.subscribers.add(e), e(this.currentValue), () => {
      this.subscribers.delete(e);
    };
  }
  setState(e) {
    this.currentValue = e, this.subscribers.forEach((t) => t(e));
  }
  getCurrentState() {
    return this.currentValue;
  }
}, Dc = 150, hs = new ug(
  new ke(Dc)
), Xe = 50, dg = class {
  constructor() {
    this.channels = {};
  }
  publish(e, t, n = !0) {
    const r = this.channels[t];
    if (!r) {
      if (!n)
        return;
      this.channels[t] = {
        callbacks: new ke(Xe),
        state: new ke(Xe)
      }, this.channels[t].state.push(e);
      return;
    }
    r.state.push(e), r.callbacks.forEach((o) => o(e));
  }
  getAvailableChannels() {
    return ke.fromArray(Object.keys(this.channels), Xe);
  }
  subscribe(e, t, n = !1) {
    const r = () => (n || this.channels[e].state.forEach((i) => {
      t(i);
    }), () => {
      const i = this.channels[e].callbacks.filter(
        (a) => a !== t
      );
      this.channels[e].callbacks = ke.fromArray(
        i,
        Xe
      );
    }), o = this.channels[e];
    return o ? (o.callbacks.push(t), r()) : (this.channels[e] = {
      callbacks: new ke(Xe),
      state: new ke(Xe)
    }, this.channels[e].callbacks.push(t), r());
  }
  updateChannelState(e, t, n = !0) {
    const r = this.channels[e];
    if (!r) {
      if (!n)
        return;
      const o = new ke(Xe), i = {
        callbacks: new ke(Xe),
        state: o
      };
      this.channels[e] = i, i.state = t(o);
      return;
    }
    r.state = t(r.state);
  }
  getChannelState(e) {
    var t;
    return (t = this.channels[e].state) != null ? t : new ke(Xe);
  }
}, Er = new dg(), Fc = {
  skipProviders: !0,
  skipHocs: !0,
  skipContainers: !0,
  skipMinified: !0,
  skipUtilities: !0,
  skipBoundaries: !0
}, an = {
  providers: [/Provider$/, /^Provider$/, /^Context$/],
  hocs: [/^with[A-Z]/, /^forward(?:Ref)?$/i, /^Forward(?:Ref)?\(/],
  containers: [/^(?:App)?Container$/, /^Root$/, /^ReactDev/],
  utilities: [
    /^Fragment$/,
    /^Suspense$/,
    /^ErrorBoundary$/,
    /^Portal$/,
    /^Consumer$/,
    /^Layout$/,
    /^Router/,
    /^Hydration/
  ],
  boundaries: [/^Boundary$/, /Boundary$/, /^Provider$/, /Provider$/]
}, pg = (e, t = Fc) => {
  const n = [];
  return t.skipProviders && n.push(...an.providers), t.skipHocs && n.push(...an.hocs), t.skipContainers && n.push(...an.containers), t.skipUtilities && n.push(...an.utilities), t.skipBoundaries && n.push(...an.boundaries), !n.some((r) => r.test(e));
}, ms = [
  /^[a-z]$/,
  // Single lowercase letter
  /^[a-z][0-9]$/,
  // Lowercase letter followed by number
  /^_+$/,
  // Just underscores
  /^[A-Za-z][_$]$/,
  // Letter followed by underscore or dollar
  /^[a-z]{1,2}$/
  // 1-2 lowercase letters
], fg = (e) => {
  var t, n;
  for (let l = 0; l < ms.length; l++)
    if (ms[l].test(e)) return !0;
  const r = !/[aeiou]/i.test(e), o = ((n = (t = e.match(/\d/g)) == null ? void 0 : t.length) != null ? n : 0) > e.length / 2, i = /^[a-z]+$/.test(e), a = /[$_]{2,}/.test(e);
  return Number(r) + Number(o) + Number(i) + Number(a) >= 2;
}, hg = (e, t = Fc) => {
  if (!e) return [];
  if (!he(e.type)) return [];
  const r = new Array();
  let o = e;
  for (; o.return; ) {
    const a = mg(o.type);
    a && !fg(a) && pg(a, t) && a.toLowerCase() !== a && r.push(a), o = o.return;
  }
  const i = new Array(r.length);
  for (let a = 0; a < r.length; a++)
    i[a] = r[r.length - a - 1];
  return i;
}, mg = (e) => {
  const t = he(e);
  return t ? t.replace(
    new RegExp("^(?:Memo|Forward(?:Ref)?|With.*?)\\((?<inner>.*?)\\)$"),
    "$<inner>"
  ) : "";
}, gg = (e, t = () => !0) => {
  let n = e;
  for (; n; ) {
    const r = he(n.type);
    if (r && t(r))
      return r;
    n = n.return;
  }
  return null;
}, uo, ui = "never-hidden", vg = () => {
  uo == null || uo();
  const e = () => {
    document.hidden && (ui = Date.now());
  };
  document.addEventListener("visibilitychange", e), uo = () => {
    document.removeEventListener("visibilitychange", e);
  };
}, wg = (e) => ["pointerup", "click"].includes(e) ? "pointer" : (e.includes("key"), ["keydown", "keyup"].includes(e) ? "keyboard" : null), po = null, yg = (e) => {
  vg();
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (i) => {
    if (!i.interactionId) return;
    if (i.interactionId && i.target && !n.has(i.interactionId) && n.set(i.interactionId, i.target), i.target) {
      let l = i.target;
      for (; l; ) {
        if (l.id === "react-scan-toolbar-root" || l.id === "react-scan-root")
          return;
        l = l.parentElement;
      }
    }
    const a = t.get(i.interactionId);
    if (a)
      i.duration > a.latency ? (a.entries = [i], a.latency = i.duration) : i.duration === a.latency && i.startTime === a.entries[0].startTime && a.entries.push(i);
    else {
      const l = wg(i.name);
      if (!l)
        return;
      const s = {
        id: i.interactionId,
        latency: i.duration,
        entries: [i],
        target: i.target,
        type: l,
        startTime: i.startTime,
        endTime: Date.now(),
        processingStart: i.processingStart,
        processingEnd: i.processingEnd,
        duration: i.duration,
        inputDelay: i.processingStart - i.startTime,
        processingDuration: i.processingEnd - i.processingStart,
        presentationDelay: i.duration - (i.processingEnd - i.startTime),
        // componentPath:
        timestamp: Date.now(),
        timeSinceTabInactive: ui === "never-hidden" ? "never-hidden" : Date.now() - ui,
        visibilityState: document.visibilityState,
        timeOrigin: performance.timeOrigin,
        referrer: document.referrer
      };
      t.set(s.id, s), po || (po = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          e(t.get(s.id)), po = null;
        });
      }));
    }
  }, o = new PerformanceObserver((i) => {
    const a = i.getEntries();
    for (let l = 0, s = a.length; l < s; l++) {
      const u = a[l];
      r(u);
    }
  });
  try {
    o.observe({
      type: "event",
      buffered: !0,
      durationThreshold: 16
    }), o.observe({
      type: "first-input",
      buffered: !0
    });
  } catch (i) {
  }
  return () => o.disconnect();
}, bg = () => yg((e) => {
  Er.publish(
    {
      kind: "entry-received",
      entry: e
    },
    "recording"
  );
}), lr = 25, tt = new ke(lr), xg = (e, t) => {
  let n = null;
  for (const r of t) {
    if (r.type !== e.type)
      continue;
    if (n === null) {
      n = r;
      continue;
    }
    const o = (i, a) => Math.abs(i.startDateTime) - (a.startTime + a.timeOrigin);
    o(r, e) < o(n, e) && (n = r);
  }
  return n;
}, _g = (e) => Er.subscribe(
  "recording",
  (n) => {
    const r = n.kind === "auto-complete-race" ? tt.find((i) => i.interactionUUID === n.interactionUUID) : xg(n.entry, tt);
    if (!r)
      return;
    const o = r.completeInteraction(n);
    e(o);
  }
), kg = ({
  onMicroTask: e,
  onRAF: t,
  onTimeout: n,
  abort: r
}) => {
  queueMicrotask(() => {
    (r == null ? void 0 : r()) !== !0 && e() && requestAnimationFrame(() => {
      (r == null ? void 0 : r()) !== !0 && t() && setTimeout(() => {
        (r == null ? void 0 : r()) !== !0 && n();
      }, 0);
    });
  });
}, Cg = (e) => {
  var t;
  const n = Sc(e);
  if (!n)
    return;
  let r = n ? he(n == null ? void 0 : n.type) : "N/A";
  return r || (r = (t = gg(n, (i) => i.length > 2)) != null ? t : "N/A"), r ? {
    componentPath: hg(n),
    childrenTree: {},
    componentName: r,
    elementFiber: n
  } : void 0;
}, gs = (e, t) => {
  let n = null;
  const r = (s) => {
    switch (e) {
      case "pointer":
        return s.phase === "start" ? "pointerup" : s.target instanceof HTMLInputElement || s.target instanceof HTMLSelectElement ? "change" : "click";
      case "keyboard":
        return s.phase === "start" ? "keydown" : "change";
    }
  }, o = {
    current: {
      kind: "uninitialized-stage",
      interactionUUID: Ve(),
      // the first interaction uses this
      stageStart: Date.now(),
      interactionType: e
    }
  }, i = (s) => {
    var u, p;
    if (s.composedPath().some(
      (g) => g instanceof Element && g.id === "react-scan-toolbar-root"
    ) || (Date.now() - o.current.stageStart > 2e3 && (o.current = {
      kind: "uninitialized-stage",
      interactionUUID: Ve(),
      stageStart: Date.now(),
      interactionType: e
    }), o.current.kind !== "uninitialized-stage"))
      return;
    const f = performance.now();
    (u = t == null ? void 0 : t.onStart) == null || u.call(t, o.current.interactionUUID);
    const h = Cg(s.target);
    if (!h) {
      (p = t == null ? void 0 : t.onError) == null || p.call(t, o.current.interactionUUID);
      return;
    }
    const m = {}, v = $c(m);
    o.current = H(D({}, o.current), {
      interactionType: e,
      blockingTimeStart: Date.now(),
      childrenTree: h.childrenTree,
      componentName: h.componentName,
      componentPath: h.componentPath,
      fiberRenders: m,
      kind: "interaction-start",
      interactionStartDetail: f,
      stopListeningForRenders: v
    });
    const w = r({ phase: "end", target: s.target });
    document.addEventListener(w, a, {
      once: !0
    }), requestAnimationFrame(() => {
      document.removeEventListener(w, a);
    });
  };
  document.addEventListener(
    r({ phase: "start" }),
    // biome-ignore lint/suspicious/noExplicitAny: shut up biome
    i,
    {
      capture: !0
    }
  );
  const a = (s, u, p) => {
    var d;
    if (o.current.kind !== "interaction-start" && u === n) {
      if (e === "pointer" && s.target instanceof HTMLSelectElement) {
        o.current = {
          kind: "uninitialized-stage",
          interactionUUID: Ve(),
          stageStart: Date.now(),
          interactionType: e
        };
        return;
      }
      (d = t == null ? void 0 : t.onError) == null || d.call(t, o.current.interactionUUID), o.current = {
        kind: "uninitialized-stage",
        interactionUUID: Ve(),
        stageStart: Date.now(),
        interactionType: e
      };
      return;
    }
    n = u, kg({
      abort: p,
      onMicroTask: () => o.current.kind === "uninitialized-stage" ? !1 : (o.current = H(D({}, o.current), {
        kind: "js-end-stage",
        jsEndDetail: performance.now()
      }), !0),
      onRAF: () => {
        var f;
        return o.current.kind !== "js-end-stage" && o.current.kind !== "raf-stage" ? ((f = t == null ? void 0 : t.onError) == null || f.call(t, o.current.interactionUUID), o.current = {
          kind: "uninitialized-stage",
          interactionUUID: Ve(),
          stageStart: Date.now(),
          interactionType: e
        }, !1) : (o.current = H(D({}, o.current), {
          kind: "raf-stage",
          rafStart: performance.now()
        }), !0);
      },
      onTimeout: () => {
        var f;
        if (o.current.kind !== "raf-stage") {
          (f = t == null ? void 0 : t.onError) == null || f.call(t, o.current.interactionUUID), o.current = {
            kind: "uninitialized-stage",
            interactionUUID: Ve(),
            stageStart: Date.now(),
            interactionType: e
          };
          return;
        }
        const h = Date.now(), m = Object.freeze(H(D({}, o.current), {
          kind: "timeout-stage",
          blockingTimeEnd: h,
          commitEnd: performance.now()
        }));
        o.current = {
          kind: "uninitialized-stage",
          interactionUUID: Ve(),
          stageStart: h,
          interactionType: e
        };
        let v = !1;
        const w = (y) => {
          var k;
          v = !0;
          const S = y.kind === "auto-complete-race" ? y.detailedTiming.commitEnd - y.detailedTiming.interactionStartDetail : y.entry.latency, T = {
            detailedTiming: m,
            latency: S,
            completedAt: Date.now(),
            flushNeeded: !0
          };
          (k = t == null ? void 0 : t.onComplete) == null || k.call(
            t,
            m.interactionUUID,
            T,
            y
          );
          const E = tt.filter(
            (A) => A.interactionUUID !== m.interactionUUID
          );
          return tt = ke.fromArray(E, lr), T;
        }, g = {
          completeInteraction: w,
          endDateTime: Date.now(),
          startDateTime: m.blockingTimeStart,
          type: e,
          interactionUUID: m.interactionUUID
        };
        if (tt.push(g), Sg())
          setTimeout(() => {
            if (v)
              return;
            w({
              kind: "auto-complete-race",
              // redundant
              detailedTiming: m,
              interactionUUID: m.interactionUUID
            });
            const y = tt.filter(
              (k) => k.interactionUUID !== m.interactionUUID
            );
            tt = ke.fromArray(y, lr);
          }, 1e3);
        else {
          const y = tt.filter(
            (k) => k.interactionUUID !== m.interactionUUID
          );
          tt = ke.fromArray(y, lr), w({
            kind: "auto-complete-race",
            // redundant
            detailedTiming: m,
            interactionUUID: m.interactionUUID
          });
        }
      }
    });
  }, l = (s) => {
    const u = Ve();
    a(s, u, () => u !== n);
  };
  return e === "keyboard" && document.addEventListener("keypress", l), () => {
    document.removeEventListener(
      r({ phase: "start" }),
      // biome-ignore lint/suspicious/noExplicitAny: shut up biome
      i,
      {
        capture: !0
      }
    ), document.removeEventListener("keypress", l);
  };
}, vs = (e) => {
  var t;
  return (t = zl(e, (n) => {
    if (Cn(n))
      return !0;
  })) == null ? void 0 : t.stateNode;
}, Sg = () => "PerformanceEventTiming" in globalThis, $c = (e) => {
  const t = (n) => {
    var r, o, i, a, l, s, u;
    const p = he(n.type);
    if (!p)
      return;
    const d = e[p];
    if (!d) {
      const g = /* @__PURE__ */ new Set(), y = n.return && Ut(n.return), k = y && he(y[0]);
      k && g.add(k);
      const { selfTime: S, totalTime: T } = yt(n), E = ns(n), A = {
        current: [],
        changes: /* @__PURE__ */ new Set(),
        changesCounts: /* @__PURE__ */ new Map()
      }, I = {
        fiberProps: E.fiberProps || A,
        fiberState: E.fiberState || A,
        fiberContext: E.fiberContext || A
      };
      e[p] = {
        renderCount: 1,
        hasMemoCache: Sn(n),
        wasFiberRenderMount: ws(n),
        parents: g,
        selfTime: S,
        totalTime: T,
        nodeInfo: [
          {
            element: vs(n),
            name: (r = he(n.type)) != null ? r : "Unknown",
            selfTime: yt(n).selfTime
          }
        ],
        changes: I
      };
      return;
    }
    if ((i = (o = Ut(n)) == null ? void 0 : o[0]) == null ? void 0 : i.type) {
      const g = n.return && Ut(n.return), y = g && he(g[0]);
      y && d.parents.add(y);
    }
    const { selfTime: h, totalTime: m } = yt(n), v = ns(n);
    if (!v) return;
    const w = {
      current: [],
      changes: /* @__PURE__ */ new Set(),
      changesCounts: /* @__PURE__ */ new Map()
    };
    d.wasFiberRenderMount = d.wasFiberRenderMount || ws(n), d.hasMemoCache = d.hasMemoCache || Sn(n), d.changes = {
      fiberProps: fo(
        ((a = d.changes) == null ? void 0 : a.fiberProps) || w,
        v.fiberProps || w
      ),
      fiberState: fo(
        ((l = d.changes) == null ? void 0 : l.fiberState) || w,
        v.fiberState || w
      ),
      fiberContext: fo(
        ((s = d.changes) == null ? void 0 : s.fiberContext) || w,
        v.fiberContext || w
      )
    }, d.renderCount += 1, d.selfTime += h, d.totalTime += m, d.nodeInfo.push({
      element: vs(n),
      name: (u = he(n.type)) != null ? u : "Unknown",
      selfTime: yt(n).selfTime
    });
  };
  return M.interactionListeningForRenders = t, () => {
    M.interactionListeningForRenders === t && (M.interactionListeningForRenders = null);
  };
}, fo = (e, t) => {
  const n = {
    current: [...e.current],
    changes: /* @__PURE__ */ new Set(),
    changesCounts: /* @__PURE__ */ new Map()
  };
  for (const r of t.current)
    n.current.some((o) => o.name === r.name) || n.current.push(r);
  for (const r of t.changes)
    if (typeof r == "string" || typeof r == "number") {
      n.changes.add(r);
      const o = e.changesCounts.get(r) || 0, i = t.changesCounts.get(r) || 0;
      n.changesCounts.set(r, o + i);
    }
  return n;
}, ws = (e) => {
  if (!e.alternate)
    return !0;
  const t = e.alternate, n = t && t.memoizedState != null && t.memoizedState.element != null && t.memoizedState.isDehydrated !== !0, r = e.memoizedState != null && e.memoizedState.element != null && e.memoizedState.isDehydrated !== !0;
  return !n && r;
}, Tg = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (u, p) => {
    const d = typeof u == "function" ? u(t) : u;
    if (!Object.is(d, t)) {
      const f = t;
      t = (p != null ? p : typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((h) => h(t, f));
    }
  }, o = () => t, l = { setState: r, getState: o, getInitialState: () => s, subscribe: (u, p) => {
    let d, f;
    p ? (d = u, f = p) : f = u;
    let h = d ? d(t) : void 0;
    const m = (v, w) => {
      if (d) {
        const g = d(v), y = d(w);
        Object.is(h, g) || (h = g, f(g, y));
      } else
        f(v, w);
    };
    return n.add(m), () => n.delete(m);
  } }, s = t = e(r, o, l);
  return l;
}, Lc = (e) => Tg, Un = null;
Lc()((e) => ({
  state: {
    events: []
  },
  actions: {
    addEvent: (t) => {
      e((n) => ({
        state: {
          events: [...n.state.events, t]
        }
      }));
    },
    clear: () => {
      e({
        state: {
          events: []
        }
      });
    }
  }
}));
var ho = 200, An = Lc()(
  (e, t) => {
    const n = /* @__PURE__ */ new Set();
    return {
      state: {
        events: new ke(ho)
      },
      actions: {
        addEvent: (r) => {
          n.forEach((s) => s(r));
          const o = [...t().state.events, r], i = (s, u) => {
            const p = o.find((d) => {
              if (d.kind !== "long-render" && d.id !== s.id && (s.data.startAt <= d.data.startAt && s.data.endAt <= d.data.endAt && s.data.endAt >= d.data.startAt || d.data.startAt <= s.data.startAt && d.data.endAt >= s.data.startAt || s.data.startAt <= d.data.startAt && s.data.endAt >= d.data.endAt))
                return !0;
            });
            p && u(p);
          }, a = /* @__PURE__ */ new Set();
          o.forEach((s) => {
            s.kind !== "interaction" && i(s, () => {
              a.add(s.id);
            });
          });
          const l = o.filter(
            (s) => !a.has(s.id)
          );
          e(() => ({
            state: {
              events: ke.fromArray(
                l,
                ho
              )
            }
          }));
        },
        addListener: (r) => (n.add(r), () => {
          n.delete(r);
        }),
        clear: () => {
          e({
            state: {
              events: new ke(ho)
            }
          });
        }
      }
    };
  }
), Eg = () => If(
  An.subscribe,
  An.getState
), cr = null, ur = null, mo = null, di, Ng = () => {
  const e = (t) => {
    di = t.composedPath().map((n) => n.id).filter(Boolean).includes("react-scan-toolbar");
  };
  return document.addEventListener("mouseover", e), mo = e, () => {
    mo && document.removeEventListener(
      "mouseover",
      mo
    );
  };
}, Rg = () => {
  const e = () => {
    cr = performance.now(), ur = performance.timeOrigin;
  };
  return document.addEventListener("visibilitychange", e), () => {
    document.removeEventListener("visibilitychange", e);
  };
}, jc = 150, go = [];
function Ig() {
  let e, t;
  function n() {
    let o = null;
    Un = null, Un = {}, o = $c(Un);
    const i = performance.timeOrigin, a = performance.now();
    return e = requestAnimationFrame(() => {
      t = setTimeout(() => {
        const l = performance.now(), s = l - a, u = performance.timeOrigin;
        go.push(l + u);
        const p = go.filter(
          (m) => l + u - m <= 1e3
        ), d = p.length;
        go = p;
        const f = cr !== null && ur !== null ? l + u - (ur + cr) < 100 : null, h = di !== null && di;
        if (s > jc && !f && document.visibilityState === "visible" && !h) {
          const m = u + l, v = a + i;
          An.getState().actions.addEvent({
            kind: "long-render",
            id: Ve(),
            data: {
              endAt: m,
              startAt: v,
              meta: {
                // biome-ignore lint/style/noNonNullAssertion: invariant: this will exist by this point
                fiberRenders: Un,
                latency: s,
                fps: d
              }
            }
          });
        }
        cr = null, ur = null, o == null || o(), n();
      }, 0);
    }), o;
  }
  const r = n();
  return () => {
    r(), cancelAnimationFrame(e), clearTimeout(t);
  };
}
var Ag = () => {
  const e = bg(), t = Ng(), n = Rg(), r = Ig(), o = async (s, u, p) => {
    An.getState().actions.addEvent({
      kind: "interaction",
      id: Ve(),
      data: {
        startAt: u.detailedTiming.blockingTimeStart,
        endAt: performance.now() + performance.timeOrigin,
        meta: H(D({}, u), { kind: p.kind })
        // TODO, will need interaction specific metadata here
      }
    });
    const d = Er.getChannelState("recording");
    u.detailedTiming.stopListeningForRenders(), d.length && Er.updateChannelState(
      "recording",
      () => new ke(Xe)
    );
  }, i = gs(
    "pointer",
    {
      onComplete: o
    }
  ), a = gs(
    "keyboard",
    {
      onComplete: o
    }
  ), l = _g(
    (s) => {
      hs.setState(
        ke.fromArray(
          hs.getCurrentState().concat(s),
          Dc
        )
      );
    }
  );
  return () => {
    t(), n(), r(), e(), i(), l(), a();
  };
}, Pn = (e) => {
  var t;
  const n = e.filter((r) => r.length > 2);
  return n.length === 0 ? (t = e.at(-1)) != null ? t : "Unknown" : n.at(-1);
}, Ce = (e) => {
  switch (e.kind) {
    case "interaction": {
      const {
        renderTime: t,
        otherJSTime: n,
        framePreparation: r,
        frameConstruction: o,
        frameDraw: i
      } = e;
      return t + n + r + o + (i != null ? i : 0);
    }
    case "dropped-frames":
      return e.otherTime + e.renderTime;
  }
}, Pg = (e) => e.wasFiberRenderMount || e.hasMemoCache ? !1 : e.changes.context.length === 0 && e.changes.props.length === 0 && e.changes.state.length === 0, $n = (e) => {
  const t = Ce(e.timing);
  switch (e.kind) {
    case "interaction":
      return t < 200 ? "low" : t < 500 ? "needs-improvement" : "high";
    case "dropped-frames":
      return t < 50 ? "low" : t < jc ? "needs-improvement" : "high";
  }
}, ze = () => Ai(Vc), Vc = Ql(null), Wc = ({
  size: e = 24,
  className: t
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: x(["lucide lucide-chevron-right", t]),
    children: /* @__PURE__ */ c("path", { d: "m9 18 6-6-6-6" })
  }
), Og = ({
  className: e = "",
  size: t = 24,
  events: n = []
}) => {
  const r = n.includes(!0), o = n.filter((l) => l).length, i = o > 99 ? ">99" : o, a = r ? Math.max(t * 0.6, 14) : Math.max(t * 0.4, 6);
  return /* @__PURE__ */ c("div", { className: "relative", children: [
    /* @__PURE__ */ c(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: t,
        height: t,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        className: `lucide lucide-bell ${e}`,
        children: [
          /* @__PURE__ */ c("path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }),
          /* @__PURE__ */ c("path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" })
        ]
      }
    ),
    n.length > 0 && o > 0 && te.options.value.showNotificationCount && /* @__PURE__ */ c(
      "div",
      {
        className: x([
          "absolute",
          r ? "-top-2.5 -right-2.5" : "-top-1 -right-1",
          "rounded-full",
          "flex items-center justify-center",
          "text-[8px] font-medium text-white",
          "aspect-square",
          r ? "bg-red-500/90" : "bg-purple-500/90"
        ]),
        style: {
          width: `${a}px`,
          height: `${a}px`,
          padding: r ? "0.5px" : "0"
        },
        children: r && i
      }
    )
  ] });
}, Nr = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    children: [
      /* @__PURE__ */ c("path", { d: "M18 6 6 18" }),
      /* @__PURE__ */ c("path", { d: "m6 6 12 12" })
    ]
  }
), Mg = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    children: [
      /* @__PURE__ */ c("path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" }),
      /* @__PURE__ */ c("path", { d: "M16 9a5 5 0 0 1 0 6" }),
      /* @__PURE__ */ c("path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728" })
    ]
  }
), zg = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    children: [
      /* @__PURE__ */ c("path", { d: "M16 9a5 5 0 0 1 .95 2.293" }),
      /* @__PURE__ */ c("path", { d: "M19.364 5.636a9 9 0 0 1 1.889 9.96" }),
      /* @__PURE__ */ c("path", { d: "m2 2 20 20" }),
      /* @__PURE__ */ c("path", { d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" }),
      /* @__PURE__ */ c("path", { d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686" })
    ]
  }
), Dg = ({
  size: e = 24,
  className: t
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: x(["lucide lucide-arrow-left", t]),
    children: [
      /* @__PURE__ */ c("path", { d: "m12 19-7-7 7-7" }),
      /* @__PURE__ */ c("path", { d: "M19 12H5" })
    ]
  }
), Fg = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    children: [
      /* @__PURE__ */ c("path", { d: "M14 4.1 12 6" }),
      /* @__PURE__ */ c("path", { d: "m5.1 8-2.9-.8" }),
      /* @__PURE__ */ c("path", { d: "m6 12-1.9 2" }),
      /* @__PURE__ */ c("path", { d: "M7.2 2.2 8 5.1" }),
      /* @__PURE__ */ c("path", { d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" })
    ]
  }
), $g = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    children: [
      /* @__PURE__ */ c("path", { d: "M10 8h.01" }),
      /* @__PURE__ */ c("path", { d: "M12 12h.01" }),
      /* @__PURE__ */ c("path", { d: "M14 8h.01" }),
      /* @__PURE__ */ c("path", { d: "M16 12h.01" }),
      /* @__PURE__ */ c("path", { d: "M18 8h.01" }),
      /* @__PURE__ */ c("path", { d: "M6 8h.01" }),
      /* @__PURE__ */ c("path", { d: "M7 16h10" }),
      /* @__PURE__ */ c("path", { d: "M8 12h.01" }),
      /* @__PURE__ */ c("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" })
    ]
  }
), Lg = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    className: e,
    style: { transform: "rotate(180deg)" },
    children: [
      /* @__PURE__ */ c("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ c("path", { d: "m4.9 4.9 14.2 14.2" })
    ]
  }
), jg = ({
  className: e = "",
  size: t = 24
}) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: e,
    children: [
      /* @__PURE__ */ c("polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }),
      /* @__PURE__ */ c("polyline", { points: "16 17 22 17 22 11" })
    ]
  }
), Hc = ({
  children: e,
  triggerContent: t,
  wrapperProps: n
}) => {
  const [r, o] = J("closed"), [i, a] = J(null), [l, s] = J({
    width: window.innerWidth,
    height: window.innerHeight
  }), u = j(null), p = j(null), d = Ai(qi), f = j(!1);
  q(() => {
    const g = () => {
      s({
        width: window.innerWidth,
        height: window.innerHeight
      }), h();
    };
    return window.addEventListener("resize", g), () => window.removeEventListener("resize", g);
  }, []);
  const h = () => {
    if (u.current && d) {
      const g = u.current.getBoundingClientRect(), y = d.getBoundingClientRect(), k = g.left + g.width / 2, S = g.top, T = new DOMRect(
        k - y.left,
        S - y.top,
        g.width,
        g.height
      );
      a(T);
    }
  };
  q(() => {
    h();
  }, [u.current]), q(() => {
    if (r === "opening") {
      const g = setTimeout(() => o("open"), 120);
      return () => clearTimeout(g);
    } else if (r === "closing") {
      const g = setTimeout(() => o("closed"), 120);
      return () => clearTimeout(g);
    }
  }, [r]), q(() => {
    const g = setInterval(() => {
      !f.current && r !== "closed" && o("closing");
    }, 1e3);
    return () => clearInterval(g);
  }, [r]);
  const m = () => {
    f.current = !0, h(), o("opening");
  }, v = () => {
    f.current = !1, h(), o("closing");
  }, w = () => {
    var g;
    if (!i || !d) return { top: 0, left: 0 };
    const y = d.getBoundingClientRect(), k = 175, S = ((g = p.current) == null ? void 0 : g.offsetHeight) || 40, T = 5, E = i.x + y.left, A = i.y + y.top;
    let I = E, N = A - 4;
    return I - k / 2 < T ? I = T + k / 2 : I + k / 2 > l.width - T && (I = l.width - T - k / 2), N - S < T && (N = A + i.height + 4), {
      top: N - y.top,
      left: I - y.left
    };
  };
  return /* @__PURE__ */ c(ne, { children: [
    d && i && r !== "closed" && zf(
      /* @__PURE__ */ c(
        "div",
        {
          ref: p,
          className: x([
            "absolute z-100 bg-white text-black rounded-lg px-3 py-2 shadow-lg",
            "transform transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)]",
            'after:content-[""] after:absolute after:top-[100%]',
            "after:left-1/2 after:-translate-x-1/2",
            "after:w-[10px] after:h-[6px]",
            "after:border-l-[5px] after:border-l-transparent",
            "after:border-r-[5px] after:border-r-transparent",
            "after:border-t-[6px] after:border-t-white",
            "pointer-events-none",
            r === "opening" || r === "closing" ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          ]),
          style: {
            top: w().top + "px",
            left: w().left + "px",
            transform: "translate(-50%, -100%)",
            minWidth: "175px"
          },
          children: e
        }
      ),
      d
    ),
    /* @__PURE__ */ c(
      "div",
      H(D({
        ref: u,
        onMouseEnter: m,
        onMouseLeave: v
      }, n), {
        children: t
      })
    )
  ] });
}, Vg = ({
  selectedEvent: e
}) => {
  const { notificationState: t, setNotificationState: n, setRoute: r } = ze();
  return /* @__PURE__ */ c(
    "div",
    {
      className: x([
        "flex w-full justify-between items-center px-3 py-2 text-xs"
      ]),
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            className: x([
              "bg-[#18181B] flex items-center gap-x-1 p-1 rounded-sm"
            ]),
            children: [
              /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    r({
                      route: "render-visualization",
                      routeMessage: null
                    });
                  },
                  className: x([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    t.route === "render-visualization" || t.route === "render-explanation" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: "Ranked"
                }
              ),
              /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    r({
                      route: "other-visualization",
                      routeMessage: null
                    });
                  },
                  className: x([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    t.route === "other-visualization" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: "Overview"
                }
              ),
              /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    r({
                      route: "optimize",
                      routeMessage: null
                    });
                  },
                  className: x([
                    "w-1/2 flex items-center justify-center whitespace-nowrap py-[5px] px-1 gap-x-1",
                    t.route === "optimize" ? "text-white bg-[#7521c8] rounded-sm" : "text-[#6E6E77] bg-[#18181B] rounded-sm"
                  ]),
                  children: /* @__PURE__ */ c("span", { children: "Prompts" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c(
          Hc,
          {
            triggerContent: /* @__PURE__ */ c(
              "button",
              {
                onClick: () => {
                  n((o) => {
                    o.audioNotificationsOptions.enabled && o.audioNotificationsOptions.audioContext.state !== "closed" && o.audioNotificationsOptions.audioContext.close();
                    const i = o.audioNotificationsOptions.enabled;
                    localStorage.setItem(
                      "react-scan-notifications-audio",
                      String(!i)
                    );
                    const a = new AudioContext();
                    return o.audioNotificationsOptions.enabled || Di(a), i && a.close(), H(D({}, o), {
                      audioNotificationsOptions: i ? {
                        audioContext: null,
                        enabled: !1
                      } : {
                        audioContext: a,
                        enabled: !0
                      }
                    });
                  });
                },
                className: "ml-auto",
                children: /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex gap-x-2 justify-center items-center text-[#6E6E77]"
                    ]),
                    children: [
                      /* @__PURE__ */ c("span", { children: "Alerts" }),
                      t.audioNotificationsOptions.enabled ? /* @__PURE__ */ c(Mg, { size: 16, className: "text-[#6E6E77]" }) : /* @__PURE__ */ c(zg, { size: 16, className: "text-[#6E6E77]" })
                    ]
                  }
                )
              }
            ),
            children: /* @__PURE__ */ c(ne, { children: "Play a chime when a slowdown is recorded" })
          }
        )
      ]
    }
  );
}, At = (e) => {
  let t = "";
  return e.toSorted((r, o) => o.totalTime - r.totalTime).slice(0, 30).filter((r) => r.totalTime > 5).forEach((r) => {
    let o = "";
    o += "Component Name:", o += r.name, o += `
`, o += `Rendered: ${r.count} times
`, o += `Sum of self times for ${r.name} is ${r.totalTime.toFixed(0)}ms
`, r.changes.props.length > 0 && (o += `Changed props for all ${r.name} instances ("name:count" pairs)
`, r.changes.props.forEach((i) => {
      o += `${i.name}:${i.count}x
`;
    })), r.changes.state.length > 0 && (o += `Changed state for all ${r.name} instances ("hook index:count" pairs)
`, r.changes.state.forEach((i) => {
      o += `${i.index}:${i.count}x
`;
    })), r.changes.context.length > 0 && (o += `Changed context for all ${r.name} instances ("context display name (if exists):count" pairs)
`, r.changes.context.forEach((i) => {
      o += `${i.name}:${i.count}x
`;
    })), t += o, t += `
`;
  }), t;
}, Wg = ({
  renderTime: e,
  eHandlerTimeExcludingRenders: t,
  toRafTime: n,
  commitTime: r,
  framePresentTime: o,
  formattedReactData: i
}) => `I will provide you with a set of high level, and low level performance data about an interaction in a React App:
### High level
- react component render time: ${e.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${t.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${n.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${r.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${o === null ? "" : `- how long it took from dom commit for the frame to be presented: ${o.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${i}`, Hg = ({
  interactionType: e,
  name: t,
  componentPath: n,
  time: r,
  renderTime: o,
  eHandlerTimeExcludingRenders: i,
  toRafTime: a,
  commitTime: l,
  framePresentTime: s,
  formattedReactData: u
}) => `You will attempt to implement a performance improvement to a user interaction in a React app. You will be provided with data about the interaction, and the slow down.

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.


Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)

The interaction was a ${e} on the component named ${t}. This component has the following ancestors ${n}. This is the path from the component, to the root. This should be enough information to figure out where this component is in the user's code base

This path is the component that was clicked, so it should tell you roughly where component had an event handler that triggered a state change.

Please note that the leaf node of this path might not be user code (if they use a UI library), and they may contain many wrapper components that just pass through children that aren't relevant to the actual click. So make you sure analyze the path and understand what the user code is doing

We have a set of high level, and low level data about the performance issue.

The click took ${r.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${o.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${i.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${a.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${l.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${s === null ? "" : `- how long it took from dom commit for the frame to be presented: ${s.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${u}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

`, Ug = ({
  renderTime: e,
  otherTime: t,
  formattedReactData: n
}) => `You will attempt to implement a performance improvement to a large slowdown in a react app

Your should split your goals into 2 parts:
- identifying the problem
- fixing the problem
	- it is okay to implement a fix even if you aren't 100% sure the fix solves the performance problem. When you aren't sure, you should tell the user to try repeating the interaction, and feeding the "Formatted Data" in the React Scan notifications optimize tab. This allows you to start a debugging flow with the user, where you attempt a fix, and observe the result. The user may make a mistake when they pass you the formatted data, so must make sure, given the data passed to you, that the associated data ties to the same interaction you were trying to debug.

Make sure to check if the user has the react compiler enabled (project dependent, configured through build tool), so you don't unnecessarily memoize components. If it is, you do not need to worry about memoizing user components

One challenge you may face is the performance problem lies in a node_module, not in user code. If you are confident the problem originates because of a node_module, there are multiple strategies, which are context dependent:
- you can try to work around the problem, knowing which module is slow
- you can determine if its possible to resolve the problem in the node_module by modifying non node_module code
- you can monkey patch the node_module to experiment and see if it's really the problem (you can modify a functions properties to hijack the call for example)
- you can determine if it's feasible to replace whatever node_module is causing the problem with a performant option (this is an extreme)


We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${e.toFixed(0)}ms
- other time: ${t}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${n}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So the flow should be:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 

An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If a node_module is the component with high renders, you can experiment to see if that component is the root issue (because of hooks). You should use the same instructions for node_module debugging mentioned previously.

If renders don't seem to be the problem, see if there are any expensive CSS properties being added/mutated, or any expensive DOM Element mutations/new elements being created that could cause this slowdown. 
`, Bg = ({
  renderTime: e,
  otherTime: t,
  formattedReactData: n
}) => `Your goal will be to help me find the source of a performance problem in a React App. I collected a large dataset about this specific performance problem.

We have the high level time of how much react spent rendering, and what else the browser spent time on during this slowdown

- react component render time: ${e.toFixed(0)}ms
- other time (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${t}ms


We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${n}

You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but other time is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run outside of what we profile (just react render time).

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one, and this can add significant overhead when thousands of effects ran.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`, Yg = ({
  renderTime: e,
  otherTime: t,
  formattedReactData: n
}) => `I will provide you with a set of high level, and low level performance data about a large frame drop in a React App:
### High level
- react component render time: ${e.toFixed(0)}ms
- how long it took to run everything else (other JavaScript, hooks like useEffect, style recalculations, layerization, paint & commit and everything else the browser might do to draw a new frame after javascript mutates the DOM): ${t}ms

### Low level
We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.
${n}`, Xg = ({
  interactionType: e,
  name: t,
  time: n,
  renderTime: r,
  eHandlerTimeExcludingRenders: o,
  toRafTime: i,
  commitTime: a,
  framePresentTime: l,
  formattedReactData: s
}) => `Your goal will be to help me find the source of a performance problem. I collected a large dataset about this specific performance problem.

There was a ${e} on a component named ${t}. This means, roughly, the component that handled the ${e} event was named ${t}.

We have a set of high level, and low level data about the performance issue.

The click took ${n.toFixed(0)}ms from interaction start, to when a new frame was presented to a user.

We also provide you with a breakdown of what the browser spent time on during the period of interaction start to frame presentation.

- react component render time: ${r.toFixed(0)}ms
- how long it took to run javascript event handlers (EXCLUDING REACT RENDERS): ${o.toFixed(0)}ms
- how long it took from the last event handler time, to the last request animation frame: ${i.toFixed(0)}ms
	- things like prepaint, style recalculations, layerization, async web API's like observers may occur during this time
- how long it took from the last request animation frame to when the dom was committed: ${a.toFixed(0)}ms
	- during this period you will see paint, commit, potential style recalcs, and other misc browser activity. Frequently high times here imply css that makes the browser do a lot of work, or mutating expensive dom properties during the event handler stage. This can be many things, but it narrows the problem scope significantly when this is high
${l === null ? "" : `- how long it took from dom commit for the frame to be presented: ${l.toFixed(0)}ms. This is when information about how to paint the next frame is sent to the compositor threads, and when the GPU does work. If this is high, look for issues that may be a bottleneck for operations occurring during this time`}

We also have lower level information about react components, such as their render time, and which props/state/context changed when they re-rendered.

${s}


You may notice components have many renders, but much fewer props/state/context changes. This normally implies most of the components could of been memoized to avoid computation

It's also important to remember if a component had no props/state/context change, and it was memoized, it would not render. So a flow we can go through is:
- find the most expensive components
- see what's causing them to render
- determine how you can make those state/props/context not change for a large set of the renders
- once there are no more changes left, you can memoize the component so it no longer unnecessarily re-renders. 


An important thing to note is that if you see a lot of react renders (some components with very high render counts), but javascript excluding renders is much higher than render time, it is possible that the components with lots of renders run hooks like useEffect/useLayoutEffect, which run during the JS event handler period.

It's also good to note that react profiles hook times in development, and if many hooks are called (lets say 5,000 components all called a useEffect), it will have to profile every single one. And it may also be the case the comparison of the hooks dependency can be expensive, and that would not be tracked in render time.

If it's not possible to explain the root problem from this data, please ask me for more data explicitly, and what we would need to know to find the source of the performance problem.
`, pi = (e, t) => He(() => {
  switch (e) {
    case "data":
      switch (t.kind) {
        case "dropped-frames":
          return Yg({
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            otherTime: t.timing.otherTime
          });
        case "interaction":
          return Wg({
            commitTime: t.timing.frameConstruction,
            eHandlerTimeExcludingRenders: t.timing.otherJSTime,
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            framePresentTime: t.timing.frameDraw,
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            toRafTime: t.timing.framePreparation
          });
      }
    case "explanation":
      switch (t.kind) {
        case "dropped-frames":
          return Bg({
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            otherTime: t.timing.otherTime
          });
        case "interaction":
          return Xg({
            commitTime: t.timing.frameConstruction,
            eHandlerTimeExcludingRenders: t.timing.otherJSTime,
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            framePresentTime: t.timing.frameDraw,
            interactionType: t.type,
            name: Pn(t.componentPath),
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            time: Ce(t.timing),
            toRafTime: t.timing.framePreparation
          });
      }
    case "fix":
      switch (t.kind) {
        case "dropped-frames":
          return Ug({
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            otherTime: t.timing.otherTime
          });
        case "interaction":
          return Hg({
            commitTime: t.timing.frameConstruction,
            componentPath: t.componentPath.join(">"),
            eHandlerTimeExcludingRenders: t.timing.otherJSTime,
            formattedReactData: At(
              t.groupedFiberRenders
            ),
            framePresentTime: t.timing.frameDraw,
            interactionType: t.type,
            name: Pn(t.componentPath),
            renderTime: t.groupedFiberRenders.reduce(
              (n, r) => n + r.totalTime,
              0
            ),
            time: Ce(t.timing),
            toRafTime: t.timing.framePreparation
          });
      }
  }
}), Gg = ({
  selectedEvent: e
}) => {
  const [t, n] = J(
    "fix"
  ), [r, o] = J(!1);
  return /* @__PURE__ */ c("div", { className: x(["w-full h-full"]), children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: x([
          "border border-[#27272A] rounded-sm h-4/5 text-xs overflow-hidden"
        ]),
        children: [
          /* @__PURE__ */ c("div", { className: x(["bg-[#18181B] p-1 rounded-t-sm"]), children: /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-1"]), children: [
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => n("fix"),
                className: x([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  t === "fix" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Fix"
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => n("explanation"),
                className: x([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  t === "explanation" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Explanation"
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => n("data"),
                className: x([
                  "flex items-center justify-center whitespace-nowrap py-1.5 px-3 rounded-sm",
                  t === "data" ? "text-white bg-[#7521c8]" : "text-[#6E6E77] hover:text-white"
                ]),
                children: "Data"
              }
            )
          ] }) }),
          /* @__PURE__ */ c("div", { className: x(["overflow-y-auto h-full"]), children: /* @__PURE__ */ c(
            "pre",
            {
              className: x([
                "p-2 h-full",
                "whitespace-pre-wrap break-words",
                "text-gray-300 font-mono "
              ]),
              children: pi(t, e)
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ c(
      "button",
      {
        onClick: async () => {
          const i = pi(t, e);
          await navigator.clipboard.writeText(i), o(!0), setTimeout(() => o(!1), 1e3);
        },
        className: x([
          "mt-4 px-4 py-2 bg-[#18181B] text-[#6E6E77] rounded-sm",
          "hover:text-white transition-colors duration-200",
          "flex items-center justify-center gap-x-2 text-xs"
        ]),
        children: [
          /* @__PURE__ */ c("span", { children: r ? "Copied!" : "Copy Prompt" }),
          /* @__PURE__ */ c(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: x([
                "transition-transform duration-200",
                r && "scale-110"
              ]),
              children: r ? /* @__PURE__ */ c("path", { d: "M20 6L9 17l-5-5" }) : /* @__PURE__ */ c(ne, { children: [
                /* @__PURE__ */ c("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
                /* @__PURE__ */ c("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
              ] })
            }
          )
        ]
      }
    )
  ] });
}, qg = (e, t) => {
  switch (e.kind) {
    // todo: push instead of conditional spread
    case "dropped-frames":
      return [
        ...t ? [
          {
            name: "Total Processing Time",
            time: Ce(e.timing),
            color: "bg-red-500",
            kind: "total-processing-time"
          }
        ] : [
          {
            name: "Renders",
            time: e.timing.renderTime,
            color: "bg-purple-500",
            kind: "render"
          },
          {
            name: "JavaScript, DOM updates, Draw Frame",
            time: e.timing.otherTime,
            color: "bg-[#4b4b4b]",
            kind: "other-frame-drop"
          }
        ]
      ];
    case "interaction":
      return [
        ...t ? [] : [
          {
            name: "Renders",
            time: e.timing.renderTime,
            color: "bg-purple-500",
            kind: "render"
          }
        ],
        {
          name: t ? "React Renders, Hooks, Other JavaScript" : "JavaScript/React Hooks ",
          time: e.timing.otherJSTime,
          color: "bg-[#EFD81A]",
          kind: "other-javascript"
        },
        {
          name: "Update DOM and Draw New Frame",
          time: Ce(e.timing) - e.timing.renderTime - e.timing.otherJSTime,
          color: "bg-[#1D3A66]",
          kind: "other-not-javascript"
        }
      ];
  }
}, Kg = ({
  selectedEvent: e
}) => {
  var t, n;
  const [r] = J((t = jr()) != null ? t : !1), { notificationState: o } = ze(), [i, a] = J(
    (n = o.routeMessage) != null && n.name ? [o.routeMessage.name] : []
  ), l = qg(e, r), s = Ai(qi);
  q(() => {
    var p;
    if ((p = o.routeMessage) != null && p.name) {
      const d = s == null ? void 0 : s.querySelector("#overview-scroll-container"), f = s == null ? void 0 : s.querySelector(
        `#react-scan-overview-bar-${o.routeMessage.name}`
      );
      if (d && f) {
        const h = f.getBoundingClientRect().top, m = d.getBoundingClientRect().top, v = h - m;
        d.scrollTop = d.scrollTop + v;
      }
    }
  }, [o.route]), q(() => {
    o.route === "other-visualization" && a(
      (p) => {
        var d;
        return (d = o.routeMessage) != null && d.name ? [o.routeMessage.name] : p;
      }
    );
  }, [o.route]);
  const u = l.reduce((p, d) => p + d.time, 0);
  return /* @__PURE__ */ c("div", { className: "rounded-sm border border-zinc-800 text-xs", children: [
    /* @__PURE__ */ c("div", { className: "p-2 border-b border-zinc-800 bg-zinc-900/50", children: /* @__PURE__ */ c("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ c("h3", { className: "text-xs font-medium", children: "What was time spent on?" }),
      /* @__PURE__ */ c("span", { className: "text-xs text-zinc-400", children: [
        "Total: ",
        u.toFixed(0),
        "ms"
      ] })
    ] }) }),
    /* @__PURE__ */ c("div", { className: "divide-y divide-zinc-800", children: l.map((p) => {
      const d = i.includes(p.kind);
      return /* @__PURE__ */ c("div", { id: `react-scan-overview-bar-${p.kind}`, children: [
        /* @__PURE__ */ c(
          "button",
          {
            onClick: () => a(
              (f) => f.includes(p.kind) ? f.filter((h) => h !== p.kind) : [...f, p.kind]
            ),
            className: "w-full px-3 py-2 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors",
            children: /* @__PURE__ */ c("div", { className: "flex-1", children: [
              /* @__PURE__ */ c("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ c(
                    "svg",
                    {
                      className: `h-4 w-4 text-zinc-400 transition-transform ${d ? "rotate-90" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ c(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M9 5l7 7-7 7"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ c("span", { className: "font-medium flex items-center text-left", children: p.name })
                ] }),
                /* @__PURE__ */ c("span", { className: " text-zinc-400", children: [
                  p.time.toFixed(0),
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ c("div", { className: "h-1 bg-zinc-800 rounded-full overflow-hidden", children: /* @__PURE__ */ c(
                "div",
                {
                  className: `h-full ${p.color} transition-all`,
                  style: {
                    width: `${p.time / u * 100}%`
                  }
                }
              ) })
            ] })
          }
        ),
        d && /* @__PURE__ */ c("div", { className: "bg-zinc-900/30 border-t border-zinc-800 px-2.5 py-3", children: /* @__PURE__ */ c("p", { className: " text-zinc-400 mb-4 text-xs", children: He(() => {
          switch (e.kind) {
            case "interaction":
              switch (p.kind) {
                case "render":
                  return /* @__PURE__ */ c(
                    Pt,
                    {
                      input: Zg(e)
                    }
                  );
                case "other-javascript":
                  return /* @__PURE__ */ c(
                    Pt,
                    {
                      input: Qg(e)
                    }
                  );
                case "other-not-javascript":
                  return /* @__PURE__ */ c(
                    Pt,
                    {
                      input: Jg(e)
                    }
                  );
              }
            case "dropped-frames":
              switch (p.kind) {
                case "total-processing-time":
                  return /* @__PURE__ */ c(
                    Pt,
                    {
                      input: {
                        kind: "total-processing",
                        data: {
                          time: Ce(e.timing)
                        }
                      }
                    }
                  );
                case "render":
                  return /* @__PURE__ */ c(ne, { children: /* @__PURE__ */ c(
                    Pt,
                    {
                      input: {
                        kind: "render",
                        data: {
                          topByTime: e.groupedFiberRenders.toSorted(
                            (f, h) => h.totalTime - f.totalTime
                          ).slice(0, 3).map((f) => ({
                            name: f.name,
                            percentage: f.totalTime / Ce(
                              e.timing
                            )
                          }))
                        }
                      }
                    }
                  ) });
                case "other-frame-drop":
                  return /* @__PURE__ */ c(
                    Pt,
                    {
                      input: {
                        kind: "other"
                      }
                    }
                  );
              }
          }
        }) }) })
      ] }, p.kind);
    }) })
  ] });
}, Jg = (e) => {
  const t = e.groupedFiberRenders.reduce(
    (i, a) => i + a.count,
    0
  ), n = e.timing.renderTime, r = Ce(e.timing), o = n / r * 100;
  return t > 100 ? {
    kind: "high-render-count-update-dom-draw-frame",
    data: {
      count: t,
      percentageOfTotal: o,
      copyButton: /* @__PURE__ */ c(ys, {})
    }
  } : {
    kind: "update-dom-draw-frame",
    data: {
      copyButton: /* @__PURE__ */ c(ys, {})
    }
  };
}, ys = () => {
  const [e, t] = J(!1), { notificationState: n } = ze();
  return /* @__PURE__ */ c(
    "button",
    {
      onClick: async () => {
        n.selectedEvent && (await navigator.clipboard.writeText(
          pi("explanation", n.selectedEvent)
        ), t(!0), setTimeout(() => t(!1), 1e3));
      },
      className: "bg-zinc-800 flex hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded gap-x-3",
      children: [
        /* @__PURE__ */ c("span", { children: e ? "Copied!" : "Copy Prompt" }),
        /* @__PURE__ */ c(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: x([
              "transition-transform duration-200",
              e && "scale-110"
            ]),
            children: e ? /* @__PURE__ */ c("path", { d: "M20 6L9 17l-5-5" }) : /* @__PURE__ */ c(ne, { children: [
              /* @__PURE__ */ c("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
              /* @__PURE__ */ c("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
            ] })
          }
        )
      ]
    }
  );
}, Zg = (e) => e.timing.renderTime / Ce(e.timing) > 0.3 ? {
  kind: "render",
  data: {
    topByTime: e.groupedFiberRenders.toSorted((t, n) => n.totalTime - t.totalTime).slice(0, 3).map((t) => ({
      percentage: t.totalTime / Ce(e.timing),
      name: t.name
    }))
  }
} : {
  kind: "other"
}, Qg = (e) => {
  const t = e.groupedFiberRenders.reduce(
    (n, r) => n + r.count,
    0
  );
  return e.timing.otherJSTime / Ce(e.timing) < 0.2 ? {
    kind: "js-explanation-base"
  } : e.groupedFiberRenders.find((n) => n.count > 200) || e.groupedFiberRenders.reduce((n, r) => n + r.count, 0) > 500 ? {
    kind: "high-render-count-high-js",
    data: {
      renderCount: t,
      topByCount: e.groupedFiberRenders.filter((n) => n.count > 100).toSorted((n, r) => r.count - n.count).slice(0, 3)
    }
  } : e.timing.otherJSTime / Ce(e.timing) > 0.3 ? e.timing.renderTime > 0.2 ? {
    kind: "js-explanation-base"
  } : {
    kind: "low-render-count-high-js",
    data: {
      renderCount: t
    }
  } : {
    kind: "js-explanation-base"
  };
}, Pt = ({ input: e }) => {
  switch (e.kind) {
    case "total-processing":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: [
              "This is the time it took to draw the entire frame that was presented to the user. To be at 60FPS, this number needs to be ",
              "<=16ms"
            ] }),
            /* @__PURE__ */ c("p", { children: 'To debug the issue, check the "Ranked" tab to see if there are significant component renders' }),
            /* @__PURE__ */ c("p", { children: "On a production React build, React Scan can't access the time it took for component to render. To get that information, run React Scan on a development build" }),
            /* @__PURE__ */ c("p", { children: [
              "To understand precisely what caused the slowdown while in production, use the ",
              /* @__PURE__ */ c("strong", { children: "Chrome profiler" }),
              " and analyze the function call times."
            ] }),
            /* @__PURE__ */ c("p", {})
          ]
        }
      );
    case "render":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "This is the time it took React to run components, and internal logic to handle the output of your component." }),
            /* @__PURE__ */ c("div", { className: x(["flex flex-col"]), children: [
              /* @__PURE__ */ c("p", { children: "The slowest components for this time period were:" }),
              e.data.topByTime.map((t) => /* @__PURE__ */ c("div", { children: [
                /* @__PURE__ */ c("strong", { children: t.name }),
                ":",
                " ",
                (t.percentage * 100).toFixed(0),
                "% of total"
              ] }, t.name))
            ] }),
            /* @__PURE__ */ c("p", { children: 'To view the render times of all your components, and what caused them to render, go to the "Ranked" tab' }),
            /* @__PURE__ */ c("p", { children: 'The "Ranked" tab shows the render times of every component.' }),
            /* @__PURE__ */ c("p", { children: "The render times of the same components are grouped together into one bar." }),
            /* @__PURE__ */ c("p", { children: "Clicking the component will show you what props, state, or context caused the component to re-render." })
          ]
        }
      );
    case "js-explanation-base":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            /* @__PURE__ */ c("p", { children: [
              "The most common culprit for high JS time is expensive hooks, like expensive callbacks inside of ",
              /* @__PURE__ */ c("code", { children: "useEffect" }),
              "'s or a large number of useEffect's called, but this can also be JavaScript event handlers (",
              /* @__PURE__ */ c("code", { children: "'onclick'" }),
              ", ",
              /* @__PURE__ */ c("code", { children: "'onchange'" }),
              ") that performed expensive computation."
            ] }),
            /* @__PURE__ */ c("p", { children: "If you have lots of components rendering that call hooks, like useEffect, it can add significant overhead even if the callbacks are not expensive. If this is the case, you can try optimizing the renders of those components to avoid the hook from having to run." }),
            /* @__PURE__ */ c("p", { children: [
              "You should profile your app using the",
              " ",
              /* @__PURE__ */ c("strong", { children: "Chrome DevTools profiler" }),
              " to learn exactly which functions took the longest to execute."
            ] })
          ]
        }
      );
    case "high-render-count-high-js":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            e.data.renderCount === 0 ? /* @__PURE__ */ c(ne, { children: [
              /* @__PURE__ */ c("p", { children: "There were no renders, which means nothing related to React caused this slowdown. The most likely cause of the slowdown is a slow JavaScript event handler, or code related to a Web API" }),
              /* @__PURE__ */ c("p", { children: [
                "You should try to reproduce the slowdown while profiling your website with the",
                /* @__PURE__ */ c("strong", { children: "Chrome DevTools profiler" }),
                " to see exactly what functions took the longest to execute."
              ] })
            ] }) : /* @__PURE__ */ c(ne, { children: [
              " ",
              /* @__PURE__ */ c("p", { children: [
                "There were ",
                /* @__PURE__ */ c("strong", { children: e.data.renderCount }),
                " renders, which could have contributed to the high JavaScript/Hook time if they ran lots of hooks, like ",
                /* @__PURE__ */ c("code", { children: "useEffects" }),
                "."
              ] }),
              /* @__PURE__ */ c("div", { className: x(["flex flex-col"]), children: [
                /* @__PURE__ */ c("p", { children: "You should try optimizing the renders of:" }),
                e.data.topByCount.map((t) => /* @__PURE__ */ c("div", { children: [
                  "- ",
                  /* @__PURE__ */ c("strong", { children: t.name }),
                  " (rendered ",
                  t.count,
                  "x)"
                ] }, t.name))
              ] }),
              "and then checking if the problem still exists.",
              /* @__PURE__ */ c("p", { children: [
                "You can also try profiling your app using the",
                " ",
                /* @__PURE__ */ c("strong", { children: "Chrome DevTools profiler" }),
                " to see exactly what functions took the longest to execute."
              ] })
            ] })
          ]
        }
      );
    case "low-render-count-high-js":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "This is the period when JavaScript hooks and other JavaScript outside of React Renders run." }),
            /* @__PURE__ */ c("p", { children: [
              "There were only ",
              /* @__PURE__ */ c("strong", { children: e.data.renderCount }),
              " renders detected, which means either you had very expensive hooks like",
              " ",
              /* @__PURE__ */ c("code", { children: "useEffect" }),
              "/",
              /* @__PURE__ */ c("code", { children: "useLayoutEffect" }),
              ", or there is other JavaScript running during this interaction that took up the majority of the time."
            ] }),
            /* @__PURE__ */ c("p", { children: [
              "To understand precisely what caused the slowdown, use the",
              " ",
              /* @__PURE__ */ c("strong", { children: "Chrome profiler" }),
              " and analyze the function call times."
            ] })
          ]
        }
      );
    case "high-render-count-update-dom-draw-frame":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction." }),
            /* @__PURE__ */ c("p", { children: "This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations." }),
            /* @__PURE__ */ c("p", { children: [
              "During this interaction, there were",
              " ",
              /* @__PURE__ */ c("strong", { children: e.data.count }),
              " renders, which was",
              " ",
              /* @__PURE__ */ c("strong", { children: [
                e.data.percentageOfTotal.toFixed(0),
                "%"
              ] }),
              " of the time spent processing"
            ] }),
            /* @__PURE__ */ c("p", { children: "The work performed as a result of the renders may have forced the browser to spend a lot of time to draw the next frame." }),
            /* @__PURE__ */ c("p", { children: 'You can try optimizing the renders to see if the performance problem still exists using the "Ranked" tab.' }),
            /* @__PURE__ */ c("p", { children: "If you use an AI-based code editor, you can export the performance data collected as a prompt." }),
            /* @__PURE__ */ c("p", { children: e.data.copyButton }),
            /* @__PURE__ */ c("p", { children: "Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem." }),
            /* @__PURE__ */ c("p", { children: 'For a larger selection of prompts, try the "Prompts" tab' })
          ]
        }
      );
    case "update-dom-draw-frame":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: "These are the calculations the browser is forced to do in response to the JavaScript that ran during the interaction." }),
            /* @__PURE__ */ c("p", { children: "This can be caused by CSS updates/CSS recalculations, or new DOM elements/DOM mutations." }),
            /* @__PURE__ */ c("p", { children: "If you use an AI-based code editor, you can export the performance data collected as a prompt." }),
            /* @__PURE__ */ c("p", { children: e.data.copyButton }),
            /* @__PURE__ */ c("p", { children: "Provide this formatted data to the model and ask it to find, or fix, what could be causing this performance problem." }),
            /* @__PURE__ */ c("p", { children: 'For a larger selection of prompts, try the "Prompts" tab' })
          ]
        }
      );
    case "other":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x([
            "text-[#E4E4E7] text-[10px] leading-6 flex flex-col gap-y-2"
          ]),
          children: [
            /* @__PURE__ */ c("p", { children: [
              "This is the time it took to run everything other than React renders. This can be hooks like ",
              /* @__PURE__ */ c("code", { children: "useEffect" }),
              ", other JavaScript not part of React, or work the browser has to do to update the DOM and draw the next frame."
            ] }),
            /* @__PURE__ */ c("p", { children: [
              "To get a better picture of what happened, profile your app using the",
              " ",
              /* @__PURE__ */ c("strong", { children: "Chrome profiler" }),
              " when the performance problem arises."
            ] })
          ]
        }
      );
  }
}, fe = null, we = null, ce = _e({
  kind: "idle",
  current: null
}), vo = null, Yt = () => {
  vo && cancelAnimationFrame(vo), vo = requestAnimationFrame(() => {
    if (!fe || !we)
      return;
    we.clearRect(0, 0, fe.width, fe.height);
    const e = "hsl(271, 76%, 53%)", t = ce.value, { alpha: n, current: r } = He(() => {
      var o, i, a;
      switch (t.kind) {
        case "transition": {
          const l = (o = t.current) != null && o.alpha && t.current.alpha > 0 ? t.current : t.transitionTo;
          return {
            alpha: l ? l.alpha : 0,
            current: l
          };
        }
        case "move-out":
          return { alpha: (a = (i = t.current) == null ? void 0 : i.alpha) != null ? a : 0, current: t.current };
        case "idle":
          return { alpha: 1, current: t.current };
      }
    });
    switch (r == null || r.rects.forEach((o) => {
      we && (we.shadowColor = e, we.shadowBlur = 6, we.strokeStyle = e, we.lineWidth = 2, we.globalAlpha = n, we.beginPath(), we.rect(o.left, o.top, o.width, o.height), we.stroke(), we.shadowBlur = 0, we.beginPath(), we.rect(o.left, o.top, o.width, o.height), we.stroke());
    }), t.kind) {
      case "move-out": {
        if (t.current.alpha === 0) {
          ce.value = {
            kind: "idle",
            current: null
          };
          return;
        }
        t.current.alpha <= 0.01 && (t.current.alpha = 0), t.current.alpha = Math.max(0, t.current.alpha - 0.03), Yt();
        return;
      }
      case "transition": {
        if (t.current && t.current.alpha > 0) {
          t.current.alpha = Math.max(0, t.current.alpha - 0.03), Yt();
          return;
        }
        if (t.transitionTo.alpha === 1) {
          ce.value = {
            kind: "idle",
            current: t.transitionTo
          };
          return;
        }
        t.transitionTo.alpha = Math.min(t.transitionTo.alpha + 0.03, 1), Yt();
      }
      case "idle":
        return;
    }
  });
}, wo = null, ev = (e) => {
  if (fe = document.createElement("canvas"), we = fe.getContext("2d", { alpha: !0 }), !we) return null;
  const t = window.devicePixelRatio || 1, { innerWidth: n, innerHeight: r } = window;
  fe.style.width = `${n}px`, fe.style.height = `${r}px`, fe.width = n * t, fe.height = r * t, fe.style.position = "fixed", fe.style.left = "0", fe.style.top = "0", fe.style.pointerEvents = "none", fe.style.zIndex = "2147483600", we.scale(t, t), e.appendChild(fe), wo && window.removeEventListener("resize", wo);
  const o = () => {
    if (!fe || !we) return;
    const i = window.devicePixelRatio || 1, { innerWidth: a, innerHeight: l } = window;
    fe.style.width = `${a}px`, fe.style.height = `${l}px`, fe.width = a * i, fe.height = l * i, we.scale(i, i), Yt();
  };
  return wo = o, window.addEventListener("resize", o), ce.subscribe(() => {
    requestAnimationFrame(() => {
      Yt();
    });
  }), tv;
};
function tv() {
  fe != null && fe.parentNode && fe.parentNode.removeChild(fe), fe = null, we = null;
}
var un = () => {
  var e, t;
  const n = ce.value.current ? ce.value.current : ce.value.kind === "transition" ? ce.value.transitionTo : null;
  if (n) {
    if (ce.value.kind === "transition") {
      ce.value = {
        kind: "move-out",
        // because we want to dynamically fade this value
        current: ((e = ce.value.current) == null ? void 0 : e.alpha) === 0 ? (
          // we want to only start fading from transition if current is done animating out
          ce.value.transitionTo
        ) : (
          // if current doesn't exist then transition must exist
          (t = ce.value.current) != null ? t : ce.value.transitionTo
        )
      };
      return;
    }
    ce.value = {
      kind: "move-out",
      current: D({
        alpha: 0
      }, n)
    };
  }
}, nv = ({
  selectedEvent: e
}) => {
  const t = Ce(e.timing), n = t - e.timing.renderTime, [r] = J(jr()), i = e.groupedFiberRenders.map((u) => ({
    event: u,
    kind: "render",
    totalTime: r ? u.count : u.totalTime
  })), a = He(() => {
    switch (e.kind) {
      case "dropped-frames":
        return e.timing.renderTime / t < 0.1;
      case "interaction":
        return (e.timing.otherJSTime + e.timing.renderTime) / t < 0.2;
    }
  });
  e.kind === "interaction" && !r && i.push({
    kind: "other-javascript",
    totalTime: e.timing.otherJSTime
  }), a && !r && (e.kind === "interaction" ? i.push({
    kind: "other-not-javascript",
    totalTime: Ce(e.timing) - e.timing.renderTime - e.timing.otherJSTime
  }) : i.push({
    kind: "other-frame-drop",
    totalTime: n
  }));
  const l = j({
    lastCallAt: null,
    timer: null
  }), s = i.reduce((u, p) => u + p.totalTime, 0);
  return /* @__PURE__ */ c("div", { className: x(["flex flex-col h-full w-full gap-y-1"]), children: [
    He(() => {
      if (r && i.length === 0)
        return /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center h-full text-zinc-400", children: [
          /* @__PURE__ */ c("p", { className: "text-sm w-full text-left text-white mb-1.5", children: "No data available" }),
          /* @__PURE__ */ c("p", { className: "text-x w-full text-lefts", children: "No data was collected during this period" })
        ] });
      if (i.length === 0)
        return /* @__PURE__ */ c("div", { className: "flex flex-col items-center justify-center h-full text-zinc-400", children: [
          /* @__PURE__ */ c("p", { className: "text-sm w-full text-left text-white mb-1.5", children: "No renders collected" }),
          /* @__PURE__ */ c("p", { className: "text-x w-full text-lefts", children: "There were no renders during this period" })
        ] });
    }),
    i.toSorted((u, p) => p.totalTime - u.totalTime).map((u) => /* @__PURE__ */ c(
      Uc,
      {
        bars: i,
        bar: u,
        debouncedMouseEnter: l,
        totalBarTime: s,
        isProduction: r
      },
      u.kind === "render" ? u.event.id : u.kind
    ))
  ] });
}, rv = (e) => e.current && e.current.alpha > 0 ? "fading-out" : "fading-in", Uc = ({
  bar: e,
  debouncedMouseEnter: t,
  totalBarTime: n,
  isProduction: r,
  bars: o,
  depth: i = 0
}) => {
  const { setNotificationState: a, setRoute: l } = ze(), [s, u] = J(!1), p = e.kind === "render" ? e.event.parents.size === 0 : !0, d = o.filter(
    (m) => m.kind === "render" && e.kind === "render" ? e.event.parents.has(m.event.name) && m.event.name !== e.event.name : !1
  ), f = e.kind === "render" ? Array.from(e.event.parents).filter(
    (m) => !o.some(
      (v) => v.kind === "render" && v.event.name === m
    )
  ) : [], h = () => {
    e.kind === "render" ? (a((m) => H(D({}, m), {
      selectedFiber: e.event
    })), l({
      route: "render-explanation",
      routeMessage: null
    })) : l({
      route: "other-visualization",
      routeMessage: {
        kind: "auto-open-overview-accordion",
        name: e.kind
      }
    });
  };
  return /* @__PURE__ */ c("div", { className: "w-full", children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: x(["w-full flex items-center relative text-xs min-w-0"]),
        children: [
          /* @__PURE__ */ c(
            "button",
            {
              onMouseLeave: () => {
                t.current.timer && clearTimeout(t.current.timer), un();
              },
              onMouseEnter: async () => {
                const m = async () => {
                  if (t.current.lastCallAt = Date.now(), e.kind !== "render") {
                    const A = ce.value.current ? ce.value.current : ce.value.kind === "transition" ? ce.value.transitionTo : null;
                    if (!A) {
                      ce.value = {
                        kind: "idle",
                        current: null
                      };
                      return;
                    }
                    ce.value = {
                      kind: "move-out",
                      current: D({
                        alpha: 0
                      }, A)
                    };
                    return;
                  }
                  const v = ce.value, w = He(() => {
                    switch (v.kind) {
                      case "transition":
                        return v.transitionTo;
                      case "idle":
                      case "move-out":
                        return v.current;
                    }
                  }), g = [];
                  if (v.kind === "transition") {
                    const A = rv(v);
                    He(() => {
                      switch (A) {
                        case "fading-in": {
                          ce.value = {
                            kind: "transition",
                            current: v.transitionTo,
                            transitionTo: {
                              rects: g,
                              alpha: 0,
                              name: e.event.name
                            }
                          };
                          return;
                        }
                        case "fading-out": {
                          ce.value = {
                            kind: "transition",
                            current: ce.value.current ? D({
                              alpha: 0
                            }, ce.value.current) : null,
                            transitionTo: {
                              rects: g,
                              alpha: 0,
                              name: e.event.name
                            }
                          };
                          return;
                        }
                      }
                    });
                  } else
                    ce.value = {
                      kind: "transition",
                      transitionTo: {
                        rects: g,
                        alpha: 0,
                        name: e.event.name
                      },
                      current: w ? D({
                        alpha: 0
                      }, w) : null
                    };
                  const y = e.event.elements.filter(
                    (A) => A instanceof Element
                  );
                  try {
                    for (var k = Il(Mc(y)), S, T, E; S = !(T = await k.next()).done; S = !1)
                      T.value.forEach(({ boundingClientRect: I }) => {
                        g.push(I);
                      }), Yt();
                  } catch (A) {
                    E = [A];
                  } finally {
                    try {
                      S && (T = k.return) && await T.call(k);
                    } finally {
                      if (E)
                        throw E[0];
                    }
                  }
                };
                if (t.current.lastCallAt && Date.now() - t.current.lastCallAt < 200) {
                  t.current.timer && clearTimeout(t.current.timer), t.current.timer = setTimeout(() => {
                    m();
                  }, 200);
                  return;
                }
                m();
              },
              onClick: h,
              className: x([
                "h-full w-[90%] flex items-center hover:bg-[#0f0f0f] rounded-l-md min-w-0 relative"
              ]),
              children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    style: {
                      minWidth: "fit-content",
                      width: `${e.totalTime / n * 100}%`
                    },
                    className: x([
                      "flex items-center rounded-sm text-white text-xs h-[28px] shrink-0",
                      e.kind === "render" && "bg-[#412162] group-hover:bg-[#5b2d89]",
                      e.kind === "other-frame-drop" && "bg-[#44444a] group-hover:bg-[#6a6a6a]",
                      e.kind === "other-javascript" && "bg-[#efd81a6b] group-hover:bg-[#efda1a2f]",
                      e.kind === "other-not-javascript" && "bg-[#214379d4] group-hover:bg-[#21437982]"
                    ])
                  }
                ),
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "absolute inset-0 flex items-center px-2",
                      "min-w-0"
                    ]),
                    children: /* @__PURE__ */ c("div", { className: "flex items-center gap-x-2 min-w-0 w-full", children: [
                      /* @__PURE__ */ c("span", { className: x(["truncate"]), children: He(() => {
                        switch (e.kind) {
                          case "other-frame-drop":
                            return "JavaScript, DOM updates, Draw Frame";
                          case "other-javascript":
                            return "JavaScript/React Hooks";
                          case "other-not-javascript":
                            return "Update DOM and Draw New Frame";
                          case "render":
                            return e.event.name;
                        }
                      }) }),
                      e.kind === "render" && Pg(e.event) && /* @__PURE__ */ c(
                        "div",
                        {
                          style: {
                            lineHeight: "10px"
                          },
                          className: x([
                            "px-1 py-0.5 bg-[#6a369e] flex items-center rounded-sm font-semibold text-[8px] shrink-0"
                          ]),
                          children: "Memoizable"
                        }
                      )
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => e.kind === "render" && !p && u(!s),
              className: x([
                "flex items-center min-w-fit shrink-0 rounded-r-md h-[28px]",
                !p && "hover:bg-[#0f0f0f]",
                e.kind === "render" && !p ? "cursor-pointer" : "cursor-default"
              ]),
              children: [
                /* @__PURE__ */ c("div", { className: "w-[20px] flex items-center justify-center", children: e.kind === "render" && !p && /* @__PURE__ */ c(
                  Wc,
                  {
                    className: x(
                      "transition-transform",
                      s && "rotate-90"
                    ),
                    size: 16
                  }
                ) }),
                /* @__PURE__ */ c(
                  "div",
                  {
                    style: {
                      minWidth: p ? "fit-content" : r ? "30px" : "60px"
                    },
                    className: "flex items-center justify-end gap-x-1",
                    children: [
                      e.kind === "render" && /* @__PURE__ */ c("span", { className: x(["text-[10px]"]), children: [
                        "x",
                        e.event.count
                      ] }),
                      (e.kind !== "render" || !r) && /* @__PURE__ */ c("span", { className: "text-[10px] text-[#7346a0] pr-1", children: [
                        e.totalTime < 1 ? "<1" : e.totalTime.toFixed(0),
                        "ms"
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          i === 0 && /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "absolute right-0 top-1/2 transition-none -translate-y-1/2 bg-white text-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-16",
                "pointer-events-none"
              ]),
              children: "Click to learn more"
            }
          )
        ]
      }
    ),
    s && (d.length > 0 || f.length > 0) && /* @__PURE__ */ c("div", { className: "pl-3 flex flex-col gap-y-1 mt-1", children: [
      d.toSorted((m, v) => v.totalTime - m.totalTime).map((m, v) => /* @__PURE__ */ c(
        Uc,
        {
          depth: i + 1,
          bar: m,
          debouncedMouseEnter: t,
          totalBarTime: n,
          isProduction: r,
          bars: o
        },
        v
      )),
      f.map((m) => /* @__PURE__ */ c("div", { className: "w-full", children: /* @__PURE__ */ c("div", { className: "w-full flex items-center relative text-xs", children: /* @__PURE__ */ c("div", { className: "h-full w-full flex items-center relative", children: [
        /* @__PURE__ */ c("div", { className: "flex items-center rounded-sm text-white text-xs h-[28px] w-full" }),
        /* @__PURE__ */ c("div", { className: "absolute inset-0 flex items-center px-2", children: /* @__PURE__ */ c("span", { className: "truncate whitespace-nowrap text-white/70 w-full", children: m }) })
      ] }) }) }, m))
    ] })
  ] });
}, ov = ({
  selectedEvent: e,
  selectedFiber: t
}) => {
  const { setRoute: n } = ze(), [r, o] = J(!0), [i] = J(jr());
  Ii(() => {
    const l = localStorage.getItem("react-scan-tip-shown"), s = l === "true" ? !0 : l === "false" ? !1 : null;
    if (s === null) {
      o(!0), localStorage.setItem("react-scan-tip-is-shown", "true");
      return;
    }
    s || o(!1);
  }, []);
  const a = t.changes.context.length === 0 && t.changes.props.length === 0 && t.changes.state.length === 0;
  return /* @__PURE__ */ c(
    "div",
    {
      className: x([
        "w-full min-h-fit h-full flex flex-col py-4 pt-0 rounded-sm"
      ]),
      children: [
        /* @__PURE__ */ c("div", { className: x(["flex items-start gap-x-4 "]), children: [
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => {
                n({
                  route: "render-visualization",
                  routeMessage: null
                });
              },
              className: x([
                "text-white hover:bg-[#34343b] flex gap-x-1 justify-center items-center mb-4 w-fit px-2.5 py-1.5 text-xs rounded-sm bg-[#18181B]"
              ]),
              children: [
                /* @__PURE__ */ c(Dg, { size: 14 }),
                " ",
                /* @__PURE__ */ c("span", { children: "Overview" })
              ]
            }
          ),
          /* @__PURE__ */ c("div", { className: x(["flex flex-col gap-y-1"]), children: [
            /* @__PURE__ */ c(
              "div",
              {
                className: x(["text-sm font-bold text-white overflow-x-hidden"]),
                children: /* @__PURE__ */ c("div", { className: "flex items-center gap-x-2 truncate", children: t.name })
              }
            ),
            /* @__PURE__ */ c("div", { className: x(["flex gap-x-2"]), children: [
              !i && /* @__PURE__ */ c(ne, { children: /* @__PURE__ */ c("div", { className: x(["text-xs text-gray-400"]), children: [
                "• Render time: ",
                t.totalTime.toFixed(0),
                "ms"
              ] }) }),
              /* @__PURE__ */ c("div", { className: x(["text-xs text-gray-400 mb-4"]), children: [
                "• Renders: ",
                t.count,
                "x"
              ] })
            ] })
          ] })
        ] }),
        r && !a && /* @__PURE__ */ c(
          "div",
          {
            className: x([
              "w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex relative"
            ]),
            children: [
              /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    o(!1), localStorage.setItem("react-scan-tip-shown", "false");
                  },
                  className: x([
                    "absolute right-2 top-2 rounded-sm p-1 hover:bg-[#18181B]"
                  ]),
                  children: /* @__PURE__ */ c(Nr, { size: 12 })
                }
              ),
              /* @__PURE__ */ c("div", { className: x(["w-1 bg-[#d36cff]"]) }),
              /* @__PURE__ */ c("div", { className: x(["flex-1"]), children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x(["px-3 py-2 text-gray-100 text-xs font-semibold"]),
                    children: "How to stop renders"
                  }
                ),
                /* @__PURE__ */ c("div", { className: x(["px-3 pb-2 text-gray-400 text-[10px]"]), children: "Stop the following props, state and context from changing between renders, and wrap the component in React.memo if not already" })
              ] })
            ]
          }
        ),
        a && /* @__PURE__ */ c(
          "div",
          {
            className: x([
              "w-full mb-4 bg-[#0A0A0A] border border-[#27272A] rounded-sm overflow-hidden flex"
            ]),
            children: [
              /* @__PURE__ */ c("div", { className: x(["w-1 bg-[#d36cff]"]) }),
              /* @__PURE__ */ c("div", { className: x(["flex-1"]), children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x(["px-3 py-2 text-gray-100 text-sm font-semibold"]),
                    children: "No changes detected"
                  }
                ),
                /* @__PURE__ */ c("div", { className: x(["px-3 pb-2 text-gray-400 text-xs"]), children: "This component would not of rendered if it was memoized" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: x(["flex w-full"]), children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "flex flex-col border border-[#27272A] rounded-l-sm overflow-hidden w-1/3"
              ]),
              children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed Props"
                  }
                ),
                t.changes.props.length > 0 ? t.changes.props.toSorted((l, s) => s.count - l.count).map((l) => /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]"
                    ]),
                    children: [
                      /* @__PURE__ */ c("span", { className: x(["text-white "]), children: l.name }),
                      /* @__PURE__ */ c(
                        "div",
                        {
                          className: x([" text-[8px]  text-[#d36cff] pl-1 py-1 "]),
                          children: [
                            l.count,
                            "/",
                            t.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  l.name
                )) : /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "flex flex-col border border-[#27272A] border-l-0 overflow-hidden w-1/3"
              ]),
              children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      " text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed State"
                  }
                ),
                t.changes.state.length > 0 ? t.changes.state.toSorted((l, s) => s.count - l.count).map((l) => /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex flex-col justify-between items-center border-t overflow-x-auto border-[#27272A] px-1 py-1 text-wrap bg-[#0A0A0A] text-[10px]"
                    ]),
                    children: [
                      /* @__PURE__ */ c("span", { className: x(["text-white "]), children: [
                        "index ",
                        l.index
                      ] }),
                      /* @__PURE__ */ c(
                        "div",
                        {
                          className: x([
                            "rounded-full  text-[#d36cff] pl-1 py-1 text-[8px]"
                          ]),
                          children: [
                            l.count,
                            "/",
                            t.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  l.index
                )) : /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A]"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "flex flex-col border border-[#27272A] border-l-0 rounded-r-sm overflow-hidden w-1/3"
              ]),
              children: [
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      " text-[14px] font-semibold px-2 py-2 bg-[#18181B] text-white flex justify-center"
                    ]),
                    children: "Changed Context"
                  }
                ),
                t.changes.context.length > 0 ? t.changes.context.toSorted((l, s) => s.count - l.count).map((l) => /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex flex-col justify-between items-center border-t  border-[#27272A] px-1 py-1 bg-[#0A0A0A] text-[10px] overflow-x-auto"
                    ]),
                    children: [
                      /* @__PURE__ */ c("span", { className: x(["text-white "]), children: l.name }),
                      /* @__PURE__ */ c(
                        "div",
                        {
                          className: x([
                            "rounded-full text-[#d36cff] pl-1 py-1 text-[8px] text-wrap"
                          ]),
                          children: [
                            l.count,
                            "/",
                            t.count,
                            "x"
                          ]
                        }
                      )
                    ]
                  },
                  l.name
                )) : /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex items-center justify-center h-full bg-[#0A0A0A] text-[#A1A1AA] border-t border-[#27272A] py-2"
                    ]),
                    children: "No changes"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}, iv = () => {
  const { notificationState: e, setNotificationState: t } = ze(), [n, r] = J("..."), o = j(null);
  if (q(() => {
    const i = setInterval(() => {
      r((a) => a === "..." ? "" : a + ".");
    }, 500);
    return () => clearInterval(i);
  }, []), !e.selectedEvent)
    return /* @__PURE__ */ c(
      "div",
      {
        ref: o,
        className: x([
          "h-full w-full flex flex-col items-center justify-center relative py-2 px-4"
        ]),
        children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "p-2 flex justify-center items-center border-[#27272A] absolute top-0 right-0"
              ]),
              children: /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    ue.value = {
                      view: "none"
                    };
                  },
                  children: /* @__PURE__ */ c(Nr, { size: 18, className: "text-[#6F6F78]" })
                }
              )
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "flex flex-col items-start pt-5 bg-[#0A0A0A] p-5 rounded-sm max-w-md",
                " shadow-lg"
              ]),
              children: /* @__PURE__ */ c("div", { className: x(["flex flex-col items-start gap-y-4"]), children: [
                /* @__PURE__ */ c("div", { className: x(["flex items-center"]), children: /* @__PURE__ */ c("span", { className: x(["text-zinc-400 font-medium text-[17px]"]), children: [
                  "Scanning for slowdowns",
                  n
                ] }) }),
                e.events.length !== 0 && /* @__PURE__ */ c("p", { className: x(["text-xs"]), children: [
                  "Click on an item in the",
                  " ",
                  /* @__PURE__ */ c("span", { className: x(["text-purple-400"]), children: "History" }),
                  " list to get started"
                ] }),
                /* @__PURE__ */ c("p", { className: x(["text-zinc-600 text-xs"]), children: "You don't need to keep this panel open for React Scan to record slowdowns" }),
                /* @__PURE__ */ c("p", { className: x(["text-zinc-600 text-xs"]), children: "Enable audio alerts to hear a delightful ding every time a large slowdown is recorded" }),
                /* @__PURE__ */ c(
                  "button",
                  {
                    onClick: () => {
                      if (e.audioNotificationsOptions.enabled) {
                        t((a) => {
                          var l, s;
                          return ((l = a.audioNotificationsOptions.audioContext) == null ? void 0 : l.state) !== "closed" && ((s = a.audioNotificationsOptions.audioContext) == null || s.close()), localStorage.setItem("react-scan-notifications-audio", "false"), H(D({}, a), {
                            audioNotificationsOptions: {
                              audioContext: null,
                              enabled: !1
                            }
                          });
                        });
                        return;
                      }
                      localStorage.setItem("react-scan-notifications-audio", "true");
                      const i = new AudioContext();
                      Di(i), t((a) => H(D({}, a), {
                        audioNotificationsOptions: {
                          enabled: !0,
                          audioContext: i
                        }
                      }));
                    },
                    className: x([
                      "px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm w-full",
                      " text-sm flex items-center gap-x-2 justify-center"
                    ]),
                    children: e.audioNotificationsOptions.enabled ? /* @__PURE__ */ c(ne, { children: /* @__PURE__ */ c("span", { className: "flex items-center gap-x-1", children: "Disable audio alerts" }) }) : /* @__PURE__ */ c(ne, { children: /* @__PURE__ */ c("span", { className: "flex items-center gap-x-1", children: "Enable audio alerts" }) })
                  }
                )
              ] })
            }
          )
        ]
      }
    );
  switch (e.route) {
    case "render-visualization":
      return /* @__PURE__ */ c(Bn, { children: /* @__PURE__ */ c(nv, { selectedEvent: e.selectedEvent }) });
    case "render-explanation": {
      if (!e.selectedFiber)
        throw new Error(
          "Invariant: must have selected fiber when viewing render explanation"
        );
      return /* @__PURE__ */ c(Bn, { children: /* @__PURE__ */ c(
        ov,
        {
          selectedFiber: e.selectedFiber,
          selectedEvent: e.selectedEvent
        }
      ) });
    }
    case "other-visualization":
      return /* @__PURE__ */ c(Bn, { children: /* @__PURE__ */ c(
        "div",
        {
          className: x(["flex w-full h-full flex-col overflow-y-auto"]),
          id: "overview-scroll-container",
          children: /* @__PURE__ */ c(
            Kg,
            {
              selectedEvent: e.selectedEvent
            }
          )
        }
      ) });
    case "optimize":
      return /* @__PURE__ */ c(Bn, { children: /* @__PURE__ */ c(Gg, { selectedEvent: e.selectedEvent }) });
  }
  e.route;
}, Bn = ({ children: e }) => {
  const { notificationState: t } = ze();
  if (!t.selectedEvent)
    throw new Error(
      "Invariant: d must have selected event when viewing render explanation"
    );
  return /* @__PURE__ */ c("div", { className: x(["w-full h-full flex flex-col gap-y-2"]), children: [
    /* @__PURE__ */ c("div", { className: x(["h-[50px] w-full"]), children: /* @__PURE__ */ c(Vg, { selectedEvent: t.selectedEvent }) }),
    /* @__PURE__ */ c(
      "div",
      {
        className: x(["h-calc(100%-50px) flex flex-col overflow-y-auto px-3"]),
        children: e
      }
    )
  ] });
}, av = ({
  selectedEvent: e
}) => {
  const t = $n(e);
  switch (e.kind) {
    case "interaction":
      return (
        // h-[48px] is a hack to adjust for header size
        /* @__PURE__ */ c(
          "div",
          {
            className: x(["w-full flex border-b border-[#27272A] min-h-[48px]"]),
            children: /* @__PURE__ */ c(
              "div",
              {
                className: x([
                  "min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4"
                ]),
                children: [
                  /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-2 "]), children: [
                    /* @__PURE__ */ c("span", { className: x(["text-[#5a5a5a] mr-0.5"]), children: e.type === "click" ? "Clicked " : "Typed in " }),
                    /* @__PURE__ */ c("span", { children: Pn(e.componentPath) }),
                    /* @__PURE__ */ c(
                      "div",
                      {
                        className: x([
                          "w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap",
                          t === "low" && "bg-green-500/50",
                          t === "needs-improvement" && "bg-[#b77116]",
                          t === "high" && "bg-[#b94040]"
                        ]),
                        children: [
                          Ce(e.timing).toFixed(0),
                          "ms processing time"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c(
                    "div",
                    {
                      className: x(["flex items-center gap-x-2  justify-end ml-auto"]),
                      children: /* @__PURE__ */ c(
                        "div",
                        {
                          className: x([
                            "p-2 flex justify-center items-center border-[#27272A]"
                          ]),
                          children: /* @__PURE__ */ c(
                            "button",
                            {
                              onClick: () => {
                                ue.value = {
                                  view: "none"
                                };
                              },
                              title: "Close",
                              children: /* @__PURE__ */ c(Nr, { size: 18, className: "text-[#6F6F78]" })
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              }
            )
          }
        )
      );
    case "dropped-frames":
      return /* @__PURE__ */ c(
        "div",
        {
          className: x(["w-full flex border-b border-[#27272A] min-h-[48px]"]),
          children: /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "min-w-fit w-full justify-start flex items-center border-r border-[#27272A] pl-5 pr-2 text-sm gap-x-4"
              ]),
              children: [
                /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-2 "]), children: [
                  "FPS Drop",
                  /* @__PURE__ */ c(
                    "div",
                    {
                      className: x([
                        "w-fit flex items-center justify-center h-fit text-white px-1 rounded-sm font-semibold text-[10px] whitespace-nowrap",
                        t === "low" && "bg-green-500/50",
                        t === "needs-improvement" && "bg-[#b77116]",
                        t === "high" && "bg-[#b94040]"
                      ]),
                      children: [
                        "dropped to ",
                        e.fps,
                        " FPS"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ c(
                  "div",
                  {
                    className: x([
                      "flex items-center gap-x-2 w-2/4 justify-end ml-auto"
                    ]),
                    children: /* @__PURE__ */ c(
                      "div",
                      {
                        className: x([
                          "p-2 flex justify-center items-center border-[#27272A]"
                        ]),
                        children: /* @__PURE__ */ c(
                          "button",
                          {
                            onClick: () => {
                              ue.value = {
                                view: "none"
                              };
                            },
                            children: /* @__PURE__ */ c(Nr, { size: 18, className: "text-[#6F6F78]" })
                          }
                        )
                      }
                    )
                  }
                )
              ]
            }
          )
        }
      );
  }
}, sv = ({
  flashingItemsCount: e,
  totalEvents: t
}) => {
  const [n, r] = J(!1), o = j(0), i = j(0);
  return q(() => {
    if (o.current >= t)
      return;
    const a = Date.now(), l = 250, s = a - i.current;
    if (s >= l) {
      r(!1);
      const u = setTimeout(() => {
        o.current = t, i.current = Date.now(), r(!0), setTimeout(() => {
          r(!1);
        }, 2e3);
      }, 50);
      return () => clearTimeout(u);
    } else {
      const u = l - s, p = setTimeout(() => {
        r(!1), setTimeout(() => {
          o.current = t, i.current = Date.now(), r(!0), setTimeout(() => {
            r(!1);
          }, 2e3);
        }, 50);
      }, u);
      return () => clearTimeout(p);
    }
  }, [e]), n;
}, bs = ({
  item: e,
  shouldFlash: t
}) => {
  var n, r;
  const [o, i] = J(!1), a = e.events.map($n).reduce((u, p) => {
    switch (p) {
      case "high":
        return "high";
      case "needs-improvement":
        return u === "high" ? "high" : "needs-improvement";
      case "low":
        return u;
    }
  }, "low"), l = e.events.reduce(
    (u, p) => t(p.id) ? u + 1 : u,
    0
  ), s = sv({
    flashingItemsCount: l,
    totalEvents: e.events.length
  });
  return /* @__PURE__ */ c("div", { className: x(["flex flex-col gap-y-0.5"]), children: [
    /* @__PURE__ */ c(
      "button",
      {
        onClick: () => i((u) => !u),
        className: x([
          "pl-2 py-1.5  text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
          s && !o && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
        ]),
        children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "w-4/5 flex items-center justify-start h-full text-xs truncate gap-x-1.5"
              ]),
              children: [
                /* @__PURE__ */ c("span", { className: x(["min-w-fit"]), children: /* @__PURE__ */ c(
                  Wc,
                  {
                    className: x([
                      "text-[#A1A1AA] transition-transform",
                      o ? "rotate-90" : ""
                    ]),
                    size: 14
                  },
                  `chevron-${e.timestamp}`
                ) }),
                /* @__PURE__ */ c("span", { className: x(["text-xs"]), children: e.kind === "collapsed-frame-drops" ? "FPS Drops" : Pn((r = (n = e.events.at(0)) == null ? void 0 : n.componentPath) != null ? r : []) })
              ]
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: x(["ml-auto min-w-fit flex justify-end items-center"]),
              children: /* @__PURE__ */ c(
                "div",
                {
                  style: {
                    lineHeight: "10px"
                  },
                  className: x([
                    "w-fit flex items-center text-[10px] justify-center h-full text-white px-1 py-1 rounded-sm font-semibold",
                    a === "low" && "bg-green-500/60",
                    a === "needs-improvement" && "bg-[#b77116] text-[10px]",
                    a === "high" && "bg-[#b94040]"
                  ]),
                  children: [
                    "x",
                    e.events.length
                  ]
                }
              )
            }
          )
        ]
      }
    ),
    o && /* @__PURE__ */ c(lv, { children: e.events.toSorted((u, p) => p.timestamp - u.timestamp).map((u) => /* @__PURE__ */ c(
      Bc,
      {
        event: u,
        shouldFlash: t(u.id)
      }
    )) })
  ] });
}, lv = ({
  children: e
}) => /* @__PURE__ */ c("div", { className: "relative pl-6 flex flex-col gap-y-1", children: [
  /* @__PURE__ */ c("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-[#27272A]" }),
  e
] }), cv = (e) => {
  const t = j([]), [n, r] = J(/* @__PURE__ */ new Set()), o = j(!0);
  return q(() => {
    if (o.current) {
      o.current = !1, t.current = e;
      return;
    }
    const i = new Set(e.map((s) => s.id)), a = new Set(t.current.map((s) => s.id)), l = /* @__PURE__ */ new Set();
    i.forEach((s) => {
      a.has(s) || l.add(s);
    }), l.size > 0 && (r(l), setTimeout(() => {
      r(/* @__PURE__ */ new Set());
    }, 2e3)), t.current = e;
  }, [e]), (i) => n.has(i);
}, uv = ({ shouldFlash: e }) => {
  const [t, n] = J(e);
  return q(() => {
    if (e) {
      n(!0);
      const r = setTimeout(() => {
        n(!1);
      }, 1e3);
      return () => clearTimeout(r);
    }
  }, [e]), t;
}, Bc = ({
  event: e,
  shouldFlash: t
}) => {
  var n, r;
  const { notificationState: o, setNotificationState: i } = ze(), a = $n(e), l = uv({ shouldFlash: t });
  switch (e.kind) {
    case "interaction":
      return /* @__PURE__ */ c(
        "button",
        {
          onClick: () => {
            i((s) => H(D({}, s), {
              selectedEvent: e,
              route: "render-visualization",
              selectedFiber: null
            }));
          },
          className: x([
            "pl-2 py-1.5  text-sm flex w-full items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
            e.id === ((n = o.selectedEvent) == null ? void 0 : n.id) && "bg-[#18181B]",
            l && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
          ]),
          children: [
            /* @__PURE__ */ c(
              "div",
              {
                className: x([
                  "w-4/5 flex items-center justify-start h-full gap-x-1.5"
                ]),
                children: [
                  /* @__PURE__ */ c("span", { className: x(["min-w-fit text-xs"]), children: He(() => {
                    switch (e.type) {
                      case "click":
                        return /* @__PURE__ */ c(Fg, { size: 14 });
                      case "keyboard":
                        return /* @__PURE__ */ c($g, { size: 14 });
                    }
                  }) }),
                  /* @__PURE__ */ c("span", { className: x(["text-xs pr-1 truncate"]), children: Pn(e.componentPath) })
                ]
              }
            ),
            /* @__PURE__ */ c(
              "div",
              {
                className: x([" min-w-fit flex justify-end items-center ml-auto"]),
                children: /* @__PURE__ */ c(
                  "div",
                  {
                    style: {
                      lineHeight: "10px"
                    },
                    className: x([
                      "gap-x-0.5 w-fit flex items-end justify-center h-full text-white px-1 py-1 rounded-sm font-semibold text-[10px]",
                      a === "low" && "bg-green-500/50",
                      a === "needs-improvement" && "bg-[#b77116] text-[10px]",
                      a === "high" && "bg-[#b94040]"
                    ]),
                    children: /* @__PURE__ */ c(
                      "div",
                      {
                        style: {
                          lineHeight: "10px"
                        },
                        className: x(["text-[10px] text-white flex items-end"]),
                        children: [
                          Ce(e.timing).toFixed(0),
                          "ms"
                        ]
                      }
                    )
                  }
                )
              }
            )
          ]
        }
      );
    case "dropped-frames":
      return /* @__PURE__ */ c(
        "button",
        {
          onClick: () => {
            i((s) => H(D({}, s), {
              selectedEvent: e,
              // explicitly force back to render-visualization since the user might get confused when they don't see the detailed view immediately when clicking the view
              route: "render-visualization",
              selectedFiber: null
            }));
          },
          className: x([
            "pl-2 py-1.5  w-full text-sm flex items-center rounded-sm hover:bg-[#18181B] relative overflow-hidden",
            e.id === ((r = o.selectedEvent) == null ? void 0 : r.id) && "bg-[#18181B]",
            l && "after:absolute after:inset-0 after:bg-purple-500/30 after:animate-[fadeOut_1s_ease-out_forwards]"
          ]),
          children: [
            /* @__PURE__ */ c(
              "div",
              {
                className: x([
                  "w-4/5 flex items-center justify-start h-full text-xs truncate"
                ]),
                children: [
                  /* @__PURE__ */ c(jg, { size: 14, className: "mr-1.5" }),
                  " FPS Drop"
                ]
              }
            ),
            /* @__PURE__ */ c(
              "div",
              {
                className: x([" min-w-fit flex justify-end items-center ml-auto"]),
                children: /* @__PURE__ */ c(
                  "div",
                  {
                    style: {
                      lineHeight: "10px"
                    },
                    className: x([
                      "w-fit flex items-center justify-center h-full text-white px-1 py-1 rounded-sm text-[10px] font-bold",
                      a === "low" && "bg-green-500/60",
                      a === "needs-improvement" && "bg-[#b77116] text-[10px]",
                      a === "high" && "bg-[#b94040]"
                    ]),
                    children: [
                      e.fps,
                      " FPS"
                    ]
                  }
                )
              }
            )
          ]
        }
      );
  }
}, dv = (e) => e.reduce((n, r) => {
  const o = n.at(-1);
  if (!o)
    return [
      {
        kind: "single",
        event: r,
        timestamp: r.timestamp
      }
    ];
  switch (o.kind) {
    case "collapsed-keyboard":
      return r.kind === "interaction" && r.type === "keyboard" && // must be on the same semantic component, it would be ideal to compare on fiberId, but i digress
      r.componentPath.join("-") === o.events[0].componentPath.join("-") ? [
        ...n.filter((a) => a !== o),
        {
          kind: "collapsed-keyboard",
          events: [...o.events, r],
          timestamp: Math.max(
            ...[...o.events, r].map((a) => a.timestamp)
          )
        }
      ] : [
        ...n,
        {
          kind: "single",
          event: r,
          timestamp: r.timestamp
        }
      ];
    case "single":
      return o.event.kind === "interaction" && o.event.type === "keyboard" && r.kind === "interaction" && r.type === "keyboard" && o.event.componentPath.join("-") === r.componentPath.join("-") ? [
        ...n.filter((a) => a !== o),
        {
          kind: "collapsed-keyboard",
          events: [o.event, r],
          timestamp: Math.max(o.event.timestamp, r.timestamp)
        }
      ] : o.event.kind === "dropped-frames" && r.kind === "dropped-frames" ? [
        ...n.filter((a) => a !== o),
        {
          kind: "collapsed-frame-drops",
          events: [o.event, r],
          timestamp: Math.max(o.event.timestamp, r.timestamp)
        }
      ] : [
        ...n,
        {
          kind: "single",
          event: r,
          timestamp: r.timestamp
        }
      ];
    case "collapsed-frame-drops":
      return r.kind === "dropped-frames" ? [
        ...n.filter((a) => a !== o),
        {
          kind: "collapsed-frame-drops",
          events: [...o.events, r],
          timestamp: Math.max(
            ...[...o.events, r].map((a) => a.timestamp)
          )
        }
      ] : [
        ...n,
        {
          kind: "single",
          event: r,
          timestamp: r.timestamp
        }
      ];
  }
}, []), Yc = (e = 150) => {
  const { notificationState: t } = ze(), [n, r] = J(t.events);
  return q(() => {
    setTimeout(() => {
      r(t.events);
    }, e);
  }, [t.events]), [n, r];
}, pv = () => {
  const { notificationState: e, setNotificationState: t } = ze(), n = cv(e.events), [r, o] = Yc(), i = dv(r).toSorted(
    (a, l) => l.timestamp - a.timestamp
  );
  return /* @__PURE__ */ c(
    "div",
    {
      className: x([
        "w-full h-full gap-y-2 flex flex-col border-r border-[#27272A] overflow-y-auto"
      ]),
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            className: x([
              "text-sm text-[#65656D] pl-3 pr-1 w-full flex items-center justify-between"
            ]),
            children: [
              /* @__PURE__ */ c("span", { children: "History" }),
              /* @__PURE__ */ c(
                Hc,
                {
                  wrapperProps: {
                    className: "h-full flex items-center justify-center ml-auto"
                  },
                  triggerContent: /* @__PURE__ */ c(
                    "button",
                    {
                      className: x(["hover:bg-[#18181B] rounded-full p-2"]),
                      title: "Clear all events",
                      onClick: () => {
                        An.getState().actions.clear(), t((a) => H(D({}, a), {
                          selectedEvent: null,
                          selectedFiber: null,
                          route: a.route === "other-visualization" ? "other-visualization" : "render-visualization"
                        })), o([]);
                      },
                      children: /* @__PURE__ */ c(Lg, { className: x([""]), size: 16 })
                    }
                  ),
                  children: /* @__PURE__ */ c("div", { className: x(["w-full flex justify-center"]), children: "Clear all events" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: x(["flex flex-col px-1 gap-y-1"]), children: [
          i.length === 0 && /* @__PURE__ */ c(
            "div",
            {
              className: x([
                "flex items-center justify-center text-zinc-500 text-sm py-4"
              ]),
              children: "No Events"
            }
          ),
          i.map(
            (a) => He(() => {
              switch (a.kind) {
                case "collapsed-keyboard":
                  return /* @__PURE__ */ c(bs, { shouldFlash: n, item: a });
                case "single":
                  return /* @__PURE__ */ c(
                    Bc,
                    {
                      event: a.event,
                      shouldFlash: n(a.event.id)
                    },
                    a.event.id
                  );
                case "collapsed-frame-drops":
                  return /* @__PURE__ */ c(bs, { shouldFlash: n, item: a });
              }
            })
          )
        ] })
      ]
    }
  );
}, fv = (e) => Object.values(e).map((n) => ({
  id: Ve(),
  totalTime: n.nodeInfo.reduce((r, o) => r + o.selfTime, 0),
  count: n.nodeInfo.length,
  name: n.nodeInfo[0].name,
  // invariant, at least one exists,
  deletedAll: !1,
  parents: n.parents,
  hasMemoCache: n.hasMemoCache,
  wasFiberRenderMount: n.wasFiberRenderMount,
  // it would be nice if we calculated the % of components memoizable, but this would have to be calculated downstream before it got aggregated
  elements: n.nodeInfo.map((r) => r.element),
  changes: {
    context: n.changes.fiberContext.current.filter(
      (r) => n.changes.fiberContext.changesCounts.get(r.name)
    ).map((r) => {
      var o;
      return {
        name: String(r.name),
        count: (o = n.changes.fiberContext.changesCounts.get(r.name)) != null ? o : 0
      };
    }),
    props: n.changes.fiberProps.current.filter(
      (r) => n.changes.fiberProps.changesCounts.get(r.name)
    ).map((r) => {
      var o;
      return {
        name: String(r.name),
        count: (o = n.changes.fiberProps.changesCounts.get(r.name)) != null ? o : 0
      };
    }),
    state: n.changes.fiberState.current.filter(
      (r) => n.changes.fiberState.changesCounts.get(Number(r.name))
    ).map((r) => {
      var o;
      return {
        index: r.name,
        count: (o = n.changes.fiberState.changesCounts.get(Number(r.name))) != null ? o : 0
      };
    })
  }
})), hv = (e) => {
  q(() => {
    const n = setInterval(() => {
      e.forEach((r) => {
        r.groupedFiberRenders && r.groupedFiberRenders.forEach((o) => {
          if (o.deletedAll) return;
          if (!o.elements || o.elements.length === 0) {
            o.deletedAll = !0;
            return;
          }
          const i = o.elements.length;
          o.elements = o.elements.filter((a) => a && a.isConnected), o.elements.length === 0 && i > 0 && (o.deletedAll = !0);
        });
      });
    }, 5e3);
    return () => {
      clearInterval(n);
    };
  }, [e]);
}, Xc = () => {
  const e = Eg(), t = [];
  return hv(t), e.state.events.forEach((n) => {
    const r = n.kind === "interaction" ? n.data.meta.detailedTiming.fiberRenders : n.data.meta.fiberRenders, o = fv(r), i = o.reduce(
      (a, l) => a + l.totalTime,
      0
    );
    switch (n.kind) {
      case "interaction": {
        const { commitEnd: a, jsEndDetail: l, interactionStartDetail: s, rafStart: u } = n.data.meta.detailedTiming, p = Math.max(
          0,
          l - s - i
        ), d = Math.max(
          n.data.meta.latency - (a - s),
          0
        );
        t.push({
          componentPath: n.data.meta.detailedTiming.componentPath,
          groupedFiberRenders: o,
          id: n.id,
          kind: "interaction",
          memory: null,
          timestamp: n.data.startAt,
          type: n.data.meta.detailedTiming.interactionType === "keyboard" ? "keyboard" : "click",
          timing: {
            renderTime: i,
            kind: "interaction",
            otherJSTime: p,
            framePreparation: u - l,
            frameConstruction: a - u,
            frameDraw: d
          }
        });
        return;
      }
      case "long-render": {
        t.push({
          kind: "dropped-frames",
          id: n.id,
          memory: null,
          timing: {
            kind: "dropped-frames",
            renderTime: i,
            otherTime: n.data.meta.latency
          },
          groupedFiberRenders: o,
          timestamp: n.data.startAt,
          fps: n.data.meta.fps
        });
        return;
      }
    }
  }), t;
}, mv = 1e3, gv = () => {
  const { notificationState: e, setNotificationState: t } = ze(), n = j(null), r = j(null), o = j(0), [i] = Yc(), a = i.filter(
    // todo: make this configurable
    (l) => $n(l) === "high"
  ).length;
  return q(() => {
    const l = localStorage.getItem(
      "react-scan-notifications-audio"
    );
    if (l !== "false" && l !== "true") {
      localStorage.setItem("react-scan-notifications-audio", "false");
      return;
    }
    if (l !== "false") {
      t((u) => u.audioNotificationsOptions.enabled ? u : H(D({}, u), {
        audioNotificationsOptions: {
          enabled: !0,
          audioContext: new AudioContext()
        }
      }));
      return;
    }
  }, []), q(() => {
    const { audioNotificationsOptions: l } = e;
    if (!l.enabled || a === 0 || n.current && n.current >= a)
      return;
    r.current && clearTimeout(r.current);
    const u = Date.now() - o.current, p = Math.max(0, mv - u);
    r.current = setTimeout(() => {
      Di(l.audioContext), n.current = a, o.current = Date.now(), r.current = null;
    }, p);
  }, [a]), q(() => {
    a === 0 && (n.current = null);
  }, [a]), q(() => () => {
    r.current && clearTimeout(r.current);
  }, []), null;
}, vv = zi((e, t) => {
  var n;
  const r = Xc(), [o, i] = J({
    detailsExpanded: !1,
    events: r,
    filterBy: "latest",
    moreInfoExpanded: !1,
    route: "render-visualization",
    selectedEvent: (n = r.toSorted((a, l) => a.timestamp - l.timestamp).at(-1)) != null ? n : null,
    selectedFiber: null,
    routeMessage: null,
    audioNotificationsOptions: {
      enabled: !1,
      audioContext: null
    }
  });
  return o.events = r, /* @__PURE__ */ c(
    Vc.Provider,
    {
      value: {
        notificationState: o,
        setNotificationState: i,
        setRoute: ({ route: a, routeMessage: l }) => {
          i((s) => {
            const u = H(D({}, s), { route: a, routeMessage: l });
            switch (a) {
              case "render-visualization":
                return un(), H(D({}, u), {
                  selectedFiber: null
                });
              case "optimize":
                return un(), H(D({}, u), {
                  selectedFiber: null
                });
              case "other-visualization":
                return un(), H(D({}, u), {
                  selectedFiber: null
                });
              case "render-explanation":
                return un(), u;
            }
          });
        }
      },
      children: [
        /* @__PURE__ */ c(gv, {}),
        /* @__PURE__ */ c(wv, { ref: t })
      ]
    }
  );
}), wv = zi((e, t) => {
  var n;
  const { notificationState: r } = ze();
  return /* @__PURE__ */ c("div", { ref: t, className: x(["h-full w-full flex flex-col"]), children: [
    r.selectedEvent && /* @__PURE__ */ c(
      "div",
      {
        className: x([
          "w-full h-[48px] flex flex-col",
          r.moreInfoExpanded && "h-[235px]",
          r.moreInfoExpanded && r.selectedEvent.kind === "dropped-frames" && "h-[150px]"
        ]),
        children: [
          /* @__PURE__ */ c(av, { selectedEvent: r.selectedEvent }),
          r.moreInfoExpanded && /* @__PURE__ */ c(yv, {})
        ]
      }
    ),
    /* @__PURE__ */ c(
      "div",
      {
        className: x([
          "flex ",
          r.selectedEvent ? "h-[calc(100%-48px)]" : "h-full",
          r.moreInfoExpanded && "h-[calc(100%-200px)]",
          r.moreInfoExpanded && ((n = r.selectedEvent) == null ? void 0 : n.kind) === "dropped-frames" && "h-[calc(100%-150px)]"
        ]),
        children: [
          /* @__PURE__ */ c("div", { className: x(["h-full min-w-[200px]"]), children: /* @__PURE__ */ c(pv, {}) }),
          /* @__PURE__ */ c("div", { className: x(["w-[calc(100%-200px)] h-full overflow-y-auto"]), children: /* @__PURE__ */ c(iv, {}) })
        ]
      }
    )
  ] });
}), yv = () => {
  const { notificationState: e } = ze();
  if (!e.selectedEvent)
    throw new Error("Invariant must have selected event for more info");
  const t = e.selectedEvent;
  return /* @__PURE__ */ c(
    "div",
    {
      className: x([
        "px-4 py-2 border-b border-[#27272A] bg-[#18181B]/50 h-[calc(100%-40px)]",
        t.kind === "dropped-frames" && "h-[calc(100%-25px)]"
      ]),
      children: /* @__PURE__ */ c("div", { className: x(["flex flex-col gap-y-4 h-full"]), children: He(() => {
        switch (t.kind) {
          case "interaction":
            return /* @__PURE__ */ c(ne, { children: [
              /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-3"]), children: [
                /* @__PURE__ */ c("span", { className: "text-[#6F6F78] text-xs font-medium", children: t.type === "click" ? "Clicked component location" : "Typed in component location" }),
                /* @__PURE__ */ c("div", { className: "font-mono text-[#E4E4E7] flex items-center bg-[#27272A] pl-2 py-1 rounded-sm overflow-x-auto", children: t.componentPath.toReversed().map((n, r) => /* @__PURE__ */ c(ne, { children: [
                  /* @__PURE__ */ c(
                    "span",
                    {
                      style: {
                        lineHeight: "14px"
                      },
                      className: "text-[10px] whitespace-nowrap",
                      children: n
                    },
                    n
                  ),
                  r < t.componentPath.length - 1 && /* @__PURE__ */ c("span", { className: "text-[#6F6F78] mx-0.5", children: "‹" })
                ] })) })
              ] }),
              /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-3"]), children: [
                /* @__PURE__ */ c("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Total Time" }),
                /* @__PURE__ */ c("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: [
                  Ce(t.timing).toFixed(0),
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-3"]), children: [
                /* @__PURE__ */ c("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Occurred" }),
                /* @__PURE__ */ c("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: `${((Date.now() - t.timestamp) / 1e3).toFixed(0)}s ago` })
              ] })
            ] });
          case "dropped-frames":
            return /* @__PURE__ */ c(ne, { children: [
              /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-3"]), children: [
                /* @__PURE__ */ c("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Total Time" }),
                /* @__PURE__ */ c("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: [
                  Ce(t.timing).toFixed(0),
                  "ms"
                ] })
              ] }),
              /* @__PURE__ */ c("div", { className: x(["flex items-center gap-x-3"]), children: [
                /* @__PURE__ */ c("span", { className: "text-[#6F6F78] text-xs font-medium", children: "Occurred" }),
                /* @__PURE__ */ c("span", { className: "text-[#E4E4E7] bg-[#27272A] px-1.5 py-1 rounded-sm text-xs", children: `${((Date.now() - t.timestamp) / 1e3).toFixed(0)}s ago` })
              ] })
            ] });
        }
      }) })
    }
  );
}, bv = $i(() => {
  var e;
  const t = Xc(), [n, r] = J(t);
  q(() => {
    const h = setTimeout(() => {
      r(t);
    }, 600);
    return () => {
      clearTimeout(h);
    };
  }, [t]);
  const o = M.inspectState, i = o.value.kind === "inspecting", a = o.value.kind === "focused", [l, s] = J([]), u = ye(() => {
    switch (M.inspectState.value.kind) {
      case "inspecting": {
        ue.value = {
          view: "none"
        }, M.inspectState.value = {
          kind: "inspect-off"
        };
        return;
      }
      case "focused": {
        ue.value = {
          view: "inspector"
        }, M.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        };
        return;
      }
      // todo: auto select the root fibers first stateNode, and tell the user to select the element
      case "inspect-off": {
        ue.value = {
          view: "none"
        }, M.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        };
        return;
      }
      case "uninitialized":
        return;
    }
  }, []), p = ye((h) => {
    if (h.preventDefault(), h.stopPropagation(), !te.instrumentation)
      return;
    const m = !te.instrumentation.isPaused.value;
    te.instrumentation.isPaused.value = m;
    const v = it("react-scan-options");
    Ae("react-scan-options", H(D({}, v), {
      enabled: !m
    }));
  }, []);
  Rn(() => {
    M.inspectState.value.kind === "uninitialized" && (M.inspectState.value = {
      kind: "inspect-off"
    });
  });
  let d = null, f = "#999";
  return i ? (d = /* @__PURE__ */ c(ve, { name: "icon-inspect" }), f = "#8e61e3") : a ? (d = /* @__PURE__ */ c(ve, { name: "icon-focus" }), f = "#8e61e3") : (d = /* @__PURE__ */ c(ve, { name: "icon-inspect" }), f = "#999"), Ii(() => {
    if (ue.value.view !== "notifications")
      return;
    const h = new Set(t.map((m) => m.id));
    s([...h.values()]);
  }, [t.length, ue.value.view]), /* @__PURE__ */ c("div", { className: "flex max-h-9 min-h-9 flex-1 items-stretch overflow-hidden", children: [
    /* @__PURE__ */ c("div", { className: "h-full flex items-center min-w-fit", children: /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        id: "react-scan-inspect-element",
        title: "Inspect element",
        onClick: u,
        className: "button flex items-center justify-center h-full w-full pl-3 pr-2.5",
        style: { color: f },
        children: d
      }
    ) }),
    /* @__PURE__ */ c("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        id: "react-scan-notifications",
        title: "Notifications",
        onClick: () => {
          switch (M.inspectState.value.kind !== "inspect-off" && (M.inspectState.value = {
            kind: "inspect-off"
          }), ue.value.view) {
            case "inspector": {
              M.inspectState.value = {
                kind: "inspect-off"
              };
              const h = new Set(t.map((m) => m.id));
              s([...h.values()]), ue.value = {
                view: "notifications"
              };
              return;
            }
            case "notifications": {
              ue.value = {
                view: "none"
              };
              return;
            }
            case "none": {
              const h = new Set(t.map((m) => m.id));
              s([...h.values()]), ue.value = {
                view: "notifications"
              };
              return;
            }
          }
        },
        className: "button flex items-center justify-center h-full pl-2.5 pr-2.5",
        style: { color: f },
        children: /* @__PURE__ */ c(
          Og,
          {
            events: n.filter((h) => !l.includes(h.id)).map((h) => $n(h) === "high"),
            size: 16,
            className: x([
              "text-[#999]",
              ue.value.view === "notifications" && "text-[#8E61E3]"
            ])
          }
        )
      }
    ) }),
    /* @__PURE__ */ c(
      sg,
      {
        checked: !((e = te.instrumentation) != null && e.isPaused.value),
        onChange: p,
        className: "place-self-center",
        title: "Outline Re-renders"
      }
    ),
    te.options.value.showFPS && /* @__PURE__ */ c(cg, {})
  ] });
}), xv = Rt(
  () => M.inspectState.value.kind === "inspecting"
), _v = Rt(
  () => x(
    "relative",
    "flex-1",
    "flex flex-col",
    "rounded-t-lg",
    "overflow-hidden",
    "opacity-100",
    "transition-[opacity]",
    xv.value && "opacity-0 duration-0 delay-0"
  )
), kv = Rt(
  () => ue.value.view === "inspector"
), Cv = Rt(
  () => ue.value.view === "notifications"
), Sv = () => /* @__PURE__ */ c(
  "div",
  {
    className: x(
      "flex flex-1 flex-col",
      "overflow-hidden z-10",
      "rounded-lg",
      "bg-black",
      "opacity-100",
      "transition-[border-radius]",
      "peer-hover/left:rounded-l-none",
      "peer-hover/right:rounded-r-none",
      "peer-hover/top:rounded-t-none",
      "peer-hover/bottom:rounded-b-none"
    ),
    children: [
      /* @__PURE__ */ c("div", { className: _v, children: [
        /* @__PURE__ */ c(ag, {}),
        /* @__PURE__ */ c(
          "div",
          {
            className: x(
              "relative",
              "flex-1 flex",
              "text-white",
              "bg-[#0A0A0A]",
              "transition-opacity delay-150",
              "overflow-hidden",
              "border-b border-[#222]"
            ),
            children: [
              /* @__PURE__ */ c(xs, { isOpen: kv, children: /* @__PURE__ */ c(pm, {}) }),
              /* @__PURE__ */ c(xs, { isOpen: Cv, children: /* @__PURE__ */ c(vv, {}) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ c(bv, {})
    ]
  }
), xs = ({ isOpen: e, children: t }) => /* @__PURE__ */ c(
  "div",
  {
    className: x(
      "flex-1",
      "opacity-0",
      "overflow-y-auto overflow-x-hidden",
      "transition-opacity delay-0",
      "pointer-events-none",
      e.value && "opacity-100 delay-150 pointer-events-auto"
    ),
    children: /* @__PURE__ */ c("div", { className: "absolute inset-0 flex", children: t })
  }
), Yn = (e, t, n) => e + (t - e) * n, yo = {
  frameInterval: 1e3 / 60,
  speeds: {
    fast: 0.51,
    slow: 0.1,
    off: 0
  }
}, Ot = Qe && window.devicePixelRatio || 1, Tv = () => {
  const e = j(null), t = j(null), n = j(null), r = j(null), o = j(null), i = j(0), a = j(), l = j(
    /* @__PURE__ */ new Map()
  ), s = j(!1), u = j(0), p = (b, C, _, R) => {
    b.save(), b.strokeStyle = "white", b.fillStyle = "white", b.lineWidth = 1.5;
    const P = R * 0.6, F = R * 0.5, V = C + (R - P) / 2, re = _;
    b.beginPath(), b.arc(
      V + P / 2,
      re + F / 2,
      P / 2,
      Math.PI,
      0,
      !1
    ), b.stroke();
    const K = R * 0.8, oe = R * 0.5, me = C + (R - K) / 2, Q = _ + F / 2;
    b.fillRect(me, Q, K, oe), b.restore();
  }, d = (b, C, _, R) => {
    var P;
    if (!R) return;
    const F = 24, V = 8, K = (P = (R == null ? void 0 : R.type) && he(R.type)) != null ? P : "Unknown";
    b.save(), b.font = "12px system-ui, -apple-system, sans-serif";
    const me = b.measureText(K).width, Q = _ === "locked" ? 14 : 0, ie = _ === "locked" ? 6 : 0, de = me + V * 2 + Q + ie, Se = C.left, at = C.top - F - 4;
    if (b.fillStyle = "rgb(37, 37, 38, .75)", b.beginPath(), b.roundRect(Se, at, de, F, 3), b.fill(), _ === "locked") {
      const Ln = Se + V, tn = at + (F - Q) / 2 + 2;
      p(b, Ln, tn, Q), r.current = {
        x: Ln,
        y: tn,
        width: Q,
        height: Q
      };
    } else
      r.current = null;
    b.fillStyle = "white", b.textBaseline = "middle";
    const Wr = Se + V + (_ === "locked" ? Q + ie : 0);
    b.fillText(K, Wr, at + F / 2), b.restore();
  }, f = (b, C, _, R) => {
    if (!n.current) return;
    const P = n.current;
    C.clearRect(0, 0, b.width, b.height), C.strokeStyle = "rgba(142, 97, 227, 0.5)", C.fillStyle = "rgba(173, 97, 230, 0.10)", _ === "locked" ? C.setLineDash([]) : C.setLineDash([4]), C.lineWidth = 1, C.fillRect(P.left, P.top, P.width, P.height), C.strokeRect(P.left, P.top, P.width, P.height), d(C, P, _, R);
  }, h = (b, C, _, R, P, F) => {
    var V;
    const re = te.options.value.animationSpeed, K = (V = yo.speeds[re]) != null ? V : yo.speeds.off, oe = (me) => {
      if (me - u.current < yo.frameInterval) {
        i.current = requestAnimationFrame(oe);
        return;
      }
      if (u.current = me, !n.current) {
        cancelAnimationFrame(i.current);
        return;
      }
      n.current = {
        left: Yn(n.current.left, _.left, K),
        top: Yn(n.current.top, _.top, K),
        width: Yn(n.current.width, _.width, K),
        height: Yn(n.current.height, _.height, K)
      }, f(b, C, R, P), Math.abs(n.current.left - _.left) > 0.1 || Math.abs(n.current.top - _.top) > 0.1 || Math.abs(n.current.width - _.width) > 0.1 || Math.abs(n.current.height - _.height) > 0.1 ? i.current = requestAnimationFrame(oe) : (n.current = _, f(b, C, R, P), cancelAnimationFrame(i.current), C.restore());
    };
    cancelAnimationFrame(i.current), clearTimeout(a.current), i.current = requestAnimationFrame(oe), a.current = setTimeout(() => {
      cancelAnimationFrame(i.current), n.current = _, f(b, C, R, P), C.restore();
    }, 1e3);
  }, m = (b, C, _, R, P) => {
    if (C.save(), !n.current) {
      n.current = _, f(b, C, R, P), C.restore();
      return;
    }
    h(b, C, _, R, P);
  }, v = async (b, C, _, R) => {
    if (!b || !C || !_) return;
    const { parentCompositeFiber: P } = xt(b), F = await fm(b);
    !P || !F || m(C, _, F, R, P);
  }, w = () => {
    for (const b of l.current.values())
      b == null || b();
  }, g = (b) => {
    const C = b.getContext("2d");
    C && C.clearRect(0, 0, b.width, b.height), n.current = null, r.current = null, o.current = null, b.classList.remove("fade-in"), s.current = !1;
  }, y = (b) => {
    if (!e.current || s.current) return;
    const C = (R) => {
      !e.current || R.propertyName !== "opacity" || !s.current || (e.current.removeEventListener(
        "transitionend",
        C
      ), g(e.current), b == null || b());
    }, _ = l.current.get("fade-out");
    _ && (_(), l.current.delete("fade-out")), e.current.addEventListener("transitionend", C), l.current.set("fade-out", () => {
      var R;
      (R = e.current) == null || R.removeEventListener(
        "transitionend",
        C
      );
    }), s.current = !0, e.current.classList.remove("fade-in"), requestAnimationFrame(() => {
      var R;
      (R = e.current) == null || R.classList.add("fade-out");
    });
  }, k = () => {
    e.current && (s.current = !1, e.current.classList.remove("fade-out"), requestAnimationFrame(() => {
      var b;
      (b = e.current) == null || b.classList.add("fade-in");
    }));
  }, S = (b) => {
    b !== o.current && (o.current = b, oi.has(b.tagName) ? y() : k(), M.inspectState.value = {
      kind: "inspecting",
      hoveredDomElement: b
    });
  }, T = () => {
    !n.current || !e.current || s.current || y();
  }, E = wc((b) => {
    var C, _;
    if (M.inspectState.peek().kind !== "inspecting" || !t.current) return;
    t.current.style.pointerEvents = "none";
    const P = document.elementFromPoint((C = b == null ? void 0 : b.clientX) != null ? C : 0, (_ = b == null ? void 0 : b.clientY) != null ? _ : 0);
    if (t.current.style.removeProperty("pointer-events"), clearTimeout(a.current), P && P !== e.current) {
      const { parentCompositeFiber: F } = xt(
        P
      );
      if (F) {
        const V = _r(F);
        if (V) {
          S(V);
          return;
        }
      }
    }
    T();
  }, 32), A = (b, C) => {
    const _ = r.current;
    if (!_) return !1;
    const R = C.getBoundingClientRect(), P = C.width / R.width, F = C.height / R.height, V = (b.clientX - R.left) * P, re = (b.clientY - R.top) * F, K = V / Ot, oe = re / Ot;
    return K >= _.x && K <= _.x + _.width && oe >= _.y && oe <= _.y + _.height;
  }, I = (b) => {
    b.kind === "focused" && (M.inspectState.value = {
      kind: "inspecting",
      hoveredDomElement: b.focusedDomElement
    });
  }, N = (b) => {
    var C, _;
    const R = [
      "react-scan-inspect-element",
      "react-scan-power"
    ];
    if (b.target instanceof HTMLElement && R.includes(b.target.id))
      return;
    const P = (C = o.current) == null ? void 0 : C.tagName;
    if (P && oi.has(P))
      return;
    b.preventDefault(), b.stopPropagation();
    const F = (_ = o.current) != null ? _ : document.elementFromPoint(b.clientX, b.clientY);
    if (!F) return;
    const V = b.composedPath().at(0);
    if (V instanceof HTMLElement && R.includes(V.id)) {
      const oe = new MouseEvent(b.type, b);
      oe.__reactScanSyntheticEvent = !0, V.dispatchEvent(oe);
      return;
    }
    const { parentCompositeFiber: re } = xt(
      F
    );
    if (!re) return;
    const K = _r(re);
    if (!K) {
      o.current = null, M.inspectState.value = {
        kind: "inspect-off"
      };
      return;
    }
    M.inspectState.value = {
      kind: "focused",
      focusedDomElement: K,
      fiber: re
    };
  }, L = (b) => {
    if (b.__reactScanSyntheticEvent)
      return;
    const C = M.inspectState.peek(), _ = e.current;
    if (!(!_ || !t.current)) {
      if (A(b, _)) {
        b.preventDefault(), b.stopPropagation(), I(C);
        return;
      }
      C.kind === "inspecting" && N(b);
    }
  }, $ = (b) => {
    var C;
    if (b.key !== "Escape") return;
    const _ = M.inspectState.peek();
    if (e.current && ((C = document.activeElement) == null ? void 0 : C.id) !== "react-scan-root" && (ue.value = {
      view: "none"
    }, _.kind === "focused" || _.kind === "inspecting"))
      switch (b.preventDefault(), b.stopPropagation(), _.kind) {
        case "focused": {
          k(), n.current = null, o.current = _.focusedDomElement, M.inspectState.value = {
            kind: "inspecting",
            hoveredDomElement: _.focusedDomElement
          };
          break;
        }
        case "inspecting": {
          y(() => {
            Lr.value = !1, M.inspectState.value = {
              kind: "inspect-off"
            };
          });
          break;
        }
      }
  }, O = (b, C, _) => {
    var R;
    (R = l.current.get(b.kind)) == null || R(), t.current && b.kind !== "inspecting" && (t.current.style.pointerEvents = "none"), i.current && cancelAnimationFrame(i.current);
    let P;
    switch (b.kind) {
      case "inspect-off":
        y();
        return;
      case "inspecting":
        v(b.hoveredDomElement, C, _, "inspecting");
        break;
      case "focused":
        if (!b.focusedDomElement) return;
        o.current !== b.focusedDomElement && (o.current = b.focusedDomElement), ue.value = {
          view: "inspector"
        }, v(b.focusedDomElement, C, _, "locked"), P = M.lastReportTime.subscribe(() => {
          if (i.current && n.current) {
            const { parentCompositeFiber: F } = xt(
              b.focusedDomElement
            );
            F && v(b.focusedDomElement, C, _, "locked");
          }
        }), P && l.current.set(b.kind, P);
        break;
    }
  }, ee = (b, C) => {
    const _ = b.getBoundingClientRect();
    b.width = _.width * Ot, b.height = _.height * Ot, C.scale(Ot, Ot), C.save();
  }, Z = () => {
    const b = M.inspectState.peek(), C = e.current;
    if (!C) return;
    const _ = C == null ? void 0 : C.getContext("2d");
    _ && (cancelAnimationFrame(i.current), clearTimeout(a.current), ee(C, _), n.current = null, b.kind === "focused" && b.focusedDomElement ? v(b.focusedDomElement, C, _, "locked") : b.kind === "inspecting" && b.hoveredDomElement && v(b.hoveredDomElement, C, _, "inspecting"));
  }, le = (b) => {
    const C = M.inspectState.peek(), _ = e.current;
    _ && (C.kind === "inspecting" || A(b, _)) && (b.preventDefault(), b.stopPropagation(), b.stopImmediatePropagation());
  };
  return q(() => {
    const b = e.current;
    if (!b) return;
    const C = b == null ? void 0 : b.getContext("2d");
    if (!C) return;
    ee(b, C);
    const _ = M.inspectState.subscribe((R) => {
      O(R, b, C);
    });
    return window.addEventListener("scroll", Z, { passive: !0 }), window.addEventListener("resize", Z, { passive: !0 }), document.addEventListener("pointermove", E, {
      passive: !0,
      capture: !0
    }), document.addEventListener("pointerdown", le, {
      capture: !0
    }), document.addEventListener("click", L, { capture: !0 }), document.addEventListener("keydown", $, { capture: !0 }), () => {
      w(), _(), window.removeEventListener("scroll", Z), window.removeEventListener("resize", Z), document.removeEventListener("pointermove", E, {
        capture: !0
      }), document.removeEventListener("click", L, { capture: !0 }), document.removeEventListener("pointerdown", le, {
        capture: !0
      }), document.removeEventListener("keydown", $, { capture: !0 }), i.current && cancelAnimationFrame(i.current), clearTimeout(a.current);
    };
  }, []), /* @__PURE__ */ c(ne, { children: [
    /* @__PURE__ */ c(
      "div",
      {
        ref: t,
        className: x("fixed top-0 left-0 w-screen h-screen", "z-[214748365]"),
        style: {
          pointerEvents: "none"
        }
      }
    ),
    /* @__PURE__ */ c(
      "canvas",
      {
        ref: e,
        dir: "ltr",
        className: x(
          "react-scan-inspector-overlay",
          "fixed top-0 left-0 w-screen h-screen",
          "pointer-events-none",
          "z-[214748367]"
        )
      }
    )
  ] });
}, Ev = class {
  constructor(e, t) {
    this.width = e, this.height = t, this.maxWidth = e - B * 2, this.maxHeight = t - B * 2;
  }
  rightEdge(e) {
    return this.width - e - B;
  }
  bottomEdge(e) {
    return this.height - e - B;
  }
  isFullWidth(e) {
    return e >= this.maxWidth;
  }
  isFullHeight(e) {
    return e >= this.maxHeight;
  }
}, Mt, On = () => {
  const e = window.innerWidth, t = window.innerHeight;
  return Mt && Mt.width === e && Mt.height === t || (Mt = new Ev(e, t)), Mt;
}, Nv = (e, t, n, r, o) => {
  if (n) {
    if (e === "top-left") return "bottom-right";
    if (e === "top-right") return "bottom-left";
    if (e === "bottom-left") return "top-right";
    if (e === "bottom-right") return "top-left";
    const [i, a] = t.split("-");
    if (e === "left") return `${i}-right`;
    if (e === "right") return `${i}-left`;
    if (e === "top") return `bottom-${a}`;
    if (e === "bottom") return `top-${a}`;
  }
  if (r) {
    if (e === "left")
      return `${t.split("-")[0]}-right`;
    if (e === "right")
      return `${t.split("-")[0]}-left`;
  }
  if (o) {
    if (e === "top")
      return `bottom-${t.split("-")[1]}`;
    if (e === "bottom")
      return `top-${t.split("-")[1]}`;
  }
  return t;
}, wn = (e, t, n) => {
  const r = getComputedStyle(document.body).direction === "rtl", o = window.innerWidth, i = window.innerHeight, a = t === xe.width, l = a ? t : Math.min(t, o - B * 2), s = a ? n : Math.min(n, i - B * 2);
  let u, p, d = B, f = o - l - B, h = B, m = i - s - B;
  switch (e) {
    case "top-right":
      u = r ? -d : f, p = h;
      break;
    case "bottom-right":
      u = r ? -d : f, p = m;
      break;
    case "bottom-left":
      u = r ? -f : d, p = m;
      break;
    case "top-left":
      u = r ? -f : d, p = h;
      break;
    default:
      u = d, p = h;
      break;
  }
  return a && (r ? u = Math.min(
    -d,
    Math.max(u, -f)
  ) : u = Math.max(
    d,
    Math.min(u, f)
  ), p = Math.max(
    h,
    Math.min(p, m)
  )), { x: u, y: p };
}, Rv = (e, t) => {
  const [n, r] = t.split("-");
  return e !== n && e !== r;
}, Iv = (e, t, n, r) => n && r ? !0 : !n && !r ? Rv(e, t) : n ? e !== t.split("-")[0] : r ? e !== t.split("-")[1] : !1, Xn = (e, t, n) => {
  const r = n ? xe.width : xe.initialHeight, o = n ? On().maxWidth : On().maxHeight, i = e + t;
  return Math.min(Math.max(r, i), o);
}, Av = (e, t, n, r, o) => {
  const i = getComputedStyle(document.body).direction === "rtl", a = window.innerWidth - B * 2, l = window.innerHeight - B * 2;
  let s = t.width, u = t.height, p = n.x, d = n.y;
  if (i && e.includes("right")) {
    const w = -n.x + t.width - B, g = Math.min(t.width + r, w);
    s = Math.min(a, Math.max(xe.width, g)), p = n.x + (s - t.width);
  }
  if (i && e.includes("left")) {
    const w = window.innerWidth - n.x - B, g = Math.min(t.width - r, w);
    s = Math.min(a, Math.max(xe.width, g));
  }
  if (!i && e.includes("right")) {
    const w = window.innerWidth - n.x - B, g = Math.min(t.width + r, w);
    s = Math.min(a, Math.max(xe.width, g));
  }
  if (!i && e.includes("left")) {
    const w = n.x + t.width - B, g = Math.min(t.width - r, w);
    s = Math.min(a, Math.max(xe.width, g)), p = n.x - (s - t.width);
  }
  if (e.includes("bottom")) {
    const w = window.innerHeight - n.y - B, g = Math.min(
      t.height + o,
      w
    );
    u = Math.min(
      l,
      Math.max(xe.initialHeight, g)
    );
  }
  if (e.includes("top")) {
    const w = n.y + t.height - B, g = Math.min(
      t.height - o,
      w
    );
    u = Math.min(
      l,
      Math.max(xe.initialHeight, g)
    ), d = n.y - (u - t.height);
  }
  let f = B, h = window.innerWidth - B - s, m = B, v = window.innerHeight - B - u;
  return i ? p = Math.min(
    -f,
    Math.max(p, -h)
  ) : p = Math.max(
    f,
    Math.min(p, h)
  ), d = Math.max(
    m,
    Math.min(d, v)
  ), {
    newSize: { width: s, height: u },
    newPosition: { x: p, y: d }
  };
}, Pv = (e) => {
  const t = On(), n = {
    "top-left": Math.hypot(e.x, e.y),
    "top-right": Math.hypot(t.maxWidth - e.x, e.y),
    "bottom-left": Math.hypot(e.x, t.maxHeight - e.y),
    "bottom-right": Math.hypot(
      t.maxWidth - e.x,
      t.maxHeight - e.y
    )
  };
  let r = "top-left";
  for (const o in n)
    n[o] < n[r] && (r = o);
  return r;
}, Ov = (e, t, n, r, o = 100) => {
  const i = n !== void 0 ? e - n : 0, a = r !== void 0 ? t - r : 0, l = window.innerWidth / 2, s = window.innerHeight / 2, u = i > o, p = i < -o, d = a > o, f = a < -o;
  if (u || p) {
    const h = t > s;
    return u ? h ? "bottom-right" : "top-right" : h ? "bottom-left" : "top-left";
  }
  if (d || f) {
    const h = e > l;
    return d ? h ? "bottom-right" : "bottom-left" : h ? "top-right" : "top-left";
  }
  return e > l ? t > s ? "bottom-right" : "top-right" : t > s ? "bottom-left" : "top-left";
}, Gn = ({ position: e }) => {
  const t = j(null), n = j(null), r = j(null), o = j(null);
  q(() => {
    const l = t.current;
    if (!l) return;
    const s = () => {
      l.classList.remove("pointer-events-none");
      const d = M.inspectState.value.kind === "focused", f = ue.value.view !== "none";
      (d || f) && Iv(
        e,
        z.value.corner,
        z.value.dimensions.isFullWidth,
        z.value.dimensions.isFullHeight
      ) ? l.classList.remove(
        "hidden",
        "pointer-events-none",
        "opacity-0"
      ) : l.classList.add("hidden", "pointer-events-none", "opacity-0");
    }, u = z.subscribe((d) => {
      n.current !== null && r.current !== null && o.current !== null && d.dimensions.width === n.current && d.dimensions.height === r.current && d.corner === o.current || (s(), n.current = d.dimensions.width, r.current = d.dimensions.height, o.current = d.corner);
    }), p = M.inspectState.subscribe(() => {
      s();
    });
    return () => {
      u(), p(), n.current = null, r.current = null, o.current = null;
    };
  }, []);
  const i = ye(
    (l) => {
      l.preventDefault(), l.stopPropagation();
      const s = ei.value;
      if (!s) return;
      const u = s.style, { dimensions: p } = z.value, d = l.clientX, f = l.clientY, h = p.width, m = p.height, v = p.position;
      z.value = H(D({}, z.value), {
        dimensions: H(D({}, p), {
          isFullWidth: !1,
          isFullHeight: !1,
          width: h,
          height: m,
          position: v
        })
      });
      let w = null;
      const g = (k) => {
        w || (u.transition = "none", w = requestAnimationFrame(() => {
          const { newSize: S, newPosition: T } = Av(
            e,
            { width: h, height: m },
            v,
            k.clientX - d,
            k.clientY - f
          );
          u.transform = `translate3d(${T.x}px, ${T.y}px, 0)`, u.width = `${S.width}px`, u.height = `${S.height}px`;
          const E = Math.floor(S.width - We / 2), A = z.value.componentsTree.width, I = Math.min(
            E,
            Math.max(We, A)
          );
          z.value = H(D({}, z.value), {
            dimensions: {
              isFullWidth: !1,
              isFullHeight: !1,
              width: S.width,
              height: S.height,
              position: T
            },
            componentsTree: H(D({}, z.value.componentsTree), {
              width: I
            })
          }), w = null;
        }));
      }, y = () => {
        w && (cancelAnimationFrame(w), w = null), document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", y);
        const { dimensions: k, corner: S } = z.value, T = On(), E = T.isFullWidth(k.width), A = T.isFullHeight(k.height), I = E && A;
        let N = S;
        (I || E || A) && (N = Pv(k.position));
        const L = wn(
          N,
          k.width,
          k.height
        ), $ = () => {
          s.removeEventListener("transitionend", $);
        };
        s.addEventListener("transitionend", $), u.transform = `translate3d(${L.x}px, ${L.y}px, 0)`, z.value = H(D({}, z.value), {
          corner: N,
          dimensions: {
            isFullWidth: E,
            isFullHeight: A,
            width: k.width,
            height: k.height,
            position: L
          },
          lastDimensions: {
            isFullWidth: E,
            isFullHeight: A,
            width: k.width,
            height: k.height,
            position: L
          }
        }), Ae(ot, {
          corner: N,
          dimensions: z.value.dimensions,
          lastDimensions: z.value.lastDimensions,
          componentsTree: z.value.componentsTree
        });
      };
      document.addEventListener("pointermove", g, {
        passive: !0
      }), document.addEventListener("pointerup", y);
    },
    []
  ), a = ye(
    (l) => {
      l.preventDefault(), l.stopPropagation();
      const s = ei.value;
      if (!s) return;
      const u = s.style, { dimensions: p, corner: d } = z.value, f = On(), h = f.isFullWidth(p.width), m = f.isFullHeight(p.height), v = h && m, w = (h || m) && !v;
      let g = p.width, y = p.height;
      const k = Nv(
        e,
        d,
        v,
        h,
        m
      );
      e === "left" || e === "right" ? (g = h ? p.width : f.maxWidth, w && (g = h ? xe.width : f.maxWidth)) : (y = m ? p.height : f.maxHeight, w && (y = m ? xe.initialHeight : f.maxHeight)), v && (e === "left" || e === "right" ? g = xe.width : y = xe.initialHeight);
      const S = wn(k, g, y), T = {
        isFullWidth: f.isFullWidth(g),
        isFullHeight: f.isFullHeight(y),
        width: g,
        height: y,
        position: S
      }, E = Math.floor(g - xe.width / 2), A = z.value.componentsTree.width, I = Math.floor(g * 0.3), N = h ? We : (e === "left" || e === "right") && !h ? Math.min(E, Math.max(We, I)) : Math.min(
        E,
        Math.max(We, A)
      );
      requestAnimationFrame(() => {
        z.value = {
          corner: k,
          dimensions: T,
          lastDimensions: p,
          componentsTree: H(D({}, z.value.componentsTree), {
            width: N
          })
        }, u.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", u.width = `${g}px`, u.height = `${y}px`, u.transform = `translate3d(${S.x}px, ${S.y}px, 0)`;
      }), Ae(ot, {
        corner: k,
        dimensions: T,
        lastDimensions: p,
        componentsTree: H(D({}, z.value.componentsTree), {
          width: N
        })
      });
    },
    []
  );
  return /* @__PURE__ */ c(
    "div",
    {
      ref: t,
      onPointerDown: i,
      onDblClick: a,
      className: x(
        "absolute z-50",
        "flex items-center justify-center",
        "group",
        "transition-colors select-none",
        "peer",
        {
          "resize-left peer/left": e === "left",
          "resize-right peer/right z-10": e === "right",
          "resize-top peer/top": e === "top",
          "resize-bottom peer/bottom": e === "bottom"
        }
      ),
      children: /* @__PURE__ */ c("span", { className: "resize-line-wrapper", children: /* @__PURE__ */ c("span", { className: "resize-line", children: /* @__PURE__ */ c(
        ve,
        {
          name: "icon-ellipsis",
          size: 18,
          className: x(
            "text-neutral-400",
            (e === "left" || e === "right") && "rotate-90"
          )
        }
      ) }) })
    }
  );
}, _s = {
  horizontal: { width: 20, height: 48 },
  vertical: { width: 48, height: 20 }
}, Mv = () => {
  const e = j(null), t = j(!1), n = j(0), r = j(0), o = j(!1), i = ye((f = !0) => {
    if (!e.current) return;
    const { corner: h } = z.value;
    let m, v;
    if (Oe.value) {
      const N = Oe.value.orientation || "horizontal", L = _s[N];
      m = L.width, v = L.height;
    } else if (t.current) {
      const N = z.value.lastDimensions;
      m = Xn(N.width, 0, !0), v = Xn(N.height, 0, !1), o.current && (o.current = !1);
    } else
      m = n.current, v = r.current;
    let g = wn(h, m, v);
    if (Oe.value) {
      const { corner: N, orientation: L = "horizontal" } = Oe.value, $ = _s[L];
      switch (N) {
        case "top-left":
          g = L === "horizontal" ? { x: -1, y: B } : { x: B, y: -1 };
          break;
        case "bottom-left":
          g = L === "horizontal" ? { x: -1, y: window.innerHeight - $.height - B } : { x: B, y: window.innerHeight - $.height + 1 };
          break;
        case "top-right":
          g = L === "horizontal" ? { x: window.innerWidth - $.width + 1, y: B } : { x: window.innerWidth - $.width - B, y: -1 };
          break;
        default:
          g = L === "horizontal" ? {
            x: window.innerWidth - $.width + 1,
            y: window.innerHeight - $.height - B
          } : {
            x: window.innerWidth - $.width - B,
            y: window.innerHeight - $.height + 1
          };
          break;
      }
    }
    const y = m < xe.width || v < xe.initialHeight, k = f && !y, S = e.current, T = S.style;
    let E = null;
    const A = () => {
      to(), S.removeEventListener("transitionend", A), E && (cancelAnimationFrame(E), E = null);
    };
    S.addEventListener("transitionend", A), T.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", E = requestAnimationFrame(() => {
      T.width = `${m}px`, T.height = `${v}px`, T.transform = `translate3d(${g.x}px, ${g.y}px, 0)`, E = null;
    });
    const I = {
      isFullWidth: m >= window.innerWidth - B * 2,
      isFullHeight: v >= window.innerHeight - B * 2,
      width: m,
      height: v,
      position: g
    };
    z.value = {
      corner: h,
      dimensions: I,
      lastDimensions: t ? z.value.lastDimensions : m > n.current ? I : z.value.lastDimensions,
      componentsTree: z.value.componentsTree
    }, k && Ae(ot, {
      corner: z.value.corner,
      dimensions: z.value.dimensions,
      lastDimensions: z.value.lastDimensions,
      componentsTree: z.value.componentsTree
    }), to();
  }, []), a = ye(
    (f) => {
      if (f.preventDefault(), !e.current || f.target.closest("button"))
        return;
      const h = e.current, m = h.style, { dimensions: v } = z.value, w = f.clientX, g = f.clientY, y = v.position.x, k = v.position.y;
      let S = y, T = k, E = null, A = !1, I = w, N = g;
      const L = (O) => {
        E || (A = !0, I = O.clientX, N = O.clientY, E = requestAnimationFrame(() => {
          const ee = I - w, Z = N - g;
          S = Number(y) + ee, T = Number(k) + Z, m.transition = "none", m.transform = `translate3d(${S}px, ${T}px, 0)`;
          const le = S + v.width, b = T + v.height, C = Math.max(0, -S), _ = Math.max(0, le - window.innerWidth), R = Math.max(0, -T), P = Math.max(0, b - window.innerHeight), F = Math.min(
            v.width,
            C + _
          ), V = Math.min(
            v.height,
            R + P
          ), re = F * v.height + V * v.width - F * V, K = v.width * v.height;
          let oe = re > K * 0.35;
          if (!oe && te.options.value.showFPS) {
            const me = S + v.width, Q = me - 100;
            oe = me <= 0 || Q >= window.innerWidth || T + v.height <= 0 || T >= window.innerHeight;
          }
          if (oe) {
            const me = S + v.width / 2, Q = T + v.height / 2, ie = window.innerWidth / 2, de = window.innerHeight / 2;
            let Se;
            me < ie ? Se = Q < de ? "top-left" : "bottom-left" : Se = Q < de ? "top-right" : "bottom-right";
            let at;
            const Wr = Math.max(C, _), Ln = Math.max(R, P);
            at = Wr > Ln ? "horizontal" : "vertical", z.value = H(D({}, z.value), {
              corner: Se,
              lastDimensions: H(D({}, v), {
                position: wn(
                  Se,
                  v.width,
                  v.height
                )
              })
            });
            const tn = {
              corner: Se,
              orientation: at
            };
            Oe.value = tn, Ae(sr, tn), Ae(ot, z.value), i(!1), document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", $), E && (cancelAnimationFrame(E), E = null);
          }
          E = null;
        }));
      }, $ = () => {
        if (!h) return;
        E && (cancelAnimationFrame(E), E = null), document.removeEventListener("pointermove", L), document.removeEventListener("pointerup", $);
        const O = Math.abs(I - w), ee = Math.abs(N - g), Z = Math.sqrt(
          O * O + ee * ee
        );
        if (!A || Z < 60) return;
        const le = Ov(
          I,
          N,
          w,
          g,
          M.inspectState.value.kind === "focused" ? 80 : 40
        );
        if (le === z.value.corner) {
          m.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          const _ = z.value.dimensions.position;
          requestAnimationFrame(() => {
            m.transform = `translate3d(${_.x}px, ${_.y}px, 0)`;
          });
          return;
        }
        const b = wn(
          le,
          v.width,
          v.height
        );
        if (S === y && T === k) return;
        const C = () => {
          m.transition = "none", to(), h.removeEventListener("transitionend", C), E && (cancelAnimationFrame(E), E = null);
        };
        h.addEventListener("transitionend", C), m.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", requestAnimationFrame(() => {
          m.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        }), z.value = {
          corner: le,
          dimensions: {
            isFullWidth: v.isFullWidth,
            isFullHeight: v.isFullHeight,
            width: v.width,
            height: v.height,
            position: b
          },
          lastDimensions: z.value.lastDimensions,
          componentsTree: z.value.componentsTree
        }, Ae(ot, {
          corner: le,
          dimensions: z.value.dimensions,
          lastDimensions: z.value.lastDimensions,
          componentsTree: z.value.componentsTree
        });
      };
      document.addEventListener("pointermove", L), document.addEventListener("pointerup", $);
    },
    []
  ), l = ye(
    (f) => {
      if (f.preventDefault(), !e.current || !Oe.value) return;
      const { corner: h, orientation: m = "horizontal" } = Oe.value, v = f.clientX, w = f.clientY;
      let g = null, y = !1;
      const k = 50, S = (E) => {
        if (y || g) return;
        const A = E.clientX - v, I = E.clientY - w;
        let N = !1;
        if (m === "horizontal" ? (h.endsWith("left") && A > k || h.endsWith("right") && A < -k) && (N = !0) : (h.startsWith("top") && I > k || h.startsWith("bottom") && I < -k) && (N = !0), N) {
          if (y = !0, Oe.value = null, Ae(sr, null), n.current === 0 && e.current)
            requestAnimationFrame(() => {
              if (e.current) {
                e.current.style.width = "min-content";
                const L = e.current.offsetWidth;
                n.current = L || 300;
                const $ = z.value.lastDimensions, O = Xn(
                  $.width,
                  0,
                  !0
                ), ee = Xn(
                  $.height,
                  0,
                  !1
                );
                let Z = E.clientX - O / 2, le = E.clientY - ee / 2;
                Z = Math.max(
                  B,
                  Math.min(Z, window.innerWidth - O - B)
                ), le = Math.max(
                  B,
                  Math.min(le, window.innerHeight - ee - B)
                ), z.value = H(D({}, z.value), {
                  dimensions: H(D({}, z.value.dimensions), {
                    position: { x: Z, y: le }
                  })
                }), i(!0);
                const b = it(
                  It
                );
                ue.value = b || { view: "none" }, setTimeout(() => {
                  if (e.current) {
                    const C = new PointerEvent("pointerdown", {
                      clientX: E.clientX,
                      clientY: E.clientY,
                      pointerId: E.pointerId,
                      bubbles: !0
                    });
                    e.current.dispatchEvent(C);
                  }
                }, 100);
              }
            });
          else {
            i(!0);
            const L = it(
              It
            );
            ue.value = L || { view: "none" };
          }
          document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", T);
        }
      }, T = () => {
        document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", T);
      };
      document.addEventListener("pointermove", S), document.addEventListener("pointerup", T);
    },
    []
  );
  q(() => {
    if (!e.current) return;
    Ua(It), Oe.value ? (r.current = 36, n.current = 0) : (e.current.style.width = "min-content", r.current = 36, n.current = e.current.offsetWidth), e.current.style.maxWidth = `calc(100vw - ${B * 2}px)`, e.current.style.maxHeight = `calc(100vh - ${B * 2}px)`, i(), M.inspectState.value.kind !== "focused" && !Oe.value && !o.current && (z.value = H(D({}, z.value), {
      dimensions: {
        isFullWidth: !1,
        isFullHeight: !1,
        width: n.current,
        height: r.current,
        position: z.value.dimensions.position
      }
    })), ei.value = e.current;
    const f = z.subscribe((w) => {
      if (!e.current) return;
      const { x: g, y } = w.dimensions.position, { width: k, height: S } = w.dimensions, T = e.current;
      requestAnimationFrame(() => {
        T.style.transform = `translate3d(${g}px, ${y}px, 0)`, T.style.width = `${k}px`, T.style.height = `${S}px`;
      });
    }), h = ue.subscribe(
      (w) => {
        t.current = w.view !== "none", i(), Oe.value || (w.view !== "none" ? Ae(It, w) : Ua(It));
      }
    ), m = M.inspectState.subscribe(
      (w) => {
        t.current = w.kind === "focused", i();
      }
    ), v = () => {
      i(!0);
    };
    return window.addEventListener("resize", v, { passive: !0 }), () => {
      window.removeEventListener("resize", v), h(), m(), f(), Ae(ot, H(D({}, Ye), {
        corner: z.value.corner
      }));
    };
  }, []);
  const [s, u] = J(!1);
  q(() => {
    u(!0);
  }, []);
  const p = Oe.value;
  let d = "";
  if (p) {
    const { orientation: f = "horizontal", corner: h } = p;
    f === "horizontal" ? d = h != null && h.endsWith("right") ? "rotate-180" : "" : d = h != null && h.startsWith("bottom") ? "-rotate-90" : "rotate-90";
  }
  return /* @__PURE__ */ c(ne, { children: [
    /* @__PURE__ */ c(Tv, {}),
    /* @__PURE__ */ c(qi.Provider, { value: e.current, children: /* @__PURE__ */ c(
      "div",
      {
        id: "react-scan-toolbar",
        dir: "ltr",
        ref: e,
        onPointerDown: p ? l : a,
        className: x(
          "fixed inset-0",
          p ? (() => {
            const { orientation: f = "horizontal", corner: h } = p;
            return f === "horizontal" ? h != null && h.endsWith("right") ? "rounded-tl-lg rounded-bl-lg shadow-lg" : "rounded-tr-lg rounded-br-lg shadow-lg" : h != null && h.startsWith("bottom") ? "rounded-tl-lg rounded-tr-lg shadow-lg" : "rounded-bl-lg rounded-br-lg shadow-lg";
          })() : "rounded-lg shadow-lg",
          "flex flex-col",
          "font-mono text-[13px]",
          "user-select-none",
          "opacity-0",
          p ? "cursor-pointer" : "cursor-move",
          "z-[124124124124]",
          "animate-fade-in animation-duration-300 animation-delay-300",
          "will-change-transform",
          "[touch-action:none]"
        ),
        children: p ? /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => {
              Oe.value = null, Ae(sr, null), n.current === 0 && e.current && requestAnimationFrame(() => {
                if (e.current) {
                  e.current.style.width = "min-content";
                  const h = e.current.offsetWidth;
                  n.current = h || 300, i(!0);
                }
              });
              const f = it(
                It
              );
              ue.value = f || { view: "none" };
            },
            className: "flex items-center justify-center w-full h-full text-white",
            title: "Expand toolbar",
            children: /* @__PURE__ */ c(
              ve,
              {
                name: "icon-chevron-right",
                size: 16,
                className: x("transition-transform", d)
              }
            )
          }
        ) : /* @__PURE__ */ c(ne, { children: [
          /* @__PURE__ */ c(Gn, { position: "top" }),
          /* @__PURE__ */ c(Gn, { position: "bottom" }),
          /* @__PURE__ */ c(Gn, { position: "left" }),
          /* @__PURE__ */ c(Gn, { position: "right" }),
          /* @__PURE__ */ c(Sv, {})
        ] })
      }
    ) })
  ] });
}, qi = Ql(null), zv = () => /* @__PURE__ */ c("svg", { xmlns: "http://www.w3.org/2000/svg", style: "display: none;", children: [
  /* @__PURE__ */ c("title", { children: "React Scan Icons" }),
  /* @__PURE__ */ c("symbol", { id: "icon-inspect", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" }),
    /* @__PURE__ */ c("path", { d: "M5 3a2 2 0 0 0-2 2" }),
    /* @__PURE__ */ c("path", { d: "M19 3a2 2 0 0 1 2 2" }),
    /* @__PURE__ */ c("path", { d: "M5 21a2 2 0 0 1-2-2" }),
    /* @__PURE__ */ c("path", { d: "M9 3h1" }),
    /* @__PURE__ */ c("path", { d: "M9 21h2" }),
    /* @__PURE__ */ c("path", { d: "M14 3h1" }),
    /* @__PURE__ */ c("path", { d: "M3 9v1" }),
    /* @__PURE__ */ c("path", { d: "M21 9v2" }),
    /* @__PURE__ */ c("path", { d: "M3 14v1" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-focus", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" }),
    /* @__PURE__ */ c("path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-next", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ c("path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z" }) }),
  /* @__PURE__ */ c("symbol", { id: "icon-previous", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ c("path", { d: "M18 15h-6v4l-7-7 7-7v4h6v6z" }) }),
  /* @__PURE__ */ c("symbol", { id: "icon-close", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    /* @__PURE__ */ c("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-replay", viewBox: "0 0 24 24", fill: "none", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }),
    /* @__PURE__ */ c("path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }),
    /* @__PURE__ */ c("path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }),
    /* @__PURE__ */ c("path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }),
    /* @__PURE__ */ c("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ c("path", { d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-ellipsis", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("circle", { cx: "12", cy: "12", r: "1" }),
    /* @__PURE__ */ c("circle", { cx: "19", cy: "12", r: "1" }),
    /* @__PURE__ */ c("circle", { cx: "5", cy: "12", r: "1" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-copy", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
    /* @__PURE__ */ c("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-check", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ c("path", { d: "M20 6 9 17l-5-5" }) }),
  /* @__PURE__ */ c("symbol", { id: "icon-chevron-right", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ c("path", { d: "m9 18 6-6-6-6" }) }),
  /* @__PURE__ */ c("symbol", { id: "icon-settings", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
    /* @__PURE__ */ c("circle", { cx: "12", cy: "12", r: "3" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-flame", viewBox: "0 0 24 24", children: /* @__PURE__ */ c("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }) }),
  /* @__PURE__ */ c("symbol", { id: "icon-function", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
    /* @__PURE__ */ c("path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" }),
    /* @__PURE__ */ c("path", { d: "M9 11.2h5.7" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-triangle-alert", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
    /* @__PURE__ */ c("path", { d: "M12 9v4" }),
    /* @__PURE__ */ c("path", { d: "M12 17h.01" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-gallery-horizontal-end", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M2 7v10" }),
    /* @__PURE__ */ c("path", { d: "M6 5v14" }),
    /* @__PURE__ */ c("rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-search", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ c("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-lock", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
    /* @__PURE__ */ c("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-lock-open", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
    /* @__PURE__ */ c("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
  ] }),
  /* @__PURE__ */ c("symbol", { id: "icon-sanil", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ c("path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" }),
    /* @__PURE__ */ c("circle", { cx: "10", cy: "13", r: "8" }),
    /* @__PURE__ */ c("path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" }),
    /* @__PURE__ */ c("path", { d: "M18 3 19.1 5.2" })
  ] })
] }), Dv = class extends $e {
  constructor() {
    super(...arguments), this.state = { hasError: !1, error: null }, this.handleReset = () => {
      this.setState({ hasError: !1, error: null });
    };
  }
  static getDerivedStateFromError(e) {
    return { hasError: !0, error: e };
  }
  render() {
    var e;
    return this.state.hasError ? /* @__PURE__ */ c("div", { className: "fixed bottom-4 right-4 z-[124124124124]", children: /* @__PURE__ */ c("div", { className: "p-3 bg-black rounded-lg shadow-lg w-80", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2 mb-2 text-red-400 text-sm font-medium", children: [
        /* @__PURE__ */ c(ve, { name: "icon-flame", className: "text-red-500", size: 14 }),
        "React Scan ran into a problem"
      ] }),
      /* @__PURE__ */ c("div", { className: "p-2 bg-black rounded font-mono text-xs text-red-300 mb-3 break-words", children: ((e = this.state.error) == null ? void 0 : e.message) || JSON.stringify(this.state.error) }),
      /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: this.handleReset,
          className: "px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5",
          children: "Restart"
        }
      )
    ] }) }) : this.props.children;
  }
}, Fv = (e) => {
  const t = document.createElement("div");
  t.id = "react-scan-toolbar-root", window.__REACT_SCAN_TOOLBAR_CONTAINER__ = t, e.appendChild(t), mn(
    /* @__PURE__ */ c(Dv, { children: /* @__PURE__ */ c(ne, { children: [
      /* @__PURE__ */ c(zv, {}),
      /* @__PURE__ */ c(Mv, {})
    ] }) }),
    t
  );
  const n = t.remove.bind(t);
  return t.remove = () => {
    window.__REACT_SCAN_TOOLBAR_CONTAINER__ = void 0, t.hasChildNodes() && (mn(null, t), mn(null, t)), n();
  }, t;
}, $v = {
  version: "0.4.3"
}, gt = null, sn = null, Lv = () => {
  if (gt && sn)
    return { rootContainer: gt, shadowRoot: sn };
  gt = document.createElement("div"), gt.id = "react-scan-root", sn = gt.attachShadow({ mode: "open" });
  const e = document.createElement("style");
  return e.textContent = ng, sn.appendChild(e), document.documentElement.appendChild(gt), { rootContainer: gt, shadowRoot: sn };
}, M = {
  wasDetailsOpen: _e(!0),
  isInIframe: _e(Qe && window.self !== window.top),
  inspectState: _e({
    kind: "uninitialized"
  }),
  monitor: _e(null),
  fiberRoots: /* @__PURE__ */ new Set(),
  reportData: /* @__PURE__ */ new Map(),
  legacyReportData: /* @__PURE__ */ new Map(),
  lastReportTime: _e(0),
  interactionListeningForRenders: null,
  changesListeners: /* @__PURE__ */ new Map()
}, te = {
  instrumentation: null,
  componentAllowList: null,
  options: _e({
    enabled: !0,
    // includeChildren: true,
    // playSound: false,
    log: !1,
    showToolbar: !0,
    // renderCountThreshold: 0,
    // report: undefined,
    // alwaysShowLabels: false,
    animationSpeed: "fast",
    dangerouslyForceRunInProduction: !1,
    showFPS: !0,
    showNotificationCount: !0,
    allowInIframe: !1
    // smoothlyAnimateOutlines: true,
    // trackUnnecessaryRenders: false,
  }),
  runInAllEnvironments: !1,
  onRender: null,
  scheduledOutlines: /* @__PURE__ */ new Map(),
  activeOutlines: /* @__PURE__ */ new Map(),
  Store: M,
  version: $v.version
};
Qe && window.__REACT_SCAN_EXTENSION__ && (window.__REACT_SCAN_VERSION__ = te.version);
function jv(e) {
  return e in te.options.value;
}
var Gc = (e) => {
  const t = [], n = {};
  for (const r in e) {
    if (!jv(r)) continue;
    const o = e[r];
    switch (r) {
      case "enabled":
      // case 'includeChildren':
      case "log":
      case "showToolbar":
      // case 'report':
      // case 'alwaysShowLabels':
      case "showNotificationCount":
      case "dangerouslyForceRunInProduction":
      case "showFPS":
      case "allowInIframe":
        typeof o != "boolean" ? t.push(`- ${r} must be a boolean. Got "${o}"`) : n[r] = o;
        break;
      // case 'renderCountThreshold':
      // case 'resetCountTimeout':
      //   if (typeof value !== 'number' || value < 0) {
      //     errors.push(`- ${key} must be a non-negative number. Got "${value}"`);
      //   } else {
      //     validOptions[key] = value as number;
      //   }
      //   break;
      case "animationSpeed":
        ["slow", "fast", "off"].includes(o) ? n[r] = o : t.push(
          `- Invalid animation speed "${o}". Using default "fast"`
        );
        break;
      case "onCommitStart":
        typeof o != "function" ? t.push(`- ${r} must be a function. Got "${o}"`) : n.onCommitStart = o;
        break;
      case "onCommitFinish":
        typeof o != "function" ? t.push(`- ${r} must be a function. Got "${o}"`) : n.onCommitFinish = o;
        break;
      case "onRender":
        typeof o != "function" ? t.push(`- ${r} must be a function. Got "${o}"`) : n.onRender = o;
        break;
      case "onPaintStart":
      case "onPaintFinish":
        typeof o != "function" ? t.push(`- ${r} must be a function. Got "${o}"`) : n[r] = o;
        break;
      // case 'trackUnnecessaryRenders': {
      //   validOptions.trackUnnecessaryRenders =
      //     typeof value === 'boolean' ? value : false;
      //   break;
      // }
      // case 'smoothlyAnimateOutlines': {
      //   validOptions.smoothlyAnimateOutlines =
      //     typeof value === 'boolean' ? value : false;
      //   break;
      // }
      default:
        t.push(`- Unknown option "${r}"`);
    }
  }
  return t.length > 0 && console.warn(`[React Scan] Invalid options:
${t.join(`
`)}`), n;
}, qc = (e) => {
  var t;
  try {
    const n = Gc(e);
    if (Object.keys(n).length === 0)
      return;
    const r = "showToolbar" in n && n.showToolbar !== void 0, o = D(D({}, te.options.value), n), { instrumentation: i } = te;
    i && "enabled" in n && (i.isPaused.value = n.enabled === !1), te.options.value = o;
    try {
      const a = (t = it(
        "react-scan-options"
      )) == null ? void 0 : t.enabled;
      typeof a == "boolean" && (o.enabled = a);
    } catch (a) {
      te.options.value._debug === "verbose" && console.error(
        "[React Scan Internal Error]",
        "Failed to create notifications outline canvas",
        a
      );
    }
    return Ae("react-scan-options", o), r && Jc(!!o.showToolbar), o;
  } catch (n) {
    te.options.value._debug === "verbose" && console.error(
      "[React Scan Internal Error]",
      "Failed to create notifications outline canvas",
      n
    );
  }
}, Kc = () => te.options, qn = null, Kn, jr = () => {
  if (qn !== null)
    return qn;
  Kn != null || (Kn = Kt());
  for (const e of Kn.renderers.values())
    pf(e) === "production" && (qn = !0);
  return qn;
}, Vv = () => {
  try {
    if (!Qe || !te.runInAllEnvironments && jr() && !te.options.value.dangerouslyForceRunInProduction)
      return;
    const e = it("react-scan-options");
    if (e) {
      const n = Gc(e);
      Object.keys(n).length > 0 && (te.options.value = D(D({}, te.options.value), n));
    }
    const t = Kc();
    tg(() => {
      Jc(!!t.value.showToolbar);
    }), !M.monitor.value && Qe && setTimeout(() => {
      ff() || console.error(
        "[React Scan] Failed to load. Must import React Scan before React runs."
      );
    }, 5e3);
  } catch (e) {
    te.options.value._debug === "verbose" && console.error(
      "[React Scan Internal Error]",
      "Failed to create notifications outline canvas",
      e
    );
  }
}, Jc = (e) => {
  var t;
  (t = window.reactScanCleanupListeners) == null || t.call(window);
  const n = Ag(), r = Wv();
  window.reactScanCleanupListeners = () => {
    n(), r == null || r();
  };
  const o = window.__REACT_SCAN_TOOLBAR_CONTAINER__;
  if (!e) {
    o == null || o.remove();
    return;
  }
  o == null || o.remove();
  const { shadowRoot: i } = Lv();
  Fv(i);
}, Wv = () => {
  try {
    const e = document.documentElement;
    return ev(e);
  } catch (e) {
    te.options.value._debug === "verbose" && console.error(
      "[React Scan Internal Error]",
      "Failed to create notifications outline canvas",
      e
    );
  }
}, Hv = (e = {}) => {
  qc(e), !(M.isInIframe.value && !te.options.value.allowInIframe && !te.runInAllEnvironments) && (e.enabled === !1 && e.showToolbar !== !0 || Vv());
}, Uv = /* @__PURE__ */ new WeakSet();
function Zc(e) {
  if (typeof window != "undefined") {
    try {
      if (window.parent && window.parent !== window && window.parent[e])
        return window.parent[e];
    } catch (t) {
    }
    if (window[e])
      return window[e];
  }
}
function Me() {
  var e, t;
  try {
    if (typeof window != "undefined") {
      if (window.parent && window.parent !== window && ((e = window.parent.__REACT_SCAN__) != null && e.ReactScanInternals))
        return window.parent.__REACT_SCAN__.ReactScanInternals;
      if ((t = window.__REACT_SCAN__) != null && t.ReactScanInternals)
        return window.__REACT_SCAN__.ReactScanInternals;
    }
  } catch (n) {
  }
  return te;
}
function Jn() {
  var e, t;
  try {
    if (typeof window != "undefined") {
      if (window.parent && window.parent !== window && ((e = window.parent.__REACT_SCAN__) != null && e.setOptions))
        return window.parent.__REACT_SCAN__.setOptions;
      if ((t = window.__REACT_SCAN__) != null && t.setOptions)
        return window.__REACT_SCAN__.setOptions;
    }
  } catch (n) {
  }
  return qc;
}
function bo() {
  return Zc("__REACT_SCAN_GET_OPTIONS__") || Kc;
}
function ks() {
  return Zc("__REACT_SCAN_SCAN__") || Hv;
}
function Zn(e) {
  if (typeof document != "undefined")
    try {
      const t = () => {
        const n = document.getElementById("react-scan-root");
        if (!n || !n.shadowRoot)
          return;
        let r = n.shadowRoot.getElementById("react-scan-devtools-style");
        r || (r = document.createElement("style"), r.id = "react-scan-devtools-style", n.shadowRoot.appendChild(r)), r.textContent = e ? "" : "#react-scan-toolbar { display: none !important; }";
      };
      t(), requestAnimationFrame(t), setTimeout(t, 100);
    } catch (t) {
    }
}
var dn = null, Re = {}, U = null, dr = /* @__PURE__ */ new Set();
function Fe(e) {
  if (e !== void 0) {
    if (e === null)
      return null;
    if (typeof e == "function")
      return `[Function: ${e.name || "anonymous"}]`;
    if (typeof e == "symbol")
      return `[Symbol: ${e.description || ""}]`;
    if (e instanceof Element)
      return `[Element: ${e.tagName}]`;
    if (typeof e == "object") {
      if (Array.isArray(e))
        return e.length > 10 ? `[Array(${e.length})]` : e.map(Fe);
      if (e.$$typeof)
        return "[React Element]";
      try {
        const t = Object.keys(e);
        if (t.length > 20)
          return `[Object with ${t.length} keys]`;
        const n = {};
        for (const r of t.slice(0, 20))
          n[r] = Fe(e[r]);
        return n;
      } catch (t) {
        return "[Object]";
      }
    }
    return e;
  }
}
function Bv() {
  var e, t;
  try {
    const { Store: n } = Me();
    if (((t = (e = n == null ? void 0 : n.inspectState) == null ? void 0 : e.value) == null ? void 0 : t.kind) === "focused") {
      const r = n.inspectState.value.fiber;
      if (r) {
        const o = String(Pe(r));
        return { fiber: r, fiberId: o };
      }
    }
    return null;
  } catch (n) {
    return null;
  }
}
function Yv(e, t) {
  try {
    const { Store: n } = Me();
    if (!(n != null && n.changesListeners))
      return () => {
      };
    let r = n.changesListeners.get(e);
    return r || (r = [], n.changesListeners.set(e, r)), r.push(t), () => {
      const o = n.changesListeners.get(e);
      if (o) {
        const i = o.indexOf(t);
        i > -1 && o.splice(i, 1);
      }
    };
  } catch (n) {
    return () => {
    };
  }
}
function xo() {
  var e, t, n, r, o;
  try {
    const i = Me();
    if (!i)
      return () => {
      };
    const a = (t = (e = i.options) == null ? void 0 : e.value) == null ? void 0 : t.onRender, l = (s, u) => {
      var p, d;
      if (a && a(s, u), Kv(s), !U || (he(s.type) || "Unknown") !== U.componentName)
        return;
      U.renderCount++, U.timestamp = Date.now();
      const h = [], m = [], v = [];
      try {
        const g = s.memoizedProps || {}, y = ((p = s.alternate) == null ? void 0 : p.memoizedProps) || {};
        for (const E of Object.keys(g)) {
          if (E === "children")
            continue;
          const A = y[E], I = g[E];
          A !== I && h.push({
            name: E,
            previousValue: Fe(A),
            currentValue: Fe(I),
            count: 1
          });
        }
        let k = s.memoizedState, S = (d = s.alternate) == null ? void 0 : d.memoizedState, T = 0;
        for (; k; ) {
          if (k.memoizedState !== void 0) {
            const E = k.memoizedState, A = S == null ? void 0 : S.memoizedState;
            A !== E && S && m.push({
              name: `Hook ${T + 1}`,
              previousValue: Fe(A),
              currentValue: Fe(E),
              count: 1
            });
          }
          k = k.next, S = S == null ? void 0 : S.next, T++;
        }
      } catch (g) {
      }
      for (const g of h) {
        const y = U.changes.propsChanges.find((k) => k.name === g.name);
        y ? (y.count++, y.previousValue = g.previousValue, y.currentValue = g.currentValue) : U.changes.propsChanges.push(g);
      }
      for (const g of m) {
        const y = U.changes.stateChanges.find((k) => k.name === g.name);
        y ? (y.count++, y.previousValue = g.previousValue, y.currentValue = g.currentValue) : U.changes.stateChanges.push(g);
      }
      for (const g of v) {
        const y = U.changes.contextChanges.find((k) => k.name === g.name);
        y ? (y.count++, y.previousValue = g.previousValue, y.currentValue = g.currentValue) : U.changes.contextChanges.push(g);
      }
      const w = {
        componentName: U.componentName,
        renderCount: U.renderCount,
        changes: U.changes,
        timestamp: U.timestamp
      };
      dr.forEach((g) => {
        try {
          g(w);
        } catch (y) {
        }
      });
    };
    try {
      const s = window.__REACT_SCAN__;
      if ((r = (n = s == null ? void 0 : s.ReactScanInternals) == null ? void 0 : n.options) != null && r.value) {
        const u = s.ReactScanInternals.options.value;
        s.ReactScanInternals.options.value = H(D({}, u), {
          onRender: l
        });
      }
    } catch (s) {
    }
    return (o = i.instrumentation) != null && o.isPaused && (i.instrumentation.isPaused.value = !1), () => {
      var s, u;
      try {
        const p = window.__REACT_SCAN__;
        (u = (s = p == null ? void 0 : p.ReactScanInternals) == null ? void 0 : s.options) != null && u.value && (p.ReactScanInternals.options.value.onRender = a || null);
      } catch (p) {
      }
    };
  } catch (i) {
    return () => {
    };
  }
}
var vt = null, Qc = 60, _o = 0, Cs = typeof performance != "undefined" ? performance.now() : Date.now(), eu = () => {
  if (typeof performance == "undefined" || typeof requestAnimationFrame == "undefined")
    return;
  _o++;
  const e = performance.now();
  e - Cs >= 1e3 && (Qc = _o, _o = 0, Cs = e), requestAnimationFrame(eu);
};
typeof requestAnimationFrame != "undefined" && requestAnimationFrame(eu);
var Rr = /* @__PURE__ */ new Map();
function Qn(e) {
  const t = Object.keys(e);
  for (const n of t)
    if (n.startsWith("__reactFiber$") || n.startsWith("__reactInternalInstance$"))
      return e[n];
  return null;
}
function Ss(e) {
  if (!e)
    return null;
  let t = e;
  for (; t.return; )
    t = t.return;
  return t.stateNode || t;
}
function Xv() {
  const e = /* @__PURE__ */ new Set(), t = (n) => {
    try {
      const r = ["#root", "#app", "#__next", "[data-reactroot]", "#react-root"];
      for (const o of r)
        n.querySelectorAll(o).forEach((a) => {
          let l = Qn(a);
          if (!l && a.firstElementChild && (l = Qn(a.firstElementChild)), !l) {
            const s = a.querySelectorAll("*");
            for (const u of s)
              if (l = Qn(u), l)
                break;
          }
          if (l) {
            const s = Ss(l);
            s && e.add(s);
          }
        });
      if (e.size === 0) {
        const o = n.querySelectorAll("*");
        for (const i of o) {
          const a = Qn(i);
          if (a) {
            const l = Ss(a);
            if (l) {
              e.add(l);
              break;
            }
          }
        }
      }
    } catch (r) {
    }
  };
  try {
    if (typeof window != "undefined" && typeof document != "undefined") {
      if (window.parent && window.parent !== window)
        try {
          t(window.parent.document);
        } catch (n) {
        }
      e.size === 0 && t(document);
    }
    e.size === 0 && qr && typeof qr.forEach == "function" && qr.forEach((n) => e.add(n));
  } catch (n) {
  }
  return e;
}
function Gv(e) {
  try {
    const t = Pe(e), n = Rr.get(t);
    if (n !== void 0)
      return n;
    const { Store: r } = Me();
    if (r != null && r.reportData) {
      const o = he(e.type) || "Unknown";
      let i = 0;
      return r.reportData.forEach((a) => {
        a.componentName === o && (i += a.count || 0);
      }), i;
    }
  } catch (t) {
  }
  return 0;
}
function fi(e, t, n, r) {
  if (!(!e || t > n))
    try {
      const o = Jt(e), i = he(e.type);
      if (o && i) {
        const a = tu(e, t, n);
        a && r.push(a);
      } else {
        let a = e.child;
        for (; a; )
          fi(a, t, n, r), a = a.sibling;
      }
    } catch (o) {
    }
}
function tu(e, t = 0, n = 50) {
  if (!e || t > n)
    return null;
  try {
    const r = Jt(e), o = he(e.type);
    if (r && o) {
      const l = Pe(e), s = Gv(e), u = {
        id: String(l),
        name: o,
        type: typeof e.type == "function" ? "function" : "class",
        renderCount: s,
        lastRenderTime: 0,
        children: []
      };
      let p = e.child;
      for (; p; )
        fi(p, t + 1, n, u.children), p = p.sibling;
      return u;
    }
    let i = e.child;
    const a = [];
    for (; i; )
      fi(i, t, n, a), i = i.sibling;
    return a.length === 1 ? a[0] : null;
  } catch (r) {
    return null;
  }
}
function qv() {
  const e = [];
  try {
    Xv().forEach((n) => {
      const r = n.current || n;
      if (!r)
        return;
      let o = r.child;
      for (; o; ) {
        const i = tu(o, 0);
        i && e.push(i), o = o.sibling;
      }
    });
  } catch (t) {
  }
  return e;
}
function Kv(e) {
  try {
    const t = Pe(e), n = Rr.get(t) || 0;
    Rr.set(t, n + 1);
  } catch (t) {
  }
}
function Ts() {
  const e = [];
  try {
    const { Store: t } = Me();
    if (!t || !t.reportData)
      return e;
    const n = /* @__PURE__ */ new Map();
    t.reportData.forEach((r) => {
      const o = r.componentName || "Unknown", i = n.get(o) || {
        renderCount: 0,
        totalTime: 0,
        unnecessaryRenders: 0,
        lastRenderTime: null
      };
      i.renderCount += r.count || 0, i.totalTime += r.time || 0, r.unnecessary && i.unnecessaryRenders++, r.time !== null && r.time !== void 0 && (i.lastRenderTime = r.time), n.set(o, i);
    }), n.forEach((r, o) => {
      e.push({
        componentName: o,
        renderCount: r.renderCount,
        totalTime: r.totalTime,
        averageTime: r.renderCount > 0 ? r.totalTime / r.renderCount : 0,
        unnecessaryRenders: r.unnecessaryRenders,
        lastRenderTime: r.lastRenderTime
      });
    }), e.sort((r, o) => o.totalTime - r.totalTime);
  } catch (t) {
  }
  return e;
}
function Jv(e) {
  const t = e.reduce((l, s) => l + s.renderCount, 0), n = e.length, r = e.reduce((l, s) => l + s.unnecessaryRenders, 0), o = e.reduce((l, s) => l + s.totalTime, 0), i = t > 0 ? o / t : 0, a = e.slice(0, 10);
  return {
    totalRenders: t,
    totalComponents: n,
    unnecessaryRenders: r,
    averageRenderTime: i,
    slowestComponents: a
  };
}
function Zv(e) {
  return Re = e, {
    getOptions: () => Re,
    setOptions: (t) => {
      Re = D(D({}, Re), t);
      const n = D({}, Re);
      if (n.enabled && (n.showToolbar = !0), Re.enabled) {
        const r = ks();
        r ? r(n) : Jn()(n), Zn(!!Re.showToolbar);
      } else
        Jn()(n);
    },
    start: () => {
      var t;
      const n = Me(), { instrumentation: r } = n || {};
      r && r.isPaused && (r.isPaused.value = !1);
      const o = H(D({}, Re), { enabled: !0 }), i = H(D({}, o), { showToolbar: !0 }), a = ks(), l = (n == null ? void 0 : n.instrumentation) && !n.instrumentation.isPaused.value;
      if (a)
        a(i);
      else {
        const s = ((t = bo()()) == null ? void 0 : t.value) || {};
        (Object.keys(i).some((p) => i[p] !== s[p]) || !l) && Jn()(i);
      }
      Re = o, Zn(!!Re.showToolbar), vt && vt(), vt = xo();
    },
    stop: () => {
      const t = H(D({}, Re), { enabled: !1 });
      Re = t, Jn()(t);
    },
    isActive: () => {
      const t = bo()();
      return t && typeof t == "object" && "value" in t ? t.value.enabled === !0 : (t == null ? void 0 : t.enabled) === !0;
    },
    hideToolbar: () => {
      Re.showToolbar = !1, Zn(!1);
    },
    showToolbar: () => {
      Re.showToolbar = !0, Zn(!0);
    },
    getToolbarVisibility: () => {
      const t = bo()();
      return t && typeof t == "object" && "value" in t ? t.value.showToolbar !== !1 : (t == null ? void 0 : t.showToolbar) !== !1;
    },
    getPerformanceData: () => Ts(),
    getPerformanceSummary: () => {
      const t = Ts();
      return Jv(t);
    },
    clearPerformanceData: () => {
      try {
        const { Store: t } = Me();
        t != null && t.reportData && t.reportData.clear(), t != null && t.legacyReportData && t.legacyReportData.clear();
      } catch (t) {
      }
    },
    startInspecting: () => {
      try {
        const { Store: t } = Me();
        t != null && t.inspectState && (t.inspectState.value = {
          kind: "inspecting",
          hoveredDomElement: null
        });
      } catch (t) {
      }
    },
    stopInspecting: () => {
      try {
        const { Store: t } = Me();
        t != null && t.inspectState && (t.inspectState.value = {
          kind: "inspect-off"
        });
      } catch (t) {
      }
    },
    isInspecting: () => {
      try {
        const { Store: t } = Me();
        return t != null && t.inspectState ? t.inspectState.value.kind === "inspecting" : !1;
      } catch (t) {
        return !1;
      }
    },
    focusComponent: (t) => {
      try {
        const { Store: n } = Me();
        if (!t || !(n != null && n.inspectState))
          return;
        let r = null;
        t.stateNode && t.stateNode instanceof Element && (r = t.stateNode), r && (n.inspectState.value = {
          kind: "focused",
          focusedDomElement: r,
          fiber: t
        });
      } catch (n) {
      }
    },
    getFocusedComponent: () => {
      try {
        const { Store: t } = Me();
        if (t != null && t.inspectState) {
          const n = t.inspectState.value;
          if (n.kind === "focused") {
            const r = Pe(n.fiber);
            return {
              componentName: he(n.fiber.type) || "Unknown",
              componentId: String(r),
              fiber: n.fiber,
              domElement: n.focusedDomElement
            };
          }
        }
        return null;
      } catch (t) {
        return null;
      }
    },
    onInspectStateChange: (t) => {
      try {
        const { Store: n } = Me();
        return n != null && n.inspectState ? (vt || (vt = xo()), n.inspectState.subscribe((o) => {
          var i;
          if (o.kind === "focused") {
            const a = he((i = o.fiber) == null ? void 0 : i.type) || "Unknown", l = Bv();
            (!U || U.componentName !== a) && (U != null && U.unsubscribe && U.unsubscribe(), U = {
              componentName: a,
              renderCount: 0,
              changes: { propsChanges: [], stateChanges: [], contextChanges: [] },
              timestamp: Date.now(),
              unsubscribe: null
            }, l && (U.unsubscribe = Yv(l.fiberId, (s) => {
              if (U) {
                U.renderCount++, U.timestamp = Date.now(), s.propsChanges && Array.isArray(s.propsChanges) && (U.changes.propsChanges = s.propsChanges.map((p) => ({
                  name: p.name || "unknown",
                  previousValue: Fe(p.prevValue),
                  currentValue: Fe(p.value),
                  count: 1
                }))), s.stateChanges && Array.isArray(s.stateChanges) && (U.changes.stateChanges = s.stateChanges.map((p) => ({
                  name: p.name || `Hook ${p.index || 0}`,
                  previousValue: Fe(p.prevValue),
                  currentValue: Fe(p.value),
                  count: 1
                }))), s.contextChanges && Array.isArray(s.contextChanges) && (U.changes.contextChanges = s.contextChanges.map((p) => ({
                  name: p.name || "Context",
                  previousValue: Fe(p.prevValue),
                  currentValue: Fe(p.value),
                  count: 1
                })));
                const u = {
                  componentName: U.componentName,
                  renderCount: U.renderCount,
                  changes: U.changes,
                  timestamp: U.timestamp
                };
                dr.forEach((p) => {
                  try {
                    p(u);
                  } catch (d) {
                  }
                });
              }
            })));
          } else o.kind;
          t(o);
        })) : () => {
        };
      } catch (n) {
        return () => {
        };
      }
    },
    getFPS: () => Qc,
    getFocusedComponentRenderInfo: () => U ? {
      componentName: U.componentName,
      renderCount: U.renderCount,
      changes: U.changes,
      timestamp: U.timestamp
    } : null,
    onFocusedComponentChange: (t) => (dr.add(t), () => {
      dr.delete(t);
    }),
    /**
     * Set the focused component by name for render tracking
     * This is used when inspectState.kind is not 'focused' but we still want to track renders
     */
    setFocusedComponentByName: (t) => {
      U != null && U.unsubscribe && U.unsubscribe(), U = {
        componentName: t,
        renderCount: 0,
        changes: { propsChanges: [], stateChanges: [], contextChanges: [] },
        timestamp: Date.now(),
        unsubscribe: null
      }, vt || (vt = xo());
    },
    clearFocusedComponentChanges: () => {
      U && (U.renderCount = 0, U.changes = { propsChanges: [], stateChanges: [], contextChanges: [] }, U.timestamp = Date.now());
    },
    /**
     * Get the component tree with render counts
     */
    getComponentTree: () => qv(),
    /**
     * Clear component render count tracking
     */
    clearComponentTree: () => {
      Rr.clear();
    }
  };
}
function ae(e) {
  if (!dn && e && (dn = Zv(e)), !dn)
    throw new Error("Scan instance not initialized. Call initScan first.");
  return dn;
}
function Qv() {
  dn = null, Re = {};
}
function nu(e = {}) {
  let t = null;
  const n = e, {
    autoStart: r = !0
  } = n, o = rr(n, [
    "autoStart"
  ]), i = /* @__PURE__ */ new Map(), a = (s, u) => {
    const p = i.get(s);
    p && p.forEach((d) => {
      if (typeof d == "function")
        try {
          d(u);
        } catch (f) {
        }
    });
  };
  return {
    id: "react-scan",
    name: "React Scan",
    description: "Performance monitoring and analysis for React applications",
    version: "1.0.0",
    // Expose subscribe method for event subscriptions
    subscribe: (s, u) => (i.has(s) || i.set(s, /* @__PURE__ */ new Set()), i.get(s).add(u), () => {
      const p = i.get(s);
      p && p.delete(u);
    }),
    /**
     * Plugin setup
     */
    async setup(s) {
      const u = D({
        enabled: r !== !1
      }, o);
      t = ae(u), r !== !1 && t.start();
      try {
        const p = ae();
        if (p) {
          let d = null;
          p.onInspectStateChange((f) => {
            var h, m;
            const v = {
              kind: f.kind,
              // Include component name if available
              componentName: f.fiber ? ((h = f.fiber.type) == null ? void 0 : h.displayName) || ((m = f.fiber.type) == null ? void 0 : m.name) || "Unknown" : void 0
            };
            if (a("inspect-state-changed", v), f.kind === "inspecting" && f.fiber) {
              const w = he(f.fiber.type) || "Unknown", g = String(Pe(f.fiber));
              d = { componentName: w, componentId: g };
            }
            if (f.kind === "focused") {
              const w = p.getFocusedComponent();
              if (w) {
                const g = w, { fiber: y, domElement: k } = g, S = rr(g, ["fiber", "domElement"]);
                a("component-focused", S), p.setFocusedComponentByName(w.componentName);
              }
            }
            f.kind === "inspect-off" && d && (a("component-focused", d), p.setFocusedComponentByName(d.componentName), d = null);
          }), p.onFocusedComponentChange((f) => {
            a("focused-component-render", f);
          });
        }
      } catch (p) {
      }
      s.on && s.on("component-tree-changed", (p) => {
      }), s.registerRPC && (s.registerRPC("getScanOptions", () => {
        try {
          const p = ae();
          return (p == null ? void 0 : p.getOptions()) || null;
        } catch (p) {
          return null;
        }
      }), s.registerRPC("setScanOptions", (p) => {
        try {
          const d = ae();
          return d ? (d.setOptions(p), !0) : !1;
        } catch (d) {
          return !1;
        }
      }), s.registerRPC("startScan", () => {
        try {
          const p = ae();
          return p ? (p.start(), !0) : !1;
        } catch (p) {
          return !1;
        }
      }), s.registerRPC("stopScan", () => {
        try {
          const p = ae();
          return p ? (p.stop(), !0) : !1;
        } catch (p) {
          return !1;
        }
      }), s.registerRPC("isScanActive", () => {
        try {
          const p = ae();
          return (p == null ? void 0 : p.isActive()) || !1;
        } catch (p) {
          return !1;
        }
      }));
    },
    /**
     * Plugin teardown
     */
    async teardown() {
      t && (t.stop(), t = null), Qv();
    },
    /**
     * RPC methods exposed to other plugins
     */
    rpc: {
      /**
       * Get current scan options
       */
      getOptions: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getOptions()) || null;
        } catch (s) {
          return null;
        }
      },
      /**
       * Set scan options
       */
      setOptions: (s) => {
        try {
          const u = ae();
          return u ? (u.setOptions(s), !0) : !1;
        } catch (u) {
          return !1;
        }
      },
      /**
       * Start scan
       */
      start: () => {
        try {
          const s = ae();
          return s ? (s.start(), !0) : t ? !1 : (t = ae(e), t.start(), !0);
        } catch (s) {
          return !1;
        }
      },
      /**
       * Stop scan
       */
      stop: () => {
        try {
          const s = ae();
          return s ? (s.stop(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Check if scan is active
       */
      isActive: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.isActive()) || !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Hide the React Scan toolbar
       */
      hideToolbar: () => {
        try {
          const s = ae();
          return s ? (s.hideToolbar(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Show the React Scan toolbar
       */
      showToolbar: () => {
        try {
          const s = ae();
          return s ? (s.showToolbar(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Get toolbar visibility state
       */
      getToolbarVisibility: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getToolbarVisibility()) || !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Get performance data for all components
       */
      getPerformanceData: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getPerformanceData()) || [];
        } catch (s) {
          return [];
        }
      },
      /**
       * Get aggregated performance summary
       */
      getPerformanceSummary: () => {
        try {
          const s = ae();
          return s ? s.getPerformanceSummary() : {
            totalRenders: 0,
            totalComponents: 0,
            unnecessaryRenders: 0,
            averageRenderTime: 0,
            slowestComponents: []
          };
        } catch (s) {
          return {
            totalRenders: 0,
            totalComponents: 0,
            unnecessaryRenders: 0,
            averageRenderTime: 0,
            slowestComponents: []
          };
        }
      },
      /**
       * Clear all performance data
       */
      clearPerformanceData: () => {
        try {
          const s = ae();
          return s ? (s.clearPerformanceData(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Get current FPS
       */
      getFPS: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getFPS()) || 0;
        } catch (s) {
          return 0;
        }
      },
      /**
       * Start component inspection mode
       */
      startInspecting: () => {
        try {
          const s = ae();
          return s ? (s.startInspecting(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Stop component inspection mode
       */
      stopInspecting: () => {
        try {
          const s = ae();
          return s ? (s.stopInspecting(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Check if inspection mode is active
       */
      isInspecting: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.isInspecting()) || !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Focus on a specific component
       */
      focusComponent: (s) => {
        try {
          const u = ae();
          return u && s ? (u.focusComponent(s), !0) : !1;
        } catch (u) {
          return !1;
        }
      },
      /**
       * Get currently focused component
       */
      getFocusedComponent: () => {
        try {
          const s = ae(), u = (s == null ? void 0 : s.getFocusedComponent()) || null;
          if (u) {
            const p = u, { fiber: d, domElement: f } = p;
            return rr(p, ["fiber", "domElement"]);
          }
          return null;
        } catch (s) {
          return null;
        }
      },
      /**
       * Get focused component render info with changes
       */
      getFocusedComponentRenderInfo: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getFocusedComponentRenderInfo()) || null;
        } catch (s) {
          return null;
        }
      },
      /**
       * Clear focused component changes
       */
      clearFocusedComponentChanges: () => {
        try {
          const s = ae();
          return s ? (s.clearFocusedComponentChanges(), !0) : !1;
        } catch (s) {
          return !1;
        }
      },
      /**
       * Set focused component by name for render tracking
       */
      setFocusedComponentByName: (s) => {
        try {
          const u = ae();
          return u && s ? (u.setFocusedComponentByName(s), !0) : !1;
        } catch (u) {
          return !1;
        }
      },
      /**
       * Get the component tree with render counts
       */
      getComponentTree: () => {
        try {
          const s = ae();
          return (s == null ? void 0 : s.getComponentTree()) || [];
        } catch (s) {
          return [];
        }
      },
      /**
       * Clear component tree render counts
       */
      clearComponentTree: () => {
        try {
          const s = ae();
          return s ? (s.clearComponentTree(), !0) : !1;
        } catch (s) {
          return !1;
        }
      }
    },
    /**
     * Event handlers
     */
    on: {
      "component-mounted": (s) => {
      },
      "component-updated": (s) => {
      }
    }
  };
}
nu();
function ew({
  isHidden: e,
  isAtBottom: t,
  isDragging: n,
  panelVisible: r,
  rotation: o,
  onPointerDown: i,
  onInspectorClick: a,
  children: l
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `react-devtools-button-group ${e ? "react-devtools-button--hidden" : ""}  ${r ? "react-devtools-button--active" : ""}`,
      style: {
        cursor: n ? "grabbing" : "default",
        transform: e ? `translate(-50%, -50%) rotate(${o}deg) translateY(24px) scale(0.9)` : `translate(-50%, -50%) rotate(${o}deg)`
      },
      onPointerDown: i
    },
    /* @__PURE__ */ React.createElement("div", { className: "react-devtools-button", title: "Toggle React DevTools" }, /* @__PURE__ */ React.createElement("div", { className: "react-devtools-button-icon", style: { transform: `rotate(${-o}deg)` } }, l || /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 128 128", width: "24", height: "24" }, /* @__PURE__ */ React.createElement("circle", { fill: "var(--color-primary-500, #00D8FF)", cx: "64", cy: "64", r: "14" }), /* @__PURE__ */ React.createElement("ellipse", { fill: "none", stroke: "var(--color-primary-500, #00D8FF)", strokeWidth: "4", cx: "64", cy: "64", rx: "22", ry: "54", transform: "rotate(30 64 64)" }), /* @__PURE__ */ React.createElement("ellipse", { fill: "none", stroke: "var(--color-primary-500, #00D8FF)", strokeWidth: "4", cx: "64", cy: "64", rx: "22", ry: "54", transform: "rotate(-30 64 64)" }), /* @__PURE__ */ React.createElement("ellipse", { fill: "none", stroke: "var(--color-primary-500, #00D8FF)", strokeWidth: "4", cx: "64", cy: "64", rx: "22", ry: "54", transform: "rotate(90 64 64)" })))),
    /* @__PURE__ */ React.createElement("div", { className: `react-devtools-expandable ${e ? "react-devtools-expandable--hidden" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "react-devtools-divider" }), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "react-devtools-button react-devtools-inspector-button",
        title: "Inspector (Select DOM element)",
        onClick: (s) => {
          s.stopPropagation(), a(s);
        },
        onPointerDown: (s) => s.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("div", { className: "react-devtools-button-icon", style: { transform: `rotate(${-o}deg)` } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { color: "var(--color-primary-500, #00D8FF)" } }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "7" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" }), /* @__PURE__ */ React.createElement("path", { d: "M12 2v3" }), /* @__PURE__ */ React.createElement("path", { d: "M12 19v3" }), /* @__PURE__ */ React.createElement("path", { d: "M2 12h3" }), /* @__PURE__ */ React.createElement("path", { d: "M19 12h3" })))
    ))
  );
}
function tw({ iframeRef: e, visible: t, width: n, height: r, onResize: o, enableDragResize: i }) {
  const a = React.useRef(null), [l, s] = React.useState(!1);
  React.useEffect(() => {
    const p = a.current, d = e.current;
    p && d && !p.contains(d) && p.appendChild(d);
  }, [e, t]), React.useEffect(() => {
    const p = e.current;
    p && (p.style.pointerEvents = l ? "none" : "auto");
  }, [l, e]);
  const u = (p, d) => {
    p.preventDefault(), p.stopPropagation(), s(!0);
    const f = p.clientX, h = p.clientY, m = n, v = r, w = (y) => {
      const k = y.clientX - f, S = y.clientY - h;
      let T = m, E = v;
      d === "top" ? E = Math.max(200, v - S) : d === "left" ? T = Math.max(300, m - k * 2) : d === "right" && (T = Math.max(300, m + k * 2)), T = Math.min(T, window.innerWidth - 40), E = Math.min(E, window.innerHeight - 40), o({ width: T, height: E });
    }, g = () => {
      s(!1), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", g);
    };
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", g);
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: a,
      className: `react-devtools-iframe-container ${t ? "" : "react-devtools-iframe-container--hidden"}`,
      style: { width: n, height: r }
    },
    i && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "resize-handle resize-handle-top",
        onPointerDown: (p) => u(p, "top")
      }
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "resize-handle resize-handle-left",
        onPointerDown: (p) => u(p, "left")
      }
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "resize-handle resize-handle-right",
        onPointerDown: (p) => u(p, "right")
      }
    ))
  );
}
function nw() {
  const e = window.__REACT_DEVTOOLS_CONFIG__;
  if (e != null && e.clientUrl) {
    const o = Date.now();
    return `${e.clientUrl.endsWith("/") ? e.clientUrl : `${e.clientUrl}/`}?t=${o}`;
  }
  const t = window.location.origin, n = "/__react_devtools__/", r = Date.now();
  return `${t}${n}?t=${r}`;
}
function rw(e, t = 1e4) {
  return new Promise((n) => {
    var o;
    (o = e == null ? void 0 : e.contentWindow) == null || o.postMessage("__REACT_DEVTOOLS_CREATE_CLIENT__", "*");
    const r = (i) => {
      i.data === "__REACT_DEVTOOLS_CLIENT_READY__" && (window.removeEventListener("message", r), n());
    };
    window.addEventListener("message", r), setTimeout(() => {
      window.removeEventListener("message", r), n();
    }, t);
  });
}
function ow(e, t, n, r) {
  const o = React.useRef(null), i = React.useRef(!1), a = React.useRef(null), l = React.useRef(t), s = React.useRef(e), u = React.useRef(r);
  return React.useEffect(() => {
    l.current = t, s.current = e, u.current = r;
  }, [t, e, r]), React.useEffect(() => {
    const p = hd((m) => {
      const v = zt();
      if (v && v.broadcast && i.current)
        try {
          const w = v.broadcast.updateTree(m);
          w && typeof w.then == "function" && w.catch(() => {
          }), a.current = null;
        } catch (w) {
        }
      else
        a.current = m;
    }), d = _d((m) => {
      const v = zt();
      v && v.broadcast && i.current && v.broadcast.selectNode(m).catch(() => {
      }), s.current || l.current(!0);
    }), f = kd((m, v, w) => {
      aa(m, v, w);
    });
    $d();
    const h = Pd((m, v) => {
      const w = zt();
      w && w.broadcast && i.current && w.broadcast.onPluginEvent("timeline", "event", { layerId: m, event: v }).catch(() => {
      });
    });
    return () => {
      p(), d(), f(), h();
    };
  }, []), React.useEffect(() => {
    if (o.current)
      return;
    const p = nw(), d = document.createElement("iframe");
    return d.id = "react-devtools-client-iframe", d.src = p, d.className = "react-devtools-iframe", o.current = d, d.onload = async () => {
      if (Ep(d), await rw(d), Pp({
        syncTheme(f) {
          u.current && u.current(f);
          const h = document.getElementById("react-devtools-overlay");
          if (h) {
            const w = h.querySelector(".react-devtools-anchor");
            w && (f.mode === "dark" ? w.classList.add("dark") : w.classList.remove("dark"), f.primaryColor && w.style.setProperty("--color-primary-500", f.primaryColor));
          }
          const m = document.getElementById("__react-devtools-component-inspector__");
          m && f.primaryColor && m.style.setProperty("--color-primary-500", f.primaryColor);
          let v = document.getElementById("react-devtools-global-styles");
          v || (v = document.createElement("style"), v.id = "react-devtools-global-styles", document.head.appendChild(v)), f.primaryColor && (v.textContent = `
              #__react-devtools-component-inspector__ {
                --color-primary-500: ${f.primaryColor};
              }
            `);
        },
        toggleDragResize(f) {
          n == null || n(f);
        },
        togglePanel(f) {
          l.current(f != null ? f : !s.current);
        },
        highlightNode(f) {
          const h = Je(f);
          h && Dt(h);
        },
        hideHighlight() {
          Ke();
        },
        scrollToComponent(f) {
          const h = Je(f);
          h && (Lu(h), Dt(h));
        },
        rebuildTree(f) {
          vd(f);
        },
        toggleInspector(f) {
          Vt(f), f && l.current(!1);
        },
        toggleInspectorMode(f) {
          Vt(!0, { mode: f }), l.current(!1);
        },
        openInEditor(f) {
          aa(f.fileName, f.line, f.column);
        },
        getReactVersion() {
          return bd();
        },
        getComponentDetails(f) {
          const h = Je(f);
          return h ? Iu(h) : null;
        },
        getRouterInfo() {
          return dd();
        },
        navigateTo(f) {
          return pd(f);
        },
        clearNavigationHistory() {
          return fd();
        },
        setComponentProp(f, h, m, v) {
          return Wu(f, h, m, v);
        },
        isEditableProp(f, h) {
          return Hu(f, h);
        },
        getContextTree() {
          const f = na();
          return f ? Su(f) : null;
        },
        getContextProviderDetails(f) {
          const h = na();
          return h ? Cu(h, f) : null;
        },
        setContextValue(f, h, m) {
          return Uu(f, h, m);
        },
        setContextValueFromJson(f, h) {
          return Bu(f, h);
        },
        setContextValueAtPath(f, h, m, v) {
          return Yu(f, h, m, v);
        },
        getComponentHookStates(f) {
          return Xu(f);
        },
        setHookState(f, h, m, v) {
          return Gu(f, h, m, v);
        },
        setHookStateFromJson(f, h, m) {
          return qu(f, h, m);
        },
        // Timeline RPC methods
        getTimelineState() {
          return Od();
        },
        updateTimelineState(f) {
          Md(f);
        },
        clearTimeline() {
          zd();
        },
        async callPluginRPC(f, h, ...m) {
          try {
            const v = `${f}.${h}`;
            return await ko.callRPC(v, ...m);
          } catch (v) {
            throw console.error(`[React DevTools] Failed to call plugin RPC ${f}.${h}:`, v), v;
          }
        },
        subscribeToPluginEvent(f, h) {
          try {
            if (f === "timeline")
              return () => {
              };
            const m = ko.get(f);
            return m ? typeof m.subscribe == "function" ? m.subscribe(h, (w) => {
              const g = zt();
              g && g.broadcast && g.broadcast.onPluginEvent(f, h, w).catch(() => {
              });
            }) : (console.error(`[React DevTools] Plugin "${f}" does not support event subscriptions`), () => {
            }) : (console.error(`[React DevTools] Plugin "${f}" not found`), () => {
            });
          } catch (m) {
            return console.error(`[React DevTools] Failed to subscribe to plugin event ${f}.${h}:`, m), () => {
            };
          }
        }
      }, {
        preset: "iframe"
      }), i.current = !0, a.current) {
        const f = zt();
        if (f && f.broadcast)
          try {
            const h = f.broadcast.updateTree(a.current);
            h && typeof h.then == "function" && h.catch(() => {
            }), a.current = null;
          } catch (h) {
          }
      }
    }, () => {
      o.current && (o.current.remove(), o.current = null);
    };
  }, []), { iframeRef: o };
}
function iw() {
  const [e, t] = React.useState(!1);
  return {
    panelVisible: e,
    setPanelVisible: t,
    togglePanel: () => {
      t((r) => !r);
    }
  };
}
function aw(e) {
  const [t, n] = React.useState(!1), [r, o] = React.useState(!0), [i, a] = React.useState({ x: window.innerWidth / 2, y: window.innerHeight - 25 }), l = React.useRef(null), s = React.useRef({ width: window.innerWidth, height: window.innerHeight });
  React.useEffect(() => {
    const y = setTimeout(() => {
      e || o(!1);
    }, 2e3);
    return () => clearTimeout(y);
  }, [e]), React.useEffect(() => {
    s.current = { width: window.innerWidth, height: window.innerHeight };
    const y = () => {
      if (t)
        return;
      const k = s.current.width, S = s.current.height, T = window.innerWidth, E = window.innerHeight;
      k === T && S === E || (a((A) => {
        let I = A.x, N = A.y;
        const L = k / 2, $ = Math.abs(A.x - L) < 50, O = A.y > S - 50;
        if ($)
          I = T / 2;
        else if (A.x > k / 2) {
          const ee = k - A.x;
          I = T - ee;
        }
        if (O)
          N = E - 25;
        else if (A.y > S / 2) {
          const ee = S - A.y;
          N = E - ee;
        }
        return I = Math.max(25, Math.min(T - 25, I)), N = Math.max(25, Math.min(E - 25, N)), { x: I, y: N };
      }), s.current = { width: T, height: E });
    };
    return window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, [t]), React.useEffect(() => {
    const y = () => {
      n(!1);
    };
    return window.addEventListener("pointerup", y), () => {
      window.removeEventListener("pointerup", y);
    };
  }, []);
  const u = () => {
    o(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => {
      !e && !t && o(!1);
    }, 2e3);
  }, p = (y, k) => {
    const { innerWidth: S, innerHeight: T } = window, E = 25, A = y, I = S - y, N = k, L = T - k, $ = Math.min(A, I, N, L);
    let O = y, ee = k;
    return $ === A ? O = E : $ === I ? O = S - E : $ === N ? ee = E : ee = T - E, O = Math.max(E, Math.min(S - E, O)), ee = Math.max(E, Math.min(T - E, ee)), { x: O, y: ee };
  }, d = (y, k) => {
    if (y.preventDefault(), y.stopPropagation(), y.target !== y.currentTarget && y.target.closest("iframe"))
      return;
    const S = { x: y.clientX, y: y.clientY, isDragging: !1 }, T = (A) => {
      const I = Math.abs(A.clientX - S.x), N = Math.abs(A.clientY - S.y);
      (I > 5 || N > 5) && (S.isDragging || (S.isDragging = !0, n(!0)), a({
        x: A.clientX,
        y: A.clientY
      }));
    }, E = (A) => {
      const I = S.isDragging;
      n(!1), S.isDragging = !1, window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", E), I ? a((N) => p(N.x, N.y)) : k();
    };
    window.addEventListener("pointermove", T), window.addEventListener("pointerup", E);
  }, f = !e && !r && !t, h = i.y > window.innerHeight - 100, m = i.x < 50 || i.x > window.innerWidth - 50, v = i.x > window.innerWidth - 50, w = i.y > window.innerHeight - 50;
  let g = 0;
  return m ? g = v ? -90 : 90 : g = w ? 0 : 180, {
    position: i,
    isDragging: t,
    isHovering: r,
    isHidden: f,
    isAtBottom: h,
    rotation: g,
    bringUp: u,
    handleButtonPointerDown: d
  };
}
const sw = {
  react: "#00D8FF",
  // Use our brighter cyan for overlay to match styles.css default, or use #61dafb if strictly matching client
  // user previously used #00D8FF for 'react' case, keeping it or switching?
  // The client PRESET_COLORS says #61dafb.
  // But styles.css fallback is #00D8FF.
  // Let's use the one from PRESET_COLORS to match client, but maybe #00D8FF is better for visibility on white?
  // Let's stick to the list from colors.ts for consistency across preset names.
  // EXCEPTION: 'react' in overlay seems to use #00D8FF in styles.css. I'll allow #00D8FF as a special override or just use the standard one.
  // Let's use the standard ones for the named colors.
  blue: "#3b82f6",
  green: "#10b981",
  purple: "#8b5cf6",
  pink: "#ec4899",
  orange: "#f97316",
  red: "#ef4444",
  yellow: "#f59e0b",
  teal: "#14b8a6",
  indigo: "#6366f1"
};
function lw() {
  const [e, t] = React.useState(!1);
  return React.useEffect(() => {
    (() => {
      try {
        const r = window.__REACT_DEVTOOLS_CONFIG__, o = r == null ? void 0 : r.theme;
        if (!o)
          return;
        const i = (o == null ? void 0 : o.mode) === "dark" || (o == null ? void 0 : o.mode) === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches;
        t(!!i);
        const l = (o == null ? void 0 : o.primaryColor) || "#00D8FF", s = l.toLowerCase().trim(), p = sw[s] || (l === "react" ? "#00D8FF" : l);
        if (document.documentElement.style.setProperty("--color-primary-500", p), p.startsWith("#")) {
          const d = Number.parseInt(p.slice(1, 3), 16), f = Number.parseInt(p.slice(3, 5), 16), h = Number.parseInt(p.slice(5, 7), 16);
          document.documentElement.style.setProperty("--color-primary-500-rgb", `${d}, ${f}, ${h}`);
        }
      } catch (r) {
      }
    })();
  }, []), [e, t];
}
function cw() {
  const e = React.useRef(null), { panelVisible: t, setPanelVisible: n, togglePanel: r } = iw(), [o, i] = lw(), [a, l] = React.useState(!1), s = React.useCallback((E) => {
    const A = E.mode === "dark";
    i(A);
  }, []), { iframeRef: u } = ow(t, n, l, s), {
    position: p,
    isDragging: d,
    isHidden: f,
    isAtBottom: h,
    rotation: m,
    bringUp: v,
    handleButtonPointerDown: w
  } = aw(t), [g, y] = React.useState({
    width: Math.min(window.innerWidth * 0.8, 1e3),
    height: Math.min(window.innerHeight * 0.6, 800)
  }), k = React.useCallback(() => {
    const E = !t;
    r(), E && v();
  }, [t, r, v]);
  React.useEffect(() => {
    const E = () => {
      k();
    };
    return window.addEventListener("react-devtools:toggle-panel", E), () => {
      window.removeEventListener("react-devtools:toggle-panel", E);
    };
  }, [k]);
  const S = (E) => {
    Vt(!0, { mode: "open-in-editor" }), n(!1);
  }, T = m === 0 ? "bottom" : m === 180 ? "top" : m === 90 ? "left" : "right";
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: e,
      className: `react-devtools-anchor ${t ? "react-devtools-anchor--active" : ""}  ${o ? "dark" : ""}`,
      "data-position": T,
      style: {
        left: `${p.x}px`,
        top: `${p.y}px`,
        transition: d ? "none" : "left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
      },
      onMouseMove: v
    },
    /* @__PURE__ */ React.createElement(
      ew,
      {
        isHidden: f,
        isAtBottom: h,
        isDragging: d,
        panelVisible: t,
        rotation: m,
        onPointerDown: (E) => w(E, k),
        onInspectorClick: S
      }
    ),
    /* @__PURE__ */ React.createElement(
      tw,
      {
        iframeRef: u,
        visible: t,
        width: g.width,
        height: g.height,
        onResize: y,
        enableDragResize: a
      }
    )
  );
}
const uw = "__REACT_DEVTOOLS_PLUGIN_RPC__";
function dw() {
  if (typeof window == "undefined")
    return () => {
    };
  const e = async (n) => {
    const { type: r, plugin: o, method: i, args: a, callId: l } = n.data || {};
    if (r !== "__DEVTOOLS_PLUGIN_RPC_CALL__")
      return;
    const s = window[uw], u = s == null ? void 0 : s[o];
    if (!u) {
      er({
        type: "__DEVTOOLS_PLUGIN_RPC_RESPONSE__",
        plugin: o,
        callId: l,
        error: `Plugin "${o}" not found or not registered`
      });
      return;
    }
    const p = u.methods[i];
    if (!p) {
      er({
        type: "__DEVTOOLS_PLUGIN_RPC_RESPONSE__",
        plugin: o,
        callId: l,
        error: `Method "${i}" not found in plugin "${o}"`
      });
      return;
    }
    try {
      const d = await Promise.resolve(p(...a || []));
      er({
        type: "__DEVTOOLS_PLUGIN_RPC_RESPONSE__",
        plugin: o,
        callId: l,
        result: d
      });
    } catch (d) {
      er({
        type: "__DEVTOOLS_PLUGIN_RPC_RESPONSE__",
        plugin: o,
        callId: l,
        error: d instanceof Error ? d.message : String(d)
      });
    }
  }, t = (n) => {
    const { type: r, plugin: o, event: i, data: a } = n.data || {};
    if (r !== "__DEVTOOLS_PLUGIN_EVENT__")
      return;
    const l = document.getElementById("react-devtools-client-iframe");
    l != null && l.contentWindow && l.contentWindow.postMessage({
      type: "__DEVTOOLS_PLUGIN_EVENT__",
      plugin: o,
      event: i,
      data: a
    }, "*");
  };
  return window.addEventListener("message", e), window.addEventListener("message", t), () => {
    window.removeEventListener("message", e), window.removeEventListener("message", t);
  };
}
function er(e) {
  const t = document.getElementById("react-devtools-client-iframe");
  t != null && t.contentWindow && t.contentWindow.postMessage(e, "*");
}
function pw() {
  return typeof window != "undefined" ? window.React : void 0;
}
function Vr() {
  return typeof window != "undefined" ? window.ReactDOM : void 0;
}
function fw() {
  const e = pw(), t = (e == null ? void 0 : e.version) || "0";
  return Number(t.split(".")[0]) >= 18;
}
function hw() {
  const e = Vr();
  return typeof (e == null ? void 0 : e.createRoot) == "function";
}
function mw() {
  const e = Vr();
  return typeof (e == null ? void 0 : e.render) == "function";
}
function gw(e, t) {
  const r = Vr().createRoot(t);
  return r.render(e), {
    unmount: () => r.unmount(),
    type: "createRoot",
    container: t
  };
}
function vw(e, t) {
  const n = Vr();
  return n.render(e, t), {
    unmount: () => {
      typeof n.unmountComponentAtNode == "function" && n.unmountComponentAtNode(t);
    },
    type: "legacy",
    container: t
  };
}
function ww(e, t) {
  if (fw() && hw())
    try {
      return gw(e, t);
    } catch (n) {
      console.warn("[React DevTools] createRoot failed, falling back to legacy render:", n);
    }
  if (mw())
    try {
      return vw(e, t);
    } catch (n) {
      console.warn("[React DevTools] legacy render failed:", n);
    }
  return console.warn("[React DevTools] No suitable React render method found"), null;
}
function yw(e) {
  if (e)
    try {
      e.unmount();
    } catch (t) {
    }
}
function bw() {
  return typeof window != "undefined" ? window.React : void 0;
}
let Ir = null, pr = null, Es = !1;
const xw = !1;
function _w() {
  return xw;
}
function Ns() {
  if (!Es)
    try {
      xd(_w), Es = !0;
    } catch (e) {
      console.warn("[React DevTools] Failed to install component tree hook:", e);
    }
}
async function kw() {
  try {
    await ko.register(nu({
      autoStart: !0
    }));
  } catch (e) {
    console.warn("[React DevTools] Failed to register React Scan plugin:", e);
  }
}
function Cw() {
  window.addEventListener("message", (e) => {
    var t;
    ((t = e.data) == null ? void 0 : t.type) === "__REACT_DEVTOOLS_INSTALL_COMPONENT_TREE_HOOK__" && Ns(), e.data === "__REACT_DEVTOOLS_INSTALL_COMPONENT_TREE_HOOK__" && Ns();
  });
}
function Sw() {
  const e = document.createElement("div");
  return e.id = "react-devtools-overlay", document.body.appendChild(e), e;
}
function Tw() {
  const e = window.__REACT_DEVTOOLS_CONFIG__, t = (e == null ? void 0 : e.microFrontend) || "auto", n = document.getElementById("react-devtools-overlay"), r = window.__REACT_DEVTOOLS_PLUS_INITIALIZED__, o = n || r;
  switch (t) {
    case "host":
      return !n;
    case "child":
      return o ? (console.debug("[React DevTools] Skipping initialization (child mode, DevTools already exists)"), !1) : !0;
    case "standalone":
      return !n;
    default:
      return !o;
  }
}
async function Rs() {
  try {
    if (!Tw())
      return;
    window.__REACT_DEVTOOLS_PLUS_INITIALIZED__ = !0, await kw(), pr = dw(), Cw();
    const e = Sw(), t = bw();
    if (!t) {
      console.warn("[React DevTools] React not found on window");
      return;
    }
    const n = t.createElement(t.StrictMode, null, t.createElement(cw));
    Ir = ww(n, e), Ir || console.warn("[React DevTools] Failed to mount overlay");
  } catch (e) {
    console.warn("[React DevTools] Overlay init error:", e);
  }
}
function ru(e) {
  try {
    if (e.defaultPrevented)
      return;
    const t = e.key.toLowerCase(), n = document.getElementById("react-devtools-overlay");
    e.altKey && e.shiftKey && (t === "d" || e.code === "KeyD" || e.keyCode === 68) && (e.preventDefault(), window.dispatchEvent(new CustomEvent("react-devtools:toggle-panel"))), e.altKey && e.shiftKey && (t === "r" || e.code === "KeyR" || e.keyCode === 82) && (e.preventDefault(), n && (n.style.display = n.style.display === "none" ? "block" : "none"));
  } catch (t) {
  }
}
function Ew() {
  try {
    window.removeEventListener("keydown", ru), pr && (pr(), pr = null), yw(Ir), Ir = null;
    const e = document.getElementById("react-devtools-overlay");
    e && e.remove(), delete window.__REACT_DEVTOOLS_PLUS_INITIALIZED__;
  } catch (e) {
  }
}
function Nw() {
  try {
    const t = new Function('return typeof import.meta !== "undefined" ? import.meta : undefined')();
    t != null && t.hot && t.hot.dispose(Ew);
  } catch (e) {
  }
}
try {
  window.addEventListener("keydown", ru), document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => setTimeout(Rs, 0), { once: !0 }) : setTimeout(Rs, 0), Nw();
} catch (e) {
  console.warn("[React DevTools] Failed to setup overlay:", e);
}
