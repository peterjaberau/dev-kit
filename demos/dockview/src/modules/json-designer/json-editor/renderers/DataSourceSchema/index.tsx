import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Tooltip } from 'antd';
import {
  DownOutlined,
  InfoCircleOutlined,
  RightOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import JsonView from '$components/JsonView/index';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';
// @ts-ignore
// @ts-ignore
import CodeIcon from '$assets/img/code.svg';
import './index.scss';

interface DataSourceSchemaState {
  isShowFilter: boolean;
  jsonView: boolean;
  isClosed: boolean;
}

class DataSourceSchema extends React.PureComponent<
  BaseRendererProps,
  DataSourceSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);

    this.state = {
      isShowFilter: false, // Whether to display the data filter
      jsonView: false, // Whether to display code mode
      isClosed: false, // Whether it is closed; the default is open.
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.switchFilterBtn = this.switchFilterBtn.bind(this);
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

  // Show and hide data filters
  switchFilterBtn = () => {
    const { isShowFilter } = this.state;
    this.setState({
      isShowFilter: !isShowFilter,
    });
  };

  render() {
    const { schemaStore, jsonStore, renderChild } = this.props;
    const { pageScreen } = schemaStore || {};
    const { keyRoute, jsonKey, nodeKey, indexRoute, targetJsonSchema } =
      this.props;
    const { jsonView, isClosed, isShowFilter } = this.state;
    const curType = targetJsonSchema.type;
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)

    // Retrieve various data objects from the DataSource
    const typeDataObj = targetJsonSchema.properties.type || {}; // The type field records the data source type: local or remote
    const dataObj = targetJsonSchema.properties.data || {}; // Used for entering data (or data source address)
    const filterDataObj = targetJsonSchema.properties.filter || {}; // Data filter
    // Get the current data source type
    const dataType = typeDataObj.default; // local or remote
    // Should the source code switching button be displayed?
    const showCodeViewBtn = targetJsonSchema.showCodeViewBtn ?? true;

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
            ? 'wide-screen-element-warp'
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
        <div
          className="element-title-card-warp content-item"
          style={contentStyle}
        >
          <div
            className="element-title"
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              this.setState({
                isClosed: !isClosed,
              });
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <span className="title-text">Data Source Configuration</span>
            {isClosed ? (
              <RightOutlined className="close-operate-btn" />
            ) : (
              <DownOutlined className="close-operate-btn" />
            )}

            {showCodeViewBtn && (
              <div
                className="display-source-btn"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  this.setState({
                    jsonView: !jsonView,
                  });
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <Tooltip title={jsonView ? 'Disable Source Mode' : 'Enable Source Mode'}>
                  <CodeIcon
                    className={jsonView ? 'info-icon active' : 'info-icon'}
                  />
                </Tooltip>
              </div>
            )}
          </div>
          <div
            className={`content-item object-content ${jsonView ? 'json-view-array' : ''} ${isClosed ? 'closed' : ''}`}
          >
            {!jsonView && dataType === 'local' && (
              <>
                <div className="ace-editor-box code-area-item">
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
                    indexRoute: indexRoute ? `${indexRoute}-1` : '1',
                    keyRoute: keyRoute ? `${keyRoute}-data` : 'data',
                    nodeKey: `${nodeKey}-data`,
                    targetJsonSchema: dataObj,
                    key: `${nodeKey}-data`,
                  })}
                </div>
                {isShowFilter &&
                  renderChild({
                    rendererType: 'codearea',
                    parentType: curType,
                    jsonKey: 'filter',
                    indexRoute: indexRoute ? `${indexRoute}-2` : '2',
                    keyRoute: keyRoute ? `${keyRoute}-filter` : 'filter',
                    nodeKey: `${nodeKey}-filter`,
                    targetJsonSchema: filterDataObj,
                  })}
              </>
            )}
            {!jsonView && dataType === 'remote' && (
              <>
                <div className="url-editor-box">
                  {renderChild({
                    rendererType: 'url',
                    parentType: curType,
                    jsonKey: 'data',
                    indexRoute: indexRoute ? `${indexRoute}-1` : '1',
                    keyRoute: keyRoute ? `${keyRoute}-data` : 'data',
                    nodeKey: `${nodeKey}-data`,
                    targetJsonSchema: dataObj,
                  })}
                  <Tooltip title="Click to set data filter" placement="top">
                    <FilterOutlined
                      className="filter-url-btn"
                      onClick={this.switchFilterBtn}
                    />
                  </Tooltip>
                </div>
                {isShowFilter &&
                  renderChild({
                    rendererType: 'codearea',
                    parentType: curType,
                    jsonKey: 'filter',
                    indexRoute: indexRoute ? `${indexRoute}-2` : '2',
                    keyRoute: keyRoute ? `${keyRoute}-filter` : 'filter',
                    nodeKey: `${nodeKey}-filter`,
                    targetJsonSchema: filterDataObj,
                  })}
              </>
            )}
            {jsonView && <JsonView {...this.props} />}
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'datasource',
  component: DataSourceSchema,
});

export default DataSourceSchema;
