import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { useTranslation } from "../../hooks/use-translation";
import { cn } from "../../lib/utils";
import type {
  JSONSchema,
  ObjectJSONSchema,
  SchemaType,
} from "../../types/jsonSchema";
import {
  asObjectSchema,
  getSchemaDescription,
  withObjectSchema,
} from "../../types/jsonSchema";
import type { ValidationTreeNode } from "../../types/validation";
import { Badge } from "../ui/badge";
import TypeDropdown from "./TypeDropdown";
import TypeEditor from "./TypeEditor";

export interface SchemaPropertyEditorProps {
  name: string;
  schema: JSONSchema;
  required: boolean;
  readOnly: boolean;
  validationNode?: ValidationTreeNode;
  onDelete: () => void;
  onNameChange: (newName: string) => void;
  onRequiredChange: (required: boolean) => void;
  onSchemaChange: (schema: ObjectJSONSchema) => void;
  depth?: number;
}

export const SchemaPropertyEditor: React.FC<SchemaPropertyEditorProps> = ({
  name,
  schema,
  required,
  readOnly = false,
  validationNode,
  onDelete,
  onNameChange,
  onRequiredChange,
  onSchemaChange,
  depth = 0,
}) => {
  const t = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempDesc, setTempDesc] = useState(getSchemaDescription(schema));
  const type = withObjectSchema(
    schema,
    (s) => (s.type || "object") as SchemaType,
    "object" as SchemaType,
  );

  // Update temp values when props change
  useEffect(() => {
    setTempName(name);
    setTempDesc(getSchemaDescription(schema));
  }, [name, schema]);

  const handleNameSubmit = () => {
    const trimmedName = tempName.trim();
    if (trimmedName && trimmedName !== name) {
      onNameChange(trimmedName);
    } else {
      setTempName(name);
    }
    setIsEditingName(false);
  };

  const handleDescSubmit = () => {
    const trimmedDesc = tempDesc.trim();
    if (trimmedDesc !== getSchemaDescription(schema)) {
      onSchemaChange({
        ...asObjectSchema(schema),
        description: trimmedDesc || undefined,
      });
    } else {
      setTempDesc(getSchemaDescription(schema));
    }
    setIsEditingDesc(false);
  };

  // Handle schema changes, preserving description
  const handleSchemaUpdate = (updatedSchema: ObjectJSONSchema) => {
    const description = getSchemaDescription(schema);
    onSchemaChange({
      ...updatedSchema,
      description: description || undefined,
    });
  };

  return (
    <div
      className={cn(
        "animate-in mb-2 rounded-lg border transition-all duration-200",
        depth > 0 && "border-l-border/40 ml-0 border-l sm:ml-4",
      )}
    >
      <div className="json-field-row group relative justify-between">
        <div className="flex min-w-0 grow items-center gap-2">
          {/* Expand/collapse button */}
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? t.collapse : t.expand}
          >
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {/* Property name */}
          <div className="flex min-w-0 grow items-center gap-2 overflow-visible">
            <div className="flex min-w-0 grow items-center gap-2 overflow-visible">
              {!readOnly && isEditingName ? (
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                  className="z-10 h-8 min-w-[120px] max-w-full text-sm font-medium"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingName(true)}
                  className="json-field-label hover:bg-secondary/30 hover:shadow-xs hover:ring-ring/20 -mx-0.5 min-w-[80px] max-w-[50%] cursor-text truncate rounded-sm px-2 py-0.5 text-left font-medium transition-all hover:ring-1"
                >
                  {name}
                </button>
              )}

              {/* Description */}
              {!readOnly && isEditingDesc ? (
                <Input
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  onBlur={handleDescSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleDescSubmit()}
                  placeholder={t.propertyDescriptionPlaceholder}
                  className="text-muted-foreground z-10 h-8 min-w-[150px] flex-1 text-xs italic"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
              ) : tempDesc ? (
                <button
                  type="button"
                  onClick={() => setIsEditingDesc(true)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingDesc(true)}
                  className="text-muted-foreground hover:bg-secondary/30 hover:shadow-xs hover:ring-ring/20 -mx-0.5 mr-2 max-w-[40%] flex-1 cursor-text truncate rounded-sm px-2 py-0.5 text-left text-xs italic transition-all hover:ring-1"
                >
                  {tempDesc}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingDesc(true)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingDesc(true)}
                  className="text-muted-foreground/50 hover:bg-secondary/30 hover:shadow-xs hover:ring-ring/20 -mx-0.5 mr-2 max-w-[40%] flex-1 cursor-text truncate rounded-sm px-2 py-0.5 text-left text-xs italic opacity-0 transition-all hover:ring-1 group-hover:opacity-100"
                >
                  {t.propertyDescriptionButton}
                </button>
              )}
            </div>

            {/* Type display */}
            <div className="flex shrink-0 items-center justify-end gap-2">
              <TypeDropdown
                value={type}
                readOnly={readOnly}
                onChange={(newType) => {
                  onSchemaChange({
                    ...asObjectSchema(schema),
                    type: newType,
                  })
                }}
              />

              {/* Required toggle */}
              <button
                type="button"
                onClick={() => !readOnly && onRequiredChange(!required)}
                className={cn(
                  "hover:shadow-xs hover:ring-ring/30 min-w-[80px] cursor-pointer whitespace-nowrap rounded-md px-2 py-1 text-center text-xs font-medium transition-all hover:ring-2 active:scale-95",
                  required ? "bg-red-50 text-red-500" : "bg-secondary text-muted-foreground",
                )}
              >
                {required ? t.propertyRequired : t.propertyOptional}
              </button>
            </div>
          </div>
        </div>

        {/* Error badge */}
        {
          //@ts-ignore
          validationNode?.cumulativeChildrenErrors > 0 && (
            <Badge
              className="h-5 min-w-5 justify-center rounded-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              {
                //@ts-ignore
                validationNode.cumulativeChildrenErrors
              }
            </Badge>
          )
        }

        {/* Delete button */}
        {!readOnly && (
          <div className="text-muted-foreground flex items-center gap-1">
            <button
              type="button"
              onClick={onDelete}
              className="hover:bg-secondary hover:text-destructive rounded-md p-1 opacity-0 transition-colors group-hover:opacity-100"
              aria-label={t.propertyDelete}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Type-specific editor */}
      {expanded && (
        <div className="animate-in px-2 pb-2 pt-1 sm:px-3">
          {readOnly && tempDesc && <p className="pb-2">{tempDesc}</p>}
          <TypeEditor
            schema={schema}
            readOnly={readOnly}
            validationNode={validationNode}
            onChange={handleSchemaUpdate}
            depth={depth + 1}
          />
        </div>
      )}
    </div>
  )
};

export default SchemaPropertyEditor;
