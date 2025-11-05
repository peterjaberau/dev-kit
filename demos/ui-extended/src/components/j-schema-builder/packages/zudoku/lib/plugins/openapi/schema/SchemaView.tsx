import { InfoIcon } from "lucide-react";
import { Prose } from "@dev-kit/components"
import Markdown from "react-markdown"

import type { SchemaObject } from "../../../oas/parser";
import { Card, Text, Box } from "@chakra-ui/react";
import { groupBy } from "../../../util/groupBy";
import { ConstValue } from "../components/ConstValue";
import { EnumValues } from "../components/EnumValues";
import { ParamInfos } from "../ParamInfos";
import { AllOfGroupView } from "./AllOfGroup/AllOfGroupView";
import { SchemaExampleAndDefault } from "./SchemaExampleAndDefault";
import { SchemaPropertyItem } from "./SchemaPropertyItem";
import { UnionView } from "./UnionView";
import { isBasicType } from "./utils";

const renderMarkdown = (content?: string) =>
  content && (
    <Prose mx='auto'>
    <Markdown>
      {content}
    </Markdown>
    </Prose>
  );

const renderBasicSchema = (
  schema: SchemaObject,
  cardHeader?: React.ReactNode,
) => (
  <Card.Root css={{ overflow: 'hidden'}}>
    {cardHeader}
    <Card.Body>
      <Text textStyle={'sm'} color={'fg.muted'}>
        <ParamInfos schema={schema} />
      </Text>
      {schema.enum && <EnumValues values={schema.enum} />}
      {renderMarkdown(schema.description)}
      <SchemaExampleAndDefault schema={schema} />
    </Card.Body>
  </Card.Root>
);

export const SchemaView = ({
                             schema,
                             defaultOpen = false,
                             cardHeader,
                             embedded,
                           }: {
  schema?: SchemaObject | null;
  defaultOpen?: boolean;
  cardHeader?: React.ReactNode;
  embedded?: boolean;
}) => {


  if (!schema || Object.keys(schema).length === 0) {
    return (
      <Card.Root css={{ overflow: 'hidden'}}>
        {cardHeader}
        <Card.Body>
          <Text textStyle='sm' color='fg.muted'>
            No data returned
          </Text>
        </Card.Body>
      </Card.Root>
    );
  }

  if (schema.const) {
    return <ConstValue schema={schema} />;
  }

  if (Array.isArray(schema.oneOf) || Array.isArray(schema.anyOf)) {
    return <UnionView schema={schema} cardHeader={cardHeader} />;
  }

  if (Array.isArray(schema.allOf)) {
    return <AllOfGroupView schema={schema} cardHeader={cardHeader} />;
  }

  if (isBasicType(schema.type)) {
    return renderBasicSchema(schema, cardHeader);
  }

  if (schema.type === "array" && typeof schema.items === "object") {
    return <SchemaView schema={schema.items} cardHeader={cardHeader} />;
  }

  if (schema.type === "object") {
    const groupedProperties = groupBy(
      Object.entries(schema.properties ?? {}),
      ([propertyName, property]) => {
        return property.deprecated
          ? "deprecated"
          : schema.required?.includes(propertyName)
            ? "required"
            : "optional";
      },
    );
    const groupNames = ["required", "optional", "deprecated"] as const;

    const additionalProperties =
      typeof schema.additionalProperties === "object" ? (
        <SchemaView schema={schema.additionalProperties} embedded />
      ) : schema.additionalProperties === true ? (
        <div className="text-sm p-4 bg-border/20 hover:bg-border/30 flex items-center gap-1">
          <span>Additional properties are allowed</span>
          <a
            className="p-0.5 -m-0.5"
            href="https://swagger.io/docs/specification/v3_0/data-models/dictionaries/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <InfoIcon size={14} />
          </a>
        </div>
      ) : null;

    const Component: any = embedded ? Box : Card;

    return (
      <Component className="divide-y overflow-hidden">
        {cardHeader}
        {groupNames.map(
          (group) =>
            groupedProperties[group] && (
              <ul key={group} className="divide-y">
                {groupedProperties[group].map(([name, schema]) => (
                  <SchemaPropertyItem
                    key={name}
                    name={name}
                    schema={schema}
                    group={group}
                    defaultOpen={defaultOpen}
                  />
                ))}
              </ul>
            ),
        )}
        {additionalProperties}
      </Component>
    );
  }

  return null;
};
