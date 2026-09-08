'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import { useLayoutManager } from '../../layout-manager/selectors';

export interface ViewLayoutGroupInspectorProps {
    groupId: string;
}

export function ViewLayoutGroupInspector({
    groupId,
}: ViewLayoutGroupInspectorProps) {
    const { api } = useLayoutManager();
    const groupState = api?.getGroup(groupId)?.toJSON();

    if (!groupState) {
        return <Text padding="3">Group not found: {groupId}</Text>;
    }

    return (
      <Box width="full" height="full" overflow="auto" padding="2">
        <JsonView
          key={`${groupId}:${JSON.stringify(groupState)}`}
          src={groupState}
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
