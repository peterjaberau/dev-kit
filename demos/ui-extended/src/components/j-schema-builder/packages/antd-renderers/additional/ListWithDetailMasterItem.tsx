"use client"

import DeleteFilled from '@ant-design/icons/DeleteFilled';
import type { StatePropsOfMasterItem } from '#jSchemaBuilder/core';
import { withJsonFormsMasterListItemProps } from '#jSchemaBuilder/react';
import { Avatar, Button, List, Tooltip, theme as antdTheme } from 'antd';
import Text from 'antd/es/typography/Text';
import React, { useMemo } from 'react';

export const ListWithDetailMasterItem = ({
  index,
  childLabel,
  selected,
  enabled,
  handleSelect,
  removeItem,
  path,
  translations,
  disableRemove,
}: StatePropsOfMasterItem) => {
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const avatarStyle = useMemo(
    () => (selected ? { background: theme.colorPrimary } : {}),
    [selected]
  );

  const listItemStyle = useMemo(
    () =>
      selected
        ? {
            background: theme.controlItemBgActive,
            borderRadius: '5px',
          }
        : {},
    [selected]
  );

  return (
    <List.Item
      key={index}
      onClick={handleSelect(index)}
      style={listItemStyle}
      actions={[
        <Tooltip title={translations.removeTooltip} key='action_remove'>
          <Button
            disabled={!enabled || disableRemove}
            aria-label={translations.removeAriaLabel}
            icon={<DeleteFilled rev={undefined} />}
            onClick={removeItem(path, index)}
          />
        </Tooltip>,
      ]}
    >
      <List.Item.Meta
        style={{ marginLeft: '8px' }}
        avatar={
          <Avatar aria-label='Index' style={avatarStyle} size={'small'}>
            {index + 1}
          </Avatar>
        }
        title={<Text ellipsis={true}>{childLabel}</Text>}
      />
    </List.Item>
  );
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem);
