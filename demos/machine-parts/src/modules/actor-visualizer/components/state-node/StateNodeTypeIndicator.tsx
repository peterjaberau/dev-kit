import {
  RiCornerDownRightLine,
  RiLayoutColumnLine
} from 'react-icons/ri';

import { TbTargetArrow as RiTargetLine } from "react-icons/tb"
import { chakra, Icon } from "@chakra-ui/react"

interface StateNodeTypeIndicatorProps {
  historyType?: 'shallow' | 'deep';
  isChoice: boolean;
  isFinal: boolean;
  isHistory: boolean;
  isInitial?: boolean;
  isParallel: boolean;
}

export function StateNodeTypeIndicator({
  historyType,
  isChoice,
  isFinal,
  isHistory,
  isInitial,
  isParallel,
}: StateNodeTypeIndicatorProps) {
  return (
    <>
      {isInitial && (
        <Icon size={'sm'} color={"fg.muted"} css={{ shrink: 0}}>
        <RiCornerDownRightLine   />
        </Icon>
      )}
      {isParallel && (
        <Icon size={'sm'} color={"fg.muted"} css={{ shrink: 0}}>
          <RiLayoutColumnLine  />

        </Icon>
      )}
      {isFinal && (
        <Icon size={'sm'} color={"fg.muted"} css={{ shrink: 0}}>
          <RiTargetLine />
        </Icon>

      )}
      {isChoice && (

        <chakra.span
          css={{
            display: "inline-block",
            fontSize: "sm",
            shrink: 0,
            rotate: "45deg",
            borderTopWidth: "medium",
            borderStyle: "solid",
            borderColor: "border.muted",
          }}
        />
      )}
      {isHistory && (
        <chakra.span
          css={{
            display: "inline-flex",
            fontSize: "md",
            shrink: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "full",
            borderTopWidth: "thin",
            borderStyle: "solid",
            borderColor: "border.muted",
            fontWeight: "bold",
            lineHeight: 1
          }}
          >
          {historyType === 'deep' ? 'H*' : 'H'}
        </chakra.span>
      )}
    </>
  );
}
