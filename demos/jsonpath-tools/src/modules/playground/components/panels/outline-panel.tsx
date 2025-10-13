'use client'
import { SyntaxDescriptionService } from "#components/jsonpath";
import { defaultQueryOptions } from "#components/jsonpath";
import { Query } from "#components/jsonpath";
import { SyntaxTreeNode } from "#components/jsonpath";
import { SyntaxTree } from "#components/jsonpath";
import { SyntaxTreeType } from "#components/jsonpath";
import { SyntaxTreeToken } from "#components/jsonpath";
import { Box, Paper, Stack } from "@mantine/core";
import { memo } from "react";
import PanelShell from "../panel-shell";
import "./outline-panel.css";
import { MarkdownView } from "../markdown-view";

/**
 * Panel displaying JSONPath query in a tree form.
 */
const OutlinePanel = memo(({
    query,
    onSelectedNodeChanged
}: {
    query: Query,
    onSelectedNodeChanged: (node: SyntaxTree | null) => void
}) => {
    return (
        <PanelShell
            toolbar={
                <></>
            }
        >
            <Box p="xs" className={'container'}>
                {query !== undefined && <OutlineView tree={query.query} onSelectedNodeChanged={onSelectedNodeChanged} />}
            </Box>
        </PanelShell>
    );
});
export default OutlinePanel;

function OutlineView({
    tree,
    onSelectedNodeChanged
}: {
    tree: SyntaxTree,
    onSelectedNodeChanged: (node: SyntaxTree | null) => void
}) {
    if (tree instanceof SyntaxTreeToken) return (<></>);
    return (
        <div className={"node"}>
            <Paper
                className={getClassName(tree)}
                p="xs"
                withBorder
                onMouseOver={e => {
                    e.stopPropagation();
                    onSelectedNodeChanged(tree);
                }}
                onMouseOut={e => {
                    e.stopPropagation();
                    onSelectedNodeChanged(null);
                }}
            >
                <TreeLabel tree={tree} />
                {tree instanceof SyntaxTreeNode && tree.children.length > 0 && (
                    <Stack className={'children'} mt="xs" gap="xs">
                        {tree.children.map((c, i) => (
                            <OutlineView key={i} tree={c} onSelectedNodeChanged={onSelectedNodeChanged} />
                        ))}
                    </Stack>
                )}
            </Paper>
        </div>
    );
}

function TreeLabel({ tree }: { tree: SyntaxTree }) {
    return (
        <div className={'label'}>
            <MarkdownView markdown={getLabel(tree)} />
        </div>
    );
}

function getClassName(tree: SyntaxTree): string {
    return classNameMap.get(tree.type) ?? "";
}

function getLabel(tree: SyntaxTree): string {
    return syntaxDescriptionService.provideDescription(tree)?.title ?? tree.type;
}

const classNameMap = new Map<SyntaxTreeType, string>([
    [SyntaxTreeType.subQuery, 'query'],
    [SyntaxTreeType.segment, 'segment'],
    [SyntaxTreeType.nameSelector, 'selector'],
    [SyntaxTreeType.indexSelector, 'selector'],
    [SyntaxTreeType.sliceSelector, 'selector'],
    [SyntaxTreeType.wildcardSelector, 'selector'],
    [SyntaxTreeType.filterSelector, 'selector'],
    [SyntaxTreeType.missingSelector, 'missing'],
    [SyntaxTreeType.functionExpression, 'functionExpression'],
    [SyntaxTreeType.andExpression, 'logicalOperator'],
    [SyntaxTreeType.orExpression, 'logicalOperator'],
    [SyntaxTreeType.notExpression, 'logicalOperator'],
    [SyntaxTreeType.comparisonExpression, 'comparisonOperator'],
    [SyntaxTreeType.stringLiteralExpression, 'literal'],
    [SyntaxTreeType.numberLiteralExpression, 'literal'],
    [SyntaxTreeType.nullLiteralExpression, 'literal'],
    [SyntaxTreeType.booleanLiteralExpression, 'literal'],
    [SyntaxTreeType.filterQueryExpression, 'filterQueryExpression'],
    [SyntaxTreeType.paranthesisExpression, 'paranthesisExpression'],
    [SyntaxTreeType.missingExpression, 'missing']
]);

const syntaxDescriptionService = new SyntaxDescriptionService(defaultQueryOptions);
