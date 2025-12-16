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
} from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import JsonView from '$components/JsonView/index';
import { catchJsonDataByWebCache } from '$mixins/index';
import { saveJSONEditorCache, getJSONEditorCache } from '$utils/webCache';
// @ts-ignore
import CodeIcon from '$assets/img/code.svg';
import { buildStyle } from '$utils/index';
import './index.scss';

interface ObjectSchemaState {
  jsonView: boolean;
  isClosed: boolean;
}

class ObjectSchema extends React.PureComponent<
  BaseRendererProps,
  ObjectSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);

    this.state = {
      jsonView: false, // Whether to display code mode
      isClosed: false, // Whether it is closed; the default is open.
    };

    this.collapseChange = this.collapseChange.bind(this);
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

  collapseChange(event: React.MouseEvent) {
    const { keyRoute } = this.props;
    const { isClosed } = this.state;

    this.setState({
      isClosed: !isClosed,
    });
    event.preventDefault();
    event.stopPropagation();

    // Cache the current collapsed state
    saveJSONEditorCache(keyRoute, !isClosed);
  }

  render() {
    const { schemaStore } = this.props;
    const { pageScreen } = schemaStore || {};

    const {
      indexRoute,
      jsonKey,
      nodeKey,
      keyRoute,
      targetJsonSchema,
      isArrayItem,
      isStructuredSchema,
      renderChild,
    } = this.props;
    const { jsonView, isClosed: _isClosed } = this.state;
    // Check if it's a structured schema; if so, don't display the title to avoid duplicate titles.
    const isStructured = isStructuredSchema;
    // Should the source code switching button be displayed?
    const showCodeViewBtn = targetJsonSchema.showCodeViewBtn ?? true;

    // Retrieve folded data from the front-end cache
    let isClosed = _isClosed;
    const collapseCacheData = getJSONEditorCache(keyRoute);
    if (collapseCacheData !== undefined) {
      isClosed = collapseCacheData;
    }

    const boxTitle = targetJsonSchema.boxTitle ?? 'Object Configuration';

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
            ? 'object-schema-warp wide-screen-element-warp'
            : 'object-schema-warp mobile-screen-element-warp'
        }
        // key={nodeKey}
        id={nodeKey}
        style={style}
      >
        {!isStructured && !isArrayItem && (
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
        )}
        <div
          className="element-title-card-warp content-item"
          style={contentStyle}
        >
          {!isStructured && !isArrayItem && (
            <div className="element-title" onClick={this.collapseChange}>
              <span className="title-text">{boxTitle}&nbsp;</span>
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
          )}
          <div
            className={`content-item ${
              !isStructured && !isArrayItem ? 'object-content' : ''
            } ${jsonView ? 'json-view-array' : ''} ${isClosed ? 'closed' : ''}`}
          >
            {!jsonView &&
              targetJsonSchema.propertyOrder &&
              targetJsonSchema.propertyOrder.map(
                (key: string, index: number) => {
                  /** 1. Get the path value of the current element */
                  const currentIndexRoute = indexRoute
                    ? `${indexRoute}-${index}`
                    : `${index}`;
                  const currentKeyRoute = keyRoute
                    ? `${keyRoute}-${key}` :
                      `${key}`; // The key path value, which will be used later to extract the value of the current element from the jsonData.
                  /** 2. Get the key value of the current element */
                  const currentJsonKey = key;
                  /** 3. Get the JSON structure object of the current element */
                  const currentSchemaData =
                    targetJsonSchema.properties[currentJsonKey];
                  /** 4. Determine if it is a container element; if so, disable selection. */
                  const curType = currentSchemaData.type;
                  /** 5. Get the ID of the current element, used as a unique identifier */
                  const childNodeKey = `${nodeKey}-${curType}-${currentJsonKey}`;

                  return renderChild({
                    ...this.props,
                    parentType: curType,
                    jsonKey: currentJsonKey,
                    indexRoute: currentIndexRoute,
                    keyRoute: currentKeyRoute,
                    nodeKey: childNodeKey,
                    targetJsonSchema: currentSchemaData,
                  });
                },
              )}
            {jsonView && <JsonView {...this.props} maxLines={10} />}
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'object',
  component: ObjectSchema,
});

export default ObjectSchema;
