import { forwardRef, useRef, useState } from "react"
import { HStack } from "@chakra-ui/react"

const Controls = () =>
  forwardRef((props: any, ref: any): any => {
    const { css, label, icon, render, trigger, ...rest } = props
    return <HStack>
    </HStack>
  })

const Index = ({ html = "" }: { html?: string }) => {
  const [domData, setDomData] = useState<DomData | null>(null)
  const [selectedPath, setSelectedPath] = useState<DomPathItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const debounceRef = useRef<number | null>(null)


}