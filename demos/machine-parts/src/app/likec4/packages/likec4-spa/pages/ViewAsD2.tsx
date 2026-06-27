import { Box, chakra } from "@chakra-ui/react"
import { Button, Code, ScrollArea } from '@mantine/core'
import { useAsync } from '@react-hookz/web'
import { krokiD2SvgUrl } from 'likec4:app-config'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { CopyToClipboard } from '../components/CopyToClipboard'
import * as styles from './styles.css'

const ChakraCode = chakra(Code) as any
const ChakraGroup = chakra(Group) as any
const ChakraScrollArea = chakra(ScrollArea) as any

const fetchFromKroki = async (d2: string) => {
  const res = await fetch(krokiD2SvgUrl, {
    method: 'POST',
    cache: 'force-cache',
    body: JSON.stringify({
      diagram_source: d2,
      // diagram_options: {
      //   theme: 'colorblind-clear'
      // },
      output_format: 'svg',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.text()
}

export function ViewAsD2({ d2Source }: { d2Source: string }) {
  const [krokiSvg, { execute }] = useAsync(fetchFromKroki, null)
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
              {d2Source}
            </ChakraCode>
            <CopyToClipboard text={d2Source} />
          </ChakraScrollArea>
        </Panel>
        <Separator
          style={{
            width: 10,
          }} />
        <Panel>
          <ScrollArea h={'100%'}>
            {krokiSvg.status !== 'success' && (
              <>
                <Button
                  mt={'xs'}
                  variant="light"
                  disabled={krokiSvg.status === 'loading'}
                  onClick={() => void execute(d2Source)}>
                  {krokiSvg.status === 'loading' ? 'Loading...' : 'Render with Kroki'}
                </Button>
                {krokiSvg.status === 'error' && <Box>{krokiSvg.error?.message}</Box>}
              </>
            )}
            {krokiSvg.status === 'success' && (
              <Box css={styles.svgContainer}>
                {!krokiSvg.result
                  ? <Box>Empty result</Box>
                  : <div dangerouslySetInnerHTML={{ __html: krokiSvg.result }}></div>}
              </Box>
            )}
          </ScrollArea>
        </Panel>
      </ChakraGroup>
    </>
  )
}
