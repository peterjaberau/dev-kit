import {
  CreatorButtonProps,
  SortableList,
  SortableListProps,
  SortableListRef,
} from '../SortableList';
import { ConfigProvider } from '../ConfigProvider';
import { FC, forwardRef, useCallback } from 'react';
import ColumnItem from './ColumnItem';
import { Header } from './Header';
import { useStyle } from './style';
import { ColumnItemList } from './types';

export interface ColumnListProps<T = any> extends SortableListProps<T> {
  columns: ColumnItemList<T>;
}

const ColumnList: <T>(props: ColumnListProps<T>) => ReturnType<FC> = forwardRef<
  SortableListRef,
  ColumnListProps
>(({ className, columns, actions, hideRemove, creatorButtonProps, ...props }, ref) => {
  const { cx } = useStyle();

  const customCreatorButtonProps: CreatorButtonProps | false =
    creatorButtonProps === false
      ? false
      : {
          position: 'bottom' as const,
          record: () => ({}),
          ...creatorButtonProps,
        };

  const renderItem = useCallback(
    (item: any, { index, listeners, dragging }: any) => (
      <ColumnItem
        columns={columns}
        item={item}
        dragging={dragging}
        listeners={listeners}
        index={index}
        actions={typeof actions === 'function' ? actions(item, index) : actions}
        creatorButtonProps={customCreatorButtonProps}
        hideRemove={hideRemove}
      />
    ),
    [columns],
  );

  return (
    <ConfigProvider>
      <SortableList
        ref={ref}
        renderItem={renderItem}
        renderHeader={() => <Header columns={columns} />}
        className={cx(className)}
        creatorButtonProps={customCreatorButtonProps}
        {...props}
      />
    </ConfigProvider>
  );
});

export default ColumnList;
