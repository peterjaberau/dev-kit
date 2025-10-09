import React from 'react';
import { Resource } from '@dev-kit/core';
import {
    AdminContext,
    AdminUI,
    EditGuesser,
    ListGuesser,
} from '@dev-kit/ui-materialui';
import localforageDataProvider from './index';

export default {
    title: '@dev-kit/data-local-forage',
};

export const Basic = () => {
    const dataProvider = localforageDataProvider({
        prefixLocalForageKey: 'story-app-',
        defaultData: {
            posts: [
                { id: 1, title: 'Hello, world!' },
                { id: 2, title: 'FooBar' },
            ],
        },
    });

    return (
        <AdminContext dataProvider={dataProvider}>
            <AdminUI>
                <Resource name="posts" list={ListGuesser} edit={EditGuesser} />
            </AdminUI>
        </AdminContext>
    );
};
