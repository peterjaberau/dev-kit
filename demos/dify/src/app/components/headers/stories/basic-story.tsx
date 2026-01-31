import { Header } from ".."
export const HeaderBasicStory = () => {
  return (
    <Header.Root>
      <Header.SectionLeft>
        <Header.ItemMenuSelector />
      </Header.SectionLeft>
      <Header.SectionCenter>center</Header.SectionCenter>
      <Header.SectionRight>end</Header.SectionRight>
    </Header.Root>
  )
}
