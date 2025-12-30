import React, { useMemo } from 'react';

import { Treegrid } from './Treegrid';

import { TreeProvider } from './TreeContext';
import { TreeItem } from './TreeItem';

export type TreeProps = {
  root?: any;
  path?: string[];
  id: string;
  [key: string]: any;
};

export const Tree = ({
  root,
  path,
  id,
  useItems,
  getProps,
  isOpen,
  isCurrent,
  draggable = false,
  gridTemplateColumns = '[tree-row-start] 1fr min-content [tree-row-end]',
  classNames,
  levelOffset,
  renderColumns,
  blockInstruction,
  canDrop,
  canSelect,
  onOpenChange,
  onSelect,
}: TreeProps | any) => {
  const context = useMemo(
    () => ({
      useItems,
      getProps,
      isOpen,
      isCurrent,
    }),
    [useItems, getProps, isOpen, isCurrent],
  );
  const items = useItems(root);
  const treePath = useMemo(() => (path ? [...path, id] : [id]), [id, path]);

  return (
    <Treegrid.Root gridTemplateColumns={gridTemplateColumns} classNames={classNames}>
      <TreeProvider value={context}>
        {items.map((item: any, index: any) => (
          <TreeItem
            key={item.id}
            item={item}
            last={index === items.length - 1}
            path={treePath}
            levelOffset={levelOffset}
            draggable={draggable}
            renderColumns={renderColumns}
            blockInstruction={blockInstruction}
            canDrop={canDrop}
            canSelect={canSelect}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
          />
        ))}
      </TreeProvider>
    </Treegrid.Root>
  );
};
