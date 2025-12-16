import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Collapse, Tabs } from 'antd';
const { Panel } = Collapse;
const { TabPane } = Tabs;
import MappingRender from '$core/MappingRender'; // Normal mode
// import MappingRender from '$core/MappingRenderV2'; // On-demand loading mode
import JsonView from '$components/JsonView/index';
import {
  isEmptySchema,
  isStructuredSchema,
  json2schema,
  isEqualByIdT,
  isEqual,
} from '@wibetter/json-utils';
import {
  StoresInterface,
  BaseRendererProps,
  SchemaStore,
  JSONStore,
} from '$types/index';
import './index.scss';

interface JSONEditorProps {
  viewStyle?: string;
  wideScreen?: any;
  onChange?: (data: any) => void;
  jsonView?: any;
  jsonViewReadOnly?: boolean;
  schemaData?: any;
  jsonData?: any;
  dynamicDataList?: any[];
  options?: any;
  schemaStore: SchemaStore;
  jsonStore: JSONStore;
  [key: string]: any;
}

interface JSONDataEditorState {
  jsonView: boolean;
  viewStyle: 'fold' | 'tabs';
}

class JSONDataEditor extends React.PureComponent<
  JSONEditorProps,
  JSONDataEditorState
> {
  constructor(props: JSONEditorProps) {
    super(props);

    this.state = {
      jsonView: props.jsonView || false, // Whether to display code mode; code mode is not displayed by default.
      viewStyle: this.catchViewStyle(props.viewStyle || 'fold'), // Defaults to 'fold' (collapseable panel), optional: tabs: (tabs switch panels)
    };

    const { initJSONSchemaData, setPageScreen } = this.props.schemaStore || {};
    const { initJSONData, initOnChange, setDynamicDataList, setOptions } =
    this.props.jsonStore || {};

    // Initialize the jsonSchema based on props.schemaData
    if (props.schemaData) {
      initJSONSchemaData(props.schemaData);
      // Initialize jsonData based on props.jsonData
      initJSONData(props.jsonData);
    } else if (props.jsonData) {
      // When schemaData is empty but jsonData is not empty, try converting jsonData to jsonSchema.
      const jsonSchema = json2schema(props.jsonData); // Convert schema from JSON
      initJSONSchemaData(jsonSchema);
      // Initialize jsonData based on props.jsonData
      initJSONData(props.jsonData);
    }
    // Read the configuration for widescreen and small screen
    if (props.wideScreen) {
      setPageScreen(props.wideScreen);
    }
    // Record the onChange event
    if (props.onChange) {
      initOnChange(props.onChange);
    }

    // Get dynamicDataList (dynamic data source)
    if (props.dynamicDataList) {
      setDynamicDataList(props.dynamicDataList);
    }
    // Configuration data
    if (props.options) {
      setOptions(props.options);
    }
  }

  /* Get schema display style mode */
  catchViewStyle = (viewStyle: string) => {
    switch (viewStyle) {
      case 'fold':
        return 'fold';
      case 'tabs':
        return 'tabs';
      default:
        return 'fold';
    }
  };

  componentWillReceiveProps(nextProps: BaseRendererProps) {
    const { JSONSchemaChange, setPageScreen } = this.props.schemaStore || {};
    const {
      JSONEditorObj,
      initJSONData,
      initOnChange,
      setDynamicDataList,
      setOptions,
    } = this.props.jsonStore || {};
    /** 1. First initialize schemaData. If the formats of jsonData and schemaData are inconsistent, schemaData shall prevail. */
    if (!isEqualByIdT(nextProps.schemaData, this.props.schemaData)) {
      JSONSchemaChange(nextProps.schemaData);
    }
    /** 2. Initialize jsonData */
    if (!isEqual(nextProps.jsonData, JSONEditorObj)) {
      initJSONData(nextProps.jsonData);
    }
    // Read code mode configuration
    if (!isEqual(nextProps.jsonView, this.props.jsonView)) {
      this.setState({
        jsonView: nextProps.jsonView ?? false,
      });
    }
    // Read display mode configuration
    if (!isEqual(nextProps.viewStyle, this.props.viewStyle)) {
      this.setState({
        viewStyle: this.catchViewStyle(nextProps.viewStyle),
      });
    }
    if (!isEqual(nextProps.wideScreen, this.props.wideScreen)) {
      setPageScreen(nextProps.wideScreen);
    }
    // Record the onChange event
    if (!isEqual(nextProps.onChange, this.props.onChange)) {
      initOnChange(nextProps.onChange);
    }

    // Get dynamicDataList (dynamic data source)
    if (!isEqual(nextProps.dynamicDataList, this.props.dynamicDataList)) {
      setDynamicDataList(nextProps.dynamicDataList);
    }

    if (!isEqual(nextProps.options, this.props.options)) {
      setOptions(nextProps.options);
    }
  }

  /* Display the Title field, the first-level field in the schema */
  renderHeader = (format: string) => {
    switch (format) {
      case 'func':
        return 'Function Settings';
      case 'style':
        return 'Style Settings';
      case 'data':
        return 'Data Settings';
      default:
        return 'property settings';
    }
  };

  render() {
    const { schemaStore, jsonStore, jsonViewReadOnly } = this.props;
    const { jsonSchema, lastUpdateTime } = schemaStore || {};
    const {
      JSONEditorObj,
      lastUpdateTime: jsonLastUpdateTime,
      jsonChange,
    } = jsonStore || {};
    const { jsonView, viewStyle } = this.state;
    const isEmpty = isEmptySchema(jsonSchema); // Check if the schema is empty
    const isStructured = isStructuredSchema(jsonSchema); // Determine if the data is structured schema data
    /**
     * Note: The object is rendered separately here mainly to extract the Tree root component (so that the component-specific configuration data can be displayed here in categories).
     * */
    return (
      <div className="json-editor-container">
        {isEmpty && (
          <p className="json-editor-empty">The current jsonSchema contains no data</p>
        )}
        {!isEmpty && !jsonView && (
          <>
            {/* Rendered as a structural schema */}
            {isStructured && (
              <>
                {viewStyle === 'fold' && (
                  <Collapse
                    defaultActiveKey={jsonSchema.propertyOrder}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    {jsonSchema.propertyOrder.map(
                      (key: string, index: number) => {
                        /** 1. Get the path value of the current element */
                        const currentIndexRoute = index;
                        const currentKeyRoute = key; // key is the path value, which will be used later to extract the value of the current element from jsonData.
                        /** 2. Get the key value of the current element */
                        const currentJsonKey = key;
                        /** 3. Get the JSON structure object of the current element */
                        const currentSchemaData =
                          jsonSchema.properties[currentJsonKey];
                        const curType = currentSchemaData.type;

                        /** Get the ID of the current element, used as a unique identifier */
                        const nodeKey = `${lastUpdateTime}-${jsonLastUpdateTime}-${curType}-${currentJsonKey}`;

                        if (
                          currentSchemaData.propertyOrder &&
                          currentSchemaData.propertyOrder.length > 0
                        ) {
                          return (
                            <Panel
                              header={
                                currentSchemaData.title ||
                                this.renderHeader(curType)
                              }
                              key={`${key}-${index}`}
                              // key={currentJsonKey}
                            >
                              {MappingRender({
                                parentType: curType,
                                jsonKey: currentJsonKey,
                                indexRoute: currentIndexRoute,
                                keyRoute: currentKeyRoute,
                                nodeKey,
                                targetJsonSchema: currentSchemaData,
                                isStructuredSchema: isStructured,
                                schemaStore,
                                jsonStore,
                              })}
                            </Panel>
                          );
                        }
                        return '';
                      },
                    )}
                  </Collapse>
                )}
                {viewStyle === 'tabs' && (
                  <Tabs
                    className={`tabs-schema-box`}
                    defaultActiveKey={jsonSchema.propertyOrder[0]}
                    centered={true}
                    hideAdd={true}
                  >
                    {jsonSchema.propertyOrder.map(
                      (key: string, index: number) => {
                        /** 1. Get the path value of the current element */
                        const currentIndexRoute = index;
                        const currentKeyRoute = key; // key is the path value, which will be used later to extract the value of the current element from jsonData.
                        /** 2. Get the key value of the current element */
                        const currentJsonKey = key;
                        /** 3. Get the JSON structure object of the current element */
                        const currentSchemaData =
                          jsonSchema.properties[currentJsonKey];
                        const curType = currentSchemaData.type;

                        /** 5. Get the ID of the current element, used as a unique identifier */
                        const nodeKey = `${lastUpdateTime}-${jsonLastUpdateTime}-${curType}-${currentJsonKey}`;

                        if (
                          currentSchemaData.propertyOrder &&
                          currentSchemaData.propertyOrder.length > 0
                        ) {
                          return (
                            <TabPane
                              tab={
                                currentSchemaData.title ||
                                this.renderHeader(curType)
                              }
                              key={`${key}-${index}`}
                              // key={currentJsonKey}
                              closable={false}
                              className={`tabs-schema-item`}
                            >
                              {MappingRender({
                                parentType: curType,
                                jsonKey: currentJsonKey,
                                indexRoute: currentIndexRoute,
                                keyRoute: currentKeyRoute,
                                nodeKey,
                                targetJsonSchema: currentSchemaData,
                                isStructuredSchema: isStructured,
                                schemaStore,
                                jsonStore,
                              })}
                            </TabPane>
                          );
                        }
                        return '';
                      },
                    )}
                  </Tabs>
                )}
              </>
            )}
            {/* Render as regular schema data */}
            {!isStructured && (
              <>
                {MappingRender({
                  parentType: '',
                  jsonKey: '',
                  indexRoute: '',
                  keyRoute: '',
                  nodeKey: '',
                  targetJsonSchema: jsonSchema,
                  schemaStore,
                  jsonStore,
                })}
              </>
            )}
          </>
        )}
        {!isEmpty && jsonView && (
          <JsonView
            // key={`${lastUpdateTime}-${jsonLastUpdateTime}-jsonView`}
            jsonData={JSONEditorObj}
            readOnly={jsonViewReadOnly ?? true}
            onChange={jsonChange}
            maxLines={30}
          />
        )}
      </div>
    );
  }
}

export default inject((stores: StoresInterface) => ({
  schemaStore: stores.JSONSchemaStore,
  jsonStore: stores.JSONEditorStore,
}))(observer(JSONDataEditor));
