import React from 'react';
import { BaseRendererProps } from '$types/index';
import { registerRenderer } from '$core/factory';
import {
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Switch,
  InputNumber,
  Button,
  Space,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { toJS } from 'mobx';
import { buildStyle } from '$utils/index';
import './index.scss';

const { TabPane } = Tabs;

interface ApiSchemaState {
  visible: boolean;
}

class ApiSchema extends React.PureComponent<BaseRendererProps, ApiSchemaState> {
  form: any;

  constructor(props: BaseRendererProps) {
    super(props);
    // Binding here is necessary so that `this` can be used in the callback function.
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.form.validateFields().then((values: any) => {
      const { keyRoute, jsonStore } = this.props;

      // Process headers (if they exist)
      if (values.headers && Array.isArray(values.headers)) {
        const headersObj: Record<string, string> = {};
        values.headers.forEach((item: any) => {
          if (item.key) {
            headersObj[item.key] = item.value || '';
          }
        });
        values.headers = headersObj;
      } else if (typeof values.headers === 'string') {
        try {
          values.headers = JSON.parse(values.headers || '{}');
        } catch (e) {
          values.headers = {};
        }
      }

      // Process the data (if it exists)
      if (values.data && Array.isArray(values.data)) {
        const dataObj: Record<string, any> = {};
        values.data.forEach((item: any) => {
          if (item.key) {
            try {
              dataObj[item.key] = JSON.parse(item.value);
            } catch (e) {
              dataObj[item.key] = item.value;
            }
          }
        });
        values.data = dataObj;
      } else if (typeof values.data === 'string') {
        try {
          values.data = JSON.parse(values.data || '{}');
        } catch (e) {
          values.data = {};
        }
      }

      // Handling cache: If the switch is off, delete the cache field; if on, use the cacheTime value.
      if (values.cache) {
        values.cache = values.cacheTime || 3000;
      } else {
        delete values.cache;
      }
      delete values.cacheTime;

      // Delete empty array objects
      if (values.headers && Object.keys(values.headers).length === 0) {
        delete values.headers;
      }
      if (values.data && Object.keys(values.data).length === 0) {
        delete values.data;
      }

      if (this.props.onChange) {
        // If there is a function to monitor data changes, it will be triggered first.
        this.props.onChange(values);
      } else {
        // Update values
        jsonStore.updateFormValueData(keyRoute, values);
      }

      this.setState({ visible: false });
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { keyRoute, targetJsonSchema, nodeKey } = this.props;
    const { visible } = this.state || {};

    if (!targetJsonSchema) {
      return null;
    }

    // Retrieve the corresponding value from jsonData
    const curJsonData =
      keyRoute && jsonStore ? jsonStore.getJSONDataByKeyRoute?.(keyRoute) : {};
    const currentValue = curJsonData || {};

    // Retrieve configuration information for each field from the schema
    const properties = targetJsonSchema.properties || {};
    const urlSchema = properties.url || {};
    const methodSchema = properties.method || {};
    const headersSchema = properties.headers || {};
    const dataSchema = properties.data || {};
    const dataTypeSchema = properties.dataType || {};
    const cacheSchema = properties.cache || {};
    const cacheTimeSchema = properties.cacheTime || {};

    const style = targetJsonSchema.style
      ? buildStyle(toJS(targetJsonSchema.style))
      : {};
    const titleStyle = targetJsonSchema.titleStyle
      ? buildStyle(toJS(targetJsonSchema.titleStyle))
      : {};
    const contentStyle = targetJsonSchema.contentStyle
      ? buildStyle(toJS(targetJsonSchema.contentStyle))
      : {};

    const methodUpper = currentValue.method?.toUpperCase() || 'GET';
    const summary = `${methodUpper !== 'GET' ? methodUpper + ': ' : ''}${currentValue.url || ''}`;

    // Convert the headers object to an array format for form editing
    const headersToArray = (headers: any) => {
      if (!headers || typeof headers !== 'object') return [];
      return Object.keys(headers).map((key: string) => ({
        key,
        value:
          typeof headers[key] === 'string'
            ? headers[key]
            : JSON.stringify(headers[key]),
      }));
    };

    // Convert the data object to array format for form editing
    const dataToArray = (data: any) => {
      if (!data || typeof data !== 'object') return [];
      return Object.keys(data).map((key: string) => ({
        key,
        value:
          typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]),
      }));
    };

    return (
      <div
        className={
          pageScreen === 'wideScreen'
            ? 'wide-screen-element-warp'
            : 'mobile-screen-element-warp'
        }
        id={nodeKey}
        style={style}
      >
        <div className="element-title" style={titleStyle}>
          <span className="title-text" title={targetJsonSchema.title}>
            {targetJsonSchema.title}
            {targetJsonSchema.showKey && (
              <span>（{targetJsonSchema.jsonKey}）</span>
            )}
          </span>
        </div>
        <div className="content-item" style={contentStyle}>
          <Input
            className="api-schema-input"
            value={summary}
            placeholder="Click the settings icon on the right to configure the API interface"
            readOnly
            addonAfter={<SettingOutlined onClick={this.showModal} />}
          />
        </div>
        <Modal
          title={targetJsonSchema.title || 'API Deployment'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          okText="OK"
          cancelText="Cancel"
        >
          <Form
            ref={(form) => (this.form = form)}
            initialValues={{
              url: currentValue.url || '',
              method: currentValue.method || 'get',
              dataType: currentValue.dataType || 'json',
              cache: !!currentValue.cache,
              cacheTime:
                typeof currentValue.cache === 'number'
                  ? currentValue.cache
                  : 3000,
              headers: headersToArray(currentValue.headers),
              data: dataToArray(currentValue.data),
            }}
            layout="vertical"
          >
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={targetJsonSchema.tabTitles?.basic || 'Interface Settings'}
                key="1"
              >
                <Form.Item
                  name="method"
                  label={methodSchema.title || 'Sending Method'}
                  rules={[{ required: methodSchema.isRequired !== false }]}
                >
                  <Select>
                    <Select.Option value="get">GET</Select.Option>
                    <Select.Option value="post">POST</Select.Option>
                    <Select.Option value="put">PUT</Select.Option>
                    <Select.Option value="patch">PATCH</Select.Option>
                    <Select.Option value="delete">DELETE</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="url"
                  label={urlSchema.title || 'API address'}
                  rules={[{ required: urlSchema.isRequired !== false }]}
                >
                  <Input placeholder={urlSchema.placeholder || 'http://'} />
                </Form.Item>

                <Form.Item
                  name="dataType"
                  label={dataTypeSchema.title || 'Data Format'}
                >
                  <Select>
                    <Select.Option value="json">JSON</Select.Option>
                    <Select.Option value="form-data">FormData</Select.Option>
                    <Select.Option value="form">Form</Select.Option>
                  </Select>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues: any, currentValues: any) =>
                      prevValues.dataType !== currentValues.dataType
                    }
                  >
                    {({ getFieldValue }: any) => {
                      const dataType = getFieldValue('dataType') || 'json';
                      const formatMap: Record<string, string> = {
                        json: 'application/json',
                        'form-data': 'multipart/form-data',
                        form: 'application/x-www-form-urlencoded',
                      };
                      return (
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '4px',
                          }}
                        >
                          {dataTypeSchema.description ||
                            `The format of the data body is: ${formatMap[dataType] || 'application/json'}. When the data body contains a file, the form-data format will be used automatically.`
                          }
                            </div>
                            );
                          }}
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  name="cache"
                  label={cacheSchema.title || 'Whether to set caching'}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues: any, currentValues: any) =>
                    prevValues.cache !== currentValues.cache
                  }
                >
                  {({ getFieldValue }: any) =>
                    getFieldValue('cache') ? (
                      <Form.Item
                        name="cacheTime"
                        label={cacheTimeSchema.title || 'Cache time (ms)'}
                      >
                        <InputNumber
                          min={0}
                          step={500}
                          style={{ width: '100%' }}
                        />
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '4px',
                          }}
                        >
                          {cacheTimeSchema.description ||
                            `Set the cache validity period for this request, in milliseconds.`
                          }
                            </div>
                            </Form.Item>
                            ) : null
                          }
                      </Form.Item>
                    </TabPane>

                    <TabPane
                    tab={targetJsonSchema.tabTitles?.http || 'HTTP配置'}
                  key="2"
                >
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ marginBottom: '12px' }}>
                      {headersSchema.title || 'Request Headers'}
                    </h4>
                    <Form.List name="headers">
                      {(
                        fields: any[],
                        {
                          add,
                          remove,
                        }: {
                          add: (defaultValue?: any) => void;
                          remove: (index: number) => void;
                        },
                      ) => (
                        <>
                          {fields.map(({ key, name, ...restField }: any) => (
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, 'key']}
                                rules={[{ required: true, message: 'Please enter the Key' }]}
                                style={{ flex: 1 }}
                              >
                                <Input placeholder="Key" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'value']}
                                style={{ flex: 1 }}
                              >
                                <Input placeholder="Value" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={(event: React.MouseEvent) =>
                                  remove(name)
                                }
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={(event: React.MouseEvent) => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add request headers
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ marginBottom: '12px' }}>
                      {dataSchema.title || 'Send Data (Data)'}
                    </h4>
                    <Form.List name="data">
                      {(
                        fields: any[],
                        {
                          add,
                          remove,
                        }: {
                          add: (defaultValue?: any) => void;
                          remove: (index: number) => void;
                        },
                      ) => (
                        <>
                          {fields.map(({ key, name, ...restField }: any) => (
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, 'key']}
                                rules={[{ required: true, message: 'Please enter the Key' }]}
                                style={{ flex: 1 }}
                              >
                                <Input placeholder="Key" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, 'value']}
                                style={{ flex: 1 }}
                              >
                                <Input placeholder="Value (Supports JSON)" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={(event: React.MouseEvent) =>
                                  remove(name)
                                }
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={(event: React.MouseEvent) => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Send Data
                            </Button>
                          </Form.Item>
                          {dataSchema.description && (
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#999',
                                marginTop: '8px',
                              }}
                            >
                              {dataSchema.description}
                            </div>
                          )}
                        </>
                      )}
                    </Form.List>
                  </div>
              </TabPane>
            </Tabs>
          </Form>
        </Modal>
      </div>
    );
  }
}

registerRenderer({
  type: 'api',
  component: ApiSchema,
});

export default ApiSchema;
