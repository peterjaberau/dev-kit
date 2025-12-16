import JSONSchemaStore from './JSONSchemaStore';

// Singleton pattern
const JSONStore = {
  jsonSchemaStore: new JSONSchemaStore(),
};

export default JSONStore;
