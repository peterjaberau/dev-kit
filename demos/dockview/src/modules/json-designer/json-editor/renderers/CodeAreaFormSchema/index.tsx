import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Tooltip } from 'antd';
import AceEditor from 'react-ace';
import { InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { isObject } from '$utils/typeof';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';

interface CodeAreaFormSchemaState {
  isShowWarn: boolean;
  warningText: string;
}
class CodeAreaFormSchema extends React.PureComponent<
  BaseRendererProps,
  CodeAreaFormSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);
    // Data maintained internally by the component
    this.state = {
      isShowWarn: false, // Used to determine whether to display error messages.
      warnText: '', // Error content
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
  handleValueChange = (newJsonData: string) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    updateFormValueData &&
    keyRoute &&
    updateFormValueData(keyRoute, newJsonData); // Update the value
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const {
      isReadOnly,
      jsonKey,
      isIgnoreWarn,
      nodeKey,
      keyRoute,
      targetJsonSchema,
    } = this.props;
    const { isShowWarn, warnText } = this.state;
    const readOnly = isReadOnly || targetJsonSchema.readOnly || false; // Whether to make the text read-only (default is editable)
    const isRequired = targetJsonSchema.isRequired || false; // Whether the field is required (default is not required)
    // Retrieve the corresponding value from jsonData
    let curJsonData = getJSONDataByKeyRoute(keyRoute);
    // Format JSON data
    curJsonData =
      curJsonData !== undefined
        ? curJsonData
        : targetJsonSchema.default || '() => {}';
    // Check if the current jsonData is an object type
    if (isObject(curJsonData)) {
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
        }`} //  element-title-card-warp
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
          {!isIgnoreWarn && isShowWarn && (
            <div className="warning-box code-area-item">
              <div className="warning-img">X</div>
              <div className="warning-text">{warnText}</div>
            </div>
          )}
          <AceEditor
            // id="code_area_ace"
            key={`${nodeKey}-ace`}
            className="code-area-item"
            value={curJsonData}
            mode="javascript"
            theme="monokai"
            name="JS_CODE_EDIT"
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
                eval(newJsonData); // Performs formatting (mainly used to check if the data is valid JSON).
                // Update jsonData
                this.handleValueChange(newJsonData);
                this.setState({
                  isShowWarn: false,
                });
              } catch (err: any) {
                // Update jsonData
                this.handleValueChange(newJsonData);
                this.setState({
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
  type: 'codearea',
  component: CodeAreaFormSchema,
});

export default CodeAreaFormSchema;
