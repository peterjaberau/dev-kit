import { StateNodeTypeIndicator } from './StateNodeTypeIndicator';
import { chakra } from "@chakra-ui/react"

interface StateNodeHeaderProps {
  historyType?: 'shallow' | 'deep';
  isChoice: boolean;
  isFinal: boolean;
  isHistory: boolean;
  isInitial?: boolean;
  isParallel: boolean;
  label: string;
}

export function StateNodeHeader({
  historyType,
  isChoice,
  isFinal,
  isHistory,
  isInitial,
  isParallel,
  label,
}: StateNodeHeaderProps) {
  return (
    <chakra.div
      css={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2.5,
        py: 1.5,
      }}
    >
      <chakra.span
        css={{
          fontSize: "lg",
          fontWeight: "semibold",
          gap: 1,
          display: "flex",
          alignItems: "center",

        }}
      >
        <StateNodeTypeIndicator
          historyType={historyType}
          isChoice={isChoice}
          isFinal={isFinal}
          isHistory={isHistory}
          isInitial={isInitial}
          isParallel={isParallel}
        />
        {label}
      </chakra.span>
    </chakra.div>
  )
}
