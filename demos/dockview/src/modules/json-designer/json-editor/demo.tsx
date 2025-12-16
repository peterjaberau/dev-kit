import * as React from "react"
import ReactDOM from "react-dom"
import { Switch } from "antd"
// @ts-ignore
import JSONSchemaEditor from "@wibetter/json-schema-editor"
// @ts-ignore
import { urlParse } from "@wibetter/json-utils"
import JSONEditor from "./main"
// import JSONEditor from '../lib/index';
import "@wibetter/json-schema-editor/lib/index.css"
import "../../../index.scss"

/**
 * JSONEditor的测试Demo
 */
class IndexDemo extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    const urlParams: any = urlParse()

    this.state = {
      jsonSchema: {
        type: "object",

        name: "circle",

        title: "circle 圆弄图",

        properties: {
          props: {
            type: "object",

            title: "property settings",

            isFixed: true,

            properties: {
              flexDirection: {
                type: "select",

                title: "content arrangement direction",

                options: [
                  {
                    label: "vertical (default)",

                    value: "column",
                  },

                  {
                    label: "horizontal",

                    value: "row",
                  },
                ],

                description:
                  "flex-direction property: determines the direction of the main axis (i.e., the arrangement direction of elements inside the column-level container)",

                default: "column",
              },

              field_10: {
                title: "json data",

                type: "json",

                default: '{\n"t1": 123\n}',
              },
            },
            propertyOrder: ["flexDirection", "field_10"],
          },
          style: {
            type: "object",
            title: "Appearance settings",
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
          data: {
            type: "object",
            title: "Data Settings",
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
          event: {
            type: "object",
            title: "Event Settings",
            isFixed: true,
            properties: {},
            propertyOrder: [],
          },
        },
        propertyOrder: ["data", "props", "style", "event"],
        lastUpdateTime: "2024-10-13T02:08:03.551Z",
      },
      jsonData: {},
      dynamicDataList: [
        {
          id: 1,

          projectId: 88,

          name: "getAttrs",

          type: "1",

          desc: "Get Attress List",

          url: "http://yapi.com/mock/522/test",

          method: "GET",

          title: "Attress List",

          headers: "",

          options: "",

          body: {
            param1: {
              title: "Parameter Name",

              scope: "static",

              value: "111",
            },

            param2: {
              title: "Parameter Name",

              scope: "window",

              name: "PARAM1",

              value: "111",
            },

            pageId: {
              title: "Page ID",

              scope: "hash",

              name: "pId",

              value: "111",
            },

            param5: {
              title: "Parameter Name",
              scope: "url",
              name: "pageId",
              value: "111",
            },
            param7: {
              title: "Parameter Name",
              scope: "dynamic",
              dataName: "api3",
              body: {
                param2: {
                  title: "Parameter Name",
                  scope: "static",
                  value: "222",
                },
                param3: {
                  title: "Parameter Name",
                  scope: "static",
                  value: "333",
                },
              },
            },
          },
          respMock:
            '{ "code": 0, "data": [ { "attrId": 1, "attrName": "Name1" }, { "attrId": 2, "attrName": "Name2" } ] }',
          creatorId: "2",
          createdTime: null,
          updatedTime: null,
          deletedTime: null,
        },
        {
          id: 2,

          projectId: 89,

          name: "getAttrs2",

          type: "1",

          desc: "Get Carousel Image List",

          url: "http://yapi.com/mock/522/test2",

          method: "GET",

          title: "Carousel Image List",

          headers: "",

          options: "",

          body: {
            param1: {
              title: "Parameter Name 222",

              scope: "static",

              value: "111",
            },

            param2: {
              title: "Parameter Name 22",

              scope: "window",

              name: "PARAM1",

              value: "111",
            },

            pageId: {
              title: "Page ID 22",

              scope: "hash",

              name: "pId",

              value: "111",
            },

            param5: {
              title: "Parameter Name 22",

              scope: "url",

              name: "pageId",

              value: "111",
            },
            param7: {
              title: "Parameter Name 22",
              scope: "dynamic",
              dataName: "api3",
              body: {
                param2: {
                  title: "Parameter Name",
                  scope: "static",
                  value: "222",
                },
                param3: {
                  title: "Parameter Name",
                  scope: "static",
                  value: "333",
                },
              },
            },
          },
          respMock:
            '{ "code": 0, "data": [ { "attrId": 1, "attrName": "Name 1" }, { "attrId": 2, "attrName": "Name 2" } ] }',
          creatorId: "2",
          createdTime: null,
          updatedTime: null,
          deletedTime: null,
        },
      ],
      options: {
        widgetType: "comp", // 组件类型 comp / page
        eventListenConfig: [
          {
            name: "changeTab",
            desc: "TabMenu菜单切换",
            code: "TPLTabMenu_1720691304950_tabChange",
            listenName: "TPLTabMenu_1720691304950",
          },
        ],
        eventEmitConfig: [
          {
            name: "click",
            desc: "点击事件",
            code: "CompTest1_1720691304953_click",
            compCode: "CompTest1_1720691304953",
          },
        ], // 组件触发事件
        allEmitEventList: [
          {
            name: "changeTab",
            desc: "TabMenu菜单切换",
            code: "TPLTabMenu_1720691304950_tabChange",
            compCode: "TPLTabMenu_1720691304950",
          },
          {
            name: "changeTab",
            desc: "TabMenu菜单切换2",
            code: "TPLTabMenu_1720691304952_tabChange",
            compCode: "TPLTabMenu_1720691304952",
          },
          {
            name: "click",
            desc: "点击事件",
            code: "CompTest1_1720691304953_click",
            compCode: "CompTest1_1720691304953",
          },
        ], // 全局可用事件列表
        metaContentKeyList: [
          {
            label: "全部内容",
            value: "ALLCONTENT",
          },
          {
            label: "title",
            value: "title",
          },
          {
            label: "id",
            value: "id",
          },
          {
            label: "newsMeta",
            value: "newsMeta",
          },
        ],
        globalMetaConfig: [
          {
            value: "zhejiang",
            label: "Zhejiang",
            children: [
              {
                value: "hangzhou",
                label: "Hangzhou",
                children: [
                  {
                    value: "xihu",
                    label: "West Lake",
                  },
                ],
              },
            ],
          },
          {
            value: "jiangsu",
            label: "Jiangsu",
            children: [
              {
                value: "nanjing",
                label: "Nanjing",
                children: [
                  {
                    value: "zhonghuamen",
                    label: "Zhong Hua Men",
                  },
                ],
              },
            ],
          },
        ],
        GlobalOptions: [{ value: "$Spacing-112" }, { value: "$Spacing-23" }, { value: "$Spacing-3" }],
        uploadAction: "https://mp.sohuno.com/commons/upload/file",
      },
      jsonView: urlParams['jsonView'] === 'true',
      schemaCodeView: false, // schema source code mode
      viewStyle: urlParams['viewStyle'] ?? 'tabs', // Default collapsible mode
      curTypeList: {},
      schemaViewReadOnly: true, // Whether the schema data is read-only
      jsonViewReadOnly: true, // Whether the JSON data is read-only
    }
  }

  render() {
    const {
      jsonSchema,
      jsonData,
      dynamicDataList,
      wideScreen,
      jsonView,
      schemaCodeView,
      viewStyle,
      curTypeList,
      options,
      schemaViewReadOnly,
      jsonViewReadOnly,
    } = this.state

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
                  <b>Enable Edit Mode</b>:
                  <Switch
                    style={{ display: 'inline-block' }}
                    defaultChecked={!schemaViewReadOnly}
                    checkedChildren="false"
                    unCheckedChildren="true"
                    onChange={(checked) => {
                      this.setState({
                        schemaViewReadOnly: !checked,
                      });
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className={`title2-box ${!wideScreen ? 'mobile-view' : ''}`}>
            <p>
              <b className="title-name">json-editor</b>:
              JSON data visualization/JSONEditor, allowing you to edit JSON data in form format.
              Data. Can be used to support visual configuration of components or pages.
            </p>
            <div>
              Enable source code mode:
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={wideScreen}
                checkedChildren="Large Screen"
                unCheckedChildren="small screen"
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
              {jsonView && (
                <>
                  &nbsp;&nbsp;
                  <b>Enable Edit Mode</b>:
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
        </div>
        <div className="json-action-container">
          <div className="json-schema-box">
            <JSONSchemaEditor
            jsonView={schemaCodeView}
            jsonViewReadOnly={schemaViewReadOnly}
            data={jsonSchema}
            typeList={curTypeList}
            onChange={(newJsonSchema: any) => {
            console.log('schemaDataChange', JSON.stringify(newJsonSchema));
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
              jsonView={jsonView} // Code mode
              jsonViewReadOnly={jsonViewReadOnly}
              wideScreen={wideScreen} // Configuration item for widescreen and small screen
              schemaData={jsonSchema}
              jsonData={jsonData}
              dynamicDataList={dynamicDataList}
              options={options}
              onChange={(newJsonData) => {
                console.log('jsonDataChange', JSON.stringify(newJsonData));
                this.setState({
                  jsonData: newJsonData,
                });
              }}
            />
          </div>

        </div>
      </>
    )
  }
}

ReactDOM.render(
  <div>
    <h1 className="page-title">JSON Data Visualization/JSONEditor Demo</h1>

    <br />

    <IndexDemo />
  </div>,
  document.getElementById("root"),
)
