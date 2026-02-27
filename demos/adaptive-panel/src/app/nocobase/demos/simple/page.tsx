import React from 'react';
import { AppShell } from '../../components/simple/AppShell';
import { Header } from "../../components/simple/Header"

export default function Page() {
  return <AppShell header={<Header actions={'ACTIONS'} logo={'LOGO'} nav={'NAV'} />}>content here</AppShell>;
};

