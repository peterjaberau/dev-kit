import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { Tooltip } from 'antd';
import { FilterOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';
import './index.scss';

interface DynamicDataSchemaProps {
  parentType?: string;
  jsonKey?: string;
  indexRoute?: string;
  keyRoute?: string;
  nodeKey?: string;
  targetJsonSchema: any;
  dynamicDataList?: any[];
  dynamicDataObj?: any;
  dynamicDataApiScopeList?: any;
  schemaStore?: any;
  jsonStore?: any;
  renderChild?: any;
}

interface DynamicDataSchemaState {
  isShowFilter: boolean;
}

class DynamicDataSchema extends React.PureComponent<
  DynamicDataSchemaProps,
  DynamicDataSchemaState
> {
  constructor(props: DynamicDataSchemaProps) {
    super(props);

    this.state = {
      isShowFilter: false, // Whether to display the data filter
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.switchFilterBtn = this.switchFilterBtn.bind(this);
  }

  componentWillMount() {
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps: DynamicDataSchemaProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  /** Numerical change event handler */
  handleValueChange = (curKeyRoute: string, value: any) => {
    const { updateFormValueData } = this.props.jsonStore || {};
    updateFormValueData(curKeyRoute, value); // Update the value
  };

  // Show and hide data filters
  switchFilterBtn = () => {
    const { isShowFilter } = this.state;
    this.setState({
      isShowFilter: !isShowFilter,
    });
  };

  // Switch between panel display content (local data/API data)
  tabChange = (value: string) => {
    const { keyRoute, jsonStore } = this.props;
    const { triggerChangeAction } = jsonStore || {};
    this.handleValueChange(`${keyRoute}-type`, value);
    setTimeout(() => {
      triggerChangeAction();
    }, 100);
  };

  // API configuration change handling
  handleApiConfigChange = (apiConfig: any) => {
    const { keyRoute, jsonStore } = this.props;
    const { triggerChangeAction } = jsonStore || {};
    this.handleValueChange(`${keyRoute}-config`, apiConfig);
    setTimeout(() => {
      triggerChangeAction();
    }, 100);
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute, triggerChange } = jsonStore || {};
    const {
      keyRoute,
      jsonKey,
      nodeKey,
      indexRoute,
      targetJsonSchema,
      renderChild,
    } = this.props;
    const { isShowFilter } = this.state;
    const curType = targetJsonSchema.type;
    // Retrieve the corresponding value from jsonData
    const curJsonData = getJSONDataByKeyRoute(keyRoute) || {};

    // Retrieve various data objects from the DataSource
    const typeDataObj = targetJsonSchema.properties.type || {}; // The type field records the data source type: local or remote
    const dataType = curJsonData.type || typeDataObj.default; // local or remote

    const configDataObj = curJsonData.config || {}; // Interface data request configuration object
    const dataObj = targetJsonSchema.properties.data || {}; // Data object in the schema
    const configSchema = targetJsonSchema.properties.config || {}; // config schema

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
        className="mobile-screen-element-warp dynamic-data-schema"
        // key={nodeKey}
        key={`${nodeKey}-${triggerChange}`}
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
          <div className="dynamic-data-tab-radio-box">
            <div className="dynamic-data-tab-radio">
              <div
                className={`tab-radio ${
                  dataType === 'local' ? 'tab-radio-active' : ''
                }`}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.tabChange('local');
                }}
              >
                Local data
              </div>
              <div
                className={`tab-radio ${
                  dataType === 'remote' ? 'tab-radio-active' : ''
                }`}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.tabChange('remote');
                }}
              >
                Interface data
              </div>
            </div>
          </div>
          <div
            className={`dynamic-dat-tabPane ${
              dataType === 'local' ? 'dynamic-dat-tabPane-active' : ''
            }`}
          >
            <div className="json-form-box">
              <Tooltip
                title={
                  isShowFilter ? 'Click to hide data filter' : 'Click to show data filter'
                }
                placement="top"
              >
                <FilterOutlined
                  className="filter-btn"
                  onClick={this.switchFilterBtn}
                />
              </Tooltip>
              {renderChild({
                rendererType: 'json',
                parentType: curType,
                jsonKey: 'data',
                indexRoute: indexRoute ? `${indexRoute}-2` : '2',
                keyRoute: keyRoute ? `${keyRoute}-data` : 'data',
                nodeKey: `${nodeKey}-data`,
                targetJsonSchema: dataObj,
              })}
              <div className="filter-func-box">
                {isShowFilter &&
                  renderChild({
                    rendererType: 'codearea',
                    isIgnoreWarn: true, // Currently primarily using the method body (not directly executing functions).
                    parentType: curType,
                    jsonKey: 'localFilter',
                    indexRoute: indexRoute ? `${indexRoute}-3` : '3',
                    keyRoute: keyRoute
                      ? `${keyRoute}-localFilter`
                      : 'localFilter',
                    nodeKey: `${nodeKey}-localFilter`,
                    targetJsonSchema: targetJsonSchema.properties.localFilter,
                  })}
              </div>
            </div>
          </div>
          <div
            className={`dynamic-dat-tabPane ${
              dataType === 'remote' ? 'dynamic-dat-tabPane-active' : ''
            }`}
          >
            <div className="json-form-box">
              {renderChild({
                rendererType: 'api',
                parentType: curType,
                jsonKey: 'config',
                indexRoute: indexRoute ? `${indexRoute}-1` : '1',
                keyRoute: keyRoute ? `${keyRoute}-config` : 'config',
                nodeKey: `${nodeKey}-config`,
                targetJsonSchema: configSchema,
                onChange: this.handleApiConfigChange,
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'dynamic-data',
  component: DynamicDataSchema,
});

export default DynamicDataSchema;
