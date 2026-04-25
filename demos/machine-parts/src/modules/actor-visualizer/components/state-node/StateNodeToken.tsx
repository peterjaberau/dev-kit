import { chakra, Badge } from "@chakra-ui/react"

interface StateNodeTokenProps {
  value: string;
}

export function StateNodeToken({ value }: StateNodeTokenProps) {
  return (
    <Badge variant={"subtle"}>
      {value}
    </Badge>
  )
}
