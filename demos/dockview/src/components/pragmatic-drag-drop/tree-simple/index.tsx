
import type { CSSProperties } from 'react';
import { chakra } from '@chakra-ui/react';

import type { Instruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';

// import { DropIndicator } from '../tree/components/dnd-drop-indicator';
import { DropIndicator } from '../drop-indicator/tree-item';

import Layout from './layout';

const instructions: Instruction[] = [
  {
    type: 'reorder-above',
    currentLevel: 2,
    indentPerLevel: 20,
  },
  {
    type: 'reorder-below',
    currentLevel: 2,
    indentPerLevel: 20,
  },
  {
    type: 'make-child',
    currentLevel: 2,
    indentPerLevel: 20,
  },
  {
    type: 'reparent',
    currentLevel: 2,
    indentPerLevel: 20,
    desiredLevel: 1,
  },
  {
    type: 'reparent',
    currentLevel: 2,
    indentPerLevel: 20,
    desiredLevel: 0,
  },
];

const blocked = instructions.map((instruction) => {
  if (instruction.type === 'instruction-blocked') {
    return instruction;
  }
  const updated: Instruction = {
    type: 'instruction-blocked',
    desired: instruction,
  };
  return updated;
});

const all: Instruction[] = [...instructions, ...blocked];


function getLabel(instruction: Instruction): string {
  if (instruction.type === 'instruction-blocked') {
    return `[Blocked] ${getLabel(instruction.desired)}`;
  }
  if (instruction.type === 'reparent') {
    return `reparent (lvl${instruction.currentLevel} → lvl${instruction.desiredLevel})`;
  }
  return instruction.type;
}

function TreeItem({
                    instruction,
                    indentPerLevel,
                    currentLevel,
                  }: {
  instruction: Instruction;
  indentPerLevel: number;
  currentLevel: number;
}) {
  return (
    <chakra.div
      css={{
        display: 'flex',
        minWidth: 120,
        padding: 8,
        alignItems: 'center',
        gap: 4,
        borderRadius: 3,
        position: 'relative',
        paddingLeft: 'calc(var(--horizontal-indent) + 1ch)',
        backgroundColor: '#F8F8F8',
      }}
      style={
        {
          '--horizontal-indent': `${indentPerLevel * currentLevel}px`,
        } as CSSProperties
      }
    >
      <span>Instruction: </span>
      {/* eslint-disable-next-line @atlaskit/design-system/no-html-code */}
      <code>
        <small>{getLabel(instruction)}</small>
      </code>
      <DropIndicator instruction={instruction} />
    </chakra.div>
  );
}

export default function Index() {
  return (
    <Layout testId="layout--appearance">
      <chakra.div css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {all.map((instruction, index) => (
          <TreeItem instruction={instruction} key={index} currentLevel={2} indentPerLevel={20}/>
        ))}
      </chakra.div>
    </Layout>
  );
}
