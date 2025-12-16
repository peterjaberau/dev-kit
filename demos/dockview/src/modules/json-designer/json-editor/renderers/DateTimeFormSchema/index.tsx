import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import moment from 'moment';
import { DatePicker, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { isNeedTwoColWarpStyle, buildStyle } from '$utils/index';

const DateTypeList: Record<string, string> = {
  'date-time': 'YYYY-MM-DD HH:mm',
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
};

class DateTimeFormSchema extends React.PureComponent<BaseRendererProps> {
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
  handleValueChange = (event: any, dateString: string) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    updateFormValueData &&
    keyRoute &&
    updateFormValueData(keyRoute, dateString); // Update the value
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { keyRoute, jsonKey, nodeKey, targetJsonSchema } = this.props;
    const curType = targetJsonSchema.type;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    const isRequired = targetJsonSchema.isRequired || false; // Whether the field is required (default is not required)
    const timeFormat = DateTypeList[curType] || DateTypeList[0];
    // Retrieve the corresponding value from jsonData
    const curJsonData =
      getJSONDataByKeyRoute && keyRoute && getJSONDataByKeyRoute(keyRoute);
    const defaultTime = curJsonData ?? targetJsonSchema.default;
    const isNeedTwoCol = isNeedTwoColWarpStyle(curType); // Whether to set it to a two-column layout

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
            <DatePicker
              style={{ display: 'inline-block' }}
              disabled={readOnly}
              required={isRequired}
              showTime={curType === 'date-time'}
              format={timeFormat}
              placeholder={
                targetJsonSchema.placeholder ||
                `Please enter ${targetJsonSchema.title}`
              }
              defaultValue={defaultTime && moment(defaultTime, timeFormat)}
              onChange={this.handleValueChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'date',
  component: DateTimeFormSchema,
});

registerRenderer({
  type: 'date-time',
  component: DateTimeFormSchema,
});

export default DateTimeFormSchema;
