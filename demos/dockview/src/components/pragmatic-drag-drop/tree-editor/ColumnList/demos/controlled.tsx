'use client';
import type { ColumnItemList } from '../types';
import ColumnList from '../ColumnList';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { tableColumnValueOptions } from './mock_data/options';

type SchemaItem = {
  title: string;
  valueType: string;
  dataIndex: string;
};

const INIT_VALUES: SchemaItem[] = [
  { title: 'Index', valueType: 'indexBorder', dataIndex: 'index' },
  {
    title: 'Enterprise',
    valueType: 'text',
    dataIndex: 'name',
  },
  { title: 'Company', valueType: 'text', dataIndex: 'authCompany' },
];

const columns: ColumnItemList<SchemaItem> = [
  {
    title: 'Title',
    dataIndex: 'title',
    type: 'input',
  },
  {
    title: 'ValueType',
    dataIndex: 'valueType',
    type: 'select',
    options: tableColumnValueOptions,
  },
  {
    title: 'DataIndex',
    dataIndex: 'dataIndex',
    type: 'select',
  },
];

export const ColumnsControlled = () => {
  const [value, setValue] = useState(INIT_VALUES);

  return (
    <>
      <Button
        css={{
          display: 'block',
          width: '100%',
          marginBottom: 12
        }}
        onClick={() => {
          setValue([
            {
              dataIndex: 'orderCreated',
              valueType: 'date',
              title: 'CreateTime',
            },
            {
              dataIndex: 'detailPic',
              valueType: 'text',
              title: 'Detail',
            },
          ]);
        }}
      >
        Set Data
      </Button>
      <ColumnList<SchemaItem>
        columns={columns}
        value={value}
        onChange={(values) => {
          setValue(values);
          console.log('onChange', values);
        }}
      />
    </>
  );
};
