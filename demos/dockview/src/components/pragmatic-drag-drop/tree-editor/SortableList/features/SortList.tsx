import { Empty } from 'antd';
import { isEqual } from "lodash"
import { memo } from 'react';
import { shallow } from 'zustand/shallow';
import { List, SortableItem } from '../components';
import type { Store } from '../store';
import { useStore } from '../store';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@chakra-ui/react';

import { useStyle } from '../style';

const selector = (s: Store) => ({
  renderItem: s.renderItem,
  renderContent: s.renderContent,
  renderEmpty: s.renderEmpty,
  getItemStyles: s.getItemStyles,
  keyManager: s.keyManager,
  actions: s.actions,
  hideRemove: s.hideRemove,
  handle: s.handle,
  creatorButtonProps: s.creatorButtonProps,
  dispatchListData: s.dispatchListData,
});

const SortableList = () => {
  const {
    dispatchListData,
    renderItem,
    renderContent,
    renderEmpty,
    creatorButtonProps = false,
    hideRemove,
    handle,
    keyManager,
    getItemStyles,
    actions,
  }: any = useStore(selector, shallow);

  const { styles } = useStyle();
  const items: any = useStore((s) => s.value, isEqual);
  const {
    record,
    creatorButtonText = 'addAColumn',
    position = 'bottom',
    style,
  } : any= creatorButtonProps || {};

  const CreateButton = ({ empty = false }) => {
    return (
      <Button
        size={'xs'}
        css={{
          ...(empty ? null : style),
          display: empty ? 'inline-block' : 'block',
        }}
        className={styles.btnAdd}
        onClick={() => {
          dispatchListData({
            type: 'addItem',
            item: record(items.length),
          });
        }}
      >
        <PlusOutlined />
        {creatorButtonText}
      </Button>
    );
  };

  return Array.isArray(items) && items.length === 0 ? (
    renderEmpty ? (
      renderEmpty()
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据">
        {creatorButtonProps !== false ? <CreateButton empty={true} /> : null}
      </Empty>
    )
  ) : (
    <>
      {creatorButtonProps !== false && position === 'top' ? <CreateButton /> : null}
      <List>
        {items.map((item: any, index: any) => {
          return (
            <SortableItem
              key={keyManager[index]}
              id={keyManager[index]}
              item={item}
              index={index}
              actions={actions}
              hideRemove={hideRemove}
              handle={handle}
              renderItem={renderItem}
              renderContent={renderContent}
              getItemStyles={getItemStyles}
              onRemove={() => dispatchListData({ type: 'removeItem', index })}
              useDragOverlay={true}
            />
          );
        })}
      </List>
      {creatorButtonProps !== false && position === 'bottom' ? <CreateButton /> : null}
    </>
  );
};

export default memo(SortableList);
