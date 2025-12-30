const filterKey = Symbol("filter")
const projectKey = Symbol("project")
const topLevelItemKey = Symbol("top-level")

// const topLevelItems = ["for-you", "recent", "starred", "projects", "filters"] as const
const topLevelItems = ["for-you", "filters"] as const

// get business data
export function getFilterData(filter: any) {
  return {
    id: filter.id,
    [filterKey]: true,
  }
}

export function getProjectData({ project, groupName }: any) {
  return {
    id: project.id,
    groupName,
    [projectKey]: true,
  }
}

// get for ui
const getId = (() => {
  let count: number = 0
  return function getId(): string {
    return `id:${count++}`
  }
})()

export function getInitialData(): any {
  return {
    lastAction: null,
    topLevelItems: Array.from(topLevelItems),
    // projects: {
    //   starred: [
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Modernize typography",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "F1 sponsorship",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Mobile application",
    //     },
    //   ],
    //   recent: [
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Attachments",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Audit",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Dark mode",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Visualization",
    //     },
    //     {
    //       id: getId(),
    //       href: "#",
    //       name: "Basketball tournament",
    //     },
    //   ],
    // },
    filters: [
      {
        id: getId(),
        name: "Filter 1",
        href: "#",
        children: [
          {
            id: getId(),
            name: "Filter 1.1",
            href: "#",
            children: [],
          },
          {
            id: getId(),
            name: "Filter 1.2",
            href: "#",
            children: [],
          },
          {
            id: getId(),
            name: "Filter 1.3",
            href: "#",
            children: [],
          },
        ],
      },
      {
        id: getId(),
        name: "Filter 2",
        href: "#",
        children: [
          {
            id: getId(),
            name: "Filter 2.1",
            href: "#",
            children: [
              {
                id: getId(),
                name: "Filter 2.1.1",
                href: "#",
                children: [],
              },
              {
                id: getId(),
                name: "Filter 2.1.2",
                href: "#",
                children: [],
              },
              {
                id: getId(),
                name: "Filter 2.1.3",
                href: "#",
                children: [],
              },
            ],
          },
          {
            id: getId(),
            name: "Filter 2.2",
            href: "#",
            children: [],
          },
        ],
      },
      {
        id: getId(),
        name: "Filter 3",
        href: "#",
        children: [],
      },
      {
        id: getId(),
        name: "Filter 4",
        href: "#",
        children: [],
      },
    ],
  }
}

export function getTopLevelItemData(value: any) {
  return {
    value,
    [topLevelItemKey]: true,
  }
}

// is
export function isTopLevelItemData(data: Record<string | symbol, unknown>) {
  return data[topLevelItemKey] === true
}

export function isFilterData(data: Record<string | symbol, unknown>): any {
  return data[filterKey] === true
}

export function isProjectData(data: Record<string | symbol, unknown>): any {
  return data[projectKey] === true
}
