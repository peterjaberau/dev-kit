import React, {useContext} from 'react';
import {RelationGraphStoreContext} from "#components";

const RGSlotOnNodeExpandHandle: React.FC = ({ children }: any) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  if (!graphInstance) {
    return null;
  }
  return <>{children}</>;
};
export default RGSlotOnNodeExpandHandle;
