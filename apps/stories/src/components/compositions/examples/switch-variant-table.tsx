"use client"

import { For, HStack, Span, Switch, useSlotRecipe } from "@chakra-ui/react"
import { colorPalettes } from "../lib/color-palettes"
import { PlaygroundTable } from "../lib/playground-table"

export const SwitchVariantTable = () => {
  const recipe = useSlotRecipe({ key: "switch" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.variant}>{(v) => <td key={v}>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr key={c}>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.variant}>
                {(v) => (
                  <td key={v}>
                    <HStack>
                      <Switch.Root variant={v} colorPalette={c}>
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label>Toggle</Switch.Label>
                      </Switch.Root>
                      <Switch.Root variant={v} colorPalette={c} defaultChecked>
                        <Switch.HiddenInput />
                        <Switch.Control />
                        <Switch.Label>Toggle</Switch.Label>
                      </Switch.Root>
                    </HStack>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}
