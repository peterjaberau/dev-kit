'use client'
import React, { forwardRef } from "react"
// import "./style.css"
import { Center, chakra, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";



function Index() {

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true); // runs after hydration + CSS applied
  }, []);

  if (!ready) return null; // or a loader
  return (
    <chakra.div
      style={{
        color: "#172B4D",
        font: "var(--ds-font-body, normal 400 14px/1.42857142857143 -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif)",
        textDecorationSkipInk: "auto",
        margin: "0px",
        padding: "12pt",
        visibility: "visible",
      }}
    >
      <chakra.div
        data-scope="page-container"
        style={{
          margin: "0px",
          padding: "0px",
          borderRadius: "sm",
          borderColor: "#0b120e24",
          borderWidth: "thin",
          borderStyle: "solid",
          width: "20pc",
          backgroundColor: "#fff",
        }}
      >
        <chakra.div
          data-scope="sidebar"
          style={{
            margin: "0px",
            padding: "0px",
            flex: "1 1 0px",
            overflow: "auto",
          }}
          data-auto-scrollable={true}
        >
          <chakra.div
            data-scope="sidebar-content"
            style={{
              margin: "0px",
              padding: "0px",
              paddingBlockStart: "9pt",
              paddingInlineEnd: "9pt",
              paddingBlockEnd: "9pt",
              paddingInlineStart: "9pt",
            }}
          >
            <chakra.div data-scope="menu-list" role="list" css={{ margin: "0px", padding: "0px" }}>
              <chakra.div
                data-scope="group-drop-indicator"
                data-drop-target-for-element="true"
                style={{ margin: "0px", padding: "0px" }}
              >
                <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                  <chakra.div
                    css={{
                      "--actions-on-hover-padding": 0,
                      "--actions-on-hover-opacity": 0,
                      "--actions-on-hover-width": 0,
                      "--element-after-display": "flex",
                      "--notch-color": "transparent",
                      margin: "0px",
                      padding: "0px",
                      borderRadius: "sm",
                      gridTemplateColumns: "minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)",
                      gridTemplateAreas: '"elem-before interactive elem-after actions"',
                      gridTemplateRows: "1fr",
                      boxSizing: "border-box",
                      display: "grid",
                      minWidth: "72px",
                      height: "2rem",
                      alignItems: "center",
                      userSelect: "none",
                    }}
                    data-drop-target-for-element="true"
                  >
                    <chakra.button
                      type="button"
                      draggable={true}
                      css={{
                        "--drag-handle-display": "none",
                        borderRadius: "sm",
                        border: "none",
                        gridArea: "1 / 1 / auto / -1",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        display: "grid",
                        alignItems: "center",

                        position: "relative",
                        gridTemplateColumns: "subgrid",
                        gridTemplateRows: "subgrid",
                        paddingInlineEnd: "4px",
                        paddingInlineStart: "4px",
                        paddingBlockStart: "4px",
                        paddingBlockEnd: "4px",
                        backgroundColor: "transparent",
                        textAlign: "start",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          gridArea: "interactive",
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "center",
                        }}
                      >
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            inset: 0,
                            insetInlineStart: "calc(0px)",
                            position: "absolute",
                          }}
                        />
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gap: "2px",
                            overflow: "hidden",
                            display: "flex",
                            paddingInlineEnd: "4px",
                            paddingInlineStart: "4px",
                            flexDirection: "column",
                            minWidth: "1ch",
                          }}
                        >
                          <chakra.span
                            style={{
                              overflow: "hidden",
                              margin: "0px",
                              WebkitLineClamp: "1",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",

                              overflowWrap: "anywhere",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              wordBreak: "break-all",
                              fontWeight: "500",
                            }}
                          >
                            {"For you"}
                          </chakra.span>
                        </chakra.div>
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            insetBlock: "0px",
                            justifyContent: "center",

                            flexDirection: "column",
                            position: "absolute",
                            display: "none",
                            insetInlineStart: "0px",
                            marginInlineStart: "-9pt",
                          }}
                        >
                          <chakra.span
                            aria-hidden="true"
                            style={{
                              color: "currentcolor",
                              boxSizing: "border-box",
                              flexShrink: 0,
                              display: "inline-block",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              lineHeight: "9pt",
                            }}
                          >
                            <svg
                              fill="none"
                              role="presentation"
                              viewBox="0 0 16 16"
                              style={{
                                overflow: "hidden",
                                color: "currentcolor",
                                pointerEvents: "none",
                                verticalAlign: "bottom",
                                width: "9pt",
                                height: "9pt",
                              }}
                            >
                              <path
                                d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                fill="currentcolor"
                              />
                            </svg>
                          </chakra.span>
                        </chakra.div>
                      </chakra.div>
                    </chakra.button>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-before",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        paddingInlineStart: "4px",
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        boxSizing: "content-box",
                        pointerEvents: "none",
                      }}
                    >
                      <chakra.span
                        aria-hidden="true"
                        style={{
                          color: "currentcolor",
                          boxSizing: "border-box",
                          flexShrink: 0,
                          display: "inline-block",
                          lineHeight: 1,
                          paddingInlineEnd: 0,
                          paddingInlineStart: 0,
                        }}
                      >
                        <svg
                          fill="none"
                          role="presentation"
                          viewBox="0 0 16 16"
                          style={{
                            overflow: "hidden",
                            color: "currentcolor",
                            pointerEvents: "none",
                            verticalAlign: "bottom",
                            width: "12pt",
                            height: "12pt",
                          }}
                        >
                          <path
                            clipRule="evenodd"
                            d="M8 1.5a6.5 6.5 0 0 0-4.148 11.505A2.75 2.75 0 0 1 6.5 11h3c1.26 0 2.323.848 2.648 2.005A6.5 6.5 0 0 0 8 1.5m2.75 12.392v-.142c0-.69-.56-1.25-1.25-1.25h-3c-.69 0-1.25.56-1.25 1.25v.142l.06.027c.82.373 1.73.581 2.69.581s1.87-.208 2.69-.58q.03-.016.06-.028M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-3.5 2a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                            fill="currentcolor"
                            fillRule="evenodd"
                          />
                        </svg>
                      </chakra.span>
                    </chakra.div>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-after",
                        gap: "4px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        opacity: 0,
                        width: "0",
                        paddingInlineEnd: 0,
                      }}
                    >
                      <chakra.button
                        type="button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        style={{
                          borderRadius: "3px",
                          transition: "background 0.1s ease-out",
                          border: "0px none",
                          paddingBlock: "2px",
                          fontStyle: "",
                          fontVariantLigatures: "",

                          fontStretch: "",
                          fontSize: "",

                          fontFamily: "",

                          fontSizeAdjust: "",

                          fontFeatureSettings: "",
                          fontVariationSettings: "",
                          fontLanguageOverride: "",
                          display: "inline-flex",
                          verticalAlign: "middle",
                          justifyContent: "center",
                          boxSizing: "border-box",

                          position: "relative",
                          appearance: "none",
                          cursor: "pointer",
                          textAlign: "center",
                          fontWeight: "500",
                          flexShrink: 0,
                          maxWidth: "100%",
                          alignItems: "baseline",
                          columnGap: "4px",
                          textDecorationColor: "currentcolor",
                          textDecorationLine: "none",
                          textDecorationStyle: "solid",
                          height: "1.5rem",
                          paddingInlineEnd: 0,
                          paddingInlineStart: 0,
                          width: "1.5rem",
                          backgroundColor: "transparent",
                        }}
                      >
                        <chakra.span
                          style={{
                            transition: "opacity 0.3s",
                            display: "flex",
                            userSelect: "none",
                            flexShrink: 0,
                            flexGrow: 0,
                            alignSelf: "center",
                            fontSize: "0px",
                            lineHeight: 0,
                          }}
                        >
                          <chakra.span
                            aria-hidden="true"
                            style={{
                              color: "currentcolor",
                              boxSizing: "border-box",
                              flexShrink: 0,
                              display: "inline-block",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              lineHeight: "9pt",
                            }}
                          >
                            <svg
                              fill="none"
                              role="presentation"
                              viewBox="0 0 16 16"
                              style={{
                                overflow: "hidden",
                                color: "currentcolor",
                                pointerEvents: "none",
                                verticalAlign: "bottom",
                                width: "9pt",
                                height: "9pt",
                              }}
                            >
                              <path
                                clipRule="evenodd"
                                d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                fill="currentcolor"
                                fillRule="evenodd"
                              />
                            </svg>
                            <chakra.span
                              style={{
                                border: "0px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                padding: "0px",
                                userSelect: "none",
                                position: "absolute",
                                width: "1px",
                                height: "1px",
                                clip: "rect(1px, 1px, 1px, 1px)",
                              }}
                            >
                              {"More actions"}
                            </chakra.span>
                          </chakra.span>
                        </chakra.span>
                      </chakra.button>
                    </chakra.div>
                  </chakra.div>
                </chakra.div>
                <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                  <chakra.div
                    style={{
                      margin: "0px",
                      padding: "0px",
                      borderRadius: "sm",
                      gridTemplate:
                        '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                      boxSizing: "border-box",
                      display: "grid",
                      minWidth: "72px",
                      height: "2rem",
                      alignItems: "center",
                      userSelect: "none",
                    }}
                  >
                    <chakra.button
                      type="button"
                      aria-controls="uid5"
                      aria-expanded="false"
                      aria-haspopup="true"
                      draggable
                      style={{
                        borderRadius: "sm",
                        border: "none",
                        gridArea: "1 / 1 / auto / -1",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        display: "grid",
                        alignItems: "center",

                        position: "relative",
                        gridTemplateColumns: "subgrid",
                        gridTemplateRows: "subgrid",
                        paddingInlineEnd: "4px",
                        paddingInlineStart: "4px",
                        paddingBlockStart: "4px",
                        paddingBlockEnd: "4px",
                        backgroundColor: "transparent",
                        textAlign: "start",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          gridArea: "interactive",
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "center",
                        }}
                      >
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            inset: 0,
                            insetInlineStart: "calc(0px)",
                            position: "absolute",
                          }}
                        />
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gap: "2px",
                            overflow: "hidden",
                            display: "flex",
                            paddingInlineEnd: "4px",
                            paddingInlineStart: "4px",
                            flexDirection: "column",
                            minWidth: "1ch",
                          }}
                        >
                          <chakra.span
                            style={{
                              overflow: "hidden",
                              margin: "0px",
                              WebkitLineClamp: "1",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",

                              overflowWrap: "anywhere",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              wordBreak: "break-all",
                              fontWeight: "500",
                            }}
                          >
                            {"Recent"}
                          </chakra.span>
                        </chakra.div>
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            insetBlock: "0px",
                            justifyContent: "center",

                            flexDirection: "column",
                            position: "absolute",
                            display: "none",
                            insetInlineStart: "0px",
                            marginInlineStart: "-9pt",
                          }}
                        >
                          <chakra.span
                            aria-hidden="true"
                            style={{
                              color: "currentcolor",
                              boxSizing: "border-box",
                              flexShrink: 0,
                              display: "inline-block",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              lineHeight: "9pt",
                            }}
                          >
                            <svg
                              fill="none"
                              role="presentation"
                              viewBox="0 0 16 16"
                              style={{
                                overflow: "hidden",
                                color: "currentcolor",
                                pointerEvents: "none",
                                verticalAlign: "bottom",
                                width: "9pt",
                                height: "9pt",
                              }}
                            >
                              <path
                                d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                fill="currentcolor"
                              />
                            </svg>
                          </chakra.span>
                        </chakra.div>
                      </chakra.div>
                    </chakra.button>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-before",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        paddingInlineStart: "4px",
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        boxSizing: "content-box",
                        pointerEvents: "none",
                      }}
                    >
                      <chakra.span
                        aria-hidden="true"
                        style={{
                          color: "currentcolor",
                          boxSizing: "border-box",
                          flexShrink: 0,
                          display: "inline-block",
                          lineHeight: 1,
                          paddingInlineEnd: 0,
                          paddingInlineStart: 0,
                        }}
                      >
                        <svg
                          fill="none"
                          role="presentation"
                          viewBox="0 0 16 16"
                          style={{
                            overflow: "hidden",
                            color: "currentcolor",
                            pointerEvents: "none",
                            verticalAlign: "bottom",
                            width: "12pt",
                            height: "12pt",
                          }}
                        >
                          <path
                            d="M14.5 8a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0M8.75 3.25v4.389l2.219 1.775-.938 1.172-2.5-2-.281-.226V3.25zM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"
                            fill="currentcolor"
                          />
                        </svg>
                      </chakra.span>
                    </chakra.div>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-after",
                        overflow: "hidden",
                        alignItems: "center",
                        position: "relative",
                        paddingInlineEnd: "4px",
                        flexShrink: 0,
                        height: "24px",
                        pointerEvents: "none",
                        display: "flex",
                      }}
                    >
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          paddingInline: "6px",
                        }}
                      >
                        <chakra.span
                          aria-hidden="true"
                          style={{
                            color: "currentcolor",
                            boxSizing: "border-box",
                            flexShrink: 0,
                            display: "inline-block",
                            paddingInlineEnd: 0,
                            paddingInlineStart: 0,
                            lineHeight: "9pt",
                          }}
                        >
                          <svg
                            fill="none"
                            role="presentation"
                            viewBox="0 0 16 16"
                            style={{
                              overflow: "hidden",
                              color: "currentcolor",
                              pointerEvents: "none",
                              verticalAlign: "bottom",
                              width: "9pt",
                              height: "9pt",
                            }}
                          >
                            <path
                              d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"
                              fill="currentcolor"
                            />
                          </svg>
                        </chakra.span>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.div>
                <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                  <chakra.div
                    style={{
                      margin: "0px",
                      padding: "0px",
                      borderRadius: "sm",
                      gridTemplate:
                        '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                      boxSizing: "border-box",
                      display: "grid",
                      minWidth: "72px",
                      height: "2rem",
                      alignItems: "center",
                      userSelect: "none",
                    }}
                  >
                    <chakra.button
                      type="button"
                      aria-controls="uid7"
                      aria-expanded="false"
                      aria-haspopup="true"
                      draggable
                      style={{
                        borderRadius: "sm",
                        border: "none",
                        gridArea: "1 / 1 / auto / -1",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                        display: "grid",
                        alignItems: "center",

                        position: "relative",
                        gridTemplateColumns: "subgrid",
                        gridTemplateRows: "subgrid",
                        paddingInlineEnd: "4px",
                        paddingInlineStart: "4px",
                        paddingBlockStart: "4px",
                        paddingBlockEnd: "4px",
                        backgroundColor: "transparent",
                        textAlign: "start",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          gridArea: "interactive",
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "center",
                        }}
                      >
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            inset: 0,
                            insetInlineStart: "calc(0px)",
                            position: "absolute",
                          }}
                        />
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gap: "2px",
                            overflow: "hidden",
                            display: "flex",
                            paddingInlineEnd: "4px",
                            paddingInlineStart: "4px",
                            flexDirection: "column",
                            minWidth: "1ch",
                          }}
                        >
                          <chakra.span
                            style={{
                              overflow: "hidden",
                              margin: "0px",
                              WebkitLineClamp: "1",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",

                              overflowWrap: "anywhere",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              wordBreak: "break-all",
                              fontWeight: "500",
                            }}
                          >
                            {"Starred"}
                          </chakra.span>
                        </chakra.div>
                        <chakra.div
                          aria-hidden="true"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            insetBlock: "0px",
                            justifyContent: "center",

                            flexDirection: "column",
                            position: "absolute",
                            display: "none",
                            insetInlineStart: "0px",
                            marginInlineStart: "-9pt",
                          }}
                        >
                          <chakra.span
                            aria-hidden="true"
                            style={{
                              color: "currentcolor",
                              boxSizing: "border-box",
                              flexShrink: 0,
                              display: "inline-block",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              lineHeight: "9pt",
                            }}
                          >
                            <svg
                              fill="none"
                              role="presentation"
                              viewBox="0 0 16 16"
                              style={{
                                overflow: "hidden",
                                color: "currentcolor",
                                pointerEvents: "none",
                                verticalAlign: "bottom",
                                width: "9pt",
                                height: "9pt",
                              }}
                            >
                              <path
                                d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                fill="currentcolor"
                              />
                            </svg>
                          </chakra.span>
                        </chakra.div>
                      </chakra.div>
                    </chakra.button>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-before",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        paddingInlineStart: "4px",
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        boxSizing: "content-box",
                        pointerEvents: "none",
                      }}
                    >
                      <chakra.span
                        aria-hidden="true"
                        style={{
                          color: "currentcolor",
                          boxSizing: "border-box",
                          flexShrink: 0,
                          display: "inline-block",
                          lineHeight: 1,
                          paddingInlineEnd: 0,
                          paddingInlineStart: 0,
                        }}
                      >
                        <svg
                          fill="none"
                          role="presentation"
                          viewBox="0 0 16 16"
                          style={{
                            overflow: "hidden",
                            color: "currentcolor",
                            pointerEvents: "none",
                            verticalAlign: "bottom",
                            width: "12pt",
                            height: "12pt",
                          }}
                        >
                          <path
                            clipRule="evenodd"
                            d="M8 0a.75.75 0 0 1 .7.48l1.705 4.434 4.403.338a.75.75 0 0 1 .422 1.324l-3.38 2.818 1.25 4.662a.75.75 0 0 1-1.148.813L8 12.159l-3.95 2.71a.75.75 0 0 1-1.15-.813l1.251-4.662L.77 6.576a.75.75 0 0 1 .422-1.324l4.403-.338L7.3.48A.75.75 0 0 1 8 0m0 2.84L6.655 6.335l-3.506.27 2.7 2.25-.973 3.627L8 10.341l3.124 2.142-.973-3.627 2.7-2.25-3.506-.27z"
                            fill="currentcolor"
                            fillRule="evenodd"
                          />
                        </svg>
                      </chakra.span>
                    </chakra.div>
                    <chakra.div
                      style={{
                        margin: "0px",
                        padding: "0px",
                        gridArea: "elem-after",
                        overflow: "hidden",
                        alignItems: "center",
                        position: "relative",
                        paddingInlineEnd: "4px",
                        flexShrink: 0,
                        height: "24px",
                        pointerEvents: "none",
                        display: "flex",
                      }}
                    >
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          paddingInline: "6px",
                        }}
                      >
                        <chakra.span
                          aria-hidden="true"
                          style={{
                            color: "currentcolor",
                            boxSizing: "border-box",
                            flexShrink: 0,
                            display: "inline-block",
                            paddingInlineEnd: 0,
                            paddingInlineStart: 0,
                            lineHeight: "9pt",
                          }}
                        >
                          <svg
                            fill="none"
                            role="presentation"
                            viewBox="0 0 16 16"
                            style={{
                              overflow: "hidden",
                              color: "currentcolor",
                              pointerEvents: "none",
                              verticalAlign: "bottom",
                              width: "9pt",
                              height: "9pt",
                            }}
                          >
                            <path
                              d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"
                              fill="currentcolor"
                            />
                          </svg>
                        </chakra.span>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.div>
                <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                  <chakra.div style={{ margin: "0px", padding: "0px" }}>
                    <chakra.div style={{ margin: "0px", padding: "0px" }}>
                      <chakra.div
                        style={{
                          margin: "0px",
                          padding: "0px",
                          borderRadius: "sm",
                          gridTemplate:
                            '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                          boxSizing: "border-box",
                          display: "grid",
                          minWidth: "72px",
                          height: "2rem",
                          alignItems: "center",
                          userSelect: "none",
                        }}
                      >
                        <chakra.button
                          id=":r2:"
                          type="button"
                          aria-expanded="true"
                          draggable
                          style={{
                            borderRadius: "sm",
                            border: "none",
                            gridArea: "1 / 1 / auto / -1",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            display: "grid",
                            alignItems: "center",

                            position: "relative",
                            gridTemplateColumns: "subgrid",
                            gridTemplateRows: "subgrid",
                            paddingInlineEnd: "4px",
                            paddingInlineStart: "4px",
                            paddingBlockStart: "4px",
                            paddingBlockEnd: "4px",
                            backgroundColor: "transparent",
                            textAlign: "start",
                            appearance: "none",
                            cursor: "pointer",
                          }}
                        >
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              gridArea: "interactive",
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "center",
                            }}
                          >
                            <chakra.div
                              aria-hidden="true"
                              style={{
                                margin: "0px",
                                padding: "0px",
                                inset: 0,
                                insetInlineStart: "calc(0px)",
                                position: "absolute",
                              }}
                            />
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gap: "2px",
                                overflow: "hidden",
                                display: "flex",
                                paddingInlineEnd: "4px",
                                paddingInlineStart: "4px",
                                flexDirection: "column",
                                minWidth: "1ch",
                              }}
                            >
                              <chakra.span
                                style={{
                                  overflow: "hidden",
                                  margin: "0px",
                                  WebkitLineClamp: "1",
                                  fontStyle: "",
                                  fontVariantLigatures: "",

                                  fontStretch: "",
                                  fontSize: "",

                                  fontFamily: "",

                                  fontSizeAdjust: "",

                                  fontFeatureSettings: "",
                                  fontVariationSettings: "",
                                  fontLanguageOverride: "",

                                  overflowWrap: "anywhere",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  wordBreak: "break-all",
                                  fontWeight: "500",
                                }}
                              >
                                {"Projects"}
                              </chakra.span>
                            </chakra.div>
                            <chakra.div
                              aria-hidden="true"
                              style={{
                                margin: "0px",
                                padding: "0px",
                                insetBlock: "0px",
                                justifyContent: "center",

                                flexDirection: "column",
                                position: "absolute",
                                display: "none",
                                insetInlineStart: "0px",
                                marginInlineStart: "-9pt",
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                    fill="currentcolor"
                                  />
                                </svg>
                              </chakra.span>
                            </chakra.div>
                          </chakra.div>
                        </chakra.button>
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gridArea: "elem-before",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            paddingInlineStart: "4px",
                            flexShrink: 0,
                            width: "24px",
                            height: "24px",
                            boxSizing: "content-box",
                            pointerEvents: "none",
                          }}
                        >
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "none",
                            }}
                          >
                            <chakra.span
                              aria-hidden="true"
                              style={{
                                color: "currentcolor",
                                boxSizing: "border-box",
                                flexShrink: 0,
                                display: "inline-block",
                                paddingInlineEnd: 0,
                                paddingInlineStart: 0,
                                lineHeight: "9pt",
                              }}
                            >
                              <svg
                                fill="none"
                                role="presentation"
                                viewBox="0 0 16 16"
                                style={{
                                  overflow: "hidden",
                                  color: "currentcolor",
                                  pointerEvents: "none",
                                  verticalAlign: "bottom",
                                  width: "9pt",
                                  height: "9pt",
                                }}
                              >
                                <path
                                  d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
                                  fill="currentcolor"
                                />
                              </svg>
                            </chakra.span>
                          </chakra.div>
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "contents",
                            }}
                          >
                            <chakra.span
                              aria-hidden="true"
                              style={{
                                color: "currentcolor",
                                boxSizing: "border-box",
                                flexShrink: 0,
                                display: "inline-block",
                                lineHeight: 1,
                                paddingInlineEnd: 0,
                                paddingInlineStart: 0,
                              }}
                            >
                              <svg
                                fill="none"
                                role="presentation"
                                viewBox="0 0 16 16"
                                style={{
                                  overflow: "hidden",
                                  color: "currentcolor",
                                  pointerEvents: "none",
                                  verticalAlign: "bottom",
                                  width: "12pt",
                                  height: "12pt",
                                }}
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M13.5 3a.5.5 0 0 0-.5-.5h-2.482a.5.5 0 0 0-.354.146L7.78 5.03a.75.75 0 0 1-.53.22H3.018a.5.5 0 0 0-.354.146l-.353.354 1.72 1.72a.75.75 0 0 1 0 1.06l-2.25 2.25L.72 9.72 2.44 8 .72 6.28a.75.75 0 0 1 0-1.06l.884-.884a2 2 0 0 1 1.414-.586h3.921l2.165-2.164A2 2 0 0 1 10.518 1H13a2 2 0 0 1 2 2v2.482a2 2 0 0 1-.586 1.414L12.25 9.061v3.921a2 2 0 0 1-.586 1.415l-.884.883a.75.75 0 0 1-1.06 0L8 13.56l-1.72 1.72-1.06-1.06 2.25-2.25a.75.75 0 0 1 1.06 0l1.72 1.72.354-.354a.5.5 0 0 0 .146-.354V8.75a.75.75 0 0 1 .22-.53l2.384-2.384a.5.5 0 0 0 .146-.354zm-6.72 7.28-5 5-1.06-1.06 5-5z"
                                  fill="currentcolor"
                                  fillRule="evenodd"
                                />
                                <path
                                  d="M12.5 4.625a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0"
                                  fill="currentcolor"
                                />
                              </svg>
                            </chakra.span>
                          </chakra.div>
                        </chakra.div>
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gridArea: "elem-after",
                            gap: "4px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            opacity: 1,
                            width: "auto",
                            paddingInlineEnd: "4",
                          }}
                        >
                          <chakra.button
                            type="button"
                            style={{
                              borderRadius: "3px",
                              transition: "background 0.1s ease-out",
                              border: "0px none",
                              paddingBlock: "2px",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",
                              display: "inline-flex",
                              verticalAlign: "middle",
                              justifyContent: "center",
                              boxSizing: "border-box",

                              position: "relative",
                              appearance: "none",
                              cursor: "pointer",
                              textAlign: "center",
                              fontWeight: "500",
                              flexShrink: 0,
                              maxWidth: "100%",
                              alignItems: "baseline",
                              columnGap: "4px",
                              textDecorationColor: "currentcolor",
                              textDecorationLine: "none",
                              textDecorationStyle: "solid",
                              height: "1.5rem",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              width: "1.5rem",
                              backgroundColor: "transparent",
                            }}
                          >
                            <chakra.span
                              style={{
                                transition: "opacity 0.3s",
                                display: "flex",
                                userSelect: "none",
                                flexShrink: 0,
                                flexGrow: 0,
                                alignSelf: "center",
                                fontSize: "0px",
                                lineHeight: 0,
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M7.25 8.75V15h1.5V8.75H15v-1.5H8.75V1h-1.5v6.25H1v1.5z"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                                <chakra.span
                                  style={{
                                    border: "0px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    padding: "0px",
                                    userSelect: "none",
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    clip: "rect(1px, 1px, 1px, 1px)",
                                  }}
                                >
                                  Add
                                </chakra.span>
                              </chakra.span>
                            </chakra.span>
                          </chakra.button>
                          <chakra.button
                            type="button"
                            aria-expanded="false"
                            aria-haspopup="true"
                            style={{
                              borderRadius: "3px",
                              transition: "background 0.1s ease-out",
                              border: "0px none",
                              paddingBlock: "2px",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",
                              display: "inline-flex",
                              verticalAlign: "middle",
                              justifyContent: "center",
                              boxSizing: "border-box",

                              position: "relative",
                              appearance: "none",
                              cursor: "pointer",
                              textAlign: "center",
                              fontWeight: "500",
                              flexShrink: 0,
                              maxWidth: "100%",
                              alignItems: "baseline",
                              columnGap: "4px",
                              textDecorationColor: "currentcolor",
                              textDecorationLine: "none",
                              textDecorationStyle: "solid",
                              height: "1.5rem",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              width: "1.5rem",
                              backgroundColor: "transparent",
                            }}
                          >
                            <chakra.span
                              style={{
                                transition: "opacity 0.3s",
                                display: "flex",
                                userSelect: "none",
                                flexShrink: 0,
                                flexGrow: 0,
                                alignSelf: "center",
                                fontSize: "0px",
                                lineHeight: 0,
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                                <chakra.span
                                  style={{
                                    border: "0px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    padding: "0px",
                                    userSelect: "none",
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    clip: "rect(1px, 1px, 1px, 1px)",
                                  }}
                                >
                                  {"More actions"}
                                </chakra.span>
                              </chakra.span>
                            </chakra.span>
                          </chakra.button>
                        </chakra.div>
                      </chakra.div>
                    </chakra.div>
                    <chakra.div
                      role="list"
                      style={{
                        margin: "0px",
                        padding: "0px",
                        paddingInlineStart: "9pt",
                      }}
                    >
                      <chakra.div style={{ margin: "0px", padding: "0px" }}>
                        <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                          <chakra.div
                            aria-labelledby="uid14-heading"
                            role="group"
                            style={{ margin: "0px", padding: "0px" }}
                          >
                            <Text
                              textStyle="sm"
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "medium",
                                padding: "0px",
                                paddingBlock: "8px",
                                marginRight: "",
                                marginBottom: "",
                                marginLeft: "",
                                paddingInlineStart: "6px",
                                color: "#6b6e76",
                                marginTop: "0px",
                              }}
                            >
                              starred
                            </Text>
                            <chakra.div role="list" style={{ margin: "0px", padding: "0px" }}>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Modernize typography"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#964ac0",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M4.813 2.5H0V1h11v1.5H6.313V15h-1.5zM12 6.5V4h1.5v2.5H16V8h-2.5v5a.5.5 0 0 0 .5.5h2V15h-2a2 2 0 0 1-2-2V8h-2V6.5z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"F1 sponsorship"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#946f00",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M2.277 3.182A2.56 2.56 0 0 1 4.81 1h6.378c1.268 0 2.346.928 2.534 2.182l.274 1.826 1.28-.672.697 1.328-1.537.808A3.25 3.25 0 0 1 16 9.25v4.375c0 .76-.616 1.375-1.375 1.375h-2.25c-.76 0-1.375-.616-1.375-1.375V13.5H5v.125C5 14.385 4.384 15 3.625 15h-2.25C.615 15 0 14.384 0 13.625V9.25c0-1.177.626-2.208 1.563-2.778L.026 5.664l.698-1.328 1.279.672zM3.37 6l.39-2.595c.077-.52.524-.905 1.05-.905h6.378c.526 0 .973.385 1.05.905L12.63 6zm-.12 1.5A1.75 1.75 0 0 0 1.5 9.25v4.25h2v-.125c0-.76.616-1.375 1.375-1.375h6.25c.76 0 1.375.616 1.375 1.375v.125h2V9.25a1.75 1.75 0 0 0-1.75-1.75zm2.75 3H3V9h3zm7 0h-3V9h3z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Mobile application"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#1f845a",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M2.5 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2zm2-.5A.5.5 0 0 0 4 2v12a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-.5-.5zM10 13H6v-1.5h4z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                      </chakra.div>
                      <chakra.div style={{ margin: "0px", padding: "0px" }}>
                        <chakra.div role="listitem" style={{ margin: "0px", padding: "0px" }}>
                          <chakra.div
                            aria-labelledby="uid30-heading"
                            role="group"
                            style={{ margin: "0px", padding: "0px" }}
                          >
                            <Text
                              textStyle="sm"
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "medium",
                                padding: "0px",
                                paddingBlock: "8px",
                                marginRight: "",
                                marginBottom: "",
                                marginLeft: "",
                                paddingInlineStart: "6px",
                                color: "#6b6e76",
                                marginTop: "0px",
                              }}
                            >
                              Recent
                            </Text>
                            <chakra.div role="list" style={{ margin: "0px", padding: "0px" }}>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Attachments"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#5b7f24",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            d="M5.75 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5"
                                            fill="currentcolor"
                                          />
                                          <path
                                            clipRule="evenodd"
                                            d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h.644l6.274-7.723.053-.058a.75.75 0 0 1 1.06 0L13.5 8.19V3a.5.5 0 0 0-.5-.5zm2.575 11H13a.5.5 0 0 0 .5-.5v-2.69l-2.943-2.943z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Audit"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#ae4787",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M8 1.5a6.5 6.5 0 0 0 0 13V16a8 8 0 1 1 8-8h-1.5A6.5 6.5 0 0 0 8 1.5m4.326 3.98-5 6a.75.75 0 0 1-1.152 0l-2.5-3 1.152-.96L6.75 9.828l4.424-5.308zm-1.889 8.548a6.52 6.52 0 0 0 3.59-3.59l1.391.562A8.03 8.03 0 0 1 11 15.418z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Dark mode"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#6b6e76",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.25-5H8a5 5 0 0 1 0 10h-.75z"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Visualization"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#1868db",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            d="M1 13V1h1.5v12a.5.5 0 0 0 .5.5h12V15H3a2 2 0 0 1-2-2"
                                            fill="currentcolor"
                                          />
                                          <path
                                            d="m5.25 8.5.077.004A.75.75 0 0 1 6 9.25v2.5a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75zm4-3.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-6A.75.75 0 0 1 8.25 5zm4-3a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75z"
                                            fill="currentcolor"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                              <chakra.div
                                role="listitem"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  scrollMarginInline: "750pt",
                                }}
                              >
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    borderRadius: "sm",
                                    gridTemplate:
                                      '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                    boxSizing: "border-box",
                                    display: "grid",
                                    minWidth: "72px",
                                    height: "2rem",
                                    alignItems: "center",
                                    userSelect: "none",
                                  }}
                                >
                                  <a
                                    draggable
                                    href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                    style={{
                                      textDecoration: "underline",
                                      borderRadius: "4px",
                                      gridArea: "1 / 1 / auto / -1",

                                      boxSizing: "border-box",
                                      display: "grid",
                                      alignItems: "center",
                                      position: "relative",
                                      gridTemplateColumns: "subgrid",
                                      gridTemplateRows: "subgrid",
                                      paddingInlineEnd: "4px",
                                      paddingInlineStart: "4px",
                                      paddingBlockStart: "4px",
                                      paddingBlockEnd: "4px",
                                      backgroundColor: "transparent",
                                      textAlign: "start",
                                    }}
                                  >
                                    <chakra.div
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        insetInlineStart: 0,
                                        insetBlockStart: "50%",
                                        width: "2px",
                                        height: "9pt",
                                        transform: "translateY(-50%)",
                                        backgroundColor: "transparent",
                                      }}
                                    />
                                    <chakra.div
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gridArea: "interactive",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                      }}
                                    >
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          inset: 0,
                                          insetInlineStart: "calc(-12px)",
                                          position: "absolute",
                                        }}
                                      />
                                      <chakra.div
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          gap: "2px",
                                          overflow: "hidden",
                                          display: "flex",
                                          paddingInlineEnd: "4px",
                                          paddingInlineStart: "4px",
                                          flexDirection: "column",
                                          minWidth: "1ch",
                                        }}
                                      >
                                        <chakra.span
                                          style={{
                                            overflow: "hidden",
                                            margin: "0px",
                                            WebkitLineClamp: "1",
                                            fontStyle: "",
                                            fontVariantLigatures: "",

                                            fontStretch: "",
                                            fontSize: "",

                                            fontFamily: "",

                                            fontSizeAdjust: "",

                                            fontFeatureSettings: "",
                                            fontVariationSettings: "",
                                            fontLanguageOverride: "",

                                            overflowWrap: "anywhere",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            wordBreak: "break-all",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {"Basketball tournament"}
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        aria-hidden="true"
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          insetBlock: "0px",
                                          justifyContent: "center",

                                          flexDirection: "column",
                                          position: "absolute",
                                          display: "none",
                                          insetInlineStart: "0px",
                                          marginInlineStart: "-9pt",
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                    </chakra.div>
                                  </a>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-before",
                                      overflow: "hidden",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      paddingInlineStart: "4px",
                                      flexShrink: 0,
                                      width: "24px",
                                      height: "24px",
                                      boxSizing: "content-box",
                                      pointerEvents: "none",
                                    }}
                                  >
                                    <chakra.div
                                      role="presentation"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        borderRadius: "4px",
                                        backgroundColor: "#bd5b00",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        width: "20px",
                                        height: "20px",
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          lineHeight: 1,
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "12pt",
                                            height: "12pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M7.953 1.5a8 8 0 0 1-.05 4.192 15.4 15.4 0 0 1 2.147 1.24 8 8 0 0 1 3.605-2.14 6.47 6.47 0 0 0-2.404-2.42A6.47 6.47 0 0 0 7.953 1.5m6.29 4.69a6.5 6.5 0 0 0-2.992 1.661c1.017.862 1.9 1.84 2.639 2.903a6.48 6.48 0 0 0 .354-4.565m-1.232 5.954a13.7 13.7 0 0 0-2.704-3.126 6.48 6.48 0 0 0-.754 5.295 6.5 6.5 0 0 0 3.459-2.17m-4.963 2.36a7.98 7.98 0 0 1 1.06-6.395 14 14 0 0 0-1.755-1.014 7.98 7.98 0 0 1-5.008 4.116A6.47 6.47 0 0 0 4.75 13.63a6.47 6.47 0 0 0 3.299.872m-6.29-4.689a6.48 6.48 0 0 0 4.208-3.3 13.7 13.7 0 0 0-4.059-.78 6.5 6.5 0 0 0-.15 4.08m.914-5.535a15 15 0 0 1 3.833.834A6.5 6.5 0 0 0 6.45 1.69a6.48 6.48 0 0 0-3.776 2.589M6.837.086A7.97 7.97 0 0 1 12 1.073a7.97 7.97 0 0 1 3.437 3.979 7.99 7.99 0 0 1-.908 7.574 8 8 0 0 1-5.364 3.29A7.97 7.97 0 0 1 4 14.93a7.97 7.97 0 0 1-3.436-3.98 7.99 7.99 0 0 1 .509-6.949A7.99 7.99 0 0 1 6.837.086"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                  <chakra.div
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "elem-after",
                                      gap: "4px",
                                      overflow: "hidden",
                                      display: "flex",
                                      alignItems: "center",
                                      opacity: 0,
                                      width: "0",
                                      paddingInlineEnd: 0,
                                    }}
                                  >
                                    <chakra.button
                                      type="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                      style={{
                                        borderRadius: "3px",
                                        transition: "background 0.1s ease-out",
                                        border: "0px none",
                                        paddingBlock: "2px",
                                        fontStyle: "",
                                        fontVariantLigatures: "",

                                        fontStretch: "",
                                        fontSize: "",

                                        fontFamily: "",

                                        fontSizeAdjust: "",

                                        fontFeatureSettings: "",
                                        fontVariationSettings: "",
                                        fontLanguageOverride: "",
                                        display: "inline-flex",
                                        verticalAlign: "middle",
                                        justifyContent: "center",
                                        boxSizing: "border-box",

                                        position: "relative",
                                        appearance: "none",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        fontWeight: "500",
                                        flexShrink: 0,
                                        maxWidth: "100%",
                                        alignItems: "baseline",
                                        columnGap: "4px",
                                        textDecorationColor: "currentcolor",
                                        textDecorationLine: "none",
                                        textDecorationStyle: "solid",
                                        height: "1.5rem",
                                        paddingInlineEnd: 0,
                                        paddingInlineStart: 0,
                                        width: "1.5rem",
                                        backgroundColor: "transparent",
                                      }}
                                    >
                                      <chakra.span
                                        style={{
                                          transition: "opacity 0.3s",
                                          display: "flex",
                                          userSelect: "none",
                                          flexShrink: 0,
                                          flexGrow: 0,
                                          alignSelf: "center",
                                          fontSize: "0px",
                                          lineHeight: 0,
                                        }}
                                      >
                                        <chakra.span
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                          <chakra.span
                                            style={{
                                              border: "0px",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              padding: "0px",
                                              userSelect: "none",
                                              position: "absolute",
                                              width: "1px",
                                              height: "1px",
                                              clip: "rect(1px, 1px, 1px, 1px)",
                                            }}
                                          >
                                            {"More actions"}
                                          </chakra.span>
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.button>
                                  </chakra.div>
                                </chakra.div>
                              </chakra.div>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.div>

                <chakra.div
                  role="listitem"
                  data-scope="list-item"
                  style={{ margin: "0px", padding: "0px" }}
                  data-drop-target-for-element="true"
                >
                  <chakra.div style={{ margin: "0px", padding: "0px" }}>
                    <chakra.div
                      data-scope="menu-item"
                      data-part="root"
                      css={{
                        "--expandable-provided-elembefore-display": "contents",
                        "--expandable-chevron-display": "none",
                        _hover: {
                          "--expandable-provided-elembefore-display": "none",
                          "--expandable-chevron-display": "flex",
                        },

                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <chakra.div
                        css={{
                          "--actions-on-hover-padding": "4px",
                          "--actions-on-hover-width": "auto",
                          "--actions-on-hover-opacity": "1",
                          "--elem-after-display": "flex",
                          "--notch-color": "transparent",
                          _hover: {
                            backgroundColor: "#f0f1f2",
                            "--actions-on-hover-padding": "4px",
                            "--actions-on-hover-width": "auto",
                            "--actions-on-hover-opacity": "1",
                          },
                          color: "#505258",
                          gridTemplateAreas: '"elem-before interactive elem-after actions"',
                          gridTemplateRows: "1fr",
                          gridTemplateColumns: "minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)",
                          boxSizing: "border-box",

                          margin: "0px",
                          padding: "0px",
                          borderRadius: "sm",

                          display: "grid",
                          minWidth: "72px",
                          height: "2rem",
                          alignItems: "center",
                          userSelect: "none",
                        }}
                      >
                        <chakra.button
                          id=":r3:"
                          type="button"
                          aria-expanded="true"
                          draggable
                          css={{
                            _hover: {
                              animationFillMode: "forwards",
                              animationDelay: "0.8s",
                              animationDuration: "0s",
                              animationName: "k1xyysw3",
                              "--drag-handle-display": "flex",
                            },
                            borderRadius: "sm",
                            border: "none",
                            gridRow: "1",
                            gridColumn: "1 / -1",
                            // gridArea: "1 / 1 / auto / -1",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            display: "grid",
                            alignItems: "center",
                            position: "relative",
                            gridTemplateColumns: "subgrid",
                            gridTemplateRows: "subgrid",
                            paddingInlineEnd: "4px",
                            paddingInlineStart: "4px",
                            paddingBlockStart: "4px",
                            paddingBlockEnd: "4px",
                            backgroundColor: "transparent",
                            textAlign: "start",
                            appearance: "none",
                            cursor: "pointer",
                          }}
                        >
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              gridArea: "interactive",
                              display: "flex",
                              flexDirection: "column",
                              alignContent: "center",
                            }}
                          >
                            <chakra.div
                              aria-hidden="true"
                              style={{
                                margin: "0px",
                                padding: "0px",
                                inset: 0,
                                insetInlineStart: "calc(0px)",
                                position: "absolute",
                              }}
                            />
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gap: "2px",
                                overflow: "hidden",
                                display: "flex",
                                paddingInlineEnd: "4px",
                                paddingInlineStart: "4px",
                                flexDirection: "column",
                                minWidth: "1ch",
                              }}
                            >
                              <chakra.span
                                style={{
                                  overflow: "hidden",
                                  margin: "0px",
                                  WebkitLineClamp: "1",
                                  overflowWrap: "anywhere",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  wordBreak: "break-all",
                                  fontWeight: "500",
                                }}
                              >
                                {"Filters"}
                              </chakra.span>
                            </chakra.div>
                            <chakra.div
                              aria-hidden="true"
                              style={{
                                margin: "0px",
                                padding: "0px",
                                insetBlock: "0px",
                                justifyContent: "center",

                                flexDirection: "column",
                                position: "absolute",
                                display: "var(--drag-handle-display, none)",
                                insetInlineStart: "0px",
                                marginInlineStart: "-9pt",
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                    fill="currentcolor"
                                  />
                                </svg>
                              </chakra.span>
                            </chakra.div>
                          </chakra.div>
                        </chakra.button>

                        {/*filter button end*/}
                        {/*filter button left*/}
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gridArea: "elem-before",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            paddingInlineStart: "4px",
                            flexShrink: 0,
                            width: "24px",
                            height: "24px",
                            boxSizing: "content-box",
                            pointerEvents: "none",
                          }}
                        >
                          <chakra.div
                            style={{
                              display: "var(--expandable-chevron-display)",
                              margin: "0px",
                              padding: "0px",
                              pointerEvents: "none",
                            }}
                          >
                            <chakra.span
                              aria-hidden="true"
                              style={{
                                color: "currentcolor",
                                boxSizing: "border-box",
                                flexShrink: 0,
                                display: "inline-block",
                                paddingInlineEnd: 0,
                                paddingInlineStart: 0,
                                lineHeight: "9pt",
                              }}
                            >
                              <svg
                                fill="none"
                                role="presentation"
                                viewBox="0 0 16 16"
                                style={{
                                  overflow: "hidden",
                                  color: "currentcolor",
                                  pointerEvents: "none",
                                  verticalAlign: "bottom",
                                  width: "9pt",
                                  height: "9pt",
                                }}
                              >
                                <path
                                  d="m14.53 6.03-6 6a.75.75 0 0 1-1.004.052l-.056-.052-6-6 1.06-1.06L8 10.44l5.47-5.47z"
                                  fill="currentcolor"
                                />
                              </svg>
                            </chakra.span>
                          </chakra.div>
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "var(--expandable-provided-elembefore-display)",
                            }}
                          >
                            <chakra.span
                              aria-hidden="true"
                              style={{
                                color: "currentcolor",
                                boxSizing: "border-box",
                                flexShrink: 0,
                                display: "inline-block",
                                lineHeight: 1,
                                paddingInlineEnd: 0,
                                paddingInlineStart: 0,
                              }}
                            >
                              <svg
                                fill="none"
                                role="presentation"
                                viewBox="0 0 16 16"
                                style={{
                                  overflow: "hidden",
                                  color: "currentcolor",
                                  pointerEvents: "none",
                                  verticalAlign: "bottom",
                                  width: "12pt",
                                  height: "12pt",
                                }}
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"
                                  fill="currentcolor"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </chakra.span>
                          </chakra.div>
                        </chakra.div>
                        <chakra.div
                          style={{
                            margin: "0px",
                            padding: "0px",
                            gridArea: "elem-after",
                            gap: "4px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            opacity: 1,
                            width: "auto",
                            paddingInlineEnd: "4",
                          }}
                        >
                          <chakra.button
                            type="button"
                            style={{
                              borderRadius: "3px",
                              transition: "background 0.1s ease-out",
                              border: "0px none",
                              paddingBlock: "2px",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",
                              display: "inline-flex",
                              verticalAlign: "middle",
                              justifyContent: "center",
                              boxSizing: "border-box",

                              position: "relative",
                              appearance: "none",
                              cursor: "pointer",
                              textAlign: "center",
                              fontWeight: "500",
                              flexShrink: 0,
                              maxWidth: "100%",
                              alignItems: "baseline",
                              columnGap: "4px",
                              textDecorationColor: "currentcolor",
                              textDecorationLine: "none",
                              textDecorationStyle: "solid",
                              height: "1.5rem",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              width: "1.5rem",
                              backgroundColor: "transparent",
                            }}
                          >
                            <chakra.span
                              style={{
                                transition: "opacity 0.3s",
                                display: "flex",
                                userSelect: "none",
                                flexShrink: 0,
                                flexGrow: 0,
                                alignSelf: "center",
                                fontSize: "0px",
                                lineHeight: 0,
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M7.25 8.75V15h1.5V8.75H15v-1.5H8.75V1h-1.5v6.25H1v1.5z"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                                <chakra.span
                                  style={{
                                    border: "0px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    padding: "0px",
                                    userSelect: "none",
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    clip: "rect(1px, 1px, 1px, 1px)",
                                  }}
                                >
                                  Add
                                </chakra.span>
                              </chakra.span>
                            </chakra.span>
                          </chakra.button>
                          <chakra.button
                            type="button"
                            aria-expanded="false"
                            aria-haspopup="true"
                            style={{
                              borderRadius: "3px",
                              transition: "background 0.1s ease-out",
                              border: "0px none",
                              paddingBlock: "2px",
                              fontStyle: "",
                              fontVariantLigatures: "",

                              fontStretch: "",
                              fontSize: "",

                              fontFamily: "",

                              fontSizeAdjust: "",

                              fontFeatureSettings: "",
                              fontVariationSettings: "",
                              fontLanguageOverride: "",
                              display: "inline-flex",
                              verticalAlign: "middle",
                              justifyContent: "center",
                              boxSizing: "border-box",

                              position: "relative",
                              appearance: "none",
                              cursor: "pointer",
                              textAlign: "center",
                              fontWeight: "500",
                              flexShrink: 0,
                              maxWidth: "100%",
                              alignItems: "baseline",
                              columnGap: "4px",
                              textDecorationColor: "currentcolor",
                              textDecorationLine: "none",
                              textDecorationStyle: "solid",
                              height: "1.5rem",
                              paddingInlineEnd: 0,
                              paddingInlineStart: 0,
                              width: "1.5rem",
                              backgroundColor: "transparent",
                            }}
                          >
                            <chakra.span
                              style={{
                                transition: "opacity 0.3s",
                                display: "flex",
                                userSelect: "none",
                                flexShrink: 0,
                                flexGrow: 0,
                                alignSelf: "center",
                                fontSize: "0px",
                                lineHeight: 0,
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  lineHeight: "9pt",
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "9pt",
                                    height: "9pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                                <chakra.span
                                  style={{
                                    border: "0px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    padding: "0px",
                                    userSelect: "none",
                                    position: "absolute",
                                    width: "1px",
                                    height: "1px",
                                    clip: "rect(1px, 1px, 1px, 1px)",
                                  }}
                                >
                                  {"More actions"}
                                </chakra.span>
                              </chakra.span>
                            </chakra.span>
                          </chakra.button>
                        </chakra.div>
                      </chakra.div>
                    </chakra.div>
                    <chakra.div
                      role="list"
                      data-tag={"1"}
                      style={{
                        margin: "0px",
                        padding: "0px",
                        paddingInlineStart: "9pt",
                      }}
                    >
                      <chakra.div
                        data-tag={"1.1"}
                        data-drop-target-for-element="true"
                        style={{ margin: "0px", padding: "0px" }}
                      >
                        <chakra.div data-tag={"1.1.1"} role="listitem" style={{ margin: "0px", padding: "0px" }}>
                          <chakra.div data-tag={"1.1.1.1"} style={{ margin: "0px", padding: "0px" }}>
                            <chakra.div data-tag={"1.1.1.1.1"} style={{ margin: "0px", padding: "0px" }}>
                              <chakra.div
                                data-tag={"1.1.1.1.1.1"}
                                css={{
                                  "--expandable-provided-elembefore-display": "content",
                                  "--expandable-chevron-display": "none",
                                  _hover: {
                                    "--expandable-provided-elembefore-display": "none",
                                    "--expandable-chevron-display": "flex",
                                  },
                                  margin: "0px",
                                  padding: "0px",
                                  borderRadius: "sm",
                                  gridTemplate:
                                    '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                  boxSizing: "border-box",
                                  display: "grid",
                                  minWidth: "72px",
                                  height: "2rem",
                                  alignItems: "center",
                                  userSelect: "none",
                                }}
                              >
                                <a
                                  data-tag={"1.1.1.1.1.1.1"}
                                  id=":r4:"
                                  draggable
                                  href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                  style={{
                                    textDecoration: "underline",
                                    borderRadius: "sm",
                                    gridArea: "1 / 1 / auto / -1",

                                    boxSizing: "border-box",
                                    display: "grid",
                                    alignItems: "center",
                                    position: "relative",
                                    gridTemplateColumns: "subgrid",
                                    gridTemplateRows: "subgrid",
                                    paddingInlineEnd: "4px",
                                    paddingInlineStart: "4px",
                                    paddingBlockStart: "4px",
                                    paddingBlockEnd: "4px",
                                    backgroundColor: "transparent",
                                    textAlign: "start",
                                  }}
                                >
                                  <chakra.div
                                    data-tag={"1.1.1.1.1.1.1.1"}
                                    aria-hidden="true"
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      position: "absolute",
                                      insetInlineStart: 0,
                                      insetBlockStart: "50%",
                                      width: "2px",
                                      height: "9pt",
                                      transform: "translateY(-50%)",
                                      backgroundColor: "transparent",
                                    }}
                                  />
                                  <chakra.div
                                    data-tag={"1.1.1.1.1.1.1.2"}
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "interactive",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignContent: "center",
                                    }}
                                  >
                                    <chakra.div
                                      data-tag={"1.1.1.1.1.1.1.2.1"}
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        inset: 0,
                                        insetInlineStart: "calc(-12px)",
                                        position: "absolute",
                                      }}
                                    />
                                    <chakra.div
                                      data-tag={"1.1.1.1.1.1.1.2.2"}
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gap: "2px",
                                        overflow: "hidden",
                                        display: "flex",
                                        paddingInlineEnd: "4px",
                                        paddingInlineStart: "4px",
                                        flexDirection: "column",
                                        minWidth: "1ch",
                                      }}
                                    >
                                      <chakra.span
                                        data-tag={"1.1.1.1.1.1.1.2.2.1"}
                                        style={{
                                          overflow: "hidden",
                                          margin: "0px",
                                          WebkitLineClamp: "1",
                                          fontStyle: "",
                                          fontVariantLigatures: "",

                                          fontStretch: "",
                                          fontSize: "",

                                          fontFamily: "",

                                          fontSizeAdjust: "",

                                          fontFeatureSettings: "",
                                          fontVariationSettings: "",
                                          fontLanguageOverride: "",

                                          overflowWrap: "anywhere",
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          wordBreak: "break-all",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {"Filter 1"}
                                      </chakra.span>
                                    </chakra.div>
                                    <chakra.div
                                      data-tag={"1.1.1.1.1.1.1.2.3"}
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        insetBlock: "0px",
                                        justifyContent: "center",

                                        flexDirection: "column",
                                        position: "absolute",
                                        display: "none",
                                        insetInlineStart: "0px",
                                        marginInlineStart: "-9pt",
                                      }}
                                    >
                                      <chakra.span
                                        data-tag={"1.1.1.1.1.1.1.2.3.1"}
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                          lineHeight: "9pt",
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "9pt",
                                            height: "9pt",
                                          }}
                                        >
                                          <path
                                            d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                            fill="currentcolor"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                </a>
                                <chakra.div
                                  data-tag={"1.1.1.1.1.1.2"}
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gridArea: "elem-before",
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    paddingInlineStart: "4px",
                                    flexShrink: 0,
                                    width: "24px",
                                    height: "24px",
                                    boxSizing: "content-box",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <chakra.button
                                    data-tag={"1.1.1.1.1.1.2.1"}
                                    type="button"
                                    aria-expanded="false"
                                    aria-labelledby=":r4:"
                                    style={{
                                      borderRadius: "3px",
                                      transition: "background 0.1s ease-out",
                                      border: "0px none",
                                      paddingBlock: "2px",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",
                                      display: "inline-flex",
                                      verticalAlign: "middle",
                                      justifyContent: "center",
                                      boxSizing: "border-box",

                                      position: "relative",
                                      appearance: "none",
                                      cursor: "pointer",
                                      textAlign: "center",
                                      fontWeight: "500",
                                      flexShrink: 0,
                                      maxWidth: "100%",
                                      alignItems: "baseline",
                                      columnGap: "4px",
                                      textDecorationColor: "currentcolor",
                                      textDecorationLine: "none",
                                      textDecorationStyle: "solid",
                                      height: "1.5rem",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      width: "1.5rem",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <chakra.span
                                      data-tag={"1.1.1.1.1.1.2.1.1"}
                                      style={{
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        userSelect: "none",
                                        flexShrink: 0,
                                        flexGrow: 0,
                                        alignSelf: "center",
                                        fontSize: "0px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      <chakra.div
                                        data-tag={"1.1.1.1.1.1.2.1.1.1"}
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          display: "none",
                                        }}
                                      >
                                        <chakra.span
                                          data-tag={"1.1.1.1.1.1.2.1.1.1.1"}
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        data-tag={"1.1.1.1.1.1.2.1.1.2"}
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          display: "contents",
                                        }}
                                      >
                                        <chakra.span
                                          data-tag={"1.1.1.1.1.1.2.1.1.2.1"}
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            lineHeight: 1,
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "12pt",
                                              height: "12pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.span
                                        data-tag={"1.1.1.1.1.1.2.1.1.3"}
                                        style={{
                                          border: "0px",
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          padding: "0px",
                                          userSelect: "none",
                                          position: "absolute",
                                          width: "1px",
                                          height: "1px",
                                          clip: "rect(1px, 1px, 1px, 1px)",
                                        }}
                                      />
                                    </chakra.span>
                                  </chakra.button>
                                </chakra.div>
                                <chakra.div
                                  data-tag={"1.1.1.1.1.1.3"}
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gridArea: "elem-after",
                                    gap: "4px",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0,
                                    width: "0",
                                    paddingInlineEnd: 0,
                                  }}
                                >
                                  <chakra.button
                                    type="button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    style={{
                                      borderRadius: "3px",
                                      transition: "background 0.1s ease-out",
                                      border: "0px none",
                                      paddingBlock: "2px",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",
                                      display: "inline-flex",
                                      verticalAlign: "middle",
                                      justifyContent: "center",
                                      boxSizing: "border-box",

                                      position: "relative",
                                      appearance: "none",
                                      cursor: "pointer",
                                      textAlign: "center",
                                      fontWeight: "500",
                                      flexShrink: 0,
                                      maxWidth: "100%",
                                      alignItems: "baseline",
                                      columnGap: "4px",
                                      textDecorationColor: "currentcolor",
                                      textDecorationLine: "none",
                                      textDecorationStyle: "solid",
                                      height: "1.5rem",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      width: "1.5rem",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <chakra.span
                                      style={{
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        userSelect: "none",
                                        flexShrink: 0,
                                        flexGrow: 0,
                                        alignSelf: "center",
                                        fontSize: "0px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      <chakra.span
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                          lineHeight: "9pt",
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "9pt",
                                            height: "9pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                        <chakra.span
                                          style={{
                                            border: "0px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            padding: "0px",
                                            userSelect: "none",
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            clip: "rect(1px, 1px, 1px, 1px)",
                                          }}
                                        >
                                          {"More actions"}
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.span>
                                  </chakra.button>
                                </chakra.div>
                              </chakra.div>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                        <chakra.div data-tag={"1.1.2"} role="listitem" style={{ margin: "0px", padding: "0px" }}>
                          <chakra.div data-tag={"1.1.2.1"} style={{ margin: "0px", padding: "0px" }}>
                            <chakra.div data-tag={"1.1.2.1.1"} style={{ margin: "0px", padding: "0px" }}>
                              <chakra.div
                                data-tag={"1.1.2.1.1"}
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  borderRadius: "sm",
                                  gridTemplate:
                                    '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                                  boxSizing: "border-box",
                                  display: "grid",
                                  minWidth: "72px",
                                  height: "2rem",
                                  alignItems: "center",
                                  userSelect: "none",
                                }}
                              >
                                <a
                                  data-tag={"1.1.2.1.1"}
                                  id=":r5:"
                                  draggable
                                  href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                                  style={{
                                    textDecoration: "underline",
                                    borderRadius: "sm",
                                    gridArea: "1 / 1 / auto / -1",

                                    boxSizing: "border-box",
                                    display: "grid",
                                    alignItems: "center",
                                    position: "relative",
                                    gridTemplateColumns: "subgrid",
                                    gridTemplateRows: "subgrid",
                                    paddingInlineEnd: "4px",
                                    paddingInlineStart: "4px",
                                    paddingBlockStart: "4px",
                                    paddingBlockEnd: "4px",
                                    backgroundColor: "transparent",
                                    textAlign: "start",
                                  }}
                                >
                                  <chakra.div
                                    data-tag={"1.1.2.1.1.1"}
                                    aria-hidden="true"
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      position: "absolute",
                                      insetInlineStart: 0,
                                      insetBlockStart: "50%",
                                      width: "2px",
                                      height: "9pt",
                                      transform: "translateY(-50%)",
                                      backgroundColor: "transparent",
                                    }}
                                  />
                                  <chakra.div
                                    data-tag={"1.1.2.1.1.1.1"}
                                    style={{
                                      margin: "0px",
                                      padding: "0px",
                                      gridArea: "interactive",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignContent: "center",
                                    }}
                                  >
                                    <chakra.div
                                      data-tag={"1.1.2.1.1.1.1.1"}
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        inset: 0,
                                        insetInlineStart: "calc(-12px)",
                                        position: "absolute",
                                      }}
                                    />
                                    <chakra.div
                                      data-tag={"1.1.2.1.1.1.1.2"}
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        gap: "2px",
                                        overflow: "hidden",
                                        display: "flex",
                                        paddingInlineEnd: "4px",
                                        paddingInlineStart: "4px",
                                        flexDirection: "column",
                                        minWidth: "1ch",
                                      }}
                                    >
                                      <chakra.span
                                        data-tag={"1.1.2.1.1.1.1.1"}
                                        style={{
                                          overflow: "hidden",
                                          margin: "0px",
                                          WebkitLineClamp: "1",
                                          fontStyle: "",
                                          fontVariantLigatures: "",

                                          fontStretch: "",
                                          fontSize: "",

                                          fontFamily: "",

                                          fontSizeAdjust: "",

                                          fontFeatureSettings: "",
                                          fontVariationSettings: "",
                                          fontLanguageOverride: "",

                                          overflowWrap: "anywhere",
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          wordBreak: "break-all",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {"Filter 2"}
                                      </chakra.span>
                                    </chakra.div>
                                    <chakra.div
                                      data-tag={"1.1.2.1.1.1.1.3"}
                                      aria-hidden="true"
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        insetBlock: "0px",
                                        justifyContent: "center",

                                        flexDirection: "column",
                                        position: "absolute",
                                        display: "none",
                                        insetInlineStart: "0px",
                                        marginInlineStart: "-9pt",
                                      }}
                                    >
                                      <chakra.span
                                        data-tag={"1.1.2.1.1.1.1.3.1"}
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                          lineHeight: "9pt",
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "9pt",
                                            height: "9pt",
                                          }}
                                        >
                                          <path
                                            d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                            fill="currentcolor"
                                          />
                                        </svg>
                                      </chakra.span>
                                    </chakra.div>
                                  </chakra.div>
                                </a>
                                <chakra.div
                                  data-tag={"1.1.2.1.2"}
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gridArea: "elem-before",
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    paddingInlineStart: "4px",
                                    flexShrink: 0,
                                    width: "24px",
                                    height: "24px",
                                    boxSizing: "content-box",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <chakra.button
                                    data-tag={"1.1.2.1.2.1"}
                                    type="button"
                                    aria-expanded="false"
                                    aria-labelledby=":r5:"
                                    style={{
                                      borderRadius: "3px",
                                      transition: "background 0.1s ease-out",
                                      border: "0px none",
                                      paddingBlock: "2px",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",
                                      display: "inline-flex",
                                      verticalAlign: "middle",
                                      justifyContent: "center",
                                      boxSizing: "border-box",

                                      position: "relative",
                                      appearance: "none",
                                      cursor: "pointer",
                                      textAlign: "center",
                                      fontWeight: "500",
                                      flexShrink: 0,
                                      maxWidth: "100%",
                                      alignItems: "baseline",
                                      columnGap: "4px",
                                      textDecorationColor: "currentcolor",
                                      textDecorationLine: "none",
                                      textDecorationStyle: "solid",
                                      height: "1.5rem",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      width: "1.5rem",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <chakra.span
                                      data-tag={"1.1.2.1.2.1.1"}
                                      style={{
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        userSelect: "none",
                                        flexShrink: 0,
                                        flexGrow: 0,
                                        alignSelf: "center",
                                        fontSize: "0px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      <chakra.div
                                        data-tag={"1.1.2.1.2.1.1.1"}
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          display: "none",
                                        }}
                                      >
                                        <chakra.span
                                          data-tag={"1.1.2.1.2.1.1.1.1"}
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                            lineHeight: "9pt",
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "9pt",
                                              height: "9pt",
                                            }}
                                          >
                                            <path
                                              d="m6.03 1.47 6 6a.75.75 0 0 1 .052 1.004l-.052.056-6 6-1.06-1.06L10.44 8 4.97 2.53z"
                                              fill="currentcolor"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.div
                                        data-tag={"1.1.2.1.2.1.1.2"}
                                        style={{
                                          margin: "0px",
                                          padding: "0px",
                                          display: "contents",
                                        }}
                                      >
                                        <chakra.span
                                          data-tag={"1.1.2.1.2.1.1.2.1"}
                                          aria-hidden="true"
                                          style={{
                                            color: "currentcolor",
                                            boxSizing: "border-box",
                                            flexShrink: 0,
                                            display: "inline-block",
                                            lineHeight: 1,
                                            paddingInlineEnd: 0,
                                            paddingInlineStart: 0,
                                          }}
                                        >
                                          <svg
                                            fill="none"
                                            role="presentation"
                                            viewBox="0 0 16 16"
                                            style={{
                                              overflow: "hidden",
                                              color: "currentcolor",
                                              pointerEvents: "none",
                                              verticalAlign: "bottom",
                                              width: "12pt",
                                              height: "12pt",
                                            }}
                                          >
                                            <path
                                              clipRule="evenodd"
                                              d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"
                                              fill="currentcolor"
                                              fillRule="evenodd"
                                            />
                                          </svg>
                                        </chakra.span>
                                      </chakra.div>
                                      <chakra.span
                                        data-tag={"1.1.2.1.2.1.1.3"}
                                        style={{
                                          border: "0px",
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          padding: "0px",
                                          userSelect: "none",
                                          position: "absolute",
                                          width: "1px",
                                          height: "1px",
                                          clip: "rect(1px, 1px, 1px, 1px)",
                                        }}
                                      />
                                    </chakra.span>
                                  </chakra.button>
                                </chakra.div>
                                <chakra.div
                                  data-tag={"1.1.2.1.3"}
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gridArea: "elem-after",
                                    gap: "4px",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0,
                                    width: "0",
                                    paddingInlineEnd: 0,
                                  }}
                                >
                                  <chakra.button
                                    data-tag={"1.1.2.1.3.1"}
                                    type="button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    style={{
                                      borderRadius: "3px",
                                      transition: "background 0.1s ease-out",
                                      border: "0px none",
                                      paddingBlock: "2px",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",
                                      display: "inline-flex",
                                      verticalAlign: "middle",
                                      justifyContent: "center",
                                      boxSizing: "border-box",

                                      position: "relative",
                                      appearance: "none",
                                      cursor: "pointer",
                                      textAlign: "center",
                                      fontWeight: "500",
                                      flexShrink: 0,
                                      maxWidth: "100%",
                                      alignItems: "baseline",
                                      columnGap: "4px",
                                      textDecorationColor: "currentcolor",
                                      textDecorationLine: "none",
                                      textDecorationStyle: "solid",
                                      height: "1.5rem",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      width: "1.5rem",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <chakra.span
                                      data-tag={"1.1.2.1.3.1.1"}
                                      style={{
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        userSelect: "none",
                                        flexShrink: 0,
                                        flexGrow: 0,
                                        alignSelf: "center",
                                        fontSize: "0px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      <chakra.span
                                        data-tag={"1.1.2.1.3.1.1.1"}
                                        aria-hidden="true"
                                        style={{
                                          color: "currentcolor",
                                          boxSizing: "border-box",
                                          flexShrink: 0,
                                          display: "inline-block",
                                          paddingInlineEnd: 0,
                                          paddingInlineStart: 0,
                                          lineHeight: "9pt",
                                        }}
                                      >
                                        <svg
                                          fill="none"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          style={{
                                            overflow: "hidden",
                                            color: "currentcolor",
                                            pointerEvents: "none",
                                            verticalAlign: "bottom",
                                            width: "9pt",
                                            height: "9pt",
                                          }}
                                        >
                                          <path
                                            clipRule="evenodd"
                                            d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                            fill="currentcolor"
                                            fillRule="evenodd"
                                          />
                                        </svg>
                                        <chakra.span
                                          style={{
                                            border: "0px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            padding: "0px",
                                            userSelect: "none",
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            clip: "rect(1px, 1px, 1px, 1px)",
                                          }}
                                        >
                                          {"More actions"}
                                        </chakra.span>
                                      </chakra.span>
                                    </chakra.span>
                                  </chakra.button>
                                </chakra.div>
                              </chakra.div>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                        <chakra.div
                          data-tag={"1.1.3"}
                          role="listitem"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            scrollMarginInline: "750pt",
                          }}
                        >
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              borderRadius: "sm",
                              gridTemplate:
                                '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                              boxSizing: "border-box",
                              display: "grid",
                              minWidth: "72px",
                              height: "2rem",
                              alignItems: "center",
                              userSelect: "none",
                            }}
                          >
                            <a
                              draggable
                              style={{
                                textDecoration: "underline",
                                borderRadius: "sm",
                                gridArea: "1 / 1 / auto / -1",

                                boxSizing: "border-box",
                                display: "grid",
                                alignItems: "center",
                                position: "relative",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                paddingInlineEnd: "4px",
                                paddingInlineStart: "4px",
                                paddingBlockStart: "4px",
                                paddingBlockEnd: "4px",
                                backgroundColor: "transparent",
                                textAlign: "start",
                              }}
                            >
                              <chakra.div
                                aria-hidden="true"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  position: "absolute",
                                  insetInlineStart: 0,
                                  insetBlockStart: "50%",
                                  width: "2px",
                                  height: "9pt",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "transparent",
                                }}
                              />
                              <chakra.div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  gridArea: "interactive",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignContent: "center",
                                }}
                              >
                                <chakra.div
                                  aria-hidden="true"
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    inset: 0,
                                    insetInlineStart: "calc(-12px)",
                                    position: "absolute",
                                  }}
                                />
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gap: "2px",
                                    overflow: "hidden",
                                    display: "flex",
                                    paddingInlineEnd: "4px",
                                    paddingInlineStart: "4px",
                                    flexDirection: "column",
                                    minWidth: "1ch",
                                  }}
                                >
                                  <chakra.span
                                    style={{
                                      overflow: "hidden",
                                      margin: "0px",
                                      WebkitLineClamp: "1",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",

                                      overflowWrap: "anywhere",
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      wordBreak: "break-all",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {"Filter 3"}
                                  </chakra.span>
                                </chakra.div>
                                <chakra.div
                                  aria-hidden="true"
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    insetBlock: "0px",
                                    justifyContent: "center",

                                    flexDirection: "column",
                                    position: "absolute",
                                    display: "none",
                                    insetInlineStart: "0px",
                                    marginInlineStart: "-9pt",
                                  }}
                                >
                                  <chakra.span
                                    aria-hidden="true"
                                    style={{
                                      color: "currentcolor",
                                      boxSizing: "border-box",
                                      flexShrink: 0,
                                      display: "inline-block",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      lineHeight: "9pt",
                                    }}
                                  >
                                    <svg
                                      fill="none"
                                      role="presentation"
                                      viewBox="0 0 16 16"
                                      style={{
                                        overflow: "hidden",
                                        color: "currentcolor",
                                        pointerEvents: "none",
                                        verticalAlign: "bottom",
                                        width: "9pt",
                                        height: "9pt",
                                      }}
                                    >
                                      <path
                                        d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                        fill="currentcolor"
                                      />
                                    </svg>
                                  </chakra.span>
                                </chakra.div>
                              </chakra.div>
                            </a>
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gridArea: "elem-before",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                paddingInlineStart: "4px",
                                flexShrink: 0,
                                width: "24px",
                                height: "24px",
                                boxSizing: "content-box",
                                pointerEvents: "none",
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  lineHeight: 1,
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "12pt",
                                    height: "12pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </chakra.span>
                            </chakra.div>
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gridArea: "elem-after",
                                gap: "4px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                opacity: 0,
                                width: "0",
                                paddingInlineEnd: 0,
                              }}
                            >
                              <chakra.button
                                type="button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                style={{
                                  borderRadius: "3px",
                                  transition: "background 0.1s ease-out",
                                  border: "0px none",
                                  paddingBlock: "2px",
                                  fontStyle: "",
                                  fontVariantLigatures: "",

                                  fontStretch: "",
                                  fontSize: "",

                                  fontFamily: "",

                                  fontSizeAdjust: "",

                                  fontFeatureSettings: "",
                                  fontVariationSettings: "",
                                  fontLanguageOverride: "",
                                  display: "inline-flex",
                                  verticalAlign: "middle",
                                  justifyContent: "center",
                                  boxSizing: "border-box",
                                  position: "relative",
                                  appearance: "none",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  fontWeight: "500",
                                  flexShrink: 0,
                                  maxWidth: "100%",
                                  alignItems: "baseline",
                                  columnGap: "4px",
                                  textDecorationColor: "currentcolor",
                                  textDecorationLine: "none",
                                  textDecorationStyle: "solid",
                                  height: "1.5rem",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  width: "1.5rem",
                                  backgroundColor: "transparent",
                                }}
                              >
                                <chakra.span
                                  style={{
                                    transition: "opacity 0.3s",
                                    display: "flex",
                                    userSelect: "none",
                                    flexShrink: 0,
                                    flexGrow: 0,
                                    alignSelf: "center",
                                    fontSize: "0px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <chakra.span
                                    aria-hidden="true"
                                    style={{
                                      color: "currentcolor",
                                      boxSizing: "border-box",
                                      flexShrink: 0,
                                      display: "inline-block",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      lineHeight: "9pt",
                                    }}
                                  >
                                    <svg
                                      fill="none"
                                      role="presentation"
                                      viewBox="0 0 16 16"
                                      style={{
                                        overflow: "hidden",
                                        color: "currentcolor",
                                        pointerEvents: "none",
                                        verticalAlign: "bottom",
                                        width: "9pt",
                                        height: "9pt",
                                      }}
                                    >
                                      <path
                                        clipRule="evenodd"
                                        d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                        fill="currentcolor"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                    <chakra.span
                                      style={{
                                        border: "0px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        padding: "0px",
                                        userSelect: "none",
                                        position: "absolute",
                                        width: "1px",
                                        height: "1px",
                                        clip: "rect(1px, 1px, 1px, 1px)",
                                      }}
                                    >
                                      {"More actions"}
                                    </chakra.span>
                                  </chakra.span>
                                </chakra.span>
                              </chakra.button>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                        <chakra.div
                          data-tag={"1.1.4"}
                          role="listitem"
                          style={{
                            margin: "0px",
                            padding: "0px",
                            scrollMarginInline: "750pt",
                          }}
                        >
                          <chakra.div
                            style={{
                              margin: "0px",
                              padding: "0px",
                              borderRadius: "sm",
                              gridTemplate:
                                '"elem-before interactive elem-after actions" 1fr / minmax(0px, auto) 1fr minmax(0px, auto) minmax(0px, auto)',
                              boxSizing: "border-box",
                              display: "grid",
                              minWidth: "72px",
                              height: "2rem",
                              alignItems: "center",
                              userSelect: "none",
                            }}
                          >
                            <a
                              draggable
                              href="http://localhost:63342/dev-kit-main/demos/dockview/src/app/tools/html-style-converter/files/atlaskit-sidebar/inlined-by-mailchimp.html?_ijt=9iovv6ivoepo3ci68899v8p0qa&_ij_reload=RELOAD_ON_SAVE#"
                              style={{
                                textDecoration: "underline",
                                borderRadius: "sm",
                                gridArea: "1 / 1 / auto / -1",

                                boxSizing: "border-box",
                                display: "grid",
                                alignItems: "center",
                                position: "relative",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                paddingInlineEnd: "4px",
                                paddingInlineStart: "4px",
                                paddingBlockStart: "4px",
                                paddingBlockEnd: "4px",
                                backgroundColor: "transparent",
                                textAlign: "start",
                              }}
                            >
                              <chakra.div
                                aria-hidden="true"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  position: "absolute",
                                  insetInlineStart: 0,
                                  insetBlockStart: "50%",
                                  width: "2px",
                                  height: "9pt",
                                  transform: "translateY(-50%)",
                                  backgroundColor: "transparent",
                                }}
                              />
                              <chakra.div
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                  gridArea: "interactive",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignContent: "center",
                                }}
                              >
                                <chakra.div
                                  aria-hidden="true"
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    inset: 0,
                                    insetInlineStart: "calc(-12px)",
                                    position: "absolute",
                                  }}
                                />
                                <chakra.div
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    gap: "2px",
                                    overflow: "hidden",
                                    display: "flex",
                                    paddingInlineEnd: "4px",
                                    paddingInlineStart: "4px",
                                    flexDirection: "column",
                                    minWidth: "1ch",
                                  }}
                                >
                                  <chakra.span
                                    style={{
                                      overflow: "hidden",
                                      margin: "0px",
                                      WebkitLineClamp: "1",
                                      fontStyle: "",
                                      fontVariantLigatures: "",

                                      fontStretch: "",
                                      fontSize: "",

                                      fontFamily: "",

                                      fontSizeAdjust: "",

                                      fontFeatureSettings: "",
                                      fontVariationSettings: "",
                                      fontLanguageOverride: "",

                                      overflowWrap: "anywhere",
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      wordBreak: "break-all",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {"Filter 4"}
                                  </chakra.span>
                                </chakra.div>
                                <chakra.div
                                  aria-hidden="true"
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    insetBlock: "0px",
                                    justifyContent: "center",

                                    flexDirection: "column",
                                    position: "absolute",
                                    display: "none",
                                    insetInlineStart: "0px",
                                    marginInlineStart: "-9pt",
                                  }}
                                >
                                  <chakra.span
                                    aria-hidden="true"
                                    style={{
                                      color: "currentcolor",
                                      boxSizing: "border-box",
                                      flexShrink: 0,
                                      display: "inline-block",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      lineHeight: "9pt",
                                    }}
                                  >
                                    <svg
                                      fill="none"
                                      role="presentation"
                                      viewBox="0 0 16 16"
                                      style={{
                                        overflow: "hidden",
                                        color: "currentcolor",
                                        pointerEvents: "none",
                                        verticalAlign: "bottom",
                                        width: "9pt",
                                        height: "9pt",
                                      }}
                                    >
                                      <path
                                        d="M7 2.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7 8a1.75 1.75 0 1 1-3.5 0A1.75 1.75 0 0 1 7 8m5.5 0A1.75 1.75 0 1 1 9 8a1.75 1.75 0 0 1 3.5 0M7 13.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0m5.5 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0"
                                        fill="currentcolor"
                                      />
                                    </svg>
                                  </chakra.span>
                                </chakra.div>
                              </chakra.div>
                            </a>
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gridArea: "elem-before",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                paddingInlineStart: "4px",
                                flexShrink: 0,
                                width: "24px",
                                height: "24px",
                                boxSizing: "content-box",
                                pointerEvents: "none",
                              }}
                            >
                              <chakra.span
                                aria-hidden="true"
                                style={{
                                  color: "currentcolor",
                                  boxSizing: "border-box",
                                  flexShrink: 0,
                                  display: "inline-block",
                                  lineHeight: 1,
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                }}
                              >
                                <svg
                                  fill="none"
                                  role="presentation"
                                  viewBox="0 0 16 16"
                                  style={{
                                    overflow: "hidden",
                                    color: "currentcolor",
                                    pointerEvents: "none",
                                    verticalAlign: "bottom",
                                    width: "12pt",
                                    height: "12pt",
                                  }}
                                >
                                  <path
                                    clipRule="evenodd"
                                    d="M15 3.5H1V2h14zm-2 5.25H3v-1.5h10zM11 14H5v-1.5h6z"
                                    fill="currentcolor"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </chakra.span>
                            </chakra.div>
                            <chakra.div
                              style={{
                                margin: "0px",
                                padding: "0px",
                                gridArea: "elem-after",
                                gap: "4px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                opacity: 0,
                                width: "0",
                                paddingInlineEnd: 0,
                              }}
                            >
                              <chakra.button
                                type="button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                style={{
                                  borderRadius: "3px",
                                  transition: "background 0.1s ease-out",
                                  border: "0px none",
                                  paddingBlock: "2px",
                                  fontStyle: "",
                                  fontVariantLigatures: "",

                                  fontStretch: "",
                                  fontSize: "",

                                  fontFamily: "",

                                  fontSizeAdjust: "",

                                  fontFeatureSettings: "",
                                  fontVariationSettings: "",
                                  fontLanguageOverride: "",
                                  display: "inline-flex",
                                  verticalAlign: "middle",
                                  justifyContent: "center",
                                  boxSizing: "border-box",

                                  position: "relative",
                                  appearance: "none",
                                  cursor: "pointer",
                                  textAlign: "center",
                                  fontWeight: "500",
                                  flexShrink: 0,
                                  maxWidth: "100%",
                                  alignItems: "baseline",
                                  columnGap: "4px",
                                  textDecorationColor: "currentcolor",
                                  textDecorationLine: "none",
                                  textDecorationStyle: "solid",
                                  height: "1.5rem",
                                  paddingInlineEnd: 0,
                                  paddingInlineStart: 0,
                                  width: "1.5rem",
                                  backgroundColor: "transparent",
                                }}
                              >
                                <chakra.span
                                  style={{
                                    transition: "opacity 0.3s",
                                    display: "flex",
                                    userSelect: "none",
                                    flexShrink: 0,
                                    flexGrow: 0,
                                    alignSelf: "center",
                                    fontSize: "0px",
                                    lineHeight: 0,
                                  }}
                                >
                                  <chakra.span
                                    aria-hidden="true"
                                    style={{
                                      color: "currentcolor",
                                      boxSizing: "border-box",
                                      flexShrink: 0,
                                      display: "inline-block",
                                      paddingInlineEnd: 0,
                                      paddingInlineStart: 0,
                                      lineHeight: "9pt",
                                    }}
                                  >
                                    <svg
                                      fill="none"
                                      role="presentation"
                                      viewBox="0 0 16 16"
                                      style={{
                                        overflow: "hidden",
                                        color: "currentcolor",
                                        pointerEvents: "none",
                                        verticalAlign: "bottom",
                                        width: "9pt",
                                        height: "9pt",
                                      }}
                                    >
                                      <path
                                        clipRule="evenodd"
                                        d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
                                        fill="currentcolor"
                                        fillRule="evenodd"
                                      />
                                    </svg>
                                    <chakra.span
                                      style={{
                                        border: "0px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        padding: "0px",
                                        userSelect: "none",
                                        position: "absolute",
                                        width: "1px",
                                        height: "1px",
                                        clip: "rect(1px, 1px, 1px, 1px)",
                                      }}
                                    >
                                      {"More actions"}
                                    </chakra.span>
                                  </chakra.span>
                                </chakra.span>
                              </chakra.button>
                            </chakra.div>
                          </chakra.div>
                        </chakra.div>
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.div>
              </chakra.div>
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}

export default Index