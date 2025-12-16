import React from 'react';

import ActorsApp from './actors';

export const Provider = (props: { children: React.ReactNode }) => {
  return (
      <ActorsApp>{props.children}</ActorsApp>
  );
};
