import { MovableModal } from "#components/ui/movable-panel/movableModal"
import { LuBug } from "react-icons/lu"
import { useState } from "react"
import { IconButton, Button } from "@chakra-ui/react"

const MovablePanelRenderer = (props: any) => {
  const { onClose, ...rest } = props

  return (
    <MovableModal
      defaultPosition={{
        x: 100,
        y: 100,
        width: 700,
        height: 800,
      }}
      title={"Movalble Panel 001"}
      bodyContent={<>content body here</>}
      onClose={onClose}
    />
  )
}

const Index = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <LuBug />
      </Button>

      {open && <MovablePanelRenderer onClose={() => setOpen(false)} />}
    </>
  )
}

export default Index
