import type { GraphEdge } from "@statelyai/graph"
import { useSelector } from "@xstate/store-react"
import { RiTimerLine, RiInfinityLine, RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri"
import {
  chakra,
  Button,
  Card,
  Center,
  Container,
  EmptyState,
  Heading,
  Icon,
  Stack,
  Text,
  HStack,
  Flex,
  VStack,
  Code,
} from "@chakra-ui/react"
import { TransitionData, MachineGraph, getRelativeTarget, getEventCategory, useTick } from "../../utils"
import { appStore, getNextSimAllIds, getActiveTimerProgress } from "../../lib/store"
import { useRef } from "react"

interface TransitionVizProps {
  edge: GraphEdge<TransitionData>
  graph: MachineGraph
  sourceId: string
  isFirst?: boolean
}

export function TransitionViz({ edge, graph, sourceId, isFirst }: TransitionVizProps) {
  const { data } = edge
  const mode = useSelector(appStore, (s) => s.context.mode)
  const isSim = mode === "sim"
  const isActive = useSelector(appStore, (s) => s.context.simActiveIds.has(sourceId))
  const targetDisplay = data.isTargetless ? null : getRelativeTarget(sourceId, edge.targetId, graph)

  const prefix = data.guardPrefix
  const eventCategory = getEventCategory(data.eventType)
  const highlightedIdsRef = useRef<string[]>([])

  // Tick to animate progress bar for active after-timers
  useTick(isSim && eventCategory === "after")

  const timerProgress = isSim && eventCategory === "after" ? getActiveTimerProgress(data.eventType) : null

  const simEvent = {
    type: data.eventType,
    ...(data.guard ? { "@xstate.guard": data.guard } : {}),
  }

  return (
    <Flex
      data-testid="transition"
      css={{
        position: "relative",
        flexDirection: "column",
        px: 2.5,
        py: 1.5,
        fontSize: "sm",
        transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "300ms",

        _hover: {
          backgroundColor: "bg.info",
        },

        ...(!isFirst && {
          borderTop: "1px dashed",
          borderTopColor: "colorPalette.600",
        }),

        ...(isSim && {
          _hover: {
            borderTopColor: "colorPalette.200",
            cursor: "pointer",
          },
        }),

        ...(isSim &&
          !isActive && {
            opacity: 40,
          }),
      }}
      onClick={() => {
        if (isSim && data.eventType && eventCategory !== "always") {
          appStore.trigger.simSend({ event: simEvent })
        }
      }}
      onMouseEnter={() => {
        if (isSim) {
          // Highlight what would become active if this event were sent
          const nextIds = [...getNextSimAllIds(simEvent)]
          highlightedIdsRef.current = nextIds
          if (nextIds.length > 0) {
            appStore.trigger.highlight({ ids: nextIds })
          }
        } else if (!data.isTargetless) {
          highlightedIdsRef.current = [edge.targetId]
          appStore.trigger.highlight({ ids: [edge.targetId] })
        }
      }}
      onMouseLeave={() => {
        if (highlightedIdsRef.current.length > 0) {
          appStore.trigger.unhighlight({ ids: highlightedIdsRef.current })
          highlightedIdsRef.current = []
        }
      }}
    >
      {/* Progress bar for active after-timers */}
      {timerProgress !== null && (
        <chakra.div
          data-testid="timer-progress"
          aria-hidden
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            borderRadius: "0.125rem",
            background: `linear-gradient(to right, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.5) ${timerProgress * 100}%, transparent ${timerProgress * 100}%)`,
          }}
        />
      )}

      {data.guard && prefix && (
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "1",
            fontSize: "sm",
          }}
        >
          <chakra.span
            css={{
              color: "fg.muted",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            {prefix}
          </chakra.span>
          <chakra.span
            css={{
              color: "fg",
              fontFamily: "monospace",
            }}
          >
            {data.guard}
          </chakra.span>
        </chakra.div>
      )}

      {data.guard && !prefix && (
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "1",
            fontSize: "sm",
          }}
        >
          <chakra.span
            css={{
              color: "fg",
              fontFamily: "monospace",
            }}
          >
            {data.guard}
          </chakra.span>
        </chakra.div>
      )}

      {!data.guard && prefix === "else" && (
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "1",
            fontSize: "sm",
          }}
        >
          <chakra.span
            css={{
              color: "fg.muted",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            else
          </chakra.span>
        </chakra.div>
      )}

      <chakra.div
        css={{
          display: "flex",
          alignItems: "center",
          gap: "1",
        }}
      >
        {eventCategory === "after" && (
          <Icon size={"xs"} color={"gray.300"}>
            <RiTimerLine />
          </Icon>
        )}
        {eventCategory === "always" && (
          <Icon size={"xs"} color={"gray.300"}>
            <RiInfinityLine />
          </Icon>
        )}
        {eventCategory === "done" && (
          <Icon size={"xs"} color={"gray.300"}>
            <RiCheckboxCircleFill />
          </Icon>
        )}
        {eventCategory === "error" && (
          <Icon size={"xs"} color={"gray.300"}>
            <RiCloseCircleFill />
          </Icon>
        )}

        {data.displayEvent && (
          <chakra.span
            data-testid="transition-event"
            style={{
              fontFamily: "monospace",
              fontSize: "sm",
              fontWeight: 600,
            }}
          >
            {data.displayEvent}
          </chakra.span>
        )}

        {targetDisplay && (
          <>
            <chakra.span css={{ color: "fg.muted" }}>&rarr;</chakra.span>
            {isSim ? (
              <chakra.span
                css={{
                  color: "fg",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                }}
              >
                {targetDisplay}
              </chakra.span>
            ) : (
              <chakra.a
                href={`#${edge.targetId}`}
                onClick={(e) => e.stopPropagation()}
                css={{
                  color: "fg.info",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(59,130,246,0.3)",
                  fontFamily: "monospace",
                  fontSize: "sm",
                }}
              >
                {targetDisplay}
              </chakra.a>
            )}
          </>
        )}
      </chakra.div>

      {data.description && (
        <Text textStyle={"sm"} css={{ color: "fg.muted", fontStyle: "italic" }}>
          {data.description}
        </Text>
      )}

      {data.actions.length > 0 && (
        <Flex css={{ flexWrap: "wrap", gap: 1 }} data-testid="transition-actions">
          {data.actions.map((a, i) => (
            <chakra.span
              key={i}
              css={{
                backgroundColor: "bg.muted",
                borderRadius: "sm",
                px: 1,
                fontFamily: "mono",
                fontSize: "sm",
              }}
            >
              {a}
            </chakra.span>
          ))}
        </Flex>
      )}
    </Flex>
  )
}
