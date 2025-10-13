'use client'
import { Select } from "@mantine/core";
import { IconButton, HStack } from '@chakra-ui/react'
import { memo } from "react";
import JSONEditor from "../code-editors/json-editor";
import PanelShell from "../panel-shell";
import { IconFileDownload } from "@tabler/icons-react";
import { PathType } from "../../models/path-type";
import { saveTextFile } from "../../services/files";

/**
 * Panel displaying JSONPath query result paths.
 */
const PathsPanel = memo(({
    pathsText,
    pathType,
    onPathTypeChanged
}: {
    pathsText: string,
    pathType: PathType,
    onPathTypeChanged: (pathType: PathType) => void
}) => {
    return (
        <PanelShell
            toolbar={
                <HStack w={'full'} justifyContent={'space-between'}>
                  <Select
                    title="Path Format"
                    size="xs"
                    allowDeselect={false}
                    data={[
                      { label: "Normalized Path", value: PathType.normalizedPath },
                      { label: "JSON Pointer", value: PathType.jsonPointer }
                    ]}
                    value={pathType}
                    onChange={value => onPathTypeChanged(value as PathType)}
                  />
                  <IconButton
                    size={'sm'}
                    title="Save To File"
                    variant="outline" aria-label="Save To a File" onClick={async () => await saveTextFile("paths.json", "application/json", ".json", pathsText)}>
                    <IconFileDownload  />
                  </IconButton>
                </HStack>
            }
        >
            <JSONEditor value={pathsText} readonly onValueChanged={() => { }} />
        </PanelShell>
    );
});
export default PathsPanel;
