import * as React from 'react';
import { DockviewApi } from '#adaptive-view/react';
import { Button, chakra } from '@chakra-ui/react'
import { useSandboxColors } from "../../sandbox-manager/sandboxTheme"
import { useDesktop } from '../selectors'

export const LayoutInspectorPanel = () => {
  const { dockviewApi } = useDesktop()

  const c = useSandboxColors();
    const [json, setJson] = React.useState<string>('');
    const [copied, setCopied] = React.useState(false);

    const refresh = React.useCallback(() => {
      try {
        setJson(JSON.stringify(dockviewApi.toJSON(), null, 2))
      } catch {
        setJson("// error serializing layout")
      }
    }, [dockviewApi])

    React.useEffect(() => {
      refresh()
      const disposable = dockviewApi.onDidLayoutChange(refresh)
      return () => disposable.dispose()
    }, [dockviewApi, refresh])

    const onCopy = () => {
        navigator.clipboard.writeText(json).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
      <chakra.div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "bg",
        }}
      >
        <chakra.div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 10px",
            borderBottom: "1px solid",
            borderBottomColor: "border.muted",
            flexShrink: 0,
          }}
        >
          <chakra.span
            css={{
              color: "fg.muted",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "monospace",
            }}
          >
            Layout JSON
          </chakra.span>
          <Button size={"sm"}></Button>
          <Button onClick={onCopy} size={"sm"} variant={copied ? "solid" : "outline"} colorPalette={"green"}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </chakra.div>
        <chakra.div style={{ flex: 1, overflow: "auto", padding: "8px 10px" }}>
          <chakra.pre
            css={{
              margin: 0,
              background: "transparent",
              fontSize: 11,
              fontFamily: "monospace",
              color: 'fg.muted',
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {json}
          </chakra.pre>
        </chakra.div>
      </chakra.div>
    )
};
