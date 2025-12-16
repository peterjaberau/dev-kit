'use client';
import React from 'react';
import { ActorsModelProvider } from './provider';

export const App = ({ children }: any) => {
  return (
    <>
      <ActorsModelProvider>{children}</ActorsModelProvider>
    </>
  );
};
