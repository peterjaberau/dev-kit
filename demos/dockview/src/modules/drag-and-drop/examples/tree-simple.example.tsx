'use client'
import DraggableTree from '..'
import { dataTree } from './data'

export const TreeSimpleExample = () => {
  return <DraggableTree data={dataTree} />
}