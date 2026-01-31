import { Header } from ".."
export const HeaderWithWrapperStory = () => {
  return (
    <Header.Wrapper>
      <Header.Root>
        <Header.SectionLeft>
          <Header.ItemMenuSelector />
        </Header.SectionLeft>
        <Header.SectionCenter>center</Header.SectionCenter>
        <Header.SectionRight>end</Header.SectionRight>
      </Header.Root>
    </Header.Wrapper>
  )
}
