"use client"

import * as React from "react"
import Link from "next/link"
import { Link as ChakraLink, chakra, HStack, Text, Badge } from "@chakra-ui/react"
import Image from "next/image"

import { normalizeSlug } from "@/lib/utils"
import { serializeDesignSystemSearchParams, useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export interface PatternsCategoryCardProps {
  name: string
  label: string
  count: number
}

export function PatternsCategoryCard({ name, label, count }: PatternsCategoryCardProps) {
  const slug = normalizeSlug(name)
  const [params] = useDesignSystemSearchParams()

  // Build href with preserved design system params
  const href = React.useMemo(() => serializeDesignSystemSearchParams(`/patterns/${slug}`, params), [slug, params])

  return (
    <ChakraLink
      css={{
        backgroundColor: "bg.subtle",
        border: "1px solid",
        borderColor: "border",
        display: "flex",
        flexDirection: "column",
        borderRadius: "xl",
        padding: 1,
        boxShadow: "xs",
      }}
      asChild
    >
      <Link href={href}>
        <chakra.div
          css={{
            bg: "bg.panel",
            position: "relative",
            overflow: "hidden",
            borderRadius: "xl",
            border: "1px solid",
            borderColor: "border.muted",
          }}
        >
          <Image
            src={`/screenshots/patterns/${slug}-light.png`}
            alt={slug}
            width={600}
            height={400}
            className="w-full object-cover transition-all duration-300 dark:hidden"
            onError={(e) => {
              e.currentTarget.src = "/screenshots/patterns/default-light.png"
            }}
          />
          <Image
            src={`/screenshots/patterns/${slug}-dark.png`}
            alt={slug}
            width={600}
            height={400}
            className="hidden w-full object-cover transition-all duration-300 dark:block"
            onError={(e) => {
              e.currentTarget.src = "/screenshots/patterns/default-dark.png"
            }}
          />
        </chakra.div>
        <HStack
          css={{
            w: "full",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2.5,
          }}
        >
          <Text
            css={{
              fontSize: "sm",
              fontWeight: "medium",
            }}
          >
            {label}
          </Text>
          <Text textStyle="xs" color={"fg.muted"} bg={"transparent"}>
            {count} {count === 1 ? "pattern" : "patterns"}
          </Text>
        </HStack>
      </Link>
    </ChakraLink>
  )
}
