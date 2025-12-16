import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Tooltip } from 'antd';
import AceEditor from 'react-ace';
import { InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_light'; // ace-builds
import { hasProperties, buildStyle } from '$utils/index';
import { isObject, isArray } from '$utils/typeof';
import { catchJsonDataByWebCache } from '$mixins/index';

interface JsonFormSchemaState {
  isShowWarn: boolean;
  warningText: string;
  curJSONDataTemp: any;
}

class JsonFormSchema extends React.PureComponent<
  BaseRendererProps,
  JsonFormSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);
    // Data maintained internally by the component
    this.state = {
      isShowWarn: false, // Used to determine whether to display error messages.
      warnText: '', // Error content
      curJSONDataTemp: undefined, // Used to record currently non-compliant JSON data
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  /** Numerical change event handler */
  handleValueChange = (newJsonData: any) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    if (newJsonData) {
      updateFormValueData &&
      keyRoute &&
      updateFormValueData(keyRoute, newJsonData); // Update the value
    }
  };

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

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { nodeKey, jsonKey, keyRoute, targetJsonSchema } = this.props;
    const { isShowWarn, warnText, curJSONDataTemp } = this.state;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // const isRequired = targetJsonSchema.isRequired || false; // Whether it is required (default is not required)
    // Retrieve the corresponding value from jsonData
    let curJsonData = getJSONDataByKeyRoute(keyRoute);

    // Format JSON data
    curJsonData =
      curJsonData !== undefined
        ? curJsonData
        : targetJsonSchema.default || '{}';
    // Check if the current jsonData is an object type
    if ( isObject ( curJsonData ) || isArray ( curJsonData )) {
      curJsonData = JSON.stringify(curJsonData, null, 2);
    }

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
        className={`${
          pageScreen === 'wideScreen'
            ? 'wide-screen-element-warp container-warp'
            : 'mobile-screen-element-warp'
        }`}
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
          {isShowWarn && (
            <div className="warning-box code-area-item">
              <div className="warning-img">X</div>
              <div className="warning-text">{warnText}</div>
            </div>
          )}
          <AceEditor
            key={`${nodeKey}-json_area_ace`}
            value={
              hasProperties(curJSONDataTemp) ? curJSONDataTemp : curJsonData
            }
            className="code-area-item"
            mode="json"
            theme="solarized_light"
            name="JSON_CODE_EDIT"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            readOnly={readOnly}
            minLines={5}
            maxLines={30}
            width={'100%'}
            onChange={(newJsonData: string) => {
              try {
                const newJsonDataTemp = JSON.parse(newJsonData); // Perform formatting (mainly used to check if the data is valid JSON)
                // Update jsonData
                this.handleValueChange(newJsonDataTemp);
                this.setState({
                  isShowWarn: false,
                  curJSONDataTemp: undefined, // Reset
                });
              } catch (err: any) {
                // Update jsonData
                this.setState({
                  curJSONDataTemp: newJsonData, // Records JSON data that is currently in an incorrect format.
                  warningText: err.message,
                  isShowWarn: true,
                });
              }
            }}
            setOptions={{
              useWorker: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'json',
  component: JsonFormSchema,
});

export default JsonFormSchema;
