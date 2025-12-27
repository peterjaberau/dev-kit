import React, { type ReactElement } from 'react';

import type { Instruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';

import { Border } from './border';
import { Box as Line } from "./box"

export type TreeItemProps = {
  instruction: Instruction
}

function getElement({
                      instruction,
                      isBlocked,
                    }: {
  instruction: Exclude<Instruction, { type: 'instruction-blocked' }>;
  isBlocked: boolean;
}): ReactElement | null {
  const indent = `${instruction.currentLevel * instruction.indentPerLevel}px`;
  const appearance = isBlocked ? 'warning' : 'default';

  if (instruction.type === 'reorder-above') {
    return <Line edge="top" status={appearance} indent={indent} />;
  }
  if (instruction.type === 'reorder-below') {
    return <Line edge="bottom" status={appearance} indent={indent} />;
  }

  if (instruction.type === 'make-child') {
    return <Border status={appearance} indent={indent} />;
  }

  if (instruction.type === 'reparent') {
    const reparentIndent = `${instruction.desiredLevel * instruction.indentPerLevel}px`;
    return <Line edge="bottom" status={appearance} indent={reparentIndent} />;
  }

  return null;
}

export function TreeItem({ instruction }: TreeItemProps) {
  if (instruction.type === 'instruction-blocked') {
    return getElement({ instruction: instruction.desired, isBlocked: true });
  }
  return getElement({ instruction, isBlocked: false });
}
