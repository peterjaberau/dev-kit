"use client"

import React from 'react';

import { Badge, Tooltip, theme as antdTheme } from 'antd';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

export interface ValidationProps {
  errorMessages: string;
  id: string;
}

const ValidationIcon: React.FC<ValidationProps> = ({ errorMessages, id }) => {
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return errorMessages ? (
    <Tooltip id={id} title={errorMessages}>
      <Badge text={errorMessages.split('\n').length} size='small'>
        <ExclamationCircleOutlined
          style={{ fontSize: '20px', color: theme.colorError }}
          rev={undefined}
        />
      </Badge>
    </Tooltip>
  ) : null;
};

export default ValidationIcon;
