
export type {
  AppSchema,
  AppAction,
  MenuItem as AppMenuItem
} from './app';

export type {
  BaseSchema,
  SchemaNode,
  ComponentRendererProps,
  ComponentInput,
  ComponentMeta,
  ComponentConfig,
  HTMLAttributes,
  EventHandlers,
  StyleProps,
} from './base';

export type {
  DivSchema,
  SpanSchema,
  TextSchema,
  ImageSchema,
  IconSchema,
  SeparatorSchema,
  ContainerSchema,
  FlexSchema,
  StackSchema,
  GridSchema,
  CardSchema,
  TabsSchema,
  TabItem,
  ScrollAreaSchema,
  ResizableSchema,
  ResizablePanel,
  AspectRatioSchema,
  LayoutSchema,
  PageSchema,
} from './layout';

export type {
  ButtonSchema,
  InputSchema,
  TextareaSchema,
  SelectSchema,
  SelectOption,
  CheckboxSchema,
  RadioGroupSchema,
  RadioOption,
  SwitchSchema,
  SliderSchema,
  FileUploadSchema,
  DatePickerSchema,
  CalendarSchema,
  ValidationRule,
  FieldCondition,
  FormField,
  ComboboxSchema,
  CommandSchema,
  InputOTPSchema,
  ToggleSchema,
  FormSchema,
  LabelSchema,
  FormComponentSchema,
} from './form';

export type {
  AlertSchema,
  BadgeSchema,
  AvatarSchema,
  ListSchema,
  ListItem,
  TableColumn,
  TableSchema,
  DataTableSchema,
  MarkdownSchema,
  TreeNode,
  TreeViewSchema,
  ChartType,
  ChartSeries,
  ChartSchema,
  TimelineEvent,
  TimelineSchema,
  KbdSchema,
  HtmlSchema,
  StatisticSchema,
  DataDisplaySchema,
} from './data-display';

export type {
  SpinnerSchema,
  LoadingSchema,
  ProgressSchema,
  SkeletonSchema,
  ToastSchema,
  EmptySchema,
  SonnerSchema,
  ToasterSchema,
  FeedbackSchema,
} from './feedback';

export type {
  AccordionItem,
  ToggleGroupSchema,
  AccordionSchema,
  CollapsibleSchema,
  DisclosureSchema,
} from './disclosure';

export type {
  OverlayPosition,
  OverlayAlignment,
  DialogSchema,
  AlertDialogSchema,
  SheetSchema,
  DrawerSchema,
  PopoverSchema,
  TooltipSchema,
  HoverCardSchema,
  MenuItem,
  MenubarSchema,
  DropdownMenuSchema,
  ContextMenuSchema,
  OverlaySchema,
} from './overlay';

export type {
  NavLink,
  HeaderBarSchema,
  SidebarSchema,
  BreadcrumbItem,
  BreadcrumbSchema,
  ButtonGroupSchema,
  NavigationMenuSchema,
  NavigationSchema,
  PaginationSchema,
} from './navigation';

export type {
  KanbanColumn,
  KanbanCard,
  KanbanSchema,
  CalendarViewMode,
  CalendarEvent,
  CalendarViewSchema,
  FilterOperator,
  FilterCondition,
  FilterGroup,
  FilterBuilderSchema,
  FilterField,
  CarouselItem,
  CarouselSchema,
  DashboardWidgetLayout,
  DashboardWidgetSchema,
  DashboardSchema,
  ChatMessage,
  ChatbotSchema,
  ComplexSchema,
} from './complex';

export type {
  QueryParams,
  QueryResult,
  DataSource,
  DataScope,
  DataContext,
  DataBinding,
  ValidationError,
  APIError,
} from './data';

export type {
  ActionSchema,
  CRUDOperation,
  CRUDFilter,
  CRUDToolbar,
  CRUDPagination,
  CRUDSchema,
  DetailSchema,
  CRUDDialogSchema,
  CRUDComponentSchema,
} from './crud';

export type {
  // Schema types aligned with @objectstack/spec
  HttpMethod,
  HttpRequest,
  ViewData,
  ListColumn,
  SelectionConfig,
  PaginationConfig,
  KanbanConfig,
  CalendarConfig,
  GanttConfig,
  SortConfig,
  // Component schemas
  ObjectMapSchema,
  ObjectGanttSchema,
  ObjectCalendarSchema,
  ObjectKanbanSchema,
  ObjectChartSchema,
  ListViewSchema,
  ObjectGridSchema,
  ObjectFormSchema,
  ObjectViewSchema,
  ObjectQLComponentSchema,
} from './objectql';

export type {
  BaseFieldMetadata,
  VisibilityCondition,
  ValidationFunction as FieldValidationFunction,
  TextFieldMetadata,
  TextareaFieldMetadata,
  MarkdownFieldMetadata,
  HtmlFieldMetadata,
  NumberFieldMetadata,
  CurrencyFieldMetadata,
  PercentFieldMetadata,
  BooleanFieldMetadata,
  DateFieldMetadata,
  DateTimeFieldMetadata,
  TimeFieldMetadata,
  SelectFieldMetadata,
  SelectOptionMetadata,
  EmailFieldMetadata,
  PhoneFieldMetadata,
  UrlFieldMetadata,
  PasswordFieldMetadata,
  FileFieldMetadata,
  FileMetadata,
  ImageFieldMetadata,
  LocationFieldMetadata,
  LookupFieldMetadata,
  FormulaFieldMetadata,
  SummaryFieldMetadata,
  AutoNumberFieldMetadata,
  UserFieldMetadata,
  ObjectFieldMetadata,
  VectorFieldMetadata,
  GridFieldMetadata,
  GridColumnDefinition,
  ColorFieldMetadata,
  CodeFieldMetadata,
  AvatarFieldMetadata,
  SignatureFieldMetadata,
  QRCodeFieldMetadata,
  AddressFieldMetadata,
  GeolocationFieldMetadata,
  SliderFieldMetadata,
  RatingFieldMetadata,
  MasterDetailFieldMetadata,
  FieldMetadata,
  ObjectTrigger,
  ObjectPermission,
  SharingRule,
  ObjectSchemaMetadata,
  ObjectIndex,
  ObjectRelationship,
} from './field-types';

// ============================================================================
// Phase 3: Data Protocol Advanced Types
// ============================================================================
export type {
  // Query AST (Phase 3.3)
  QueryASTNodeType,
  QueryASTNode,
  SelectNode,
  FromNode,
  WhereNode,
  JoinNode,
  JoinStrategy,
  GroupByNode,
  OrderByNode,
  LimitNode,
  OffsetNode,
  SubqueryNode,
  AggregateNode,
  WindowNode,
  WindowFunction,
  WindowFrame,
  WindowFrameUnit,
  WindowFrameBoundary,
  FieldNode,
  LiteralNode,
  OperatorNode,
  FunctionNode,
  ComparisonOperator,
  LogicalOperator,
  QueryAST,
  QuerySchema,
  QuerySortConfig,
  JoinConfig,
  AggregationConfig,
  WindowConfig,
  // Filter Schema (Phase 3.4)
  AdvancedFilterSchema,
  AdvancedFilterCondition,
  AdvancedFilterOperator,
  DateRangeFilter,
  DateRangePreset,
  FilterBuilderConfig,
  FilterFieldConfig,
  // Validation Schema (Phase 3.5)
  AdvancedValidationSchema,
  AdvancedValidationRule,
  ValidationRuleType,
  ValidationFunction,
  AsyncValidationFunction,
  ValidationContext,
  AdvancedValidationResult,
  AdvancedValidationError,
  // ObjectStack Spec v0.7.1 Validation
  BaseValidation,
  ScriptValidation,
  UniquenessValidation,
  StateMachineValidation,
  CrossFieldValidation,
  AsyncValidation,
  ConditionalValidation,
  FormatValidation,
  RangeValidation,
  ObjectValidationRule,
  // Driver Interface (Phase 3.6)
  DriverInterface,
  ConnectionConfig,
  DriverQueryResult,
  BatchOperation,
  BatchResult,
  TransactionContext,
  CacheManager,
  ConnectionPool,
  // Datasource Schema (Phase 3.7)
  DatasourceSchema,
  DatasourceType,
  DatasourceMetric,
  DatasourceAlert,
  DatasourceManager,
  HealthCheckResult,
  DatasourceMetrics,
} from './data-protocol';

// ============================================================================
// API and Events - API Integration and Event Handling
// ============================================================================
export type {
  HTTPMethod,
  APIRequest,
  APIConfig,
  EventHandler,
  EventableSchema,
  DataFetchConfig,
  DataFetchableSchema,
  ExpressionContext,
  ExpressionSchema,
  APISchema,
} from './api-types';

// ============================================================================
// Union Types - Discriminated Unions for All Schemas
// ============================================================================

import type { BaseSchema, SchemaNode } from './base';
import type { LayoutSchema, PageSchema } from './layout';
import type { FormComponentSchema } from './form';
import type { DataDisplaySchema } from './data-display';
import type { FeedbackSchema } from './feedback';
import type { DisclosureSchema } from './disclosure';
import type { OverlaySchema } from './overlay';
import type { NavigationSchema } from './navigation';
import type { ComplexSchema, DashboardSchema } from './complex';
import type { CRUDComponentSchema } from './crud';
import type { ObjectQLComponentSchema, ListViewSchema } from './objectql';
import type { AppSchema } from './app';

// ============================================================================
// Phase 2 Schemas - New Additions
// ============================================================================
export type {
  // Theme System
  ThemeSchema,
  ThemeDefinition,
  ThemeMode,
  ColorPalette,
  Typography,
  SpacingScale,
  BorderRadius,
  ThemeSwitcherSchema,
  ThemePreviewSchema,
} from './theme';

export type {
  // Report System
  ReportSchema,
  ReportExportFormat,
  ReportScheduleFrequency,
  ReportAggregationType,
  ReportField,
  ReportFilter,
  ReportGroupBy,
  ReportSection,
  ReportSchedule,
  ReportExportConfig,
  ReportBuilderSchema,
  ReportViewerSchema,
} from './reports';

export type {
  // Block System
  BlockSchema,
  BlockMetadata,
  BlockVariable,
  BlockSlot,
  BlockLibraryItem,
  BlockLibrarySchema,
  BlockEditorSchema,
  BlockInstanceSchema,
  ComponentSchema,
} from './blocks';

export type {
  // View System Enhancements
  ViewType,
  DetailViewSchema,
  DetailViewField,
  DetailViewSection,
  DetailViewTab,
  ViewSwitcherSchema,
  FilterUISchema,
  SortUISchema,
  ViewComponentSchema,
} from './views';

export type {
  // Enhanced Action System (Phase 2)
  ActionExecutionMode,
  ActionCallback,
  ActionCondition,
} from './crud';

/**
 * Union of all component schemas.
 * Use this for generic component rendering where the type is determined at runtime.
 */
export type AnySchema =
  | AppSchema 
  | BaseSchema
  | LayoutSchema
  | PageSchema
  | FormComponentSchema
  | DataDisplaySchema
  | FeedbackSchema
  | DisclosureSchema
  | OverlaySchema
  | NavigationSchema
  | ComplexSchema
  | DashboardSchema
  | CRUDComponentSchema
  | ObjectQLComponentSchema
  | ListViewSchema;

/**
 * Utility type to extract the schema type from a type string.
 * Useful for type narrowing in renderers.
 * 
 * @example
 * ```typescript
 * function renderComponent<T extends string>(schema: SchemaByType<T>) {
 *   // schema is now typed based on the type string
 * }
 * ```
 */
export type SchemaByType<T extends string> = Extract<AnySchema, { type: T }>;

/**
 * Utility type to make all properties optional except the type.
 * Useful for partial schema definitions in editors.
 */
export type PartialSchema<T extends BaseSchema> = {
  type: T['type'];
} & Partial<Omit<T, 'type'>>;

/**
 * Schema with required children (for container components).
 */
export type ContainerSchemaWithChildren = BaseSchema & {
  children: SchemaNode | SchemaNode[];
};

/**
 * Version information
 */
export const VERSION = '0.1.0';

/**
 * Schema version for compatibility checking
 */
export const SCHEMA_VERSION = '1.0.0';

// ============================================================================
// Schema Registry - The Type Map
// ============================================================================
export type {
  SchemaRegistry,
  ComponentType,
} from './registry';

// ============================================================================
// Plugin Scope Isolation - Section 3.3
// ============================================================================
export type {
  PluginScope,
  PluginScopeConfig,
  ComponentMeta as PluginComponentMeta,
  ComponentInput as PluginComponentInput,
  PluginEventHandler,
} from './plugin-scope';

// ============================================================================
// UI Actions - Enhanced Action Schema (ObjectStack Spec v0.7.1)
// ============================================================================
/**
 * Enhanced action schema with location-based placement, parameter collection,
 * conditional visibility, and rich feedback mechanisms.
 */
export type {
  ActionLocation,
  ActionComponent,
  ActionType,
  ActionParam,
  ActionSchema as UIActionSchema,
  ActionGroup,
  ActionContext,
  ActionResult,
  ActionExecutor,
} from './ui-action';

// ============================================================================
// ObjectStack Protocol Namespaces - Protocol Re-exports
// ============================================================================
/**
 * Re-export ObjectStack Protocol namespaces for convenience.
 * 
 * This allows consumers to access the full ObjectStack protocol through
 * @object-ui/types without needing to install @objectstack/spec separately.
 * 
 * @example
 * ```typescript
 * import { Data, UI, System, AI, API } from '@object-ui/types';
 * 
 * const field: Data.Field = { name: 'task_name', type: 'text' };
 * const component: UI.Component = { type: 'button', label: 'Click me' };
 * ```
 */
export type { Data, UI, System, AI, API, Hub, Automation, Shared, QA } from '@objectstack/spec';
