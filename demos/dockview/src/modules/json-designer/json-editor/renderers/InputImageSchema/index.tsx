import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { Tooltip, message, Upload } from 'antd';
import {
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { truncate, isArray, isString } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';
import { BaseRendererProps } from '$types/index';

interface InputImageSchemaState {
  loading: boolean;
}

class InputImageSchema extends React.PureComponent<
  BaseRendererProps,
  InputImageSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);
    this.state = {
      loading: false,
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDeleteChange = this.handleDeleteChange.bind(this);
  }

  // Method 1: Declare a static property in the class component, and it must be contextType, to ensure that the current component can use data in the global context (this.context is not empty).
  // static contextType = ThemeContext;

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

  handleImageChange = (fileInfo: any) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    if (fileInfo.file.status === 'uploading') {
      this.setState({
        loading: true,
      });
      return;
    }

    if (fileInfo.file.status === 'done') {
      const responseData = fileInfo.file.response || {};
      if (responseData.url) {
        updateFormValueData &&
        keyRoute &&
        updateFormValueData(keyRoute, responseData.url);
      }
    } else if (fileInfo.file.status === 'error') {
      message.error(`${fileInfo.file.name} Image upload failed.`);
    }
    this.setState({
      loading: false,
    });
  };

  handleDeleteChange = () => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    updateFormValueData && keyRoute && updateFormValueData(keyRoute, '');
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute, options: _options } = jsonStore || {};
    const { nodeKey, jsonKey, keyRoute, targetJsonSchema } = this.props;
    const options = _options || {};
    const { loading } = this.state;
    // Retrieve the corresponding value from jsonData
    const curJsonData = keyRoute && getJSONDataByKeyRoute(keyRoute);
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // const isRequired = targetJsonSchema.isRequired || false; // Whether it is required (default is not required)
    let defaultFileList = [];
    if ( curJsonData && isArray(curJsonData) ) {
      defaultFileList = curJsonData;
    } else if (curJsonData && isString(curJsonData)) {
      defaultFileList.push(curJsonData);
    }

    const uploadProps = {
      name: 'file', // targetJsonSchema.name || jsonKey || 'imgFile',
      action: targetJsonSchema.uploadAction || options.uploadAction,
      accept:
        targetJsonSchema.accept || options.uploadAccept || '.jpeg,.jpg,.png',
      // multiple: targetJsonSchema.multiple ?? false,
      maxCount: targetJsonSchema.multiple ? targetJsonSchema.maxCount || 1 : 1,
      defaultFileList,
      // showUploadList: false,
      listType: targetJsonSchema.listType ?? 'picture-card',
      withCredentials: true,
      method: targetJsonSchema.uploadMethod || options.uploadMethod || 'POST',
      headers: {
        // authorization: targetJsonSchema.authorization || 'authorization-content', // This will affect the default image upload.
      },
      onChange: this.handleImageChange,
      onRemove: this.handleDeleteChange,
    };

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
            : 'mobile-screen-element-warp'
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
            <Upload {...uploadProps} disabled={readOnly}>
              <button
                style={{
                  border: 0,
                  background: 'none',
                  cursor: 'pointer',
                }}
                type="button"
              >
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload Image
                </div>
              </button>
            </Upload>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'input-image',
  component: InputImageSchema,
});

export default InputImageSchema;
