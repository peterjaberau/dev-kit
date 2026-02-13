"use client"

import React from "react"

import { getCategories, getPatternsTotalCount } from "@/lib/registry"
import { PatternsCategoryCard } from "@/app/(create)/patterns/components/patterns-category-card"
import { chakra, Container, SimpleGrid } from "@chakra-ui/react"

export function Patterns() {
  const totalCount = getPatternsTotalCount()
  const categories = React.useMemo(() => getCategories(), [])

  return (
    <Container>
      <SimpleGrid columns={4} gap={6} py={8}>
        {categories.map((cat) => (
          <PatternsCategoryCard key={cat.name} name={cat.name} label={cat.label} count={cat.count} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
