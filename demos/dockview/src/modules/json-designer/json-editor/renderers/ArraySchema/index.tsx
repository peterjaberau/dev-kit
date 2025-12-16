import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { BaseRendererProps } from '$types/index';
import { toJS } from 'mobx';
import { message, Tooltip, Popconfirm } from 'antd';
import {
  RightOutlined,
  DownOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { truncate } from '@wibetter/json-utils';
import { saveJSONEditorCache, getJSONEditorCache } from '$utils/webCache';
import JsonView from '$components/JsonView/index';
import { isArray, isString, isURL, isColor, isObject } from '$utils/typeof';
import { buildStyle } from '$utils/index';
import { catchJsonDataByWebCache } from '$mixins/index';
import './index.scss';
// @ts-ignore
import DeleteIcon from '$assets/img/delete.svg';
// @ts-ignore
import AddElemIcon from '$assets/img/addElem.svg';
// @ts-ignore
import CodeIcon from '$assets/img/code.svg';

interface ArraySchemaState {
  currentActiveArrIndex: number;
  jsonView: boolean;
  isClosed: boolean;
  hoverIndex: number;
}

/**
 * Array type: Configuration field used to display array type
 * Features: Drag and drop sorting [Add], move sub-items up and down, add sub-items, copy sub-items, delete sub-items, collapse, source code mode switching
 * Display: Presented in the form of a folding panel
 */
class ArraySchema extends React.PureComponent<
  BaseRendererProps,
  ArraySchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);

    this.state = {
      currentActiveArrIndex: -1, // Records the currently expanded array item; by default, the first array item is expanded.
      jsonView: false, // Whether to display code mode
      isClosed: false, // Whether it is closed; the default is open.
      hoverIndex: -1, // Records the data item currently hovering over.
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.addArrayItem = this.addArrayItem.bind(this);
    this.deleteArrItem = this.deleteArrItem.bind(this);
    this.elemHoverEnterEvent = this.elemHoverEnterEvent.bind(this);
    this.elemHoverLeaveEvent = this.elemHoverLeaveEvent.bind(this);
    this.collapseChange = this.collapseChange.bind(this);
    this.arrayCollapseChange = this.arrayCollapseChange.bind(this);
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

  /** Add array item */
  addArrayItem = (keyRoute: string, curArr: any[], curArrIndex: number) => {
    const { addArrayItem } = this.props.jsonStore || {};
    const maximumChild = this.props.targetJsonSchema['maximum-child'];
    if (curArr && maximumChild && curArr.length >= maximumChild) {
      message.warning(`Add failed, a maximum of ${maximumChild} child items can be added`);
    } else {
      addArrayItem(keyRoute, curArrIndex);
    }
  };

  /** Delete array item */
  deleteArrItem = (keyRoute: string, arrIndex: number, curArr: any[]) => {
    const { deleteArrayIndex } = this.props.jsonStore || {};
    const minimumChild = this.props.targetJsonSchema['minimum-child'];
    if (curArr && minimumChild && curArr.length <= minimumChild) {
      message.warning(`Deletion failed; at least ${minimumChild} child items must be retained`);
    } else {
      deleteArrayIndex(keyRoute, arrIndex);
    }
  };

  /**
   * The onMouseEnter event for various elements
   */
  elemHoverEnterEvent = (event: React.MouseEvent, currentIndex: number) => {
    event.stopPropagation();

    // The current element is not selected and is not the element that was last hovered over.
    if (currentIndex !== this.state.hoverIndex) {
      this.setState({
        hoverIndex: currentIndex,
      });
    }
  };

  /**
   * The onMouseLeave event of various elements
   */
  elemHoverLeaveEvent = (event: React.MouseEvent, currentIndex: number) => {
    event.stopPropagation();
    // The current element is not selected and is not the element that was last hovered over.
    if (currentIndex === this.state.hoverIndex) {
      this.setState({
        hoverIndex: -1,
      });
    }
  };

  /**
   * Get the title of the current array item: By default, the title of an array item is the value of its first non-empty child item.
   */
  getArrItemTitle = (arrItem: any) => {
    if (arrItem && isObject(arrItem)) {
      const arrItemKeys = Object.keys(arrItem);
      for (let index = 0, size = arrItemKeys.length; index < size; index++) {
        const itemVal = arrItem[arrItemKeys[index]];
        // Only assign a value if it is not empty (ignore URL type numeric values)
        if (
          itemVal &&
          isString(itemVal) &&
          !isURL(itemVal) &&
          !isColor(itemVal)
        ) {
          return itemVal;
        }
      }
    } else {
      return arrItem;
    }
    return '';
  };

  collapseChange(event: React.MouseEvent) {
    const { keyRoute } = this.props;
    const { isClosed } = this.state;

    this.setState({
      isClosed: !isClosed,
    });
    event.preventDefault();
    event.stopPropagation();

    // Cache the current collapsed state
    saveJSONEditorCache(keyRoute!, String(!isClosed));
  }

  arrayCollapseChange(event: React.MouseEvent, arrIndex: number) {
    const { keyRoute } = this.props;
    const { currentActiveArrIndex } = this.state;
    const newArrIndex = currentActiveArrIndex === arrIndex ? -1 : arrIndex;

    this.setState({
      currentActiveArrIndex: newArrIndex,
    });
    event.preventDefault();
    event.stopPropagation();

    // Cache the current collapsed state
    saveJSONEditorCache(`${keyRoute}-activeArrIndex`, newArrIndex);
  }

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute, sortArrayItem } = jsonStore || {};

    const {
      keyRoute,
      jsonKey,
      nodeKey,
      indexRoute,
      targetJsonSchema,
      renderChild,
    } = this.props;
    const {
      jsonView,
      isClosed: _isClosed,
      currentActiveArrIndex: _currentActiveArrIndex,
    } = this.state;
    const curType = targetJsonSchema.type;
    // Should the source code switching button be displayed?
    const showCodeViewBtn = targetJsonSchema.showCodeViewBtn ?? true;
    // Retrieve the corresponding value from jsonData
    let curJsonData = getJSONDataByKeyRoute(keyRoute); // JSON content data
    if (!curJsonData || curJsonData.length === 0 || !isArray(curJsonData)) {
      // Add a default array of data
      curJsonData = [{}];
    }
    const arrayItemsDataObj: any = targetJsonSchema.items; // schema数据

    // Retrieve folded data from the front-end cache
    let isClosed = _isClosed;
    const collapseCacheData = getJSONEditorCache(keyRoute!);
    if (collapseCacheData !== undefined) {
      isClosed = collapseCacheData;
    }
    let currentActiveArrIndex = _currentActiveArrIndex;
    const activeArrIndexCache = getJSONEditorCache(
      `${keyRoute}-activeArrIndex`,
    );
    if (activeArrIndexCache !== undefined) {
      currentActiveArrIndex = activeArrIndexCache;
    }

    const boxTitle = targetJsonSchema.boxTitle ?? 'Data Configuration';

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
        // key={`${nodeKey}-${triggerChange}`}
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
                <span>（{truncate(jsonKey!, { length: 15 })}）</span>
              )}
            </span>
          </Tooltip>
          {pageScreen === 'mobileScreen' && targetJsonSchema.description && (
            <Tooltip title={targetJsonSchema.description} placement="top">
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
          )}
        </div>
        <div className="array-schema-box content-item" style={contentStyle}>
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

            <Tooltip title="Add Data Item">
              <PlusOutlined
                // src={addElemIcon}
                className="array-add-child-btn"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  this.addArrayItem(keyRoute!, curJsonData, curJsonData.length);
                  event.preventDefault();
                  event.stopPropagation();
                }}
              />
            </Tooltip>
          </div>
          <div
            className={`array-content ${jsonView ? 'json-view-array' : ''} ${
              isClosed ? 'closed' : ''
            }`}
          >
            {!jsonView &&
              isArray(curJsonData) &&
              curJsonData.map((arrItem: any, arrIndex: number) => {
                const curNodeKey = `${nodeKey}-array-items-${curJsonData.length}-${arrIndex}`;
                const curIndexRoute = indexRoute ? `${indexRoute}-0` : '0';
                const curKeyRoute = keyRoute
                  ? `${keyRoute}-${arrIndex}`
                  : `${arrIndex}`;
                const arrTitle = this.getArrItemTitle(arrItem); // Get the value of the first non-empty element of the array item
                return (
                  <div className="array-item" key={curKeyRoute}>
                    <div
                      className="array-item-header"
                      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        this.arrayCollapseChange(event, arrIndex);
                      }}
                      onMouseMove={(
                        event: React.MouseEvent<HTMLDivElement>,
                      ) => {
                        this.elemHoverEnterEvent(event, arrIndex);
                      }}
                      onMouseLeave={(
                        event: React.MouseEvent<HTMLDivElement>,
                      ) => {
                        this.elemHoverLeaveEvent(event, arrIndex);
                      }}
                    >
                      <div className="array-title-text">
                        {arrTitle
                          ? arrTitle
                          : `${arrayItemsDataObj.title}/${arrIndex + 1}`}
                      </div>
                      <div className="array-operate-box">
                        {currentActiveArrIndex !== arrIndex ? (
                          <RightOutlined className="close-operate-btn array-operate-btn" />
                        ) : (
                          <DownOutlined className="close-operate-btn array-operate-btn" />
                        )}
                        <Tooltip
                          title={`Delete${arrayItemsDataObj.title}/${arrIndex + 1}`}
                        >
                          <Popconfirm
                            placement="top"
                            title={`Confirm you want to delete ${arrayItemsDataObj.title}/${
                              arrIndex + 1
                            }?`}
                            onCancel={(event?: React.MouseEvent) => {
                              event?.preventDefault();
                              event?.stopPropagation();
                            }}
                            onConfirm={(event?: React.MouseEvent) => {
                              this.deleteArrItem(
                                keyRoute!,
                                arrIndex,
                                curJsonData,
                              );
                              event?.preventDefault();
                              event?.stopPropagation();
                            }}
                            okText="OK"
                            cancelText="Cancel"
                          >
                            <DeleteIcon
                              // <img src={deleteIcon}
                              className="delete-operate-btn array-operate-btn"
                              onClick={(event: React.MouseEvent) => {
                                event?.preventDefault();
                                event?.stopPropagation();
                              }}
                            />
                          </Popconfirm>
                        </Tooltip>
                        <Tooltip title={'Copy'}>


                            <AddElemIcon
                              className="array-operate-btn"
                              onClick={(event: React.MouseEvent) => {
                              this.addArrayItem(
                                keyRoute!,
                                curJsonData,
                                arrIndex,
                                );
                              event.preventDefault();
                              event.stopPropagation();
                            }}
                              />
                              </Tooltip>

                            {arrIndex !== 0 && (
                              <Tooltip title={'Move Up'}>
                            <ArrowUpOutlined
                              className="array-operate-btn"
                              onClick={(
                                event: React.MouseEvent<HTMLElement>,
                              ) => {
                                sortArrayItem(keyRoute!, arrIndex, 'up');
                                event?.preventDefault();
                                event?.stopPropagation();
                              }}
                            />
                        </Tooltip>
                            )}
                        {
                          arrIndex !== curJsonData.length - 1 && (
                          <Tooltip title={'Move Down'}>
                            <ArrowDownOutlined
                              className="array-operate-btn"
                              onClick={(event: React.MouseEvent) => {
                                if (keyRoute) {
                                  sortArrayItem?.(keyRoute, arrIndex, 'down');
                                }
                                event?.preventDefault();
                                event?.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    <div
                      className={`array-item-content ${currentActiveArrIndex === arrIndex ? 'open' : 'closed'}`}
                      // key={curNodeKey}
                      // id={curNodeKey}
                    >
                      {renderChild({
                        parentType: curType,
                        jsonKey: 'items',
                        indexRoute: curIndexRoute,
                        keyRoute: curKeyRoute,
                        nodeKey: curNodeKey,
                        targetJsonSchema: arrayItemsDataObj,
                        isArrayItem: true,
                        arrIndex: arrIndex,
                      })}
                    </div>
                  </div>
                );
              })}
            {jsonView && <JsonView {...this.props} />}
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'array',
  component: ArraySchema,
});

export default ArraySchema;
