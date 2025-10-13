import { TopLevelSchema, SettingsInterfaceMetaSchema } from './engine.types'
import { packagedSchemas } from './engine.data'
import { settingsDataConfigDefaults } from './engine.config'
import { schemaDefinitions } from './engine.constants'

import pointer from 'json-pointer';

export function buildMetaSchema(metaSchemaSettings: SettingsInterfaceMetaSchema): TopLevelSchema {
  let metaSchema = structuredClone(packagedSchemas.META_SCHEMA_SIMPLIFIED);

  if (!metaSchemaSettings) {
    // if no settings are provided, use the default settings
    metaSchemaSettings = structuredClone(settingsDataConfigDefaults.metaSchema);
  }

  if (!metaSchemaSettings.allowBooleanSchema) {
    metaSchema.$defs!.jsonSchema = schemaDefinitions.DEF_JSON_SCHEMA_WITHOUT_BOOLEAN_SCHEMA;
  }
  if (!metaSchemaSettings.allowMultipleTypes) {
    metaSchema.$defs!.typeDefinition = schemaDefinitions.DEF_TYPE_DEFINITION_WITHOUT_MULTIPLE_TYPES;
  }
  if (!metaSchemaSettings.showAdditionalPropertiesButton) {
    metaSchema.$defs!.objectSubSchema!.metaConfigurator = {
      hideAddPropertyButton: true,
    };
  }

  if (metaSchemaSettings.markMoreFieldsAsAdvanced) {
    metaSchema.$defs!.constProperty!.properties!.const.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.enumProperty!.properties!.enum.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.objectProperty!.properties!.additionalProperties.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.stringProperty!.properties!.maxLength.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.stringProperty!.properties!.minLength.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.stringProperty!.properties!.pattern.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.arrayProperty!.properties!.minItems.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.arrayProperty!.properties!.maxItems.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!.arrayProperty!.properties!.uniqueItems.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!['meta-data']!.properties!.examples.metaConfigurator = {
      advanced: true,
    };
    metaSchema.$defs!['meta-data']!.properties!.default.metaConfigurator = {
      advanced: true,
    };
  }

  if (metaSchemaSettings.objectTypesComfort) {
    metaSchema.$defs.enumProperty.allOf = schemaDefinitions.ALL_OF_ENUM_PROPERTY;
    metaSchema.$defs['meta-data'].allOf = schemaDefinitions.ALL_OF_META_DATA;

    // delete properties that are not compatible with this option
    delete metaSchema.$defs.schemaComposition.properties.not;
    metaSchema.$defs.conditionalSchema = {};
    delete metaSchema.$defs.objectProperty.properties.additionalProperties;
    delete metaSchema.$defs.objectProperty.properties.propertyNames;
    delete metaSchema.$defs.objectProperty.properties.dependentRequired;
    delete metaSchema.$defs.objectProperty.properties.dependentSchemas;
    delete metaSchema.$defs.objectProperty.properties.unevaluatedProperties;
    delete metaSchema.$defs.arrayProperty.properties.unevaluatedItems;
    delete metaSchema.$defs.arrayProperty.properties.items;
  }

  if (metaSchemaSettings.showJsonLdFields) {
    for (const key in schemaDefinitions.JSON_LD_DEFS) {
      const value: any = schemaDefinitions.JSON_LD_DEFS[key];
      metaSchema.$defs[key] = value;
    }
    metaSchema.$defs.rootObjectSubSchema!.allOf! = [
      {
        $ref: '#/$defs/jsonLdContextHaving',
      },
      ...metaSchema.$defs.rootObjectSubSchema!.allOf!,
    ];

    metaSchema.$defs.objectSubSchema!.allOf! = [
      {
        $ref: '#/$defs/jsonLdCommon',
      },
      ...metaSchema.$defs.objectSubSchema!.allOf!,
    ];
  }

  const simplified =
    !metaSchemaSettings.allowBooleanSchema ||
    !metaSchemaSettings.allowMultipleTypes ||
    metaSchemaSettings.objectTypesComfort;
  if (simplified) {
    metaSchema.$defs.jsonMetaSchema.title = 'Simplified JSON Schema Meta Schema';
  }

  return metaSchema;
}
