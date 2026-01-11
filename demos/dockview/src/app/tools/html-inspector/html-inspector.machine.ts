import { assign, enqueueActions, fromPromise, setup } from "xstate"

/* ───────────────────────── TYPES ───────────────────────── */

export type DomPathItem = {
  tag: string
  attributes: Record<string, string>
}

export type DomTreeNode = {
  tag: string
  attributes: Record<string, string>
  text: string
  children: DomTreeNode[]
  path: DomPathItem[]
}

export type DomTreeStats = {
  tagCounts: Record<string, number>
  totalElements: number
  maxDepth: number
}

export type DomTreeResult = {
  tree: DomTreeNode
  stats: DomTreeStats
}

/* ───────────────────────── MACHINE ───────────────────────── */

export const htmlInspectorMachine = setup({
  /* ───────────── ACTIONS ───────────── */

  actions: {
    setHtmlSource: assign(({ event }) => ({
      htmlSource: event.html,
    })),

    /* ===== Persist parsed fragment =====
       Input: DocumentFragment
       Output: context.htmlFragment
       Example:
       {
         htmlFragment: DocumentFragment(<div><span/></div>)
       }
    */
    persistHtmlFragment: assign(({ context, event }) => {
      context.htmlFragment = event.output
    }),

    /* ===== Extract top-level elements =====
       Input fragment:
         <div></div><section></section>
       Output:
       [
         HTMLDivElement,
         HTMLElement(section)
       ]
    */
    extractTopLevelElements: assign(({ context }) => ({
      topLevelElements: Array.from(context.htmlFragment.children),
    })),

    /* ===== Seed queue with root elements =====
       Queue item shape:
       {
         element: Element,
         parentNode: DomTreeNode | null,
         depth: number
       }
    */
    receiveSource: assign(({ context }) => ({
      queue: context.topLevelElements.map((el: Element) => ({
        element: el,
        parentNode: null,
        depth: 0,
      })),
    })),

    /* ===== Pull next item from queue =====
       Before:
       queue: [A, B, C]
       stack: []
       After:
       queue: [B, C]
       stack: [A]
    */
    initIteration: assign(({ context }) => {
      if (context.queue.length === 0) return {}

      const [next, ...rest] = context.queue

      return {
        queue: rest,
        transform: {
          ...context.transform,
          stack: [...context.transform.stack, next],
          current: next,
        },
      }
    }),

    /* ===== Select current node ===== */
    nodeEnterAction: assign(({ context }) => ({
      transform: {
        ...context.transform,
        current: context.transform.stack.at(-1) ?? null,
      },
    })),

    /* ===== CORE PARSING LOGIC =====
       Converts DOM Element → DomTreeNode
       Updates analytics
       Attaches node to parent or root
    */
    nodeLogicAction: assign(({ context }) => {
      const current = context.transform.current
      if (!current) return {}

      const { element, parentNode, depth }: any = current

      /* extract attributes */
      const attributes: Record<string, string> = {}
      for (const attr of Array.from(element.attributes) as any) {
        attributes[attr.name] = attr.value
      }

      /* extract text nodes */
      let text = ""
      for (const node of Array.from(element.childNodes) as any) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          text += node.textContent.trim().slice(0, 50)
        }
      }

      /* build tree node */
      const treeNode: DomTreeNode = {
        tag: element.tagName.toLowerCase(),
        attributes,
        text,
        children: [],
        path: parentNode
          ? [...parentNode.path, { tag: element.tagName.toLowerCase(), attributes }]
          : [{ tag: element.tagName.toLowerCase(), attributes }],
      }

      /* attach node */
      if (parentNode) {
        parentNode.children.push(treeNode)
      } else {
        context.htmlToDomTree.tree.children.push(treeNode)
      }

      /* analytics */
      context.analytics.totalElements++
      context.analytics.maxDepth = Math.max(context.analytics.maxDepth, depth)
      context.analytics.tagCounts[treeNode.tag] = (context.analytics.tagCounts[treeNode.tag] || 0) + 1

      /*
        Example analytics after parsing <div><span/></div>:
        {
          totalElements: 2,
          maxDepth: 1,
          tagCounts: { div: 1, span: 1 }
        }
      */

      return {
        transform: {
          ...context.transform,
          completed: { element, node: treeNode, depth },
        },
      }
    }),

    /* ===== Enqueue children after node completion =====
       DOM:
         <div><span/><a/></div>
       Enqueued:
         span @ depth+1
         a    @ depth+1
    */
    nodeCompleteAction: assign(({ context }) => {
      const completed = context.transform.completed
      if (!completed) return {}

      const { element, node, depth } = completed

      const children = Array.from(element.children).map((child: any) => ({
        element: child,
        parentNode: node,
        depth: depth + 1,
      }))

      return {
        queue: [...context.queue, ...children],
        transform: {
          ...context.transform,
          completed: null,
        },
      }
    }),

    /* ===== Pop stack ===== */
    advanceIteration: assign(({ context }) => {
      const stack = [...context.transform.stack]
      stack.pop()

      return {
        transform: {
          ...context.transform,
          stack,
          current: null,
        },
      }
    }),
  },

  /* ───────────── ACTORS ───────────── */

  actors: {
    /* ===== HTML → DocumentFragment =====
       Input HTML:
         "<div><span>Hello</span></div>"
       Output fragment children:
         [HTMLDivElement]
    */
    parseHtmlToFragment: fromPromise(async ({ input }: any) => {
      const template = document.createElement("template")
      template.innerHTML = input.source.trim()
      return template.content
    }),
  },

  /* ───────────── GUARDS ───────────── */

  guards: {
    hasWork: ({ context }) => context.queue.length > 0 || context.transform.stack.length > 0,
  },
}).createMachine({
  id: "inspector",
  initial: "idle",

  /* ───────────── CONTEXT ───────────── */

  context: ({ input }: any) => {
    return {
      htmlSource: input?.html ?? "",

      htmlFragment: null,
      topLevelElements: null,

      queue: [],

      transform: {
        stack: [],
        current: null,
        completed: null,
      },

      analytics: {
        totalElements: 0,
        maxDepth: 0,
        tagCounts: {},
      },

      htmlToDomTree: {
        tree: {
          tag: "root",
          attributes: {},
          text: "",
          children: [],
          path: [],
        },
        stats: {
          totalElements: 0,
          maxDepth: 0,
          tagCounts: {},
        },
      },
    }
  },

  /* ───────────── STATES ───────────── */

  states: {
    idle: {
      on: {
        // TRANSFORM: {
        //   actions: "setHtmlSource",
        //   target: "parsing",
        // },
        START: {
          target: "parsing",
          actions: "setHtmlSource",
        },
        TRANSFORM: "queueing",
      },
    },

    /* ===== Parse HTML snippet ===== */
    parsing: {
      invoke: {
        src: "parseHtmlToFragment",
        input: ({ context }) => {
          return {
            source: context.htmlSource,
          }
        },
        onDone: {
          target: "idle",
          actions: "persistHtmlFragment",
        },
      },
    },

    /* ===== Prepare traversal ===== */
    queueing: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("extractTopLevelElements")
        enqueue("receiveSource")
      }),
      always: "tree",
    },

    /* ===== Tree traversal ===== */
    tree: {
      initial: "prepare",

      states: {
        prepare: {
          entry: "initIteration",
          always: [{ guard: "hasWork", target: "node" }, { target: "complete" }],
        },

        node: {
          initial: "enter",
          states: {
            enter: {
              entry: "nodeEnterAction",
              always: "process",
            },
            process: {
              entry: "nodeLogicAction",
              always: "complete",
            },
            complete: {
              exit: "nodeCompleteAction",
              always: "#inspector.tree.collect",
            },
          },
        },

        collect: {
          exit: "advanceIteration",
          always: "prepare",
        },

        complete: {
          type: "final",
        },
      },

      onDone: "ready",
    },

    /* ===== Final state ===== */
    ready: {
      type: "final",
    },
  },
})