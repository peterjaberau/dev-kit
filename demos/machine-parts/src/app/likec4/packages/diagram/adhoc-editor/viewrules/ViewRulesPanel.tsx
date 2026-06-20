import { type ModelExpression, FqnRef, ModelFqnExpr } from '#likec4/core'

import { chakra, Box } from '@chakra-ui/react'
import { ActionIcon } from '@mantine/core'
import { IconCirclePlus, IconTrash } from '@tabler/icons-react'
import { AnimatePresence, LayoutGroup, m } from 'motion/react'
import { useLikeC4Model } from '../../hooks/useLikeC4Model'
import type { AdhocRule } from '../state/actor.types'

const MotionDiv = chakra(m.div) as any

export function ViewRulesPanel({
  rules,
  onToggle,
  onDelete,
}: {
  rules: AdhocRule[]
  onToggle: (rule: AdhocRule) => void
  onDelete: (rule: AdhocRule) => void
}) {
  return (
    <Box p="1">
      <chakra.h4 mt="0" fontSize="md" fontWeight="normal">
        View Rules
      </chakra.h4>
      <AnimatePresence mode="popLayout" propagate>
        <LayoutGroup>
          <MotionDiv layout layoutRoot css={{ display: 'flex', flexDirection: 'column', gap: '1' }}>
            {rules.map((rule) => (
              <MotionDiv
                layout="position"
                key={rule.id}
                onClick={() => {
                  return onToggle(rule)
                }}
                initial={{
                  opacity: 0,
                  y: -50,
                }}
                animate={{
                  opacity: rule.enabled ? 1 : 0.5,
                  scale: rule.enabled ? 1 : 0.98,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -50,
                }}
                css={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  p: '1',
                  px: '2',
                  flexWrap: 'nowrap',
                  rounded: 'sm',
                  colorPalette: 'teal',
                  gap: '2',
                  border: 'default',
                }}
              >
                <ViewRule key={rule.id} rule={rule} onToggle={() => onToggle(rule)} onDelete={() => onDelete(rule)} />
              </MotionDiv>
            ))}
          </MotionDiv>
        </LayoutGroup>
      </AnimatePresence>
    </Box>
  )
}

function ViewRule(
  { rule, onToggle, onDelete }: {
    rule: AdhocRule
    onToggle: () => void
    onDelete: () => void
  },
) {
  const isInclude = rule.type === 'include'
  // const exprs = rule.include ?? rule.exclude

  return (
    <>
      <PredicatIcon>
        <IconCirclePlus size={14} />
      </PredicatIcon>
      <MotionDiv
        layout
        animate={{
          originX: 0,
          scale: rule.enabled ? 1 : 0.9,
        }}
        css={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
        {JSON.stringify(rule.expr)}
      </MotionDiv>
      <ActionIcon
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        variant="subtle"
        color="red">
        <IconTrash />
      </ActionIcon>
    </>
  )
}

function renderExpression(expr: ModelExpression) {
  if (ModelFqnExpr.isModelRef(expr)) {
    return <ExpressionRef expr={expr} />
  }
  return null
}

// function renderPredicate(predicate)
function useElementByFqnRef(ref: FqnRef.ModelRef<any>) {
  const fqn = FqnRef.flatten(ref)
  return useLikeC4Model().findElement(fqn)?.$element ?? null
}

function ExpressionRef({ expr }: { expr: ModelFqnExpr.Ref<any> }) {
  const el = useElementByFqnRef(expr.ref)

  if (!el) {
    return <div>{FqnRef.flatten(expr.ref)}</div>
  }

  return <chakra.div fontSize="xs">{el.title}</chakra.div>
}

const PredicatIcon = chakra("div", {
  base: {
    display: "contents",
    color: "colorPalette.9",
  },
})
