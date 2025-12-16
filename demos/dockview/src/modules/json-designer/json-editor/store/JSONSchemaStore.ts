import { observable, computed, action, toJS } from 'mobx';
import {
  schema2json,
  isNewSchemaData,
  indexRoute2keyRoute,
  keyRoute2indexRoute,
  oldSchemaToNewSchema,
  getSchemaByIndexRoute,
  isEqual,
  objClone,
  TypeDataList,
} from '@wibetter/json-utils';
import { JSONSchema } from '$types/index';

const initJSONSchemaData = TypeDataList.jsonschema;

// RootJSONStore Interface Definition
interface RootJSONStore {
  JSONSchemaStore?: any; // Use any to avoid circular references; the actual type is JSONSchemaStore.
  JSONEditorStore?: {
    jsonData?: any;
    initJsonData?: Record<string, any>;
  };
}

// StoreState interface definition
interface StoreState {
  rootJSONStore: RootJSONStore;
}

/**
 * Page screen type
 */
type PageScreenType = 'wideScreen' | 'mobileScreen';

/**
 * A global store used to manage JSON Schema
 * */

export default class JSONSchemaStore {
  state: StoreState;

  // Constructor
  constructor(rootJSONStore: RootJSONStore) {
    this.state = {
      rootJSONStore: rootJSONStore, // Initialize a rootJSONStore
    };
  }

  /**
   * Widescreen or mobilescreen
   */
  @observable pageScreen: PageScreenType = 'mobileScreen'; // Default for small screen, widescreen: wideScreen, small screen: mobileScreen

  /**
   * jsonSchema: JSONSchema data object
   */
  @observable jsonSchema: JSONSchema = {} as JSONSchema;

  /**
   * Set current screen mode: Large screen or Small screen
   */
  @action.bound
  setPageScreen(pageScreen: PageScreenType | boolean | any): void {
    if (pageScreen === 'wideScreen' || pageScreen) {
      this.pageScreen = 'wideScreen';
    } else {
      this.pageScreen = 'mobileScreen'; // Default widescreen
    }
  }

  /** Retrieves the corresponding JSON data based on the index path [non-linked data retrieval] */
  @action.bound
  initJSONSchemaData(jsonSchemaData?: JSONSchema | Record<string, any>): void {
    if (!jsonSchemaData || JSON.stringify(jsonSchemaData) === '{}') {
      // Initialize using the default jsonschema data
      this.jsonSchema = objClone(initJSONSchemaData);
    } else if (!isEqual(jsonSchemaData, this.JSONSchemaObj)) {
      if (jsonSchemaData && isNewSchemaData(jsonSchemaData)) {
        // If lastUpdateTime is present, it indicates that the data is from the new JSON Schema version and can be assigned directly without conversion.
        this.jsonSchema = jsonSchemaData as JSONSchema;
      } else {
        // Perform a conversion to ensure compatibility with older data.
        const newJSONSchema = oldSchemaToNewSchema(jsonSchemaData);
        this.jsonSchema = newJSONSchema;
      }
    }
    // console.info('[json-editor]initJSONSchemaData:', toJS(this.jsonSchema));
  }

  /** Retrieves the corresponding JSON data based on the index path [non-linked data retrieval] */
  @action.bound
  JSONSchemaChange(jsonSchemaData?: JSONSchema | Record<string, any>): void {
    if (!jsonSchemaData || JSON.stringify(jsonSchemaData) === '{}') {
      // Initialize using the default jsonschema data
      this.jsonSchema = objClone(initJSONSchemaData);
    } else if (jsonSchemaData && isNewSchemaData(jsonSchemaData)) {
      /** If lastUpdateTime is present, it indicates that the data is from the new JSON Schema version and can be assigned directly without conversion. */
      this.jsonSchema = jsonSchemaData as JSONSchema;
    } else {
      // Perform a conversion to ensure compatibility with older data.
      const newJSONSchema = oldSchemaToNewSchema(jsonSchemaData);
      this.jsonSchema = newJSONSchema;
    }
    const JSONEditorStore = this.state.rootJSONStore.JSONEditorStore;
    const curJsonData = JSONEditorStore?.jsonData;
    let newJsonData: Record<string, any> = {};
    /** Generate the latest jsonData based on jsonSchema */
    if (this.jsonSchema.reset) {
      // Schema changes will not retain old jsonData data
      newJsonData = schema2json(this.jsonSchema, {});
    } else {
      // Retain old jsonData data by default
      newJsonData = schema2json(this.jsonSchema, curJsonData);
    }
    /** Update the current jsonData */
    if (JSONEditorStore) {
      JSONEditorStore.jsonData = newJsonData;
      JSONEditorStore.initJsonData = objClone(curJsonData); // Back up the previous data object
    }
    /** Trigger jsonDataChange once when jsonSchema changes. */
    /*A change in jsonSchema means that jsonData also needs a corresponding structural update.*/

    // this.state.rootJSONStore.JSONEditorStore.jsonDataChange();
    // console.info('[json-editor]JSONSchemaChange:', toJS(this.jsonSchema));
  }

  @computed get JSONSchemaObj(): JSONSchema {
    return toJS(this.jsonSchema);
  }

  /** Retrieves the timestamp corresponding to the latest edit time of the current jsonSchema */
  @computed get lastUpdateTime(): number {
    let curLastUpdateTime = this.jsonSchema.lastUpdateTime;
    curLastUpdateTime = curLastUpdateTime
      ? new Date(curLastUpdateTime).getTime()
      : new Date().getTime();
    return curLastUpdateTime;
  }

  /** Retrieves the corresponding key value path based on the index path */
  @action.bound
  indexRoute2keyRoute(indexRoute: string | number): string {
    return indexRoute2keyRoute(indexRoute, this.jsonSchema);
  }

  /** Retrieves the corresponding index path based on the key value path */
  @action.bound
  keyRoute2indexRoute(keyRoute: string): string | number {
    return keyRoute2indexRoute(keyRoute, this.jsonSchema);
  }

  /** Retrieve the corresponding schema data based on the index path [Non-linked data retrieval] */
  @action.bound
  getSchemaByIndexRoute(indexRoute: string | number): JSONSchema | any {
    return getSchemaByIndexRoute(indexRoute, this.jsonSchema, true); // useObjClone: ​​true to avoid subsequent data linkage
  }

  /** Retrieves the corresponding schema data based on the key path [non-linked data retrieval] */
  @action.bound
  getSchemaByKeyRoute(keyRoute: string): JSONSchema | any {
    const indexRoute = this.keyRoute2indexRoute(keyRoute);
    return getSchemaByIndexRoute(indexRoute, this.jsonSchema, true); // useObjClone: ​​true to avoid subsequent data linkage
  }
}
