import SortableTree from '../components';
import {
    SampleChildren,
    SampleDropGhostIndicator,
    SampleDropLineIndicator,
    SamplePreview,
    SampleRow,
} from './components';
import useLocalTreeData from './data/useLocalTreeData';
import { chakra } from '@chakra-ui/react';

export const WithLineIndicatorAndScroll = () => {
    const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } =
        useLocalTreeData();

    return (
        <SortableTree
            // flashClass={rowStyles.flash}
            flashStyle={{
                animation: 'flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            getAllowedDropInstructions={getAllowedDropInstructions}
            items={items}
            onDrop={handleDrop}
            onExpandToggle={handleExpandToggle}
            renderIndicator={SampleDropLineIndicator}
            renderPreview={SamplePreview}
            renderRow={SampleRow}
        >
            {({ children, containerRef }) => (
                <chakra.ol
                    ref={containerRef}
                    css={{
                        border: '1px solid #aaa',
                        borderRadius: '4px',
                        listStyle: 'none',
                        margin: '0 auto',
                        maxHeight: '200px',
                        overflow: 'auto',
                        padding: 0,
                        width: '300px',
                    }}
                >
                    {children}
                </chakra.ol>
            )}
        </SortableTree>
    );
};


export const WithDragHandles = () => {
    const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } =
        useLocalTreeData();

    return (
        <SortableTree
            flashStyle={{
                animation: 'flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            // flashClass={rowStyles.flash}
            getAllowedDropInstructions={getAllowedDropInstructions}
            items={items}
            onDrop={handleDrop}
            onExpandToggle={handleExpandToggle}
            renderIndicator={SampleDropLineIndicator}
            renderPreview={SamplePreview}
            renderRow={(rowProps) => (
                <SampleRow {...rowProps} withDragHandle={true} />
            )}
        >
            {SampleChildren}
        </SortableTree>
    );
};


export const WithGhostIndicator = () => {
    const { getAllowedDropInstructions, handleDrop, handleExpandToggle, items } =
        useLocalTreeData();

    return (
        <SortableTree
            flashStyle={{
                animation: 'flash 250ms cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
            getAllowedDropInstructions={getAllowedDropInstructions}
            indicatorType='ghost'
            items={items}
            onDrop={handleDrop}
            onExpandToggle={handleExpandToggle}
            renderIndicator={SampleDropGhostIndicator}
            renderPreview={SamplePreview}
            renderRow={SampleRow}
        >
            {SampleChildren}
        </SortableTree>
    );
};
