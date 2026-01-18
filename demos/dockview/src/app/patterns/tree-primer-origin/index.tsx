//@ts-ignore
import { chakra } from "@chakra-ui/react"

function Index() {
  return (
    <chakra.ul
      css={{
        backgroundColor: "white",
      }}
      role="tree"
      aria-label="Issues"
      data-truncate-text="true"
      className="prc-TreeView-TreeViewRootUlStyles-eZtxW"
    >
      <chakra.li
        className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
        id="item-1"
        role="treeitem"
        aria-labelledby=":rpi:"
        aria-level={1}
        aria-selected="false"
      >
        <chakra.div
          className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
          // className="--level: 1;"
        >
          <chakra.div className="grid-area: spacer; display: flex;">
            <chakra.div className="width: 100%; display: flex;"></chakra.div>
          </chakra.div>
          <chakra.div id=":rpi:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b">
            <span className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-">
              Item 1
            </span>
          </chakra.div>
        </chakra.div>
      </chakra.li>

      <chakra.li
        className="PRIVATE_TreeView-item treeview-item prc-TreeView-TreeViewItem-ShJr0"
        id="item-2"
        role="treeitem"
        aria-labelledby=":rpm: :rpp:"
        aria-level={1}
        aria-expanded="true"
        aria-selected="false"
      >
        <chakra.div
          className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
          // className="--level: 1;"
        >
          <chakra.div className="grid-area: spacer; display: flex;">
            <chakra.div className="width: 100%; display: flex;"></chakra.div>
          </chakra.div>
          <chakra.div className="PRIVATE_TreeView-item-toggle PRIVATE_TreeView-item-toggle--end prc-TreeView-TreeViewItemToggle-gWUdE prc-TreeView-TreeViewItemToggleHover-nEgP- prc-TreeView-TreeViewItemToggleEnd-t-AEB">
            <svg
              aria-hidden="true"
              focusable="false"
              className="octicon octicon-chevron-down"
              viewBox="0 0 12 12"
              width="12"
              height="12"
              fill="currentColor"
              display="inline-block"
              overflow="visible"
              // className="vertical-align: text-bottom;"
            >
              <path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path>
            </svg>
          </chakra.div>
          <chakra.div id=":rpm:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b">
            <span className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-">
              Item 2
            </span>
          </chakra.div>
          <chakra.div id=":rpp:" className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-4-mPv">
            - Press (command shift u) for more actions.
          </chakra.div>
          <chakra.div className="prc-TreeView-TreeViewItemTrailingAction-EZETP" aria-hidden="true">
            <button
              data-component="IconButton"
              type="button"
              aria-hidden="true"
              className="prc-Button-ButtonBase-c50BI prc-TreeView-TreeViewItemTrailingActionButton-u87Ku prc-Button-IconButton-szpyj"
              data-loading="false"
              data-no-visuals="true"
              data-size="medium"
              data-variant="invisible"
              aria-labelledby=":rpq:"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="octicon octicon-gear"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                display="inline-block"
                overflow="visible"
                // className="vertical-align: text-bottom;"
              >
                <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path>
              </svg>
            </button>
            <span
              className="prc-TooltipV2-Tooltip-cYMVY"
              data-direction="s"
              aria-hidden="true"
              id=":rpq:"
              popover="auto"
            >
              Item settings
            </span>
            <button
              data-component="IconButton"
              type="button"
              aria-hidden="true"
              className="prc-Button-ButtonBase-c50BI prc-TreeView-TreeViewItemTrailingActionButton-u87Ku prc-Button-IconButton-szpyj"
              data-loading="false"
              data-no-visuals="true"
              data-size="medium"
              data-variant="invisible"
              aria-labelledby=":rps:"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="octicon octicon-issue-closed"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                display="inline-block"
                overflow="visible"
                // className="vertical-align: text-bottom;"
              >
                <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
              </svg>
            </button>
            <span
              className="prc-TooltipV2-Tooltip-cYMVY"
              data-direction="s"
              aria-hidden="true"
              id=":rps:"
              popover="auto"
            >
              Issues
            </span>
          </chakra.div>
        </chakra.div>

        <chakra.ul role="group" aria-label="" className="list-style: none; padding: 0px; margin: 0px;">
          <chakra.li
            className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
            id="item-2-sub-task-1"
            role="treeitem"
            aria-labelledby=":rq4:"
            aria-level={2}
            aria-selected="false"
          >
            <chakra.div
              className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
              // className="--level: 2;"
            >
              <chakra.div className="grid-area: spacer; display: flex;">
                <chakra.div className="width: 100%; display: flex;">
                  <chakra.div className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-KPSSL"></chakra.div>
                </chakra.div>
              </chakra.div>
              <chakra.div id=":rq4:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b">
                <span className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-">
                  sub task 1
                </span>
              </chakra.div>
            </chakra.div>
          </chakra.li>
          <chakra.li
            className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
            id="item-2-sub-task-2"
            role="treeitem"
            aria-labelledby=":rq8:"
            aria-level={2}
            aria-selected="false"
          >
            <chakra.div
              className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
              // className="--level: 2;"
            >
              <chakra.div className="grid-area: spacer; display: flex;">
                <chakra.div className="width: 100%; display: flex;">
                  <chakra.div className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-KPSSL"></chakra.div>
                </chakra.div>
              </chakra.div>
              <chakra.div id=":rq8:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b">
                <span className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-">
                  sub task 2
                </span>
              </chakra.div>
            </chakra.div>
          </chakra.li>
        </chakra.ul>
      </chakra.li>
      <chakra.li
        className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
        id="item-3"
        role="treeitem"
        aria-labelledby=":rpu: :rq1:"
        aria-level={1}
        aria-selected="false"
      >
        <chakra.div
          className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
          // className="--level: 1;"
        >
          <chakra.div className="grid-area: spacer; display: flex;">
            <chakra.div className="width: 100%; display: flex;"></chakra.div>
          </chakra.div>
          <chakra.div id=":rpu:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b">
            <span className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-">
              Item 3
            </span>
          </chakra.div>
          <chakra.div id=":rq1:" className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-4-mPv">
            - Press (command shift u) for more actions.
          </chakra.div>
          <chakra.div className="prc-TreeView-TreeViewItemTrailingAction-EZETP" aria-hidden="true">
            <button
              type="button"
              aria-label="Pull Requests"
              aria-hidden="true"
              className="prc-Button-ButtonBase-c50BI prc-TreeView-TreeViewItemTrailingActionButton-u87Ku"
              data-loading="false"
              data-size="medium"
              data-variant="invisible"
              data-has-count="true"
              aria-describedby=":rq2:"
            >
              <span data-component="buttonContent" data-align="center" className="prc-Button-ButtonContent-HKbr-">
                <span data-component="leadingVisual" className="prc-Button-Visual-2epfX prc-Button-VisualWrap-Db-eB">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="octicon octicon-git-pull-request"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="currentColor"
                    display="inline-block"
                    overflow="visible"
                    // className="vertical-align: text-bottom;"
                  >
                    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
                  </svg>
                </span>
                <span data-component="trailingVisual" className="prc-Button-VisualWrap-Db-eB">
                  <span
                    aria-hidden="true"
                    data-variant="secondary"
                    data-component="ButtonCounter"
                    className="prc-Button-CounterLabel-f5-4u prc-CounterLabel-CounterLabel-ZwXPe"
                  >
                    5
                  </span>
                  <span className="prc-VisuallyHidden-VisuallyHidden-UNWQp">&nbsp;(5)</span>
                </span>
              </span>
            </button>
            <span
              className="prc-TooltipV2-Tooltip-cYMVY"
              data-direction="s"
              role="tooltip"
              aria-hidden="true"
              id=":rq2:"
              popover="auto"
            >
              Pull Requests
            </span>
          </chakra.div>
        </chakra.div>
      </chakra.li>
    </chakra.ul>
  )
}

export default Index
