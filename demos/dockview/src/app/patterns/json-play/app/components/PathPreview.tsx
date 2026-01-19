import { LuChevronRight as ChevronRightIcon, LuEye as EyeIcon } from "react-icons/lu"

import { useMemo } from "react";
import { useJsonColumnViewAPI } from "../hooks/useJsonColumnView";
import { ColumnViewNode, IconComponent } from "../useColumnView";
import { Body } from "./Primitives/Body";


export type PathPreviewProps = {
  nodes: ColumnViewNode[];
  maxComponents?: number;
  enabled?: boolean;
};

type ValueComponent = {
  type: "value";
  id: string;
  title: string;
  icon?: IconComponent;
};

type EllipsisComponent = {
  type: "ellipsis";
  id: "ellipsis";
};

type Component = ValueComponent | EllipsisComponent;

export function PathPreview({
  nodes,
  maxComponents,
  enabled,
}: PathPreviewProps) {
  const isEnabled = useMemo(() => {
    if (enabled === undefined) {
      return true;
    }
    return enabled;
  }, [enabled]);

  const { goToNodeId } = useJsonColumnViewAPI();

  const components: any = useMemo<Array<Component>>(() => {
    if (maxComponents == null || nodes.length <= maxComponents) {
      return nodes.map((n) => {
        return { type: "value", id: n.id, title: n.title, icon: n.icon };
      });
    }

    let components = Array<Component>();

    //add the elements up to the ellipsis
    for (let index = 0; index < maxComponents - 1; index++) {
      const node: any = nodes[index];
      components.push({
        type: "value",
        id: node.id,
        title: node.title,
        icon: node.icon,
      });
    }

    //add ellipsis
    components.push({ type: "ellipsis", id: "ellipsis" });

    //add final element
    const lastNode: any = nodes[nodes.length - 1];
    components.push({
      type: "value",
      id: lastNode.id,
      title: lastNode.title,
      icon: lastNode.icon,
    });

    return components;
  }, [nodes, maxComponents]);

  return (
    <div
      className={`flex select-none pl-7 ${
        isEnabled
          ? `relative transition after:absolute after:left-1 after:top-1 after:h-3 after:w-3 after:bg-no-repeat after:opacity-0 after:transition after:content-[''] hover:cursor-pointer hover:bg-slate-200 hover:after:opacity-100 dark:hover:bg-slate-600`
          : "disabled"
      }`}
      onClick={() => isEnabled && goToNodeId(components[components.length - 1].id, "relatedValues")}
    >
      <div
        className={`flex rounded-sm px-2 ${
          isEnabled ? "" : "hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600"
        }`}
      >
        {components.map((node: any, index: any) => {
          if (node.type === "ellipsis") {
            return (
              <div key={node.id} className="flex min-w-0 flex-none items-center">
                <div className="text-md flex-none">…</div>
                <ChevronRightIcon className="h-4 w-4 flex-none overflow-x-hidden whitespace-nowrap text-slate-400" />
              </div>
            )
          } else {
            return (
              <div className="flex min-w-0 items-center" key={node.id}>
                <div className="flex min-w-0 items-center">
                  <div className="w-4 flex-shrink-[0.5] flex-grow-0 flex-col justify-items-center overflow-x-hidden whitespace-nowrap transition dark:text-slate-300">
                    {node.icon && <node.icon className="h-3 w-3" />}
                  </div>
                  <Body className="flex-shrink flex-grow-0 overflow-x-hidden text-ellipsis whitespace-nowrap transition dark:text-slate-300">
                    {node.title}
                  </Body>
                </div>

                {index == components.length - 1 ? (
                  <></>
                ) : (
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-[0.5] flex-grow-0 overflow-x-hidden whitespace-nowrap text-slate-400" />
                )}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
