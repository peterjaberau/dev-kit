"use client"
import {
  Button,
  DropIndicator,
  GridList,
  GridListItem,
  isTextDropItem,
  Text,
  useDragAndDrop,
  ListData,
  useListData,
} from "react-aria-components"
import React from "react"

const tickets = [
  {
    title: "UI Button Alignment Issue",
    description: "Buttons in the Settings menu are misaligned on smaller screens.",
    id: "#101",
    assignee: "Gilberto Miguel",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-15",
    status: "Open",
  },
  {
    title: "Login Page Redesign",
    description: "Requesting a redesign of the login page to improve user experience.",
    id: "#102",
    assignee: "Maia Pettegree",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-16",
    status: "Open",
  },
  {
    title: "Database Connection Error",
    description: "Users are experiencing intermittent connection errors when accessing the database.",
    id: "#103",
    assignee: "Mike Johnson",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-17",
    status: "In Progress",
  },
  {
    title: "Feature: Dark Mode",
    description: "Implement a dark mode option for improved accessibility and user preference.",
    id: "#104",
    assignee: "Sarah Lee",
    avatar:
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-18",
    status: "Open",
  },
  {
    title: "Missing User Profile Pictures",
    description: "Some user profile pictures are not displaying properly in the user dashboard.",
    id: "#105",
    assignee: "David Chen",
    avatar:
      "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-19",
    status: "Open",
  },
  {
    title: "Performance Optimization",
    description: "Requesting performance optimization for the application to reduce load times.",
    id: "#106",
    assignee: "Sarah Lee",
    avatar:
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-20",
    status: "Closed",
  },
  {
    title: "Broken Link on Homepage",
    description: 'The "Learn More" link on the homepage is leading to a 404 error.',
    id: "#107",
    assignee: "Alex Turner",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-21",
    status: "Open",
  },
  {
    title: "Feature: Export to PDF",
    description: "Implement a feature to allow users to export their data to PDF format.",
    id: "#108",
    assignee: "Maia Pettegree",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-22",
    status: "Open",
  },
  {
    title: "Mobile Responsiveness Issue",
    description: "The application is not rendering properly on certain mobile devices.",
    id: "#109",
    assignee: "Kevin Williams",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    date: "2023-09-23",
    status: "Open",
  },
  {
    title: "Feature: Two-Factor Authentication",
    description: "Requesting the addition of two-factor authentication for improved security.",
    id: "#110",
    assignee: "Maia Pettegree",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "2023-09-24",
    status: "In Progress",
  },
]

interface ColumnProps {
  list: ListData<(typeof tickets)[0]>
  status: string
  itemClassName?: string
}

function Column({ list, status, itemClassName }: ColumnProps) {
  let items = list.items.filter((t) => t.status === status)

  let { dragAndDropHooks } = useDragAndDrop({
    // Provide drag data in a custom format as well as plain text.
    getItems(keys, items: typeof tickets) {
      return items.map((item) => ({
        "issue-id": item.id,
        "text/plain": item.title,
      }))
    },

    renderDropIndicator(target) {
      return (
        <DropIndicator target={target} className="drop-target:visible invisible -mx-2 -my-1.5 h-0 -translate-y-[5px]">
          <svg height={10} className="block w-full fill-none stroke-blue-500 forced-colors:stroke-[Highlight]">
            <circle cx={5} cy={5} r={5 - 1} strokeWidth={2} />
            <line x1={20} x2="100%" transform="translate(-10 0)" y1={5} y2={5} strokeWidth={2} />
            <circle cx="100%" cy={5} r={5 - 1} transform="translate(-5 0)" strokeWidth={2} />
          </svg>
        </DropIndicator>
      )
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ["issue-id"],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => "move",

    // Handle drops between items from other lists.
    async onInsert(e) {
      let ids = await Promise.all(e.items.filter(isTextDropItem).map((item) => item.getText("issue-id")))
      for (let id of ids) {
        list.update(id, { ...list.getItem(id)!, status })
      }
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, ids)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, ids)
      }
    },

    // Handle drops on the collection when empty.
    async onRootDrop(e) {
      let ids = await Promise.all(e.items.filter(isTextDropItem).map((item) => item.getText("issue-id")))
      for (let id of ids) {
        list.update(id, { ...list.getItem(id)!, status })
      }
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === "before") {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === "after") {
        list.moveAfter(e.target.key, e.keys)
      }
    },
  })

  return (
    <section className="flex snap-center flex-col gap-2">
      <header>
        <h3 className="my-0 font-semibold text-zinc-800 dark:text-zinc-200">{status}</h3>
        <span className="text-sm text-zinc-700 dark:text-zinc-400">
          {items.length} {items.length === 1 ? "task" : "tasks"}
        </span>
      </header>
      <GridList
        items={items}
        aria-label={status}
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}
        renderEmptyState={() => "No tasks."}
        className="drop-target:bg-blue-200 dark:drop-target:bg-blue-800/60 drop-target:outline-2 relative flex h-[320px] flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl border border-black/10 bg-white/70 bg-clip-padding p-2 text-gray-700 shadow-xl outline outline-0 -outline-offset-2 outline-blue-500 backdrop-blur-sm empty:items-center empty:justify-center md:p-4 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-400 forced-colors:outline-[Highlight]"
      >
        {(item) => <Card item={item} className={itemClassName} />}
      </GridList>
    </section>
  )
}

interface CardProps {
  id?: string
  item: (typeof tickets)[0]
  className?: string
}

function Card({ id, item, className }: CardProps) {
  return (
    <GridListItem
      id={id}
      value={item}
      textValue={item.title}
      className={`forced-colors:border-[ButtonBorder]! selected:shadow-md dragging:opacity-50 forced-colors:text-[ButtonText]! forced-colors:selected:bg-[Highlight]! forced-colors:selected:text-[HighlightText]! group grid cursor-default select-none grid-cols-[1fr_auto] gap-1 rounded-lg border border-solid border-black/10 bg-white/80 bg-clip-padding p-2 text-slate-700 outline outline-0 outline-offset-2 outline-blue-500 transition forced-color-adjust-none hover:border-black/20 hover:shadow-md focus-visible:outline-2 dark:border-white/10 dark:bg-zinc-900/70 dark:text-slate-200 dark:hover:border-white/20 forced-colors:outline-[Highlight] ${className}`}
    >
      <span className="truncate font-bold">{item.title}</span>
      <span className="justify-self-end text-sm">{item.id}</span>
      <Text
        slot="description"
        className="forced-colors:text-inherit! col-span-2 line-clamp-2 text-sm text-slate-500 dark:text-zinc-300"
      >
        {item.description}
      </Text>
      <span className="flex items-center gap-1">
        <img src={item.avatar} alt="" className="h-4 w-4 rounded-full" />
        <span className="text-sm">{item.assignee}</span>
      </span>
      <Button
        slot="drag"
        className="rounded-xs forced-colors:group-selected:text-[HighlightText] forced-colors:group-selected:outline-[HighlightText] sr-only aspect-square w-fit justify-self-end border-none bg-transparent p-0 text-base leading-none text-gray-500 outline outline-0 outline-blue-500 focus:not-sr-only focus-visible:outline-2 group-focus-visible:not-sr-only dark:text-zinc-300 forced-colors:outline-[Highlight]"
      >
        ≡
      </Button>
    </GridListItem>
  )
}

export default function Page() {
  let list = useListData({
    initialItems: tickets,
  })

  return (
    <div className="no-scrollbar relative -mx-8 box-border grid w-full snap-x snap-mandatory grid-cols-[repeat(3,minmax(280px,1fr))] gap-4 overflow-auto px-8 py-8 md:justify-center">
      <Column
        status="Open"
        list={list}
        itemClassName="selected:bg-green-100 selected:border-green-500 dark:selected:bg-green-900 dark:selected:border-green-700"
      />
      <Column
        status="In Progress"
        list={list}
        itemClassName="selected:bg-blue-100 selected:border-blue-500 dark:selected:bg-blue-900 dark:selected:border-blue-700"
      />
      <Column
        status="Closed"
        list={list}
        itemClassName="selected:bg-red-100 selected:border-red-500 dark:selected:bg-red-900 dark:selected:border-red-700"
      />
    </div>
  )
}
