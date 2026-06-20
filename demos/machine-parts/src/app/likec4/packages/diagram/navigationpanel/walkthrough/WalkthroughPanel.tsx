import { RichText } from '#likec4/core'
import { chakra } from "@chakra-ui/react"
import {
  ScrollAreaAutosize,
} from '@mantine/core'
import { AnimatePresence, m } from 'motion/react'
import { memo } from 'react'
import { isNonNull, isTruthy } from 'remeda'
import { Markdown } from '../../base-primitives'
import type { DiagramContext } from '../../hooks/useDiagram'
import { useDiagramContext } from '../../hooks/useDiagram'

const SectionHeader = chakra('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dimmed',
    fontWeight: 'medium',
    userSelect: 'none',
    mb: 'xxs',
  },
})

const MotionDiv = chakra(m.div) as any

function selectWalkthroughNotes(s: DiagramContext) {
  const isActive = isNonNull(s.activeWalkthrough)
  const activeStepIndex = isActive ? s.xyedges.findIndex(e => e.id === s.activeWalkthrough?.stepId) : -1
  return {
    isActive,
    isParallel: isActive && isTruthy(s.activeWalkthrough?.parallelPrefix),
    hasNext: isActive && activeStepIndex < s.xyedges.length - 1,
    hasPrevious: isActive && activeStepIndex > 0,
    notes: isActive ? s.xyedges[activeStepIndex]?.data?.notes ?? null : null,
  }
}

export const WalkthroughPanel = memo(() => {
  const { isActive, notes: _notes } = useDiagramContext(selectWalkthroughNotes)

  const notes = _notes ? RichText.from(_notes) : RichText.EMPTY

  return (
    <AnimatePresence>
      {isActive && !notes.isEmpty && (
        <MotionDiv
          layout="position"
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            position: 'relative',
            layerStyle: 'likec4.dropdown',
            gap: 'sm',
            padding: 'md',
            paddingTop: 'xxs',
            pointerEvents: 'all',
            maxWidth: 300,
            height: 'max-content',
            maxHeight: 'calc(100cqh - 100px)',
            width: 'max-content',
            cursor: 'default',
            overflow: 'hidden',
            '@/sm': {
              minWidth: 400,
              maxWidth: 550,
            },
            '@/lg': {
              maxWidth: 700,
            },
          }}
          initial={{
            opacity: 0,
            translateX: -20,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
          }}
          exit={{
            opacity: 0,
            translateX: -20,
          }}
        >
          <ScrollAreaAutosize type="scroll" overscrollBehavior="contain">
            <SectionHeader>Notes</SectionHeader>
            <Markdown
              value={notes}
              fontSize="sm"
              emptyText="No description"
            />
          </ScrollAreaAutosize>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
})
