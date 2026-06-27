import { Box, chakra } from "@chakra-ui/react"
import { Code, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { useAsync } from '@react-hookz/web'
import { useEffect } from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { CopyToClipboard } from '../components/CopyToClipboard'
import * as styles from './styles.css'

const ChakraCode = chakra(Code) as any
const ChakraGroup = chakra(Group) as any
const ChakraScrollArea = chakra(ScrollArea) as any

const renderSvg = async (viewId: string, diagram: string, theme: 'light' | 'dark') => {
  // @ts-ignore
  const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11.12/dist/mermaid.esm.min.mjs')
  mermaid.initialize({
    theme,
  })
  const { svg } = await mermaid.render(viewId, diagram)
  return svg as string
}

export function ViewAsMmd({ viewId, mmdSource }: { viewId: string; mmdSource: string }) {
  const { colorScheme } = useMantineColorScheme()
  const theme = colorScheme === 'auto' ? 'dark' : colorScheme

  const [mmdSvg, { execute }] = useAsync(renderSvg, null)

  useEffect(() => {
    void execute(viewId, mmdSource, theme)
  }, [mmdSource, theme, viewId])

  return (
    <>
      <ChakraGroup
        css={styles.viewWithTopPadding}
        orientation="horizontal">
        <Panel>
          <ChakraScrollArea
            css={styles.cssScrollArea}
            p={5}
            styles={{
              viewport: {
                borderRadius: 6,
              },
            }}>
            <ChakraCode block css={styles.cssCodeBlock}>
              {mmdSource}
            </ChakraCode>
            <CopyToClipboard text={mmdSource} />
          </ChakraScrollArea>
        </Panel>
        <Separator
          style={{
            width: 10,
          }} />
        <Panel>
          <ScrollArea h={'100%'}>
            {mmdSvg.result && (
              <Box css={styles.svgContainer} dangerouslySetInnerHTML={{ __html: mmdSvg.result }} />
            )}
          </ScrollArea>
        </Panel>
      </ChakraGroup>
    </>
  )
}
