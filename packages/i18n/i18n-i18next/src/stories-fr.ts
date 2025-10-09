import raMessages from '@dev-kit/language-french';
import { TranslationMessages } from '@dev-kit/core';

export default {
    ...raMessages,
    resources: {
        posts: {
            name_one: 'Article',
            name_other: 'Articles',
            fields: {
                id: 'Id',
                title: 'Titre',
            },
        },
        comments: {
            name_one: 'Commentaire',
            name_other: 'Commentaires',
            fields: {
                id: 'Id',
                body: 'Message',
            },
        },
    },
} as TranslationMessages;
