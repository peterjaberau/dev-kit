import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { registerRenderer } from '$core/factory';
import { toJS } from 'mobx';
import { BaseRendererProps } from '$types/index';
import { Tooltip } from 'antd';
import { truncate } from '@wibetter/json-utils';
import { catchJsonDataByWebCache } from '$mixins/index';
import {
  DownOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { buildStyle } from '$utils/index';
// Import editor component
import BraftEditor, { ControlType } from 'braft-editor';
// Import font color picker style
// @ts-ignore
import ColorPicker from 'braft-extensions/dist/color-picker';
import 'braft-extensions/dist/color-picker.css';
// Introduce table extensions (other extensions: https://github.com/margox/braft-extensions)
// @ts-ignore
import Table from 'braft-extensions/dist/table';
import 'braft-extensions/dist/table.css';
// Import editor styles
import 'braft-editor/dist/index.css';
import './index.scss';

const colorOptions = {
  theme: 'light', // Specifies the color picker style theme, supporting both dark and light styles.
};
BraftEditor.use([ColorPicker(colorOptions)]);

// Table configuration items
const tableOptions = {
  defaultColumns: 3, // Default number of columns
  defaultRows: 3, // Default number of rows
  withDropdown: false, // Whether to display a dropdown menu before inserting a table
  columnResizable: false, // Whether to allow dragging to adjust column width, defaults to false
  exportAttrString: 'border="1" style="border-collapse: collapse"', // Specifies the attribute string to be appended to the table tag when outputting HTML.
};
BraftEditor.use(Table(tableOptions));

interface TextEditorSchemaState {
  isClosed: boolean;
  allControls: ControlType[];
  baseControls: ControlType[];
}

class TextEditorSchema extends React.PureComponent<
  BaseRendererProps,
  TextEditorSchemaState
> {
  constructor(props: BaseRendererProps) {
    super(props);
    this.state = {
      isClosed: true, // Whether the device is closed; the default is closed.
      allControls: [
        'undo',
        'redo',
        'separator',
        'headings',
        'font-size',
        'line-height', // Note: Line height setting is invalid (bug to be fixed)
        'letter-spacing',
        'separator',
        'text-color',
        'bold',
        'italic',
        'underline',
        'strike-through',
        'separator',
        'superscript',
        'subscript',
        'remove-styles',
        // 'emoji', // Note: The database may not support emoji format.
        'separator',
        'text-indent',
        'text-align',
        'separator',
        'the list',
        'list-ol',
        'blockquote',
        'code',
        'separator',
        'link',
        'separator',
        'media',
        'table',
        'hr',
        // 'clear',
        'separator',
        'fullscreen',
      ],
      baseControls: ['font-size', 'text-color', 'bold', 'italic', 'fullscreen'],
    };
    // Binding here is necessary so that `this` can be used in the callback function.
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentWillMount() {
    const { pageScreen } = this.props.schemaStore || {};
    // Retrieve values ​​from web cache
    catchJsonDataByWebCache.call(this);
    if (pageScreen && pageScreen === 'wideScreen') {
      // The rich text editor expands by default on large screens.
      this.setState({
        isClosed: false,
      });
    }
  }

  componentWillReceiveProps(nextProps: BaseRendererProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** Retrieve the value from the web cache when the key path changes. */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    } else if (
      nextProps.schemaStore.pageScreen !== this.props.schemaStore.pageScreen
    ) {
      if (
        nextProps.schemaStore.pageScreen &&
        nextProps.schemaStore.pageScreen === 'wideScreen'
      ) {
        // The rich text editor expands by default on large screens.
        this.setState({
          isClosed: false,
        });
      }
    }
  }

  /** Rich text content change event handler */
  handleEditorChange = (editorState: any) => {
    const { keyRoute, jsonStore } = this.props;
    const { updateFormValueData } = jsonStore || {};
    updateFormValueData &&
    keyRoute &&
    updateFormValueData(keyRoute, editorState.toHTML()); // Update the value
  };

  render() {
    const { schemaStore, jsonStore } = this.props;
    const { pageScreen } = schemaStore || {};
    const { getJSONDataByKeyRoute } = jsonStore || {};
    const { keyRoute, jsonKey, nodeKey, targetJsonSchema } = this.props;
    const { isClosed } = this.state;
    const curJsonData =
      getJSONDataByKeyRoute && keyRoute && getJSONDataByKeyRoute(keyRoute); // Retrieves the corresponding HTML content from the JSONData.
    const editorState = BraftEditor.createEditorState(curJsonData); // Convert the HTML string to editorState
    const readOnly = targetJsonSchema.readOnly || false; // Whether to make it read-only (default is editable)
    // const isRequired = targetJsonSchema.isRequired || false; // Whether it is required (default is not required)

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
            ? 'text-editor-box wide-screen-element-warp'
            : 'text-editor-box mobile-screen-element-warp'
        }
        // key={nodeKey}
        id={nodeKey}
        style={style}
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
          style={titleStyle}
        >
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
          {isClosed ? (
            <RightOutlined className="close-operate-btn" />
          ) : (
            <DownOutlined className="close-operate-btn" />
          )}
        </div>
        <div
          className={`content-item ${isClosed ? 'closed' : ''}`}
          style={contentStyle}
        >
          <div className="form-item-box">
            <BraftEditor
              key={`${nodeKey}-textEditor`}
              controls={
                pageScreen === 'wideScreen'
                  ? this.state.allControls
                  : this.state.baseControls
              } // allControls baseControls
              media={{
                accepts: {
                  image:
                    'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
                  video: false,
                  audio: false,
                },
                pasteImage: true, // Whether to allow pasting images into the editor
              }}
              defaultValue={editorState}
              readOnly={readOnly}
              placeholder={
                targetJsonSchema.placeholder ||
                `Please enter ${targetJsonSchema.title}`
              }
              lineHeights={[1, 1.2, 1.5, 1.75, 2, 2.5, 3, 4]}
              onChange={this.handleEditorChange}
              onSave={this.handleEditorChange} // This method will be executed when Ctrl+S is pressed while the editor has focus.
            />
          </div>
        </div>
      </div>
    );
  }
}

// Register as a json-editor renderer
registerRenderer({
  type: 'text-editor',
  component: TextEditorSchema,
});

export default TextEditorSchema;
