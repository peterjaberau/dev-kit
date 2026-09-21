export const Main = () => {
  return (
    <App>
      <Include src="./functions.rsx" />
      <Frame
        id="$main"
        _disclosedFields={{ array: [] }}
        isHiddenOnDesktop={false}
        isHiddenOnMobile={false}
        padding="8px 12px"
        paddingType="normal"
        sticky={false}
        type="main"
      >
        <Button id="button1" marginType="normal" text="Control Components">
          <Event
            id="a2549b54"
            event="click"
            method="clearChangeset"
            params={{ ordered: [] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="886f01f7"
            event="click"
            method="clearFilter"
            params={{ ordered: [{ id: "123" }] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="7e94471c"
            event="click"
            method="exportData"
            params={{
              ordered: [
                {
                  options: {
                    object: {
                      fileName: "export",
                      fileType: "csv",
                      includeHiddenColumns: true,
                    },
                  },
                },
              ],
            }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="3c424e69"
            event="click"
            method="refresh"
            params={{ ordered: [] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="eb5d37de"
            event="click"
            method="scrollIntoView"
            params={{
              ordered: [
                {
                  options: {
                    ordered: [{ block: "nearest" }, { behavior: "smooth" }],
                  },
                },
              ],
            }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="72e8873b"
            event="click"
            method="selectRow"
            params={{
              ordered: [
                {
                  options: {
                    ordered: [{ mode: "index" }, { indexType: "data" }, { index: "2" }, { key: null }],
                  },
                },
              ],
            }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="c3345c90"
            event="click"
            method="setHidden"
            params={{ ordered: [{ hidden: true }] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="31d2afc5"
            event="click"
            method="setPage"
            params={{ ordered: [{ page: "2" }] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="24f68c27"
            event="click"
            method="clearChangeset"
            params={{ ordered: [] }}
            pluginId="table1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="ae5fd1be"
            event="click"
            method="setDisabled"
            params={{ ordered: [] }}
            pluginId="button2"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="24ac9e0a"
            event="click"
            method="submit"
            params={{ ordered: [] }}
            pluginId="form1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="0db37516"
            event="click"
            method="setData"
            params={{ ordered: [{ data: "{}" }] }}
            pluginId="form1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="bec147e2"
            event="click"
            method="scrollIntoView"
            params={{
              ordered: [{ options: { object: { block: "nearest", behavior: "auto" } } }],
            }}
            pluginId="formButton1"
            type="widget"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button7" marginType="normal" text="Set variable">
          <Event
            id="96e97ebd"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="addNewRow"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="af3aa933"
            event="click"
            method="setValue"
            params={{
              ordered: [{ value: '{\n  "firstName": "Peter",\n"lastName": "Jaber"\n}' }],
            }}
            pluginId="variable2"
            type="state"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="c99d7b8b"
            event="click"
            method="setIn"
            params={{ ordered: [{ keyPath: "firstName" }, { value: "Peter1" }] }}
            pluginId="variable2"
            type="state"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button3" marginType="normal" text="Run Script">
          <Event
            id="7748abdd"
            event="click"
            method="run"
            params={{ ordered: [{ src: "button4.text = button1.text" }] }}
            pluginId=""
            type="script"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button8" marginType="normal" text="Set local storage">
          <Event
            id="c31034ad"
            event="click"
            method="clear"
            params={{ ordered: [] }}
            pluginId=""
            type="localStorage"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="1f5a622c"
            event="click"
            method="setValue"
            params={{
              ordered: [{ key: "ibStorageKey" }, { newValue: '{\n"country": "Australia",\n"city": "Sydney"\n}' }],
            }}
            pluginId=""
            type="localStorage"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Container
          id="container1"
          footerPadding="4px 12px"
          headerPadding="4px 12px"
          marginType="normal"
          padding="12px"
          showBody={true}
          showHeader={true}
        >
          <Header>
            <Text id="containerTitle1" marginType="normal" value="#### Container title" verticalAlign="center" />
          </Header>
          <View id="a9763" viewKey="View 1" />
        </Container>
        <Button id="button5" marginType="normal" text="Show notification">
          <Event
            id="1b25bb9b"
            event="click"
            method="showNotification"
            params={{
              ordered: [
                {
                  options: {
                    ordered: [
                      { notificationType: "info" },
                      { title: "notify title" },
                      { description: "{{button1.text}} description here" },
                      { duration: "5" },
                    ],
                  },
                },
              ],
            }}
            pluginId=""
            type="util"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button9" marginType="normal" text="Goto Url">
          <Event
            id="61713ca9"
            event="click"
            method="openUrl"
            params={{
              ordered: [{ url: "https://www.google.com" }, { options: { ordered: [{ forceReload: true }] } }],
            }}
            pluginId=""
            type="util"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button6" marginType="normal" text="Copy to clipboard">
          <Event
            id="fb809cfb"
            event="click"
            method="copyToClipboard"
            params={{ ordered: [{ value: "copied: {{current_user.email}}" }] }}
            pluginId=""
            type="util"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button12" marginType="normal" submit={true} submitTargetId="form1" text="Workflow" />
        <Button id="button11" marginType="normal" text="Control Query">
          <Event
            id="06ccff5e"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="getRows"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="e0c1cbd3"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="addNewRow"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="6c34b01b"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="updateRow"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="e8ec1ffa"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="query_action_1"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
          <Event
            id="efa18615"
            event="click"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="button11ClickHandler"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button10" marginType="normal" text="Goto App">
          <Event
            id="c34485c4"
            event="click"
            method="openApp"
            params={{
              ordered: [
                { uuid: "6c16f002-56cb-11ee-822d-abb2c5fcf73c" },
                {
                  options: {
                    ordered: [
                      {
                        queryParams: [
                          { ordered: [{ key: "qinput1" }, { value: "val1" }] },
                          { ordered: [{ key: "qinput4" }, { value: "val4" }] },
                          { ordered: [{ key: "" }, { value: "" }] },
                        ],
                      },
                      {
                        hashParams: [{ ordered: [{ key: "qinput2" }, { value: "valhash2" }] }],
                      },
                      { newTab: true },
                    ],
                  },
                },
              ],
            }}
            pluginId=""
            type="util"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button13" marginType="normal" text="Export Data">
          <Event
            id="9ff95a5b"
            event="click"
            method="exportData"
            params={{
              ordered: [
                { fileType: "json" },
                { data: "{{getRows}}" },
                { options: { ordered: [{ sheetName: "exportedlist" }] } },
              ],
            }}
            pluginId=""
            type="util"
            waitMs="0"
            waitType="debounce"
          />
        </Button>
        <Button id="button2" marginType="normal" text="Button" />
        <Button id="button4" marginType="normal" text="Button" />
        <Table
          id="table1"
          cellSelection="none"
          clearChangesetOnSave={true}
          data="{{ getRows.data }}"
          defaultSelectedRow={{ mode: "index", indexType: "display", index: 0 }}
          enableSaveActions={true}
          primaryKeyColumnId="89bef"
          rowHeight="small"
          showBorder={true}
          showFooter={true}
          showHeader={true}
          toolbarPosition="bottom"
        >
          <Column
            id="89bef"
            alignment="right"
            editableOptions={{ showStepper: true }}
            format="decimal"
            formatOptions={{ showSeparators: true, notation: "standard" }}
            groupAggregationMode="sum"
            key="id"
            label="ID"
            placeholder="Enter value"
            position="center"
            size={100}
            summaryAggregationMode="none"
          />
          <Column
            id="fe1b5"
            alignment="left"
            format="string"
            groupAggregationMode="none"
            key="name"
            label="Name"
            placeholder="Enter value"
            position="center"
            size={100}
            summaryAggregationMode="none"
          />
          <Column
            id="71fdf"
            alignment="left"
            format="link"
            formatOptions={{ showUnderline: "hover" }}
            groupAggregationMode="none"
            key="email"
            label="Email"
            position="center"
            size={100}
            summaryAggregationMode="none"
          />
          <Column
            id="a62c4"
            alignment="left"
            format="datetime"
            groupAggregationMode="none"
            key="signup_date"
            label="Signup date"
            placeholder="Enter value"
            position="center"
            size={100}
            summaryAggregationMode="none"
          />
          <Column
            id="d4103"
            alignment="left"
            format="tag"
            formatOptions={{ automaticColors: true }}
            groupAggregationMode="none"
            key="role"
            label="Role"
            placeholder="Select option"
            position="center"
            size={100}
            summaryAggregationMode="none"
            valueOverride="{{ _.startCase(item) }}"
          />
          <Column
            id="bab7e"
            alignment="left"
            format="boolean"
            groupAggregationMode="none"
            key="enabled"
            label="Enabled"
            placeholder="Enter value"
            position="center"
            size={100}
            summaryAggregationMode="none"
          />
          <ToolbarButton id="1a" icon="bold/interface-text-formatting-filter-2" label="Filter" type="filter" />
          <ToolbarButton id="3c" icon="bold/interface-download-button-2" label="Download" type="custom">
            <Event
              id="62ce8c87"
              event="clickToolbar"
              method="exportData"
              pluginId="table1"
              type="widget"
              waitMs="0"
              waitType="debounce"
            />
          </ToolbarButton>
          <ToolbarButton id="4d" icon="bold/interface-arrows-round-left" label="Refresh" type="custom">
            <Event
              id="2955eaa6"
              event="clickToolbar"
              method="refresh"
              pluginId="table1"
              type="widget"
              waitMs="0"
              waitType="debounce"
            />
          </ToolbarButton>
        </Table>
        <Form
          id="form1"
          footerPadding="4px 12px"
          footerPaddingType="normal"
          headerPadding="4px 12px"
          headerPaddingType="normal"
          marginType="normal"
          padding="12px"
          paddingType="normal"
          requireValidation={true}
          resetAfterSubmit={true}
          showBody={true}
          showFooter={true}
          showHeader={true}
        >
          <Header>
            <Text id="formTitle1" marginType="normal" value="#### Form title" verticalAlign="center" />
          </Header>
          <Footer>
            <Button id="formButton1" marginType="normal" submit={true} submitTargetId="form1" text="Submit" />
          </Footer>
          <Event
            id="361ba3ee"
            event="submit"
            method="trigger"
            params={{ ordered: [] }}
            pluginId="button12ClickHandler"
            type="datasource"
            waitMs="0"
            waitType="debounce"
          />
        </Form>
      </Frame>
    </App>
  )
}