import { chakra } from "@chakra-ui/react"
interface TransitionActionTokenProps {
  action: string;
}

export function TransitionActionToken({ action }: TransitionActionTokenProps) {
  return (
    <chakra.span
      css={{
        borderRadius: "sm",
        bg: "bg.muted",
        px: 1,
        fontFamily: "mono",
        fontSize: "sm",
      }}
    >
      {action}
    </chakra.span>
  );
}
