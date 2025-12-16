import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import JSONStore from '$store/index';
import JSONSchema from '$components/JSONSchemaEditor/index';
import { BaseRendererProps } from '$types/index';

interface JSONSchemaEditorProps {
  wideScreen?: any;
  onChange?: (data: any) => void;
  data?: any;
  typeList?: any;
  element?: any;
  jsonView?: any;
  jsonViewReadOnly?: any;
}

interface JSONSchemaEditorState {
  schemaStore: any;
}

/**
 * JSON Schema functional components
 * @param props
 * @constructor
 */
export default class JSONSchemaEditor extends React.PureComponent<
  JSONSchemaEditorProps,
  JSONSchemaEditorState
> {
  constructor(props: JSONSchemaEditorProps) {
    super(props);

    this.state = {
      schemaStore: new (JSONStore.schemaStore as any)(), // Initialize a schemaStore
    };
  }

  render() {
    const { element } = this.props;
    const { schemaStore } = this.state;

    const renderContent = (
      <Provider schemaStore={schemaStore}>
        <JSONSchema {...(this.props as BaseRendererProps)} />
      </Provider>
    );

    if (element) {
      ReactDOM.render(renderContent, element); // Mount to the specified location
      return null;
    }
    return renderContent; // Directly output DOM element
  }
}
