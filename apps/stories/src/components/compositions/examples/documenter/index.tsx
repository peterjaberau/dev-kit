import { Preview, PreviewToolbar, Editor, EditorToolbar } from "@dev-kit/documenter"
import { Container, Splitter } from "@chakra-ui/react"
export const Documenter = () => {
  return (
    <Container>
      <Splitter.Root panels={[{ id: "preview" }, { id: "editor" }]} minH={"200px"} border={'1px solid'} borderColor={"border"}>
        <Splitter.Panel id={"preview"}>
          <Preview>
            <PreviewToolbar />
          </Preview>
        </Splitter.Panel>
        <Splitter.ResizeTrigger id={"preview:editor"} />
        <Splitter.Panel id={"editor"}>
          <Editor>
            <EditorToolbar />
          </Editor>
        </Splitter.Panel>
      </Splitter.Root>
    </Container>
  )
}
