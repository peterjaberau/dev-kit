import JSONSchemaStore from './JSONSchemaStore';
// Non-singleton pattern
const JSONStore = {
  schemaStore: JSONSchemaStore,
};

export default JSONStore;
