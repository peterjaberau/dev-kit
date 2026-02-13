"use client"

import type { CategoryInfo } from "@/lib/registry"
import { cn } from "@/lib/utils"

import { PatternsCategoryCard } from "./patterns-category-card"
import { PatternsEmptyState } from "./patterns-empty-state"
import { PatternsHeader } from "./patterns-header"
import { chakra, SimpleGrid, Stack } from "@chakra-ui/react"

interface PatternsCategoryGridProps {
  categories: CategoryInfo[]
}

function PatternsCategoryMasonryGrid({
  categories,
  className,
}: {
  categories: CategoryInfo[]
  className?: string
}) {
  return (
    <SimpleGrid minChildWidth="2xs" gap={6} >
      {categories.map((item) => (
        <PatternsCategoryCard key={item.name} name={item.name} label={item.label} count={item.count} />
      ))}
    </SimpleGrid>
  )
}

export function PatternsCategoryGrid({
  categories,
}: PatternsCategoryGridProps) {
  return (
    <Stack>
      <PatternsHeader isGridFixed />
      <div className="@container/category-grid container py-6">
        {categories.length === 0 ? (
          <PatternsEmptyState message="No categories found" />
        ) : (
          <PatternsCategoryMasonryGrid categories={categories} />
        )}
      </div>
    </Stack>
  )
}
