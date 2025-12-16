import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { InputNumber, message, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { isNeedTwoColWarpStyle, hasProperties, buildStyle } from '$utils/index';
import './index.scss';

interface NumberFormSchemaState {
  renderTime: number;
}

class NumberFormSchema extends React.PureComponent<
  BaseRendererProps,
  NumberFormSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);

    this.state = {
      renderTime: new Date().getTime(),
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillMount() {
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps: BaseRendererProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  /** Numerical change event handler */
  handleValueChange = (newVal: number | null) => {
    const { keyRoute, jsonStore, targetJsonSchema } = this.props;
    const { updateFormValueData } = jsonStore || {};
    if (newVal && newVal < targetJsonSchema.minimum) {
      message.warning(
        `The value is less than the set minimum value ${targetJsonSchema.minimum}. Please re-enter it.`,
      );
    } else if (newVal && newVal > targetJsonSchema.maximum) {
      message.warning(
        `The value exceeds the maximum value set ${targetJsonSchema.maximum}. Please re-enter.`,
      );
    } else {
      `updateFormValueData && keyRoute && updateFormValueData(keyRoute, newVal);` // Update the value
    }
  };

  /** Event handlers for the plus and minus buttons */
  numberChange = (type: 'plus' | 'minus', curValue: number | undefined) => {
    const { keyRoute } = this.props;
    let curNum = 0;
    if (curValue) {
      curNum = curValue;
    }
    if (type === 'plus') {
      curNum += 1;
    } else if (type === 'minus') {
      curNum -= 1;
    }
    this.handleValueChange(curNum);
    // Update the rendering timestamp so that number can be re-rendered.
    this.setState({
      renderTime: new Date().getTime(),
    });
    const curInputDom: any = document.getElementById(`inputNumber-${keyRoute}`);
    if (curInputDom) {
      curInputDom.value = curNum;
      // curInputDom.style.color = "#f00";
    }
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { keyRoute, jsonKey, targetJsonSchema } = this.props;
    const { renderTime } = this.state;
    // Retrieve the corresponding value from jsonData
    const curJsonData =
      getJSONDataByKeyRoute && keyRoute && getJSONDataByKeyRoute(keyRoute);
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    const isRequired = targetJsonSchema.isRequired || false; // Whether the field is required (default is not required)
    const isNeedTwoCol = isNeedTwoColWarpStyle(targetJsonSchema.type); // Whether to set it to a two-column layout

    const style = targetJsonSchema.style
      ? buildStyle(toJS(targetJsonSchema.style))
      : {};
    const titleStyle = targetJsonSchema.titleStyle
      ? buildStyle(toJS(targetJsonSchema.titleStyle))
      : {};
    const contentStyle = targetJsonSchema.contentStyle
      ? buildStyle(toJS(targetJsonSchema.contentStyle))
      : {};

    return (
      <div
        className={
          pageScreen === 'wideScreen'
            ? 'wide-screen-element-warp'
            : `mobile-screen-element-warp ${
              isNeedTwoCol ? 'two-col-element-warp' : ''
            }`
        }
        // key={`${nodeKey}-${renderTime}`}
        // id={nodeKey}
        style={style}
      >
        <div className="element-title" style={titleStyle}>
          <Tooltip
            title={
              pageScreen === 'wideScreen' ? targetJsonSchema.description : ''
            }
            placement="top"
          >
            <span className="title-text" title={targetJsonSchema.title}>
              {targetJsonSchema.title}
              {targetJsonSchema.showKey && (
                <span>（{truncate(jsonKey || '', { length: 15 })}）</span>
              )}
            </span>
          </Tooltip>
          {pageScreen === 'mobileScreen' && targetJsonSchema.description && (
            <Tooltip title={targetJsonSchema.description} placement="top">
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
          )}
        </div>
        <div className="content-item" style={contentStyle}>
          <div className="form-item-box">
            <div className="input-number-wrap">
              <div
                className="number-btn minus"
                title="Click to deduct 1"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.numberChange(
                    'minus',
                    hasProperties(curJsonData)
                      ? curJsonData
                      : targetJsonSchema.default,
                  );
                }}
              >
                -
              </div>
              <InputNumber
                key={`inputNumber-${renderTime}`}
                id={`inputNumber-${keyRoute}`}
                // ref="inputNumber"
                className="number-cont"
                style={{ display: 'inline-block' }}
                disabled={readOnly}
                required={isRequired}
                placeholder={
                  targetJsonSchema.placeholder ||
                  `Please enter ${targetJsonSchema.title}`
                }
                min={targetJsonSchema.minimum || 0}
                max={targetJsonSchema.maximum || 1000000}
                defaultValue={
                  hasProperties(curJsonData)
                    ? curJsonData
                    : targetJsonSchema.default
                }
                onChange={this.handleValueChange}
              />
              <div
                className="number-btn plus"
                title="Click to add 1"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.numberChange(
                    'plus',
                    hasProperties(curJsonData)
                      ? curJsonData
                      : targetJsonSchema.default,
                  );
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'number',
  component: NumberFormSchema,
});

export default NumberFormSchema;
