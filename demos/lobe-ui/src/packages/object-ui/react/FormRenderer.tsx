import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldFactory } from './FieldFactory';

export const FormRenderer = ({
  schema,
  data = {},
  onSubmit,
  onChange,
  className = '',
  disabled = false,
}: any) => {
  // Create form methods with react-hook-form
  const methods = useForm({
    defaultValues: data,
    mode: 'onChange',
  });

  const { handleSubmit, watch } = methods;

  // Watch for form changes
  React.useEffect(() => {
    if (onChange) {
      const subscription = watch((value) => {
        onChange(value as Record<string, any>);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, onChange]);

  // Handle form submission
  const onSubmitForm = handleSubmit(async (formData) => {
    if (onSubmit) {
      await onSubmit(formData);
    }
  });

  // Render sections or fields
  const renderContent = () => {
    if (!schema.sections || schema.sections.length === 0) {
      return null;
    }

    return (
      <div className="space-y-6">
        {schema.sections.map((section: any, index: any) => (
          <FormSectionRenderer key={index} section={section} methods={methods} disabled={disabled} />
        ))}
      </div>
    )
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmitForm} className={`space-y-6 ${className}`}>
        {renderContent()}
        
        {/* Submit button - optional, can be customized */}
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={disabled}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

interface FormSectionRendererProps {
  section: any
  methods: any
  disabled?: boolean
}

// Grid column classes for different column counts
const GRID_COLS: any = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const

// Column span classes
const COL_SPAN = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
} as const;

/**
 * Renders a form section with grid layout
 */
const FormSectionRenderer: React.FC<FormSectionRendererProps> = ({
  section,
  methods,
  disabled = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(section.collapsed || false);

  // Determine grid columns based on section.columns
  const gridCols = GRID_COLS[section.columns || 1];

  const handleToggleCollapse = () => {
    if (section.collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="rounded-lg border p-4">
      {section.label && (
        <div
          className={`mb-4 flex items-center justify-between ${section.collapsible ? "cursor-pointer" : ""}`}
          onClick={handleToggleCollapse}
        >
          <h3 className="text-lg font-semibold">{section.label}</h3>
          {section.collapsible && <span className="text-sm text-gray-500">{isCollapsed ? "▶" : "▼"}</span>}
        </div>
      )}

      {!isCollapsed && (
        <div className={`grid ${gridCols} gap-4`}>
          {section.fields.map((field: any, index: any) => {
            // Handle both string fields (legacy) and FormFieldSchema objects
            const fieldName = typeof field === "string" ? field : field.field
            const fieldConfig = typeof field === "string" ? { field: fieldName } : field

            // Skip hidden fields
            if (fieldConfig.hidden) {
              return null
            }

            // Calculate colSpan for grid
            const colSpan = fieldConfig.colSpan || 1
            const colSpanClass = COL_SPAN[Math.min(colSpan, section.columns || 1) as keyof typeof COL_SPAN]

            return (
              <div key={`${fieldName}-${index}`} className={colSpanClass}>
                <FieldFactory field={fieldConfig} methods={methods} disabled={disabled || fieldConfig.readonly} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
};

FormRenderer.displayName = 'FormRenderer';
