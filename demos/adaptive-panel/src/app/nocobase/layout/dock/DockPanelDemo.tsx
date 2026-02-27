"use client"
import {
  DockviewDefaultTab,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
  DockviewApi,
} from 'dockview';
import React, { useMemo } from 'react';
import { defaultConfigSimple } from './defaultLayout';
import { LeftControls, PrefixHeaderControls, RightControls } from './controls';
import { Button, ConfigProvider } from 'antd';
import { AppShell } from '../../components';

//         <Header actions={'ACTIONS'} logo={'LOGO'} nav={'NAV'} />
const headerComponents = {
  default: (props: IDockviewPanelHeaderProps) => {
    const onContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
    };
    return (
      <Button type="text" {...props}>
        {props.api.title + props.params.isGroupActive}
      </Button>
    );
  },
};

const components = {
  default: (props: IDockviewPanelProps) => {
    return (
      <div
        style={{
          height: '100%',
          overflow: 'auto',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* <Table data={metadata} /> */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
            fontSize: '42px',
            color: 'black',
            opacity: 0.5,
          }}
        >
          {props.api.title}
        </span>
      </div>
    );
  },
};

const baseComponents = {
  default: (props: IDockviewPanelProps) => {
    // const metadata = usePanelApiMetadata(props.api);

    return (
      <div
        style={{
          height: '100%',
          overflow: 'auto',
          color: 'white',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
            color: 'black',
            fontSize: '42px',
            opacity: 0.5,
          }}
        >
          {props.api.title}
        </span>
      </div>
    );
  },
};

const DockPanelDemo = (props: { theme?: string }) => {
  const [panels, setPanels] = React.useState<string[]>([]);
  const [groups, setGroups] = React.useState<string[]>([]);
  const [api, setApi] = React.useState<DockviewApi>();

  const [activePanel, setActivePanel] = React.useState<string>();
  const [activeGroup, setActiveGroup] = React.useState<string>();

  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const disposables = [
      api.onDidAddPanel((event) => {
        setPanels((_) => [..._, event.id]);
      }),
      api.onDidActivePanelChange((event) => {
        console.log('onDidActivePanelChange', event?.id);
        setActivePanel(event?.id);
      }),

      api.onDidRemovePanel((event) => {
        setPanels((_) => {
          const next = [..._];
          next.splice(
            next.findIndex((x) => x === event.id),
            1,
          );

          return next;
        });
      }),

      api.onDidAddGroup((event) => {
        setGroups((_) => [..._, event.id]);
      }),

      api.onDidRemoveGroup((event) => {
        setGroups((_) => {
          const next = [..._];
          next.splice(
            next.findIndex((x) => x === event.id),
            1,
          );

          return next;
        });
      }),
      api.onDidActiveGroupChange((event) => {
        setActiveGroup(event?.id);
      }),
    ];

    let success = false;

    const state = localStorage.getItem('dv-demo-state');
    if (state) {
      try {
        api.fromJSON(JSON.parse(state));
        success = true;
      } catch {
        localStorage.removeItem('dv-demo-state');
      }
    }

    if (!success) {
      defaultConfigSimple(api);
    }

    return disposables.forEach((disposable) => disposable.dispose());
  }, [api]);

  return (
    <AppShell>
      <DockviewReact
        components={baseComponents}
        defaultTabComponent={headerComponents.default}
        rightHeaderActionsComponent={RightControls}
        leftHeaderActionsComponent={LeftControls}
        prefixHeaderActionsComponent={PrefixHeaderControls}
        onReady={onReady}
        className={props.theme || 'dockview-theme-replit'}
      />
    </AppShell>
  );
};

export default DockPanelDemo;
