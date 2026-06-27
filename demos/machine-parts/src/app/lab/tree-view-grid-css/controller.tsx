"use client"

import { chakra } from "@chakra-ui/react"
import { useState } from "react"
import type React from "react"

type BooleanControllerItem = {
  defaultValue: boolean
  id: string
  label: string
  type: "boolean"
}

export type ControllerPayload = {
  controls: readonly BooleanControllerItem[]
  title: string
}

type ControllerValues = Record<string, boolean>

type ControllerProps = {
  payload: ControllerPayload
  render: (values: ControllerValues) => React.ReactNode
}

export const Controller = (props: ControllerProps) => {
  const { payload, render } = props
  const [values, setValues] = useState(() =>
    Object.fromEntries(payload.controls.map((control) => [control.id, control.defaultValue])),
  )

  const setValue = (id: string, checked: boolean) => {
    setValues((current) => ({ ...current, [id]: checked }))
  }

  return (
    <chakra.section display="flex" flexDirection="column" gap="3" minW="0">
      <chakra.h2 color="fg.muted" fontSize="xs" fontWeight="semibold" letterSpacing="0" textTransform="uppercase">
        {payload.title}
      </chakra.h2>

      <chakra.div
        display="flex"
        flexDirection="column"
        gap="3"
        p="3"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
        borderRadius="lg"
        shadow="xs"
      >
        <chakra.h3 color="fg.muted" fontSize="xs" fontWeight="semibold" letterSpacing="0" textTransform="uppercase">
          TreeView props
        </chakra.h3>

        {payload.controls.map((control) => (
          <ControllerCheckbox
            key={control.id}
            checked={values[control.id] ?? false}
            label={control.label}
            onCheckedChange={(checked) => setValue(control.id, checked)}
          />
        ))}
      </chakra.div>

      {render(values)}
    </chakra.section>
  )
}

type ControllerCheckboxProps = {
  checked: boolean
  label: string
  onCheckedChange: (checked: boolean) => void
}

const ControllerCheckbox = (props: ControllerCheckboxProps) => {
  const { checked, label, onCheckedChange } = props

  return (
    <chakra.label
      display="flex"
      alignItems="center"
      gap="3"
      minH="7"
      color="fg"
      cursor="pointer"
      fontSize="sm"
      fontWeight="medium"
    >
      <chakra.input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.currentTarget.checked)}
        accentColor="teal"
      />
      <chakra.span>{label}</chakra.span>
    </chakra.label>
  )
}
