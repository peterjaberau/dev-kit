"use client"

import { Stack, Text } from "@chakra-ui/react"
import { PasswordInput } from "@dev-kit/components"
import { useState } from "react"

export const PasswordInputControlledVisibility = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Stack>
      <PasswordInput defaultValue="secret" visible={visible} onVisibleChange={setVisible} />
      <Text>Password is {visible ? "visible" : "hidden"}</Text>
    </Stack>
  )
}
