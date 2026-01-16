import React from "react"

export const elementBefore = () => (
  <>
    <div
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
      <span
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
      </span>
    </div>
  </>
)
