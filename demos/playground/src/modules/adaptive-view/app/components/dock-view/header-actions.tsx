import { IDockviewHeaderActionsProps } from '#adaptive-view/react';
import * as React from 'react';
import { nextId } from '../../utils';
import { HeaderIconRenderer } from "./header-icons"


const groupHeaderActionComponents: Record<string, React.FC> = {
    panel_1: () => {
        return <HeaderIconRenderer name="download" />
    },
};

export const RightHeaderActionsRenderer = (props: IDockviewHeaderActionsProps | any) => {
    if (props.location.type === 'edge') {
        return null;
    }

    const Component = React.useMemo(() => {
        if (!props.isGroupActive || !props.activePanel) {
            return null;
        }

        return groupHeaderActionComponents[props.activePanel.id]
    }, [props.isGroupActive, props.activePanel]);

    const [isMaximized, setIsMaximized] = React.useState<boolean>(
        props.containerApi.hasMaximizedGroup()
    );

    const [isPopout, setIsPopout] = React.useState<boolean>(
        props.api.location.type === 'popout'
    );

    React.useEffect(() => {
        const disposable = props.containerApi.onDidMaximizedGroupChange(() => {
            setIsMaximized(props.containerApi.hasMaximizedGroup());
        });

        const disposable2 = props.api.onDidLocationChange(() => {
            setIsPopout(props.api.location.type === 'popout');
        });

        return () => {
            disposable.dispose();
            disposable2.dispose();
        };
    }, [props.containerApi]);

    const onClick = () => {
        if (props.containerApi.hasMaximizedGroup()) {
            props.containerApi.exitMaximizedGroup();
        } else {
            props.activePanel?.api.maximize();
        }
    };

    const onClick2 = () => {
        if (props.api.location.type !== 'popout') {
            props.containerApi.addPopoutGroup(props.group);
        } else {
            props.api.moveTo({ position: 'right' });
        }
    };

    const vertical =
        props.group.api.getHeaderPosition() === 'left' ||
        props.group.api.getHeaderPosition() === 'right';

    return (
      <div
        className="group-control"
        style={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 8px",
          height: "100%",
          color: "var(--dv-activegroup-hiddenpanel-tab-color)",
        }}
      >
        {props.isGroupActive && <HeaderIconRenderer name="star" />}
        {Component && <Component />}
        <HeaderIconRenderer
          title={isPopout ? "Close Window" : "Open In New Window"}
          name={isPopout ? "close_fullscreen" : "open_in_new"}
          onClick={onClick2}
        />
        {!isPopout && <HeaderIconRenderer name={isMaximized ? "collapse_content" : "expand"} onClick={onClick} />}
      </div>
    )
};

export const LeftHeaderActionsRenderer = (props: IDockviewHeaderActionsProps | any) => {
  if (props.location.type === "edge") {
    return null
  }

  const onClick = () => {
    props.containerApi.addPanel({
      id: `id_${Date.now().toString()}`,
      component: "default",
      title: `Tab ${nextId()}`,
      position: {
        referenceGroup: props.group,
      },
    })
  }

  return (
    <div
      className="group-control"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 8px",
        height: "100%",
        color: "var(--dv-activegroup-visiblepanel-tab-color)",
      }}
    >
      <HeaderIconRenderer onClick={onClick} name="add" />
    </div>
  )
}

export const PrefixHeaderActionsRenderer = (props: IDockviewHeaderActionsProps | any) => {
  if (props.location.type === "edge") {
    return null
  }

  return (
    <HeaderIconRenderer
      className="group-control"
      css={{
        color: "var(--dv-activegroup-visiblepanel-tab-color)",
      }}
      name="menu"
    />
    // <div
    //   className="group-control"
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: "0px 8px",
    //     height: "100%",
    //     color: "var(--dv-activegroup-visiblepanel-tab-color)",
    //   }}
    // >
    //
    // </div>
  )
}
