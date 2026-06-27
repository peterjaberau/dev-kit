import { chakra } from '@chakra-ui/react'
import { Code, ScrollArea } from '@mantine/core'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { CopyToClipboard } from '../components/CopyToClipboard'
import * as styles from './styles.css'

const ChakraCode = chakra(Code) as any
const ChakraGroup = chakra(Group) as any
const ChakraScrollArea = chakra(ScrollArea) as any

export function ViewAsDot({ dot, dotSvg }: { dot: string; dotSvg: string }) {
  return (
    <>
      <ChakraGroup css={styles.viewWithTopPadding}>
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
              {dot}
            </ChakraCode>
            <CopyToClipboard text={dot} />
          </ChakraScrollArea>
        </Panel>
        <Separator
          style={{
            width: 10,
          }} />
        <Panel>
          <ScrollArea h={'100%'}>
            <chakra.div css={styles.svgContainer} dangerouslySetInnerHTML={{ __html: dotSvg }}></chakra.div>
          </ScrollArea>
        </Panel>
      </ChakraGroup>
    </>
  )
}
