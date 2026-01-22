"use client"
import './components/theme.css'
import { Toolbar } from "./components/Toolbar"
import { ToggleButtonGroup } from "./components/ToggleButtonGroup"
import { ToggleButton } from "./components/ToggleButton"
import { Button } from "./components/Button"
import { Select, SelectItem } from "./components/Select"
import { Separator } from "./components/Separator"
import { Group } from "react-aria-components"
import { Bold, Italic, Underline, ClipboardCopy, Scissors, ClipboardPaste } from "lucide-react"




export default function Page() {
  return (
    <Toolbar aria-label="Text formatting">
      <ToggleButtonGroup aria-label="Style">
        <ToggleButton id="bold" aria-label="Bold">
          <Bold size={16} />
        </ToggleButton>
        <ToggleButton id="italic" aria-label="Italic">
          <Italic size={16} />
        </ToggleButton>
        <ToggleButton id="underline" aria-label="Underline">
          <Underline size={16} />
        </ToggleButton>
      </ToggleButtonGroup>
      <Separator />
      <Group aria-label="Clipboard">
        <Button aria-label="Copy">
          <ClipboardCopy size={16} />
        </Button>
        <Button aria-label="Cut">
          <Scissors size={16} />
        </Button>
        <Button aria-label="Paste">
          <ClipboardPaste size={16} />
        </Button>
      </Group>
      <Separator />
      <Select aria-label="Font" defaultSelectedKey="helvetica">
        <SelectItem id="helvetica">Helvetica</SelectItem>
        <SelectItem id="times">Times</SelectItem>
        <SelectItem id="comic-sans">Comic Sans</SelectItem>
      </Select>
    </Toolbar>
  )
}
