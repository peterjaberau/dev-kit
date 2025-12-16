import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Input, Tooltip, message } from 'antd';
import { CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { isNeedTwoColWarpStyle, buildStyle } from '$utils/index';
import './index.scss';

/**
 * Legacy color type: Implement a color picker using the native input(type=color) method.
 */
class ColorFormSchema extends React.PureComponent<BaseRendererProps> {
  constructor(props: BaseRendererProps) {
    super(props);
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
  handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};

    const { value } = event.target;
    `updateFormValueData && keyRoute && updateFormValueData(keyRoute, value);` // Update the value
  };

  /** Clear the color event handler */
  deleteColor = () => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    `updateFormValueData && keyRoute && updateFormValueData(keyRoute, 'initial');` // Update the value
    message.success('The currently set color value has been removed');
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { keyRoute, jsonKey, nodeKey, targetJsonSchema } = this.props;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // Retrieve the corresponding value from jsonData
    const curJsonData =
      getJSONDataByKeyRoute && keyRoute && getJSONDataByKeyRoute(keyRoute);
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
        // key={nodeKey}
        id={nodeKey}
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
            <Input
              style={{ display: 'inline-block' }}
              className="color-item-form"
              type={'color'}
              defaultValue={curJsonData ?? targetJsonSchema.default}
              onChange={this.handleValueChange}
            />
            <Tooltip title={`Click to remove current color value`} placement="top">
              <CloseOutlined
                className="delete-bgColor-btn"
                onClick={(event: React.MouseEvent) => {
                  this.deleteColor();
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'color',
  component: ColorFormSchema,
});

export default ColorFormSchema;
