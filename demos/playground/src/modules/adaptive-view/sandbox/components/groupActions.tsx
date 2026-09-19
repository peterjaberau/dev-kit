import type { DockviewHeaderPosition } from "#adaptive-view/react"
import { useDockviewGroup } from "../desktop/selectors"
import * as React from "react"
import { LM } from "../desktop/designer/theme-utils"
import { IconBtn } from "../desktop/designer/designer-kit"

const selectStyle: React.CSSProperties = {
  padding: "5px 8px",
  fontSize: 11,
  fontFamily: LM.ui,
  border: `1px solid ${LM.border}`,
  borderRadius: LM.radiusSm,
  background: LM.surface,
  color: LM.text,
  cursor: "pointer",
  outline: "none",
}

const GroupAction = ({ groupId }: { groupId: string }) => {
  const { isActive, isVisible, isMaximized, location, headerPosition, sendToDesktop } = useDockviewGroup(groupId)
  const onClick = () => sendToDesktop({ type: "onSetActiveGroup", params: { groupId } })
  return (
    <div style={{ padding: "3px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          minHeight: 28,
        }}
      >
        <button
          onClick={onClick}
          style={{
            flex: 1,
            padding: "5px 10px",
            fontSize: 11.5,
            fontWeight: isActive ? 600 : 500,
            fontFamily: LM.ui,
            border: `1px solid ${isActive ? LM.accent : LM.border}`,
            borderRadius: LM.radiusSm,
            background: isActive ? LM.accent : LM.surface,
            color: isActive ? LM.accentContrast : LM.text,
            boxShadow: isActive ? LM.glow : "none",
            cursor: "pointer",
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {groupId}
        </button>
        <div style={{ display: "flex", gap: 3 }}>
          <IconBtn
            icon="ad_group"
            title="Float"
            active={location?.type === "floating"}
            onClick={() =>
              sendToDesktop({
                type: "onFloatGroup",
                params: {
                  groupId,
                  options: { width: 400, height: 300, x: 50, y: 50, position: { bottom: 50, right: 50 } },
                },
              })
            }
          />
          <IconBtn
            icon="open_in_new"
            title="Popout"
            active={location?.type === "popout"}
            onClick={() => sendToDesktop({ type: "onPopoutGroup", params: { groupId } })}
          />
          <IconBtn
            icon="fullscreen"
            title="Maximize"
            active={isMaximized}
            onClick={() => sendToDesktop({ type: "onToggleGroupMaximized", params: { groupId } })}
          />
          <IconBtn
            icon={isVisible ? "visibility" : "visibility_off"}
            title="Toggle visibility"
            onClick={() => sendToDesktop({ type: "onToggleGroupVisible", params: { groupId } })}
          />
          <IconBtn
            icon="close"
            title="Close"
            onClick={() => sendToDesktop({ type: "onCloseGroup", params: { groupId } })}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingTop: 6,
          paddingBottom: 2,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: LM.text,
            fontFamily: LM.ui,
          }}
        >
          Header
        </span>
        <select
          className="dv-designer-input"
          style={selectStyle}
          value={headerPosition}
          onChange={(e) =>
            sendToDesktop({
              type: "onSetGroupHeaderPosition",
              params: { groupId, position: e.target.value as DockviewHeaderPosition },
            })
          }
        >
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>
    </div>
  )
}

export const GroupActions = (props: { groups: string[] }) => {
  return (
    <div style={{ padding: "2px 0" }}>
      {props.groups.map((groupId) => (
        <GroupAction key={groupId} groupId={groupId} />
      ))}
    </div>
  )
}
