import { Diagnostics } from "#components/jsonpath";
import { CompletionItem } from "#components/jsonpath";
import { DocumentHighlight } from "#components/jsonpath";
import { Signature } from "#components/jsonpath";
import { Tooltip } from "#components/jsonpath";
import { NormalizedPath } from "#components/jsonpath";
import { QueryOptions } from "#components/jsonpath";
import { Function, FunctionParameter } from "#components/jsonpath";
import { TextChange } from "#components/jsonpath";
import { JSONValue } from "#components/jsonpath";

export enum LanguageServiceMessageID {
    updateQueryOptions = "updateQueryOptions",
    updateQuery = "updateQuery",
    updateQueryArgument = "updateQueryArgument",
    updateQueryArgumentType = "updateQueryArgumentType",
    getCompletions = "getCompletions",
    resolveCompletion = "resolveCompletion",
    getSignature = "getSignature",
    getDocumentHighlights = "getDocumentHighlights",
    getTooltip = "getTooltip",
    getDiagnostics = "getDiagnostics",
    getFormattingEdits = "getFormattingEdits",
    getResult = "getResult",
    disconnect = "disconnect"
}

export interface UpdateQueryOptionsLanguageServiceMessage {
    readonly newQueryOptions: SerializableQueryOptions;
}

export interface UpdateQueryLanguageServiceMessage {
    readonly queryTextChanges: readonly TextChange[];
}

export interface UpdateQueryArgumentLanguageServiceMessage {
    readonly newQueryArgument: JSONValue | undefined;
}

export interface UpdateQueryArgumentTypeLanguageServiceMessage {
    readonly newQueryArgumentTypeSerialized: any;
}

export interface GetCompletionsLanguageServiceMessage {
    readonly position: number;
}

export interface GetCompletionsLanguageServiceMessageResponse {
    readonly completions: readonly SerializableCompletionItem[];
}

export interface ResolveCompletionLanguageServiceMessage {
    readonly index: number;
}

export interface ResolveCompletionLanguageServiceMessageResponse {
    readonly description: string;
}

export interface GetSignatureLanguageServiceMessage {
    readonly position: number;
}

export interface GetSignatureLanguageServiceMessageResponse {
    readonly signature: Signature | null;
}

export interface GetDocumentHighlightsLanguageServiceMessage {
    readonly position: number;
}

export interface GetDocumentHighlightsLanguageServiceMessageResponse {
    readonly documentHighlights: DocumentHighlight[];
}

export interface GetTooltipLanguageServiceMessage {
    readonly position: number;
}

export interface GetTooltipLanguageServiceMessageResponse {
    readonly tooltip: Tooltip | null;
}

export type GetDiagnosticsLanguageServiceMessage = object;

export interface GetDiagnosticsLanguageServiceMessageResponse {
    readonly diagnostics: readonly Diagnostics[];
}

export type GetFormattingEditsLanguageServiceMessage = object;

export interface GetFormattingEditsLanguageServiceMessageResponse {
    readonly formattingEdits: readonly TextChange[];
}

export type GetResultLanguageServiceMessage = object;

export interface GetResultLanguageServiceMessageResponse {
    readonly nodes: readonly JSONValue[];
    readonly paths: readonly NormalizedPath[];
}

export type DisconnectLanguageServiceMessage = object;

export type SerializableCompletionItem = Omit<CompletionItem, "resolveDescription">;

export type SerializableQueryOptions = Omit<QueryOptions, "functions"> & {
    readonly functions: { [name: string]: SerializableFunction };
}

export type SerializableFunction = Omit<Function, "parameters" | "returnDataType" | "handler"> & {
    readonly parameters: readonly SerializableFunctionParameter[];
    readonly returnDataType: any;
}

export type SerializableFunctionParameter = Omit<FunctionParameter, "dataType"> & {
    readonly dataType: any;
}
