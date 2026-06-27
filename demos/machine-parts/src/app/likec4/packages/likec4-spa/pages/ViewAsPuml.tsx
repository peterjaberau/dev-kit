import { Box, chakra } from "@chakra-ui/react"
import { Button, Code, ScrollArea } from '@mantine/core'
import { useAsync } from '@react-hookz/web'
import { krokiPumlSvgUrl } from '../../config/app-config'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { CopyToClipboard } from '../components/CopyToClipboard'
import * as styles from './styles.css'

const ChakraCode = chakra(Code) as any
const ChakraGroup = chakra(Group) as any
const ChakraScrollArea = chakra(ScrollArea) as any

const fetchFromKroki = async (puml: string) => {
  const res = await fetch(krokiPumlSvgUrl, {
    method: 'POST',
    cache: 'force-cache',
    body: JSON.stringify({
      diagram_source: puml,
      output_format: 'svg',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.text()
}

export function ViewAsPuml({ pumlSource }: { pumlSource: string }) {
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
              {pumlSource}
            </ChakraCode>
            <CopyToClipboard text={pumlSource} />
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
                  onClick={() => void execute(pumlSource)}>
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
