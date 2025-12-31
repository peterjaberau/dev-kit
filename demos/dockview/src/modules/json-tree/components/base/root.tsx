"use client"
import { Container, useSlotRecipe } from "@chakra-ui/react"
import React, { forwardRef, useEffect, useRef } from "react"
import { slotRecipes } from "../../styles"

export const Root = forwardRef<HTMLDivElement, any>((props: any, forwardedRef) => {
  const recipe = useSlotRecipe({ recipe: slotRecipes.jsonTree })
  const styles = recipe()

  const localRef = useRef<HTMLDivElement>(null)
  // merge forwarded ref + local ref
  const setRef = (node: HTMLDivElement | null) => {
    localRef.current = node
    if (typeof forwardedRef === "function") forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    const root = localRef.current
    if (!root) return

    const handler = (e: PointerEvent | FocusEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // 1️⃣ Only react when hovering / focusing a branch control
      const control = target.closest('[data-part="branch-control"]') as HTMLElement | null
      if (!control) return

      // 2️⃣ Find the owning branch
      const branch = control.closest('[data-part="branch"]') as HTMLElement | null
      if (!branch) return

      // 3️⃣ Only when branch is closed
      if (branch.getAttribute("data-state") !== "closed") return

      // 4️⃣ Enforce single hovered branch
      root.querySelectorAll("[data-hovered]").forEach((el) => el.removeAttribute("data-hovered"))

      // 4️⃣ Enforce single hovered branch
      root.querySelectorAll("[data-hovered]").forEach((el) => el.removeAttribute("data-hovered"))

      // const branch = target.closest('[data-part="branch"]') as HTMLElement | null
      //
      // root.querySelectorAll("[data-hovered]").forEach((el) => el.removeAttribute("data-hovered"))

      branch?.setAttribute("data-hovered", "true")
    }

    root.addEventListener("pointermove", handler)
    root.addEventListener("focusin", handler)

    return () => {
      root.removeEventListener("pointermove", handler)
      root.removeEventListener("focusin", handler)
    }
  }, [])

  return (
    <Container mt={4} css={{ bg: "bg.panel", borderRadius: "md", boxShadow: "sm", p: 4 }} {...props} ref={setRef} />
  )
})
