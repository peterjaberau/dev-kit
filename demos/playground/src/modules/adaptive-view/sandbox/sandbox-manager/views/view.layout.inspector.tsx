'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import { useLayoutManager } from '../../layout-manager/selectors';

export function ViewLayoutInspector() {
    const { api } = useLayoutManager();

    if (!api) {
        return <Text padding="3">Layout is not ready.</Text>;
    }

    const layoutState = api.toJSON();

    return (
      <Box width="full" height="full" overflow="auto" padding="2">
        <JsonView
          key={JSON.stringify(layoutState)}
          src={layoutState}
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
          theme="github"
          collapsed={2}
        />
      </Box>
    )
}
