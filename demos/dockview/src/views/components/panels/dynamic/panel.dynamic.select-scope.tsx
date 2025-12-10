"use client"
import { Wrap, Highlight, Input, Stack, TreeView, createTreeCollection, useFilter, Button } from "@chakra-ui/react"
import { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"
import { ScrollAreaWrapper, CollapseWrapper } from "../../common"
import { useDynamicPanelLab } from "#modules/dockview/actors/selectors"
import { useDockViewPanel } from "#modules/dockview/actors/selectors"
import JsonViewer from "../base/json-viewer"

export const PanelDynamicSelectScope = (props: any) => {
  // const { inScopeState, scopeContext, sendToDynamicPanelLab } = useDynamicPanelLab()

  const { panelViewScopeContext, panelViewScopedContext, sendToPanelView } = useDockViewPanel({
    panelId: props.props.api.id,
  })

  // const { collection: initialCollection, defaultExpanded, expandedValue, selectedValue, filter }: any = scopeContext
  const {
    collection: initialCollection,
    defaultExpanded,
    expandedValue,
    selectedValue,
    filter,
  }: any = panelViewScopeContext

  // console.log('PanelDynamicSelectScope', {
  //   panelViewContext: panelViewContext.scope,
  //   scopeContext,
  // })

  const [collection, setCollection] = useState(initialCollection)
  const [expanded, setExpanded] = useState<string[]>(["panels"])

  const [query, setQuery] = useState("")
  const { contains } = useFilter({
    sensitivity: "base",
  })

  const search = (search: string) => {
    setQuery(search)
    const nextCollection = initialCollection.filter((node: any) => contains(node.name, search))

    // update collection
    setCollection(nextCollection)

    // expand all branches
    setExpanded(nextCollection.getBranchValues())
  }

  return (
    <Stack gap={0} w="full" h="full">
      <Stack px={4} pt={3}>
        <Input placeholder="Search for tools & files" onChange={(e) => search(e.target.value)} />

        <CollapseWrapper title={`Inspect ${props?.props?.api?.id}`}>
          <JsonViewer props={{ ...props?.props }} />
        </CollapseWrapper>
      </Stack>

      {panelViewScopedContext.targetPanel && panelViewScopedContext.targetPanel}

      <ScrollAreaWrapper>
        <TreeView.Root
          defaultExpandedValue={["panels"]}
          collection={collection}
          expandedValue={expanded}
          selectedValue={selectedValue}
          onExpandedChange={(details) => setExpanded(details.expandedValue)}
          onSelectionChange={(details) => {

            const selectedNode = collection.findNode(details.selectedValue[0])



            const isBranch = collection.isBranchNode(selectedNode)
            if (isBranch) {
              // Prevent selecting branches
              return
            }
            // sendToDynamicPanelLab({ type: "SELECTION_CHANGE", payload: { selectedValue: details.selectedValue } })
            console.log('---details----', details.selectedValue)
            sendToPanelView({ type: "SELECTION_CHANGE", payload: { selectedValue: details.selectedValue } })
          }}
        >
          <TreeView.Tree>
            <TreeView.Node
              indentGuide={<TreeView.BranchIndentGuide />}
              render={({ node, nodeState }) =>
                nodeState.isBranch ? (
                  <TreeView.BranchControl>
                    <LuFolder />
                    <TreeView.BranchText>
                      <Highlight query={[query]} styles={{ bg: "gray.emphasized" }}>
                        {node.name}
                      </Highlight>
                    </TreeView.BranchText>
                  </TreeView.BranchControl>
                ) : (
                  <TreeView.Item>
                    <LuFile />
                    <TreeView.ItemText>
                      <Highlight query={[query]} styles={{ bg: "gray.emphasized" }}>
                        {node.name}
                      </Highlight>
                    </TreeView.ItemText>
                  </TreeView.Item>
                )
              }
            />
          </TreeView.Tree>
        </TreeView.Root>
      </ScrollAreaWrapper>
    </Stack>
  )
}

/*

const getFirstNode = collection.getFirstNode()
  const getLastNode = collection.getLastNode()
  const getNextNodePanels = collection.getNextNode("panels")
  const getNextNodeDefault = collection.getNextNode("default")
  const getNextNodeSrc = collection.getNextNode("src")
  const getPreviousNodePanels = collection.getPreviousNode("panels")
  const getPreviousNodeDefault = collection.getPreviousNode("default")
  const getPreviousNodeSrc = collection.getPreviousNode("src")
  const getParentNodesPanels = collection.getParentNodes("panels")
  const getParentNodesDefault = collection.getParentNodes("default")
  const getParentNodesSrc = collection.getParentNodes("src")
  const findNodePanels: any = collection.findNode("panels")
  const findNodeDefault: any = collection.findNode("default")
  const findNodeSrc: any = collection.findNode("src")
  const isBranchNodePanels = collection.isBranchNode(findNodePanels)
  const isBranchNodeDefault = collection.isBranchNode(findNodeDefault)
  const isBranchNodeSrc = collection.isBranchNode(findNodeSrc)
  const getIndexPathPanels = collection.getIndexPath("panels")
  const getIndexPathDefault = collection.getIndexPath("default")
  const getIndexPathSrc = collection.getIndexPath("src")

  const flatNodesUtils = collection.flatten()
  const flatNodesSrc = collection.flatten(findNodeSrc)

  const allValues = collection.getValues()
  const depthPanels = collection.getDepth("panels")
  const depthDefault = collection.getDepth("default")
  const depthSrc = collection.getDepth("src")

  const handleClick = (e: any) => {
    console.log(e)
  }

 <Stack>
         <Wrap w={"full"}>
           <Button size="xs" onClick={() => handleClick(collection)}>
             collection
           </Button>
           <Button size="xs" onClick={() => handleClick(getFirstNode)}>
             firstNode
           </Button>
           <Button size="xs" onClick={() => handleClick(getFirstNode)}>
             lastNode
           </Button>
           <Button size="xs" onClick={() => handleClick(getNextNodePanels)}>
             next panels
           </Button>
           <Button size="xs" onClick={() => handleClick(getNextNodeDefault)}>
             next default
           </Button>
           <Button size="xs" onClick={() => handleClick(getNextNodeSrc)}>
             next src
           </Button>
           <Button size="xs" onClick={() => handleClick(getPreviousNodePanels)}>
             previous panels
           </Button>
           <Button size="xs" onClick={() => handleClick(getPreviousNodeDefault)}>
             previous default
           </Button>
           <Button size="xs" onClick={() => handleClick(getPreviousNodeSrc)}>
             previous src
           </Button>
           <Button size="xs" onClick={() => handleClick(getParentNodesPanels)}>
             parent panels
           </Button>
           <Button size="xs" onClick={() => handleClick(getParentNodesDefault)}>
             parent default
           </Button>
           <Button size="xs" onClick={() => handleClick(getParentNodesSrc)}>
             parent src
           </Button>

           <Button size="xs" onClick={() => handleClick(findNodePanels)}>
             findNode panels
           </Button>
           <Button size="xs" onClick={() => handleClick(findNodeDefault)}>
             findNode default
           </Button>
           <Button size="xs" onClick={() => handleClick(findNodeSrc)}>
             findNode src
           </Button>

           <Button size="xs" onClick={() => handleClick(isBranchNodePanels)}>
             isBranch panels
           </Button>
           <Button size="xs" onClick={() => handleClick(isBranchNodeDefault)}>
             isBranch default
           </Button>
           <Button size="xs" onClick={() => handleClick(isBranchNodeSrc)}>
             isBranch src
           </Button>

           <Button size="xs" onClick={() => handleClick(getIndexPathPanels)}>
             indexPath panels
           </Button>
           <Button size="xs" onClick={() => handleClick(getIndexPathDefault)}>
             indexPath default
           </Button>
           <Button size="xs" onClick={() => handleClick(getIndexPathSrc)}>
             indexPath src
           </Button>

           <Button size="xs" onClick={() => handleClick(flatNodesUtils)}>
             flatNodesUtils
           </Button>
           <Button size="xs" onClick={() => handleClick(flatNodesSrc)}>
             flatNodes Src
           </Button>

           <Button size="xs" onClick={() => handleClick(allValues)}>
             allValues
           </Button>
           <Button size="xs" onClick={() => handleClick(depthPanels)}>
             depth panels
           </Button>
           <Button size="xs" onClick={() => handleClick(depthDefault)}>
             depth default
           </Button>
           <Button size="xs" onClick={() => handleClick(depthSrc)}>
             depth Src
           </Button>
         </Wrap>
       </Stack>

 */
