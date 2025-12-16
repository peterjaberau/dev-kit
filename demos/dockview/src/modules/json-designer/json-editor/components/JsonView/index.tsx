import * as React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-solarized_light'; // ace-builds
import { isObject , isArray , isFunction } from ' @wibetter/json-utils ' ;
import './index.scss';

interface JsonViewProps {
  jsonData?: any;
  readOnly?: boolean;
  maxLines?: number;
  onChange?: (data: any) => void;
}

interface JsonViewState {
  isShowWarn: boolean; // Used to determine whether to display error messages.
  warnText: string; // Error content
  curJSONDataTemp?: string; // Used to record currently non-compliant JSON data
}

class JsonView extends React.PureComponent<JsonViewProps, JsonViewState> {
  constructor(props: JsonViewProps) {
    super(props);

    this.state = {
      isShowWarn: false, // Used to determine whether to display error messages.
      warnText: '', // Error content
      curJSONDataTemp: undefined, // Used to record currently non-compliant JSON data
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange = (newJsonData: any): void => {
    if (this.props.onChange && isFunction(this.props.onChange)) {
      this.props.onChange(newJsonData);
    }
  };

  render() {
    const { jsonData, readOnly: _readOnly, maxLines } = this.props;
    let curJsonData = jsonData || {};
    const { isShowWarn, warnText } = this.state;
    const readOnly = _readOnly || false;

    // Format JSON data
    curJsonData = curJsonData !== undefined ? curJsonData : curJsonData || '{}';
    // Check if the current jsonData is an object type
    if ( isObject ( curJsonData ) || isArray ( curJsonData )) {
      curJsonData = JSON.stringify(curJsonData, null, 2);
    }

    return (
      <div className="json-view-box">
        {readOnly && <div className="readOnly-btn">[Read-only]</div>}
        {isShowWarn && (
          <div className="warning-box code-area-item">
            <div className="warning-img">X</div>
            <div className="warning-text">{warnText}</div>
          </div>
        )}
        <AceEditor
          defaultValue={curJsonData}
          // value={hasProperties(curJSONDataTemp) ? curJSONDataTemp : curJsonData}
          className="json-view-ace"
          mode="json"
          theme="solarized_light"
          name="JSON_CODE_EDIT"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          readOnly={readOnly}
          minLines={5}
          maxLines={maxLines || 33}
          width={'100%'}
          setOptions={{
            useWorker: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          onChange={(newJsonData: string) => {
            try {
              const newJsonDataTemp = JSON.parse(newJsonData); // Perform formatting (mainly used to check if the data is valid JSON)
              // Update jsonData
              this.handleValueChange(newJsonDataTemp);
              this.setState({
                isShowWarn: false,
                curJSONDataTemp: undefined, // Reset
              });
            } catch (err: any) {
              // Update jsonData
              this.setState({
                curJSONDataTemp: newJsonData, // Records JSON data that is currently in an incorrect format.
                warnText: err.message,
                isShowWarn: true,
              });
            }
          }}
        />
      </div>
    );
  }
}

export default JsonView;
