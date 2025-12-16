import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'antd';
// @ts-ignore
import JSONEditor from '@wibetter/json-editor';
import JSONSchemaEditor from './main';
import '@wibetter/json-editor/lib/index.css';
import '../../../index.scss';

/**
 * Test Demo for json-schema-editor: Includes json-editor
 */
interface IndexDemoState {
  jsonSchema: any;
  jsonData: any;
  dynamicDataList: any[];
  wideScreen: boolean;
  jsonView: boolean;
  schemaCodeView: boolean;
  viewStyle: 'tabs' | 'fold';
  curTypeList: any;
  jsonViewReadOnly: boolean;
}

class IndexDemo extends React.PureComponent<{}, IndexDemoState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      jsonSchema: {

        type: 'object',

        name: 'circle',

        title: 'circle 圆弄图',

        properties: {

          props: {

            type: 'object',

            title: 'property settings',

            isFixed: true,

            properties: {

              flexDirection: {

                type: 'select',

                title: 'content arrangement direction',

                options: [

                  {
                    label: 'vertical (default)',

                    value: 'column',

                  },

                  {
                    label: 'horizontal',

                    value: 'row',

                  },

                ],

                description:

                  'flex-direction property: determines the direction of the main axis (i.e., the arrangement direction of elements inside the column-level container)',

                default: 'column',

              },

              field_10: {

                title: 'json data',

                type: 'json',

                default: '{\n"t1": 123\n}',

              },
            },
            propertyOrder: ['flexDirection', 'field_10'],
          },
          style: {
            type: 'object',
            title: 'Appearance settings',
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
          data: {
            type: 'object',
            title: 'Data Settings',
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
          event: {
            type: 'object',
            title: 'Event Settings',
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
        },
        propertyOrder: ['data', 'props', 'style', 'event'],
        lastUpdateTime: '2024-10-13T02:08:03.551Z',
      },
      jsonData: {},
      dynamicDataList: [
        {
          id: 3,
          projectId: 97,
          type: '1',
          title: 'Get Project Data Source Interface List',
          name: 'getProjectDataSource',
          desc: 'Get Project Data Source Interface List Array',
          url: 'http://dev.com:4000/project_datasource',
          method: 'GET',
          headers:

            '{"user-agent":"UA/chrome","content-type":"application/json"}',
          options:

            '{"cache":"no-cache","credentials":"*","mode":"cors","redirect":"follow"}',
          reqParams:
            '{"param1":{"title":"Parameter Name","scope":"static","value":"111"},"param2":{"title":"Parameter Name","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"Page ID","scope":"hash","name":"pId","value":"111"}}',

          dynamicParams:

            '{"param5":{"title":"Parameter Name","scope":"url","name":"pageId","value":"111"},"param7":{"title":"Parameter Name","scope":"dynamic","dataName":"api3","body":{"param2":{"title":{"Parameter Name","scope":"static","value":"222"},"param3":{"title":"Parameter Name","scope":"static","value":"333"}}}}',

          dynamicParams:

            '{"param5":{"title":"Parameter Name","scope":"url","name":"pageId","value":"111"}}}',

          respMock:

            '{"code":0,"data":[{"id":3,"projectId":89,"type":"1","title":"Get Project Data Source","name":"getProjectDataSource","desc":"Get Project Data Source","url":"http://dev.com:4000/project_datasource","method":"GET","headers":"{\\"user-agent\\":\\"chrome\\",\\"content-type\\":\\"application/json\\"}","options":"{\\"cache\\":\\"no-cache\\",\\"credentials\\":\\"same-origin\\",\\"mode\\":\\"cors\\",\\"redirect\\":\\"follow\\"}","reqParams":"{\\"param1\\":{\\"title\\":\\"Parameter Name\\" ,"scope":"static","value":"111"},"param2":{"title":"parameter name","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"page id","scope":"hash","name":"pId","value":"111"}}","dynamicParams":"{"param5":{"title":"parameter name","scope":"url","name":"pageId","value":"111"},"param7":{"title":"parameter name","scope":"dyn"} amic\\",\\"dataName\\":\\"api3\\",\\"body\\":{\\"param2\\":{\\"title\\":\\"Parameter Name\\",\\"scope\\":\\"static\\",\\"value\\":\\"222\\"},\\"param3\\":{\\"title\\":\\"Parameter Name\\",\\"scope\\":\\"static\\",\\"value\\":\\"333\\"}}}}","respMock":"{}","creatorId":2,"createdAt":"2020-08-20T03:09:29.000Z","updatedAt":"2020-08-20T03:09:29.000Z","deletedAt":null,"creator":{"id":2,"erp":"wangjianhui16"},"dataName":"getProjectDataSource","body":{"param1":{"titl e":"Parameter Name","scope":"static","value":"111"},"param2":{"title":"Parameter Name","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"Page ID","scope":"hash","name":"pId","value":"111"},"param5":{"title":"Parameter Name","scope":"url","name":"pageId","value":"111"},"param7":{"title":"Parameter Name","scope":"dynamic","dataName":"api3","body":{"param2":{"title":{"param2":{"title":"Parameter Name","scope":"static","value":"222"},"param3":{"title":"Parameter Name","scope":"static","value":"333"}}}}}]}', creatorId: 2,
          createdAt: '2020-08-20T03:09:29.000Z',
          updatedAt: '2020-08-20T12:40:19.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getProjectDataSource',
          body: '{"param1":{"title":"Parameter Name","scope":"static","value":"111"},"param2":{"title":"Parameter Name","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"Page ID","scope":"hash","name":"pId","value":"111"},"param5":{"title":"Parameter Name","scope":"url","name":"pageId","value":"111"},"param7":{"title":"Parameter Name","scope":"dynamic","dataName":"api3","body":{"param2":{"title":{"Parameter Name","scope":"static","value":"222"},"param3":{"title":"Parameter Name","scope":"static","value":"333"}}}}',

        },

        {
          id: 4,

          projectId: 97,
          type: '1',
          title: 'getAttr2',
          name: 'getAttr2',
          desc: 'getAttr2',
          url: 'http://getAttr2',
          method: 'POST',
          headers: null,
          options: null,
          reqParams: null,
          dynamicParams:
            '{\n "param1": {\n "title": "Parameter name",\n "scope": "static",\n "value": "111"\n },\n "param2": {\n "title": "Parameter name",\n "scope": "window",\n "name": "PARAM1",\n "value": "111"\n },\n "pageId": {\n "title": "pageid",\n "scope": "hash",\n "name": "pId",\n "value": "111"\n }\n }\n',
          respMock: null,
          creatorId: 2,
          createdAt: '2020-08-20T14:54:17.000Z',
          updatedAt: '2020-08-20T14:54:17.000Z',
          deletedAt: null,
          creator: {
            id: 2,
            erp: 'wangjianhui16',
          },
          dataName: 'getAttr2',
          body: '{"param1":{"title":"Parameter Name","scope":"static","value":"111"},"param2":{"title":"Parameter Name","scope":"window","name":"PARAM1","value":"111"},"pageId":{"title":"Page ID","scope":"hash","name":"pId","value":"111"}}',

        },

      ],
      wideScreen: false,

      jsonView: false,

      schemaCodeView: false, // schema source code mode

      viewStyle: 'tabs', // default collapsible mode

      curTypeList: {},

      jsonViewReadOnly: true,
    };
  }

  render() {
    const {
      jsonSchema,
      jsonData,
      dynamicDataList,
      wideScreen,
      schemaCodeView,
      jsonView,
      viewStyle,
      curTypeList,
      jsonViewReadOnly,
    } = this.state;
    return (
      <>
        <div className="title-container">
          <div className="title1-box">
            <p>
              <b className="title-name">json-schema-editor</b>:
              JSON data visualization/JSONSchema, editing JSON in form format
              schema. A configuration panel that can be used to design components online.
            </p>
            <div>
              Enable source code mode:
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={schemaCodeView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    schemaCodeView: checked,
                  });
                }}
              />
              {schemaCodeView && (
                <>
                  &nbsp;&nbsp;
                  <b>Enable Edit Mode</b>: &nbsp;&nbsp;
                  <Switch
                    style={{ display: 'inline-block' }}
                    defaultChecked={!jsonViewReadOnly}
                    checkedChildren="false"
                    unCheckedChildren="true"
                    onChange={(checked) => {
                      this.setState({
                        jsonViewReadOnly: !checked,
                      });
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className={`title2-box ${!wideScreen ? 'mobile-view' : ''}`}>
            <p>
              <b className="title-name">JSONEditor</b>:
              It provides a visual interface for editing JSON data, enabling visual configuration and preventing users from directly editing the JSON data.
            </p>
            <div>
              <b>Custom Display</b>: &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={wideScreen}
                checkedChildren="Large screen"
                unCheckedChildren="Small screen"
                onChange={(checked) => {
                  this.setState({
                    wideScreen: checked,
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={viewStyle === 'tabs' ? true : false}
                checkedChildren="tabs"
                unCheckedChildren="fold"
                onChange={(checked) => {
                  this.setState({
                    viewStyle: checked ? 'tabs' : 'fold',
                  });
                }}
              />
              &nbsp;&nbsp;
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={jsonView}
                checkedChildren="code"
                unCheckedChildren="view"
                onChange={(checked) => {
                  this.setState({
                    jsonView: checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="json-action-container">
          <div className="json-schema-box">
            <JSONSchemaEditor
              data={jsonSchema}
              typeList={curTypeList}
              jsonView={schemaCodeView}
              jsonViewReadOnly={jsonViewReadOnly}
              onChange={(newJsonSchema) => {
                this.setState({
                  jsonSchema: newJsonSchema,
                });
              }}
            />
          </div>
          <div
            className={`json-editor-box ${!wideScreen ? 'mobile-view' : ''}`}
          >
            <JSONEditor
              viewStyle={viewStyle}
              jsonView={jsonView} // code模式
              wideScreen={wideScreen} // 宽屏和小屏的配置项
              schemaData={jsonSchema}
              jsonData={jsonData}
              dynamicDataList={dynamicDataList}
              onChange={(newJsonData: any) => {
                this.setState({
                  jsonData: newJsonData,
                });
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <div>
    <h1 className="demoTitle">JSON Data Visualization/JSONSchema Demo</h1>

    <br />

    <IndexDemo />
  </div>,
  document.getElementById('root'),
);
