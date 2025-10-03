import React, { useMemo } from "react"
import { Box } from "@chakra-ui/react"
import { graphGridSelector } from "#actors/selectors"


const GraphGrid = () => {

  const { colorThemeObj, gridStylesObj } = graphGridSelector()

  return (
    <Box position="absolute" top="0" left="0" width="100%" height="100%" overflow="hidden">
      <Box position="absolute" top="0" left="0" width="100%" height="100%"
           bg={colorThemeObj.backgroundColor}
           css={gridStylesObj} />
    </Box>
  )
}

export default GraphGrid
