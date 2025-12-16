import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { Tooltip } from 'antd';
import {
  DownOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import JsonView from '$components/JsonView/index';
import { catchJsonDataByWebCache } from '$mixins/index';
import { buildStyle } from '$utils/index';
// @ts-ignore
import CodeIcon from '$assets/img/code.svg';

interface EventSchemaProps {
  parentType?: string;
  jsonKey?: string;
  indexRoute?: string;
  keyRoute?: string;
  nodeKey?: string;
  targetJsonSchema?: any;
  schemaStore?: any;
  jsonStore?: any;
  renderChild?: any;
}

interface EventSchemaState {
  jsonView: boolean;
  isClosed: boolean;
}

class EventSchema extends React.PureComponent<
  EventSchemaProps,
  EventSchemaState
> {
  constructor(props: EventSchemaProps) {
    super(props);

    this.state = {
      jsonView: false, // Whether to display code mode
      isClosed: false, // Whether it is closed; the default is open.
    };
  }

  componentWillMount() {
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps: EventSchemaProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const {
      keyRoute,
      jsonKey,
      nodeKey,
      indexRoute,
      targetJsonSchema,
      renderChild,
    } = this.props;
    const curType = targetJsonSchema.type;
    const { jsonView, isClosed } = this.state;

    const typeDataObj = targetJsonSchema.properties.type || {};
    // Data object for registering event types: on
    const registerJsonObj = targetJsonSchema.properties.register || {};
    const actionFuncJsonObj = targetJsonSchema.properties.actionFunc || {};
    // Data object that triggers an event: emit
    const triggerJsonObj = targetJsonSchema.properties.trigger || {};
    const eventDataJsonObj = targetJsonSchema.properties.eventData || {};
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
            <span className="title-text">Event Configuration</span>
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
            {!jsonView && dataType === 'on' && (
              <>
                {registerJsonObj &&
                  renderChild({
                    rendererType: 'input',
                    parentType: curType,
                    jsonKey: 'register',
                    indexRoute: indexRoute ? `${indexRoute}-1` : '1',
                    keyRoute: keyRoute ? `${keyRoute}-register` : 'register',
                    nodeKey: `${nodeKey}-register`,
                    targetJsonSchema: registerJsonObj,
                  })}
                {actionFuncJsonObj &&
                  renderChild({
                    rendererType: 'codearea',
                    parentType: curType,
                    jsonKey: 'actionFunc',
                    indexRoute: indexRoute ? `${indexRoute}-2` : '2',
                    keyRoute: keyRoute
                      ? `${keyRoute}-actionFunc`
                      : 'actionFunc',
                    nodeKey: `${nodeKey}-actionFunc`,
                    targetJsonSchema: actionFuncJsonObj,
                  })}
              </>
            )}
            {!jsonView && dataType === 'emit' && (
              <>
                {triggerJsonObj &&
                  renderChild({
                    rendererType: 'input',
                    parentType: curType,
                    jsonKey: 'trigger',
                    indexRoute: indexRoute ? `${indexRoute}-1` : '1',
                    keyRoute: keyRoute ? `${keyRoute}-trigger` : 'trigger',
                    nodeKey: `${nodeKey}-trigger`,
                    targetJsonSchema: triggerJsonObj,
                  })}
                {eventDataJsonObj &&
                  renderChild({
                    rendererType: 'json',
                    parentType: curType,
                    jsonKey: 'eventData',
                    indexRoute: indexRoute ? `${indexRoute}-2` : '2',
                    keyRoute: keyRoute ? `${keyRoute}-eventData` : 'eventData',
                    nodeKey: `${nodeKey}-eventData`,
                    targetJsonSchema: eventDataJsonObj,
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
  type: 'event',
  component: EventSchema,
});

export default EventSchema;
