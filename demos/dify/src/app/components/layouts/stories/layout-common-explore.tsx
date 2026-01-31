import { Header } from '../../headers'
import { LayoutCommon, LayoutExplore } from "../../layouts"

export const LayoutCommonExploreStory = () => {

  return (
    <LayoutCommon.Root>
      <LayoutCommon.Header>
        <Header.Wrapper>
          <Header.Root>
            <Header.SectionLeft>
              <Header.ItemMenuSelector />
            </Header.SectionLeft>
            <Header.SectionCenter>center</Header.SectionCenter>
            <Header.SectionRight>end</Header.SectionRight>
          </Header.Root>
        </Header.Wrapper>
      </LayoutCommon.Header>
      <LayoutCommon.Content>
        <LayoutExplore.Root>
          <LayoutExplore.Sidebar>explore sidebar</LayoutExplore.Sidebar>
          <LayoutExplore.Content>explore content</LayoutExplore.Content>
        </LayoutExplore.Root>
      </LayoutCommon.Content>
    </LayoutCommon.Root>
  )
}