import React from 'react';
import { AppShell } from '../../components';
import { Header } from '../../components/Header';

const LayeredWithHeaderLayout = () => {
  return <AppShell header={<Header actions={'ACTIONS'} logo={'LOGO'} nav={'NAV'} />}>content here</AppShell>;
};

export default LayeredWithHeaderLayout;
