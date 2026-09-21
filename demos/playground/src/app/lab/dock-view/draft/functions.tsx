export const FunctionsComponent = () => {
  return (
    <GlobalFunctions>
      <SqlQueryUnified
        id="getRows"
        enableTransformer={true}
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        isMultiplayerEdited={false}
        query={include("./lib/getRows.sql", "string")}
        resourceDisplayName="retool_db"
        resourceName="dfd83a93-c142-41f0-b679-101136aafcda"
        resourceTypeOverride=""
        transformer="// type your code here
// example: return formatDataAsArray(data).filter(row => row.quantity > 20)
return formatDataAsArray(data)"
        warningCodes={[]}
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      />
      <SqlQueryUnified
        id="addNewRow"
        actionType="INSERT"
        changesetIsObject={true}
        changesetObject="{{ CreateUserForm1.data }}"
        editorMode="gui"
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        resourceDisplayName="retool_db"
        resourceName="dfd83a93-c142-41f0-b679-101136aafcda"
        resourceTypeOverride=""
        runWhenModelUpdates={false}
        tableName="users"
        transformer="// type your code here
// example: return formatDataAsArray(data).filter(row => row.quantity > 20)
return data"
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      >
        <Event
          id="57b13214"
          event="success"
          method="refresh"
          params={{ ordered: [] }}
          pluginId="dataTable"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
        <Event
          id="23952e4f"
          event="success"
          method="selectRow"
          params={{
            ordered: [
              {
                options: {
                  ordered: [
                    { mode: "index" },
                    { indexType: "display" },
                    { index: "{{dataTable.data.length-1}}" },
                    { key: null },
                  ],
                },
              },
            ],
          }}
          pluginId="dataTable"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
      </SqlQueryUnified>
      <SqlQueryUnified
        id="updateRow"
        actionType="UPDATE_BY"
        changesetIsObject={true}
        changesetObject="{{ UpdateUserForm1.data }}"
        doNotThrowOnNoOp={true}
        editorMode="gui"
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        filterBy={'[{"key":"id","value":"{{ dataTable.selectedRow.id }}","operation":"="}]'}
        resourceDisplayName="retool_db"
        resourceName="dfd83a93-c142-41f0-b679-101136aafcda"
        resourceTypeOverride=""
        runWhenModelUpdates={false}
        tableName="users"
        transformer="// type your code here
// example: return formatDataAsArray(data).filter(row => row.quantity > 20)
return data"
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      >
        <Event
          id="9c0fde7e"
          event="success"
          method="refresh"
          params={{ ordered: [] }}
          pluginId="dataTable"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
        <Event
          id="e385d68a"
          event="success"
          method="selectRow"
          params={{
            ordered: [
              {
                options: {
                  ordered: [
                    { mode: "key" },
                    { indexType: "display" },
                    { index: null },
                    { key: "{{ dataTable.selectedRow.id }}" },
                  ],
                },
              },
            ],
          }}
          pluginId="dataTable"
          type="widget"
          waitMs="0"
          waitType="debounce"
        />
      </SqlQueryUnified>
      <Function
        id="filteredTableData"
        funcBody={include("./lib/filteredTableData.js", "string")}
        runBehavior="debounced"
      />
      <State
        id="variable1"
        _persistedValueGetter={null}
        _persistedValueSetter={null}
        persistedValueKey=""
        persistValue={false}
      />
      <State
        id="variable2"
        _persistedValueGetter={null}
        _persistedValueSetter={null}
        persistedValueKey=""
        persistValue={false}
      />
      <RESTQuery
        id="query_action_1"
        body={'[{"key":"paramsbody1","value":"val1"}]'}
        bodyType="json"
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        headers={'[{"key":"paramheader1","value":"val1"}]'}
        query="?urlparam1=val1"
        queryFailureConditions={'[{"condition":"","message":""}]'}
        resourceDisplayName="datasetProduct"
        resourceName="e28c6d07-5eff-4a61-bf57-701acb540e1e"
        runWhenModelUpdates={false}
        transformer="// Query results are available as the `data` variable
return data"
        type="POST"
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      />
      <GoogleSheetsQuery
        id="button11ClickHandler"
        actionType="update"
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        resourceDisplayName="Sample GSheets"
        resourceName="Sample GSheets"
        resourceTypeOverride=""
        runWhenModelUpdates={false}
        transformer="// Query results are available as the `data` variable
return data"
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      />
      <RESTQuery
        id="button12ClickHandler"
        errorTransformer="// The variable 'data' allows you to reference the request's data in the transformer.
// example: return data.find(element => element.isError)
return data.error"
        resourceDisplayName="datasetProduct"
        resourceName="e28c6d07-5eff-4a61-bf57-701acb540e1e"
        transformer="// Query results are available as the `data` variable
return data"
        workflowActionType={null}
        workflowBlockPluginId={null}
        workflowBlockUuid={null}
        workflowRunId={null}
      />
    </GlobalFunctions>
  )
}
