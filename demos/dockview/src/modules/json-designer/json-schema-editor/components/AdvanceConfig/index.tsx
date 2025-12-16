import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Tooltip,
  Select,
  message,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
const { TextArea } = Input;
import RcSwitch from 'rc-switch';
import {
  isNeedDefaultOption,
  isNeedPlaceholderOption,
  isNeedReadOnlyOption,
  isNeedConditionOption,
  isNeedIsRequiredOption,
  isNeedCodeViewOption,
  hasOptions,
} from '$utils/advanced.config';
import { getExpectType, isArray } from '@wibetter/json-utils';
import JsonView from '$components/JsonView';
import 'rc-switch/assets/index.css';
import './index.scss';

/**
 Advanced Configuration Panel
 */

interface AdvanceConfigProps {
  jsonKey?: string;
  indexRoute?: string;
  nodeKey?: string;
  targetJsonSchema?: any;
  schemaStore?: any;
}

class AdvanceConfig extends React.PureComponent<AdvanceConfigProps> {
  constructor(props: AdvanceConfigProps) {
    super(props);

    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /** Numerical change event handler */
  handleValueChange = (curKey: string, newVal: any) => {
    const { editSchemaData } = this.props.schemaStore || {};
    const { indexRoute, jsonKey, targetJsonSchema } = this.props;
    if (targetJsonSchema[curKey] === newVal) return; // If the title value hasn't changed, exit immediately.
    const newSchemaData: any = {};
    newSchemaData[curKey] = newVal;
    // jsonKey is the key of the current field item, and curKey is the property key of the current field object.
    editSchemaData(indexRoute, jsonKey, newSchemaData);
  };

  /** Display the corresponding input component based on the current type */
  renderDefaultContent = (
    curType: string,
    targetJsonSchema: any,
    nodeKey?: string,
  ) => {
    if (curType === 'boolean') {
      return (
        <RcSwitch
          style={{ display: 'inline-block' }}
          defaultChecked={targetJsonSchema.default}
          checkedChildren="true"
          unCheckedChildren="false"
          onChange={(checked) => {
            this.handleValueChange('default', checked);
          }}
        />
      );
    } else if (
      curType === 'checkboxes' ||
      (curType === 'select' && targetJsonSchema.multiple)
    ) {
      const options = targetJsonSchema.options;
      return (
        <Checkbox.Group
          style={{ display: 'inline-block' }}
          onChange={(checkedValue) => {
            this.handleValueChange('default', checkedValue);
          }}
          defaultValue={targetJsonSchema.default}
        >
          {options &&
            options.length > 0 &&
            options.map((item: any, optionIndex: number) => {
              const optionNodeKey = `${nodeKey}-options-${optionIndex}`;
              return (
                <Checkbox value={item.value} key={optionNodeKey}>
                  {item.label || item.name}
                </Checkbox>
              );
            })}
        </Checkbox.Group>
      );
    } else if (curType === 'radio' || curType === 'select') {
      const options = targetJsonSchema.options;
      return (
        <Radio.Group
          style={{ display: 'inline-block' }}
          defaultValue={targetJsonSchema.default}
          onChange={(event: RadioChangeEvent) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
        >
          {options &&
            options.length > 0 &&
            options.map((item: any, optionIndex: number) => {
              /** 2. Get the ID of the current element, used as a unique identifier */
              const optionNodeKey = `${nodeKey}-options-${optionIndex}`;
              return (
                <Radio value={item.value} key={optionNodeKey}>
                  {item.label || item.name}
                </Radio>
              );
            })}
        </Radio.Group>
      );
    } else if (curType === 'color') {
      return (
        <Input
          style={{ display: 'inline-block' }}
          className="color-item-form"
          type="color"
          defaultValue={targetJsonSchema.default}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            this.handleValueChange('default', value);
          }}
        />
      );
    } else if (
      curType === 'textarea' ||
      curType === 'codearea' ||
      curType === 'htmlarea' ||
      curType === 'json'
    ) {
      return (
        <TextArea
          style={{ display: 'inline-block' }}
          rows={4}
          placeholder={`Please enter the default value for ${targetJsonSchema.title}`}
          defaultValue={targetJsonSchema.default}
          onPressEnter={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const { value } = event.target as HTMLTextAreaElement;
            this.handleValueChange('default', value);
          }}
          onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            const { value } = event.target as HTMLTextAreaElement;
            this.handleValueChange('default', value);
          }}
        />
      );
    }
    if (curType === 'number') {
      return (
        <InputNumber
          style={{ display: 'inline-block' }}
          placeholder={`Please enter the default value for ${targetJsonSchema.title}`}
          defaultValue={targetJsonSchema.default}
          onChange={(newVal) => {
            this.handleValueChange('default', newVal);
          }}
        />
      );
    }
    // All other input methods are assumed to use input controls for data entry.
    return (
      <Input
        style={{ display: 'inline-block' }}
        placeholder={`Please enter the default value for ${targetJsonSchema.title}`}
        defaultValue={targetJsonSchema.default}
        onPressEnter={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const { value } = event.target as HTMLInputElement;
          this.handleValueChange('default', value);
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          const { value } = event.target as HTMLInputElement;
          this.handleValueChange('default', value);
        }}
      />
    );
  };

  render() {
    const { nodeKey, indexRoute, targetJsonSchema } = this.props;
    const curType = targetJsonSchema.type;
    // Determine if the current condition field is correct
    let isConditionProp = targetJsonSchema.isConditionProp;

    /** Default values ​​need to be further subdivided
     * Basic input type components (input, boolean, date, date-time, time, url, number) are provided for users to fill in as input forms;
     * Textarea and three special component types (Json, CodeArea, htmlArea) allow users to fill in textarea forms.
     * The color selection type is provided by a color value control with type=color, allowing the user to choose the color.
     * Radio and select selection types allow users to choose default values ​​through their own display in the JSONEditor;
     * */

    return (
      <div className="advance-config-model">
        {isNeedConditionOption(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-isConditionProp`}
          >
            <div className="element-title">
              <Tooltip
                title={'When set as a conditional field, other fields can react in real time based on changes in their values'}
                placement="top"
              >
                <span className="title-text">Conditional Fields</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div
                className="form-item-box"
                key={`${nodeKey}-isConditionProp-switch`}
              >
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={isConditionProp ?? false}
                  checkedChildren="是"
                  unCheckedChildren="否"
                  onChange={(checked) => {
                    this.handleValueChange('isConditionProp', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {(curType === 'select' || curType === 'cascader') && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-selectConfig`}
          >
            <div className="element-title">
              <Tooltip
                title={'With multi-select enabled, the select dropdown list supports selecting multiple options.'}
                placement="top"
              >
                Supports multiple selections.
              </Tooltip>
            </div>
            <div className="content-item">
              <div
                className="form-item-box"
                key={`${nodeKey}-selectConfig-multiple`}
              >
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.multiple ?? false}
                  checkedChildren="Multiple selections"
                  unCheckedChildren="Single Selection"
                  onChange={(checked) => {
                    this.handleValueChange('multiple', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {hasOptions(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-defaultActiveFirstOption`}
          >
            <div className="element-title">
              <Tooltip title={'Should the first option be highlighted by default?'} placement="top">
                Select the first item.
              </Tooltip>
            </div>
            <div className="content-item">
              <div
                className="form-item-box"
                key={`${nodeKey}-selectConfig-defaultActiveFirstOption`}
              >
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={
                    targetJsonSchema.defaultActiveFirstOption ?? false
                  }
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={(checked) => {
                    this.handleValueChange('defaultActiveFirstOption', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedReadOnlyOption(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-readOnly-${targetJsonSchema.readOnly}`}
          >
            <div className="element-title">
              <Tooltip
                title={'With the current attribute set to read-only, users cannot perform any editing operations on it'}
                placement="top"
              >
                Is it read-only?
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.readOnly ?? false}
                  checkedChildren="true"
                  unCheckedChildren="false"
                  onChange={(checked) => {
                    this.handleValueChange('readOnly', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedIsRequiredOption(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-isRequired-${targetJsonSchema.isRequired}`}
          >
            <div className="element-title">
              <Tooltip
                title={
                  'If a current attribute is set as required, it will be highlighted in red if the user does not assign a value to it.'
                }
                placement="top"
              >
                Is this field required?
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.isRequired ?? false}
                  checkedChildren="true"
                  unCheckedChildren="false"
                  onChange={(checked) => {
                    this.handleValueChange('isRequired', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {isNeedDefaultOption(curType) && (
          <div className="wide-screen-element-warp" key={`${nodeKey}-default`}>
            <div className="element-title">
              <Tooltip placement="top">
                <span className="title-text">Default value</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                {this.renderDefaultContent(curType, targetJsonSchema, nodeKey)}
              </div>
            </div>
          </div>
        )}
        {curType === 'select' && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-withLabel`}
          >
            <div className="element-title">
              <Tooltip
                title={'When enabled, when an option is selected, its value will include the label value of the current option.'}
                placement="top"
              >
                <span className="title-text">Includes label values</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <RcSwitch
                style={{ display: 'inline-block' }}
                defaultChecked={targetJsonSchema.withLabel ?? false}
                checkedChildren="On"
                unCheckedChildren="Off"
                onChange={(checked) => {
                  this.handleValueChange('withLabel', checked);
                }}
              />
            </div>
          </div>
        )}
        {curType === 'cascader' && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-cascader-options`}
          >
            <div className="element-title">
              <Tooltip
                title={'Options data used to add cascading selection components.'}
                placement="top"
              >
                <span className="title-text">options 配置</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <JsonView
                jsonData={targetJsonSchema.options}
                onChange={(newJsonData) => {
                  this.handleValueChange('options', newJsonData);
                }}
                maxLines={10}
              />
            </div>
          </div>
        )}
        <div
          className="wide-screen-element-warp"
          key={`${nodeKey}-description`}
        >
          <div className="element-title">
            <Tooltip
              title={'Field descriptions will be provided to users as supplementary information to the Title'}
              placement="top"
            >
              <span className="title-text">Field Description</span>
            </Tooltip>
          </div>
          <div className="content-item">
            <div className="form-item-box">
              <Input
                style={{ display: 'inline-block' }}
                placeholder={`Please enter the field description for ${targetJsonSchema.title}`}
                defaultValue={targetJsonSchema.description}
                onPressEnter={(
                  event: React.KeyboardEvent<HTMLInputElement>,
                ) => {
                  const { value } = event.target as HTMLInputElement;
                  this.handleValueChange('description', value);
                }}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  const { value } = event.target as HTMLInputElement;
                  this.handleValueChange('description', value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="wide-screen-element-warp" key={`${nodeKey}-showKey`}>
          <div className="element-title">
            <Tooltip
              title={'When enabled, the current key value will be displayed in the JSONEditor to increase recognizability.'}
              placement="top"
            >
              <span className="title-text">Display Key Value</span>
            </Tooltip>
          </div>
          <div className="content-item">
            <div className="form-item-box">
              <RcSwitch
                style={{ display: 'inline-block' }}
                defaultChecked={targetJsonSchema.showKey ?? false}
                checkedChildren="true"
                unCheckedChildren="false"
                onChange={(checked) => {
                  this.handleValueChange('showKey', checked);
                }}
              />
            </div>
          </div>
        </div>
        {isNeedPlaceholderOption(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-placeholder`}
          >
            <div className="element-title">
              <Tooltip
                title={'The input prompt will be displayed to the user as a prompt in the input area'}
                placement="top"
              >
                <span className="title-text">Input Prompt</span>
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <Input
                  style={{ display: 'inline-block' }}
                  placeholder={`Please enter the input prompt for ${targetJsonSchema.title}`}
                  defaultValue={targetJsonSchema.placeholder}
                  onPressEnter={(
                    event: React.KeyboardEvent<HTMLInputElement>,
                  ) => {
                    const { value } = event.target as HTMLInputElement;
                    this.handleValueChange('placeholder', value);
                  }}
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                    const { value } = event.target as HTMLInputElement;
                    this.handleValueChange('placeholder', value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {(curType === 'input' ||
          curType === 'quantity' ||
          curType === 'padding-margin') && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-autoComplete`}
          >
            <div className="element-title">
              <Tooltip
                title={'Enabled this feature supports adding optional items and autoComplete.'}
                placement="top"
              >
                Enable optional content.
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.autoComplete ?? false}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  onChange={(checked) => {
                    this.handleValueChange('autoComplete', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {targetJsonSchema.autoComplete && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-autoComplete-options`}
          >
            <div className="element-title">
              <span className="title-text">Optional</span>
            </div>
            <div className="content-item">
              <JsonView
                jsonData={targetJsonSchema.options || []}
                onChange={(newJsonData) => {
                  if (!isArray(newJsonData)) {
                    message.warning(
                      'The optional data format is incorrect. Optional data must be in array format.'
                    );
                    return;
                  }
                  this.handleValueChange('options', newJsonData);
                }}
                maxLines={10}
              />
            </div>
          </div>
        )}
        {isNeedCodeViewOption(curType) && (
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-showCodeViewBtn-${targetJsonSchema.showCodeViewBtn}`}
          >
            <div className="element-title">
              <Tooltip
                title={'Used to control whether the source code mode switch button is displayed; it is displayed by default'}
                placement="top"
              >
                Source Code Mode
              </Tooltip>
            </div>
            <div className="content-item">
              <div className="form-item-box">
                <RcSwitch
                  style={{ display: 'inline-block' }}
                  defaultChecked={targetJsonSchema.showCodeViewBtn ?? true}
                  checkedChildren="true"
                  unCheckedChildren="false"
                  onChange={(checked) => {
                    this.handleValueChange('showCodeViewBtn', checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {getExpectType(curType) === 'number' && (
          <>
            <div
              className="wide-screen-element-warp"
              key={`${nodeKey}-minimum-${targetJsonSchema.minimum}`}
            >
              <div className="element-title">
                <Tooltip
                  title={'After setting the minimum value, the value entered by the user must be greater than the current minimum value'}
                  placement="top"
                >
                  Minimum value
                </Tooltip>
              </div>
              <div className="content-item">
                <div className="form-item-box">
                  <InputNumber
                    style={{ display: 'inline-block' }}
                    defaultValue={targetJsonSchema.minimum}
                    onPressEnter={(
                      event: React.KeyboardEvent<HTMLInputElement>,
                    ) => {
                      const { value } = event.target as HTMLInputElement;
                      this.handleValueChange('minimum', value);
                    }}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const { value } = event.target as HTMLInputElement;
                      this.handleValueChange('minimum', value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="wide-screen-element-warp"
              key={`${nodeKey}-maximum-${targetJsonSchema.maximum}`}
            >
              <div className="element-title">
                <Tooltip
                  title={'After setting the maximum value, the value entered by the user must be greater than the current maximum value'}
                  placement="top"
                >
                  Maximum value
                </Tooltip>
              </div>
              <div className="content-item">
                <div className="form-item-box">
                  <InputNumber
                    style={{ display: 'inline-block' }}
                    defaultValue={targetJsonSchema.maximum}
                    onPressEnter={(
                      event: React.KeyboardEvent<HTMLInputElement>,
                    ) => {
                      const { value } = event.target as HTMLInputElement;
                      this.handleValueChange('maximum', value);
                    }}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                      const { value } = event.target as HTMLInputElement;
                      this.handleValueChange('maximum', value);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {getExpectType(curType) === 'array' && (
          <>
          <div
            className="wide-screen-element-warp"
            key={`${nodeKey}-minimum-child`}
          >
            <div className="element-title">
              <Tooltip title={'Used to limit the minimum number of data items'} placement="top">
                <span className="title-text">Minimum data item</span>
            </Tooltip>
          </div>
          <div className="content-item">
            <div className="form-item-box">
              <InputNumber
                style={{ display: 'inline-block' }}
                defaultValue={targetJsonSchema['minimum-child']}
                onChange={(newVal) => {
                  this.handleValueChange('minimum-child', newVal);
                }}
              />
            </div>
          </div>
          </div>
          <div
          className="wide-screen-element-warp"
          key={`${nodeKey}-maximum-child`}
      >
        <div className="element-title">
          <Tooltip title={'Used to limit the maximum number of data items'} placement="top">
            Most data items
          </Tooltip>
        </div>
        <div className="content-item">
          <div className="form-item-box">
            <InputNumber
              style={{ display: 'inline-block' }}
              defaultValue={targetJsonSchema['maximum-child']}
              onChange={(newVal) => {
                this.handleValueChange('maximum-child', newVal);
              }}
            />
          </div>
        </div>
      </div>
  </>
  )}
    <div className="wide-screen-element-warp" key={`${nodeKey}-onShow`}>
      <div className="element-title">
        <Tooltip
          title={
            'Used to set the onShow expression, for example, setting "dataType === 1" means that the current configuration item will be displayed when dataType in the data field is 1.'
          }
          placement="top"
        >
          <span className="title-text">Explicit and Implicit Expressions</span>
        </Tooltip>
      </div>
      <div className="content-item">
        <div className="form-item-box">
          <Input
            style={{ display: 'inline-block' }}
            placeholder={'Please enter the explicit/implicit expression'}
            defaultValue={targetJsonSchema.onShow}
            onPressEnter={(
              event: React.KeyboardEvent<HTMLInputElement>,
            ) => {
              const { value } = event.target as HTMLInputElement;
              this.handleValueChange('onShow', value);
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              const { value } = event.target as HTMLInputElement;
              this.handleValueChange('onShow', value);
            }}
          />
        </div>
      </div>
    </div>

    <div className="wide-screen-element-warp" key={`${nodeKey}-titleStyle`}>
      <div className="element-title">
        <Tooltip title={'Can be used to set the title display style.'} placement="top">
          <span className="title-text">Title Style</span>
        </Tooltip>
      </div>
      <div className="content-item">
        <JsonView
          jsonData={targetJsonSchema.titleStyle}
          onChange={(newJsonData) => {
            this.handleValueChange('titleStyle', newJsonData);
          }}
          maxLines={10}
        />
      </div>
    </div>
  </div>
  );
  }
}

export default inject((stores: any) => ({
  schemaStore: stores.schemaStore,
}))(observer(AdvanceConfig));
