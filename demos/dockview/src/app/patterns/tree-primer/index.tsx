//@ts-ignore
import { chakra, Flex } from "@chakra-ui/react"
import React, { Fragment } from "react"

function Index() {
  return (
    <>
      <div
        className="ComponentExample_ComponentExample__preview__a5WEk"
        style={{
          boxSizing: "border-box",
          padding: "1rem",
          flex: "1 1 0%",
          display: "flex",
          width: "100%",
          minHeight: "240px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="ComponentExample_ComponentExample__previewFullWidthContainer__CJFrr"
          style={{ boxSizing: "border-box", width: "stretch" }}
        >
          <ul
            className="prc-TreeView-TreeViewRootUlStyles-Mzrmj"
            aria-label="Files changed"
            role="tree"
            style={{
              boxSizing: "border-box",
              listStyle: "none",
              margin: "0px",
              padding: "0px",
            }}
          >
            <li
              id="src"
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
              aria-describedby="_R_d4nklubsnpfjjbH1_"
              aria-expanded="true"
              aria-labelledby="_R_d4nklubsnpfjjb_"
              aria-level={1}
              aria-selected="false"
              role="treeitem"
              style={{ boxSizing: "border-box", outline: "none" }}
            >
              <div
                className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer-z6qqQ"
                style={{
                  boxSizing: "border-box",
                  borderRadius: "var(--borderRadius-medium,.375rem)",
                  color: "var(--fgColor-default,var(--color-fg-default))",
                  cursor: "pointer",
                  display: "grid",
                  fontSize: "var(--text-body-size-medium,.875rem)",
                  gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                  gridTemplateColumns: "calc((1 - 1)*(1rem/2)) calc(0*1.5rem) 1rem 1fr",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    gridArea: "spacer",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      display: "flex",
                    }}
                  />
                </div>
                <div
                  className="PRIVATE_TreeView-item-toggle PRIVATE_TreeView-item-toggle--end prc-TreeView-TreeViewItemToggle-hq3Xq prc-TreeView-TreeViewItemToggleHover-H9tbt prc-TreeView-TreeViewItemToggleEnd-nWt9I"
                  style={{
                    boxSizing: "border-box",
                    gridArea: "toggle",
                    alignItems: "flex-start",
                    color: "var(--fgColor-muted,var(--color-fg-muted))",
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    paddingTop: "calc(2rem/2 - var(--base-size-12,.75rem)/2)",
                    borderBottomLeftRadius: "var(--borderRadius-medium,.375rem)",
                    borderTopLeftRadius: "var(--borderRadius-medium,.375rem)",
                  }}
                >
                  <svg
                    className="octicon octicon-chevron-down"
                    height="12"
                    width="12"
                    aria-hidden="true"
                    display="inline-block"
                    fill="currentColor"
                    focusable="false"
                    overflow="visible"
                    viewBox="0 0 12 12"
                    style={{
                      boxSizing: "border-box",
                      verticalAlign: "text-bottom",
                    }}
                  >
                    <path
                      d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"
                      style={{ boxSizing: "border-box" }}
                    />
                  </svg>
                </div>
                <div
                  id="_R_d4nklubsnpfjjb_"
                  className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-RKsCI"
                  style={{
                    boxSizing: "border-box",
                    gap: "var(--stack-gap-condensed,.5rem)",
                    gridArea: "content",
                    display: "flex",
                    height: "100%",
                    lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                    paddingRight: "",
                    paddingLeft: "",
                    paddingBottom: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                    paddingTop: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                  }}
                >
                  <div
                    id="_R_d4nklubsnpfjjbH1_"
                    className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      margin: "-1px",
                      overflow: "hidden",
                      padding: "0px",
                      borderWidth: "0px",
                      whiteSpace: "nowrap",
                      height: "1px",
                      position: "absolute",
                      width: "1px",
                      clip: "rect(0px, 0px, 0px, 0px)",
                    }}
                  />
                  <div
                    className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      alignItems: "center",
                      color: "var(--fgColor-muted,var(--color-fg-muted))",
                      display: "flex",
                      height: "var(--custom-line-height,1.3rem)",
                    }}
                  >
                    <div
                      className="PRIVATE_TreeView-directory-icon prc-TreeView-TreeViewDirectoryIcon-yP1oY"
                      style={{
                        boxSizing: "border-box",
                        color:
                          "var(--treeViewItem-leadingVisual-iconColor-rest,var(--color-tree-view-item-directory-fill))",
                        display: "grid",
                      }}
                    >
                      <svg
                        className="octicon octicon-file-directory-open-fill"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        display="inline-block"
                        fill="currentColor"
                        focusable="false"
                        overflow="visible"
                        viewBox="0 0 16 16"
                        style={{
                          boxSizing: "border-box",
                          verticalAlign: "text-bottom",
                        }}
                      >
                        <path
                          d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z"
                          style={{ boxSizing: "border-box" }}
                        />
                      </svg>
                    </div>
                  </div>
                  <span
                    className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-FFaKp"
                    style={{
                      boxSizing: "border-box",
                      flex: "1 1 auto",
                      width: "0px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    src
                  </span>
                </div>
              </div>
              <ul
                aria-label="src"
                role="group"
                style={{
                  boxSizing: "border-box",
                  listStyle: "none",
                  padding: "0px",
                  margin: "0px",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                <li
                  id="src/Avatar.tsx"
                  className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
                  aria-describedby="_r_9_ _r_a_"
                  aria-labelledby="_r_8_"
                  aria-level={2}
                  aria-selected="false"
                  role="treeitem"
                  style={{ boxSizing: "border-box", outline: "none" }}
                >
                  <div
                    className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer-z6qqQ"
                    style={{
                      boxSizing: "border-box",
                      borderRadius: "var(--borderRadius-medium,.375rem)",
                      color: "var(--fgColor-default,var(--color-fg-default))",
                      cursor: "pointer",
                      display: "grid",
                      fontSize: "var(--text-body-size-medium,.875rem)",
                      gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                      gridTemplateColumns: "calc((2 - 1)*(1rem/2)) calc(0*1.5rem) 1rem 1fr",
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        gridArea: "spacer",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <div
                          className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-F-0-2"
                          style={{
                            boxSizing: "border-box",
                            borderRight: "var(--borderWidth-thin,.0625rem) solid",
                            height: "100%",
                            width: "100%",
                            borderColor: "transparent",
                            borderTopColor: "transparent",
                            borderBottomColor: "transparent",
                            borderLeftColor: "transparent",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      id="_r_8_"
                      className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-RKsCI"
                      style={{
                        boxSizing: "border-box",
                        gap: "var(--stack-gap-condensed,.5rem)",
                        gridArea: "content",
                        display: "flex",
                        height: "100%",
                        lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                        paddingRight: "",
                        paddingLeft: "",
                        paddingBottom: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                        paddingTop: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                      }}
                    >
                      <div
                        id="_r_9_"
                        className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          margin: "-1px",
                          overflow: "hidden",
                          padding: "0px",
                          borderWidth: "0px",
                          whiteSpace: "nowrap",
                          height: "1px",
                          position: "absolute",
                          width: "1px",
                          clip: "rect(0px, 0px, 0px, 0px)",
                        }}
                      />
                      <div
                        className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          alignItems: "center",
                          color: "var(--fgColor-muted,var(--color-fg-muted))",
                          display: "flex",
                          height: "var(--custom-line-height,1.3rem)",
                        }}
                      >
                        <svg
                          className="octicon octicon-file"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          display="inline-block"
                          fill="currentColor"
                          focusable="false"
                          overflow="visible"
                          viewBox="0 0 16 16"
                          style={{
                            boxSizing: "border-box",
                            verticalAlign: "text-bottom",
                          }}
                        >
                          <path
                            d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"
                            style={{ boxSizing: "border-box" }}
                          />
                        </svg>
                      </div>
                      <span
                        className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-FFaKp"
                        style={{
                          boxSizing: "border-box",
                          flex: "1 1 auto",
                          width: "0px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Avatar.tsx
                      </span>
                      <div
                        id="_r_a_"
                        className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          margin: "-1px",
                          overflow: "hidden",
                          padding: "0px",
                          borderWidth: "0px",
                          whiteSpace: "nowrap",
                          height: "1px",
                          position: "absolute",
                          width: "1px",
                          clip: "rect(0px, 0px, 0px, 0px)",
                        }}
                      >
                        Added
                      </div>
                      <div
                        className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          alignItems: "center",
                          color: "var(--fgColor-muted,var(--color-fg-muted))",
                          display: "flex",
                          height: "var(--custom-line-height,1.3rem)",
                        }}
                      >
                        <svg
                          className="octicon octicon-diff-added"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          display="inline-block"
                          fill="var(--fgColor-success)"
                          focusable="false"
                          overflow="visible"
                          viewBox="0 0 16 16"
                          style={{
                            boxSizing: "border-box",
                            verticalAlign: "text-bottom",
                          }}
                        >
                          <path
                            d="M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1Zm10.5 1.5H2.75a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4Z"
                            style={{ boxSizing: "border-box" }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  id="src/Button.tsx"
                  className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
                  aria-current="true"
                  aria-describedby="_r_d_ _r_e_"
                  aria-labelledby="_r_c_"
                  aria-level={2}
                  aria-selected="false"
                  role="treeitem"
                  style={{ boxSizing: "border-box", outline: "none" }}
                >
                  <div
                    className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer-z6qqQ"
                    style={{
                      boxSizing: "border-box",
                      borderRadius: "var(--borderRadius-medium,.375rem)",
                      color: "var(--fgColor-default,var(--color-fg-default))",
                      cursor: "pointer",
                      display: "grid",
                      fontSize: "var(--text-body-size-medium,.875rem)",
                      gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                      gridTemplateColumns: "calc((2 - 1)*(1rem/2)) calc(0*1.5rem) 1rem 1fr",
                      position: "relative",
                      width: "100%",
                      backgroundColor:
                        "var(--control-transparent-bgColor-selected,var(--color-action-list-item-default-selected-bg))",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        gridArea: "spacer",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <div
                          className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-F-0-2"
                          style={{
                            boxSizing: "border-box",
                            borderRight: "var(--borderWidth-thin,.0625rem) solid",
                            height: "100%",
                            width: "100%",
                            borderColor: "transparent",
                            borderTopColor: "transparent",
                            borderBottomColor: "transparent",
                            borderLeftColor: "transparent",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      id="_r_c_"
                      className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-RKsCI"
                      style={{
                        boxSizing: "border-box",
                        gap: "var(--stack-gap-condensed,.5rem)",
                        gridArea: "content",
                        display: "flex",
                        height: "100%",
                        lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                        paddingRight: "",
                        paddingLeft: "",
                        paddingBottom: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                        paddingTop: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                      }}
                    >
                      <div
                        id="_r_d_"
                        className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          margin: "-1px",
                          overflow: "hidden",
                          padding: "0px",
                          borderWidth: "0px",
                          whiteSpace: "nowrap",
                          height: "1px",
                          position: "absolute",
                          width: "1px",
                          clip: "rect(0px, 0px, 0px, 0px)",
                        }}
                      />
                      <div
                        className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          alignItems: "center",
                          color: "var(--fgColor-muted,var(--color-fg-muted))",
                          display: "flex",
                          height: "var(--custom-line-height,1.3rem)",
                        }}
                      >
                        <svg
                          className="octicon octicon-file"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          display="inline-block"
                          fill="currentColor"
                          focusable="false"
                          overflow="visible"
                          viewBox="0 0 16 16"
                          style={{
                            boxSizing: "border-box",
                            verticalAlign: "text-bottom",
                          }}
                        >
                          <path
                            d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"
                            style={{ boxSizing: "border-box" }}
                          />
                        </svg>
                      </div>
                      <span
                        className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-FFaKp"
                        style={{
                          boxSizing: "border-box",
                          flex: "1 1 auto",
                          width: "0px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Button.tsx
                      </span>
                      <div
                        id="_r_e_"
                        className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          margin: "-1px",
                          overflow: "hidden",
                          padding: "0px",
                          borderWidth: "0px",
                          whiteSpace: "nowrap",
                          height: "1px",
                          position: "absolute",
                          width: "1px",
                          clip: "rect(0px, 0px, 0px, 0px)",
                        }}
                      >
                        Modified
                      </div>
                      <div
                        className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                        aria-hidden="true"
                        style={{
                          boxSizing: "border-box",
                          alignItems: "center",
                          color: "var(--fgColor-muted,var(--color-fg-muted))",
                          display: "flex",
                          height: "var(--custom-line-height,1.3rem)",
                        }}
                      >
                        <svg
                          className="octicon octicon-diff-modified"
                          height="16"
                          width="16"
                          aria-hidden="true"
                          display="inline-block"
                          fill="var(--fgColor-attention)"
                          focusable="false"
                          overflow="visible"
                          viewBox="0 0 16 16"
                          style={{
                            boxSizing: "border-box",
                            verticalAlign: "text-bottom",
                          }}
                        >
                          <path
                            d="M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"
                            style={{ boxSizing: "border-box" }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li
              id="package.json"
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
              aria-describedby="_R_l4nklubsnpfjjbH1_ _R_l4nklubsnpfjjbH2_"
              aria-labelledby="_R_l4nklubsnpfjjb_"
              aria-level={1}
              aria-selected="false"
              role="treeitem"
              tabIndex={-1}
              style={{ boxSizing: "border-box", outline: "none" }}
            >
              <div
                className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer-z6qqQ"
                style={{
                  boxSizing: "border-box",
                  borderRadius: "var(--borderRadius-medium,.375rem)",
                  color: "var(--fgColor-default,var(--color-fg-default))",
                  cursor: "pointer",
                  display: "grid",
                  fontSize: "var(--text-body-size-medium,.875rem)",
                  gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                  gridTemplateColumns: "calc((1 - 1)*(1rem/2)) calc(0*1.5rem) 1rem 1fr",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    gridArea: "spacer",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      display: "flex",
                    }}
                  />
                </div>
                <div
                  id="_R_l4nklubsnpfjjb_"
                  className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-RKsCI"
                  style={{
                    boxSizing: "border-box",
                    gap: "var(--stack-gap-condensed,.5rem)",
                    gridArea: "content",
                    display: "flex",
                    height: "100%",
                    lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                    paddingRight: "",
                    paddingLeft: "",
                    paddingBottom: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                    paddingTop: "calc((2rem - var(--custom-line-height, 1.3rem))/2)",
                  }}
                >
                  <div
                    id="_R_l4nklubsnpfjjbH1_"
                    className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      margin: "-1px",
                      overflow: "hidden",
                      padding: "0px",
                      borderWidth: "0px",
                      whiteSpace: "nowrap",
                      height: "1px",
                      position: "absolute",
                      width: "1px",
                      clip: "rect(0px, 0px, 0px, 0px)",
                    }}
                  />
                  <div
                    className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      alignItems: "center",
                      color: "var(--fgColor-muted,var(--color-fg-muted))",
                      display: "flex",
                      height: "var(--custom-line-height,1.3rem)",
                    }}
                  >
                    <svg
                      className="octicon octicon-file"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      display="inline-block"
                      fill="currentColor"
                      focusable="false"
                      overflow="visible"
                      viewBox="0 0 16 16"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "text-bottom",
                      }}
                    >
                      <path
                        d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"
                        style={{ boxSizing: "border-box" }}
                      />
                    </svg>
                  </div>
                  <span
                    className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-FFaKp"
                    style={{
                      boxSizing: "border-box",
                      flex: "1 1 auto",
                      width: "0px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    package.json
                  </span>
                  <div
                    id="_R_l4nklubsnpfjjbH2_"
                    className="PRIVATE_VisuallyHidden prc-TreeView-TreeViewVisuallyHidden-1N8xK"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      margin: "-1px",
                      overflow: "hidden",
                      padding: "0px",
                      borderWidth: "0px",
                      whiteSpace: "nowrap",
                      height: "1px",
                      position: "absolute",
                      width: "1px",
                      clip: "rect(0px, 0px, 0px, 0px)",
                    }}
                  >
                    Modified
                  </div>
                  <div
                    className="PRIVATE_TreeView-item-visual prc-TreeView-TreeViewItemVisual-naWzj"
                    aria-hidden="true"
                    style={{
                      boxSizing: "border-box",
                      alignItems: "center",
                      color: "var(--fgColor-muted,var(--color-fg-muted))",
                      display: "flex",
                      height: "var(--custom-line-height,1.3rem)",
                    }}
                  >
                    <svg
                      className="octicon octicon-diff-modified"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      display="inline-block"
                      fill="var(--fgColor-attention)"
                      focusable="false"
                      overflow="visible"
                      viewBox="0 0 16 16"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "text-bottom",
                      }}
                    >
                      <path
                        d="M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"
                        style={{ boxSizing: "border-box" }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Index

/*

 <div className="flex min-h-60 w-full flex-1 items-center justify-center p-4">
        <div className="w-[stretch]">
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            <div />
          </span>
          <ul className="m-0 p-0 [list-style:none]" data-truncate-text="true" aria-label="Files changed" role="tree">
            <li
              aria-selected="false"
              aria-expanded="true"
              aria-level={1}
              aria-describedby="_R_d4nklubsnpfjjbH1_"
              aria-labelledby="_R_d4nklubsnpfjjb_"
              role="treeitem"
              id="src"
              tabIndex={-1}
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
            >
              <div className="[grid-template-areas: spacer leadingaction toggle content trailingaction] relative grid w-full cursor-pointer grid-cols-[0px_0px_16px_878px_0px] rounded-md text-sm text-[#1f2328]">
                <div className="flex [grid-area:spacer]">
                  <div className="flex w-full" />
                </div>
                <div className="flex h-full items-start justify-center rounded-bl-md rounded-tl-md pt-2.5 text-[#59636e] [grid-area:toggle]">
                  <svg
                    overflow="visible"
                    display="inline-block"
                    fill="currentColor"
                    height={12}
                    width={12}
                    viewBox="0 0 12 12"
                    className="octicon octicon-chevron-down"
                    aria-hidden="true"
                  >
                    <path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" />
                  </svg>
                </div>
                <div
                  className="flex h-full gap-2 px-2 py-[5.6px] leading-5 [grid-area:content]"
                  id="_R_d4nklubsnpfjjb_"
                >
                  <div
                    id="_R_d4nklubsnpfjjbH1_"
                    aria-hidden="true"
                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                  />
                  <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                    <div className="grid text-[#54aeff]">
                      <svg
                        overflow="visible"
                        display="inline-block"
                        fill="currentColor"
                        height={16}
                        width={16}
                        viewBox="0 0 16 16"
                        className="octicon octicon-file-directory-open-fill"
                        aria-hidden="true"
                      >
                        <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z" />
                      </svg>
                    </div>
                  </div>
                  <span className="w-0 flex-auto overflow-hidden text-ellipsis whitespace-nowrap">src</span>
                </div>
              </div>
              <ul className="m-0 p-0 [list-style:none]" aria-label="src" role="group">
                <li
                  aria-selected="false"
                  aria-level={2}
                  aria-describedby="_R_1dd4nklubsnpfjjbH1_ _R_1dd4nklubsnpfjjbH2_"
                  aria-labelledby="_R_1dd4nklubsnpfjjb_"
                  role="treeitem"
                  id="src/Avatar.tsx"
                  tabIndex={-1}
                  className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
                >
                  <div className="[grid-template-areas: spacer leadingaction toggle content trailingaction] relative grid w-full cursor-pointer grid-cols-[8px_0px_16px_870px_0px] rounded-md text-sm text-[#1f2328]">
                    <div className="flex [grid-area:spacer]">
                      <div className="flex w-full">
                        <div className="OqCXpZ h-full w-full border-r border-solid border-transparent" />
                      </div>
                    </div>
                    <div
                      className="flex h-full gap-2 px-2 py-[5.6px] leading-5 [grid-area:content]"
                      id="_R_1dd4nklubsnpfjjb_"
                    >
                      <div
                        id="_R_1dd4nklubsnpfjjbH1_"
                        aria-hidden="true"
                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      />
                      <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                        <svg
                          overflow="visible"
                          display="inline-block"
                          fill="currentColor"
                          height={16}
                          width={16}
                          viewBox="0 0 16 16"
                          className="octicon octicon-file"
                          aria-hidden="true"
                        >
                          <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
                        </svg>
                      </div>
                      <span className="w-0 flex-auto overflow-hidden text-ellipsis whitespace-nowrap">Avatar.tsx</span>
                      <div
                        id="_R_1dd4nklubsnpfjjbH2_"
                        aria-hidden="true"
                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      >
                        Added
                      </div>
                      <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                        <svg
                          overflow="visible"
                          display="inline-block"
                          fill="var(--fgColor-success)"
                          height={16}
                          width={16}
                          viewBox="0 0 16 16"
                          className="octicon octicon-diff-added"
                          aria-hidden="true"
                        >
                          <path d="M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1Zm10.5 1.5H2.75a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  aria-selected="false"
                  aria-current="true"
                  aria-level={2}
                  aria-describedby="_R_2dd4nklubsnpfjjbH1_ _R_2dd4nklubsnpfjjbH2_"
                  aria-labelledby="_R_2dd4nklubsnpfjjb_"
                  role="treeitem"
                  id="src/Button.tsx"
                  tabIndex={0}
                  className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
                >
                  <div className="[grid-template-areas: spacer leadingaction toggle content trailingaction] relative grid w-full cursor-pointer grid-cols-[8px_0px_16px_870px_0px] rounded-md bg-[rgba(129,139,152,0.15)] text-sm text-[#1f2328]">
                    <div className="flex [grid-area:spacer]">
                      <div className="flex w-full">
                        <div className="TWeRwe h-full w-full border-r border-solid border-transparent" />
                      </div>
                    </div>
                    <div
                      className="flex h-full gap-2 px-2 py-[5.6px] leading-5 [grid-area:content]"
                      id="_R_2dd4nklubsnpfjjb_"
                    >
                      <div
                        id="_R_2dd4nklubsnpfjjbH1_"
                        aria-hidden="true"
                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      />
                      <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                        <svg
                          overflow="visible"
                          display="inline-block"
                          fill="currentColor"
                          height={16}
                          width={16}
                          viewBox="0 0 16 16"
                          className="octicon octicon-file"
                          aria-hidden="true"
                        >
                          <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
                        </svg>
                      </div>
                      <span className="w-0 flex-auto overflow-hidden text-ellipsis whitespace-nowrap">Button.tsx</span>
                      <div
                        id="_R_2dd4nklubsnpfjjbH2_"
                        aria-hidden="true"
                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      >
                        Modified
                      </div>
                      <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                        <svg
                          overflow="visible"
                          display="inline-block"
                          fill="var(--fgColor-attention)"
                          height={16}
                          width={16}
                          viewBox="0 0 16 16"
                          className="octicon octicon-diff-modified"
                          aria-hidden="true"
                        >
                          <path d="M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li
              aria-selected="false"
              aria-level={1}
              aria-describedby="_R_l4nklubsnpfjjbH1_ _R_l4nklubsnpfjjbH2_"
              aria-labelledby="_R_l4nklubsnpfjjb_"
              role="treeitem"
              id="package.json"
              tabIndex={-1}
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-Ter5f"
            >
              <div className="[grid-template-areas: spacer leadingaction toggle content trailingaction] relative grid w-full cursor-pointer grid-cols-[0px_0px_16px_878px_0px] rounded-md text-sm text-[#1f2328]">
                <div className="flex [grid-area:spacer]">
                  <div className="flex w-full" />
                </div>
                <div
                  className="flex h-full gap-2 px-2 py-[5.6px] leading-5 [grid-area:content]"
                  id="_R_l4nklubsnpfjjb_"
                >
                  <div
                    id="_R_l4nklubsnpfjjbH1_"
                    aria-hidden="true"
                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                  />
                  <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                    <svg
                      overflow="visible"
                      display="inline-block"
                      fill="currentColor"
                      height={16}
                      width={16}
                      viewBox="0 0 16 16"
                      className="octicon octicon-file"
                      aria-hidden="true"
                    >
                      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
                    </svg>
                  </div>
                  <span className="w-0 flex-auto overflow-hidden text-ellipsis whitespace-nowrap">package.json</span>
                  <div
                    id="_R_l4nklubsnpfjjbH2_"
                    aria-hidden="true"
                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                  >
                    Modified
                  </div>
                  <div aria-hidden="true" className="flex h-[20.7969px] items-center text-[#59636e]">
                    <svg
                      overflow="visible"
                      display="inline-block"
                      fill="var(--fgColor-attention)"
                      height={16}
                      width={16}
                      viewBox="0 0 16 16"
                      className="octicon octicon-diff-modified"
                      aria-hidden="true"
                    >
                      <path d="M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

function Index() {
  return (
    <chakra.div
      //prc-TreeView-TreeViewRootUlStyles-eZtxW
      css={{

        display: "block",
      }}
    >
      <chakra.ul
        css={{
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        role="tree"
        aria-label="Issues"
        data-truncate-text="true"
        // className="prc-TreeView-TreeViewRootUlStyles-eZtxW"
      >
        <chakra.li
          // className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
          css={{
            outline: "none",
            // display: 'list-item',
          }}
          id="item-1"
          role="treeitem"
          aria-labelledby=":rpi:"
          aria-level={1}
          aria-selected="false"
        >
          <chakra.div
            css={{
              "--level": "1",
              "--toggle-width": "1rem",
              "--min-item-height": "2rem",
              borderRadius: "var(--borderRadius-medium,.375rem)",
              color: "var(--fgColor-default,var(--color-fg-default))",
              cursor: "pointer",
              display: "grid",
              fontSize: "var(--text-body-size-medium,.875rem)",
              gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
              gridTemplateColumns: "var(--spacer-width) var(--leading-action-width) var(--toggle-width) 1fr",
              position: "relative",
              width: "100%",
              "--leading-action-width": "calc(var(--has-leading-action, 0)*1.5rem)",
              "--spacer-width": "calc((var(--level) - 1)*(var(--toggle-width)/2))",
            }}
            // className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
            // className="--level: 1;"
          >
            <chakra.div css={{ gridArea: "spacer", display: "flex" }}>
              <chakra.div
                css={{
                  width: "100%",
                  display: "flex",
                }}
              ></chakra.div>
            </chakra.div>
            <chakra.div
              css={{
                display: "flex",
                gap: "var(--stack-gap-condensed,.5rem)",
                gridArea: "content",
                height: "100%",
                lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                padding: "0 var(--base-size-8,.5rem)",
                paddingBottom: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                paddingTop: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
              }}

              // id=":rpi:" className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b"
            >
              <chakra.span
                css={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                // className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-"
              >
                Item 1
              </chakra.span>
            </chakra.div>
          </chakra.div>
        </chakra.li>

        <chakra.li
          css={{ outline: "none" }}
          className="PRIVATE_TreeView-item treeview-item prc-TreeView-TreeViewItem-ShJr0"
          id="item-2"
          role="treeitem"
          aria-labelledby=":rpm: :rpp:"
          aria-level={1}
          aria-expanded="true"
          aria-selected="false"
        >
          <chakra.div
            css={{
              "--level": "1",
              "--toggle-width": "1rem",
              "--min-item-height": "2rem",
              borderRadius: "var(--borderRadius-medium,.375rem)",
              color: "var(--fgColor-default,var(--color-fg-default))",
              cursor: "pointer",
              display: "grid",
              fontSize: "var(--text-body-size-medium,.875rem)",
              gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
              gridTemplateColumns: "var(--spacer-width) var(--leading-action-width) var(--toggle-width) 1fr",
              position: "relative",
              width: "100%",
              "--leading-action-width": "calc(var(--has-leading-action, 0)*1.5rem)",
              "--spacer-width": "calc((var(--level) - 1)*(var(--toggle-width)/2))",
            }}
            className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
            // className="--level: 1;"
          >
            <chakra.div css={{ gridArea: "spacer", display: "flex" }}>
              <chakra.div
                css={{
                  width: "100%",
                  display: "flex",
                }}
                // className="width: 100%; display: flex;"
              ></chakra.div>
            </chakra.div>
            <chakra.div
              className="PRIVATE_TreeView-item-toggle PRIVATE_TreeView-item-toggle--end prc-TreeView-TreeViewItemToggle-gWUdE prc-TreeView-TreeViewItemToggleHover-nEgP- prc-TreeView-TreeViewItemToggleEnd-t-AEB"
              css={{
                //prc-TreeView-TreeViewRootUlStyles-eZtxW .prc-TreeView-TreeViewItemToggleEnd-t-AEB
                borderBottomLeftRadius: "var(--borderRadius-medium,.375rem)",
                borderTopLeftRadius: "var(--borderRadius-medium,.375rem)",

                //.prc-TreeView-TreeViewRootUlStyles-eZtxW .prc-TreeView-TreeViewItemToggle-gWUdE
                alignItems: "flex-start",
                color: "var(--fgColor-muted,var(--color-fg-muted))",
                display: "flex",
                gridArea: "toggle",
                height: "100%",
                justifyContent: "center",
                paddingTop: "calc(var(--min-item-height)/2 - var(--base-size-12,.75rem)/2)",
              }}
            >
              <chakra.svg
                css={{
                  verticalAlign: "text-bottom",
                }}
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
              </chakra.svg>
            </chakra.div>
            <chakra.div
              id=":rpm:"
              className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b"
              css={{
                display: "flex",
                gap: "var(--stack-gap-condensed,.5rem)",
                gridArea: "content",
                height: "100%",
                lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                padding: "0 var(--base-size-8,.5rem)",
                paddingBottom: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                paddingTop: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
              }}
            >
              <chakra.span
                css={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                // className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-"
              >
                Item 2
              </chakra.span>
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
              <chakra.span
                className="prc-TooltipV2-Tooltip-cYMVY"
                data-direction="s"
                aria-hidden="true"
                id=":rpq:"
                popover="auto"
              >
                Item settings
              </chakra.span>
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
              <chakra.span
                className="prc-TooltipV2-Tooltip-cYMVY"
                data-direction="s"
                aria-hidden="true"
                id=":rps:"
                popover="auto"
              >
                Issues
              </chakra.span>
            </chakra.div>
          </chakra.div>

          <chakra.ul role="group" aria-label="" className="list-style: none; padding: 0px; margin: 0px;">
            <chakra.li
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
              css={{
                outline: "none",
                // display: 'list-item',
              }}
              id="item-2-sub-task-1"
              role="treeitem"
              aria-labelledby=":rq4:"
              aria-level={2}
              aria-selected="false"
            >
              <chakra.div
                css={{
                  "--level": "1",
                  "--toggle-width": "1rem",
                  "--min-item-height": "2rem",
                  borderRadius: "var(--borderRadius-medium,.375rem)",
                  color: "var(--fgColor-default,var(--color-fg-default))",
                  cursor: "pointer",
                  display: "grid",
                  fontSize: "var(--text-body-size-medium,.875rem)",
                  gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                  gridTemplateColumns: "var(--spacer-width) var(--leading-action-width) var(--toggle-width) 1fr",
                  position: "relative",
                  width: "100%",
                  "--leading-action-width": "calc(var(--has-leading-action, 0)*1.5rem)",
                  "--spacer-width": "calc((var(--level) - 1)*(var(--toggle-width)/2))",
                }}
                className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
                // className="--level: 2;"
              >
                <chakra.div css={{ gridArea: "spacer", display: "flex" }}>
                  <chakra.div
                    className="width: 100%; display: flex;"
                    css={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <chakra.div className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-KPSSL"></chakra.div>
                  </chakra.div>
                </chakra.div>
                <chakra.div
                  id=":rq4:"
                  className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b"
                  css={{
                    display: "flex",
                    gap: "var(--stack-gap-condensed,.5rem)",
                    gridArea: "content",
                    height: "100%",
                    lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                    padding: "0 var(--base-size-8,.5rem)",
                    paddingBottom: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                    paddingTop: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                  }}
                >
                  <chakra.span
                    css={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    // className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-"
                  >
                    sub task 1
                  </chakra.span>
                </chakra.div>
              </chakra.div>
            </chakra.li>
            <chakra.li
              className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
              css={{
                outline: "none",
                // display: 'list-item',
              }}
              id="item-2-sub-task-2"
              role="treeitem"
              aria-labelledby=":rq8:"
              aria-level={2}
              aria-selected="false"
            >
              <chakra.div
                css={{
                  "--level": "1",
                  "--toggle-width": "1rem",
                  "--min-item-height": "2rem",
                  borderRadius: "var(--borderRadius-medium,.375rem)",
                  color: "var(--fgColor-default,var(--color-fg-default))",
                  cursor: "pointer",
                  display: "grid",
                  fontSize: "var(--text-body-size-medium,.875rem)",
                  gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
                  gridTemplateColumns: "var(--spacer-width) var(--leading-action-width) var(--toggle-width) 1fr",
                  position: "relative",
                  width: "100%",
                  "--leading-action-width": "calc(var(--has-leading-action, 0)*1.5rem)",
                  "--spacer-width": "calc((var(--level) - 1)*(var(--toggle-width)/2))",
                }}
                className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
                // className="--level: 2;"
              >
                <chakra.div css={{ gridArea: "spacer", display: "flex" }}>
                  <chakra.div
                    className="width: 100%; display: flex;"
                    css={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <chakra.div className="PRIVATE_TreeView-item-level-line prc-TreeView-TreeViewItemLevelLine-KPSSL"></chakra.div>
                  </chakra.div>
                </chakra.div>
                <chakra.div
                  id=":rq8:"
                  className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b"
                  css={{
                    display: "flex",
                    gap: "var(--stack-gap-condensed,.5rem)",
                    gridArea: "content",
                    height: "100%",
                    lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                    padding: "0 var(--base-size-8,.5rem)",
                    paddingBottom: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                    paddingTop: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                  }}
                >
                  <chakra.span
                    css={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    // className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-"
                  >
                    sub task 2
                  </chakra.span>
                </chakra.div>
              </chakra.div>
            </chakra.li>
          </chakra.ul>
        </chakra.li>
        <chakra.li
          className="PRIVATE_TreeView-item prc-TreeView-TreeViewItem-ShJr0"
          css={{
            outline: "none",
            // display: 'list-item',
          }}
          id="item-3"
          role="treeitem"
          aria-labelledby=":rpu: :rq1:"
          aria-level={1}
          aria-selected="false"
        >
          <chakra.div
            css={{
              "--level": "1",
              "--toggle-width": "1rem",
              "--min-item-height": "2rem",
              borderRadius: "var(--borderRadius-medium,.375rem)",
              color: "var(--fgColor-default,var(--color-fg-default))",
              cursor: "pointer",
              display: "grid",
              fontSize: "var(--text-body-size-medium,.875rem)",
              gridTemplateAreas: '"spacer leadingAction toggle content trailingAction"',
              gridTemplateColumns: "var(--spacer-width) var(--leading-action-width) var(--toggle-width) 1fr",
              position: "relative",
              width: "100%",
              "--leading-action-width": "calc(var(--has-leading-action, 0)*1.5rem)",
              "--spacer-width": "calc((var(--level) - 1)*(var(--toggle-width)/2))",
            }}
            className="PRIVATE_TreeView-item-container prc-TreeView-TreeViewItemContainer--2Rkn"
            // className="--level: 1;"
          >
            <chakra.div css={{ gridArea: "spacer", display: "flex" }}>
              <chakra.div
                className="width: 100%; display: flex;"
                css={{
                  width: "100%",
                  display: "flex",
                }}
              ></chakra.div>
            </chakra.div>
            <chakra.div
              id=":rpu:"
              className="PRIVATE_TreeView-item-content prc-TreeView-TreeViewItemContent-f0r0b"
              css={{
                display: "flex",
                gap: "var(--stack-gap-condensed,.5rem)",
                gridArea: "content",
                height: "100%",
                lineHeight: "var(--custom-line-height,var(--text-body-lineHeight-medium,1.4285))",
                padding: "0 var(--base-size-8,.5rem)",
                paddingBottom: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
                paddingTop: "calc((var(--min-item-height) - var(--custom-line-height, 1.3rem))/2)",
              }}
            >
              <chakra.span
                css={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                // className="PRIVATE_TreeView-item-content-text prc-TreeView-TreeViewItemContentText-smZM-"
              >
                Item 3
              </chakra.span>
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
                <chakra.span
                  data-component="buttonContent"
                  data-align="center"
                  className="prc-Button-ButtonContent-HKbr-"
                >
                  <chakra.span
                    data-component="leadingVisual"
                    className="prc-Button-Visual-2epfX prc-Button-VisualWrap-Db-eB"
                  >
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
                  </chakra.span>
                  <chakra.span data-component="trailingVisual" className="prc-Button-VisualWrap-Db-eB">
                    <chakra.span
                      aria-hidden="true"
                      data-variant="secondary"
                      data-component="ButtonCounter"
                      className="prc-Button-CounterLabel-f5-4u prc-CounterLabel-CounterLabel-ZwXPe"
                    >
                      5
                    </chakra.span>
                    <chakra.span className="prc-VisuallyHidden-VisuallyHidden-UNWQp">&nbsp;(5)</chakra.span>
                  </chakra.span>
                </chakra.span>
              </button>
              <chakra.span
                className="prc-TooltipV2-Tooltip-cYMVY"
                data-direction="s"
                role="tooltip"
                aria-hidden="true"
                id=":rq2:"
                popover="auto"
              >
                Pull Requests
              </chakra.span>
            </chakra.div>
          </chakra.div>
        </chakra.li>
      </chakra.ul>
    </chakra.div>
  )
}


 */
