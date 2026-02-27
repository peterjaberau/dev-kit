import React from 'react';
import { DockviewApi } from 'dockview';

export const nextId = (() => {
    let counter = 0;

    return () => {
        counter++;
    };
})();

export function defaultConfigSimple(api: DockviewApi) {

    api.setGap(12)

    const panel1 = api.addPanel({
        id: 'panel_1',
        component: 'default',
        renderer: 'always',
        title: 'Panel 1',
        params: {
            isGroupActive: false,
            panelId: 'panel_1',
        },
    });

    api.addPanel({
        id: 'panel_2',
        component: 'default',
        params: {
            isGroupActive: false,
            panelId: 'panel_2',
        },
    }).setTitle('my panel 2');


    api.addPanel({
        id: 'panel_6',
        component: 'default',
        title: 'Panel 6',
        params: {
            isGroupActive: false,
            panelId: 'panel_6',
        },
        position: { direction: 'right' },
    });

    api.addPanel({
        id: 'panel_7',
        component: 'default',
        title: 'Panel 7',
        params: {
            isGroupActive: false,
            panelId: 'panel_7',
        },
        position: { referencePanel: 'panel_6', direction: 'below' },
    });


    const panel8 = api.addPanel({
        id: 'panel_8',
        component: 'default',
        renderer: 'always',
        title: 'Panel 8',
        params: {
            isGroupActive: false,
            panelId: 'panel_8',
        },
        position: { direction: 'right' },
    });




}

