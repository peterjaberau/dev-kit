export const dataTree = [
  {
    id: "1",
    isOpen: true,
    profile: {
      firstName: "John",
      lastName: "Doe",
      dob: "1990-01-01",
      summary: "A sample user profile",
      weight: 70,
      height: 175,
    },

    children: [
      {
        id: "1.1",
        isOpen: true,

        children: [
          {
            id: "1.1.1",
            isOpen: true,
            children: [],
          },
          {
            id: "1.1.2",
            isDraft: true,
            children: [],
          },
        ],
      },
      { id: "1.2", children: [] },
    ],
  },
  {
    id: "2",
    isOpen: true,
    children: [
      {
        id: "2.1",
        isOpen: true,

        children: [
          {
            id: "2.1.1",
            children: [],
          },
          {
            id: "2.1.2",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    isOpen: true,
    children: [
      {
        id: "3.1",
        isOpen: true,

        children: [
          {
            id: "3.1",
            children: [],
          },
          {
            id: "3.1.2",
            children: [],
          },
          {
            id: "3.1.3",
            children: [],
          },
          {
            id: "3.1.4",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    isOpen: true,
    children: [
      {
        id: "4.1",
        isOpen: true,

        children: [
          {
            id: "4.1.1",
          },
          {
            id: "4.1.2",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    isOpen: true,
    children: [
      {
        id: "5.1",
        isOpen: true,
      },
      {
        id: "5.2",
        isOpen: true,
      },
    ],
  },
]


export const dataTreeMachineGraph = [
  {
    type: "node",
    id: "sessionTimeout.active",
    parentId: "sessionTimeout",
    label: "active",
    data: {
      key: "active",
      type: "atomic",
      entry: [],
      exit: [],
      invocations: [],
      initialId: null,
    },
  },
  {
    type: "node",
    id: "sessionTimeout.warning",
    parentId: "sessionTimeout",
    label: "warning",
    data: {
      key: "warning",
      type: "atomic",
      entry: [],
      exit: [],
      invocations: [],
      initialId: null,
    },
  },
  {
    type: "node",
    id: "sessionTimeout.signedOut",
    parentId: "sessionTimeout",
    label: "signedOut",
    data: {
      key: "signedOut",
      type: "final",
      entry: [],
      exit: [],
      invocations: [],
      initialId: null,
    },
  },
]