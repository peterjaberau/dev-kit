import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd';
import {
  schema2json,
  getJsonDataByKeyRoute,
  getParentKeyRoute_CurKey,
  isEmptySchema,
} from '@wibetter/json-utils';
import { isEqual, objClone, saveWebCacheData } from '$utils/index';
import { isArray, isFunction, isObject } from '$utils/typeof';

interface RootJSONStore {
  JSONSchemaStore?: {
    jsonSchema?: any;
    getSchemaByKeyRoute?: (keyRoute: string) => any;
  };
}

interface DynamicData {
  name: string;
  [key: string]: any;
}

interface StoreState {
  rootJSONStore: RootJSONStore;
}

/**
 * A global store used to manage JSON data content.
 * */

export default class JSONEditorStore {
  state: StoreState;

  // Constructor
  constructor(rootJSONStore: RootJSONStore) {
    this.state = {
      rootJSONStore: rootJSONStore, // Initialize a rootJSONStore
    };
  }
  /**
   * rootJSONStore: The root data object for the store.
   */
  @observable rootJSONStore: RootJSONStore = {};

  /**
   * triggerChange: Used to force an update event to be triggered.
   */
  @observable triggerChange = false;

  /**
   * Record the current update time of the JSONEditor.
   */
  @observable lastUpdateTime = new Date().getTime();

  /**
   * jsonData: jsonData data object
   * Note: jsonData without extra data
   */
  @observable jsonData: any = null;

  /**
   * initJsonData: The initial data object for jsonData
   * Note: Used to record data content before schema structure changes.
   */
  @observable initJsonData: Record<string, any> = {};

  /**
   * dynamicDataList: List of dynamic data sources
   * Note: Primarily used in the DynamicDataSchema interface data/data source selection list.
   */
  @observable dynamicDataList: DynamicData[] = []; // Data source configuration
  @observable dynamicDataObj: Record<string, DynamicData> = {}; // The configuration object for the data source (mainly used for easy value retrieval)

  /**
   * Stores the data of the current configuration class object.
   */
  @observable options: Record<string, any> = {};

  /**
   * Supported request parameter types in DynamicData: Dynamic request parameters
   * Fixed-value parameters (scope: static): e.g., hardcoding a fixed parameter => framework=1
   * URL 参数（scope: url）： eg: pages?projectId=xxx => projectId=xxx
   * Hash parameter (scope: hash): e.g., /pages/:pageId => pageId=xxx
   * Environment variables (scope: window): e.g., variables in the code context => env=dev
   * API deployment (scope: dynamic): e.g., another API returns result fields =>
   * Page parameters (scope: page): e.g., event flow settings parameters
   * Parameters requiring user input (scope: input): e.g., event flow setting parameters
   */
  @observable dynamicDataApiScopeList = {
    static: 'fixed value',
    url: 'URL parameters',
    hash: 'Hash parameter',
    window: 'Environment Variables',
    dynamic: 'API distribution',
    page: 'Page Parameters',
    input: 'User input',
  };

  /**
   * onChange: The onChange event triggered by changes to the jsonData data.
   */
  @observable onChange: (data: any) => void = () => {}; // Function type

  /**
   * LastUpdateTime
   */
  @action.bound
  updateLastTime() {
    this.lastUpdateTime = new Date().getTime();
  }

  /**
   * triggerChangeAction: Used to actively trigger update events.
   */
  @action.bound
  triggerChangeAction() {
    this.triggerChange = !this.triggerChange;
  }

  /** Initialize jsonData */
  @action.bound
  initJSONData(jsonData: any) {
    // Avoid rendering the same data repeatedly (Note: Changes to the data itself will also trigger componentWillReceiveProps)
    const jsonSchema =
      this.state.rootJSONStore.JSONSchemaStore?.jsonSchema || {};
    // Filter the events that trigger initJSONData when the internal data of jsonData changes.
    if (!isEqual(jsonData, this.JSONEditorObj)) {
      this.initJsonData = objClone(this.jsonData); // Backup the data object before filtering
      // Generate a corresponding jsonData based on the jsonSchema
      if (jsonSchema && !isEmptySchema(jsonSchema)) {
        const newJsonData = schema2json(jsonSchema, jsonData || {});
        this.jsonData = Object.assign({}, jsonData, newJsonData);
        // this.jsonData = newJsonData;
        // Record the current initialization time
        this.updateLastTime();
      }
    }
    // console.info('[json-editor]initJSONData:', toJS(this.jsonData));
  }

  /** Initialize jsonData */
  @action.bound
  initOnChange(newOnChangeFunc: ((data: any) => void) | null | undefined) {
    if (newOnChangeFunc || isFunction(newOnChangeFunc)) {
      this.onChange = newOnChangeFunc as (data: any) => void;
    }
  }

  /** Set the list of dynamic data sources */
  @action.bound
  setDynamicDataList(dynamicDataList: DynamicData[]) {
    if (!isEqual(dynamicDataList, this.dynamicDataList)) {
      this.dynamicDataList = objClone(dynamicDataList);
      // Reassignment
      const dynamicDataObjTemp: Record<string, DynamicData> = {};
      dynamicDataList.map((dynamicData: DynamicData) => {
        dynamicDataObjTemp[dynamicData.name] = dynamicData;
      });
      this.dynamicDataObj = dynamicDataObjTemp;
    }
  }

  @action.bound
  setOptions(optionsData: Record<string, any> | null | undefined) {
    if (optionsData) {
      this.options = optionsData;
    }
  }

  @computed get JSONEditorObj() {
    return toJS(this.jsonData);
  }

  /** Trigger onChange */
  @action.bound
  jsonDataChange() {
    if (this.jsonData) {
      this.jsonData.lastUpdateTime = new Date().getTime(); // Record the current update timestamp
    }
    this.onChange(this.JSONEditorObj);
  }

  @action.bound
  jsonChange(newJsonData: any) {
    this.jsonData = newJsonData;
    this.jsonDataChange();
  }

  /** Retrieves JSON data based on the key index path [non-linked data retrieval] */
  @action.bound
  getJSONDataByKeyRoute(keyRoute: string, jsonDataParam?: any) {
    const curJsonData = jsonDataParam || this.jsonData;
    return getJsonDataByKeyRoute(keyRoute, curJsonData, true); // useObjClone: ​​true to avoid subsequent data linkage
  }

  /** Retrieves JSON data based on the key index path [non-linked data retrieval] */
  /* Note: Data is retrieved from initJsonData
* */
  @action.bound
  getInitJsonDataByKeyRoute(keyRoute: string, jsonDataParam?: any) {
    const curJsonData = jsonDataParam || this.initJsonData;
    return getJsonDataByKeyRoute(keyRoute, curJsonData, true); // useObjClone: ​​true to avoid subsequent data linkage
  }

  /** Update the corresponding JSON data based on the key path. */
  /* Note: To retrieve data from jsonData, you need to first obtain the parent object (in order to generate data interaction).
  * Then edit the current data based on the most recent key value.
* */
  @action.bound
  updateFormValueData(keyRoute: string, newVal: any, ignoreChange?: boolean) {
    let curElemSchema = null;
    if (this.state.rootJSONStore.JSONSchemaStore?.getSchemaByKeyRoute) {
      curElemSchema =
        this.state.rootJSONStore.JSONSchemaStore.getSchemaByKeyRoute(keyRoute);
    }
    // Save to cache: Save the current keyRoute to the cache before updating the data.
    if (keyRoute !== '' && newVal && curElemSchema) {
      if (curElemSchema && curElemSchema.type) {
        // Cache key format: ${keyRoute}-${type}, value: keyRoute
        saveWebCacheData(`${keyRoute}-${curElemSchema.type}`, newVal);
      }
    }

    if (keyRoute !== '') {
      // 1. Get the parent key path and the nearest key
      const parentKeyRoute_CurKey = getParentKeyRoute_CurKey(keyRoute);
      const parentKeyRoute: string = parentKeyRoute_CurKey[0];
      const curKey = parentKeyRoute_CurKey[1];
      // 2. Retrieve the parent data object
      const parentJsonDataObj = getJsonDataByKeyRoute(
        parentKeyRoute,
        this.jsonData,
      );
      // 3. Numerical Update
      if (parentJsonDataObj) {
        parentJsonDataObj[curKey] = newVal;
      } else {
        this.updateFormValueData(parentKeyRoute, {
          [curKey]: newVal,
        });
      }
    } else {
      // When keyRoute is empty, directly modify the current schemaData.
      this.jsonData = newVal;
    }

    if (curElemSchema && curElemSchema.isConditionProp) {
      // Shortcut for judging condition fields: If it is a condition field, update LastInitTime
      this.updateLastTime();
      // this.triggerChangeAction(); // Used to actively trigger component updates
    }

    if (!ignoreChange) {
      // 4. Trigger the onChange event
      this.jsonDataChange();
    }
  }

  /**
   * Delete the corresponding array element based on the key index path value (keyRoute) and the array value position (arrayIndex).
   * */
  @action.bound
  deleteArrayIndex(keyRoute: string, arrayIndex: number) {
    // 1. Get the array data object
    const arrJsonData = getJsonDataByKeyRoute(keyRoute, this.jsonData);
    if (isArray(arrJsonData)) {
      if (arrJsonData.length > 0) {
        // 2. Delete the corresponding data item
        arrJsonData.splice(arrayIndex, 1);
        this.triggerChangeAction(); // Used to actively trigger component updates
        // 3. Trigger the onChange event
        this.jsonDataChange();
      } else {
        message.warning('Deletion failed; the empty array object has no items to delete.');
      }
    }
  }

  /**
   * Add new data items to the array based on the key index path value (keyRoute).
   * */
  @action.bound
  addArrayItem ( keyRoute : string , curArrIndex ? : number ) {
    // 1. Get the array data object
    let arrJsonData = getJsonDataByKeyRoute(keyRoute, this.jsonData);
    /*
    if (!isArray(arrJsonData)) {
      arrJsonData = [];
    }
    */
    // const _arrJsonData = toJS(arrJsonData);
    if (isArray(arrJsonData)) {
      // 2. Get the first data item of the array
      let newArrItem = arrJsonData[curArrIndex || 0]; // Copy an array item
      if (isObject(newArrItem)) {
        newArrItem = Object.assign({}, newArrItem);
      }
      if (curArrIndex || curArrIndex === 0) {
        // Record the data after the insertion position first
        const endArr = arrJsonData.slice(Number(curArrIndex) + 1);
        const newArrJsonData = [newArrItem, ...endArr];
        // Delete data after the insertion position
        arrJsonData.splice(Number(curArrIndex) + 1);
        // Reinsert
        arrJsonData.push(...newArrJsonData);
      } else {
        arrJsonData.push(newArrItem);
      }
      this.triggerChangeAction(); // Used to actively trigger component updates
      // 3. Trigger the onChange event
      this.jsonDataChange();
    } else {
      message.warning('Data operation error: Current element is not an array.');
    }
  }

  /**
   * Move the specified data item order
   * keyRoute: Finds the current array element based on the key index path value (keyRoute).
   * curArrIndex: The position of the array item that needs to be moved.
   * sortAction：
   * */
  @action.bound
  sortArrayItem(keyRoute: string, curArrIndex: number, sortAction?: string) {
    // 1. Get the array data object
    const arrJsonData = getJsonDataByKeyRoute(keyRoute, this.jsonData);
    // const _arrJsonData = toJS(arrJsonData);
    if (isArray(arrJsonData)) {
      const curArrItem = objClone(arrJsonData[curArrIndex || 0]); // 2. Get the current array item
      let exchangeArrIndex = curArrIndex;
      if (sortAction === 'up' && exchangeArrIndex > 0) {
        // Move up
        exchangeArrIndex -= 1;
      } else if (sortAction === 'up' && exchangeArrIndex === 0) {
        message.warning('Data operation error: The current array item is already the first element.');
        return;
      } else if (sortAction === 'down' || !sortAction) {
        // Default move down
        exchangeArrIndex += 1;
        if (
          sortAction === 'down' &&
          exchangeArrIndex > arrJsonData.length - 1
        ) {
          message.warning('Data operation error: The current array item is the last element.');
          return;
        }
      }
      const exchangeArrItem = objClone(arrJsonData[exchangeArrIndex]); // 3. Retrieve the swapped array items
      // 2. Get the first data item of the array

      if (curArrItem !== undefined && exchangeArrItem !== undefined) {
        arrJsonData[curArrIndex] = exchangeArrItem;
        arrJsonData[exchangeArrIndex] = curArrItem;
        message.success(
          `The data content corresponding to the original data item ${curArrIndex + 1} has been updated.${
          sortAction === 'up' ? 'Up' : 'Down'}
        Move one level.`,
        5,
      );
        // Update LastInitTime
        this.updateLastTime();
        this.triggerChangeAction(); // Used to actively trigger component updates
        // 4. Trigger the onChange event
        this.jsonDataChange();
      }
    } else {
      message.warning('Data operation error: Current element is not an array.');
    }
  }
}
