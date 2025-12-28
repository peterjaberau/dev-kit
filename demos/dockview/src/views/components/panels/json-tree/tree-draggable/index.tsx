import JsonTreeDraggable from "#json-tree/demos/tree-draggable"
import React from "react"
import { data } from "#datasets/metadata"
import { data as openapiData } from "#datasets/oas-openapi-specifications"

// test data
const testData = [
  {
    id: '1',
    isOpen: true,
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      summary: 'A sample user profile',
      weight: 70,
      height: 175,

    },

    children: [
      {
        id: '1.1',
        isOpen: true,

        children: [
          {
            id: '1.1.1',
          },
          {
            id: '1.1.2',
            isDraft: true,
          },
        ],
      },
      { id: '1.2', children: [] },
    ],
  },
  {
    id: '2',
    isOpen: true,
    children: [
      {
        id: '2.1',
        isOpen: true,

        children: [
          {
            id: '2.1.1',
            children: [],
          },
          {
            id: '2.1.2',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    isOpen: true,
    children: [
      {
        id: '3.1',
        isOpen: true,

        children: [
          {
            id: '3.1.1',
            children: [],
          },
          {
            id: '3.1.2',
            children: [],
          },
          {
            id: '3.1.3',
            children: [],
          },
          {
            id: '3.1.4',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    isOpen: true,
    children: [
      {
        id: '4.1',
        isOpen: true,

        children: [
          {
            id: '4.1.1',
            children: [],
          },
          {
            id: '4.1.2',
            children: [],
          },
        ],
      },
    ],
  },
]

const Index = (props: any) => {
  return (
    <JsonTreeDraggable
      data={{
        testData: testData,
        // openapi: openapiData["non-standard-components"],
        // meta: data,
      }}
    />
  )
}
export default Index
