"use client"
import { Box, Icon, IconButton, CloseButton, Button, HStack, RadioCard } from "@chakra-ui/react"
import { Pane } from "#components/ui/pane"
import { JsonForms } from "#jSchemaBuilder/react"
import {
  vanillaRenderers,
  vanillaCells,
} from '#jSchemaBuilder/renderers';
import {
  antdRenderers,
  antdCells,
  Unwrapped
} from '#jSchemaBuilder/antd-renderers';
import { LuStar, LuPlus } from "react-icons/lu"
import { BiSolidTerminal } from "react-icons/bi"
import React, { memo } from "react"
import {
  ConfigProvider,
  InputProps,
  Divider,
  Select,
  Form,
  ThemeConfig,
  Radio,
  theme as antTheme,
  Card,
  Space,
  Alert,
} from 'antd';

import { useCurrentApp } from "../actors-model/selectors/current-app"


const AntdWrapper = ({ children }: React.PropsWithChildren<unknown>) => {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');

  const [variant, setVariant] =
    React.useState<InputProps['variant']>('outlined');

  const handleVariantChange = (
    value: 'outlined' | 'borderless' | 'filled' | 'underlined'
  ) => {
    setVariant(value);
  };

  const theme = React.useMemo<ThemeConfig>(() => {
    return {
      algorithm:
        mode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      components: {
        Input: {},
        Select: {},
      },
    };
  }, [mode]);

  const label = 'Input variant';

  const layout = {
    labelCol: { span: 24 }, // Setting label column to take full width
    wrapperCol: { span: 24 }, // Setting wrapper column to take full width
  };

  return (
    <ConfigProvider theme={theme}>
      <Card style={{ width: '100%' }}>
        <Form {...layout} variant={variant}>
          <Space>
            <Form.Item label={label}>
              <Select
                style={{ width: 200 }}
                value={variant}
                onChange={handleVariantChange}
              >
                <Select.Option value='outlined'>Outlined</Select.Option>
                <Select.Option value='borderless'>Borderless</Select.Option>
                <Select.Option value='filled'>Filled</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={'Mode'}>
              <Radio.Group
                onChange={(e) => {
                  setMode(e.target.value);
                }}
                value={mode}
              >
                <Radio.Button value='dark'>Dark</Radio.Button>
                <Radio.Button value='light'>Light</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Space>
          <Divider />
          {children}
        </Form>
      </Card>
    </ConfigProvider>
  );
};



const PanelContentComponent = memo(({ currentExample }: any) => (
  <AntdWrapper>
  <JsonForms
    schema={currentExample.schema || {}}
    uischema={currentExample.uischema || {}}
    data={currentExample.data || null}
    renderers={antdRenderers}
    cells={antdCells}
    onChange={({ data, errors }) => console.log('--onChange jsonforms--', {data, errors})}
  />
  </AntdWrapper>
))

export function JsonFormsAntdPane() {
  const { currentExample } = useCurrentApp()

  return (
    <Pane
      title={"Examples list"}
      icon={<BiSolidTerminal />}
      leftSection={
        <IconButton variant="ghost" size="xs" borderRadius="full">
          <LuPlus />
        </IconButton>
      }
      rightSection={
        <HStack>
          <IconButton size="sm" variant="ghost">
            <LuStar />
          </IconButton>
        </HStack>
      }
    >
      <PanelContentComponent currentExample={currentExample}  />
    </Pane>
  )
}
